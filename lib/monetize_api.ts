/* eslint-disable max-len */

import * as gzip from 'node-gzip';
import * as zlib from 'zlib';

import { Stream } from 'stream';
import * as utils from './utils';
import { MediationGroupPriority, TierType } from './models/adsource_priority';

import { InstanceConfig } from './models/instance_config';
import { ResponseObject } from './utils';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BaseAPI } from './base_api';
import { Placement } from './models/placement';

export namespace MonetizeEnums {
    export enum AdUnitStatus {
        Live = 'Live',
        Off = 'Off',
        Test = 'Test'
    }

    export enum AdUnits {
        RewardedVideo = 'rewardedVideo',
        Interstitial = 'interstitial',
        Banner = 'banner',
        Offerwall = 'OfferWall'
    }

    export enum PLATFORM {
        iOS = 'iOS',
        Android = 'Android'
    }

    export enum Networks {
        IronSource = 'ironSource',
        IronSourceBidding = 'ironSourceBidding',
        Vungle = 'Vungle',
        VungleBidding = 'vungleBidding',
        AppLovin = 'AppLovin',
        AdColony = 'AdColony',
        AdColonyBidding = 'adColonyBidding',
        AdMob = 'AdMob',
        AdManager = 'AdManager',
        Amazon = 'Amazon',
        Chartboost = 'Chartboost',
        CrossPromotionBidding = 'crossPromotionBidding',
        CSJ = 'CSJ',
        DirectDeals = 'DirectDeals',
        Facebook = 'Facebook',
        FacebookBidding = 'facebookBidding',
        Fyber = 'Fyber',
        HyperMX = 'HyprMX',
        InMobi = 'InMobi',
        InMobiBidding = 'inMobiBidding',
        Maio = 'Maio',
        LiftOff = 'Liftoff Bidding',
        MyTarget = 'myTargetBidding',
        TapJoy = 'TapJoy',
        TapJoyBidding = 'TapJoyBidding',
        Pangle = 'Pangle',
        PangleBidding = 'pangleBidding',
        Tencent = 'Tencent',
        UnityAds = 'UnityAds',
        Smaato = 'smaatoBidding',
        Snap = 'Snap',
        SuperAwesome = 'SuperAwesomeBidding',
        YahooBidding = 'yahooBidding'
    }

    export enum Metrics {
        impressions = 'impressions',
        revenue = 'revenue',
        eCPM = 'ecpm',
        appFillRate = 'appfillrate',
        appRequests = 'appRequests',
        completions = 'completions',
        revenuePerCompletion = 'revenuePerCompletion',
        appFills = 'appFills',
        useRate = 'useRate',
        activeUsers = 'activeUsers',
        engagedUsers = 'engagedUsers',
        engagedUsersRate = 'engagedUsersRate',
        impressionsPerEngagedUser = 'impressionsPerEngagedUser',
        revenuePerActiveUser = 'revenuePerActiveUser',
        revenuePerEngagedUser = 'revenuePerEngagedUser',
        clicks = 'clicks',
        clickThroughRate = 'clickThroughRate',
        completionRate = 'completionRate',
        adSourceChecks = 'adSourceChecks',
        adSourceResponses = 'adSourceResponses',
        adSourceAvailabilityRate = 'adSourceAvailabilityRate',
        sessions = 'sessions',
        engagedSessions = 'engagedSessions',
        impressionsPerSession = 'impressionsPerSession',
        impressionPerEngagedSessions = 'impressionPerEngagedSessions',
        sessionsPerActiveUser = 'sessionsPerActiveUser'

    }

    export enum Breakdowns {
        Date = 'date',
        Application = 'app',
        Platform = 'platform',
        Network = 'adSource',
        // eslint-disable-next-line @typescript-eslint/no-shadow
        AdUnits = 'adUnits',
        Instance = 'instance',
        Country = 'country',
        Segment = 'segment',
        // eslint-disable-next-line @typescript-eslint/no-shadow
        Placement = 'placement',
        IOSVersion = 'iosVersion',
        ConnectionType = 'connectionType',
        SDKVersion = 'sdkVersion',
        AppVersion = 'appVersion',
        ATT = 'att',
        IDFA = 'idfa',
        ABTest = 'abTest'

    }
    export const Genres = {
        CASUAL: {
            HYPER_CASUAL: {
                STACKING: 'Stacking',
                DEXTERITY: 'Dexterity',
                RISING_OR_FALLING: 'Rising/Falling',
                SWERVE: 'Swerve',
                MERGE: 'Merge',
                IDLE: 'Idle',
                IO: '.io',
                PUZZLE: 'Puzzle',
                TAP_OR_TIMING: 'Tap / Timing',
                TURNING: 'Turning',
                BALL: 'Ball',
                OTHER: 'Other'
            },
            AR_LOCATION_BASED: { AR_LOCATION_BASED: 'AR/Location Based' },
            PUZZLE: {
                ACTION_PUZZLE: 'Action Puzzle',
                MATCH_3: 'Match 3',
                BUBBLE_SHOOTER: 'Bubble Shooter',
                JIGSAW: 'Jigsaw',
                CROSSWORD: 'Crossword',
                WORD: 'Word',
                TRIVIA: 'Trivia',
                BOARD: 'Board',
                COLORING_GAMES: 'Coloring Games',
                HIDDEN_OBJECTS: 'Hidden Objects',
                SOLITAIRE: 'Solitaire',
                NON_CASINO_CARD_GAME: 'Non Casino Card Game',
                OTHER_PUZZLE: 'Other Puzzle'
            },
            ARCADE: {
                PLATFORMER: 'Platformer',
                IDLER: 'Idler',
                SHOOT_EN_UP: "Shoot 'em Up",
                ENDLESS_RUNNER: 'Endless Runner',
                TOWER_DEFENSE: 'Tower Defense',
                OTHER_ARCADE: 'Other Arcade'
            },
            LIFESTYLE: {
                CUSTOMIZATION: 'Customization',
                INTERACTIVE_STORY: 'Interactive Story',
                MUSIC_BAND: 'Music/Band',
                OTHER_LIFESTYLE: 'Other Lifestyle'
            },
            SIMULATION: {
                ADVENTURES: 'Adventures',
                BREEDING: 'Breeding',
                TYCOON_CRAFTING: 'Tycoon/Crafting',
                SANDBOX: 'Sandbox',
                COOKING_TIME_MANAGEMENT: 'Cooking/Time Management',
                FARMING: 'Farming',
                OTHER_SIMULATION: 'Other Simulation',
                IDLE_SIMULATION: 'Idle Simulation'
            },
            KIDS_AND_FAMILY: { KINDS_AND_FAMILY: 'Kids & Family' },
            OTHER_CASUAL: { OTHER_CASUAL: 'Other Casual' },
            LUCKY_REWARDS: {
                LUCKY_CASINO: 'Lucky Casino',
                LUCKY_PUZZLE: 'Lucky Puzzle',
                LUCKY_GAME_DISCOVERY: 'Lucky Game Discovery'
            }
        },
        CASINO: {
            CASINO: {
                BINGO: 'Bingo',
                POKER: 'Poker',
                NON_POKER_CARDS: 'Non-Poker Cards',
                BLACKJACK: 'Blackjack',
                SLOTS: 'Slots',
                SPORTS_BETTING: 'Sports Betting'
            },
            OTHER_CASINO: { OTHER_CASINO: 'Other Casino' }
        },
        MID_CORE: {
            SHOOTER: {
                BATTLE_ROYALE: 'Battle Royale',
                CLASSIC_FPS: 'Classic FPS',
                SNIPERS: 'Snipers',
                TACTICAL_SHOOTER: 'Tactical Shooter',
                OTHER_SHOOTER: 'Other Shooter'
            },
            RPG: {
                ACTION_RPG: 'Action RPG',
                TURN_BASED_RPG: 'Turn-based RPG',
                FIGHTING: 'Fighting',
                MMORPG: 'MMORPG',
                PUZZLE_RPG: 'Puzzle RPG',
                SURVIVAL: 'Survival',
                OTHER_RPG: 'Other RPG',
                IDLE_RPG: 'Idle RPG'
            },
            CARD_GAMES: { CARD_BATTLER: 'Card Battler' },
            STRATEGY: {
                '4X_STRATEGY': '4X Strategy',
                BUILD_AND_BATTLE: 'Build & Battle',
                MOBA: 'MOBA',
                SYNC_BATTLER: 'Sync. Battler',
                OTHER_STRATEGY: 'Other Strategy',
                IDLE_STRATEGY: 'Idle Strategy'
            },
            OTHER_MID_CORE: { OTHER_MID_CORE: 'Other Mid-Core' }
        },
        SPORT_AND_RACING: {
            SPORTS: {
                CASUAL_SPORTS: 'Casual Sports',
                LICENSED_SPORTS: 'Licensed Sports'
            },
            RACING: {
                CASUAL_RACING: 'Casual Racing',
                SIMULATION_RACING: 'Simulation Racing',
                OTHER_RACING: 'Other Racing'
            },
            OTHER_SPORTS_AND_RACING: { OTHER_SPORTS_AND_RACING: 'Other Sports & Racing' }
        },
        NON_GAMING: {
            ENTERTAINMENT: {
                EDUCATION: 'Education',
                ENTERTAINMENT: 'Entertainment',
                NEWS_AND_MAGAZINES: 'News & Magazines',
                PHOTOGRAPHY: 'Photography',
                EVENTS_AND_TICKETS: 'Events & Tickets',
                PERSONALIZATION: 'Personalization'
            },
            FINANCE: { FINANCE: 'Finance' },
            SHOPPING: { SHOPPING: 'Shopping', MARKETPLACE: 'Marketplace' },
            SOCIAL: {
                DATING: 'Dating',
                SOCIAL: 'Social',
                COMMUNICATIONS: 'Communications'
            },
            LIFESTYLE_NON_GAME: {
                BOOKS_AND_REFERENCE: 'Books & Reference',
                MUSIC_AND_AUDIO: 'Music & Audio',
                PARENTING: 'Parenting',
                COMICS: 'Comics',
                REAL_ESTATE_AND_HOME: 'Real Estate & Home',
                LIFESTYLE: 'Lifestyle'
            },
            OTHER_NON_GAMING: { OTHER_NON_GAMING: 'Other Non-Gaming' },
            TRAVEL: {
                MAPS_AND_NAVIGATION: 'Maps & Navigation',
                TRAVEL_AIR_AND_HOTEL: 'Travel Air & Hotel',
                TRAVEL_AND_LOCAL: 'Travel & Local',
                CAR_SHARING: 'Car Sharing',
                TAXI_RIDE_SHARING: 'Taxi/Ride Sharing',
                BIKE: 'Bike'
            },
            HEALTH: {
                FOOD_AND_DRINK: 'Food & Drink',
                HEALTH_AND_FITNESS: 'Health & Fitness',
                MEDICAL: 'Medical',
                SPORTS: 'Sports'
            }
        }
    };

}
export namespace IronSourceMonetizeAPI {
    /**
     * @hidden
     * @ignore
     */
    const REPORT_URL = 'https://platform.ironsrc.com/partners/publisher/mediation/applications/v6/stats';
    /**
     * @hidden
     * @ignore
     */
    const UAR_URL = 'https://platform.ironsrc.com/partners/userAdRevenue/v3';
    /**
     * @hidden
     * @ignore
     */
    const ARM_URL = 'https://platform.ironsrc.com/partners/adRevenueMeasurements/v3?';
    /**
     * @hidden
     * @ignore
     */
    const MEDIATION_GROUP_MGMT_URL = 'https://platform.ironsrc.com/partners/publisher/mediation/management/v2';
    /**
     * @hidden
     * @ignore
     */
    const APP_API_URL = 'https://platform.ironsrc.com/partners/publisher/applications/v6';
    /**
     * @hidden
     * @ignore
     */
    const INSTANCES_API_URL = 'https://platform.ironsrc.com/partners/publisher/instances/v1';
    /**
     * @hidden
     * @ignore
     */
    const PLACEMENTS_API_URL = 'https://platform.ironsrc.com/partners/publisher/placements/v1';

    /**
     * IronSource Monetization API
     */
    export class API extends BaseAPI {
        [Symbol.toStringTag]: 'MonetizeAPI';
        [Symbol.toPrimitive]: 'MonetizeAPI';
        
        /**
         * 
         * @param date {string} - Date in the following formate YYYY-MM-DD
         * @param appKey {string} - Application key of the app
         * 
         * @returns {Stream} - A stream of the ARM data from the request
         */
        public async getARMReportAsStream(date: string, appKey: string): Promise<Stream> {
            const updatedToken = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: ARM_URL,
                headers: {
                    Authorization: this.Bearer + updatedToken,
                    'Accept-Encoding': 'gzip'
                },
                params: {
                    'date': date,
                    'appKey': appKey
                }
            };



            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error('Error getting Impressions Level Revenue ' + res.msg);
            }
            const writeableStream: zlib.Gunzip = zlib.createGunzip();

            const jsonRes = JSON.parse(res.msg);
            const armFileUrl = decodeURI(jsonRes.urls[0]);
            const armOptions: AxiosRequestConfig = {
                url: armFileUrl,
                responseType: 'arraybuffer'
            };
            axios(armOptions).then((armRes: AxiosResponse) => {
                armRes.data.pipe(writeableStream);
            }).catch((ex) => {
                throw Error('Error getting Impressions Level Revenue ' + ex);
            });
            return writeableStream;



        }
        /**
        * 
        * @param date {string} - Date in the following formate YYYY-MM-DD
        * @param appKey {string} - Application key of the app
        * 
        * @returns {String} ARM data in csv format
        */

        public async getARMReport(date: string, appKey: string): Promise<string> {
            const updatedToken = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: ARM_URL,
                headers: {
                    Authorization: this.Bearer + updatedToken,
                    'Accept-Encoding': 'gzip'
                },
                params: {
                    'date': date,
                    'appKey': appKey
                }
            };
            let armData;
            let res: ResponseObject;
            let armDataZipped: ResponseObject;
            try {
                res = await utils.executeRequest(options);
                if (res.errorCode !== -1) {
                    throw new Error('Error getting Impressions Level Revenue ' + res.msg);
                }
            } catch (err: any) {
                throw new Error('Error getting Impressions Level Revenue ' + err.message);
            }
            try {
                const jsonRes = JSON.parse(res.msg);
                if (jsonRes.urls.length == 0) {
                    throw new Error('Error - Empty ARM file list');
                }
                const armFileUrl = decodeURI(jsonRes.urls[0]);


                const armOptions: AxiosRequestConfig = {
                    url: armFileUrl,
                    responseType: 'arraybuffer'
                };
                armDataZipped = await utils.executeRequest(armOptions);
                if (res.errorCode !== -1) {
                    throw new Error('Error getting Impressions Level Revenue content file ' + res.msg);
                }

            } catch (err: any) {
                throw new Error('Error getting Impressions Level Revenue content file ' + err.message);
            }

            try {
                armData = await gzip.ungzip(Buffer.from(armDataZipped.msg, 'utf8'));

            } catch (err: any) {
                throw new Error('Unable to unzip ARM data ' + err.message);
            }
            return armData.toString();

        }

        /**
         * 
         * @param date {string} - Date in the following formate YYYY-MM-DD
         * @param appKey {string} - Application key of the app
         * 
         * @returns {Stream} - A stream of the UAR data from the request
         */
        public async getUserAdRevenueAsStream(date: string, appKey: string): Promise<Stream> {
            const updatedToken = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: UAR_URL,
                headers: {
                    Authorization: this.Bearer + updatedToken,
                    'Accept-Encoding': 'gzip'
                },
                params: {
                    'date': date,
                    'appKey': appKey,
                    reportType: 1
                }
            };



            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error('Error getting User Ad Revenue ' + res.msg);
            }
            const writeableStream: zlib.Gunzip = zlib.createGunzip();

            const jsonRes = JSON.parse(res.msg);
            const uarFileUrl = decodeURI(jsonRes.urls[0]);
            const uarOptions: AxiosRequestConfig = {
                url: uarFileUrl,
                responseType: 'arraybuffer'
            };
            axios(uarOptions).then((uarRes: AxiosResponse) => {
                uarRes.data.pipe(writeableStream);
            }).catch((ex) => {
                throw Error('Error getting User Ad Revenue ' + ex);
            });
            return writeableStream;



        }
        /**
         * 
         * @param date {string} - Date in the following formate YYYY-MM-DD
         * @param appKey {string} - Application key of the app
         * 
         * @returns {String} UAR data in csv format
         */

        public async getUserAdRevenue(date: string, appKey: string): Promise<string> {
            const updatedToken = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: UAR_URL,
                headers: {
                    Authorization: this.Bearer + updatedToken,
                    'Accept-Encoding': 'gzip'
                },
                params: {
                    'date': date,
                    'appKey': appKey,
                    reportType: 1
                }
            };
            let uarData;
            let res: ResponseObject;
            let uarDataZipped: ResponseObject;
            try {
                res = await utils.executeRequest(options);
                if (res.errorCode !== -1) {
                    throw new Error('Error getting User Ad Revenue ' + res.msg);
                }
            } catch (err: any) {
                throw new Error('Error getting User Ad Revenue ' + err.message);
            }
            try {
                const jsonRes = JSON.parse(res.msg);
                if (jsonRes.urls.length == 0) {
                    throw new Error('Error - Empty UAR file list');
                }
                const uarFileUrl = decodeURI(jsonRes.urls[0]);


                const uarOptions: AxiosRequestConfig = {
                    url: uarFileUrl,
                    responseType: 'arraybuffer'
                };
                uarDataZipped = await utils.executeRequest(uarOptions);
                if (res.errorCode !== -1) {
                    throw new Error('Error getting User Ad Revenue content file ' + res.msg);
                }

            } catch (err: any) {
                throw new Error('Error getting User Ad Revenue content file ' + err.message);
            }

            try {
                uarData = await gzip.ungzip(Buffer.from(uarDataZipped.msg, 'utf8'));

            } catch (err: any) {
                throw new Error('Unable to unzip UAR data ' + err.message);
            }
            return uarData.toString();

        }

        /**
         * 
         * @param {string} startDate - Report start date in the following format YYYY-MM-DD
         * @param {string} endDate - Report end date in the following format YYYY-MM-DD
         * @param {Object} optionsParams - Object containing optional 
         * @param {string} optionsParams.applicationKey - The application key for the report
         * @param {string} optionsParams.country - Country code in 2 letter country code, as per {@link https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes | [ISO 3166-1 Alpha-2]}
         * @param {MonetizeEnums.AdUnits} optionsParams.adUnit - Filter for specific AdUnit (RewardedVideo, Interstitial, Banner, Offerwall) {@link AdUnits}
         * @param {MonetizeEnums.Networks} optionsParams.adSource - Filter for specific Ad Source - network {@link Networks}.
         * @param {[MonetizeEnums.Metrics]} optionsParams.metrics - List of metrics see {@link https://developers.ironsrc.com/ironsource-mobile/air/supported-breakdown-metric/ | Metrics} see supported metrics and breakdowns 
         * @param {[MonetizeEnums.Breakdowns]} optionsParams.breakdowns - List of breakdowns see {@link https://developers.ironsrc.com/ironsource-mobile/air/supported-breakdown-metric/ | Breakdowns} see supported breakdown and metrics 
         * @returns {String} Report data in json format.
         */
        public async getMonetizationData(startDate: string, endDate: string, optionsParams?: {
            appKey?: string,
            country?: string,
            adUnits?: MonetizeEnums.AdUnits,
            adSource?: MonetizeEnums.Networks,
            metrics?: Array<MonetizeEnums.Metrics>,
            breakdowns?: Array<MonetizeEnums.Breakdowns>,
            [key: string]: any;
        }): Promise<string> {
            const updatedToken = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: REPORT_URL,
                headers: { Authorization: this.Bearer + updatedToken },
                params: {
                    'startDate': startDate,
                    'endDate': endDate,
                    'metrics': '',
                    'breakdowns': ''
                }
            };

            if (optionsParams) {
                for (const key in optionsParams) {
                    if (optionsParams[key] == null || optionsParams[key] == undefined) {
                        delete optionsParams[key];
                    } else if (key == 'metrics' || key == 'breakdowns') {
                        options.params[key] = optionsParams[key]?.join() ?? undefined;
                        delete optionsParams[key];
                    }

                }
                Object.assign(options.params, optionsParams);

            }
            const res: ResponseObject = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error('Error getting monetization data ' + res.msg);
            }
            return res.msg;
        }
        /**
         * 
         * @param {string} applicationKey - The application key to get the mediation groups for
         * @returns {Promise<String>} - String in JSON format describing the mediation group (https://developers.ironsrc.com/ironsource-mobile/android/mediationmanagement/#step-1)
         */
        public async getMediationGroups(applicationKey: string): Promise<string> {
            const updatedToken = await this.getBearerToken();
            const options: AxiosRequestConfig = {
                url: MEDIATION_GROUP_MGMT_URL,
                headers: { Authorization: this.Bearer + updatedToken },
                params: { appKey: applicationKey }
            };

            const jsonRes: ResponseObject = await utils.executeRequest(options);
            if (jsonRes.errorCode !== -1) {
                throw new Error(`Error getting Mediation Group ${jsonRes.msg}`);
            }
            return jsonRes.msg;
        }

        /**
         * 
         * @param {string} applicationKey - The application key to create the group for.
         * @param {MonetizeEnums.AdUnits} adUnit - The Ad Unit to create the application for see [[AdUnits]]
         * @param {string} groupName - Group name
         * @param {[groupCountries]} groupCountries - List of group countries in [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
         * @param {object} groupOptions - Optional group parameters
         * @param {number} groupOptions.groupPosition - Position of the group in the group list
         * @param {number} groupOptions.groupSegments - Segment ID attached to the group
         * @param {MediationGroupPriority} groupOptions.adSourcePriority - AdSource and their priority
         * @returns {String}
         */

        public async createMediationGroup(applicationKey: string, adUnit: MonetizeEnums.AdUnits, groupName: string, groupCountries: string[], groupOptions:
        { groupPosition?: number, groupSegments?: number, adSourcePriority?: MediationGroupPriority }): Promise<string> {
            const body: any = {};

            body.appKey = applicationKey;
            body.adUnit = adUnit;
            body.groupCountries = groupCountries;
            body.groupName = groupName;
            if (groupOptions && groupOptions.groupPosition !== undefined) body.groupPosition = groupOptions.groupPosition;
            if (groupOptions && groupOptions.groupSegments !== undefined) body.groupSegments = groupOptions.groupSegments;

            if (groupOptions && groupOptions.adSourcePriority !== undefined) {
                if (groupOptions.adSourcePriority.getBidders() !== undefined) {
                    const groupTiers = groupOptions.adSourcePriority.getTiers();
                    for (let i = 0; i < groupTiers.length; i++) {
                        if (groupTiers[i]?.getTierType() == TierType.OPTIMIZED) {
                            new Error('Optimized Tier Type is not allowed with bidding.');
                        }
                    }
                }
                body.adSourcePriority = groupOptions.adSourcePriority.toString();
            }


            const token = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: MEDIATION_GROUP_MGMT_URL,
                headers: { Authorization: this.Bearer + token },
                data: body,
                method: this.POST
            };
            const res: ResponseObject = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error creating Mediation Group ${res.msg}`);
            }
            return res.msg;
        }
        /**
         * 
         * @param {string} applicationKey - The application key to update the group for.
         * @param {number} groupId - Id of the group to update
         * @param {object} groupOptions - Optional group parameters
         * @param {[groupCountries]} groupOptions.groupCountries - List of group countries in [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
         * @param {string} groupOptions.groupName - Group name
         * @param {number} groupOptions.groupPosition - Position of the group in the group list
         * @param {number} groupOptions.groupSegments - Segment ID attached to the group
         * @param {MediationGroupPriority} groupOptions.adSourcePriority - AdSource and their priority
         * @returns {String}
         */
        public async updateMediationGroup(applicationKey: string, groupId: number, groupOptions?: { groupName?: string, groupCountries?: string[], groupPosition?: number, groupSegments?: number, adSourcePriority?: MediationGroupPriority }): Promise<string> {
            const body: any = {};

            body.appKey = applicationKey;
            body.groupId = groupId;
            if (groupOptions && groupOptions.groupName !== undefined) body.groupName = groupOptions.groupName;
            if (groupOptions && groupOptions.groupCountries !== undefined) body.groupCountries = groupOptions.groupCountries;
            if (groupOptions && groupOptions.groupPosition !== undefined) body.groupPosition = groupOptions.groupPosition;
            if (groupOptions && groupOptions.groupSegments !== undefined) body.groupSegments = groupOptions.groupSegments;
            if (groupOptions && groupOptions.adSourcePriority !== undefined) {
                if (groupOptions.adSourcePriority.getBidders() !== undefined) {
                    const groupTiers = groupOptions.adSourcePriority.getTiers();
                    for (let i = 0; i < groupTiers.length; i++) {
                        if (groupTiers[i]?.getTierType() == TierType.OPTIMIZED) {
                            new Error('Optimized Tier Type is not allowed with bidding.');
                        }
                    }
                }
                body.adSourcePriority = groupOptions.adSourcePriority.toString();
            }
            const token = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: MEDIATION_GROUP_MGMT_URL,
                headers: { Authorization: this.Bearer + token },
                data: body,
                method: this.PUT
            };
            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error updating Mediation Group ${res.msg}`);
            }
            return res.msg;

        }

        /**
         * 
         * @param {string} applicationKey - Application Key to delete the group for.
         * @param {number} groupId - Group ID to delete.
         * 
         * @return {String}
         */
        public async deleteMediationGroup(applicationKey: string, groupId: number): Promise<string> {

            const token = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                url: MEDIATION_GROUP_MGMT_URL,
                headers: { Authorization: this.Bearer + token },
                params: {
                    appKey: applicationKey,
                    groupId: groupId

                },
                method: this.DELETE
            };
            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error deleting Mediation Group ${res.msg}`);
            }
            return res.msg;
        }
        /**
         *  @returns {String} List of apps from the account
         */
        public async getApps(): Promise<string> {
            const token = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                headers: { Authorization: this.Bearer + token },
                url: APP_API_URL,
                method: this.GET
            };

            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error getting applications list ${res.msg}`);
            }
            return res.msg;

        }
        /**
         * 
         * @param {string} storeUrl - URL to the store of the live app
         * @param {boolean} coppa - Is app COPPA.
         * @param {Map<MonetizeEnums.AdUnits, MonetizeEnums.AdUnitStatus>} options.adUnitStatus  - Optional: Map of AdUnits [[MonetizeEnums.AdUnits]] and their status [[MonetizeEnums.AdUnitStatus]]
         * @param {boolean} options.ccpa - Optional: Is app CCPA. 
         * @returns {String}
         */

        public async addApp(storeUrl: string, taxonomy: typeof MonetizeEnums.Genres | string, coppa: boolean, options?: { adUnitStatus?: Map<MonetizeEnums.AdUnits, MonetizeEnums.AdUnitStatus>, ccpa?: boolean }): Promise<string>;
        /**
         * 
         * @param {string} appName - Temporary app's name 
         * @param {string} platform - Temporary app's platform
         * @param {boolean} coppa - Is app COPPA.
         * @param {Map<MonetizeEnums.AdUnits, MonetizeEnums.AdUnitStatus>} adUnitStatus - Optional: Map of AdUnits [[MonetizeEnums.AdUnits]] and their status [[MonetizeEnums.AdUnitStatus]]
         * @param {boolean} options.ccpa - Optional: Is app CCPA. 
         * @returns {String}
         */
        public async addApp(appName: string, platform: MonetizeEnums.PLATFORM, coppa: boolean, options?: { adUnitStatus?: Map<MonetizeEnums.AdUnits, MonetizeEnums.AdUnitStatus>, ccpa?: boolean }): Promise<string>;
        public async addApp(storeUrlOrAppName: string, platformOrTaxonomy: MonetizeEnums.PLATFORM | typeof MonetizeEnums.Genres | string, coppa: boolean, options?: { adUnitStatus?: Map<MonetizeEnums.AdUnits, MonetizeEnums.AdUnitStatus>, ccpa?: boolean }): Promise<string> {
            const { adUnitStatus, ccpa } = { ...options };

            const token = await this.getBearerToken();

            const reqOptions: AxiosRequestConfig = {
                headers: { Authorization: this.Bearer + token },
                url: APP_API_URL,
                method: this.POST
            };
            if ((<any>Object).values(MonetizeEnums.PLATFORM).includes(platformOrTaxonomy)) {
                const appName = storeUrlOrAppName;
                const platform = platformOrTaxonomy;

                reqOptions.data = {
                    appName: appName,
                    platform: platform
                };
            } else {

                reqOptions.data = {
                    storeUrl: storeUrlOrAppName,
                    taxonomy: platformOrTaxonomy
                };
            }
            reqOptions.data.coppa = (coppa) ? 1 : 0;
            if (ccpa !== undefined) {
                reqOptions.data.ccpa = (ccpa) ? 1 : 0;
            }

            if (adUnitStatus !== undefined && adUnitStatus.size > 0) {
                reqOptions.data.adUnits = {};
                await utils.asyncForEachMap(adUnitStatus, (key: MonetizeEnums.AdUnits, value: MonetizeEnums.AdUnitStatus) => {
                    reqOptions.data.adUnits[key] = value;
                });
            }

            const res = await utils.executeRequest(reqOptions);
            if (res.errorCode !== -1) {
                throw new Error(`Error adding app ${res.msg}`);
            }
            return res.msg;
        }

        /**
         * 
         * @param {string} applicationKey - Application Key to get instances for.
         * @returns {String}
         */
        public async getInstances(applicationKey: string): Promise<string> {
            const token = await this.getBearerToken();
            const options: AxiosRequestConfig = {
                headers: { Authorization: this.Bearer + token },
                params: { appKey: applicationKey },
                url: INSTANCES_API_URL,
                method: this.GET
            };

            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error getting instances ${res.msg}`);
            }
            return res.msg;
        }
        /**
         * 
         * @param {string} applicationKey - Application Key to add instance to.
         * @param {[InstanceConfig]} instances - List of InstanceConfigs to be add.
         * @returns {String}
         */
        public async addInstances(applicationKey: string, instances: InstanceConfig[]): Promise<string> {
            const token = await this.getBearerToken();
            const options: AxiosRequestConfig = {
                headers: { Authorization: this.Bearer + token },
                url: INSTANCES_API_URL,
                method: this.POST
            };

            const body: any = {
                appKey: applicationKey,
                configurations: {}
            };

            instances.forEach(instance => {
                body.configurations[instance.getInstanceAdSourceName()] = {
                    ...body.configurations[instance.getInstanceAdSourceName()],
                    ...({ appConfig: instance.getAppDataObject() })
                };
                if (body.configurations[instance.getInstanceAdSourceName()][instance.getInstanceAdUnit()] == undefined) {
                    body.configurations[instance.getInstanceAdSourceName()][instance.getInstanceAdUnit()] = [];
                }
                body.configurations[instance.getInstanceAdSourceName()][instance.getInstanceAdUnit()].push(instance.toString());

            });

            options.data = body;
            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error Creating Instances ${res.msg}`);
            }
            return res.msg;
        }

        /**
         * 
         * @param {string} applicationKey - Application key to delete instance for.
         * @param {number} instanceId  - Instance ID to delete.
         * @returns {String}
         */
        public async deleteInstance(applicationKey: string, instanceId: number): Promise<string> {
            const token = await this.getBearerToken();
            const options: AxiosRequestConfig = {
                headers: { Authorization: this.Bearer + token },
                params: {
                    appKey: applicationKey,
                    instanceId: instanceId.toString()
                },
                url: INSTANCES_API_URL,
                method: this.DELETE
            };

            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error failed to delete instanceId ${instanceId} error - ${res.msg}`);
            }
            return res.msg;
        }

        /**
         * 
         * @param {string} applicationKey - Application key to update instance for.
         * @param {[InstanceConfig]} instances - List of Instance Configs [[InstanceConfig]]
         * @returns {String}
         */
        public async updateInstance(applicationKey: string, instances: InstanceConfig[]): Promise<string> {
            const token = await this.getBearerToken();
            const options: AxiosRequestConfig = {
                headers: { Authorization: this.Bearer + token },
                url: INSTANCES_API_URL,
                method: this.PUT
            };

            const body: any = {
                appKey: applicationKey,
                configurations: {}
            };

            instances.forEach(instance => {
                body.configurations[instance.getInstanceAdSourceName()] = { ...body.configurations[instance.getInstanceAdSourceName()], ...({ appConfig: instance.getAppDataObject() }) };
                if (body.configurations[instance.getInstanceAdSourceName()][instance.getInstanceAdUnit()] == undefined) { body.configurations[instance.getInstanceAdSourceName()][instance.getInstanceAdUnit()] = []; }
                const instanceConfig = (instance.getInstanceId() === -1) ? instance.toString() : { ...instance.toString(), ...{ instanceId: instance.getInstanceId() } };

                body.configurations[instance.getInstanceAdSourceName()][instance.getInstanceAdUnit()].push(instanceConfig);

            });

            options.data = body;
            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error Updating Instances ${res.msg}`);
            }
            return res.msg;
        }

        public async getPlacements(applicationKey: string): Promise<string> {
            const token = await this.getBearerToken();
            const options: AxiosRequestConfig = {
                headers: { Authorization: this.Bearer + token },
                params: { appKey: applicationKey },
                url: PLACEMENTS_API_URL,
                method: this.GET
            };

            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error getting placements ${res.msg}`);
            }
            return res.msg;
        }

        public async addPlacements(applicationKey: string, placements: Placement[]): Promise<string> {
            const token = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                headers: { Authorization: this.Bearer + token },
                url: PLACEMENTS_API_URL,
                method: this.POST,
                data: {
                    appKey: applicationKey,
                    placements: []
                }
            };
            placements.forEach(placement => {
                if (!placement.getName()) {
                    throw Error('New placement must have a name');
                }
                options.data.placements.push(placement.getObject());
            });
            // options.data = JSON.stringify(options.data);
            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error Creating Placements ${res.msg}`);
            }
            return res.msg;

        }

        public async updatePlacements(applicationKey: string, placements: Placement[]): Promise<string> {
            const token = await this.getBearerToken();

            const options: AxiosRequestConfig = {
                headers: { Authorization: this.Bearer + token },
                url: PLACEMENTS_API_URL,
                method: this.PUT,
                data: {
                    appKey: applicationKey,
                    placements: []
                }
            };
            placements.forEach(placement => {
                if (!placement.getPlacementId()) {
                    throw new Error('One of the placement is missing a placement ID');
                }
                const placementObj = placement.getObject();
                if (placementObj.name) {
                    console.warn('Updating placement name is not allowed and will be ignored.');
                    delete placementObj.name;
                }
                options.data.placements.push(placementObj);
            });

            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error Creating Placements ${res.msg}`);
            }
            return res.msg;

        }

        public async deletePlacement(applicationKey: string, adUnit: MonetizeEnums.AdUnits, placementId: number): Promise<string> {
            const token = await this.getBearerToken();
            const options: AxiosRequestConfig = {
                headers: { Authorization: this.Bearer + token },
                data: {
                    appKey: applicationKey,
                    adUnit: adUnit,
                    id: placementId
                },
                url: PLACEMENTS_API_URL,
                method: this.DELETE
            };

            const res = await utils.executeRequest(options);
            if (res.errorCode !== -1) {
                throw new Error(`Error failed to delete placement ${placementId} error - ${res.msg}`);
            }
            return res.msg;
        }

    }



}