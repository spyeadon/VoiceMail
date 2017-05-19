const decisionTable = (message, folderName, user) => {
  const folders = {
    Inbox: {isSent: false, isTrash: false, isSpam: false, to_id: user.id},
    Drafts: {isSent: false, isTrash: false, from_id: user.id},
    'Sent Mail': {isSent: true, isTrash: false, from_id: user.id},
    Important: {isImportant: true, isTrash: false, isSpam: false},
    Spam: {isSpam: true, to_id: user.id},
    Trash: {isTrash: true}
  }

  for (var prop in folders[folderName]) {
    if (message[prop] !== folders[folderName][prop]) return false
  }

  return true
}

export function filterByFolder(messages, folderName, user) {
  return messages.filter(message => {
    return decisionTable(message, folderName, user)
  })
}

export function filterByMessageId(messages, messageId) {

}

export function sortMessagesBy(sortParam) {

}

export function folderNameToDbProp(folderName) {

}
