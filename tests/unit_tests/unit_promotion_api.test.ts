/* eslint-disable prefer-const */

import * as sinon from 'sinon';

import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiThings from 'chai-things'
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import * as moment from 'moment';
import { inspect } from 'util'
import * as FormData from 'form-data';
import { createReadStream } from 'fs'

import { AxiosRequestConfig } from 'axios';
import { ResponseObject } from '../../lib/utils'
import { BaseAPI } from '../../lib/base_api'
import * as isUtils from '../../lib/utils';

import { AppPromotionAPI } from '../../lib/app_promotion_api';
import { Stream } from 'stream';
import { IronSource, AudienceListMeta, AudienceListType, AudienceListData, AppPromotionEnums, CampaignBidList, CampaignBid } from '../../lib/index';
import { Creative, CreativeAsset } from '../../lib/models/creative';
import { Transform } from 'stream';

chai.use(chaiAsPromised)
chai.use(chaiThings);
chai.use(sinonChai);

sinon.setFormatter((args) => {
  return "\n" + inspect(args, { depth: null, colors: true })
});

process.env.DEBUG = 'true';

const ironsource = new IronSource();

const promoteAPI = ironsource.PromoteAPI();

promoteAPI.setCredentials('USERNAME', 'SECRET', 'TOKEN')

describe('Promotion API - Unit Tests', function (){
  const getExecuteRequestStub = (options?: { response?: ResponseObject, request?: AxiosRequestConfig }) => {
    const { request, response } = { ...options };
    const resObj: ResponseObject = response || { msg: 'fake data', errorCode: -1 }
    if (request) {
      return sinon.stub(isUtils, 'executeRequest').withArgs(request).resolves(resObj);
    }
    return sinon.stub(isUtils, 'executeRequest').resolves(resObj);
  }

  const getExeReqWithPaginationStub = (options?: { request?: AxiosRequestConfig, inoutStream: Transform, key: string, error: string }) => {

    const { inoutStream, request, key, error } = { ...options };
    if (inoutStream && request && key && error) {
      return sinon.stub(isUtils, 'executeRequestWithPaging').withArgs(request, inoutStream, key, error).returns();
    }

    return sinon.stub(isUtils, 'executeRequestWithPaging').returns();
  }
  describe('unit test -  ironsource_getPromoteAPI', function () {
    it('unit test - returns ironsource promote api', function () {

      expect(promoteAPI).to.be.instanceOf(AppPromotionAPI.API);

    });
  });

  afterEach(() => {
    sinon.restore();
  });
  beforeEach(() => {
    sinon.stub(BaseAPI.prototype, <any>'getBearerToken').returns(Promise.resolve("API_TOKEN"));
    sinon.stub(BaseAPI.prototype, <any>'getBasicAuthToken').returns("API_TOKEN");

  })

  describe('unit test -  ironSource Audience List API', function () {

    const audienceListTrgtName = `AudienceListTest_Trgt_Test`;
    let audienceListTrgtId = 1234;

    const audienceListSprsnName = `AudienceListTest_Sprsn_Test`;
    let audienceListSprsnId = 1234;

    it('unit test - creates new Targeting Audience list ', async function () {

      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://platform-api.supersonic.com/audience/api/create",
        headers: { Authorization: "Basic API_TOKEN" },
        method: "POST",
        data: {
          name: audienceListTrgtName,
          type: "targeting",
          description: `desc_${audienceListTrgtName}`
        }

      }
      const ALMetaData = new AudienceListMeta(audienceListTrgtName, AudienceListType.Targeting, `desc_${audienceListTrgtName}`);
      expect(ALMetaData).not.to.be.undefined;

      let res: any = await promoteAPI.createAudienceList(ALMetaData);
      expect(axiosStub).to.be.calledWith(reqOptions);
    })

    it('unit test - creates new suppression list', async function () {

      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://platform-api.supersonic.com/audience/api/create",
        headers: { Authorization: "Basic API_TOKEN" },
        method: "POST",
        data: {
          name: audienceListSprsnName,
          type: "suppression_static",
          description: `desc_${audienceListSprsnName}`,
          platform: "android",
          bundleId: "iron.web.jalepano.browser"
        }

      }

      const ALMetaData = new AudienceListMeta(audienceListSprsnName, AudienceListType.Suppression, `desc_${audienceListSprsnName}`,
        { bundleId: 'iron.web.jalepano.browser', platform: AppPromotionEnums.PLATFORM.Android });
      expect(ALMetaData).not.to.be.undefined;
      let res: any = await promoteAPI.createAudienceList(ALMetaData);
      expect(axiosStub).to.be.calledWith(reqOptions)
    })

    it('unit test - Throws exception when there are missing parameters for suppression audience list type', async function () {

      expect(function () {
        new AudienceListMeta(audienceListSprsnName, AudienceListType.Suppression, `desc_${audienceListSprsnName}`,
          { bundleId: 'iron.web.jalepano.browser' })
      }).to.throw('Platform is required when using Suppression type list');


      expect(function () {
        new AudienceListMeta(audienceListSprsnName, AudienceListType.Suppression, `desc_${audienceListSprsnName}`,
          { platform: AppPromotionEnums.PLATFORM.Android })
      }).to.throw('Bundle Id is required when using Suppression type list');

    })

    it('unit test - Should add devices to targeting list', async function () {

      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://platform-api.supersonic.com/audience/api",
        headers: { Authorization: "Basic API_TOKEN" },
        method: "POST",
        data: {
          deviceIds: ['bb602f59-0cf6-4d25-8ba5-19eb6e1c68f0', '3075ac27-1718-44f2-a0a7-072bc565777e'],
          addAudience: ['1234']
        }

      }

      let ALData = new AudienceListData();
      ALData.addDevices(['bb602f59-0cf6-4d25-8ba5-19eb6e1c68f0', '3075ac27-1718-44f2-a0a7-072bc565777e']);
      ALData.addAudienceListToUpdate(audienceListTrgtId.toString());
      let res: any = await ironsource.PromoteAPI().updateAudienceList(ALData);
      expect(axiosStub).to.be.calledWith(reqOptions)

    })



    it('unit test - Should remove devices from lists', async function () {

      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://platform-api.supersonic.com/audience/api",
        headers: { Authorization: "Basic API_TOKEN" },
        method: "POST",
        data: {
          deviceIds: ['bb602f59-0cf6-4d25-8ba5-19eb6e1c68f0', '3075ac27-1718-44f2-a0a7-072bc565777e'],
          removeAudience: ['1234', '1234']
        }

      }

      let ALData = new AudienceListData();
      ALData.addDevices(['bb602f59-0cf6-4d25-8ba5-19eb6e1c68f0', '3075ac27-1718-44f2-a0a7-072bc565777e']);
      ALData.addAudienceListToRemove(audienceListSprsnId.toString());
      ALData.addAudienceListToRemove(audienceListTrgtId.toString());
      let res: any = await ironsource.PromoteAPI().updateAudienceList(ALData);
      expect(axiosStub).to.be.calledWith(reqOptions)

    })

    it('unit test - should show all audience lists', async function () {

      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://platform-api.supersonic.com/audience/api/show",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "GET"

      }

      let res: any = await ironsource.PromoteAPI().getAudienceLists();
      expect(axiosStub).to.be.calledWith(reqOptions)
      // expect(res.audiences).to.be.an('array');
    })

    it('unit test - should delete all audience lists', async function () {

      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://platform-api.supersonic.com/audience/api/1234",
        headers: { Authorization: "Basic API_TOKEN" },
        method: "DELETE"

      }
      let res = await ironsource.PromoteAPI().deleteAudienceList(audienceListSprsnId.toString());
      expect(axiosStub).to.be.calledWith(reqOptions)

    })


  })

  describe('unit test -  ironSource bid api', function () {

    const bidsArrayTest: any = [
      { country: 'AR', bid: 1 },
      { country: 'AU', bid: 7 },
      { country: 'BR', bid: 2 },
      { country: 'CA', bid: 5 },
      { country: 'DE', bid: 3 },
      { country: 'IL', bid: 4 },
      { country: 'IR', bid: 5 },
      { country: 'US', bid: 10 }
    ];
    const testCampaignId = 1234;
    const testAppId = 1234;

    it('unit test - should set bids to campaign without application Id', async function () {
      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/multibid",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "PUT",
        data: {
          campaignId: testCampaignId,
          bids: bidsArrayTest
        }

      }

      let bidList = new CampaignBidList(testCampaignId);
      for (let i = 0; i < bidsArrayTest.length; i++) {
        bidList.addBid(new CampaignBid(bidsArrayTest[i].bid, bidsArrayTest[i].country));
      }

      let res: any = await promoteAPI.updateBids([bidList])
      expect(axiosStub).to.be.calledWith(reqOptions);
    })
    it('unit test - Should get all bids for campaign, 5 at a time', async function () {

      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/multibid",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "PUT",
        data: {
          campaignId: testCampaignId,
          bids: bidsArrayTest
        }

      }
      const axiosStub = getExeReqWithPaginationStub();
      await new Promise((resolve: any) => {
        let resStream: Stream = promoteAPI.getBidsForCampaign(testCampaignId, 5);


        resStream.on('data', function (chunk: Buffer) {
          console.log(chunk)
        })
        resStream.on('end', function () {
          resolve();
          expect(axiosStub).to.have.been.calledWith(reqOptions, resStream, 'bids', 'Error getting bids for campaign')

        })
        resStream.emit('end')
      })

    })

    it('unit test - should delete campaign bid', async function () {

      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/multibid",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "DELETE",
        data: {
          campaignId: testCampaignId,
          bids: [{ country: 'AR' },
          { country: 'AU' },
          { country: 'BR' },
          { country: 'CA' },
          { country: 'DE' },
          { country: 'IL' },
          { country: 'IR' },
          { country: 'US' }]
        }

      }


      let bidList = new CampaignBidList(testCampaignId);
      for (let i = 0; i < bidsArrayTest.length; i++) {
        bidList.addBid(new CampaignBid(bidsArrayTest[i].bid, bidsArrayTest[i].country));
      }
      let res: any = await promoteAPI.deleteBids([bidList])
      expect(axiosStub).to.be.calledWith(reqOptions)
    })

    it('unit test - should set bids to campaign with application Id', async function () {


      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/multibid",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "PUT",
        data: {
          campaignId: testCampaignId,
          bids: [{ country: 'US', bid: 10, applicationId: testAppId }]
        }

      }
      let bidList = new CampaignBidList(testCampaignId);

      bidList.addBid(new CampaignBid(10, 'US', testAppId));


      let res: any = await promoteAPI.updateBids([bidList])
      expect(axiosStub).to.be.calledWith(reqOptions)
    })

    it('unit test - should delete bids to campaign with application Id', async function () {
      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/multibid",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "DELETE",
        data: {
          campaignId: testCampaignId,
          bids: [{ country: 'US', applicationId: testAppId }]
        }

      }

      let bidList = new CampaignBidList(testCampaignId);

      bidList.addBid(new CampaignBid(10, 'US', testAppId));


      let res: any = await promoteAPI.deleteBids([bidList])
      expect(axiosStub).to.be.calledWith(reqOptions);
    })


  })


  describe('unit test -  ironSource Title API', function () {

    let requestId: string = 'test_req_id';
    let numberOfTitleToFetch: number = 3;

    it('unit test - Should get list of titles with search term', async function () {
      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/titles",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "GET",
        params: {
          searchTerm: 'Adobe',
          resultsBulkSize: 100
        }

      }
      let res: any = await promoteAPI.getTitles({ searchTerm: 'Adobe' });
      expect(axiosStub).to.be.calledWith(reqOptions)
    })

    it('unit test - Should get list of titles with max number of titles in the response', async function () {
      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/titles",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "GET",
        params: {
          resultsBulkSize: 50
        }

      }
      let res: any = await promoteAPI.getTitles({ resultsBulkSize: 50 });
      expect(axiosStub).to.be.calledWith(reqOptions)

    })

    it('unit test - Should get the rest of the titles from previous response', async function () {
      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/titles",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "GET",
        params: {
          resultsBulkSize: 100,
          requestId: requestId,
          pageNumber: 2
        }

      }
      let res: any = await promoteAPI.getTitles({ requestId: requestId, pageNumber: 2 });
      expect(axiosStub).to.be.calledWith(reqOptions)

    })

  })

  describe('unit test -  ironSource Assets API', function () {

    let requestId: string = 'test_req_id';
    let numberOfTitleToFetch: number = 3;

    it('unit test - Should get list of assets', async function () {

      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/assets",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "GET",
        params: {
          resultsBulkSize: 100,
          titleId: 604146
        }

      }


      let res: any = await promoteAPI.getAssets({ titleId: 604146 })
      expect(axiosStub).to.be.calledWith(reqOptions)



    })

    it('unit test - should upload asset to a test title', async function () {
      const fName = `test_asset_${moment().unix()}.jpeg`;
      const formData = new FormData();
      formData.append('titleId', '530297');
      formData.append('type', 'image');
      formData.append('file', createReadStream('./tests/test_asset.jpeg'), fName)
      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/assets",
        headers: { Authorization: "Bearer API_TOKEN", 'content-type': 'multipart/form-data' },
        method: "POST",
        data: formData

      }



      let res: any = await promoteAPI.createAsset(530297, 'image', './tests/test_asset.jpeg', fName);
      expect(axiosStub).to.be.calledWith(sinon.match.has('url', "https://api.ironsrc.com/advertisers/v2/assets"))
      expect(axiosStub).to.be.calledWith(sinon.match.has('method', "POST"))
      expect(axiosStub).to.be.calledWith(sinon.match.has('headers', { Authorization: "Bearer API_TOKEN", 'content-type': 'multipart/form-data' }))
      expect(axiosStub).to.be.calledWith(sinon.match((val) => {
        if (val.data instanceof FormData) {
          return true
        }
        return false;
      }))
    })


  })

  describe('unit test -  ironSource Creative API', function () {
    it('unit test - should throw exception ', async function () {

      const creativeName = `test_creative_${moment().unix()}`

      const creative = new Creative(creativeName, AppPromotionEnums.CreativeType.VIDEO_CAROUSEL, 'EN')
      expect(
        promoteAPI.createCreative(530297, [creative])
      ).to.eventually.be.rejectedWith(`Creative ${creativeName} is missing assets`);
    })

    it('unit test - Should get list of creatives', async function () {


      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/creatives?",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "GET",
        params: {
          resultsBulkSize: 100,
          titleId: 770594
        }

      }



      let res: any = await promoteAPI.getCreatives({ titleId: 770594 });
      expect(axiosStub).to.be.calledWith(reqOptions);


    })

    it('unit test - should create creative', async function () {

      const assets = [{ id: 1234, usageType: 'video' },
      { id: 1234, usageType: 'right' },
      { id: 1234, usageType: 'middle' },
      { id: 1234, usageType: 'left' }]
      const creativeName = `test_creative`

      const axiosStub = getExecuteRequestStub();
      const reqOptions: AxiosRequestConfig = {
        url: "https://api.ironsrc.com/advertisers/v2/creatives?",
        headers: { Authorization: "Bearer API_TOKEN" },
        method: "POST",
        data: {
          titleId: 530297,
          creatives: [{
            name: creativeName,
            language: 'EN',
            type: 'videoAndCarousel',
            assets: assets
          }
          ]
        }

      }

      const creative = new Creative(creativeName, AppPromotionEnums.CreativeType.VIDEO_CAROUSEL, 'EN')
      for (const creativeAsset of assets) {
        creative.addAsset(new CreativeAsset(creativeAsset.id, <AppPromotionEnums.UsageType>creativeAsset.usageType));
      }
      let res: any = await promoteAPI.createCreative(530297, [creative]);
      expect(axiosStub).to.be.calledWith(reqOptions)

    })
  })

})