const Imap = require('imap')
const inspect = require('util').inspect

const xoauth2 = require('xoauth2')
const clientId = require('../google_strategy.json').web.client_id
const clientSecret = require('../google_strategy.json').web.client_secret


function imapConnection(email, refreshToken, accessToken, folder) {

  const xoauth2Gen = xoauth2.createXOAuth2Generator({
    user: email,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
    accessToken: accessToken,
    customPayload: {
      "access_type": "offline"
    }
  });

  xoauth2Gen.getToken((tokenErr, token, newAccess, arg4) => {
  // xoauth2Gen.generateToken((tokenErr, token, newAccess, arg4) => {
    if (tokenErr) return console.error(tokenErr)
    console.log('formatted b64 SASL/xoauth2 token is: ', token)
    console.log('new access token is: ', newAccess)
    console.log('arg4 is: ', arg4)


    const imap = new Imap({
      xoauth2: token,
      host: 'imap.gmail.com',
      port: 993,
      tls: 1,
      debug: console.log
      // tls: true
    });

    function openFolder(callback) {
      imap.openBox(folder, true, callback);
    }

    imap.once('ready', function() {
      console.log('imap ready event has been emitted')
      openFolder(function(preErr, box) {
        if (preErr) throw preErr;
        var messages = imap.seq.fetch('1:5', {
          bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
          struct: true
        });
        messages.on('message', function(msg, seqno) {
          console.log('Message #%d', seqno);
          var prefix = '(#' + seqno + ') ';
          msg.on('body', function(stream, info) {
            var buffer = '';
            stream.on('data', function(chunk) {
              buffer += chunk.toString('utf8');
            });
            stream.once('end', function() {
              console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
            });
          });
          msg.once('attributes', function(attrs) {
            console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
          });
          msg.once('end', function() {
            console.log(prefix + 'Finished');
          });
        });
        messages.once('error', function(err) {
          console.log('Fetch error: ' + err);
        });
        messages.once('end', function() {
          console.log('Done fetching all messages!');
          imap.end();
        });
      });
    });

    imap.once('error', function(err) {
      console.log(err);
    });

    imap.once('end', function() {
      console.log('Connection ended');
    });

    imap.connect()
  })


}

module.exports = imapConnection
