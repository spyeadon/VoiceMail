const xoauth2 = require('xoauth2')
const clientId = require('../google_strategy.json').web.client_id
const clientSecret = require('../google_strategy.json').web.client_secret
const google = require('googleapis')

function connectGmail(email, refreshToken, accessToken, folder) {

  const xoauth2Gen = xoauth2.createXOAuth2Generator({
    user: email,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
    accessToken: accessToken,
  })

  xoauth2Gen.getToken((tokenErr, b64Token, accessTok) => {
    if (tokenErr) return console.error(tokenErr)
    console.log('formatted b64 SASL/xoauth2 token is: ', b64Token)
    console.log('access token is: ', accessTok)

    const gmail = google.gmail('v1');
    gmail.users.labels.list({
      auth: accessTok,
      userId: 'spyeadon@gmail.com',
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      console.log('connection to gmail account has been made')
      var labels = response.labels;
      if (labels.length === 0) console.log('No labels found.');
      else {
        console.log('Labels:');
        for (var i = 0; i < labels.length; i++) {
          console.log('- %s', labels[i].name);
        }
      }
    });

  })

}

module.exports = connectGmail
