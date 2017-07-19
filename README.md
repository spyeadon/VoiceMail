# [VoiceMail](http://voicemail.herokuapp.com/)

#### An email client built for the browser with the Gmail API, Node.js, Express, Sequelize and React Redux.

#### App deployed [here](http://voicemail.herokuapp.com/), however, user access is awaiting OAuth consent from google. A request has been made and the site will be running shortly! Thank you.

#### To edit codebase
* Clone/fork repo
* yarn install or npm install
* npm run dev to build webpack bundle and start server
* npm run seed syncs and seeds DB (currently adds no data)

## Current state of the app:

### Features
* Access to google profile and gmail account via OAuth
* Login persists through browser sessions
* User labels, threads, and messages are retrieved on batch request
* User can set the number of threads rendered per page
* User can scroll through pages of threads per each label on request
* Threads can be opened and their messages viewed via popout component onclick
* Landing page, mailbox, and account settings pages accessible via navbar

### Technologies in use
* Node.js
* Express.js
* OAuth 2.0
* Passport.js
* Axios
* Sequelize
* React Redux
* [Gmail API](https://developers.google.com/gmail/api/guides/)
* [Google Batch API](https://github.com/pradeep-mishra/google-batch)

## In progress:

### Features
* Audio recording and message attachment in browser
* Rendering email body text
* Retrieval and editing of messages in _drafts_ label
* Composing and sending new messages
* Add local signup/login so user only has to OAuth with google when they create an account
* Push notifications

### Styling
* Color scheme
* CSS Transitions

### Technologies to use
* RecordRTC
* Sendgrid Email API (possibly)
