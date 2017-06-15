const db = require('APP/db')
const OAuth = db.model('oauths')
const router = require('express').Router()
const gmailBatchAPI = require('../gmail.batch.js')
const gmailAPI = require('../gmail.api.js')
let gmailInstance;

router.use((req, res, next) => {
  OAuth.findOne({where: {user_id: req.user.id}})
  .then(user => {
    const email = user.profileJson.emails[0].value
    // gmailInstance = new gmailAPI(email, user.accessToken, user.refreshToken, res)
    gmailInstance = new gmailBatchAPI(email, user.accessToken, user.refreshToken, res)
    next()
  })
  .catch(next)
})

router.get('/labels', (req, res, next) => {
  gmailInstance.getLabels()
})

router.post('/messages', (req, res, next) => {
  const options = req.body
  options.maxResults = 10
  gmailInstance.getMessages(options)
})

module.exports = router
