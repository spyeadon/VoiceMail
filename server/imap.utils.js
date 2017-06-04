const Imap = require('imap')
const inspect = require('util').inspect

function getMessagesViaImap(folder, xoauth2) {
  const imap = new Imap({
    xoauth2: xoauth2,
    host: 'imap.gmail.com',
    port: 993,
    tls: true
  });

  imap.once('ready', function() {
    imap.openBox(folder, true, function(preErr, box) {
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

}

module.exports = getMessagesViaImap
