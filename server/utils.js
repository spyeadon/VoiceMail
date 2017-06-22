const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const forbidden = message => (req, res) => {
  res.status(403).send(message)
}

const correctCase = str =>
  str.toLowerCase().split(' ').map(word => {
    var splitWord = word.split('')
    splitWord[0] = splitWord[0].toUpperCase();
    return splitWord.join('')
  })
  .join(' ')

const filterLabels = labels => {
  const labelsToRemove = ['CATEGORY_PERSONAL', 'CATEGORY_SOCIAL', 'CATEGORY_FORUMS', 'CATEGORY_PROMOTIONS', 'CATEGORY_UPDATES']
  return labels.filter(label => labelsToRemove.indexOf(label.name) === -1).map(label => correctCase(label.name))
}

const messageBodyDecoder = (payload, googleBatch, mimeType) => {
  const multipartMimeTypes = ['multipart/related', 'multipart/alternative', 'multipart/mixed', 'multipart/digest']
  if (payload.mimeType === mimeType) {
    return googleBatch.decodeRawData(payload.body.data)
  }
  else if (multipartMimeTypes.indexOf(payload.mimeType) !== -1 && payload.parts.length) {
    for (var i = 0; i < payload.parts.length; i++) {
      var decoded = messageBodyDecoder(payload.parts[i], googleBatch, mimeType)
      if (decoded) return decoded
    }
  }
}

const formatThreadMessages = (messages, googleBatch) =>
  messages.map(message => {
    return {
      snippet: message.snippet,
      headers: message.payload.headers,
      messagePayload: message.payload,
      'text/plain': messageBodyDecoder(message.payload, googleBatch, 'text/plain'),
      'text/html': messageBodyDecoder(message.payload, googleBatch, 'text/html'),
      threadId: message.threadId
    }
  }).reverse()

const decodeAndFmtThreadsMap = (rawThreads, googleBatch) =>
  rawThreads.map(thread => {
    const lastMessage = thread.body.messages.length - 1
    return {
      snippet: thread.body.messages[lastMessage].snippet,
      messages: formatThreadMessages(thread.body.messages, googleBatch)
    }
  })

// Feel free to add more filters here (suggested: something that keeps out non-admins)

module.exports = {mustBeLoggedIn, selfOnly, forbidden, correctCase, filterLabels, decodeAndFmtThreadsMap}
