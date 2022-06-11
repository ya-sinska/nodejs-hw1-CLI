const { program } = require("commander");
const contactsFunc = require("./db/contacts");

program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-n, --name <type>")
    .option("-e, --email <type>")
    .option("-p, --phone <type>")

program.parse();
const options = program.opts();

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
        if (!deleteContact) {
            throw new Error(`Can't find contact id: ${id}`)
        }
        console.log(deleteContact)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction(options);

// invokeAction({
//     action: "list",
// })
// invokeAction({
//     action: "get",
//     id:"16"
// })
// invokeAction({
//     action: "add",
//     name: "Romanna",
//     email: "hghj.com",
//     phone: "1111111"
//  })
// invokeAction({
//     action: "remove",
//     id: "62a48d6b44443a4c083a389c99"
//  })