'use strict'

const {BLOB, STRING, BOOLEAN, ARRAY} = require('sequelize')

module.exports = db => db.define('message', {
  subject: {
    type: STRING,
    allowNull: false,
    defaultValue: 'No Subject'
  },
  body: {
    type: STRING,
    allowNull: false
  },
  isImportant: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  isSpam: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  isRead: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  isSent: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  isTrash: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  sender_tags: {
    type: ARRAY(STRING),
    defaultValue: []
  },
  recipient_tags: {
    type: ARRAY(STRING),
    defaultValue: []
  },
  audio: {
    type: BLOB,
    allowNull: true,
    defaultValue: null
  }
}, {
  instanceMethods: {
    truncateSubject: function() {
      if (this.subject.length > 15) return this.subject.slice(0, 15);
      else return this.subject;
    },
    toggleStatus: function(dbProp) {
      this[dbProp] = !this[dbProp];
    },
    truncateBody: function() {
      if (this.body.length > 40) return this.body.slice(0, 40);
      else return this.body;
    }
  }
})

module.exports.associations = (Message, {User, OAuth}) => {
  Message.belongsTo(User, { as: 'to' });
  Message.belongsTo(User, { as: 'from' });
}
