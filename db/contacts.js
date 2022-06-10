const fs = require("fs/promises");
const path = require("path");
var ObjectID = require("bson-objectid");
const contactsPath = path.join(__dirname, "/contacts.json");


// TODO: задокументувати кожну функцію
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
  const updateProducts = async(contacts)=> {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } 
  
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}