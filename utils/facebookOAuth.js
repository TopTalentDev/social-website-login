const nodeFbLogin = require('node-fb-login');

exports.getProfileInfo = async (code) => {
  
    const result = await nodeFbLogin.getUserProfile({
      accessToken: code,
      fields: ["id","first_name","last_name","link","email","picture", "gender", "locale"]
    })

    return result;
};