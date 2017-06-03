const helper = require('sendgrid').mail;
const sg = require('sendgrid')(require('../../sendgrid.json').SENDGRID_API_KEY);

module.exports = require('express').Router()
  .post('/audio', (req, res, next) => {

    const encodedData = req.body.message.data;
    const from_email = new helper.Email(req.body.message.fromAddress);
    const to_email = new helper.Email(req.body.message.toAddress);
    const subject = req.body.message.subjectLine;
    const content = new helper.Content('text/plain', req.body.message.bodyContent);

    const mail = new helper.Mail(from_email, subject, to_email, content);

    const attachment = new helper.Attachment();
    attachment.setContent(encodedData);
    attachment.setFilename('audio.wav');
    mail.addAttachment(attachment);

    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request)
    .then(response => {
      res.status(202).json(request);
      console.log("SG res status code: ", response.statusCode)
    })
    .catch(error => {
      console.log("SG RES err is: ", error.response.status, error.response.headers);
      console.log("SG REQ info: ", request.body);
      res.json(request.body);
    });
  })


.post('/text', (req, res, next) => {
  //test route of sendgrid server/browser integration without any audio
  const from_email = new helper.Email(req.body.message.fromAddress);
  const to_email = new helper.Email(req.body.message.toAddress);
  const subject = req.body.message.subjectLine;
  const content = new helper.Content('text/plain', req.body.message.bodyContent);
  const mail = new helper.Mail(from_email, subject, to_email, content);

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request)
    .then(response => {
      res.status(response.statusCode).json(request);
      console.log("res status code: ", response.statusCode)
    })
    .catch(error => {
      console.log("Hey Soren! SG err is: ", error.response.statusCode);
    });
})
