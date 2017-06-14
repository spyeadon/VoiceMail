const google = require('googleapis')
const OAuth2 = google.auth.OAuth2
const {filterLabels} = require('./utils.js')

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
    this.messages = []
  }

  getLabels() {
    this.gmail.users.labels.list({
      userId: this.email
    }, (err, response) => {
      if (err) return console.log('The API returned an error: ' + err);
      const labels = filterLabels(response.labels)
      this.res.json(labels)
    })
  }

  getMessages(options) {
    options.userId = this.email
    this.gmail.users.messages.list(options, (err, response) => {
      if (err) return console.log('The API returned an error: ' + err);
      console.log(response.messages)
    })
  }

}

module.exports = gmailAPI
