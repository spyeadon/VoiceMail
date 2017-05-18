'use strict'

const db = require('APP/db')
const Message = db.model('message')
const User = db.model('users')

module.exports = require('express').Router()
  .post('/:userId',
    (req, res, next) =>
        Message.create(req.body)
        .then(message => res.status(201).json(message))
        .catch(next))
  .put('/:messageId', (req, res, next) =>
    Message.findOne({where: {id: req.params.messageId}})
    .then(message => message.update(req.body))
    .catch(next))
  .get('/:userId',
    (req, res, next) =>
      Message.findAll({
        where: {owner_id: req.params.userId}})
      .then(msgs => res.status(200).json(msgs))
      .catch(next))
  .delete('/:messageId', (req, res, next) =>
    Message.destroy({where: {id: req.params.messageId}})
    .then(message => res.status(204).json(message))
    .catch(next))
