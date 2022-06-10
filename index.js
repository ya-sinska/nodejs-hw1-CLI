// const contactsPath = require("./db/contacts")
const contactsFunc = require("./db/contacts");

const invokeAction= async({ action, id, name, email, phone })=>{
  switch (action) {
    case 'list':
        const contacts = await contactsFunc.listContacts();
        console.log(contacts);
      break;

    case 'get':
        const contact = await contactsFunc.getContactById(id);
          if (!contact) {
              throw new Error(`Can't find contact id: ${id}`)
          }
        console.log(contact)
      break;

    case 'add':
        const newContact = await contactsFunc.addContact(name, email, phone);
        console.log(newContact)
      break;

    case 'remove':
        const deleteContact = await contactsFunc.removeContact(id);
        console.log(deleteContact)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
// invokeAction({
//     action: "list",
// })
// invokeAction({
//     action: "get",
//     id:"12"
// })
// invokeAction({
//     action: "add",
//     name: "Romanna",
//     email: "hghj.com",
//     phone: "1111111"
//  })