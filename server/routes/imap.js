const db = require('APP/db')
const User = db.model('users')
const OAuth = db.model('oauths')
const router = require('express').Router()
const getMessagesViaImap = require('../imap.utils.js')
const getSASLToken = require('../xoauth2.js')

router.get('/:folder', (req, res, next) => {
  OAuth.findOne({where: {user_id: req.user.id}})
  .then(user => {
    const email = 'spyeadon@gmail.com'
    // const token = new Buffer('user='+email+'^Aauth=Bearer '+user.accessToken+'^A^A').toString('base64')
    // console.log('token is: ', token)

    return getSASLToken(email, user.accessToken)
    // getMessagesViaImap(req.params.folder, user.accessToken)
  })
  .then(token => {
    console.log('token after .then', token)
    getMessagesViaImap(req.params.folder, token)
  })
  .catch(next)
})

module.exports = router
