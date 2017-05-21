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

  if (Object.keys(folders).indexOf(folderName) === -1) {
    return customFolderFilter(message, folderName)
  }

  for (var prop in folders[folderName]) {
    if (message[prop] !== folders[folderName][prop]) return false
  }

  return true
}

export default function filterByFolder(messages, folderName, user) {
  return messages.filter(message => filterDecisionTable(message, folderName, user))
}
