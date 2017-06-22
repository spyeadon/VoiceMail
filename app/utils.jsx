/*Header names I might need:
  "To" is recipient like so: ""spyeadon@gmail.com" <spyeadon@gmail.com>"
  "From" : "Sophia Georgantonis <sophia.georgantonis@kellymitchell.com>"
  "Date" is timestamp like so: "Thu, 22 Jun 2017 15:41:41 +0000"
  "Subject" is string of subject line: "Example Subject Line"
  "Return-Path" is the sender's email like so: "<name@gmail.com>"
  "Delivered-To" is recipient email like so: "name@gmail.com"
 */

export const getHeaderData = (listOfHeaders, headerName) => {
  for (const header in listOfHeaders) {
    if (header.name === headerName) return header.value
  }
}
