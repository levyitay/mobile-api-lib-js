import { AppPromotionEnums } from '../app_promotion_api';
import * as _ from 'lodash';

export enum AudienceListType {
    Suppression = 'suppression_static',
    Targeting = 'targeting'
}

export class AudienceListMeta {
    private _name: string;
    private _type: AudienceListType;
    private _description: string;
    private _bundleId: string | null = null;
    private _platform: AppPromotionEnums.PLATFORM | null = null;

    constructor(name: string, type: AudienceListType, description: string, 
        options?: { bundleId?: string, platform?: AppPromotionEnums.PLATFORM }) {
        this._name = name;
        this._type = type;
        this._description = description;
        if (options !== undefined && options.bundleId !== undefined) this._bundleId = options.bundleId;
        if (options !== undefined && options.platform !== undefined) this._platform = options.platform;

        if (type == AudienceListType.Suppression) {
            if (options?.bundleId == undefined) {
                throw new Error('Bundle Id is required when using Suppression type list');
            }
            if (options?.platform == undefined) {
                throw new Error('Platform is required when using Suppression type list');
            }
        }

    }

    public toObject(): any {
        const obj: any = {
            name: this._name,
            type: this._type,
            description: this._description
        };
        if (this._type == AudienceListType.Suppression) {
            obj.bundleId = this._bundleId;
            obj.platform = this._platform;
        }
        return obj;
    }

}

export class AudienceListData {
    private _listIdsToAdd:string[] = [];
    private _listIdsToRemove:string[] = [];
    private _deviceList:string[] = [];

    public addAudienceListToUpdate(audienceListId:string):void {
        this._listIdsToAdd.push(audienceListId);
    }
    public addAudienceListToRemove(audienceListId:string):void {
        this._listIdsToRemove.push(audienceListId);
    }
    public addDevices(devices:string[]):void;
    public addDevices(device:string):void;
    public addDevices(deviceListOrdevice:string | string[]):void {
        if (typeof deviceListOrdevice == 'string') {
            this._deviceList.push(deviceListOrdevice);
        } else {
            this._deviceList = _.concat(this._deviceList, deviceListOrdevice);
        }
    }

    public toObject():any {
        const obj:any = { deviceIds:this._deviceList };
        if (!_.isEmpty(this._listIdsToAdd)) {
            obj.addAudience = this._listIdsToAdd;
        }
        if (!_.isEmpty(this._listIdsToRemove)) {
            obj.removeAudience = this._listIdsToRemove;
        }
        return obj;
    }
        
        
}
