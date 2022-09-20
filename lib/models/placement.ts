import { MonetizeEnums } from '../monetize_api';

export class Placement {
    private _adUnit: MonetizeEnums.AdUnits;
    private _name?: string;
    private _placementId?: number;
    private _enabled: boolean;
    private _itemName?: string;
    private _rewardAmount?: number;
    private _capping?: Capping;
    private _pacing?: Pacing;

    /**
     * 
     * @param {MonetizeEnums.AdUnits} adUnit - The placement Ad Unit.
     * @param {string} name - The placement name. 
     * @param {boolean} enabled - Placement enabled.
     * @param {number} options.placementId - Optional: Placement id for update and delete operations.
     * @param {string} options.itemName - Placement item name - mandatory for Rewarded Video.
     * @param {number} options.rewardAmount - Placement reward amount - mandatory for Rewarded Video.
     * @param {Capping} options.capping - Optional: capping for placement.
     * @param {Pacing} options.pacing - Optional: pacing for placement.
     */
    constructor(adUnit: MonetizeEnums.AdUnits,
        enabled = true, options?: {
            name?: string,
            itemName?: string, rewardAmount?: number,
            capping?: Capping, pacing?: Pacing, placementId?: number
        }) {

        let { itemName, rewardAmount } = { ...options };
        const { capping, pacing, placementId, name } = { ...options };
        if (adUnit == MonetizeEnums.AdUnits.RewardedVideo && (!itemName || !rewardAmount) && !placementId) {
            throw new Error('itemName and rewardAmount are mandatory when Ad Unit is Rewarded Video');
        }
        
        if (itemName && itemName?.length > 30) {
            console.warn('Item name length is greater than 30 chars, it will be trimmed');
            itemName = itemName.substring(0, 29);
        }

        if (rewardAmount && rewardAmount > 2000000000) {
            console.warn('Reward amount is greater than 2000000000, it will be reduced');
            rewardAmount = 2000000000;
        }

        if (rewardAmount && rewardAmount % 10 > 0) {
            console.warn('Reward amount should be int, it will be converted');
            rewardAmount = Math.round(rewardAmount);
        }

        this._adUnit = adUnit;
        this._name = name;
        this._placementId = placementId;
        this._enabled = enabled;
        this._itemName = itemName;
        this._rewardAmount = rewardAmount;
        this._capping = capping;
        this._pacing = pacing;

    }

    public getAdUnit(): MonetizeEnums.AdUnits {
        return this._adUnit;
    }

    public getName(): string | undefined {
        return this._name;
    }
    public getPlacementId(): number | undefined {
        return this._placementId;
    }

    public isEnabled(): boolean {
        return this._enabled;
    }

    public getItemName(): string | undefined {
        return this._itemName;
    }

    public getRewardAmount(): number | undefined {
        return this._rewardAmount;
    }

    public getCapping(): Capping | undefined {
        return this._capping;
    }

    public getPacing(): Pacing | undefined {
        return this._pacing;
    }

    public getObject(): any {
        const obj: any = {
            adUnit: this._adUnit,
            adDelivery: (this._enabled) ? 1 : 0
        };
        if (this._name) {
            obj.name = this._name;
        }
        if (this._placementId) {
            obj.id = this._placementId;
        }
        if (this._itemName) {
            obj.itemName = this._itemName;
            obj.rewardAmount = this._rewardAmount;
        }

        if (this._pacing) {
            obj.pacing = this._pacing.getObject();
        }

        if (this._capping) {
            obj.capping = this._capping.getObject();
        }
        return obj;

    }



}

export class Capping {

    private _enabled: boolean;
    private _limit: number;
    private _interval: string;
    /**
     * 
     * @param {number} limit - Capping limit max 1000
     * @param {string} interval - Capping interval: d – days or h – hours
     * @param {boolean} enabled - Capping enabled.
     */
    constructor(limit: number, interval: 'h' | 'd', enabled: boolean) {

        if (limit > 1000) {
            console.warn('limit is greater than 1000, it will be reduce to 1000');
            limit = 1000;
        }
        if (interval != 'h' && interval != 'd') {
            throw new Error('interval must be `d` for days or `h` for hours');
        }
        this._limit = limit;
        this._interval = interval;
        this._enabled = enabled;

    }

    public isEnabled(): boolean {
        return this._enabled;
    }

    public getLimit(): number {
        return this._limit;
    }

    public getInterval(): string {
        return this._interval;
    }

    public getObject(): any {
        return {
            enabled: (this._enabled) ? 1 : 0,
            cappingLimit: this._limit,
            cappingInterval: this._interval
        };
    }

}

export class Pacing {
    private _enabled: boolean;
    private _minutes: number;
    /**
     * 
     * @param {number} minutes - Placement pacing in minutes max 1000
     * @param {boolean} enabled - Placement enabled.
     */
    constructor(minutes: number, enabled: boolean) {

        if (minutes > 1000) {
            console.warn('minutes is greater than 1000, it will be reduce to 1000');
            minutes = 1000;
        }
        if (!Number.isInteger(minutes)) {
            console.warn('minutes must be integer, it will be converted');
            Math.round(minutes);
        }
        this._enabled = enabled;
        this._minutes = minutes;

    }

    public isEnabled(): boolean {
        return this._enabled;
    }

    public getMinutes(): number {
        return this._minutes;
    }

    public getObject(): any {
        return {
            enabled: (this._enabled) ? 1 : 0,
            pacingMinutes: this._minutes
        };
    }
}

