

# User Acquisition API

### Methods

- [createAsset](#createasset)
- [createAudienceList](#createaudiencelist)
- [createCreative](#createcreative)
- [deleteAudienceList](#deleteaudiencelist)
- [deleteBids](#deletebids)
- [getAdvertiserStatistics](#getadvertiserstatistics)
- [getAssets](#getassets)
- [getAudienceLists](#getaudiencelists)
- [getBidsForCampaign](#getbidsforcampaign)
- [getCreatives](#getcreatives)
- [getSkanReporting](#getskanreporting)
- [getTitles](#gettitles)
- [getUniversalSkanReport](#getuniversalskanreport)
- [updateAudienceList](#updateaudiencelist)
- [updateBids](#updatebids)

<a name="modulesapppromotionenumsmd"></a>


### Enums

- [AdUnits](#enum-adunits)
- [Breakdowns](#enum-breakdowns)
- [CreativeType](#enum-creativetype)
- [Metrics](#enum-metrics)
- [PLATFORM](#enum-platform)
- [UsageType](#enum-usagetype)
- [AudienceListType](#enum-audiencelisttype)


## Methods

### createAsset

▸ **createAsset**(`titleId`, `type`, `filePath`, `fileName?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `titleId` | `number` |
| `type` | `string` |
| `filePath` | `string` |
| `fileName?` | `string` |

#### Returns

`Promise`<`string`\>

___

### createAudienceList

▸ **createAudienceList**(`audienceListMeta`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audienceListMeta` | [`AudienceListMeta`](#class-audiencelistmeta) | AudienceListMeta meta data of the audience list to create |

#### Returns

`Promise`<`string`\>

___

### createCreative

▸ **createCreative**(`titleId`, `creatives`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `titleId` | `number` |
| `creatives` | [`Creative`](#class-creative)[] |

#### Returns

`Promise`<`string`\>

___

### deleteAudienceList

▸ **deleteAudienceList**(`audienceListId`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audienceListId` | `string` | Audience List ID to delete |

#### Returns

`Promise`<`string`\>

___

### deleteBids

▸ **deleteBids**(`campaignBids`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `campaignBids` | [`CampaignBidList`](#class-campaignbidlist)[] | list of CampaignBids to delete. |

#### Returns

`Promise`<`string`\>

- Arry with API results.

___

### getAdvertiserStatistics

▸ **getAdvertiserStatistics**(`startDate`, `endDate`, `metrics`, `reportingOptions?`): `Stream`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startDate` | `string` | report start date in the following format YYYY-MM-DD |
| `endDate` | `string` | report end date in the following format YYYY-MM-DD |
| `metrics` | [`Metrics`](#enumeration-metrics)[] | list of report metrics. |
| `reportingOptions?` | `Object` | Optional additional parameters. |
| `reportingOptions.adUnit?` | [`AdUnits`](#enumeration-adunits) | Ad Unit from AdUnits |
| `reportingOptions.breakdowns?` | [`Breakdowns`](#enumeration-breakdowns)[] | list of breakdowns. |
| `reportingOptions.bundleId?` | `string`[] | list of bundle ids |
| `reportingOptions.campaignId?` | `number`[] | list of campaign ids |
| `reportingOptions.count?` | `number` | maximum number of records in the report |
| `reportingOptions.country?` | `string`[] | list of country code in 2 letter country code, as per [ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) |
| `reportingOptions.creativeId?` | `number`[] | list of creative ids. |
| `reportingOptions.deviceType?` | ``"phone"`` \| ``"tablet"`` | - |
| `reportingOptions.direction` | ``"desc"`` \| ``"asc"`` | either 'asc' or 'desc' |
| `reportingOptions.format?` | ``"json"`` \| ``"csv"`` | report format type 'csv' or 'json' only |
| `reportingOptions.order?` | [`Metrics`](#enumeration-metrics) \| [`Breakdowns`](#enumeration-breakdowns) | order report according to a specific Breakdown or Metric |
| `reportingOptions.os?` | ``"android"`` \| ``"ios"`` | either 'ios' or 'android'. |

#### Returns

`Stream`

- Readable Stream with results - in case of when format is json each chunk will be a json list.

___

### getAssets

▸ **getAssets**(`options?`): `Promise`<`string`\>

**`Example`**
```js
{
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
} 
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` | Optional parameters |
| `options.ids?` | `number`[] | List of assets ids. |
| `options.pageNumber?` | `number` | For paginated requests pass the next page of the request. |
| `options.requestId?` | `string` | For paginated requests pass the requestId from the response. |
| `options.resultsBulkSize?` | `number` | For paginated requests pass the amount of titles to return, default 100. |
| `options.titleId?` | `number` | ID of the title of which the assets belongs to. |
| `options.type?` | `string` | Asset type ('video', 'html', 'html_iec') |

#### Returns

`Promise`<`string`\>

in json format of the audience list

___

### getAudienceLists

▸ **getAudienceLists**(): `Promise`<`string`\>

**`Example`**
```js
 {
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
}
```

#### Returns

`Promise`<`string`\>

in json format of the audience list

___

### getBidsForCampaign

▸ **getBidsForCampaign**(`campaignId`, `maxRecords?`): `Stream`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `campaignId` | `number` | campaign id to get bids for |
| `maxRecords?` | `number` | (optional) max number of records - default 10000 |

#### Returns

`Stream`

- ReadableStream that will contain the result

___

### getCreatives

▸ **getCreatives**(`options?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.pageNumber?` | `string` |
| `options.requestId?` | `string` |
| `options.resultsBulkSize?` | `number` |
| `options.titleId?` | `number` |
| `options.type?` | [`CreativeType`](#enum-creativetype) |

#### Returns

`Promise`<`string`\>

___

### getSkanReporting

▸ **getSkanReporting**(`startDate`, `endDate`, `metrics`, `reportingOptions?`): `Stream`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startDate` | `string` | report start date in the following format YYYY-MM-DD |
| `endDate` | `string` | report end date in the following format YYYY-MM-DD |
| `metrics` | [`Metrics`](#enumeration-metrics)[] | list of report metrics. |
| `reportingOptions?` | `Object` | Optional additional parameters. |
| `reportingOptions.adUnit?` | [`AdUnits`](#enumeration-adunits) | - |
| `reportingOptions.breakdowns?` | [`Breakdowns`](#enumeration-breakdowns)[] | list of breakdowns. |
| `reportingOptions.bundleId?` | `string`[] | list of bundle ids |
| `reportingOptions.campaignId?` | `number`[] | list of campaign ids |
| `reportingOptions.count?` | `number` | maximum number of records in the report |
| `reportingOptions.country?` | `string`[] | - |
| `reportingOptions.creativeId?` | `number`[] | - |
| `reportingOptions.deviceType?` | ``"phone"`` \| ``"tablet"`` | - |
| `reportingOptions.direction?` | ``"desc"`` \| ``"asc"`` | either 'asc' or 'desc' |
| `reportingOptions.format?` | ``"json"`` \| ``"csv"`` | report format type 'csv' or 'json' only |
| `reportingOptions.order?` | [`Metrics`](#enumeration-metrics) \| [`Breakdowns`](#enumeration-breakdowns) | order report according to a specific Breakdown or Metric |
| `reportingOptions.os?` | ``"android"`` \| ``"ios"`` | - |

#### Returns

`Stream`

- Readable Stream with results - in case of when format is json each chunk will be a json list.

___

### getTitles

▸ **getTitles**(`options?`): `Promise`<`string`\>

**`Example`**

```js
{
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
       }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` | Optional Params |
| `options.os?` | `string` | 'android' or 'ios' |
| `options.pageNumber?` | `number` | For paginated requests pass the next page of the request. |
| `options.requestId?` | `string` | For paginated requests pass the requestId from the response. |
| `options.resultsBulkSize?` | `number` | For paginated requests pass the amount of titles to return, default 100. |
| `options.searchTerm?` | `string` | Filter by the name or partial name of the title. |

#### Returns

`Promise`<`string`\>

in json format of the audience list

___

### getUniversalSkanReport

▸ **getUniversalSkanReport**(`date`): `Promise`<`undefined` \| `string`\>

returns a copy of the raw winning postbacks data from every network, directly from Apple.



#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `string` | report date |

#### Returns

`Promise`<`undefined` \| `string`\>

json with list of urls of the report

**`Example`**

```js
{
    "urls": [
        "https://postback-hub.s3.amazonaws.com/athena/raw_data_rtm_postback_hub_csv_file/outputs/athena/cf23fe03-cf05-4189-adda-d1cc009a9b59/3/output/companyid%123456/partition_date%3D2021-10-10/compaction_id%3D1/2021_10_11_00_00_output.csv?AWSAccessKeyId=ASIAQO6NX2IJOKSSQ34R&Expires=1633937977&Signature=um69g30FsSp%2BWENsxABotPnk0q8%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEG4a"
    ],
    "expiration": "2021-10-11 07:39:37"
}
```
___


### updateAudienceList

▸ **updateAudienceList**(`audienceListData`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audienceListData` | [`AudienceListData`](#class-audiencelistdata) | AudienceListData Audience List data to update |

#### Returns

`Promise`<`string`\>

___

### updateBids

▸ **updateBids**(`campaignBids`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `campaignBids` | [`CampaignBidList`](#class-campaignbidlist)[] | List of CampaignBids to update |

#### Returns

`Promise`<`string`\>

- Array with API results.


## Class: AudienceListData

#### constructor

• **new AudienceListData**()

### Methods

#### addAudienceListToRemove

▸ **addAudienceListToRemove**(`audienceListId`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `audienceListId` | `string` |

##### Returns

`void`

___

#### addAudienceListToUpdate

▸ **addAudienceListToUpdate**(`audienceListId`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `audienceListId` | `string` |

##### Returns

`void`

___

#### addDevices

▸ **addDevices**(`devices`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `devices` | `string`[] |

##### Returns

`void`

▸ **addDevices**(`device`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `device` | `string` |

##### Returns

`void`

___

#### toObject

▸ **toObject**(): `any`

##### Returns

`any`


<a name="classesaudiencelistmetamd"></a>

## Class: AudienceListMeta

#### constructor

• **new AudienceListMeta**(`name`, `type`, `description`, `options?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `type` | [`AudienceListType`](#enum-audiencelisttype) |
| `description` | `string` |
| `options?` | `Object` |
| `options.bundleId?` | `string` |
| `options.platform?` | [`PLATFORM`](#enum-platform) |

### Methods

#### toObject

▸ **toObject**(): `any`

##### Returns

`any`


<a name="classescjsinstancemd"></a>


## Class: CampaignBid

#### constructor

• **new CampaignBid**(`bid`, `country`, `applicationId?`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `bid` | `number` |
| `country` | `string` |
| `applicationId?` | `number` |




<a name="classescampaignbidlistmd"></a>

## Class: CampaignBidList

#### constructor

• **new CampaignBidList**(`campaignId`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `campaignId` | `number` |

### Methods

#### addBid

▸ **addBid**(`bid`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `bid` | [`CampaignBid`](#class-campaignbid) |

##### Returns

`void`

___

#### getObjectForDelete

▸ **getObjectForDelete**(): `any`

##### Returns

`any`

___

#### getObjectForUpdate

▸ **getObjectForUpdate**(): `any`

##### Returns

`any`


# Class: Creative

## Table of contents


### Methods

- [addAsset](#addasset)
- [isValidated](#isvalidated)


### constructor

• **new Creative**(`name`, `type`, `language`, `assets?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `type` | [`CreativeType`](#enumeration-creativetype) |
| `language` | `string` |
| `assets?` | [`CreativeAsset`](#class-creativeasset)[] |

## Accessors

### assets

• `get` **assets**(): [`CreativeAsset`](#class-creativeasset)[]

#### Returns

[`CreativeAsset`](#class-creativeasset)[]

___

### language

• `get` **language**(): `string`

#### Returns

`string`

___

### name

• `get` **name**(): `string`

#### Returns

`string`

___

### type

• `get` **type**(): [`CreativeType`](#enumeration-creativetype)

#### Returns

[`CreativeType`](#enumeration-creativetype)

## Methods

### addAsset

▸ **addAsset**(`asset`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `asset` | [`CreativeAsset`](#class-creativeasset) |

#### Returns

`void`


___

### isValidated

▸ **isValidated**(): `boolean`

#### Returns

`boolean`


## Class: CreativeAsset

### Table of contents

### Accessors

- id
- [usageType](#enumeration-usagetype)


### constructor

• **new CreativeAsset**(`id`, `usageType`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | Asset ID from the asset API |
| `usageType` | [`UsageType`](#enumeration-usagetype) | Usage Type of the asset: <br>For videoAndCarousel creative- video (mp4), left (image), middle (image), right (image).<br> For videoAndInteractiveEndCard creative- video (mp4), interactiveEndCard (html).<br> For videoAndFullScreen creative- video (mp4), phonePortrait (image), phoneLandscape (image), tabletPortrait (image) [optional], tabletLandscape (image) [optional]. |

## Accessors

### id

• `get` **id**(): `number`

#### Returns

`number`

___

### usageType

• `get` **usageType**(): [`UsageType`](#enumeration-usagetype)

#### Returns

[`UsageType`](#enumeration-usagetype)

# Enums
## Enum: AdUnits

[AppPromotionEnums](#modulesapppromotionenumsmd).AdUnits

### Enumeration Members

#### Banner

• **Banner** = ``"banner"``

___

#### Interstitial

• **Interstitial** = ``"interstitial"``

___

#### Offerwall

• **Offerwall** = ``"offerWall"``

___

#### RewardedVideo

• **RewardedVideo** = ``"rewardedVideo"``


<a name="enumsapppromotionenumsbreakdownsmd"></a>

## Enum: Breakdowns

[AppPromotionEnums](#modulesapppromotionenumsmd).Breakdowns

### Enumeration Members

#### AdUnit

• **AdUnit** = ``"adUnit"``

___

#### Application

• **Application** = ``"application"``

___

#### Campaign

• **Campaign** = ``"campaign"``

___

#### Country

• **Country** = ``"country"``

___

#### Creatives

• **Creatives** = ``"creative"``

___

#### Day

• **Day** = ``"day"``

___

#### DeviceType

• **DeviceType** = ``"deviceType"``

___

#### OS

• **OS** = ``"os"``

___

#### Title

• **Title** = ``"title"``


<a name="enumsapppromotionenumscreativetypemd"></a>

## Enum: CreativeType

[AppPromotionEnums](#modulesapppromotionenumsmd).CreativeType

### Enumeration Members

#### INTERACTIVE\_VIDEO

• **INTERACTIVE\_VIDEO** = ``"interactiveVideo"``

___

#### PLAYABLE

• **PLAYABLE** = ``"playable"``

___

#### VIDEO\_CAROUSEL

• **VIDEO\_CAROUSEL** = ``"videoAndCarousel"``

___

#### VIDEO\_FULLSCREEN

• **VIDEO\_FULLSCREEN** = ``"videoAndFullScreen"``

___

#### VIDEO\_INTERACTIVE\_ENDCARD

• **VIDEO\_INTERACTIVE\_ENDCARD** = ``"videoAndInteractiveEndCard"``


<a name="enumsapppromotionenumsmetricsmd"></a>

## Enum: Metrics

[AppPromotionEnums](#modulesapppromotionenumsmd).Metrics

### Enumeration Members

#### Clicks

• **Clicks** = ``"clicks"``

___

#### Completions

• **Completions** = ``"completions"``

___

#### Impressions

• **Impressions** = ``"impressions"``

___

#### Installs

• **Installs** = ``"installs"``

___

#### Spend

• **Spend** = ``"spend"``

___

#### StoreOpens

• **StoreOpens** = ``"storeOpens"``


<a name="enumsapppromotionenumsplatformmd"></a>

## Enum: PLATFORM

[AppPromotionEnums](#modulesapppromotionenumsmd).PLATFORM

### Enumeration Members

#### Android

• **Android** = ``"android"``

___

#### iOS

• **iOS** = ``"ios"``


<a name="enumsapppromotionenumsusagetypemd"></a>

## Enum: UsageType

[AppPromotionEnums](#modulesapppromotionenumsmd).UsageType

### Enumeration Members

#### INTERACTIVE\_ENDCARD

• **INTERACTIVE\_ENDCARD** = ``"interactiveEndCard"``

___

#### LEFT

• **LEFT** = ``"left"``

___

#### MIDDLE

• **MIDDLE** = ``"middle"``

___

#### PHONE\_LANDSCAPE

• **PHONE\_LANDSCAPE** = ``"phoneLandscape"``

___

#### PHONE\_PORTRAIT

• **PHONE\_PORTRAIT** = ``"phonePortrait"``

___

#### RIGHT

• **RIGHT** = ``"right"``

___

#### TABLET\_LANDSCAPE

• **TABLET\_LANDSCAPE** = ``"tabletLandscape"``

___

#### TABLET\_PORTRAIT

• **TABLET\_PORTRAIT** = ``"tabletPortrait"``

___

#### VIDEO

• **VIDEO** = ``"video"``


<a name="enumsaudiencelisttypemd"></a>

## Enum: AudienceListType

### Enumeration Members

#### Suppression

• **Suppression** = ``"suppression_static"``

___

#### Targeting

• **Targeting** = ``"targeting"``


<a name="enumsmonetizeenumsadunitstatusmd"></a>

