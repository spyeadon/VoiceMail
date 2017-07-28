const {correctCase, filterLabels, decodeAndFmtThreadsMap, decodeAndFmtThreadsReduce, defaultLabels} = require('./utils.js')
var googleBatch = require('google-batch');
var google = googleBatch.require('googleapis');

class gmailBatchAPI {
  constructor(email, accessToken, refreshToken, res, next){
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
    this.next = next
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

  getThreads(opts, token) {
    var getOptions = {userId: this.email, googleBatch: true}
    var listOptions = Object.assign({userId: this.email, googleBatch: true}, opts)
    const formattedThreadList = {threads: {}}
    if (listOptions.labelIds) formattedThreadList.labelId = listOptions.labelIds
    if (listOptions.labelIds && defaultLabels.indexOf(listOptions.labelIds.toUpperCase()) !== -1) listOptions.labelIds = listOptions.labelIds.toUpperCase()
    this.batch.add(this.gmail.users.threads.list(listOptions))
    this.batch.exec((err, responses, errorDetails) => {
      if (err) {
        console.log('The batch API returned an error: ' + errorDetails.toString())
        this.next(err)
        return
      }
      if (token) formattedThreadList.nextPageToken = responses[0].body.nextPageToken
      this.batch.clear()
      if (responses[0].body.threads) {
        responses[0].body.threads.forEach(thread => {
          getOptions.id = thread.id
          this.batch.add(this.gmail.users.threads.get(getOptions))
        })
        this.batch.exec((error, resps, errorDeets) => {
          if (error) {
            console.log('The batch API returned an error: ' + errorDeets.toString())
            this.next(error)
            return
          }
          console.log('batch for all threads now executing')
          formattedThreadList.threads = decodeAndFmtThreadsReduce(resps, googleBatch)
          for (var threadID in formattedThreadList.threads) {
            formattedThreadList.threads[threadID].date = formattedThreadList.threads[threadID].messages[0].headers['Date']
          }
          this.res.json(formattedThreadList)
        })
      }
      else {
        this.res.json(formattedThreadList)
      }
      this.batch.clear()
    })
  }

}

module.exports = gmailBatchAPI
