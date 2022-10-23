const googleOAuth = require('../utils/googleOAuth');
const facebookOAuth = require('../utils/facebookOAuth');
const twitterOAuth = require('../utils/twitterOAuth');

var oauth_req_token;
var oauth_req_sec_token;

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
    const data = await twitterOAuth.getOAuthRequestToken();

    oauth_req_token = data.oauth_token;
    oauth_req_sec_token = data.oauth_token_secret;

    res.send({ url: data.url });

  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
}

exports.tlogin = async (req, res) => {
  const { oauth_verifier: oauthVerifier } = req.query;

  const data = await twitterOAuth.getOAuthAccessTokenWith( oauth_req_token, oauth_req_sec_token, oauthVerifier );

  const profile = await twitterOAuth.getProfileInfo(data.oauth_token, data.oauth_token_secret);

  const user = {
    twitterId: profile.id,
    name: profile.name,
    email: profile.email,
    profilePic: profile.profile_image_url,
  };

  console.log(user);
  
  res.redirect('https://localhost:5000')
}