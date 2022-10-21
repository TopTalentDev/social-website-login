const googleOAuth = require('../utils/googleOAuth');
const facebookOAuth = require('../utils/facebookOAuth');

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