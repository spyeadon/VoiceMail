function customFolderFilter(message, folderName) {
  if (message.tags.indexOf(folderName) !== -1) return true
  else false
}

function filterDecisionTable(message, folderName, user) {
  const folders = {
    Inbox: {isSent: false, isTrash: false, isSpam: false, to_id: user.id},
    Drafts: {isSent: false, isTrash: false, from_id: user.id},
    'Sent Mail': {isSent: true, isTrash: false, from_id: user.id},
    Important: {isImportant: true, isTrash: false, isSpam: false},
    Spam: {isSpam: true, to_id: user.id},
    Trash: {isTrash: true}
  }

  if (Object.keys(folders).indexOf(folderName) === -1) return customFolderFilter(message, folderName)

  for (var prop in folders[folderName]) {
    if (message[prop] !== folders[folderName][prop]) return false
  }

  return true
}

function sortByLastUpdate(messages) {
  return messages.sort((msg1, msg2) => {
    if (msg1.updated_at > msg2.updated_at) return 1
    if (msg2.updated_at > msg1.updated_at) return -1
    else return 0
  })
}

export default function filterByFolder(messages, folderName, user) {
  return sortByLastUpdate(messages.filter(message => filterDecisionTable(message, folderName, user)))
}
