export class CampaignBidList {
    private _campaignId:number;
    private _bids:CampaignBid[] = [];

    constructor(campaignId:number) {
        this._campaignId = campaignId;
    }

    public addBid(bid:CampaignBid):void {
        this._bids.push(bid);
    }

    public getObjectForUpdate():any {
        const bids:any = [];
        for (let i = 0;i < this._bids.length;i++) {
            bids.push(this._bids[i].getObject());
        }
        return { campaignId:this._campaignId, bids:bids };
    }

    public getObjectForDelete():any {
        const bids:any = [];
        for (let i = 0;i < this._bids.length;i++) {
            const bidObj = this._bids[i].getObject();
            delete bidObj.bid;
            bids.push(bidObj);
        }
        return { campaignId:this._campaignId, bids:bids };
    }

}

export class CampaignBid {
    private _bid:number;
    private _country:string;
    private _applicationId = -1;

    constructor(bid:number, country:string, applicationId?:number) {
        this._bid = bid;
        this._country = country;
        if (applicationId !== undefined) this._applicationId = applicationId;
    }

    public getObject():any {
        const obj:any = {};
        obj.country = this._country;
        obj.bid = parseFloat(this._bid.toFixed(3));
        if (this._applicationId !== -1) obj.applicationId = this._applicationId;
        return obj;
    }
}