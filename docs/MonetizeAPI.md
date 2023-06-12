# Monetization API

### Methods

- [addApp](#addapp)
- [addInstances](#addinstances)
- [addPlacements](#addplacements)
- [createMediationGroup](#createmediationgroup)
- [deleteInstance](#deleteinstance)
- [deleteMediationGroup](#deletemediationgroup)
- [deletePlacement](#deleteplacement)
- [getARMReport](#getarmreport)
- [getARMReportAsStream](#getarmreportasstream)
- [getApps](#getapps)
- [getInstances](#getinstances)
- [getMediationGroups](#getmediationgroups)
- [getMonetizationData](#getmonetizationdata)
- [getPlacements](#getplacements)
- [getUserAdRevenue](#getuseradrevenue)
- [getUserAdRevenueAsStream](#getuseradrevenueasstream)
- [updateInstance](#updateinstance)
- [updateMediationGroup](#updatemediationgroup)
- [updatePlacements](#updateplacements)


### Enums

- [AdUnitStatus](#enumsmonetizeenumsadunitstatusmd)
- [AdUnits](#enumsmonetizeenumsadunitsmd)
- [Breakdowns](#enumsmonetizeenumsbreakdownsmd)
- [Metrics](#enumsmonetizeenumsmetricsmd)
- [Networks](#enumsmonetizeenumsnetworksmd)
- [PLATFORM](#enumsmonetizeenumsplatformmd)
- [TIER\_TYPE](#enumstier_typemd)



### addApp

▸ **addApp**(`storeUrl`, `taxonomy`, `coppa`, `options?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `storeUrl` | `string` | URL to the store of the live app |
| `taxonomy` | `string` \| [Taxonomy](#taxonomy) | - |
| `coppa` | `boolean` | Is app COPPA. |
| `options?` | `Object` | - |
| `options.adUnitStatus?` | `Map`<[`AdUnits`](../enums/MonetizeEnums.AdUnits.md), [`AdUnitStatus`](../enums/MonetizeEnums.AdUnitStatus.md)\> | Optional: Map of AdUnits [MonetizeEnums.AdUnits](../enums/MonetizeEnums.AdUnits.md) and their status [MonetizeEnums.AdUnitStatus](../enums/MonetizeEnums.AdUnitStatus.md) |
| `options.ccpa?` | `boolean` | Optional: Is app CCPA. |

#### Returns

`Promise`<`string`\>

▸ **addApp**(`appName`, `platform`, `coppa`, `options?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appName` | `string` | Temporary app's name |
| `platform` | [`PLATFORM`](../enums/MonetizeEnums.PLATFORM.md) | Temporary app's platform |
| `coppa` | `boolean` | Is app COPPA. |
| `options?` | `Object` | - |
| `options.adUnitStatus?` | `Map`<[`AdUnits`](../enums/MonetizeEnums.AdUnits.md), [`AdUnitStatus`](../enums/MonetizeEnums.AdUnitStatus.md)\> | - |
| `options.ccpa?` | `boolean` | Optional: Is app CCPA. |

#### Returns

`Promise`<`string`\>

___

### addInstances

▸ **addInstances**(`applicationKey`, `instances`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `applicationKey` | `string` | Application Key to add instance to. |
| `instances` | [`InstanceConfig`](#instanceconfig)[] | List of InstanceConfigs to be add. |

**Note:** To add instances to a network that already exists, pass instance objects with empty app config (`''`) 

#### Returns

`Promise`<`string`\>

___

### addPlacements

▸ **addPlacements**(`applicationKey`, `placements`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationKey` | `string` |
| `placements` | [`Placement`](#class-placement)[] |

#### Returns

`Promise`<`string`\>

___

### createMediationGroup

▸ **createMediationGroup**(`applicationKey`, `adUnit`, `groupName`, `groupCountries`, `groupOptions`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `applicationKey` | `string` | The application key to create the group for. |
| `adUnit` | [`AdUnits`](#enum-adunits) | The Ad Unit to create the application for see AdUnits |
| `groupName` | `string` | Group name |
| `groupCountries` | `string`[] | List of group countries in [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) |
| `groupOptions` | `Object` | Optional group parameters |
| `groupOptions.adSourcePriority?` | [`MediationGroupPriority`](#class-mediationgrouppriority) | AdSource and their priority |
| `groupOptions.groupPosition?` | `number` | Position of the group in the group list |
| `groupOptions.groupSegments?` | `number` | Segment ID attached to the group |

#### Returns

`Promise`<`string`\>

___

### deleteInstance

▸ **deleteInstance**(`applicationKey`, `instanceId`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `applicationKey` | `string` | Application key to delete instance for. |
| `instanceId` | `number` | Instance ID to delete. |

#### Returns

`Promise`<`string`\>

___

### deleteMediationGroup

▸ **deleteMediationGroup**(`applicationKey`, `groupId`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `applicationKey` | `string` | Application Key to delete the group for. |
| `groupId` | `number` | Group ID to delete. |

#### Returns

`Promise`<`string`\>

___

### deletePlacement

▸ **deletePlacement**(`applicationKey`, `adUnit`, `placementId`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationKey` | `string` |
| `adUnit` | [`AdUnits`](#enum-adunits) |
| `placementId` | `number` |

#### Returns

`Promise`<`string`\>

___

### getARMReport

▸ **getARMReport**(`date`, `appKey`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `string` | Date in the following formate YYYY-MM-DD |
| `appKey` | `string` | Application key of the app |

#### Returns

`Promise`<`string`\>

ARM data in csv format

___

### getARMReportAsStream

▸ **getARMReportAsStream**(`date`, `appKey`): `Promise`<`Stream`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `string` | Date in the following formate YYYY-MM-DD |
| `appKey` | `string` | Application key of the app |

#### Returns

`Promise`<`Stream`\>

- A stream of the ARM data from the request

___

### getApps

▸ **getApps**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

List of apps from the account

___

### getInstances

▸ **getInstances**(`applicationKey`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `applicationKey` | `string` | Application Key to get instances for. |

#### Returns

`Promise`<`string`\>

___

### getMediationGroups

▸ **getMediationGroups**(`applicationKey`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `applicationKey` | `string` | The application key to get the mediation groups for |

#### Returns

`Promise`<`string`\>

- String in JSON format describing the mediation group (https://developers.ironsrc.com/ironsource-mobile/android/mediationmanagement/#step-1)

___

### getMonetizationData

▸ **getMonetizationData**(`startDate`, `endDate`, `optionsParams?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startDate` | `string` | Report start date in the following format YYYY-MM-DD |
| `endDate` | `string` | Report end date in the following format YYYY-MM-DD |
| `optionsParams?` | `Object` | Object containing optional |
| `optionsParams.adSource?` | [`Networks`](#Enum-networks) | Filter for specific Ad Source - network Networks. |
| `optionsParams.adUnits?` | [`AdUnits`](#Enum-adunits) | - |
| `optionsParams.appKey?` | `string` | - |
| `optionsParams.breakdowns?` | [`Breakdowns`](#Enum-breakdowns)[] | List of breakdowns see [Breakdowns](https://developers.ironsrc.com/ironsource-mobile/air/supported-breakdown-metric/) see supported breakdown and metrics |
| `optionsParams.country?` | `string` | Country code in 2 letter country code, as per [[ISO 3166-1 Alpha-2]](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) |
| `optionsParams.metrics?` | [`Metrics`](#Enum-metrics)[] | List of metrics see [Metrics](https://developers.ironsrc.com/ironsource-mobile/air/supported-breakdown-metric/) see supported metrics and breakdowns |

#### Returns

`Promise`<`string`\>

Report data in json format.

___

### getPlacements

▸ **getPlacements**(`applicationKey`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationKey` | `string` |

#### Returns

`Promise`<`string`\>

___

### getUserAdRevenue

▸ **getUserAdRevenue**(`date`, `appKey`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `string` | {string} - Date in the following formate YYYY-MM-DD |
| `appKey` | `string` | {string} - Application key of the app |

#### Returns

`Promise`<`string`\>

UAR data in csv format

___

### getUserAdRevenueAsStream

▸ **getUserAdRevenueAsStream**(`date`, `appKey`): `Promise`<`Stream`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `string` | {string} - Date in the following formate YYYY-MM-DD |
| `appKey` | `string` | {string} - Application key of the app |

#### Returns

`Promise`<`Stream`\>

- A stream of the UAR data from the request

___


### updateInstance

▸ **updateInstance**(`applicationKey`, `instances`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `applicationKey` | `string` | Application key to update instance for. |
| `instances` | [`InstanceConfig`](#instanceconfig)[] | List of Instance Configs InstanceConfig |

#### Returns

`Promise`<`string`\>

___

### updateMediationGroup

▸ **updateMediationGroup**(`applicationKey`, `groupId`, `groupOptions?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `applicationKey` | `string` | The application key to update the group for. |
| `groupId` | `number` | Id of the group to update |
| `groupOptions?` | `Object` | Optional group parameters |
| `groupOptions.adSourcePriority?` | [`MediationGroupPriority`](#class-mediationgrouppriority) | AdSource and their priority |
| `groupOptions.groupCountries?` | `string`[] | List of group countries in [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) |
| `groupOptions.groupName?` | `string` | Group name |
| `groupOptions.groupPosition?` | `number` | Position of the group in the group list |
| `groupOptions.groupSegments?` | `number` | Segment ID attached to the group |

#### Returns

`Promise`<`string`\>

___

### updatePlacements

▸ **updatePlacements**(`applicationKey`, `placements`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationKey` | `string` |
| `placements` | [`Placement`](#class-placement)[] |

#### Returns

`Promise`<`string`\>




<a name="classesadcolonybiddingmd"></a>

# InstanceConfig

## AdColonyBidding

#### constructor

• **new AdColonyBidding**(`instanceName`, `adUnit`, `status`, `appId`, `zoneId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `adUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `zoneId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesadcolonyinstancemd"></a>

## AdColonyInstance

#### constructor

• **new AdColonyInstance**(`instanceName`, `adUnit`, `status`, `appId`, `zoneId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `adUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `zoneId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesadmanagerinstancemd"></a>

## AdManagerInstance

#### constructor

• **new AdManagerInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `adUnitId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `adUnitId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesadmobinstancemd"></a>

## AdMobInstance

#### constructor

• **new AdMobInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `adUnitId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `adUnitId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesamazoninstancemd"></a>

## AmazonInstance

#### constructor

• **new AmazonInstance**(`instanceName`, `instanceAdUnit`, `status`, `appKey`, `ec`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appKey` | `string` |
| `ec` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesapplovininstancemd"></a>

## ApplovinInstance

#### constructor

• **new ApplovinInstance**(`instanceName`, `adUnit`, `status`, `sdkKey`, `zoneId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `adUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `sdkKey` | `string` |
| `zoneId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesaudiencelistdatamd"></a>

## CJSInstance

#### constructor

• **new CJSInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `slotId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `number` |
| `slotId` | `number` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classescampaignbidmd"></a>


## ChartboostInstance

#### constructor

• **new ChartboostInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `appSignature`, `adLocation`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `appSignature` | `string` |
| `adLocation` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classescrosspromotionbiddinginstancemd"></a>

## CrossPromotionBiddingInstance

#### constructor

• **new CrossPromotionBiddingInstance**(`instanceName`, `instanceAdUnit`, `status`, `trafficId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `trafficId` | `number` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesdirectdealsinstancemd"></a>

## DirectDealsInstance

#### constructor

• **new DirectDealsInstance**(`instanceName`, `instanceAdUnit`, `status`, `trafficId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `trafficId` | `number` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesfacebookbiddinginstancemd"></a>

## FacebookBiddingInstance

#### constructor

• **new FacebookBiddingInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `userAccessToken`, `placementId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `userAccessToken` | `string` |
| `placementId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesfacebookinstancemd"></a>

## FacebookInstance

#### constructor

• **new FacebookInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `userAccessToken`, `placementId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `userAccessToken` | `string` |
| `placementId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesfyberinstancemd"></a>

## FyberInstance

#### constructor

• **new FyberInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `adSpotId`, `contentId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `adSpotId` | `string` |
| `contentId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classeshypermxinstancemd"></a>

## HyperMXInstance

#### constructor

• **new HyperMXInstance**(`instanceName`, `instanceAdUnit`, `status`, `placementId`, `distributorId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `placementId` | `string` |
| `distributorId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesinmobibiddinginstancemd"></a>

## InMobiBiddingInstance

#### constructor

• **new InMobiBiddingInstance**(`instanceName`, `instanceAdUnit`, `status`, `placementId`, `adSource`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `placementId` | `string` |
| `adSource` | [`Networks`](#enumsmonetizeenumsnetworksmd) |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesinmobiinstancemd"></a>

## InMobiInstance

#### constructor

• **new InMobiInstance**(`instanceName`, `instanceAdUnit`, `status`, `placementId`, `adSource`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `placementId` | `string` |
| `adSource` | [`Networks`](#enumsmonetizeenumsnetworksmd) |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesinstanceconfigmd"></a>

## IronSourceBidding

#### constructor

• **new IronSourceBidding**(`instanceName`, `adUnit`, `applicationKey`, `status`, `instanceId?`)

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `instanceName` | `string` | `undefined` |
| `adUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) | `undefined` |
| `applicationKey` | `string` | `undefined` |
| `status` | `boolean` | `undefined` |
| `instanceId` | `number` | `-1` |

<a name="classesironsourceinstancemd"></a>

## IronSourceInstance

#### constructor

• **new IronSourceInstance**(`instanceName`, `adUnit`, `applicationKey`, `status`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `adUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `applicationKey` | `string` |
| `status` | `boolean` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.pricing?` | `Map`<`number`, `string`[]\> |

<a name="classesliftoffinstancemd"></a>

## LiftoffInstance

#### constructor

• **new LiftoffInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `adUnitId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `adUnitId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesmaioinstancemd"></a>

## MaioInstance

#### constructor

• **new MaioInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `mediaId`, `zoneId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `mediaId` | `string` |
| `zoneId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

## MyTargetInstance

#### constructor

• **new MyTargetInstance**(`instanceName`, `instanceAdUnit`, `status`, `slotId`, `placementId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `slotId` | `string` |
| `placementId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classespanglebiddinginstancemd"></a>

## PangleBiddingInstance

#### constructor

• **new PangleBiddingInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `slotId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `slotId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classespangleinstancemd"></a>

## PangleInstance

#### constructor

• **new PangleInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `slotId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `slotId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classessmaatoinstancemd"></a>

## SmaatoInstance

#### constructor

• **new SmaatoInstance**(`instanceName`, `instanceAdUnit`, `status`, `applicationName`, `adSpaceID`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `applicationName` | `string` |
| `adSpaceID` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classessnapinstancemd"></a>

## SnapInstance

#### constructor

• **new SnapInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `slotId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `slotId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classessuperawesomeinstancemd"></a>

## SuperAwesomeInstance

#### constructor

• **new SuperAwesomeInstance**(`instanceName`, `instanceAdUnit`, `status`, `appID`, `placementId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appID` | `string` |
| `placementId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classestapjoybiddinginstancemd"></a>

## TapJoyBiddingInstance

#### constructor

• **new TapJoyBiddingInstance**(`instanceName`, `instanceAdUnit`, `status`, `sdkKey`, `apiKey`, `placementName`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `sdkKey` | `string` |
| `apiKey` | `string` |
| `placementName` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classestapjoyinstancemd"></a>

## TapJoyInstance

#### constructor

• **new TapJoyInstance**(`instanceName`, `instanceAdUnit`, `status`, `sdkKey`, `apiKey`, `placementName`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `sdkKey` | `string` |
| `apiKey` | `string` |
| `placementName` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classestencentinstancemd"></a>

## TencentInstance

#### constructor

• **new TencentInstance**(`instanceName`, `instanceAdUnit`, `status`, `appID`, `placementId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appID` | `string` |
| `placementId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesunityadsinstancemd"></a>

## UnityAdsInstance

#### constructor

• **new UnityAdsInstance**(`instanceName`, `instanceAdUnit`, `status`, `sourceId`, `zoneId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `sourceId` | `string` |
| `zoneId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |


<a name="classesvungleinstancemd"></a>

## VungleInstance

#### constructor

• **new VungleInstance**(`instanceName`, `instanceAdUnit`, `status`, `appId`, `reportingApiId`, `placementId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `appId` | `string` |
| `reportingApiId` | `string` |
| `placementId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="classesyahoobiddinginstancemd"></a>

## YahooBiddingInstance

#### constructor

• **new YahooBiddingInstance**(`instanceName`, `instanceAdUnit`, `status`, `siteId`, `placementId`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `instanceName` | `string` |
| `instanceAdUnit` | [`AdUnits`](#enumsmonetizeenumsadunitsmd) |
| `status` | `boolean` |
| `siteId` | `string` |
| `placementId` | `string` |
| `options?` | `Object` |
| `options.instanceId?` | `number` |
| `options.rate?` | `number` |

<a name="enumsapppromotionenumsadunitsmd"></a>





# Class: MediationGroupPriority

### constructor

• **new MediationGroupPriority**()

## Methods

### getBidders

▸ **getBidders**(): `undefined` \| [`MediationGroupTier`](#class-mediationgrouptier)

Returns groups bidders list

#### Returns

`undefined` \| [`MediationGroupTier`](#class-mediationgrouptier)

or undefined.

___

### getTiers

▸ **getTiers**(): (`undefined` \| [`MediationGroupTier`](#class-mediationgrouptier))[]

Returns groups tiers list

#### Returns

(`undefined` \| [`MediationGroupTier`](#class-mediationgrouptier))[]

or undefined.

___

### removeBidders

▸ **removeBidders**(): `void`

Removes bidders from the group

#### Returns

`void`

___

### removeTier

▸ **removeTier**(`position`): `void`

Removes tier from the group

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `position` | `number` | position of the tier to be removed (0-2) |

#### Returns

`void`

___

### setMediationGroupTier

▸ **setMediationGroupTier**(`groupTier`, `position`): `boolean`

set the mediation group with a tier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupTier` | [`MediationGroupTier`](#class-mediationgrouptier) | MediationGroupTier to be added to the group tier list |
| `position` | `number` | The Position of the tier (0-2), Ignored in case of bidding tier. |

#### Returns

`boolean`

- true upon successful addition of the tier to the group list.

____
# Class: MediationGroupTier

## Constructors

### constructor

• **new MediationGroupTier**(`tierType`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tierType` | [`TIER_TYPE`](#enum-tiertype) | the type of tier |

## Methods

### addInstances

▸ **addInstances**(`network`, `instanceId`, `optionalParams?`): `void`

Adds an instance to the tier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `network` | [`Networks`](#enum-networks) | Network name |
| `instanceId` | `number` | ID of the instance for the network (see MonetizeAPI().getInstanceIds()) |
| `optionalParams?` | `Object` | Optional parameters |
| `optionalParams.capping?` | `number` | Optional: Set capping for the instance per session |
| `optionalParams.position?` | `number` | Optional: The position of the instance in the waterfall, only for Manual tier type |
| `optionalParams.rate?` | `number` | Optional: overrides the cpm of the instance with rate |

#### Returns

`void`

___

### getInstanceList

▸ **getInstanceList**(): `any`

Returns list of instances in the tier

#### Returns

`any`

___

### getTierType

▸ **getTierType**(): [`TIER_TYPE`](#enum-tiertype)

returns the tier type

#### Returns

[`TIER_TYPE`](#enum-tiertype)

___

### removeInstance

▸ **removeInstance**(`network`, `instanceID`): `void`

Removes instance from the tier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `network` | [`Networks`](../enums/MonetizeEnums.Networks.md) | The network of the instance to remove. |
| `instanceID` | `number` | Instance ID to remove. |

#### Returns

`void`

___

### toString

▸ **toString**(): `any`

building tier object for sending to the API.

#### Returns

`any`

# Class: Placement


### Methods

- [getAdUnit](#getadunit)
- [getCapping](#getcapping)
- [getItemName](#getitemname)
- [getName](#getname)
- [getPacing](#getpacing)
- [getPlacementId](#getplacementid)
- [getRewardAmount](#getrewardamount)
- [isEnabled](#isenabled)


### constructor

• **new Placement**(`adUnit`, `enabled?`, `options?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `adUnit` | [`AdUnits`](#enum-adunits) | `undefined` | The placement Ad Unit. |
| `enabled` | `boolean` | `true` | Placement enabled. |
| `options?` | `Object` | `undefined` | - |
| `options.capping?` | [`Capping`](#class-capping) | `undefined` | Optional: capping for placement. |
| `options.itemName?` | `string` | `undefined` | Placement item name - mandatory for Rewarded Video. |
| `options.name?` | `string` | `undefined` | - |
| `options.pacing?` | [`Pacing`](#class-pacing) | `undefined` | Optional: pacing for placement. |
| `options.placementId?` | `number` | `undefined` | Optional: Placement id for update and delete operations. |
| `options.rewardAmount?` | `number` | `undefined` | Placement reward amount - mandatory for Rewarded Video. |

## Methods

### getAdUnit

▸ **getAdUnit**(): [`AdUnits`](#enum-adunits)

#### Returns

[`AdUnits`](#enum-adunits)

___

### getCapping

▸ **getCapping**(): `undefined` \| [`Capping`](#class-capping)

#### Returns

`undefined` \| [`Capping`](#class-capping)

___

### getItemName

▸ **getItemName**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### getName

▸ **getName**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___


### getPacing

▸ **getPacing**(): `undefined` \| [`Pacing`](#class-pacing)

#### Returns

`undefined` \| [`Pacing`](#class-pacing)

___

### getPlacementId

▸ **getPlacementId**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

___

### getRewardAmount

▸ **getRewardAmount**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`
# Class: Capping


### Methods

- [getInterval](#getinterval)
- [getLimit](#getlimit)
- [isEnabled](#isenabled-1)


### constructor

• **new Capping**(`limit`, `interval`, `enabled`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit` | `number` | Capping limit max 1000 |
| `interval` | ``"d"`` \| ``"h"`` | Capping interval: d – days or h – hours |
| `enabled` | `boolean` | Capping enabled. |

## Methods

### getInterval

▸ **getInterval**(): `string`

#### Returns

`string`

___

### getLimit

▸ **getLimit**(): `number`

#### Returns

`number`

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

# Class: Pacing


### Methods

- [getMinutes](#getminutes)
- [isEnabled](#isenabled-2)


### constructor

• **new Pacing**(`minutes`, `enabled`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minutes` | `number` | Placement pacing in minutes max 1000 |
| `enabled` | `boolean` | Placement enabled. |

## Methods

### getMinutes

▸ **getMinutes**(): `number`

#### Returns

`number`

___


### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

# Enums:
## Enum: AdUnitStatus

[MonetizeEnums](#modulesmonetizeenumsmd).AdUnitStatus

### Enum Members

#### Live

• **Live** = ``"Live"``

___

#### Off

• **Off** = ``"Off"``

___

#### Test

• **Test** = ``"Test"``


<a name="enumsmonetizeenumsadunitsmd"></a>

## Enum: AdUnits

[MonetizeEnums](#modulesmonetizeenumsmd).AdUnits

### Enum Members

#### Banner

• **Banner** = ``"banner"``

___

#### Interstitial

• **Interstitial** = ``"interstitial"``

___

#### Offerwall

• **Offerwall** = ``"OfferWall"``

___

#### RewardedVideo

• **RewardedVideo** = ``"rewardedVideo"``


<a name="enumsmonetizeenumsbreakdownsmd"></a>

## Enum: Breakdowns

[MonetizeEnums](#modulesmonetizeenumsmd).Breakdowns

### Enum Members

#### ABTest

• **ABTest** = ``"abTest"``

___

#### ATT

• **ATT** = ``"att"``

___

#### AdUnits

• **AdUnits** = ``"adUnits"``

___

#### AppVersion

• **AppVersion** = ``"appVersion"``

___

#### Application

• **Application** = ``"app"``

___

#### ConnectionType

• **ConnectionType** = ``"connectionType"``

___

#### Country

• **Country** = ``"country"``

___

#### Date

• **Date** = ``"date"``

___

#### IDFA

• **IDFA** = ``"idfa"``

___

#### IOSVersion

• **IOSVersion** = ``"iosVersion"``

___

#### Instance

• **Instance** = ``"instance"``

___

#### Network

• **Network** = ``"adSource"``

___

#### Placement

• **Placement** = ``"placement"``

___

#### Platform

• **Platform** = ``"platform"``

___

#### SDKVersion

• **SDKVersion** = ``"sdkVersion"``

___

#### Segment

• **Segment** = ``"segment"``


<a name="enumsmonetizeenumsmetricsmd"></a>

## Enum: Metrics

[MonetizeEnums](#modulesmonetizeenumsmd).Metrics

### Enum Members

#### activeUsers

• **activeUsers** = ``"activeUsers"``

___

#### adSourceAvailabilityRate

• **adSourceAvailabilityRate** = ``"adSourceAvailabilityRate"``

___

#### adSourceChecks

• **adSourceChecks** = ``"adSourceChecks"``

___

#### adSourceResponses

• **adSourceResponses** = ``"adSourceResponses"``

___

#### appFillRate

• **appFillRate** = ``"appfillrate"``

___

#### appFills

• **appFills** = ``"appFills"``

___

#### appRequests

• **appRequests** = ``"appRequests"``

___

#### clickThroughRate

• **clickThroughRate** = ``"clickThroughRate"``

___

#### clicks

• **clicks** = ``"clicks"``

___

#### completionRate

• **completionRate** = ``"completionRate"``

___

#### completions

• **completions** = ``"completions"``

___

#### eCPM

• **eCPM** = ``"ecpm"``

___

#### engagedSessions

• **engagedSessions** = ``"engagedSessions"``

___

#### engagedUsers

• **engagedUsers** = ``"engagedUsers"``

___

#### engagedUsersRate

• **engagedUsersRate** = ``"engagedUsersRate"``

___

#### impressionPerEngagedSessions

• **impressionPerEngagedSessions** = ``"impressionPerEngagedSessions"``

___

#### impressions

• **impressions** = ``"impressions"``

___

#### impressionsPerEngagedUser

• **impressionsPerEngagedUser** = ``"impressionsPerEngagedUser"``

___

#### impressionsPerSession

• **impressionsPerSession** = ``"impressionsPerSession"``

___

#### revenue

• **revenue** = ``"revenue"``

___

#### revenuePerActiveUser

• **revenuePerActiveUser** = ``"revenuePerActiveUser"``

___

#### revenuePerCompletion

• **revenuePerCompletion** = ``"revenuePerCompletion"``

___

#### revenuePerEngagedUser

• **revenuePerEngagedUser** = ``"revenuePerEngagedUser"``

___

#### sessions

• **sessions** = ``"sessions"``

___

#### sessionsPerActiveUser

• **sessionsPerActiveUser** = ``"sessionsPerActiveUser"``

___

#### useRate

• **useRate** = ``"useRate"``


<a name="enumsmonetizeenumsnetworksmd"></a>

## Enum: Networks

[MonetizeEnums](#modulesmonetizeenumsmd).Networks

### Enum Members

#### AdColony

• **AdColony** = ``"AdColony"``

___

#### AdColonyBidding

• **AdColonyBidding** = ``"adColonyBidding"``

___

#### AdManager

• **AdManager** = ``"AdManager"``

___

#### AdMob

• **AdMob** = ``"AdMob"``

___

#### Amazon

• **Amazon** = ``"Amazon"``

___

#### AppLovin

• **AppLovin** = ``"AppLovin"``

___

#### CSJ

• **CSJ** = ``"CSJ"``

___

#### Chartboost

• **Chartboost** = ``"Chartboost"``

___

#### CrossPromotionBidding

• **CrossPromotionBidding** = ``"crossPromotionBidding"``

___

#### DirectDeals

• **DirectDeals** = ``"DirectDeals"``

___

#### Facebook

• **Facebook** = ``"Facebook"``

___

#### FacebookBidding

• **FacebookBidding** = ``"facebookBidding"``

___

#### Fyber

• **Fyber** = ``"Fyber"``

___

#### HyperMX

• **HyperMX** = ``"HyprMX"``

___

#### InMobi

• **InMobi** = ``"InMobi"``

___

#### InMobiBidding

• **InMobiBidding** = ``"inMobiBidding"``

___

#### IronSource

• **IronSource** = ``"ironSource"``

___

#### IronSourceBidding

• **IronSourceBidding** = ``"ironSourceBidding"``

___

#### LiftOff

• **LiftOff** = ``"Liftoff Bidding"``

___

#### Maio

• **Maio** = ``"Maio"``

___

#### MyTarget

• **MyTarget** = ``"myTargetBidding"``

___

#### Pangle

• **Pangle** = ``"Pangle"``

___

#### PangleBidding

• **PangleBidding** = ``"pangleBidding"``

___

#### Smaato

• **Smaato** = ``"smaatoBidding"``

___

#### Snap

• **Snap** = ``"Snap"``

___

#### SuperAwesome

• **SuperAwesome** = ``"SuperAwesomeBidding"``

___

#### TapJoy

• **TapJoy** = ``"TapJoy"``

___

#### TapJoyBidding

• **TapJoyBidding** = ``"TapJoyBidding"``

___

#### Tencent

• **Tencent** = ``"Tencent"``

___

#### UnityAds

• **UnityAds** = ``"UnityAds"``

___

#### Vungle

• **Vungle** = ``"Vungle"``

___

#### VungleBidding

• **VungleBidding** = ``"vungleBidding"``

___

#### YahooBidding

• **YahooBidding** = ``"yahooBidding"``


<a name="enumsmonetizeenumsplatformmd"></a>

## Enum: PLATFORM

[MonetizeEnums](#modulesmonetizeenumsmd).PLATFORM

### Enum Members

#### Android

• **Android** = ``"Android"``

___

#### iOS

• **iOS** = ``"iOS"``


<a name="enumstier_typemd"></a>

## Enum: TIER\_TYPE

### Enum Members

#### BIDDERS

• **BIDDERS** = ``"bidding"``

___

#### MANUAL

• **MANUAL** = ``"manual"``

___

#### OPTIMIZED

• **OPTIMIZED** = ``"optimized"``

___

#### SORT\_BY\_CPM

• **SORT\_BY\_CPM** = ``"sortByCpm"``


<a name="modulesmd"></a>
