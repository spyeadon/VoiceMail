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

const formatHeaders = listOfHeaders => {
  const headersToReturn = ['To', 'From', 'Date', 'Subject', 'Delivered-To', 'Return-Path']
  const filteredHeaders = listOfHeaders.filter(header => headersToReturn.indexOf(header.name) !== -1).map(header => {
    var formattedHeader = {}
    formattedHeader[header.name] = header.value
    return formattedHeader
  })
  // console.log('filtered headers in the formatHeaders func: ', filteredHeaders)
  // const returnHeaders = {}
  // for (const prop in filteredHeaders) {
  //   if (filteredHeaders.hasOwnProperty(prop)) returnHeaders[prop] = filteredHeaders[prop]
  // }
  const returnHeaders = filteredHeaders.reduce((obj, item) => {
    var keys = Object.keys(item)
    obj[item[keys[0]]] = item[keys[1]]
    return obj
  }, {})

  return returnHeaders
}

const messageBodyDecoder = (payload, googleBatch, mimeType) => {
  if (payload.mimeType === mimeType) {
    return googleBatch.decodeRawData(payload.body.data)
  }
  else if (payload.mimeType.slice(0, 9) === 'multipart' && payload.parts.length) {
    for (var i = 0; i < payload.parts.length; i++) {
      var decoded = messageBodyDecoder(payload.parts[i], googleBatch, mimeType)
      if (decoded) return decoded
    }
  }
}

const formatThreadMessages = (messages, googleBatch) =>
  messages.map(message => {
    console.log('formatted headers object looks like: ', formatHeaders(message.payload.headers))
    return {
      snippet: message.snippet,
      headers: formatHeaders(message.payload.headers),
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
      threadId: thread.body.messages[lastMessage].threadId,
      messages: formatThreadMessages(thread.body.messages, googleBatch)
    }
  })

// Feel free to add more filters here (suggested: something that keeps out non-admins)

module.exports = {mustBeLoggedIn, selfOnly, forbidden, correctCase, filterLabels, decodeAndFmtThreadsMap}
