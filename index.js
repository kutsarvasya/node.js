const contactsService = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await contactsService.listContacts();
        console.log(allContacts);
        break;
      case "get":
        const contact = await contactsService.getContactById(id);
        console.log(contact);
        break;

      case "add":
        const newContact = await contactsService.addContact({
          name,
          email,
          phone,
        });
        console.log(newContact);
        break;

      case "remove":
        const deleteContact = await contactsService.removeContact(id);
        console.log(deleteContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error);
  }
}
invokeAction(argv);
