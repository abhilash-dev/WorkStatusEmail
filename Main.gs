//Author : Abhilash S
//Date : 13/02/2017

function main() {
  var threads = GmailApp.search("subject:status AND is:unread");
  var files = DriveApp.getFilesByName("StatusToday"); //Name of the Google Doc where the body of the Email is present
  var body;
  while (files.hasNext()) {
    var file = files.next();
    var Id = file.getId();
    body = DocumentApp.openById(Id).getBody().getText();
    Logger.log(body);
  }
  // Check if the email already exists
  if(threads.length == 0){ 
    Logger.log("No status emails found");
    var recipient = ["recipient-1@example.com","recipient-2@example.com","recipient-3@example.com"];
    Logger.log("Recipents - %s\n",recipient);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd='0'+dd
    } 

    if(mm<10) {
      mm='0'+mm
    } 

    today = dd+'/'+mm+'/'+yyyy;
    var subject = "Status - "+today;
    Logger.log("Subject - %s",subject);
    
    GmailApp.sendEmail(recipient, subject, body);
  
  }else{
  	//Email already exists, so replying to that instead of creating a new email
    threads[0].replyAll(body);
  }
}
