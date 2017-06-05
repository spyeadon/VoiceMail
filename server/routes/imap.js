const db = require('APP/db')
const User = db.model('users')
const OAuth = db.model('oauths')
const router = require('express').Router()
const getMessagesViaImap = require('../imap.utils.js')
const getSASLToken = require('../xoauth2.js')

router.get('/:folder', (req, res, next) => {
  OAuth.findOne({where: {user_id: req.user.id}})
  .then(user => {
    const email = user.profileJson.emails[0].value
    return getSASLToken(email, user.refreshToken, user.accessToken)
  })
  .then(token => {
    console.log('token right before imap connect function: ', token)
    getMessagesViaImap(req.params.folder, token)
  })
  .catch(next)
})

module.exports = router
