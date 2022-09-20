/* eslint-disable prefer-const */

import * as sinon from 'sinon';

import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiThings from 'chai-things'
import * as sinonChai from 'sinon-chai';

import { AxiosRequestConfig } from 'axios';
import * as gzip from 'node-gzip';

import { IronSource, MonetizeEnums, MediationGroupPriority, MediationGroupTier, TIER_TYPE, IronSourceInstance, VungleInstance } from '../../lib/index';
import { IronSourceMonetizeAPI } from '../../lib/monetize_api'
import { ResponseObject, executeRequest, getBearerAuth, asyncFind } from '../../lib/utils'
import { BaseAPI } from '../../lib/base_api'
import { Capping, Pacing, Placement } from '../../lib/models/placement';

import { listenerCount } from 'form-data';

import * as isUtils from '../../lib/utils';
import { inspect } from 'util'

chai.use(chaiThings);
chai.use(sinonChai)
chai.config.truncateThreshold = 0;
sinon.setFormatter((args) => {

    return "\n" + inspect(args, { depth: null, colors: true })
})

const ironsource = new IronSource();
const isMonetizeAPI = ironsource.MonetizeAPI();
isMonetizeAPI.setCredentials('USERNAME', 'SECRET', 'TOKEN')

describe('Monetize API - Unit Tests', function () {
    const getExecuteRequestStub = (options?: { response?: ResponseObject, request?: AxiosRequestConfig }) => {
        const { request, response } = { ...options };
        const resObj: ResponseObject = response || { msg: 'fake data', errorCode: -1 }
        if (request) {
            return sinon.stub(isUtils, 'executeRequest').withArgs(request).resolves(resObj);
        }
        return sinon.stub(isUtils, 'executeRequest').resolves(resObj);
    }
    afterEach(() => {
        sinon.restore();
    });
    beforeEach(() => {

        sinon.stub(BaseAPI.prototype, <any>'getBearerToken').returns(Promise.resolve("API_TOKEN"));
    })
    describe('unit tests - ironsource_reporting', function () {

        it('unit test - should return demo data', async function () {
            const options: AxiosRequestConfig = {
                url: "https://platform.ironsrc.com/partners/publisher/mediation/applications/v6/stats",
                headers: { Authorization: "Bearer API_TOKEN" },
                params: {
                    'startDate': '2020-01-01',
                    'endDate': '2020-01-01',
                    'metrics': '',
                    'breakdowns': ''
                }
            };

            const axiosStub = getExecuteRequestStub()

            const res = await isMonetizeAPI.getMonetizationData('2020-01-01', '2020-01-01');
            expect(axiosStub).to.be.calledWith(options)

        })

        it('unit test - should return only demo data with app breakdown', async function () {
            const options: AxiosRequestConfig = {
                url: "https://platform.ironsrc.com/partners/publisher/mediation/applications/v6/stats",
                headers: { Authorization: "Bearer API_TOKEN" },
                params: {
                    'startDate': '2020-01-01',
                    'endDate': '2020-01-01',
                    'metrics': '',
                    'breakdowns': 'app'
                }
            };
            const axiosStub = getExecuteRequestStub()

            const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { breakdowns: [MonetizeEnums.Breakdowns.Application] });

            expect(axiosStub).to.be.calledWith(options)
        })

        it('unit test - should return only demo data of one app', async function () {
            const options: AxiosRequestConfig = {
                url: "https://platform.ironsrc.com/partners/publisher/mediation/applications/v6/stats",
                headers: { Authorization: "Bearer API_TOKEN" },
                params: {
                    'startDate': '2020-01-01',
                    'endDate': '2020-01-01',
                    'metrics': '',
                    'appKey': 'c581a75d',
                    'breakdowns': 'app'
                }
            };
            const axiosStub = getExecuteRequestStub();

            const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', breakdowns: [MonetizeEnums.Breakdowns.Application] });
            expect(axiosStub).to.be.calledWith(options)

        })

        it('unit test - should return only demo data of one app and only US', async function () {
            const options: AxiosRequestConfig = {
                url: "https://platform.ironsrc.com/partners/publisher/mediation/applications/v6/stats",
                headers: { Authorization: "Bearer API_TOKEN" },
                params: {
                    'startDate': '2020-01-01',
                    'endDate': '2020-01-01',
                    'metrics': '',
                    'appKey': 'c581a75d',
                    'country': 'US',
                    'breakdowns': 'country'
                }
            };

            const axiosStub = getExecuteRequestStub();

            const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', country: 'US', breakdowns: [MonetizeEnums.Breakdowns.Country] });

            expect(axiosStub).to.be.calledWith(options)

        })

        it('unit test - should return only demo data of one app and only rewarded video ad unit', async function () {
            const options: AxiosRequestConfig = {
                url: "https://platform.ironsrc.com/partners/publisher/mediation/applications/v6/stats",
                headers: { Authorization: "Bearer API_TOKEN" },
                params: {
                    'startDate': '2020-01-01',
                    'endDate': '2020-01-01',
                    'metrics': '',
                    'appKey': 'c581a75d',
                    'adUnits': 'rewardedVideo',
                    'breakdowns': 'app'
                }
            };
            const axiosStub = getExecuteRequestStub();
            const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', adUnits: MonetizeEnums.AdUnits.RewardedVideo, breakdowns: [MonetizeEnums.Breakdowns.Application] });

            expect(axiosStub).to.be.calledWith(options)

        })

        it('unit test - should return only demo data of one app and only rewarded video ad unit and breakdown by network', async function () {
            const options: AxiosRequestConfig = {
                url: "https://platform.ironsrc.com/partners/publisher/mediation/applications/v6/stats",
                headers: { Authorization: "Bearer API_TOKEN" },
                params: {
                    'startDate': '2020-01-01',
                    'endDate': '2020-01-01',
                    'metrics': '',
                    'appKey': 'c581a75d',
                    'adUnits': 'rewardedVideo',
                    'breakdowns': 'adSource'
                }
            };
            const axiosStub = getExecuteRequestStub();
            const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', adUnits: MonetizeEnums.AdUnits.RewardedVideo, breakdowns: [MonetizeEnums.Breakdowns.Network] });

            expect(axiosStub).to.be.calledWith(options)

        })


        it('unit test - should create request object for reporting with multiple breakdowns', async function () {
            const options: AxiosRequestConfig = {
                url: "https://platform.ironsrc.com/partners/publisher/mediation/applications/v6/stats",
                headers: { Authorization: "Bearer API_TOKEN" },
                params: {
                    'startDate': '2020-01-01',
                    'endDate': '2020-01-01',
                    'metrics': '',
                    'appKey': 'c581a75d',
                    'adUnits': 'rewardedVideo',
                    'adSource': 'ironSource',
                    'breakdowns': 'instance,country'
                }
            };
            const axiosStub = getExecuteRequestStub();
            const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', adUnits: MonetizeEnums.AdUnits.RewardedVideo, adSource: MonetizeEnums.Networks.IronSource, breakdowns: [MonetizeEnums.Breakdowns.Instance, MonetizeEnums.Breakdowns.Country] });

            expect(axiosStub).to.be.calledWith(options)

        })

        it('unit test - should create request object for reporting with multiple breakdowns and metrics', async function () {
            const options: AxiosRequestConfig = {
                url: "https://platform.ironsrc.com/partners/publisher/mediation/applications/v6/stats",
                headers: { Authorization: "Bearer API_TOKEN" },
                params: {
                    'startDate': '2020-01-01',
                    'endDate': '2020-01-01',
                    'metrics': 'impressions,clicks',
                    'appKey': 'c581a75d',
                    'adSource': 'ironSource',
                    'breakdowns': 'adUnits,country'
                }
            };
            const axiosStub = getExecuteRequestStub();

            const res: any = await ironsource.MonetizeAPI().getMonetizationData('2020-01-01', '2020-01-01', { appKey: 'c581a75d', adSource: MonetizeEnums.Networks.IronSource, metrics: [MonetizeEnums.Metrics.impressions, MonetizeEnums.Metrics.clicks], breakdowns: [MonetizeEnums.Breakdowns.AdUnits, MonetizeEnums.Breakdowns.Country] });

            expect(axiosStub).to.be.calledWith(options)


        })



        it('unit test - should return user ad Revenue data ', async function () {
            const options: AxiosRequestConfig = {
                url: "https://platform.ironsrc.com/partners/userAdRevenue/v3",
                headers: { Authorization: "Bearer API_TOKEN", 'Accept-Encoding': 'gzip' },
                params: {
                    'date': '2020-01-01',
                    'appKey': 'aad44a35',
                    'reportType': 1
                }
            };
            const gZipOptions: AxiosRequestConfig = {
                url: 'http://www.is.com',
                responseType: 'arraybuffer'
            }
            const gzipStub = sinon.stub(gzip, 'ungzip').resolves(Buffer.from('TEST_UNZIP'))
            const axiosStub = getExecuteRequestStub({ response: <ResponseObject>{ msg: JSON.stringify({ urls: ['http://www.is.com'] }), errorCode: -1 } });
            // const axiosGzipStub = getExecuteRequestStub({
            //     request: gZipOptions
            // });

            const res: any = await ironsource.MonetizeAPI().getUserAdRevenue('2020-01-01', 'aad44a35');
            expect(axiosStub.firstCall).to.be.calledWith(options)
            expect(axiosStub.secondCall).to.be.calledWith(gZipOptions)
        })


        it('unit test - should return impressions level Revenue data ', async function () {
            const options: AxiosRequestConfig = {
                url: "https://platform.ironsrc.com/partners/adRevenueMeasurements/v3?",
                headers: { Authorization: "Bearer API_TOKEN", 'Accept-Encoding': 'gzip' },
                params: {
                    'date': '2020-01-01',
                    'appKey': 'aad44a35'
                }
            };
            const gZipOptions: AxiosRequestConfig = {
                url: 'http://www.is.com',
                responseType: 'arraybuffer'
            }
            const gzipStub = sinon.stub(gzip, 'ungzip').resolves(Buffer.from('TEST_UNZIP'))
            const axiosStub = getExecuteRequestStub({ response: <ResponseObject>{ msg: JSON.stringify({ urls: ['http://www.is.com'] }), errorCode: -1 } });
            // const axiosGzipStub = getExecuteRequestStub({
            //     request: gZipOptions
            // });
            const res: any = await ironsource.MonetizeAPI().getARMReport('2020-01-01', 'aad44a35');
            expect(axiosStub.firstCall).to.be.calledWith(options)
            expect(axiosStub.secondCall).to.be.calledWith(gZipOptions)

        })

    })
    const testAppKey = '1234abcd';
    const testAppName = 'TEST_APP_NAME';
    describe('unit tests - ironsource_apps_api', function () {


        it('unit test - should return list of apps in the account', async function () {

            const options: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                url: "https://platform.ironsrc.com/partners/publisher/applications/v6",
                method: 'GET'
            };
            const axiosStub = getExecuteRequestStub();
            const res: any = await ironsource.MonetizeAPI().getApps();

            expect(axiosStub).to.be.calledWith(options)
            // expect(axiosStub).to.be.calledWith(options)


        })

        it('unit test - should add a test app', async function () {
            const options: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                url: "https://platform.ironsrc.com/partners/publisher/applications/v6",
                method: 'POST',
                data: {
                    'appName': testAppName,
                    'platform': 'Android',
                    'coppa': 0,
                    'adUnits': {
                        'rewardedVideo': 'Test',
                        'OfferWall': 'Test',
                        'interstitial': 'Test',
                        'banner': 'Test'
                    }
                }
            };
            const axiosStub = getExecuteRequestStub();
            const adUnitStatus = new Map<MonetizeEnums.AdUnits, MonetizeEnums.AdUnitStatus>();
            adUnitStatus.set(MonetizeEnums.AdUnits.RewardedVideo, MonetizeEnums.AdUnitStatus.Test)
            adUnitStatus.set(MonetizeEnums.AdUnits.Offerwall, MonetizeEnums.AdUnitStatus.Test)
            adUnitStatus.set(MonetizeEnums.AdUnits.Interstitial, MonetizeEnums.AdUnitStatus.Test)
            adUnitStatus.set(MonetizeEnums.AdUnits.Banner, MonetizeEnums.AdUnitStatus.Test)


            const res: any = await ironsource.MonetizeAPI().addApp(testAppName, MonetizeEnums.PLATFORM.Android, false, { adUnitStatus: adUnitStatus });
            expect(axiosStub).to.be.calledWith(options)


        })


        it('unit test - should add a live app', async function () {
            const options: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                url: "https://platform.ironsrc.com/partners/publisher/applications/v6",
                method: 'POST',
                data: {
                    'coppa': 1,
                    'ccpa': 1,
                    'storeUrl': 'https://play.google.com/store/apps/details?id=iron.web.jalepano.browser',
                    'taxonomy': 'Other Non-Gaming',
                    'adUnits': {
                        'rewardedVideo': 'Test',
                        'OfferWall': 'Test',
                        'interstitial': 'Test',
                        'banner': 'Test'
                    }
                }
            };
            const axiosStub = getExecuteRequestStub();
            const adUnitStatus = new Map<MonetizeEnums.AdUnits, MonetizeEnums.AdUnitStatus>();
            adUnitStatus.set(MonetizeEnums.AdUnits.RewardedVideo, MonetizeEnums.AdUnitStatus.Test)
            adUnitStatus.set(MonetizeEnums.AdUnits.Offerwall, MonetizeEnums.AdUnitStatus.Test)
            adUnitStatus.set(MonetizeEnums.AdUnits.Interstitial, MonetizeEnums.AdUnitStatus.Test)
            adUnitStatus.set(MonetizeEnums.AdUnits.Banner, MonetizeEnums.AdUnitStatus.Test)


            const res: any = await ironsource.MonetizeAPI().addApp('https://play.google.com/store/apps/details?id=iron.web.jalepano.browser', MonetizeEnums.Genres.NON_GAMING.OTHER_NON_GAMING.OTHER_NON_GAMING, true, { ccpa: true, adUnitStatus: adUnitStatus });


            expect(axiosStub).to.be.calledWith(options)



        })

    })
    describe('unit tests - ironsource_mediation_instance_api', function () {


        let ironSourceInstanceId = 1234;
        it('unit test - should create new instances and validate them', async function () {

            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                url: "https://platform.ironsrc.com/partners/publisher/instances/v1",
                method: 'POST',
                data: {
                    appKey: testAppKey,
                    configurations: {
                        ironSource: {
                            appConfig: undefined,
                            rewardedVideo: [{
                                instanceName: 'TEST',
                                status: 'inactive',
                                pricing: [
                                    { eCPM: 10, country: ['US'] },
                                    { eCPM: 5, country: ['IL'] }
                                ]
                            }
                            ]
                        },
                        Vungle: {
                            appConfig: {
                                AppID: 'TEST',
                                reportingAPIId: 'TEST'
                            },
                            rewardedVideo: [
                                {
                                    PlacementId: 'TEST',
                                    instanceName: 'Test',
                                    status: 'active',
                                }
                            ]
                        }
                    }
                }
            };


            const axiosStub = getExecuteRequestStub();
            let ironSourceRateMap = new Map<number, string[]>();
            ironSourceRateMap.set(10, ['US']);
            ironSourceRateMap.set(5, ['IL']);
            const ironSourceInstance = new IronSourceInstance('TEST', MonetizeEnums.AdUnits.RewardedVideo, testAppKey, false, { pricing: ironSourceRateMap });
            const vungleInstance = new VungleInstance('Test', MonetizeEnums.AdUnits.RewardedVideo, true, 'TEST', 'TEST', 'TEST');
            const res: any = await ironsource.MonetizeAPI().addInstances(testAppKey, [ironSourceInstance, vungleInstance]);

            expect(axiosStub).to.be.calledWith(reqOptions)


        })

        it('unit test - should update instances ', async function () {

            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                url: "https://platform.ironsrc.com/partners/publisher/instances/v1",
                method: 'PUT',
                data: {
                    appKey: testAppKey,
                    configurations: {
                        ironSource: {
                            appConfig: undefined,
                            rewardedVideo: [
                                {
                                    instanceId: 0,
                                    status: 'active',
                                    pricing: undefined,
                                    instanceName: 'Default',
                                },
                                {
                                    instanceId: ironSourceInstanceId,
                                    instanceName: 'TEST',
                                    status: 'inactive',
                                    pricing: [
                                        { eCPM: 7, country: ['US'] },
                                        { eCPM: 5, country: ['IL'] }
                                    ]
                                }

                            ]
                        }
                    }
                }
            };
            const axiosStub = getExecuteRequestStub();

            const ironSourceRateMap = new Map<number, string[]>();
            ironSourceRateMap.set(7, ['US']);
            ironSourceRateMap.set(5, ['IL']);
            const ironSourceInstance = new IronSourceInstance('TEST', MonetizeEnums.AdUnits.RewardedVideo, testAppKey, false, { pricing: ironSourceRateMap, instanceId: ironSourceInstanceId });
            const ironSourceInstanceDef = new IronSourceInstance('Default', MonetizeEnums.AdUnits.RewardedVideo, testAppKey, true, { instanceId: 0 });

            const res: any = await ironsource.MonetizeAPI().updateInstance(testAppKey, [ironSourceInstanceDef, ironSourceInstance]);
            expect(axiosStub).to.be.calledWith(reqOptions)



        })

        it('unit test - should delete an instance', async function () {
            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                url: "https://platform.ironsrc.com/partners/publisher/instances/v1",
                method: 'DELETE',
                params: {
                    appKey: testAppKey,
                    instanceId: ironSourceInstanceId.toString()

                }
            };


            const axiosStub = getExecuteRequestStub();
            const res: any = await ironsource.MonetizeAPI().deleteInstance(testAppKey, ironSourceInstanceId);
            expect(axiosStub).to.be.calledWith(reqOptions);


        })
    })

    describe('unit tests - ironsource_mediation_group_api', function () {



        it('unit test - should return Test app mediation groups', async function () {

            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                url: "https://platform.ironsrc.com/partners/publisher/mediation/management/v2",
                params: {
                    appKey: 'c90cab7d',
                }
            };
            const axiosStub = getExecuteRequestStub();
            const res: any = await ironsource.MonetizeAPI().getMediationGroups('c90cab7d');
            expect(axiosStub).to.be.calledWith(reqOptions);


        });

        let mediationGroupId = 1234;
        it('unit test - should create mediation group for new test app ', async function () {

            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                method: 'POST',
                url: "https://platform.ironsrc.com/partners/publisher/mediation/management/v2",
                data: {
                    appKey: testAppKey,
                    adUnit: 'rewardedVideo',
                    groupName: 'Test_Group_Automation',
                    groupCountries: ['US', 'IL'],
                    groupPosition: 1,
                    adSourcePriority: {
                        tier1: {
                            tierType: 'manual',
                            instances: [{
                                providerName: 'ironSource',
                                instanceId: 0,
                                rate: 10,
                                capping: 2
                            }
                            ]
                        },
                        tier2: {
                            tierType: 'sortByCpm',
                            instances: [
                                {
                                    providerName: 'Vungle',
                                    instanceId: 0,
                                    rate: 4
                                }
                            ]
                        }
                    }
                }
            };

            const axiosStub = getExecuteRequestStub();

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

            expect(axiosStub).to.be.calledWith(reqOptions);


        })



        it('unit test - should update mediation group for new test app', async function () {


            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                method: 'PUT',
                url: "https://platform.ironsrc.com/partners/publisher/mediation/management/v2",
                data: {
                    appKey: testAppKey,
                    groupName: 'Test_Group_Automation_updated',
                    groupId: 1234,
                    groupCountries: ['US'],
                    adSourcePriority: {
                        tier1: {
                            tierType: 'manual',
                            instances: [{
                                providerName: 'ironSource',
                                instanceId: 0,
                                rate: 10,
                                capping: 2
                            }
                            ]
                        },
                        tier2: {
                            tierType: 'sortByCpm',
                            instances: [
                                {
                                    providerName: 'Vungle',
                                    instanceId: 0,
                                    rate: 4
                                }
                            ]
                        },
                        tier3: {
                            tierType: 'sortByCpm',
                            instances: [
                                {
                                    providerName: 'ironSource',
                                    instanceId: 1234,

                                }
                            ]
                        }
                    }
                }
            };

            const axiosStub = getExecuteRequestStub();



            const mediationGroupPriority = new MediationGroupPriority();
            const tier1 = new MediationGroupTier(TIER_TYPE.MANUAL);
            tier1.addInstances(MonetizeEnums.Networks.IronSource, 0, { rate: 10, position: 1, capping: 2 })
            const tier2 = new MediationGroupTier(TIER_TYPE.SORT_BY_CPM);
            tier2.addInstances(MonetizeEnums.Networks.Vungle, 0, { rate: 4, position: 1 })
            const tier3 = new MediationGroupTier(TIER_TYPE.SORT_BY_CPM);
            tier3.addInstances(MonetizeEnums.Networks.IronSource, 1234);
            mediationGroupPriority.setMediationGroupTier(tier1, 0);
            mediationGroupPriority.setMediationGroupTier(tier2, 1);
            mediationGroupPriority.setMediationGroupTier(tier3, 2);

            const updateRes: any = await ironsource.MonetizeAPI().updateMediationGroup(testAppKey, mediationGroupId, { groupName: 'Test_Group_Automation_updated', groupCountries: ["US"], adSourcePriority: mediationGroupPriority })

            expect(axiosStub).to.be.calledWith(reqOptions);

        })


        it('unit test - should delete mediation group', async function () {

            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                method: 'DELETE',
                url: "https://platform.ironsrc.com/partners/publisher/mediation/management/v2",
                params: {
                    appKey: testAppKey,
                    groupId: mediationGroupId
                }
            };

            const axiosStub = getExecuteRequestStub();

            const res: any = await ironsource.MonetizeAPI().deleteMediationGroup(testAppKey, mediationGroupId);
            expect(axiosStub).to.be.calledWith(reqOptions)

        })





    })

    describe('unit tests - ironsource_placements_api', function () {

        let placementIds: any = [{ adUnit: 'rewardedVideo', id: 1234 }, { adUnit: 'banner', id: 5678 }];
        it('unit test - should create placements', async function () {

            const RVPlacementName = `RV_TEST_PLACEMENT`;
            const BannerPlacementName = `Banner_TEST_PLACEMENT`
            const placement = new Placement(MonetizeEnums.AdUnits.RewardedVideo, true, { name: RVPlacementName, itemName: 'Test', 'rewardAmount': 1000, capping: new Capping(100, 'h', true), pacing: new Pacing(100, true) })
            const newPlacement2 = new Placement(MonetizeEnums.AdUnits.Banner, false, { name: BannerPlacementName });

            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                method: 'POST',
                url: "https://platform.ironsrc.com/partners/publisher/placements/v1",
                data: {
                    appKey: testAppKey,
                    placements: [
                        {
                            adUnit: 'rewardedVideo',
                            adDelivery: 1,
                            name: RVPlacementName,
                            itemName: 'Test',
                            rewardAmount: 1000,
                            capping: {
                                enabled: 1,
                                cappingLimit: 100,
                                cappingInterval: 'h'
                            },
                            pacing: {
                                enabled: 1,
                                pacingMinutes: 100
                            }
                        },
                        {
                            adUnit: 'banner',
                            adDelivery: 0,
                            name: BannerPlacementName
                        }
                    ]
                }
            };

            const axiosStub = getExecuteRequestStub();


            let res: any = await ironsource.MonetizeAPI().addPlacements(testAppKey, [placement, newPlacement2]);
            expect(axiosStub).to.be.calledWith(reqOptions);

        })

        it('unit test - should get placements', async function () {
            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                method: 'GET',
                url: "https://platform.ironsrc.com/partners/publisher/placements/v1",
                params: {
                    appKey: testAppKey
                }
            };

            const axiosStub = getExecuteRequestStub();
            let res: any = await ironsource.MonetizeAPI().getPlacements(testAppKey)
            expect(axiosStub).to.be.calledWith(reqOptions)
        })
        it('unit test - should update placement', async function () {
            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                method: 'PUT',
                url: "https://platform.ironsrc.com/partners/publisher/placements/v1",
                data: {
                    appKey: testAppKey,
                    placements: [
                        {
                            adUnit: 'banner',
                            id: 5678,
                            adDelivery: 1,
                            capping: {
                                enabled: 1,
                                cappingLimit: 100,
                                cappingInterval: 'h'
                            }
                        },

                    ]
                }
            };

            const axiosStub = getExecuteRequestStub();
            const updatePlacement = new Placement(placementIds[1].adUnit, true, { capping: new Capping(100, 'h', true), placementId: placementIds[1].id })
            let res: any = await ironsource.MonetizeAPI().updatePlacements(testAppKey, [updatePlacement])
            expect(axiosStub).to.be.calledWith(reqOptions)

        })
        it('unit test - should delete placements', async function () {

            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: "Bearer API_TOKEN" },
                method: 'DELETE',
                url: "https://platform.ironsrc.com/partners/publisher/placements/v1",
                data: {
                    appKey: testAppKey,
                    adUnit: 'rewardedVideo',
                    id: 1234
                }
            };

            const axiosStub = getExecuteRequestStub();
            let res: any = await ironsource.MonetizeAPI().deletePlacement(testAppKey, placementIds[0].adUnit, placementIds[0].id)
            expect(axiosStub).to.be.calledWith(reqOptions)

        })

    })

})