const qs = require('querystring');
const util = require('util');
const request = require('request');

const get = util.promisify(request.get);
const post = util.promisify(request.post);

const requestTokenURL = new URL('https://api.twitter.com/oauth/request_token');
const accessTokenURL = new URL('https://api.twitter.com/oauth/access_token');
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const endpointURL = new URL('https://api.twitter.com/1.1/account/verify_credentials.json');

const consumer_key = process.env.TWITTER_CONSUMER_API_KEY
const consumer_secret = process.env.TWITTER_CONSUMER_API_SECRET_KEY

const params = {
  include_email: 'true',
};

exports.getProfileInfo = async ( oauth_token, oauth_token_secret ) => {
  const oAuthConfig = {
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    token: oauth_token,
    token_secret: oauth_token_secret,
  };

  const req = await get({url: endpointURL, oauth: oAuthConfig, qs: params, json: true});
  if (req.body) {
    return req.body
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
};

exports.getOAuthRequestToken = async () => {
  const oAuthConfig = {
    callback: 'https://localhost:5000/api/auth/twitter/callback',
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
  };

  const req = await post({url: requestTokenURL, oauth: oAuthConfig});
  if (req.body) {
    const response = qs.parse(req.body);
    authorizeURL.searchParams.append('oauth_token', response.oauth_token);
    return {oauth_token: response.oauth_token, oauth_token_secret: response.oauth_token_secret, url: authorizeURL.href};
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}

exports.getOAuthAccessTokenWith = async ( oauth_req_token, oauth_req_sec_token, oauthVerifier ) => {
  const oAuthConfig = {
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    token: oauth_req_token,
    token_secret: oauth_req_sec_token,
    verifier: oauthVerifier,
  }; 
  
  const req = await post({url: accessTokenURL, oauth: oAuthConfig});
  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}
