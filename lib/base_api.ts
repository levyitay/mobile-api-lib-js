import * as utils from './utils';
import * as fs from 'fs';
import { Method } from 'axios';




export class BaseAPI {


    protected GET: Method = 'GET';
    protected POST: Method = 'POST';
    protected DELETE: Method = 'DELETE';
    protected PUT: Method = 'PUT';
    protected Bearer = 'Bearer ';

    private _username = '';
    private _secret = '';
    private _refreshToken = '';
    private _authToken = '';
    private _tokenExpiration = -1;

    /**
     * setCredentials
     * @param {string} username  - username for generating authentication
     * @param {string} secret - secret key from the platform
     * @param {string}  token - Refresh Token taken from the platform.
     * 
     */
    public setCredentials(username: string, secret: string, token: string): void {
        if (this._username != username || this._secret != secret || this._refreshToken != token) {
            this._authToken = '';
            this._tokenExpiration = -1;
        }
        this._username = username;
        this._secret = secret;
        this._refreshToken = token;
    }

    /**
        * setCredentials
        * @param {string} filePath - reading credentials from file path. 
        * file content should be in JSON format and with the below keys:
        * {username:"",secret:"",token:""}
        */
    public setCredentialsFromFile(filePath: string): void {
        const cred = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
        this.setCredentials(cred.username, cred.secret, cred.token);
    }

    protected async getBearerToken(): Promise<string> {
        if (this._authToken && Math.floor(Date.now() / 1000) < this._tokenExpiration) {
            return this._authToken;
        }
        const authToken = await utils.getBearerAuth(this._secret, this._refreshToken);
        const base64Str = authToken.split('.')[1];
        const tokenInfoStr = Buffer.from(base64Str, 'base64').toString();
        this._tokenExpiration = JSON.parse(tokenInfoStr).exp;
        this._authToken = authToken;

        return authToken;
    }

    protected getBasicAuthToken(): string {
        return utils.getBasicAuth(this._username, this._secret);
    }

}