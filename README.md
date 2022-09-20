
<a name="readmemd"></a>
![Test And Lint](https://github.com/ironSource/mobile-api-lib-js/actions/workflows/main.yml/badge.svg)
# IronSourceAPI

## Installation

This module is installed via npm:

```
npm install --save @ironsrc/mobile-api
```

## Simple Example:
```js
const {IronSource,AppPromotionAPI,MonetizeEnums,AppPromotionEnums} = require('@ironsrc/mobile-api');
const fs = require('fs');


var ironsource = new IronSource();
ironsource.setCredentials('my_user_name','my_secret_key','my_refresh_token');


//Get Monetization Data
let res = await ironsource.MonetizeAPI().getMonetizationData('2019-11-07','2019-11-20',{adUnit:MonetizeEnums.AdUnits.RewardedVideo,metrics:[MonetizeEnums.Metrics.impressions,MonetizeEnums.Metrics.revenue],breakdowns:[MonetizeEnums.Breakdowns.Date]});
console.log(res.toString());

//Get Advertiser Statistics
let result = await ironsource.PromoteAPI().getAdvertiserStatistics('2019-11-11','2019-12-11',
[AppPromotionEnums.Metrics.Impressions],{format:'csv',breakdowns:[AppPromotionEnums.Breakdowns.Day,
AppPromotionEnums.Breakdowns.Campaign,AppPromotionEnums.Breakdowns.Country,AppPromotionEnums.Breakdowns.Title]});

result.pipe(fs.createWriteStream('./adv.csv'));


```

#IronSource
####  Authentication
Before starting to use the API make sure to get the credentials from ironSource dashboard.
![Account Cred](https://developers.ironsrc.com/wp-content/uploads/2019/01/1-1.png)

And set the Access Key, Secret Key and Refresh Token: 
```js
{IronSource} = require('@ironsrc/mobile-api');

var ironsource = new IronSource();
ironsource.setCredentials('my_user_name','my_secret_key','my_refresh_token');
```

## Modules

* [User Acquisition API](/docs/PromoteAPI.md)
* [Monetization API](/docs/MonetizeAPI.md)


## Contributing:
Please follow contribution [guide](/CONTRIBUTING.md)

## Dependencies:
* [async](https://github.com/caolan/async)
* [axios](https://github.com/axios/axios)
* [form-data](https://github.com/form-data/form-data)
* [lodash](https://github.com/lodash/lodash)
* [node-gzip](https://github.com/Rebsos/node-gzip)
* [zlib](https://github.com/kkaefer/node-zlib)