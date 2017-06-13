const google = require('googleapis')
const OAuth2 = google.auth.OAuth2
const oauth2Client = new OAuth2();

function connectGmail(email, refreshToken, accessToken, folder) {
  oauth2Client.credentials = {access_token: accessToken, refresh_token: refreshToken};

  const gmail = google.gmail({
    auth: oauth2Client,
    version: 'v1'
  });
  gmail.users.labels.list({
    userId: email
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
  })


}

module.exports = connectGmail
