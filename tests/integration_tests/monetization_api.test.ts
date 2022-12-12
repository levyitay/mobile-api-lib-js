/* eslint-disable prefer-const */
import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiThings from 'chai-things'
import * as moment from 'moment';
import { IronSourceMonetizeAPI } from '../../lib/monetize_api'
import { IronSource, MonetizeEnums, MediationGroupPriority, MediationGroupTier, TIER_TYPE, IronSourceInstance, VungleInstance } from '../../lib/index';
import { asyncFind } from '../../lib/utils';
import { Capping, Pacing, Placement } from '../../lib/models/placement';

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
describe('Monetize API - Integration Tests', function () {
  describe('ironsource_getMonetizeAPI', function () {
    it('returns ironsource monetize api', function () {
      const monetizeAPI = ironsource.MonetizeAPI();
      expect(monetizeAPI).to.be.instanceOf(IronSourceMonetizeAPI.API);
    });
  });

  describe('ironsource_reporting', function () {
    return
    it('should return demo data', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01');
      expect(res).to.be.an('array').and.not.empty;
      expect(res[0].data).to.be.an('array').and.not.empty;
      expect(res).to.have.lengthOf(4);
    })

    it('should return only demo data with app breakdown', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { breakdowns: [MonetizeEnums.Breakdowns.Application] });

      expect(res).to.be.an('array').with.lengthOf.greaterThan(15)

    })

    it('should return only demo data of one app', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', breakdowns: [MonetizeEnums.Breakdowns.Application] });

      expect(res).to.be.an('array').and.lengthOf(3);
      expect(res[0].appName).to.be.equals('Golden Cave Treasure (iOS)');

    })

    it('should return only demo data of one app and only US', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', country: 'US', breakdowns: [MonetizeEnums.Breakdowns.Country] });

      expect(res).to.be.an('array').and.lengthOf(3);
      expect(res[0].data).to.be.an('array').with.lengthOf(1);
      expect(res[0].data[0].countryCode).to.be.equal('US');

    })

    it('should return only demo data of one app and only rewarded video ad unit', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', adUnits: MonetizeEnums.AdUnits.RewardedVideo, breakdowns: [MonetizeEnums.Breakdowns.Application] });

      expect(res).to.be.an('array').and.lengthOf(1);
      expect(res[0].adUnits).to.be.equals('Rewarded Video');

    })

    it('should return only demo data of one app and only rewarded video ad unit and breakdown by network', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', adUnits: MonetizeEnums.AdUnits.RewardedVideo, breakdowns: [MonetizeEnums.Breakdowns.Network] });

      expect(res).to.be.an('array').and.lengthOf(10);

      expect(res[0].adUnits).to.be.equals('Rewarded Video');
      expect(res[0].providerName).not.to.be.undefined;
      expect(res[0].data[0]).not.to.be.empty;

    })


    it('should return demo data of one app and only rewarded video ad unit and breakdown by instance of ironSource ad network', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', adUnits: MonetizeEnums.AdUnits.RewardedVideo, adSource: MonetizeEnums.Networks.IronSource, breakdowns: [MonetizeEnums.Breakdowns.Instance] });

      expect(res).to.be.an('array').and.lengthOf(4);

      expect(res[0].adUnits).to.be.equals('Rewarded Video');
      expect(res[0].providerName).to.be.equal('ironSource');
      expect(res[0].instanceId).not.to.be.undefined;
      expect(res[0].instanceName).not.to.be.undefined;
      expect(res[0].data[0]).not.to.be.empty;

    })

    it('should return only demo data of one app and only and breakdown by ad unit', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', adSource: MonetizeEnums.Networks.IronSource, breakdowns: [MonetizeEnums.Breakdowns.AdUnits] });

      expect(res).to.be.an('array').and.lengthOf(3);
      expect(res[0].data).to.be.an('array').and.not.empty;

    })

    it('should return only demo data of one app and only and breakdown by country', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', adSource: MonetizeEnums.Networks.IronSource, breakdowns: [MonetizeEnums.Breakdowns.Country] });

      expect(res).to.be.an('array').and.lengthOf(3);
      expect(res[0].data).to.be.an('array').with.lengthOf(209);

    })

    it('should return only demo data of one app and only and breakdown by placement', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', adUnits: MonetizeEnums.AdUnits.RewardedVideo, breakdowns: [MonetizeEnums.Breakdowns.Placement] });


      expect(res).to.be.an('array').and.lengthOf(11);
      expect(res[0].adUnits).not.to.be.undefined;
      expect(res[0].data).to.be.an('array').not.empty;


    })

    it('should return only demo data of one app and only and breakdown by platform', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { adUnits: MonetizeEnums.AdUnits.RewardedVideo, breakdowns: [MonetizeEnums.Breakdowns.Platform] });


      expect(res).to.be.an('array').not.empty;
      expect(res[0].platform).not.to.be.undefined;
      expect(res[0].data).to.be.an('array').not.empty;


    })


    it('should return only demo data of one app and only and breakdown by segment', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581e0e5', adUnits: MonetizeEnums.AdUnits.RewardedVideo, breakdowns: [MonetizeEnums.Breakdowns.Segment] });


      expect(res).to.be.an('array').and.lengthOf(2);
      expect(res[0].segment).not.to.be.undefined;
      expect(res[0].data).to.be.an('array').not.empty;


    })


    it('should return only demo data of one app and only impressions metric', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581e0e5', adUnits: MonetizeEnums.AdUnits.RewardedVideo, metrics: [MonetizeEnums.Metrics.impressions] });


      expect(res).to.be.an('array').with.lengthOf(1);
      expect(res[0].data).to.be.an('array').with.lengthOf(1);
      expect(Object.keys(res[0].data[0])).to.have.lengthOf(1);
      expect(Object.keys(res[0].data[0])).to.have.deep.members(['impressions']);


    })


    it('should return only demo data of one app and only revenue metric', async function () {
      ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
      const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581e0e5', adUnits: MonetizeEnums.AdUnits.RewardedVideo, metrics: [MonetizeEnums.Metrics.revenue] });


      expect(res).to.be.an('array').with.lengthOf(1);
      expect(res[0].data).to.be.an('array').with.lengthOf(1);
      expect(Object.keys(res[0].data[0])).to.have.lengthOf(1);
      expect(Object.keys(res[0].data[0])).to.have.deep.members(['revenue']);


    })

    // it('should return user ad Revenue data ', async function () {
    //   return;
    //   ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
    //   const res: any = await ironsource.MonetizeAPI().getUserAdRevenue('2020-09-', 'aad44a35');

    // })


    // it('should return impressions level Revenue data ', async function () {
    //   return;
    //   ironsource.setCredentials(DEMO_ACCOUNT_USER, DEMO_ACCOUNT_SECRET, DEMO_ACCOUNT_TOKEN);
    // const res: any = await ironsource.MonetizeAPI().getARMReport('2020-09-', 'aad44a35');

    // })

  })
  const testAppName = `Test_${moment().unix()}`;
  let testAppKey: any;
  describe('ironsource_apps_api', function () {



    it('should return list of apps in the account', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      const res: any = await ironsource.MonetizeAPI().getApps();

      expect(res).to.be.an('array');
      expect(Object.keys(res[0])).to.have.deep.members(['appKey', 'appName', 'appStatus', 'platform', 'bundleId', 'taxonomy', 'creationDate', 'icon', 'adUnits', 'networkReportingApi', 'bundleRefId', 'coppa', 'ccpa'])


    })

    it('should add a test app', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      const adUnitStatus = new Map<MonetizeEnums.AdUnits, MonetizeEnums.AdUnitStatus>();
      adUnitStatus.set(MonetizeEnums.AdUnits.RewardedVideo, MonetizeEnums.AdUnitStatus.Test)
      adUnitStatus.set(MonetizeEnums.AdUnits.Offerwall, MonetizeEnums.AdUnitStatus.Test)
      adUnitStatus.set(MonetizeEnums.AdUnits.Interstitial, MonetizeEnums.AdUnitStatus.Test)
      adUnitStatus.set(MonetizeEnums.AdUnits.Banner, MonetizeEnums.AdUnitStatus.Test)


      const res: any = await ironsource.MonetizeAPI().addApp(testAppName, MonetizeEnums.PLATFORM.Android, false, { adUnitStatus: adUnitStatus });

      expect(res).to.be.an('object').with.key('appKey');

      const appList: any = await ironsource.MonetizeAPI().getApps();

      expect(appList).to.contain.an.item.with.property('appKey', res.appKey);
      let appObject;
      for (let i = 0; i < appList.length; i++) {
        if (appList[i].appKey == res.appKey) {
          appObject = appList[i];
          break;
        }
      }
      expect(appObject.appName).to.be.equal(testAppName);
      expect(appObject.platform).to.be.equal(MonetizeEnums.PLATFORM.Android.toString());
      expect(appObject.adUnits.rewardedVideo.activeNetworks).to.be.an('array').with.lengthOf(1);
      expect(appObject.adUnits.offerWall.activeNetworks).to.be.an('array').with.lengthOf(1);
      expect(appObject.adUnits.interstitial.activeNetworks).to.be.an('array').with.lengthOf(1);
      expect(appObject.adUnits.banner.activeNetworks).to.be.an('array').with.lengthOf(1);


    })


    it('should add a live app', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      const adUnitStatus = new Map<MonetizeEnums.AdUnits, MonetizeEnums.AdUnitStatus>();
      adUnitStatus.set(MonetizeEnums.AdUnits.RewardedVideo, MonetizeEnums.AdUnitStatus.Test)
      adUnitStatus.set(MonetizeEnums.AdUnits.Offerwall, MonetizeEnums.AdUnitStatus.Test)
      adUnitStatus.set(MonetizeEnums.AdUnits.Interstitial, MonetizeEnums.AdUnitStatus.Test)
      adUnitStatus.set(MonetizeEnums.AdUnits.Banner, MonetizeEnums.AdUnitStatus.Test)


      const res: any = await ironsource.MonetizeAPI().addApp('https://play.google.com/store/apps/details?id=iron.web.jalepano.browser', MonetizeEnums.Genres.NON_GAMING.OTHER_NON_GAMING.OTHER_NON_GAMING, true, { ccpa: true, adUnitStatus: adUnitStatus });

      expect(res).to.be.an('object').with.key('appKey');
      testAppKey = res.appKey;
      const appList: any = await ironsource.MonetizeAPI().getApps();

      expect(appList).to.contain.an.item.with.property('appKey', testAppKey);
      let appObject;
      for (let i = 0; i < appList.length; i++) {
        if (appList[i].appKey == testAppKey) {
          appObject = appList[i];
          break;
        }
      }
      expect(appObject.appName).to.be.equal('Super Fast Browser');
      expect(appObject.platform).to.be.equal(MonetizeEnums.PLATFORM.Android.toString());
      expect(appObject.adUnits.rewardedVideo.activeNetworks).to.be.an('array').with.lengthOf(1);
      expect(appObject.adUnits.offerWall.activeNetworks).to.be.an('array').with.lengthOf(1);
      expect(appObject.adUnits.interstitial.activeNetworks).to.be.an('array').with.lengthOf(1);
      expect(appObject.adUnits.banner.activeNetworks).to.be.an('array').with.lengthOf(1);


    })

  })
  describe('ironsource_mediation_instance_api', function () {


    let ironSourceInstanceId = -1;
    it('should create new instances and validate them', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      expect(testAppKey).not.to.be.undefined;
      let ironSourceRateMap = new Map<number, string[]>();
      ironSourceRateMap.set(10, ['US']);
      ironSourceRateMap.set(5, ['IL']);
      const ironSourceInstance = new IronSourceInstance('TEST', MonetizeEnums.AdUnits.RewardedVideo, testAppKey, false, { pricing: ironSourceRateMap });
      const vungleInstance = new VungleInstance('Test', MonetizeEnums.AdUnits.RewardedVideo, true, 'TEST', 'TEST', 'TEST', { rate: 2.5 });
      const res: any = await ironsource.MonetizeAPI().addInstances(testAppKey, [ironSourceInstance, vungleInstance]);

      expect(res).to.be.an('object').with.property('rewardedVideo');
      expect(res.rewardedVideo.ironSource).to.be.an('array').with.lengthOf(2);
      let newInstance;
      newInstance = await asyncFind(res.rewardedVideo.ironSource, async (obj: any) => {
        return (obj.name == "TEST" && obj.status == "inactive")
      })
      ironSourceInstanceId = newInstance.id;
      expect(newInstance.name).to.be.equal("TEST");
      expect(newInstance.status).to.be.equal("inactive");
      expect(newInstance.pricing).to.be.an('array').with.lengthOf(2);
      expect(newInstance.pricing).to.have.deep.members([{ "eCPM": 10, "Countries": ["US"] }, { "eCPM": 5, "Countries": ["IL"] }])
      expect(res.rewardedVideo.Vungle).to.be.an('array').with.lengthOf(1);
      expect(res.rewardedVideo.Vungle[0].rate).to.be.equal(2.5)




    })

    it('should add instance without appConfig level', async function () {

      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      expect(testAppKey).not.to.be.undefined;

      const vungleInstance = new VungleInstance('Test_2', MonetizeEnums.AdUnits.RewardedVideo, true, '', '', 'TEST', { rate: 2.5 });
      const res: any = await ironsource.MonetizeAPI().addInstances(testAppKey, [vungleInstance]);
      expect(res.rewardedVideo.Vungle).to.be.an('array').with.lengthOf(2);
    })

    it('should update instances ', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      expect(ironSourceInstanceId).not.to.be.equal(-1);
      const ironSourceRateMap = new Map<number, string[]>();
      ironSourceRateMap.set(7, ['US']);
      ironSourceRateMap.set(5, ['IL']);
      const ironSourceInstance = new IronSourceInstance('TEST', MonetizeEnums.AdUnits.RewardedVideo, testAppKey, false, { pricing: ironSourceRateMap, instanceId: ironSourceInstanceId });
      const ironSourceInstanceDef = new IronSourceInstance('Default', MonetizeEnums.AdUnits.RewardedVideo, testAppKey, true, { instanceId: 0 });

      const res: any = await ironsource.MonetizeAPI().updateInstance(testAppKey, [ironSourceInstanceDef, ironSourceInstance]);
      let newInstance;
      newInstance = await asyncFind(res.rewardedVideo.ironSource, async (obj: any) => {
        return obj.id == ironSourceInstanceId
      })
      expect(newInstance.pricing).to.have.deep.members([{ "eCPM": 7, "Countries": ["US"] }, { "eCPM": 5, "Countries": ["IL"] }])


    })
    it('should delete an instance', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      expect(ironSourceInstanceId).not.to.be.equal(-1);

      const res: any = await ironsource.MonetizeAPI().deleteInstance(testAppKey, ironSourceInstanceId);
      expect(res).to.be.an('object').with.property('rewardedVideo');
      expect(res.rewardedVideo.ironSource).to.be.an('array').with.lengthOf(1);


    })
  })

  describe('ironsource_mediation_group_api', function () {



    it('should return Test app mediation groups', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      const res: any = await ironsource.MonetizeAPI().getMediationGroups('c90cab7d');


      expect(res).to.have.property('appKey', 'c90cab7d');
      expect(res.adUnits).not.to.be.undefined;
      expect(res.adUnits.rewardedVideo).to.be.an('array');
      expect(res.adUnits.interstitial).to.be.an('array');
      expect(res.adUnits.banner).to.be.an('array');

      expect(res.adUnits.rewardedVideo[0]).to.have.property('groupName', 'All Countries');
      expect(res.adUnits.rewardedVideo[0].adSourcePriority).not.to.be.undefined;
      expect(res.adUnits.rewardedVideo[0].adSourcePriority.tier1).not.to.be.undefined;
      expect(res.adUnits.rewardedVideo[0].adSourcePriority.tier1.tierType).to.be.equal('sortByCpm');
      expect(res.adUnits.rewardedVideo[0].adSourcePriority.tier1.instances).to.be.an('array');
      expect(res.adUnits.rewardedVideo[0].adSourcePriority.tier1.instances).to.have.lengthOf(1);
      expect(res.adUnits.rewardedVideo[0].adSourcePriority.tier2.instances).to.have.lengthOf(3);
      expect(res.adUnits.rewardedVideo[0].adSourcePriority.tier3.instances).to.have.lengthOf(1);



    });

    let mediationGroupId = -1;
    it('should create mediation group for new test app ', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      expect(testAppKey).not.to.be.undefined;
      const mediationGroupPriority = new MediationGroupPriority();
      const tier1 = new MediationGroupTier(TIER_TYPE.MANUAL);
      tier1.addInstances(MonetizeEnums.Networks.IronSource, 0, { rate: 10, position: 1, capping: 2 })
      const tier2 = new MediationGroupTier(TIER_TYPE.SORT_BY_CPM);
      tier2.addInstances(MonetizeEnums.Networks.Vungle, 0, { rate: 4, position: 1 })

      mediationGroupPriority.setMediationGroupTier(tier1, 0);
      mediationGroupPriority.setMediationGroupTier(tier2, 1);

      const res: any = await ironsource.MonetizeAPI().createMediationGroup(testAppKey, MonetizeEnums.AdUnits.RewardedVideo, "Test_Group_Automation", ["US", "IL"], {
        adSourcePriority: mediationGroupPriority, groupPosition: 1
      })


      expect(res.adUnits).to.be.an('object');
      expect(res.adUnits.rewardedVideo).to.be.an('array').with.lengthOf(2);
      let groupObject: any = (res.adUnits.rewardedVideo[0].groupName == 'Test_Group_Automation') ? res.adUnits.rewardedVideo[0] : res.adUnits.rewardedVideo[1];
      expect(groupObject.groupName).to.be.equal('Test_Group_Automation');
      expect(groupObject.groupCountries).to.have.deep.members(["IL", "US"]);
      expect(groupObject.adSourcePriority).to.be.an('object');
      expect(groupObject.adSourcePriority.tier1.tierType).to.be.equal('manual');
      expect(groupObject.adSourcePriority.tier1.instances).to.be.an('array').with.lengthOf(1);
      expect(groupObject.adSourcePriority.tier1.instances[0].instanceId).to.be.eq(0);
      expect(groupObject.adSourcePriority.tier1.instances[0].providerName).to.be.eq(MonetizeEnums.Networks.IronSource);
      expect(groupObject.adSourcePriority.tier1.instances[0].capping).to.be.an('object').with.property('value', 2);
      expect(groupObject.adSourcePriority.tier1.instances[0].capping).to.have.property('interval', 'session');
      expect(groupObject.adSourcePriority.tier1.instances[0].rate).to.be.equal(10);

      expect(groupObject.adSourcePriority.tier2.tierType).to.be.equal('sortByCpm');
      expect(groupObject.adSourcePriority.tier2.instances).to.be.an('array').with.lengthOf(1);
      expect(groupObject.adSourcePriority.tier2.instances[0].instanceId).to.be.eq(0);
      expect(groupObject.adSourcePriority.tier2.instances[0].providerName).to.be.eq(MonetizeEnums.Networks.Vungle);

      mediationGroupId = groupObject.groupId;


    })



    it('should update mediation group for new test app', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      expect(mediationGroupId).not.to.be.equal(-1);

      let ironSourceRateMap = new Map<number, string[]>();
      ironSourceRateMap.set(10, ['US']);
      ironSourceRateMap.set(5, ['IL']);
      let ironSourceInstance = new IronSourceInstance('TEST_FOR_GROUP', MonetizeEnums.AdUnits.RewardedVideo, testAppKey, true, { pricing: ironSourceRateMap });
      const res: any = await ironsource.MonetizeAPI().addInstances(testAppKey, [ironSourceInstance]);
      let newIronSourceInstance = await asyncFind(res.rewardedVideo.ironSource, async (obj: any) => {
        return obj.name == 'TEST_FOR_GROUP'
      })

      const mediationGroupPriority = new MediationGroupPriority();
      const tier1 = new MediationGroupTier(TIER_TYPE.MANUAL);
      tier1.addInstances(MonetizeEnums.Networks.IronSource, 0, { rate: 10, position: 1, capping: 2 })
      const tier2 = new MediationGroupTier(TIER_TYPE.SORT_BY_CPM);
      tier2.addInstances(MonetizeEnums.Networks.Vungle, 0, { rate: 4, position: 1 })
      const tier3 = new MediationGroupTier(TIER_TYPE.SORT_BY_CPM);
      tier3.addInstances(MonetizeEnums.Networks.IronSource, newIronSourceInstance.id);
      mediationGroupPriority.setMediationGroupTier(tier1, 0);
      mediationGroupPriority.setMediationGroupTier(tier2, 1);
      mediationGroupPriority.setMediationGroupTier(tier3, 2);

      const updateRes: any = await ironsource.MonetizeAPI().updateMediationGroup(testAppKey, mediationGroupId, { groupName: 'Test_Group_Automation_updated', groupCountries: ["US"], adSourcePriority: mediationGroupPriority })

      let groupObject: any = (updateRes.adUnits.rewardedVideo[0].groupName == 'Test_Group_Automation_updated') ? updateRes.adUnits.rewardedVideo[0] : updateRes.adUnits.rewardedVideo[1];
      expect(groupObject.adSourcePriority.tier3.tierType).to.be.equal('sortByCpm');
      expect(groupObject.adSourcePriority.tier3.instances).to.be.an('array').with.lengthOf(1);
      expect(groupObject.adSourcePriority.tier3.instances[0].instanceId).to.be.eq(newIronSourceInstance.id);
      expect(groupObject.adSourcePriority.tier3.instances[0].providerName).to.be.eq(MonetizeEnums.Networks.IronSource);


    })


    it('should delete mediation group', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      expect(mediationGroupId).not.to.be.equal(-1);

      const res: any = await ironsource.MonetizeAPI().deleteMediationGroup(testAppKey, mediationGroupId);

      expect(res).to.be.an('object');
      expect(res.adUnits).to.be.an('object');
      expect(res.adUnits.rewardedVideo).to.be.an('array').with.lengthOf(1);


    })

  })

  describe('ironsource_placements_api', function () {

    let placementIds: any = [];
    it('should create placements', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);
      const RVPlacementName = `RV_${moment().format('YYYY-MM-DD_HH:mm:ss')}`;
      const BannerPlacementName = `Banner_${moment().format('YYYY-MM-DD_HH:mm:ss')}`
      const placement = new Placement(MonetizeEnums.AdUnits.RewardedVideo, true, { name: RVPlacementName, itemName: 'Test', 'rewardAmount': 1000, capping: new Capping(100, 'h', true), pacing: new Pacing(100, true) })
      const newPlacement2 = new Placement(MonetizeEnums.AdUnits.Banner, false, { name: BannerPlacementName });
      let res: any = await ironsource.MonetizeAPI().addPlacements(testAppKey, [placement, newPlacement2]);

      expect(res).to.be.an('object');
      expect(res.placements).to.be.an('array').with.lengthOf(2);
      expect(res.placements[0].adUnit).to.be.eq(MonetizeEnums.AdUnits.RewardedVideo)
      expect(res.placements[0].id).to.be.greaterThan(0)
      expect(res.placements[0].name).to.be.eq(RVPlacementName)
      placementIds.push(res.placements[0])
      placementIds.push(res.placements[1])
    })

    it('should get placements', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);
      let res: any = await ironsource.MonetizeAPI().getPlacements(testAppKey)
      expect(res).to.be.an('array').with.length.greaterThan(4)
    })
    it('should update placement', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);
      const updatePlacement = new Placement(placementIds[1].adUnit, true, { capping: new Capping(100, 'h', true), placementId: placementIds[1].id })
      let res: any = await ironsource.MonetizeAPI().updatePlacements(testAppKey, [updatePlacement])
      expect(res).to.be.eq(true)

    })
    it('should delete placements', async function () {
      ironsource.setCredentials(API_CI_USER, API_CI_SECRET, API_CI_TOKEN);

      for (let placement of placementIds) {
        let res: any = await ironsource.MonetizeAPI().deletePlacement(testAppKey, placement.adUnit, placement.id)
        expect(res).to.be.eq(true)
      }

    })

  })

})