import _ = require('lodash');
import { MonetizeEnums } from '../monetize_api';

const defaultValues = { instanceId: -1 };

export class InstanceConfig {

    private _instanceAdSourceName: MonetizeEnums.Networks;
    private _instanceName: string;
    private _instanceAdUnit: MonetizeEnums.AdUnits;
    private _status: boolean;
    private _instanceId: number;
    private _rate?: number;
    constructor(adSource: MonetizeEnums.Networks, instanceName: string, adUnit: MonetizeEnums.AdUnits, 
        status: boolean, instanceId: number, rate?: number) {
        this._instanceAdSourceName = adSource;
        this._instanceName = instanceName;
        this._instanceAdUnit = adUnit;
        this._status = status;
        this._instanceId = instanceId;
        this._rate = rate;
    }

    public getInstanceId(): number {
        return this._instanceId;
    }
    public getInstanceAdSourceName(): MonetizeEnums.Networks {
        return this._instanceAdSourceName;
    }

    public getInstanceName(): string {
        return this._instanceName;
    }

    public getInstanceAdUnit(): MonetizeEnums.AdUnits {
        return this._instanceAdUnit;
    }
    public getStatus(): boolean {
        return this._status;
    }
    public getRate(): number | undefined {
        return this._rate;
    }

    public toString(): any {
        const obj: any = {
            instanceName: this.getInstanceName(),
            status: (this.getStatus()) ? 'active' : 'inactive'
        };
        if (this.getRate()) {
            obj.rate = this.getRate();
        }
        return obj;
    }

    public getAppDataObject(): any {
        return;
    }


}
export class IronSourceInstance extends InstanceConfig {

    private _instancePricing: any[] = [];
    private _appKey: string;


    constructor(instanceName: string, adUnit: MonetizeEnums.AdUnits, applicationKey: string, status: boolean,
        options?: { pricing?: Map<number, string[]>, instanceId?: number }) {
        const { pricing, instanceId } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.IronSource, instanceName, adUnit, status, instanceId, undefined);
        this._appKey = applicationKey;
        if (pricing !== undefined) {
            pricing.forEach((countries: string[], ecpm: number) => {
                this._instancePricing.push({
                    eCPM: ecpm,
                    country: countries

                });
            });
        }

    }
    public getPricingObject(): any[] | undefined {
        if (_.isEmpty(this._instancePricing)) {
            return undefined;
        } else {
            return this._instancePricing;
        }
    }

    public getAppKey(): string {
        return this._appKey;
    }


    public toString(): any {
        const res: any = {
            ...super.toString(),
            pricing: this.getPricingObject()
        };

        return res;

    }

}

export class IronSourceBidding extends InstanceConfig {

    private _appKey: string;

    constructor(instanceName: string, adUnit: MonetizeEnums.AdUnits, applicationKey: string, status: boolean,
        instanceId = -1) {
        super(MonetizeEnums.Networks.IronSourceBidding, instanceName, adUnit, status, instanceId, undefined);
        this._appKey = applicationKey;
    }

    public getAppKey(): string {
        return this._appKey;
    }


    public toString(): any {
        const res: any = { ...super.toString() };
        return res;

    }

}

class AdColonyBase extends InstanceConfig {

    private _appID: string;
    private _zoneId: string;

    constructor(instanceName: string, adUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, zoneId: string, adSource: MonetizeEnums.Networks, instanceId: number, rate?: number) {
        super(adSource, instanceName, adUnit, status, instanceId, rate);
        this._appID = appId;
        this._zoneId = zoneId;
    }

    public getAppID(): string {
        return this._appID;
    }

    public getZoneId(): string {
        return this._zoneId;
    }

    public getAppDataObject(): any {
        return { appID: this.getAppID() };
    }
    public toString(): any {
        const res = {
            ...super.toString(),
            zoneId: this.getZoneId()
        };
        return res;
    }

}

export class AdColonyInstance extends AdColonyBase {
    constructor(instanceName: string, adUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, zoneId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, adUnit, status, appId, zoneId, MonetizeEnums.Networks.AdColony, instanceId, rate);

    }
}
export class AdColonyBidding extends AdColonyBase {
    constructor(instanceName: string, adUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, zoneId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, adUnit, status, appId, zoneId, MonetizeEnums.Networks.AdColonyBidding, instanceId, rate);

    }

}


export class AdMobInstance extends InstanceConfig {
    private _appId: string;
    private _adUnitId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, adUnitId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.AdMob, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appId = appId;
        this._adUnitId = adUnitId;
    }

    public getAppId(): string {
        return this._appId;
    }

    public getAdUnitId(): string {
        return this._adUnitId;
    }
    public getAppDataObject(): any {
        return { appId: this.getAppId() };
    }
    public toString(): any {
        const res = {
            ...super.toString(),
            adUnitId: this.getAdUnitId()
        };

        return res;
    }

}

export class AdManagerInstance extends InstanceConfig {
    private _appId: string;
    private _adUnitId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, adUnitId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.AdManager, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appId = appId;
        this._adUnitId = adUnitId;
    }

    public getAppId(): string {
        return this._appId;
    }

    public getAdUnitId(): string {
        return this._adUnitId;
    }
    public getAppDataObject(): any {
        return { appId: this.getAppId() };
    }
    public toString(): any {
        const res = {
            ...super.toString(),
            adUnitId: this.getAdUnitId()
        };

        return res;
    }

}

export class AmazonInstance extends InstanceConfig {
    private _appKey: string;
    private _ec: string;


    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appKey: string, ec: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.Amazon, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appKey = appKey;
        this._ec = ec;
    }

    public getAppKey(): string {
        return this._appKey;
    }

    public getEc(): string {
        return this._ec;
    }
    public getAppDataObject(): any {
        return { appKey: this.getAppKey() };

    }

    public toString(): any {
        const res = {
            ...super.toString(),
            ec: this.getEc()
        };
        return res;
    }
}

export class ApplovinInstance extends InstanceConfig {
    private _sdkKey: string;

    private _zoneId: string;


    constructor(instanceName: string, adUnit: MonetizeEnums.AdUnits, status: boolean,
        sdkKey: string, zoneId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.AppLovin, instanceName, adUnit, status, instanceId, rate);
        this._sdkKey = sdkKey;
        this._zoneId = zoneId;
    }

    public getZoneId(): string {
        return this._zoneId;
    }
    public getSdkKey(): string {
        return this._sdkKey;
    }

    public getAppDataObject(): any {
        return { sdkKey: this.getSdkKey() };
    }

    public toString(): any {
        const res = {
            ...super.toString(),
            zoneId: this.getZoneId
        };
        return res;
    }

}


export class ChartboostInstance extends InstanceConfig {
    private _appId: string;
    private _appSignature: string;
    private _adLocation: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, appSignature: string, adLocation: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.Chartboost, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appId = appId;
        this._appSignature = appSignature;
        this._adLocation = adLocation;

    }

    public getAppId(): string {
        return this._appId;
    }

    public getAppSignature(): string {
        return this._appSignature;
    }

    public getAdLocation(): string {
        return this._adLocation;
    }

    public getAppDataObject(): any {
        return {
            appId: this.getAppId(),
            appSignature: this.getAppSignature()
        };
    }

    public toString(): any {
        const res = {
            ...super.toString(),
            adLocation: this.getAdLocation()
        };

        return res;

    }
}

export class CrossPromotionBiddingInstance extends InstanceConfig {
    private _trafficId: number;


    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        trafficId: number, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.CrossPromotionBidding, instanceName, instanceAdUnit, status, instanceId, rate);
        this._trafficId = trafficId;


    }

    public getTrafficId(): number {
        return this._trafficId;
    }



    public getAppDataObject(): any {
        return {};
    }

    public toString(): any {
        const res = {
            ...super.toString(),
            trafficId: this.getTrafficId()
        };

        return res;

    }
}

export class CJSInstance extends InstanceConfig {
    private _appId: number;
    private _slotId: number;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: number, slotId: number, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.CSJ, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appId = appId;
        this._slotId = slotId;


    }

    public getAppId(): number {
        return this._appId;
    }
    public getSlotId(): number {
        return this._slotId;
    }



    public getAppDataObject(): any {
        return { appID: this.getAppId() };
    }

    public toString(): any {
        const res = {
            ...super.toString(),
            slotID: this.getSlotId()
        };

        return res;

    }
}

export class DirectDealsInstance extends InstanceConfig {
    private _trafficId: number;


    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        trafficId: number, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.DirectDeals, instanceName, instanceAdUnit, status, instanceId, rate);
        this._trafficId = trafficId;


    }

    public getTrafficId(): number {
        return this._trafficId;
    }



    public getAppDataObject(): any {
        return {};
    }

    public toString(): any {
        const res = {
            ...super.toString(),
            trafficId: this.getTrafficId()
        };

        return res;

    }
}

class FacebookBase extends InstanceConfig {
    private _appId: string;
    private _userAccessToken: string;
    private _placementId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, userAccessToken: string, placementId: string, adSource: MonetizeEnums.Networks, 
        instanceId: number, rate?: number) {

        super(adSource, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appId = appId;
        this._userAccessToken = userAccessToken;
        this._placementId = placementId;
    }

    public getAppId(): string {
        return this._appId;
    }
    public getUserAccessToken(): string {
        return this._userAccessToken;
    }

    public getAppDataObject(): any {
        return {
            appId: this.getAppId(),
            userAccessToken: this.getUserAccessToken()
        };
    }
    public getPlacementId(): string {
        return this._placementId;
    }

    public toString(): any {
        return {
            ...super.toString(),
            placementId: this.getPlacementId()
        };
    }
}

export class FacebookInstance extends FacebookBase {

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, userAccessToken: string, placementId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, instanceAdUnit, status, appId, userAccessToken, placementId, 
            MonetizeEnums.Networks.Facebook, instanceId, rate);

    }


}

export class FacebookBiddingInstance extends FacebookBase {

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, userAccessToken: string, placementId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, instanceAdUnit, status, appId, userAccessToken, placementId, 
            MonetizeEnums.Networks.FacebookBidding, instanceId, rate);

    }


}

export class FyberInstance extends InstanceConfig {

    private _appId: string;
    private _adSpotId: string;
    private _contentId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, adSpotId: string, contentId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.Fyber, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appId = appId;
        this._adSpotId = adSpotId;
        this._contentId = contentId;
    }

    public getAppId(): string {
        return this._appId;
    }

    public getAdSoptId(): string {
        return this._adSpotId;
    }

    public getContentId(): string {
        return this._contentId;
    }

    public getAppDataObject(): any {
        return { appId: this.getAppId() };
    }

    public toString(): any {
        const res = {
            ...super.toString(),
            adSoptId: this.getAdSoptId(),
            contentId: this.getContentId()
        };
        return res;
    }

}

export class HyperMXInstance extends InstanceConfig {
    private _distributorId: string;
    private _placementId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        placementId: string, distributorId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.HyperMX, instanceName, instanceAdUnit, status, instanceId, rate);
        this._placementId = placementId;
        this._distributorId = distributorId;
    }

    public getPlacementId(): string {
        return this._placementId;
    }

    public getDistributorId(): string {
        return this._distributorId;
    }

    public getAppDataObject(): any {
        return { distributorId: this.getDistributorId() };
    }

    public toString(): any {
        return {
            ...super.toString(),
            placementId: this.getPlacementId()
        };
    }
}

class InMobiBase extends InstanceConfig {

    private _placementId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        placementId: string, adSource: MonetizeEnums.Networks, instanceId: number, rate?: number) {
        super(adSource, instanceName, instanceAdUnit, status, instanceId, rate);
        this._placementId = placementId;
    }

    public getPlacementId(): string {
        return this._placementId;
    }

    public toString(): any {
        return {
            ...super.toString(),
            placementId: this.getPlacementId()
        };
    }
}

export class InMobiInstance extends InMobiBase {

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        placementId: string, adSource: MonetizeEnums.Networks, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, instanceAdUnit, status, placementId, MonetizeEnums.Networks.InMobi, instanceId, rate);
    }
}

export class InMobiBiddingInstance extends InMobiBase {

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        placementId: string, adSource: MonetizeEnums.Networks, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, instanceAdUnit, status, placementId, 
            MonetizeEnums.Networks.InMobiBidding, instanceId, rate);
    }
}

export class LiftoffInstance extends InstanceConfig {
    private _appId: string;
    private _adUnitId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, adUnitId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.LiftOff, instanceName, instanceAdUnit, status, instanceId, rate);

        this._appId = appId;
        this._adUnitId = adUnitId;
    }

    public getAppId(): string {
        return this._appId;
    }

    public getAdUnitId(): string {
        return this._adUnitId;
    }

    public getAppDataObject(): any {
        return { appId: this.getAppId() };
    }

    public toString(): any {
        return {
            ...super.toString(),
            adUnitId: this.getAdUnitId()
        };
    }

}

export class MaioInstance extends InstanceConfig {
    private _appId: string;
    private _mediaId: string;
    private _zoneId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, mediaId: string, zoneId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.Maio, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appId = appId;
        this._mediaId = mediaId;
        this._zoneId = zoneId;
    }

    public getAppId(): string {
        return this._appId;
    }

    public getMediaId(): string {
        return this._mediaId;
    }

    public getZoneId(): string {
        return this._zoneId;
    }

    public getAppDataObject(): any {
        return { appId: this.getAppId() };
    }

    public toString(): any {
        return {
            ...super.toString(),
            mediaId: this.getMediaId(),
            zoneId: this.getZoneId()
        };
    }
}

export class MyTargetInstance extends InstanceConfig {
    private _slotId: string;
    private _placementId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        slotId: string, placementId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.MyTarget, instanceName, instanceAdUnit, status, instanceId, rate);
        this._slotId = slotId;
        this._placementId = placementId;
    }

    public getSlotId(): string {
        return this._slotId;
    }

    public getPlacementId(): string {
        return this._placementId;

    }

    public getAppDataObject(): any {
        return {};
    }

    public toString(): any {
        return {
            ...super.toString(),
            slotId: this.getSlotId(),
            PlacementID: this.getPlacementId()
        };
    }
}

class TapJoyBase extends InstanceConfig {
    private _sdkKey: string;
    private _apiKey: string;
    private _placementName: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        sdkKey: string, apiKey: string, placementName: string, adSource: MonetizeEnums.Networks, 
        instanceId: number, rate?: number) {

        super(adSource, instanceName, instanceAdUnit, status, instanceId, rate);
        this._sdkKey = sdkKey;
        this._apiKey = apiKey;
        this._placementName = placementName;
    }

    public getSdkKey(): string {
        return this._sdkKey;
    }

    public getApiKey(): string {
        return this._apiKey;

    }
    public getPlacementName(): string {
        return this._placementName;
    }

    public getAppDataObject(): any {
        return {
            sdkKey: this.getSdkKey(),
            apiKey: this.getApiKey()
        };
    }

    public toString(): any {
        return {
            ...super.toString(),
            placementName: this.getPlacementName
        };
    }


}

export class TapJoyInstance extends TapJoyBase {

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        sdkKey: string, apiKey: string, placementName: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, instanceAdUnit, status, sdkKey, apiKey, placementName, 
            MonetizeEnums.Networks.TapJoy, instanceId, rate);
    }
}

export class TapJoyBiddingInstance extends TapJoyBase {

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        sdkKey: string, apiKey: string, placementName: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, instanceAdUnit, status, sdkKey, apiKey, placementName, 
            MonetizeEnums.Networks.TapJoyBidding, instanceId, rate);
    }
}

class PangleBase extends InstanceConfig {
    private _appId: string;
    private _slotId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, slotId: string, adSource: MonetizeEnums.Networks, instanceId: number, rate?: number) {

        super(adSource, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appId = appId;
        this._slotId = slotId;

    }

    public getAppId(): string {
        return this._appId;
    }

    public getSlotId(): string {
        return this._slotId;

    }

    public getAppDataObject(): any {
        return { appID: this.getAppId() };
    }

    public toString(): any {
        return {
            ...super.toString(),
            slotID: this.getSlotId()
        };
    }


}

export class PangleInstance extends PangleBase {

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, slotId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, instanceAdUnit, status, appId, slotId, MonetizeEnums.Networks.Pangle, instanceId, rate);
    }
}

export class PangleBiddingInstance extends PangleBase {

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, slotId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, instanceAdUnit, status, appId, slotId, 
            MonetizeEnums.Networks.PangleBidding, instanceId, rate);
    }
}



export class UnityAdsInstance extends InstanceConfig {
    private _sourceId: string;
    private _zoneId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        sourceId: string, zoneId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.UnityAds, instanceName, instanceAdUnit, status, instanceId, rate);
        this._sourceId = sourceId;
        this._zoneId = zoneId;
    }

    public getSourceId(): string {
        return this._sourceId;
    }

    public getZoneId(): string {
        return this._zoneId;
    }

    public getAppDataObject(): any {
        return { sourceId: this.getSourceId() };
    }

    public toString(): any {
        return {
            ...super.toString(),
            zoneId: this.getZoneId()
        };
    }

}

export class SmaatoInstance extends InstanceConfig {
    private _applicationName: string;
    private _adSpaceID: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        applicationName: string, adSpaceID: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.Smaato, instanceName, instanceAdUnit, status, instanceId, rate);
        this._applicationName = applicationName;
        this._adSpaceID = adSpaceID;
    }

    public getAppName(): string {
        return this._applicationName;
    }

    public getAdSpaceId(): string {
        return this._adSpaceID;
    }

    public getAppDataObject(): any {
        return { applicationName: this.getAppName() };
    }

    public toString(): any {
        return {
            ...super.toString(),
            adspaceID: this.getAdSpaceId()
        };
    }

}

export class SnapInstance extends InstanceConfig {
    private _appId: string;
    private _slotId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, slotId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.Snap, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appId = appId;
        this._slotId = slotId;
    }

    public getAppId(): string {
        return this._appId;
    }

    public getSlotId(): string {
        return this._slotId;
    }

    public getAppDataObject(): any {
        return { AppId: this.getAppId() };
    }

    public toString(): any {
        return {
            ...super.toString(),
            slotID: this.getSlotId()
        };
    }

}

export class SuperAwesomeInstance extends InstanceConfig {
    private _appID: string;
    private _placementId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appID: string, placementId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.SuperAwesome, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appID = appID;
        this._placementId = placementId;
    }

    public getAppId(): string {
        return this._appID;
    }

    public getPlacementId(): string {
        return this._placementId;
    }

    public getAppDataObject(): any {
        return { appID: this.getAppId() };
    }

    public toString(): any {
        return {
            ...super.toString(),
            placementId: this.getPlacementId()
        };
    }
}

export class YahooBiddingInstance extends InstanceConfig {
    private _siteId: string;
    private _placementId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        siteId: string, placementId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.YahooBidding, instanceName, instanceAdUnit, status, instanceId, rate);
        this._siteId = siteId;
        this._placementId = placementId;
    }

    public getSiteId(): string {
        return this._siteId;
    }

    public getPlacementId(): string {
        return this._placementId;
    }

    public getAppDataObject(): any {
        return { siteId: this.getSiteId() };
    }

    public toString(): any {
        return {
            ...super.toString(),
            placementId: this.getPlacementId()
        };
    }
}

export class TencentInstance extends InstanceConfig {
    private _appID: string;
    private _placementId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appID: string, placementId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(MonetizeEnums.Networks.Tencent, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appID = appID;
        this._placementId = placementId;
    }

    public getAppId(): string {
        return this._appID;
    }

    public getPlacementId(): string {
        return this._placementId;
    }

    public getAppDataObject(): any {
        return { appID: this.getAppId() };
    }

    public toString(): any {
        return {
            ...super.toString(),
            placementId: this.getPlacementId()
        };
    }
}

class VungleBase extends InstanceConfig {

    private _appId: string;
    private _reportingApiId: string;
    private _placementId: string;

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, reportingApiId: string, placementId: string, adSource: MonetizeEnums.Networks, 
        instanceId: number, rate?: number) {

        super(adSource, instanceName, instanceAdUnit, status, instanceId, rate);
        this._appId = appId;
        this._reportingApiId = reportingApiId;
        this._placementId = placementId;
    }

    public getAppId(): string {
        return this._appId;
    }

    public getReportingAPIId(): string {
        return this._reportingApiId;
    }

    public getPlacementID(): string {
        return this._placementId;
    }

    public getAppDataObject(): any {
        return {
            AppID: this.getAppId(),
            reportingAPIId: this.getReportingAPIId()
        };
    }

    public toString(): any {
        return {
            ...super.toString(),
            PlacementId: this.getPlacementID()
        };
    }

}

export class VungleInstance extends VungleBase {

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, reportingApiId: string, placementId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, instanceAdUnit, status, appId, reportingApiId, placementId, 
            MonetizeEnums.Networks.Vungle, instanceId, rate);

    }
}

export class VungleBiddingInstance extends VungleBase {

    constructor(instanceName: string, instanceAdUnit: MonetizeEnums.AdUnits, status: boolean,
        appId: string, reportingApiId: string, placementId: string, options?: { instanceId?: number, rate?: number }) {
        const { instanceId, rate } = { ...defaultValues, ...options };
        super(instanceName, instanceAdUnit, status, appId, reportingApiId, placementId, 
            MonetizeEnums.Networks.VungleBidding, instanceId, rate);

    }
}

