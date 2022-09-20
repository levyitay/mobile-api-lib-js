/* eslint-disable max-len */
import * as utils from './utils';
import * as _ from 'lodash';
import { Stream, Transform } from 'stream';
import { CampaignBidList } from './models/campaign_bids';
import { AudienceListMeta, AudienceListData } from './models/audience_list';
import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from './base_api';
import * as FormData from 'form-data';
import { Creative } from './models/creative';



/**
 * @hidden
 * @ignore
 */
const UNIVERSAL_SKAN_API = 'https://platform.ironsrc.com/partners/postback/v1';
/**
 * @hidden
 * @ignore
 */
const CREATIVE_API = 'https://api.ironsrc.com/advertisers/v2/creatives?';
/**
 * @hidden
 * @ignore
 */
const ASSETS_API = 'https://api.ironsrc.com/advertisers/v2/assets';
/**
 * @hidden
 * @ignore
 */
const TITLE_API = 'https://api.ironsrc.com/advertisers/v2/titles';
/**
 * @hidden
 * @ignore
 */
const REPORTING_API = 'https://api.ironsrc.com/advertisers/v2/reports';
/**
 * @hidden
 * @ignore
 */
const MULTI_BID_API = 'https://api.ironsrc.com/advertisers/v2/multibid';
/**
 * @hidden
 * @ignore
 */
const AUDIENCE_API_SHOW = 'https://platform-api.supersonic.com/audience/api/show';
/**
 * @hidden
 * @ignore
 */
const AUDIENCE_API_CREATE = 'https://platform-api.supersonic.com/audience/api/create';
/**
 * @hidden
 * @ignore
 */
const AUDIENCE_API_DELETE = 'https://platform-api.supersonic.com/audience/api/{id}';
/**
 * @hidden
 * @ignore
 */
const AUDIENCE_API_UPDATE = 'https://platform-api.supersonic.com/audience/api';

/**
 * @hidden
 * @ignore
 */
const SKAN_REPORTING_API = 'https://api.ironsrc.com/advertisers/v4/reports/skan';

export namespace AppPromotionEnums {
    export enum Metrics {
        Impressions = 'impressions',
        Clicks = 'clicks',
        Completions = 'completions',
        Installs = 'installs',
        Spend = 'spend',
        StoreOpens = 'storeOpens'
    }

    export enum AdUnits {
        RewardedVideo = 'rewardedVideo',
        Interstitial = 'interstitial',
        Banner = 'banner',
        Offerwall = 'offerWall'
    }

    export enum Breakdowns {
        Day = 'day',
        Campaign = 'campaign',
        Title = 'title',
        Application = 'application',
        Country = 'country',
        OS = 'os',
        DeviceType = 'deviceType',
        Creatives = 'creative',
        AdUnit = 'adUnit'
    }
    export enum PLATFORM {
        iOS = 'ios',
        Android = 'android'
    }

    export enum CreativeType {
        VIDEO_CAROUSEL = 'videoAndCarousel',
        VIDEO_FULLSCREEN = 'videoAndFullScreen',
        PLAYABLE = 'playable',
        VIDEO_INTERACTIVE_ENDCARD = 'videoAndInteractiveEndCard',
        INTERACTIVE_VIDEO = 'interactiveVideo'
    }

    export enum UsageType {
        VIDEO = 'video',
        LEFT = 'left',
        MIDDLE = 'middle',
        RIGHT = 'right',
        INTERACTIVE_ENDCARD = 'interactiveEndCard',
        PHONE_PORTRAIT = 'phonePortrait',
        PHONE_LANDSCAPE = 'phoneLandscape',
        TABLET_PORTRAIT = 'tabletPortrait',
        TABLET_LANDSCAPE = 'tabletLandscape'
    }

}
export namespace AppPromotionAPI {

    export class API extends BaseAPI {



        /**
         * 
         * @param {string} startDate - report start date in the following format YYYY-MM-DD
         * @param {string}  endDate -report end date in the following format YYYY-MM-DD
         * @param {AppPromotionMetrics.Metrics} metrics -  list of report metrics.
         * @param {object} reportingOptions - Optional additional parameters.
         * @param {AppPromotionBreakdowns} reportingOptions.breakdowns -  list of breakdowns.
         * @param {string} reportingOptions.format - report format type 'csv' or 'json' only
         * @param {number} reportingOptions.count - maximum number of records in the report
         * @param {[number]} reportingOptions.campaignId - list of campaign ids
         * @param {[string]} reportingOptions.bundleId - list of bundle ids
         * @param {[number]} reportingOptions.creativeId - list of creative ids.
         * @param {[string]} reportingOptions.country - list of country code in 2 letter country code, as per [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
         * @param {string} reportingOptions.os - either 'ios' or 'android'.
         * @param {string} reportingOptions.device_type - either 'phone' or 'tablet'
         * @param {AppPromotionEnums.AdUnits} reportingOptions.adUnit - Ad Unit from [[AdUnits]]
         * @param {AppPromotionEnums.Breakdowns | AppPromotionEnums.Metrics} reportingOptions.order - order report according to a specific Breakdown or Metric
         * @param {string} reportingOptions.direction - either 'asc' or 'desc'
         * 
         * @returns {Stream} - Readable Stream with results - in case of when format is json each chunk will be a json list.
         */
        public getAdvertiserStatistics(startDate: string, endDate: string, metrics: AppPromotionEnums.Metrics[], reportingOptions?: {
            breakdowns?: AppPromotionEnums.Breakdowns[], format?: 'csv' | 'json', count?: number, campaignId?: number[], bundleId?: string[],
            creativeId?: number[], country?: string[], os?: 'ios' | 'android', deviceType?: 'phone' | 'tablet', adUnit?: AppPromotionEnums.AdUnits,
            order?: AppPromotionEnums.Breakdowns | AppPromotionEnums.Metrics, direction: 'asc' | 'desc'
        }): Stream {


            const allowedMetrics = [
                AppPromotionEnums.Metrics.Impressions,
                AppPromotionEnums.Metrics.Spend,
                AppPromotionEnums.Metrics.Clicks,
                AppPromotionEnums.Metrics.Installs,
                AppPromotionEnums.Metrics.Completions];
            const metricsDiff = _.difference(metrics, allowedMetrics);
            if (metricsDiff.length > 0) {
                throw Error(`Only ${allowedMetrics.join(', ')} Metrics are not allowed in Advertiser Reporting`);
            }
            if (reportingOptions?.breakdowns) {
                const allowedBreakdowns = [
                    AppPromotionEnums.Breakdowns.Day,
                    AppPromotionEnums.Breakdowns.Campaign,
                    AppPromotionEnums.Breakdowns.Title,
                    AppPromotionEnums.Breakdowns.Application,
                    AppPromotionEnums.Breakdowns.AdUnit,
                    AppPromotionEnums.Breakdowns.Country,
                    AppPromotionEnums.Breakdowns.OS,
                    AppPromotionEnums.Breakdowns.DeviceType,
                    AppPromotionEnums.Breakdowns.Creatives
                ];
                const breakdownDiff = _.difference(reportingOptions?.breakdowns, allowedBreakdowns);
                if (breakdownDiff.length > 0) {
                    throw Error(`Only ${allowedBreakdowns.join(', ')} Breakdowns are not allowed in Advertiser Reporting`);
                }

            }

            if (reportingOptions?.order) {

                const allowedOrder = [
                    AppPromotionEnums.Breakdowns.Day,
                    AppPromotionEnums.Breakdowns.Campaign,
                    AppPromotionEnums.Breakdowns.Title,
                    AppPromotionEnums.Breakdowns.Application,
                    AppPromotionEnums.Breakdowns.Country,
                    AppPromotionEnums.Breakdowns.Creatives,
                    AppPromotionEnums.Breakdowns.OS,
                    AppPromotionEnums.Metrics.Impressions,
                    AppPromotionEnums.Metrics.Clicks,
                    AppPromotionEnums.Metrics.Completions,
                    AppPromotionEnums.Metrics.Spend,
                    AppPromotionEnums.Metrics.Installs
                ];
                const orderDiff = _.difference(reportingOptions?.order, allowedOrder);
                if (orderDiff.length > 0) {
                    throw Error(`You can only order by ${allowedOrder.join(', ')} for Advertiser Reporting`);

                }
            }

            return this.reportingAPIImpl(startDate, endDate, metrics, REPORTING_API, 'Error getting advertiser statistics');

        }


        /**
         * 
         * @param {number} campaignId - campaign id to get bids for
         * @param {number} maxRecords - (optional) max number of records - default 10000
         * @returns {Stream} - ReadableStream that will contain the result
         */
        public getBidsForCampaign(campaignId: number, maxRecords?: 10000 | number): Stream {

            const inoutStream = new Transform({
                transform(chunk, encoding, callback) {
                    this.push(chunk);
                    callback();
                }
            });

            this.getBearerToken().then((updatedToken) => {

                const options: AxiosRequestConfig = {
                    url: MULTI_BID_API,
                    headers: { Authorization: this.Bearer + updatedToken },
                    params: { 'campaignId': campaignId }
                };
                if (maxRecords !== undefined) options.params.count = maxRecords;
                utils.executeRequestWithPaging(options, inoutStream, 'bids', 'Error getting bids for campaign');


            });

            return inoutStream;

        }

        /**
         * 
         * @param {[CampaignBidList]} campaignBids List of [[CampaignBids]] to update
         * @returns {Array<Object>} - Array with API results.
         */
        public async updateBids(campaignBids: CampaignBidList[]): Promise<string> {
            const updatedToken = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: MULTI_BID_API,
                headers: { Authorization: this.Bearer + updatedToken },
                method: this.PUT
            };
            const resSummary: any = [];
            await utils.asyncForEach(campaignBids, async (campaignBid: CampaignBidList) => {
                const campaignBidsObj = campaignBid.getObjectForUpdate();
                const bidsChunks = _.chunk(campaignBidsObj.bids, 9998);
                await utils.asyncForEach(bidsChunks, async (chunk: any) => {

                    options.data = { campaignId: campaignBidsObj.campaignId, bids: chunk };
                    const res = await utils.executeRequest(options);
                    resSummary.push({ campaignId: campaignBidsObj.campaignId, bidUpdates: chunk.length, msg: res.msg, errorCode: res.errorCode });
                });
            });

            return resSummary;

        }
        /**
         * 
         * @param {[CampaignBidList]} campaignBids list of [[CampaignBids]] to delete.
         * @returns {Array<Object>} - Arry with API results.
         */
        public async deleteBids(campaignBids: CampaignBidList[]): Promise<string> {
            const updatedToken = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: MULTI_BID_API,
                headers: { Authorization: this.Bearer + updatedToken },
                method: this.DELETE
            };

            const resSummary: any = [];
            await utils.asyncForEach(campaignBids, async (campaignBid: CampaignBidList) => {
                const campaignBidsObj = campaignBid.getObjectForDelete();
                const bidsChunks = _.chunk(campaignBidsObj.bids, 9998);
                await utils.asyncForEach(bidsChunks, async (chunk: any) => {

                    options.data = { campaignId: campaignBidsObj.campaignId, bids: chunk };
                    const res = await utils.executeRequest(options);
                    resSummary.push({ campaignId: campaignBidsObj.campaignId, bidUpdates: chunk.length, msg: res.msg, errorCode: res.errorCode });
                });
            });

            return resSummary;
        }


        /**
         * @returns {string} in json format of the audience list
         * @example - ```{
          "count": 1,
          "audiences": [
            {
              "id": 1,
              "type": "targeting",
              "name": "batz",
              "description": "batz",
              "bundleId": "com.adsd.sdf",
              "platform": "android",
              "lastModified": "2017-01-31T20:00:00.000Z",
              "hasActiveCampaigns": true
            }
          ]
        }```

         */
        public async getAudienceLists(): Promise<string> {
            const updatedToken = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: AUDIENCE_API_SHOW,
                headers: { Authorization: this.Bearer + updatedToken },
                method: this.GET
            };

            const res = await utils.executeRequest(options);
            if (res.errorCode != -1) {
                throw new Error(`Error getting Audience Lists ${res.msg}`);
            }
            return res.msg;
        }

        /**
         * 
         * @param {AudienceListMeta} audienceListMeta - [[AudienceListMeta]] meta data of the audience list to create
         */
        public async createAudienceList(audienceListMeta: AudienceListMeta): Promise<string> {
            const updatedToken = this.getBasicAuthToken();

            const options: AxiosRequestConfig = {
                url: AUDIENCE_API_CREATE,
                headers: { Authorization: 'Basic ' + updatedToken },
                method: this.POST,
                data: audienceListMeta.toObject()
            };

            const res = await utils.executeRequest(options);
            if (res.errorCode != -1) {
                throw new Error(`Error creating Audience Lists ${JSON.stringify(res.msg)}`);
            }
            return res.msg;
        }
        /**
         *  
         * @param {string} audienceListId - Audience List ID to delete
         */
        public async deleteAudienceList(audienceListId: string): Promise<string> {
            const updatedToken = this.getBasicAuthToken();

            const options: AxiosRequestConfig = {
                url: AUDIENCE_API_DELETE.replace('{id}', audienceListId),
                headers: { Authorization: 'Basic ' + updatedToken },
                method: this.DELETE
            };

            const res = await utils.executeRequest(options);
            if (res.errorCode != -1) {
                throw new Error(`Error deleting Audience Lists ${res.msg}`);
            }
            return res.msg;
        }
        /**
         * 
         * @param {AudienceListData} audienceListData - [[AudienceListData]] Audience List data to update 
         */
        public async updateAudienceList(audienceListData: AudienceListData): Promise<string> {
            const updatedToken = this.getBasicAuthToken();

            const options: AxiosRequestConfig = {
                url: AUDIENCE_API_UPDATE,
                headers: { Authorization: 'Basic ' + updatedToken },
                method: this.POST,
                data: audienceListData.toObject()
            };

            const res = await utils.executeRequest(options);
            if (res.errorCode != -1) {
                throw new Error(`Error updating Audience Lists ${res.msg}`);
            }
            return res.msg;
        }
        /**
         * 
         * @param options Optional Params
         * @param {string} options.os  - 'android' or 'ios'
         * @param {string} options.searchTerm - Filter by the name or partial name of the title.
         * @param {string} options.requestId - For paginated requests pass the requestId from the response.
         * @param {number} options.resultsBulkSize - For paginated requests pass the amount of titles to return, default 100.
         * @param {number} options.pageNumber - For paginated requests pass the next page of the request.
         * @returns {string} in json format of the audience list
         * @example - ```{
                "titles": [
                {
                    "id": 113366,
                    "bundleId": "com.yourcompany.MiniGame",
                    "os": "android",
                    "name": "Gaming mania"
                },
                {
                    "id": 225566,
                    "bundleId": "com.yourcompany.BestGame",
                    "os": "ios",
                    "name": "The Best Game"
                }
                ],
                "totalResultsCount": 5,
                "requestId": "MzUzMjIuODI5OTk5OS41LjI5"
                }```
         */
        public async getTitles(options?: {
            os?: string,
            searchTerm?: string,
            requestId?: string,
            resultsBulkSize?: number,
            pageNumber?: number
        }): Promise<string> {

            const {
                os, searchTerm, requestId,
                resultsBulkSize, pageNumber
            } = { ...{ resultsBulkSize: 100 }, ...options };

            const updatedToken = await this.getBearerToken();

            const reqOptions: AxiosRequestConfig = {
                url: TITLE_API,
                headers: { Authorization: this.Bearer + updatedToken },
                method: this.GET,
                params: _.pickBy({
                    os,
                    searchTerm,
                    requestId,
                    resultsBulkSize,
                    pageNumber
                }, _.identity)
            };

            const res = await utils.executeRequest(reqOptions);
            if (res.errorCode != -1) {
                throw new Error(`Error getting titles list ${res.msg}`);
            }
            return res.msg;


        }

        /**
         * 
         * @param options Optional parameters
         * @param {string} options.type - Asset type ('video', 'html', 'html_iec')
         * @param {number} options.titleId - ID of the title of which the assets belongs to.
         * @param {number[]} options.ids - List of assets ids.
         * @param {string} options.requestId - For paginated requests pass the requestId from the response.
         * @param {number} options.resultsBulkSize - For paginated requests pass the amount of titles to return, default 100.
         * @param {number} options.pageNumber - For paginated requests pass the next page of the request.
         * @returns {string} in json format of the audience list
         * @example - ```{
  "assets": [
    {
      "id": 200303,
      "type": "html_iec",
      "titleId": 501567,
      "orientation": "all",
      "source": "playworks",
      "duration": null
    },
    {
      "id": 200302,
      "type": "video",
      "titleId": 501567,
      "orientation": "all",
      "source": "none",
      "duration": 17
    }
  ],
  "totalResultsCount": 6,
  "requestId": "MjA1MzUzLjIwMDMwMy40LjM1OTY="
} ```
         */
        public async getAssets(options?: {
            type?: string,
            titleId?: number,
            ids?: number[],
            requestId?: string,
            resultsBulkSize?: number,
            pageNumber?: number
        }): Promise<string> {

            const {
                type, titleId, ids,
                requestId, resultsBulkSize, pageNumber
            } = { ...{ resultsBulkSize: 100 }, ...options };

            const updatedToken = await this.getBearerToken();

            const reqOptions: AxiosRequestConfig = {
                url: ASSETS_API,
                headers: { Authorization: this.Bearer + updatedToken },
                method: this.GET,
                params: _.pickBy({
                    type,
                    titleId,
                    ids,
                    requestId,
                    resultsBulkSize,
                    pageNumber
                }, _.identity)
            };

            const res = await utils.executeRequest(reqOptions);
            if (res.errorCode != -1) {
                throw new Error(`Error getting titles list ${res.msg}`);
            }
            return res.msg;
        }

        public async createAsset(titleId: number, type: string, filePath: string, fileName?: string): Promise<string> {

            if (Number.isNaN(titleId)) {
                throw new Error('titleId must be of type number');
            }
            if (['image', 'video'].indexOf(type) <= -1) {
                throw new Error('type must be `image` or `video`');
            }
            const updatedToken = await this.getBearerToken();
            const fName = fileName || utils.getFileName(filePath);

            const formData = new FormData();
            formData.append('titleId', titleId.toString());
            formData.append('type', type);
            formData.append('file', utils.getFileContent(filePath), fName);

            const reqOptions: AxiosRequestConfig = {
                url: ASSETS_API,
                headers: {
                    Authorization: this.Bearer + updatedToken,
                    'content-type': 'multipart/form-data'
                },
                method: this.POST,
                data: formData
            };

            const res = await utils.executeRequest(reqOptions);
            if (res.errorCode != -1) {
                throw new Error(`Error uploading assets ${res.msg}`);
            }
            return res.msg;


        }


        public async getCreatives(options?: { type?: AppPromotionEnums.CreativeType, titleId?: number, requestId?: string, pageNumber?: string, resultsBulkSize?: number }): Promise<string> {
            const {
                type, titleId,
                requestId, resultsBulkSize, pageNumber
            } = { ...{ resultsBulkSize: 100 }, ...options };

            const updatedToken = await this.getBearerToken();

            const reqOptions: AxiosRequestConfig = {
                url: CREATIVE_API,
                headers: { Authorization: this.Bearer + updatedToken },
                method: this.GET,
                params: _.pickBy({
                    type,
                    titleId,
                    requestId,
                    resultsBulkSize,
                    pageNumber
                }, _.identity)
            };

            const res = await utils.executeRequest(reqOptions);
            if (res.errorCode != -1) {
                throw new Error(`Error getting creatives list ${res.msg}`);
            }
            return res.msg;
        }

        public async createCreative(titleId: number, creatives: Creative[]): Promise<string> {

            if (!titleId) {
                throw Error('Title Id is mandatory');
            }
            if (_.isEmpty(creatives)) {
                throw Error('One or more creatives is mandatory');
            }

            const token = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: CREATIVE_API,
                headers: { Authorization: this.Bearer + token },
                method: this.POST,
                data: {
                    titleId: titleId,
                    creatives: []
                }
            };

            creatives.forEach((creative) => {
                if (!creative.isValidated()) {
                    throw new Error(`Creative ${creative.name} is missing assets`);
                }
                options.data.creatives.push(creative.getObject());
            });

            const res = await utils.executeRequest(options);
            if (res.errorCode != -1) {
                throw new Error(`Error creating creatives Lists ${res.msg}`);
            }
            return res.msg;
        }

        /**
        * 
        * @param {string} startDate - report start date in the following format YYYY-MM-DD
        * @param {string}  endDate -report end date in the following format YYYY-MM-DD
        * @param {AppPromotionMetrics.Metrics} metrics -  list of report metrics.
        * @param {object} reportingOptions - Optional additional parameters.
        * @param {AppPromotionBreakdowns} reportingOptions.breakdowns -  list of breakdowns.
        * @param {string} reportingOptions.format - report format type 'csv' or 'json' only
        * @param {number} reportingOptions.count - maximum number of records in the report
        * @param {[number]} reportingOptions.campaignId - list of campaign ids
        * @param {[string]} reportingOptions.bundleId - list of bundle ids
        * @param {AppPromotionEnums.Breakdowns | AppPromotionEnums.Metrics} reportingOptions.order - order report according to a specific Breakdown or Metric
        * @param {string} reportingOptions.direction - either 'asc' or 'desc'
        * 
        * @returns {Stream} - Readable Stream with results - in case of when format is json each chunk will be a json list.
        */
        public getSkanReporting(startDate: string, endDate: string, metrics: AppPromotionEnums.Metrics[], reportingOptions?: {
            breakdowns?: AppPromotionEnums.Breakdowns[], format?: 'csv' | 'json', count?: number, campaignId?: number[], bundleId?: string[],
            creativeId?: number[], country?: string[], os?: 'ios' | 'android', deviceType?: 'phone' | 'tablet', adUnit?: AppPromotionEnums.AdUnits,
            order?: AppPromotionEnums.Breakdowns | AppPromotionEnums.Metrics, direction?: 'asc' | 'desc'
        }): Stream {
            const allowedMetrics = [
                AppPromotionEnums.Metrics.Impressions,
                AppPromotionEnums.Metrics.Spend,
                AppPromotionEnums.Metrics.Installs,
                AppPromotionEnums.Metrics.StoreOpens];
            const metricsDiff = _.difference(metrics, allowedMetrics);
            if (metricsDiff.length > 0) {
                throw Error(`Only ${allowedMetrics.join(', ')} Metrics are not allowed in Skan Reporting`);
            }
            if (reportingOptions?.breakdowns) {
                const allowedBreakdowns = [
                    AppPromotionEnums.Breakdowns.Day,
                    AppPromotionEnums.Breakdowns.Campaign,
                    AppPromotionEnums.Breakdowns.Title,
                    AppPromotionEnums.Breakdowns.Application,
                    AppPromotionEnums.Breakdowns.AdUnit,
                    AppPromotionEnums.Breakdowns.Country
                ];
                const breakdownDiff = _.difference(reportingOptions?.breakdowns, allowedBreakdowns);
                if (breakdownDiff.length > 0) {
                    throw Error(`Only ${allowedBreakdowns.join(', ')} Breakdowns are not allowed in Skan Reporting`);
                }

            }

            if (reportingOptions?.adUnit) {
                const allowedAdUnits = [
                    AppPromotionEnums.AdUnits.Interstitial,
                    AppPromotionEnums.AdUnits.RewardedVideo
                ];

                const adUnitsDiff = _.difference(reportingOptions?.adUnit, allowedAdUnits);
                if (adUnitsDiff.length > 0) {
                    throw Error(`Only ${allowedAdUnits.join(', ')} AdUnits are not allowed in Skan Reporting`);
                }
            }

            if (reportingOptions?.order) {

                const allowedOrder = [
                    AppPromotionEnums.Breakdowns.Day,
                    AppPromotionEnums.Breakdowns.Campaign,
                    AppPromotionEnums.Breakdowns.Title,
                    AppPromotionEnums.Breakdowns.Application,
                    AppPromotionEnums.Breakdowns.Country,
                    AppPromotionEnums.Metrics.Impressions,
                    AppPromotionEnums.Metrics.Spend,
                    AppPromotionEnums.Metrics.Installs
                ];
                const orderDiff = _.difference(reportingOptions?.order, allowedOrder);
                if (orderDiff.length > 0) {
                    throw Error(`You can only order by ${allowedOrder.join(', ')} for Skan Reporting`);

                }
            }

            return this.reportingAPIImpl(startDate, endDate, metrics, SKAN_REPORTING_API, 'Error while getting skan report', reportingOptions);

        }

        /**
         * returns a copy of the raw winning postbacks data from every network, directly from Apple.
         * @param date report date
         * @returns json with list of urls of the report
         * @example
         * {
                "urls": [
                    "https://postback-hub.s3.amazonaws.com/athena/raw_data_rtm_postback_hub_csv_file/outputs/athena/cf23fe03-cf05-4189-adda-d1cc009a9b59/3/output/companyid%123456/partition_date%3D2021-10-10/compaction_id%3D1/2021_10_11_00_00_output.csv?AWSAccessKeyId=ASIAQO6NX2IJOKSSQ34R&Expires=1633937977&Signature=um69g30FsSp%2BWENsxABotPnk0q8%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEG4aCWV1LXdlc3QtMSJHMEUCIQDLBLHPC84Xb6rXqooco4iY%2BsBJWs4BlPS1H0b27SrKgQIgHNu1on2rw8%2BktL5lEoP3RYbalryBm3bbmHTjHZbIOw8qgwQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwwMzIxMDY4NjEwNzQiDML7Dvs9adyo9dIx8yrXA5AtmSqdYTQnV0jgMywFD89FyN5Zgp72KCyvQVQr%2FqFcdkWovagJEICg%2BWAcLVAfU%2FNhgvcNV2h%2FIkdFt70rGGeTfyKr7viPo4wq9icnyc%2F12%2B5VYjrCEt8oPkdU6gmotTQ3qYChC2hlmhy1I5U6Jf%2FCSyZyFTIHSgvYH3OiepjOpIXuVxCTxBx6Snrq37w6ZScOZIZ5Emvf7Nl%2BzcNrr73cl5XOu%2FD7OmLrLMcIU%2FOLlndI2%2FbxS8r0EReV7ol1iq2QYsk%2FweiQa2BwHANl2GsZLogPNZ4GnJNS56TcUeAnZzHaHlAQ6wejyJ4VdPrE7OhIbJ6lj69zUIHJ8xFqqjFpAGdM39nxdWhcPAYkVI%2Bi8INCpcuwm7ceGFCtf6qMvN%2F%2F6MpRFkNYNMTez8843Lp2wp9lPuIcutliB6qF5tFUzohHRNuY4vNyOYX4Y5SNJ3JcHeqQxHR0svHTM8QZbfL7jDrNfGEzWsBmvyWcyy98FeKwTYvNkB55WngrNSSmAZs7u5%2Ba58EchbfMNtqEpT8TWhhHUn2hS%2FkVJ4m1SFHZTES6QspA2by3ubv1AWcB0nIASivErSe%2FjhZAF2xt5fXOybhjmhh2PsIFc49bzYv6UF3FybutkDC3j4%2BLBjqlAQqgV7JtYzWSt78TvnViUf%2Fn6Z8lHHhVTHzKekiFYj%2FMmp3nIpc2da5Z%2BYOv1HJg2NXzx%2BbtTTKH0WtU9qgJM%2Bj7Z%2F1w5WHIw4nTfIGhilvaXX0nRokJPjnQV8btnmQnWXmp9S6kfT13IoLqaxJQEw8kkY%2B7Isa6F%2BZeGqHtBausH4mlv5UPgfvUV15WVXG8YhAHA5OeKITkP4O9KrDePhX3Fd8SKg%3D%3D"
                ],
                "expiration": "2021-10-11 07:39:37"
            }
         */
        public async getUniversalSkanReport(date: string): Promise<string | undefined> {

            const updatedToken = await this.getBearerToken();

            const reqOptions: AxiosRequestConfig = {
                url: UNIVERSAL_SKAN_API,
                headers: { Authorization: this.Bearer + updatedToken },
                method: this.GET,
                params: { date: date }
            };

            const res: any = await utils.executeRequest(reqOptions);
            if (res.errorCode != -1) {
                throw new Error(`Error getting Universal Skan Report ${res.msg}`);
            }
            if (res?.msg?.urls && res?.msg?.urls.length > 0) {
                const reportUrl = decodeURI(res?.msg?.urls[0]);

                const reportReqOptions: AxiosRequestConfig = {
                    url: reportUrl,
                    method: this.GET
                };
                const reportRes: any = await utils.executeRequest(reportReqOptions);
                return reportRes.msg;
            }
            return;

        }

        private reportingAPIImpl(startDate: string, endDate: string, metrics: AppPromotionEnums.Metrics[], apiUrl: string, errorMsg: string, reportingOptions?: any): Stream {
            const inoutStream = new Transform({
                transform(chunk, encoding, callback) {
                    this.push(chunk);
                    callback();
                }
            });

            this.getBearerToken().then((updatedToken) => {
                const options: AxiosRequestConfig = {
                    url: apiUrl,
                    headers: { Authorization: this.Bearer + updatedToken },
                    params: {
                        'startDate': startDate,
                        'endDate': endDate,
                        'metrics': metrics.join(',')
                    }
                };

                if (reportingOptions !== undefined) {
                    const optionalReportingObj: any = _.pickBy(reportingOptions, _.identity);
                    options.params = { ...options.params, ...optionalReportingObj };
                }


                utils.executeRequestWithPaging(options, inoutStream, 'data', errorMsg);

            });


            return inoutStream;
        }

    }


}