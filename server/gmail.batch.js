const {filterLabels} = require('./utils.js')

var googleBatch = require('google-batch');
var google = googleBatch.require('googleapis');


class gmailBatchAPI {
  constructor(email, accessToken, refreshToken, res){
    this.email = email
    this.Oauth2Inst = new google.auth.OAuth2()
    this.Oauth2Inst.setCredentials({access_token: accessToken})
    this.batch = new googleBatch()
    this.batch.setAuth(this.Oauth2Inst)
    google.options = {oauth: this.Oauth2Inst}
    this.gmail = google.gmail({version: 'v1'})
    this.res = res
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

  getMessage(messageID) {
    return this.gmail.users.messages.get({
      userId: this.email,
      id: messageID
    })
  }

  getMessages(options) {
    options.userId = this.email
    options.googleBatch = true
    this.gmail.users.messages.list(options, (err, response) => {
      if (err) return console.log('The batch API returned an error: ' + err);
      response.messages.forEach(message => {
        this.batch.add(this.getMessage(message.id))
      })
      this.batch.exec((error, resp, errorDetails) => {
        if (error) return console.log('batch execution error is: ', errorDetails)
        console.log('response from message batch is: ', resp)
        this.res.json(resp)
        this.batch.clear()
      })
    })
  }

}

module.exports = gmailBatchAPI
