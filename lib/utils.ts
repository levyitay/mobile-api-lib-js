/* eslint-disable no-await-in-loop */
import { ReadStream, existsSync, createReadStream } from 'fs';
import { basename } from 'path';
import * as URL from 'url';
import { Transform } from 'stream';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { whilst } from 'async';
import { ParsedUrlQuery } from 'querystring';

import * as libPackage from '../package.json';

/**
 * @hidden
 * @ignore
 */
const BARRIER_AUTH_URL = 'https://platform.ironsrc.com/partners/publisher/auth';
/**
 * @hidden
 * @ignore
 */
export interface ResponseObject {
    msg: string,
    errorCode: number
}
/**
 * @hidden
 * @ignore
 */
export async function asyncForEachKey(object: Array<any>, callback: (key: any, object: any) => any): Promise<void> {
    for (const key in object) {
        await callback(key, object[key]);
    }
}

/**
 * @hidden
 * @ignore
 */
export async function asyncForEachMap(map: Map<any, any>, callback: (key: any, value: any) => any): Promise<void> {
    return new Promise((resolve) => {
        map.forEach((value: any, key: string) => {
            callback(key, value);
        });
        resolve();
    });
}
/**
 * @hidden
 * @ignore
 */
export async function executeRequest(options: AxiosRequestConfig): Promise<ResponseObject> {

    if (process.env.DEBUG == 'true' &&
        (options.headers && !options.headers.secretKey && !options.headers.refreshToken)) {
        console.log(JSON.stringify(options));
    }
    const resObj: ResponseObject = { msg: '', errorCode: -1 };
    try {
        if (!options.headers) {
            options.headers = {};
        }
        options.headers['user-agent'] = `axios/${axios.VERSION} IronSource - JS API Library ${libPackage.version}`;

        const res = await axios(options);
        resObj.msg = res.data;

    } catch (ex: any) {
        if (process.env.DEBUG == 'true') {
            console.error(`Error executing request ${JSON.stringify(ex.response?.data || ex.message)} 
            status code: ${ex.response?.status} `);
        }
        if (ex.response?.data) {
            resObj.msg = (typeof ex.response.data == 'object') ? JSON.stringify(ex.response.data) : ex.response.data;
            resObj.errorCode = ex.response.status;
        } else {
            resObj.msg = ex.message;
            resObj.errorCode = 500;

        }
    }
    return resObj;

}
/**
 * @hidden
 * @ignore
 */
export async function asyncForEach(array: any[],
    callback: (object: any, index: number, array: any[]) => any): Promise<void> {
    await Promise.all(array.map(callback));
}

export async function asyncFind(array: any[],
    callback: (object: any, index: number, array: any[]) => Promise<boolean>): Promise<any | undefined> {
    for (let index = 0; index < array.length; index++) {
        const res = await callback(array[index], index, array);
        if (res == true) {
            return array[index];
        }
    }
    return undefined;
}

/**
 * @hidden
 * @ignore
 */
export async function getBearerAuth(secret: string, refreshToken: string): Promise<string> {
    const options: AxiosRequestConfig = {
        url: BARRIER_AUTH_URL,
        headers: {
            'secretkey': secret,
            'refreshToken': refreshToken
        },
        method: 'GET'
    };

    const res = await executeRequest(options);
    if (res.errorCode !== -1) {
        throw new Error(`Error getting token ${res.msg} `);
    }
    const token: string = res.msg;
    return token;
}

/**
 * @hidden
 * @ignore
 */

export function getBasicAuth(username: string, secret: string): string {
    return (Buffer.from(`${username}:${secret}`).toString('base64'));
}
/**
 * @hidden
 * @ignore
 */
export function executeRequestWithPaging(options: AxiosRequestConfig, inoutStream: Transform,
    dataObjKey: string, errMsg: string): void {
    let nextPage: any = '';

    if (!options.headers) {
        options.headers = {};
    }
    options.headers['user-agent'] = `axios/${axios.VERSION} IronSource - JS API Library ${libPackage.version}`;

    if (process.env.DEBUG == 'true') {
        console.log(JSON.stringify(options));
    }
    whilst<any, []>(
        (cb: (err: any, truth: boolean) => void): void => {
            cb(null, nextPage !== undefined);
        },
        async (cb: (err: null, res: []) => void) => {
            if (nextPage !== undefined && nextPage != '') {
                if (process.env.DEBUG == 'true') {
                    console.log('next is ', nextPage);
                }
                const uri: URL.UrlWithParsedQuery = URL.parse(nextPage, true);
                const queryParams: ParsedUrlQuery = uri.query;

                options.params = queryParams;
                if (uri.search !== null) {
                    options.url = uri.href.replace(uri.search, '');
                }
            }
            axios(options).then((res: AxiosResponse) => {
                const body = res.data;
                if (options.params.format == 'json' || options.params.format == undefined) {
                    if (body !== undefined && body[dataObjKey] !== undefined) {
                        inoutStream.write(JSON.stringify(body[dataObjKey]));
                    }
                    if (body.paging !== undefined && body.paging.next !== undefined) {
                        nextPage = body.paging.next;
                    } else {
                        nextPage = undefined;
                    }
                } else {
                    if (res.status == 204) {
                        nextPage = undefined;
                        cb(null, []);
                        return;
                    }
                    if (body !== undefined) {
                        inoutStream.write(body);
                    }
                    if (res.headers.link == undefined) {
                        nextPage = undefined;
                    } else {
                        nextPage = res.headers.link.replace('<', '').replace('>; rel="next"', '');
                    }

                }
                cb(null, []);

            }).catch((err: any) => {
                if (err.isAxiosError) {
                    throw new Error(`${errMsg} ${err.response.data} `);
                    return;
                }
                if (err !== null) {
                    throw new Error(`${errMsg} ${err} `);
                }
            });
        }, (err: any) => {
            if (err !== null) {
                throw new Error(`Error getting advertiser statistics ${err} `);
            }
            inoutStream.end();
        });
}


export function getFileContent(filePath: string): ReadStream {
    const exists = existsSync(filePath);
    if (!exists) {
        throw new Error(`file ${filePath} does not exists.`);
    }
    return createReadStream(filePath);

}

export function getFileName(filePath: string) {
    return basename(filePath);
}

