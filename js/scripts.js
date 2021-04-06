//---------- Business Logic for AddressBook: ----------

function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}
AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
}

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}
AddressBook.prototype.findContact = function (id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
}
AddressBook.prototype.deleteContact = function (id) {
  if (this.contacts[id] === undefined) {
    return false;
  };
  delete this.contacts[id];
  return true;
}

//------------ Business Logic for Address: -------------
function Address(street, city, state, zip) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

Address.prototype.fullAddress = function () {
  return `${this.street}\n${this.city}, ${this.state} ${this.zip}`;
}
//------------ Business Logic for Contacts: -------------

function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.address;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.addAddress = function (address) {
  this.address = new Address(address)
}

// let contact = new Contact("Ada", "Lovelace", "503-555-0100", 40);

// ------------------ User Interface Logic ---------------------------

let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactsInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactsInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactsInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".addresses").html(address.street);
  $(".addresses").html(address.city);
  $(".addresses").html(address.state);
  $(".addresses").html(address.zip);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};


$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email").val();
    const inputtedStreet = $("input#new-street").val();
    const inputtedCity = $("input#new-city").val();
    const inputtedState = $("input#new-state").val();
    const inputtedZip = $("input#new-zip").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-street").val("");
    $("input#new-city").val("");
    $("input#new-state").val("");
    $("input#new-zip").val("");

    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);
    let newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedZip);
    console.log(newContact)
    newContact.addAddress(newAddress);
    console.log(newContact.address)
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})