
import { error, timeStamp } from 'console';


const authUrl = new URL('https://accounts.spotify.com/authorize');


export const clientId = 'b7fbf387ec2346fe810dea140d435788';
export const redirectUri = 'http://localhost:5173/';
export const scope = ['user-read-private', 'user-read-email','user-read-playback-state','user-modify-playback-state'];




/**
   * In this function, a new URLSearchParams object is created, and we add the client_id, response_type, redirect_uri and scope parameters to it
   * The @scope parameter is a list of permissions that we're requesting from the user.
   * {user-read-private} and {user-read-email scopes} - these are the scopes that allow us to fetch the user's profile data.
   * The redirect_uri parameter is the URL that Spotify will redirect the user back to after they've authorized the application. In this case, we're using a URL that points to our local Vite  dev server (http://localhost:5173/).
   */

export async function redirectToAuthCodeFlow(clientId: string) {
    const verifierCode = generateRandomString(64);
    //code challenge generation
    const hashed = await sha256(verifierCode);
    const codeChallenge = base64encode(hashed);

    localStorage.setItem('verifier', verifierCode);

    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    };
    authUrl.search = new URLSearchParams(params).toString(); // the code is found in the url 
    // Store the code verifier locally
    window.location.href = authUrl.toString();
};

// serves als code verifier as random code 
const generateRandomString = (length: number): string => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(length)); // return the crypto object associated to the global obj
    return Array.from(randomValues)
        .map((x) => possible[x % possible.length])
        .join('');
};

/**
* Encodes an ArrayBuffer into a base64 string.
* 
* @param {ArrayBuffer} input - The ArrayBuffer to encode.
* @returns {string} The base64-encoded string.
*/
export const base64encode = (input: ArrayBuffer): string => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

const sha256 = async (plain: string): Promise<ArrayBuffer> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return await crypto.subtle.digest('SHA-256', data);
};

// TODO: Get access token for code
/**
 * On success, the response will have a 200 OK status and the following JSON data in the response body:
 * @param clientId 
 * @param code 
 * @access_token : An access token that can be provided in subsequent calls, for example to Spotify Web API services.
 * @token_type : How the access token may be used: always "Bearer".
 * @scope       : A space-separated list of scopes which have been granted for this access_token
 * @expires_in  : The time period (in seconds) for which the access token is valid.
 * @refresh_token  
 * @returns     :! A refresh token is a security credential that allows client applications to obtain new access tokens without requiring users to reauthorize the application.
 */

async function getAccessToken(clientId: string, code: string): Promise<any> {

    console.log(" func to fetch new token was called  ")
    const verifierCode = localStorage.getItem("verifier") // get the verifier code 
    let tokenTimestamp = Date.now().toString();

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifierCode!);


    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });
    if (!result.ok) {
        const errormessage = await result.text();
        console.log(errormessage)

        // cannot fetch token so redirect 
        redirectToAuthCodeFlow(clientId) 
    }

    const { access_token, token_type, scope, expires_in, refresh_token } = await result.json();
    // save access token in local 
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('tokenType', token_type);
    localStorage.setItem('scope', scope);
    localStorage.setItem('expiresIn', expires_in);
    localStorage.setItem('refreshToken', refresh_token);
    localStorage.setItem('tokenTimestamp', tokenTimestamp);




    return access_token
}

// refresh token that has been previously stored
async function getRefreshToken(clientId: string,code:string): Promise<any> {
    console.log(" func to refresh token was called  ")
    const refreshToken = localStorage.getItem('refreshToken');
    const url = "https://accounts.spotify.com/api/token";

    let tokenTimestamp = Date.now().toString();

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken!);
    params.append("client_id", clientId);

    const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });
    if (!result.ok) {
        console.log(" there was a proble refreshing token so fetched new one ")
        // in calse of problem refreshing th token just fetch new one 
        return await getAccessToken(clientId,code)
    }

    const { access_token, token_type, scope, expires_in, refresh_token } = await result.json();
    // local 
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('tokenType', token_type);
    localStorage.setItem('scope', scope);
    localStorage.setItem('expiresIn', expires_in);
    localStorage.setItem('refreshToken', refresh_token);
    localStorage.setItem('tokenTimestamp', tokenTimestamp);

    return access_token

}
//'''''''''''''''''''''''''''''''''''''''''''' Please use this function for token '''''''''''''''''''''''''''''''''''''''''''''''''''
/**
 * Retrieves a local access token, either by refreshing an existing token or obtaining a new one.
 * @param clientId The client ID for Spotify API authentication.
 * @param code The authorization code for obtaining the access token.
 * @returns A promise that resolves to the access token string.
 */
export async function getLocalToken(clientId: string, code: string): Promise<any> {

    let tokenTimestamp = localStorage.getItem('tokenTimestamp');


    console.log("checkTimeStamp " + isTokenExpired(tokenTimestamp!))

    if (tokenTimestamp === null || isTokenExpired(tokenTimestamp)) {

        return await getAccessToken(clientId, code)
    } else {
        return await getRefreshToken(clientId,code)
    }


}

// check if tokem is expired 
const isTokenExpired = (tokenTimestamp: string) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const tokenExpiryTime = parseInt(tokenTimestamp) + 3600; // Token expiry time in seconds (1 hour)
    return currentTime >= tokenExpiryTime;
};




export function populateUI(profile: any) {
    // TODO: Update UI with profile data
}

