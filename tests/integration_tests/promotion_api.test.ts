/* eslint-disable prefer-const */
import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiThings from 'chai-things'
import * as chaiAsPromised from 'chai-as-promised';

import * as moment from 'moment';
import { AppPromotionAPI } from '../../lib/app_promotion_api';
import { Stream } from 'stream';
import { IronSource, AudienceListMeta, AudienceListType, AudienceListData, AppPromotionEnums, CampaignBidList, CampaignBid } from '../../lib/index';
import { Creative, CreativeAsset } from '../../lib/models/creative';

chai.use(chaiAsPromised)
chai.use(chaiThings);

const API_CI_SECRET = (process.env.API_CI_SECRET) ? process.env.API_CI_SECRET : ''
const API_CI_TOKEN = (process.env.API_CI_TOKEN) ? process.env.API_CI_TOKEN : ''
const API_CI_USER = (process.env.API_CI_USER) ? process.env.API_CI_USER : ''
const DEMO_ACCOUNT_SECRET = (process.env.DEMO_ACCOUNT_SECRET) ? process.env.DEMO_ACCOUNT_SECRET : ''
const DEMO_ACCOUNT_TOKEN = (process.env.DEMO_ACCOUNT_TOKEN) ? process.env.DEMO_ACCOUNT_TOKEN : ''
const DEMO_ACCOUNT_USER = (process.env.DEMO_ACCOUNT_USER) ? process.env.DEMO_ACCOUNT_USER : ''

const ironsource = new IronSource();
ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);
process.env.DEBUG = 'true';


describe('Promotion API - Integration Tests', function () {
  let assetId = -1;

  describe('ironsource_getPromoteAPI', function () {
    it('returns ironsource promote api', function () {
      const promoteAPI = ironsource.PromoteAPI();
      expect(promoteAPI).to.be.instanceOf(AppPromotionAPI.API);

    });
  });

  describe('ironSource Audience List API', function () {

    const audienceListTrgtName = `AudienceListTest_Trgt_${moment().unix()}`;
    let audienceListTrgtId = -1;

    const audienceListSprsnName = `AudienceListTest_Sprsn_${moment().unix()}`;
    let audienceListSprsnId = -1;
    it('creates new Targeting Audience list ', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      const promoteAPI = ironsource.PromoteAPI();
      const ALMetaData = new AudienceListMeta(audienceListTrgtName, AudienceListType.Targeting, `desc_${audienceListTrgtName}`);
      expect(ALMetaData).not.to.be.undefined;
      let res: any = await promoteAPI.createAudienceList(ALMetaData);
      expect(res).to.be.an('object').and.to.have.key('id');
      audienceListTrgtId = res.id;
    })

    it('creates new suppression list', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      const promoteAPI = ironsource.PromoteAPI();
      const ALMetaData = new AudienceListMeta(audienceListTrgtName, AudienceListType.Suppression, `desc_${audienceListSprsnName}`,
        { bundleId: 'iron.web.jalepano.browser', platform: AppPromotionEnums.PLATFORM.Android });
      expect(ALMetaData).not.to.be.undefined;
      let res: any = await promoteAPI.createAudienceList(ALMetaData);
      expect(res).to.be.an('object').and.to.have.key('id');
      audienceListSprsnId = res.id;
    })

    it('Throws exception when there are missing parameters for suppression audience list type', async function () {

      expect(function () {
        new AudienceListMeta(audienceListTrgtName, AudienceListType.Suppression, `desc_${audienceListSprsnName}`,
          { bundleId: 'iron.web.jalepano.browser' })
      }).to.throw('Platform is required when using Suppression type list');


      expect(function () {
        new AudienceListMeta(audienceListTrgtName, AudienceListType.Suppression, `desc_${audienceListSprsnName}`,
          { platform: AppPromotionEnums.PLATFORM.Android })
      }).to.throw('Bundle Id is required when using Suppression type list');

    })

    it('Should add devices to targeting list', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      let ALData = new AudienceListData();
      ALData.addDevices(['bb602f59-0cf6-4d25-8ba5-19eb6e1c68f0', '3075ac27-1718-44f2-a0a7-072bc565777e']);
      ALData.addAudienceListToUpdate(audienceListTrgtId.toString());
      let res: any = await ironsource.PromoteAPI().updateAudienceList(ALData);
      expect(res).to.be.a('string').and.eql('Accepted');

    })

    it('Should add devices to suppression list', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      let ALData = new AudienceListData();
      ALData.addDevices(['bb602f59-0cf6-4d25-8ba5-19eb6e1c68f0', '3075ac27-1718-44f2-a0a7-072bc565777e']);
      ALData.addAudienceListToUpdate(audienceListSprsnId.toString());
      let res: any = await ironsource.PromoteAPI().updateAudienceList(ALData);
      expect(res).to.be.a('string').and.eql('Accepted');

    })


    it('Should remove devices from lists', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      let ALData = new AudienceListData();
      ALData.addDevices(['bb602f59-0cf6-4d25-8ba5-19eb6e1c68f0', '3075ac27-1718-44f2-a0a7-072bc565777e']);
      ALData.addAudienceListToRemove(audienceListSprsnId.toString());
      ALData.addAudienceListToRemove(audienceListTrgtId.toString());
      let res: any = await ironsource.PromoteAPI().updateAudienceList(ALData);
      expect(res).to.be.a('string').and.eql('Accepted');

    })

    it('should show all audience lists', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      let res: any = await ironsource.PromoteAPI().getAudienceLists();
      expect(res).to.be.an('object');
      expect(res.audiences).to.be.an('array');
    })

    it('should delete all audience lists', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      let audienceLists: any = await ironsource.PromoteAPI().getAudienceLists();
      for (let i = 0; i < audienceLists.audiences.length; i++) {
        let res = await ironsource.PromoteAPI().deleteAudienceList(audienceLists.audiences[i].id);
        expect(res).to.be.an('object');
      }
    })


  })



  describe('ironSource bid api', function () {

    const bidsArrayTest: any = [
      { country: 'AR', bid: 1 },
      { country: 'AU', bid: 7 },
      { country: 'BR', bid: 2 },
      { country: 'CA', bid: 5 },
      { country: 'DE', bid: 3 },
      { country: 'IL', bid: 4 },
      { country: 'GB', bid: 5 },
      { country: 'US', bid: 10 }
    ];
    const testCampaignId = 8377514;
    const testAppId = 366221;
    const promoteAPI = ironsource.PromoteAPI();
    it('should set bids to campaign without application Id', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      let bidList = new CampaignBidList(testCampaignId);
      for (let i = 0; i < bidsArrayTest.length; i++) {
        bidList.addBid(new CampaignBid(bidsArrayTest[i].bid, bidsArrayTest[i].country));
      }

      let res: any = await promoteAPI.updateBids([bidList])
      expect(res).to.be.an('array').with.lengthOf(1);
      expect(res[0].campaignId).to.eq(testCampaignId);
      expect(res[0].bidUpdates).to.eq(bidsArrayTest.length);
      expect(res[0].msg).to.eq('Accepted');
    })
    it('Should get all bids for campaign, 5 at a time', function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      return new Promise((resolve: any) => {
        let resStream: Stream = promoteAPI.getBidsForCampaign(testCampaignId, 5);

        let i = 1;
        resStream.on('data', function (chunk: Buffer) {

          let bidsArr = JSON.parse(chunk.toString('utf8'));
          if (i == 1) {
            expect(bidsArr).to.be.an('array').with.lengthOf(5);
            expect(bidsArr[0].country).to.eq('AR')
            expect(bidsArr[0].bid).to.eq(1)
          } else {
            expect(bidsArr).to.be.an('array').with.lengthOf(3)
          }
          i++;

        })
        resStream.on('end', function () {
          resolve();
        })
      })
    })

    it('should delete campaign bid', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      let bidList = new CampaignBidList(testCampaignId);
      for (let i = 0; i < bidsArrayTest.length; i++) {
        bidList.addBid(new CampaignBid(bidsArrayTest[i].bid, bidsArrayTest[i].country));
      }
      let res: any = await promoteAPI.deleteBids([bidList])

      expect(res).to.be.an('array').with.lengthOf(1);
      expect(res[0].campaignId).to.eq(testCampaignId);
      expect(res[0].bidUpdates).to.eq(bidsArrayTest.length);
      expect(res[0].msg).to.eq('Accepted');
    })

    it('should set bids to campaign with application Id', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      let bidList = new CampaignBidList(testCampaignId);

      bidList.addBid(new CampaignBid(10, 'US', testAppId));


      let res: any = await promoteAPI.updateBids([bidList])
      expect(res).to.be.an('array').with.lengthOf(1);
      expect(res[0].campaignId).to.eq(testCampaignId);
      expect(res[0].bidUpdates).to.eq(1);
      expect(res[0].msg).to.eq('Accepted');
    })

    it('should delete bids to campaign with application Id', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      let bidList = new CampaignBidList(testCampaignId);

      bidList.addBid(new CampaignBid(10, 'US', testAppId));


      let res: any = await promoteAPI.deleteBids([bidList])
      expect(res).to.be.an('array').with.lengthOf(1);
      expect(res[0].campaignId).to.eq(testCampaignId);
      expect(res[0].bidUpdates).to.eq(1);
      expect(res[0].msg).to.eq('Accepted');
    })


  })


  describe('ironSource Title API', function () {

    let requestId: string;
    let numberOfTitleToFetch: number;

    it('Should get list of titles with search term', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);

      const promoteAPI = ironsource.PromoteAPI();
      let res: any = await promoteAPI.getTitles({ searchTerm: 'Adobe' });
      expect(res).to.be.of.an('object');
      expect(res.titles).to.be.an('array').with.lengthOf(2);
    })

    it('Should get list of titles with max number of titles in the response', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);

      const promoteAPI = ironsource.PromoteAPI();
      let res: any = await promoteAPI.getTitles({ resultsBulkSize: 50 });
      expect(res).to.be.of.an('object');
      expect(res.titles).to.be.an('array').with.lengthOf(50);
      requestId = res.requestId;
      numberOfTitleToFetch = res.totalResultsCount - res.titles.length;

    })

    it('Should get the rest of the titles from previous response', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);

      const promoteAPI = ironsource.PromoteAPI();
      let res: any = await promoteAPI.getTitles({ requestId: requestId, pageNumber: 2 });
      expect(res.titles).to.be.an('array').with.lengthOf(numberOfTitleToFetch);

    })



  })

  describe('ironSource Assets API', function () {

    let requestId: string;
    let numberOfTitleToFetch: number;

    it('Should get list of assets', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);

      const promoteAPI = ironsource.PromoteAPI();
      let res: any = await promoteAPI.getAssets({ titleId: 604146 })
      expect(res).to.be.of.an('object');
      expect(res.assets).to.be.an('array').with.lengthOf(10);


    })

    it('should upload asset to a test title', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      const promoteAPI = ironsource.PromoteAPI();
      const fName = `test_asset_${moment().unix()}.jpeg`;
      let res: any = await promoteAPI.createAsset(530297, 'image', './tests/test_asset.jpeg', fName);

      expect(res).to.be.of.an('object');
      expect(res.assets).to.be.an('array').with.lengthOf(1);
      expect(res.assets[0].name).eq(fName);
      assetId = res.assets[0].id;
    })


  })

  describe('ironSource Creative API', function () {
    it('should throw exception ', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);
      const creativeName = `test_creative_${moment().unix()}`
      const promoteAPI = ironsource.PromoteAPI();
      const creative = new Creative(creativeName, AppPromotionEnums.CreativeType.VIDEO_CAROUSEL, 'EN')
      expect(
        promoteAPI.createCreative(530297, [creative])
      ).to.eventually.be.rejectedWith(`Creative ${creativeName} is missing assets`);
    })

    it('Should get list of creatives', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);

      const promoteAPI = ironsource.PromoteAPI();

      let res: any = await promoteAPI.getCreatives({ titleId: 770594 });
      expect(res).to.be.of.an('object');
      expect(res.creatives).to.be.an('array').with.lengthOf(5);


    })

    it('should create creative', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      const promoteAPI = ironsource.PromoteAPI();

      let creatives: any = await promoteAPI.getCreatives({ titleId: 530297 });
      expect(creatives.creatives[0].assets).to.be.an('array').with.lengthOf(4);
      const creativeName = `test_creative_${moment().unix()}`
      const creative = new Creative(creativeName, AppPromotionEnums.CreativeType.VIDEO_CAROUSEL, 'EN')
      for (const creativeAsset of creatives.creatives[0].assets) {
        creative.addAsset(new CreativeAsset(creativeAsset.id, creativeAsset.usageType));
      }
      let res: any = await promoteAPI.createCreative(530297, [creative]);
      expect(res).to.be.of.an('object');
      expect(res).to.have.property('success').eq(true)
      expect(res.ids).to.be.an('array').with.lengthOf(1)

    })
  })
})