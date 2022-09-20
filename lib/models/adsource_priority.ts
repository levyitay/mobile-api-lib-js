/* eslint-disable max-len */
import { MonetizeEnums } from '../monetize_api';
import * as _ from 'lodash';

export enum TierType {
    MANUAL = 'manual',
    SORT_BY_CPM = 'sortByCpm',
    OPTIMIZED = 'optimized',
    BIDDERS = 'bidding'

}
export class MediationGroupTier {


    private _instances: any = [];

    private _tierType: TierType;
    /**
     * 
     * @param {TierType} tierType - the type of tier
     */
    constructor(tierType: TierType) {
        this._tierType = tierType;
    }
    /**
     * Adds an instance to the tier.
     * @param {MonetizeEnums.Networks} network - Network name
     * @param {number} instanceId - ID of the instance for the network (see MonetizeAPI().getInstanceIds())
     * @param {object} optionalParams - Optional parameters
     * @param {number} optionalParams.rate - Optional: overrides the cpm of the instance with rate
     * @param {number} optionalParams.position - Optional: The position of the instance in the waterfall, only for Manual tier type
     * @param {number} optionalParams.capping - Optional: Set capping for the instance per session
     * 
     */
    public addInstances(network: MonetizeEnums.Networks, instanceId: number, optionalParams?: { rate?: number, position?: number, capping?: number }): void {
        const currentPosition = this._checkIfExists(this._instances, instanceId, network);
        if (this._tierType != TierType.MANUAL) {
            if (currentPosition > -1) return;
        } else {
            if (currentPosition == optionalParams?.position) return;
        }
        let instanceObject: any = {};
        if (optionalParams?.rate) {
            instanceObject = { providerName: network, instanceId: instanceId, rate: optionalParams?.rate };
        } else {
            instanceObject = { providerName: network, instanceId: instanceId };
        }

        if (optionalParams?.capping) {
            instanceObject.capping = optionalParams?.capping;
        }

        if (this._tierType != TierType.MANUAL) {
            this._instances.push(instanceObject);
        } else {
            this._instances.splice(optionalParams?.position, 0, instanceObject);
        }

    }

    /**
     * Returns list of instances in the tier
     */
    public getInstanceList(): any {
        return this._instances;
    }

    /**
     * Removes instance from the tier.
     * @param {MonetizeEnums.Networks} network - The network of the instance to remove.
     * @param {number} instanceID - Instance ID to remove. 
     */
    public removeInstance(network: MonetizeEnums.Networks, instanceID: number): void {
        _.remove(this._instances, this._checkIfExists(this._instances, instanceID, network));
    }

    /**
     * returns the position of the instance in a given array of instances
     * @hidden
     * @ignore
     * @param array - Array of instances
     * @param instanceId - Instance ID 
     * @param network - Network
     * 
     * @returns - location of the instance in the array
     */
    private _checkIfExists(array: Array<any>, instanceId: number, network: MonetizeEnums.Networks): number {
        return _.findIndex(array, (obj) => { return (obj.instanceId == instanceId && obj.providerName == network); });
    }

    /**
     * returns the tier type
     * @returns {TierType}
     */
    public getTierType(): TierType {
        return this._tierType;
    }

    /**
     * building tier object for sending to the API.
     */
    public toString(): any {
        const obj: any = {};
        obj.instances = this._instances;
        if (this._tierType !== TierType.BIDDERS) obj.tierType = this._tierType.toString();

        return obj;
    }
}

export class MediationGroupPriority {
    private _tierArray = new Array<MediationGroupTier | undefined>(3);
    private _bidders: MediationGroupTier | undefined;



    /**
     * set the mediation group with a tier.
     * @param {MediationGroupTier} groupTier - MediationGroupTier to be added to the group tier list
     * @param {number} position - The Position of the tier (0-2), Ignored in case of bidding tier.
     * 
     * @returns - true upon successful addition of the tier to the group list. 
     */

    public setMediationGroupTier(groupTier: MediationGroupTier, position: number): boolean {
        if (groupTier.getTierType() == TierType.BIDDERS) {
            if (this._bidders != undefined) {
                console.warn('Replacing bidders list');
            }
            this._bidders = groupTier;
            return true;
        }
        if (position > 2) {
            console.error('Max number of tiers are 3, position must be between 0-2');
            throw new Error('Max number of tiers are 3, position must be between 0-2');
        }

        const validationObject = this._validateTier(groupTier, position);
        if (validationObject.position != -1) {
            console.error(`Some instances overlap between tiers: tier${validationObject.position + 1} with instances ${validationObject.list}`);
            throw new Error(`Some instances overlap between tiers: tier${validationObject.position + 1} with instances ${validationObject.list}`);
        }
        if (this._tierArray[position] != undefined) {
            console.warn(`Tier${position + 1} already contain instances, replacing instances list`);
        }
        this._tierArray[position] = groupTier;
        return true;
    }
    /**
     * Removes tier from the group
     * @param {number} position - position of the tier to be removed (0-2)
     */
    public removeTier(position: number): void {
        if (this._tierArray[position] == undefined) {
            console.warn(`Tier${position + 1} is empty`);
            return;
        }
        this._tierArray[position] = undefined;
    }
    /**
     * Removes bidders from the group
     */
    public removeBidders(): void {
        if (this._bidders == undefined) {
            console.warn('Bidders list is empty');
            return;
        }
        this._bidders = undefined;
    }

    /**
     * Returns groups bidders list
     * @returns {MediationGroupTier} or undefined.
     */
    public getBidders(): MediationGroupTier | undefined {
        return this._bidders;
    }
    /**
     * Returns groups tiers list
     * @returns {MediationGroupTier} or undefined.
     */
    public getTiers():Array<MediationGroupTier | undefined> {
        return this._tierArray;
    }

    /**
     * @hidden
     * @ignore
     * Validates that the instances in the given tier do not exist already on another tier in the group
     * @param groupTier - The tier to be check against
     * @param position  - The new position of the tier - We ignore comparison in that position/
     * 
     * @returns {Object} - In case of duplicates instances returns an object with list of duplicates and tier position, 
     *                     otherwise returns object with position of -1 and empty list.
     */
    private _validateTier(groupTier: MediationGroupTier, position: number): any {
        for (let i = 0; i < this._tierArray.length; i++) {
            if (i == position || this._tierArray[i] == undefined) {
                continue;
            }
            const intersectionList = _.intersectionWith(this._tierArray[i]?.getInstanceList(), groupTier.getInstanceList(), (a: any, b: any): boolean => {
                return (a.instanceId == b.instanceId && a.providerName == b.providerName);
            });
            if (intersectionList.length > 0) {
                return { position: i, list: intersectionList };
            }
        }
        return { position: -1, list: [] };
    }
    /**
     * @hidden
     * @ignore
     * Creates and returns an object to send to the API call.
     * 
     */
    public toString():any {
        const obj: any = {};
        if (this._bidders !== undefined && this._bidders instanceof MediationGroupTier) {
            obj.bidding = this._bidders.toString();

        }
        const newTiersList = _.remove(this._tierArray, undefined);
        for (let i = 0; i < newTiersList.length; i++) {
            const element = newTiersList[i];
            obj[`tier${i + 1}`] = element?.toString();
        }
        return obj;
    }

}
