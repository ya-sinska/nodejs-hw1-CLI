const fs = require("fs/promises");
const path = require("path");
var ObjectID = require("bson-objectid");


const contactsPath = path.join(__dirname, "/contacts.json");

const updateContacts = async (contacts)=> {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
} 
  
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts) 
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  if (!contact) {
    return null
  }
  return contact
}

const removeContact = async(contactId)=>{
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null
  }
  const [deleteContact] = contacts.splice(index, 1);
  updateContacts(contacts)
  return deleteContact;
}

const addContact = async (name, email, phone)=> {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: ObjectID()
  }
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}