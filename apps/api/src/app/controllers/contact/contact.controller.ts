import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import dbConnection from '../../../database/dbConnection';
import Contact from '../../../database/entities/contact.entity';
import ContactInterface from '../../interfaces/contact.interface';
import MessageInterface from '../../interfaces/message.interface';
const router: Router = Router();
const contactRepository = dbConnection.getRepository('Contact');

function setErrorValidationMessage(errors: { msg: string } []) {
  let errorMessage = '';
  errors.forEach((error, index) => {
    if (index === errors.length - 1) {
      errorMessage += ` ${error.msg}`;
    } else {
      errorMessage += ` ${error.msg.replace('.', ',')}`;
    }
  });
  return `There was an error with your request:${errorMessage}`;
}

router.post<unknown, ContactInterface | MessageInterface, ContactInterface, unknown>('/',
  body('contacts.*.isWhatsapp').isBoolean().withMessage('isWhatsapp must be a boolean.'),
  oneOf([
    body('contacts.*.identifier').isString().isLength({max: 11, min: 11}).withMessage('Invalid phone number.'),
    body('contacts.*.identifier').isString().isEmail().withMessage('Invalid Email.'),
  ], "Verify your contacts, at leat one is invalid."),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const contact = req.body;
      if (errors.isEmpty()) {
          const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
          if (contact.contactTypeId === 1 && emailRegex.test(contact.identifier)) {
            res.status(403).json({
              msg: "You tried to register an email as a phone."
            })
            return
          }
          if (contact.contactTypeId === 2 && parseInt(contact.identifier)) {
            res.status(403).json({
              msg: "You tried to register a phone as an email."
            })
            return
          }
        if (contact.contactTypeId === 2 && contact.isWhatsapp) {

            res.status(403).json({
              msg: "Whatsapp is allowed only to phone contacts."
            })
            return
          }
            const contactAlreadyExist = await contactRepository.findOne({
              where: {
                identifier: contact.identifier
              }
            })
        if (contactAlreadyExist) {
          res.status(409).json({
            msg: "Contact alredy exists."
          })
          return
        }
        const newContact = new Contact();
        newContact.identifier = contact.identifier;
        newContact.isWhatsapp = contact.isWhatsapp;
        newContact.contactTypeId = contact.contactTypeId;
        const result = await contactRepository.save({ ...newContact, userId: contact.userId });
        res.json(result as ContactInterface);
      } else {
        const errorMessage = setErrorValidationMessage(errors.array());
        res.status(403).json({ msg: errorMessage });
      }

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `There was an error with your request: ${error}`});
  }
  });


const ContactController: Router = router;
export default ContactController;
