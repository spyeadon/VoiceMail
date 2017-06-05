const xoauth2 = require('xoauth2')
const clientId = require('../google_strategy.json').web.client_id
const clientSecret = require('../google_strategy.json').web.client_secret

function getSASLToken(email, refreshToken, accessToken) {

  const xoauth2Gen = xoauth2.createXOAuth2Generator({
    user: email,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
    // accessToken: accessToken,
    // 'access_type': 'offline'
  });

  return xoauth2Gen.getToken((err, token) => {
    if (err) return console.error(err)
    console.log('formatted xoauth2 token is: ', token)
    return token
  })

}

module.exports = getSASLToken
