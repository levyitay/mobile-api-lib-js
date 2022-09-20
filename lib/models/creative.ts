import _ = require('lodash');
import { AppPromotionEnums } from '../app_promotion_api';

const CreativeTypeMapping: any = {
    'videoAndCarousel': [
        AppPromotionEnums.UsageType.LEFT,
        AppPromotionEnums.UsageType.RIGHT,
        AppPromotionEnums.UsageType.MIDDLE,
        AppPromotionEnums.UsageType.VIDEO],
    'videoAndFullScreen': [
        AppPromotionEnums.UsageType.VIDEO,
        AppPromotionEnums.UsageType.PHONE_LANDSCAPE,
        AppPromotionEnums.UsageType.PHONE_PORTRAIT,
        AppPromotionEnums.UsageType.TABLET_LANDSCAPE,
        AppPromotionEnums.UsageType.TABLET_LANDSCAPE],

    'videoAndInteractiveEndCard': [
        AppPromotionEnums.UsageType.VIDEO,
        AppPromotionEnums.UsageType.INTERACTIVE_ENDCARD]
};
export class Creative {
    private _name: string;
    private _type: AppPromotionEnums.CreativeType;
    private _language: string;
    private _assets: CreativeAsset[] = [];
    constructor(name: string, type: AppPromotionEnums.CreativeType, language: string, assets?: CreativeAsset[]) {

        if (!name) {
            throw Error('Name is mandatory for Creative');
        }
        if (!type) {
            throw Error('Creative type is mandatory for Creative');
        }
        if ([
            AppPromotionEnums.CreativeType.PLAYABLE,
            AppPromotionEnums.CreativeType.INTERACTIVE_VIDEO].indexOf(type) >= 0) {
            throw Error('Playable and Interactive Video type are not supported currently');
        }
        if (!language) {
            throw Error('Language is mandatory for Creative');
        }

        this._name = name;
        this._type = type;
        this._language = language;

        if (assets && !_.isEmpty(assets)) {
            for (const asset of assets) {
                if (!this.checkAssetCompatible(asset)) {
                    throw Error(`Asset Id ${asset.id} with usage type ${asset.usageType} 
                    is not compatible with Creative type ${this._type}`);
                }
            }
            this._assets = assets;
        }


    }

    public get name(): string {
        return this._name;
    }

    public get type(): AppPromotionEnums.CreativeType {
        return this._type;
    }

    public get language(): string {
        return this._language;
    }

    public get assets(): CreativeAsset[] {
        if (this._assets == undefined) {
            return [];
        }
        return this._assets;
    }

    public addAsset(asset: CreativeAsset) {
        if (!this.checkAssetCompatible(asset)) {
            throw Error(`Asset Id ${asset.id} with usage type ${asset.usageType} 
            is not compatible with Creative type ${this._type}`);
        }
        this._assets.push(asset);
    }

    private checkAssetCompatible(asset: CreativeAsset): boolean {
        if (CreativeTypeMapping[this._type].indexOf(asset.usageType) >= 0) {
            return true;
        }
        return false;
    }

    public isValidated(): boolean {
        if (_.xor(CreativeTypeMapping[this._type],
            _.map(this._assets, (assetObj: CreativeAsset) => { return assetObj.usageType; })).length == 0) {
            return true;
        }
        return false;
    }

    public getObject(): any {
        const obj: any = {
            name: this._name,
            language: this._language,
            type: this._type,
            assets: []
        };

        for (const asset of this._assets) {
            obj.assets.push({
                id: asset.id,
                usageType: asset.usageType
            });
        }
        return obj;
    }

}

export class CreativeAsset {
    private _id: number;
    private _usageType: AppPromotionEnums.UsageType;

    /**
     * 
     * @param id Asset ID from the asset API
     * @param usageType Usage Type of the asset:
     * For videoAndCarousel creative- video (mp4), left (image), middle (image), right (image).
     * For videoAndInteractiveEndCard creative- video (mp4), interactiveEndCard (html).
     * For videoAndFullScreen creative- video (mp4), phonePortrait (image), phoneLandscape (image), 
     *                                  tabletPortrait (image) [optional], tabletLandscape (image) [optional].
     */
    constructor(id: number, usageType: AppPromotionEnums.UsageType) {
        if (!id) {
            throw Error('Id is mandatory for Asset');
        }
        if (!usageType) {
            throw Error('Usage Type is mandatory for Asset');
        }
        this._id = id;
        this._usageType = usageType;
    }

    get id(): number {
        return this._id;
    }

    get usageType(): AppPromotionEnums.UsageType {
        return this._usageType;
    }
}
