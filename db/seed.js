'use strict'

const db = require('APP/db')
    , {User, Message, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    messages: messages()
  }


  return Promise.props(seeded)
}

const users = seed(User, {
  god: {
    email: 'god@voicemail.com',
    name: 'So many names',
    sender_email: '#blessed@me.com',
    password: '1234',
  },
  barack: {
    name: 'Barack Obama',
    email: 'barack@voicemail.com',
    sender_email: 'bobama@ameritech.net',
    password: '1234'
  },
  soren: {
    name: 'Soren Philip Yeadon',
    email: 'soren@voicemail.com',
    sender_email: 'sorenyeadon2013@u.northwestern.edu',
    password: 'spy'
  }
})

const messages = seed(Message, {
  message1: {
    subject: 'seeded test #1 woohoo',
    body: 'I could not really think of a great message body to add to the seed list so instead I just wrote this. Enjoy!',
    tags: ['Tests', 'Funny'],
    isImportant: true,
    isSent: true
    // to_id: '1',
    // from_id: '3',
    //owner_id: '3'
  },
  message5: {
    subject: 'seeded test #1 woohoo',
    body: 'I could not really think of a great message body to add to the seed list so instead I just wrote this. Enjoy!',
    tags: ['Funny'],
    isRead: true
    // to_id: '1',
    // from_id: '3',
    //owner_id: '1'
  },
  message2: {
    subject: 'seeded test #2 please work',
    body: 'And what is love? It is a doll dressed up For idleness to cosset, nurse, and dandle; A thing of soft misnomers, so divine That silly youth doth think to make itself Divine by loving, and so goes on Yawning and doting a whole summer long',
    tags: ['Work'],
    isSent: true
    // to_id: 3,
    // from_id: 1,
    //owner_id: '1'
  },
  message6: {
    subject: 'seeded test #2 please work',
    body: 'And what is love? It is a doll dressed up For idleness to cosset, nurse, and dandle; A thing of soft misnomers, so divine That silly youth doth think to make itself Divine by loving, and so goes on Yawning and doting a whole summer long',
    tags: ['Job']
    // to_id: 3,
    // from_id: '1',
    //owner_id: '3'
  },
  message3: {
    subject: 'seeded test #3 lets gooo',
    body: "I wandered lonely as a cloud That floats on high o'er vales and hills, When all at once I saw a crowd, A host, of golden daffodils; Beside the lake, beneath the trees, Fluttering and dancing in the breeze.",
    tags: ['Work'],
    isSent: true,
    // to_id: 2,
    // from_id: '1',
    //owner_id: '1'
  },
  message7: {
    subject: 'seeded test #3 lets gooo',
    body: "I wandered lonely as a cloud That floats on high o'er vales and hills, When all at once I saw a crowd, A host, of golden daffodils; Beside the lake, beneath the trees, Fluttering and dancing in the breeze.",
    tags: ['Work'],
    // to_id: 2,
    // from_id: 1
    //owner_id: '2'
  },
  message4: {
    subject: 'seeded test #4 show me the money',
    body: 'The waves beside them danced, but they Out-did the sparkling leaves in glee; A poet could not be but gay, In such a jocund company! I gazed—and gazed—but little thought What wealth the show to me had brought:',
    // to_id: 3,
    // from_id: 1
    //owner_id: 1
  }
})

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users})
