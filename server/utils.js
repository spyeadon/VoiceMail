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

// Feel free to add more filters here (suggested: something that keeps out non-admins)

module.exports = {mustBeLoggedIn, selfOnly, forbidden, correctCase, filterLabels}
