const {filterLabels, decodeAndFmtThreads} = require('./utils.js')
var googleBatch = require('google-batch');
var google = googleBatch.require('googleapis');


class gmailBatchAPI {
  constructor(email, accessToken, refreshToken, res){
    this.email = email
    this.Oauth2Inst = new google.auth.OAuth2
    this.Oauth2Inst.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    })
    this.batch = new googleBatch()
    this.batch.setAuth(this.Oauth2Inst)
    this.gmail = google.gmail({version: 'v1'})
    this.res = res
  }

  getLabels() {
    var options = {userId: this.email, googleBatch: true}
    this.batch.add(this.gmail.users.labels.list(options))
    this.batch.exec((err, responses, errorDetails) => {
      if (err) return console.log('The API returned an error: ' + err);
      const labels = filterLabels(responses[0].body.labels)
      this.batch.clear()
      this.res.json(labels)
    })
  }

  getMessages(opts) {
    var getOptions = {userId: this.email, googleBatch: true}
    var listOptions = Object.assign({userId: this.email, googleBatch: true}, opts)

    this.batch.add(this.gmail.users.messages.list(listOptions))
    this.batch.exec((err, responses, errorDetails) => {
      if (err) return console.log('The batch API returned an error: ' + err)
      this.batch.clear()
      responses[0].body.messages.forEach(message => {
        getOptions.id = message.id
        this.batch.add(this.gmail.users.messages.get(getOptions))
      })
      this.batch.exec((err2, resps, errorDeets) => {
        if (err2) return console.log('The batch API returned an error: ' + err2)
        this.res.json(resps)
      })
      this.batch.clear()
    })
  }

  getThreads(opts) {
    var getOptions = {userId: this.email, googleBatch: true}
    var listOptions = Object.assign({userId: this.email, googleBatch: true}, opts)
    const formattedThreadList = {labelId: listOptions.labelIds};

    this.batch.add(this.gmail.users.threads.list(listOptions))
    this.batch.exec((err, responses, errorDetails) => {
      if (err) return console.log('The batch API returned an error: ' + err)
      console.log('thread LIST responses: ', responses[0].body)
      formattedThreadList.nextPageToken = responses[0].body.nextPageToken
      this.batch.clear()
      responses[0].body.threads.forEach(thread => {
        getOptions.id = thread.id
        this.batch.add(this.gmail.users.threads.get(getOptions))
      })
      this.batch.exec((error, resps, errorDeets) => {
        if (error) return console.log('The batch API returned an error: ' + error)
        formattedThreadList.threads = decodeAndFmtThreads(resps, googleBatch)
        this.res.json(formattedThreadList)
      })
      this.batch.clear()
    })
  }

}

module.exports = gmailBatchAPI
