export { MediationGroupPriority, MediationGroupTier, TierType as TIER_TYPE } from './models/adsource_priority';
export { CampaignBidList, CampaignBid } from './models/campaign_bids';
export { AudienceListData, AudienceListMeta, AudienceListType } from './models/audience_list';
export { AppPromotionEnums } from './app_promotion_api';
export { MonetizeEnums } from './monetize_api';
export * from './models/instance_config';
export * from './models/placement';

import { IronSourceMonetizeAPI } from './monetize_api';
import { AppPromotionAPI } from './app_promotion_api';

export class IronSource {

    private monetizeAPI: IronSourceMonetizeAPI.API | undefined;
    private promoteAPI: AppPromotionAPI.API | undefined;
    private _username: string | undefined;
    private _secret: string | undefined;
    private _token: string | undefined;


    public MonetizeAPI():IronSourceMonetizeAPI.API {
        if (this.monetizeAPI == undefined) {
            this.monetizeAPI = new IronSourceMonetizeAPI.API();
        }
        if (this._username && this._secret && this._token) {
            this.monetizeAPI.setCredentials(this._username, this._secret, this._token);

        }
        return this.monetizeAPI;
    }

    public PromoteAPI():AppPromotionAPI.API {
        if (this.promoteAPI == undefined) {
            this.promoteAPI = new AppPromotionAPI.API();
        }
        if (this._username && this._secret && this._token) {
            this.promoteAPI.setCredentials(this._username, this._secret, this._token);
        }
        return this.promoteAPI;
    }

    /**
     * setCredentials
     * @param username {string} - username for generating authentication
     * @param secret {string} - secret key from the platform
     * @param token {string} - Refresh Token taken from the platform.
     * 
     */
    public setCredentials(username: string, secret: string, token: string): void {
        this._username = username;
        this._secret = secret;
        this._token = token;
        if (this.monetizeAPI !== undefined) {
            this.monetizeAPI.setCredentials(username, secret, token);
        }
        if (this.promoteAPI !== undefined) {
            this.promoteAPI.setCredentials(username, secret, token);
        }
    }
}
