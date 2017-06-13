const google = require('googleapis')
const OAuth2 = google.auth.OAuth2

class gmailAPI {
  constructor(email, accessToken, refreshToken, res){
    this.email = email
    this.Oauth2Inst = new OAuth2()
    this.Oauth2Inst.credentials = {
      access_token: accessToken,
      refresh_token: refreshToken
    }
    this.gmail = google.gmail({
      auth: this.Oauth2Inst,
      version: 'v1'
    })
    this.res = res
  }

  getLabels() {
    this.gmail.users.labels.list({
      userId: this.email
    }, (err, response) => {
      if (err) return console.log('The API returned an error: ' + err);
      const labelsToRemove = ['CATEGORY_PERSONAL', 'CATEGORY_SOCIAL', 'CATEGORY_FORUMS', 'CATEGORY_PROMOTIONS', 'CATEGORY_UPDATES']
      const labels = response.labels.filter(label => labelsToRemove.indexOf(label.name) === -1).map(label => label.name)
      this.res.json(labels)
    })
  }

}

module.exports = gmailAPI
