// authUtils.ts

/**
 * Generates a random string of the specified length.
 * 
 * @param {number} length - The length of the random string to generate.
 * @returns {string} A random string of the specified length.
 */

export const generateRandomString = (length: number): string => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(randomValues)
      .map((x) => possible[x % possible.length])
      .join('');
  };
 
  export const sha256 = async (plain: string): Promise<ArrayBuffer> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return await crypto.subtle.digest('SHA-256', data);
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
  // Generate a random code verifier and its hashed and base64-encoded form

  
  export const codeVerifier = generateRandomString(64);
  
  export const hashed = await sha256(codeVerifier);
  export const codeChallenge = base64encode(hashed);
  
  /**
 * Generates the code verifier, its SHA-256 hash, and the code challenge.
 * 
 * @param {number} length - The length of the code verifier to generate.
 * @returns {Promise<{ codeVerifier: string, codeChallenge: string }>} A promise resolving to an object containing the code verifier and code challenge.
 */
export const generateCodeChallenge = async (length: number): Promise<{ codeVerifier: string, codeChallenge: string }> => {
    const codeVerifier = generateRandomString(length);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    return { codeVerifier, codeChallenge };
};