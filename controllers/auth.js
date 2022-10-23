const googleOAuth = require('../utils/googleOAuth');
const facebookOAuth = require('../utils/facebookOAuth');
const twitterOAuth = require('../utils/twitterOAuth');

exports.glogin = async (req, res) => {
  try {
    const code = req.body.code;
    const profile = await googleOAuth.getProfileInfo(code);
  
    const user = {
      googleId: profile.sub,
      name: profile.name,
      firstName: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
      profilePic: profile.picture,
    };

    res.send({ user });
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
};

exports.flogin = async (req, res) => {
  try {
    const code = req.body.code;
    const profile = await facebookOAuth.getProfileInfo(code);

    const user = {
      facebookId: profile.id,
      firstName: profile.first_name,
      lastName: profile.last_name,
      email: profile.email,
      profilePic: profile.picture.data.url,
      link: profile.link,
      gender: profile.gender,
      locale: profile.locale
    };

    res.send({ user });
  } catch (e) {
    console.log(e)
    res.status(401).send();
  }
};

exports.getTwitterLoginUrl = async (req, res) => {
  try{
    const { oauthRequestToken } = await twitterOAuth.getOAuthRequestToken()

    const authorizationUrl = `https://api.twitter.com/oauth/authorize?oauth_token=${oauthRequestToken}`
    console.log('redirecting user to ', authorizationUrl)

    res.send({ url: authorizationUrl });

  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
}