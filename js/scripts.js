function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}
Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}
let testContact = new Contact("Ada", "Lovelace", "503-555-1111");
