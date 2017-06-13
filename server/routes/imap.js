const db = require('APP/db')
const User = db.model('users')
const OAuth = db.model('oauths')
const router = require('express').Router()
const connectGmail = require('../gmail.api.js')

router.get('/:folder', (req, res, next) => {
  OAuth.findOne({where: {user_id: req.user.id}})
  .then(user => {
    const email = user.profileJson.emails[0].value
    connectGmail(email, user.refreshToken, user.accessToken, req.params.folder)
  })
  .catch(next)
})

module.exports = router
