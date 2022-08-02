import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import dbConnection from '../../../database/dbConnection';
import User from '../../../database/entities/user.entity';
import MessageInterface from '../../interfaces/message.interface';
import UserInterface from './interfaces/user.interface';
const router: Router = Router();
const userRepository = dbConnection.getRepository('User');
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

router.post<unknown, UserInterface | MessageInterface, UserInterface, unknown>('/',
  body('name').isLength({ min: 3, max: 100 }).withMessage('name must have beetwen 3 and 100 characters.'),
  body('name').notEmpty(),
  body('name').isString().withMessage('name must be a string.'),
  body('surname').isLength({ min: 3, max: 100 }).withMessage('surname must have beetwen 3 and 100 characters.'),
  body('surname').notEmpty(),
  body('surname').isString().withMessage('name must be a string.'),
  body('contacts.*.isWhatsapp').isBoolean().withMessage('isWhatsapp must be a boolean.'),
  oneOf([
    body('contacts.*.identifier').isString().isLength({max: 11, min: 11}).withMessage('Invalid phone number.'),
    body('contacts.*.identifier').isString().isEmail().withMessage('Invalid Email.'),
  ], "Verify your contacts, at leat one is invalid."),
  async (req, res) => {
    try {
      const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { name, surname, contacts: receivedContacts } = req.body;
      const user = new User();
      user.name = name;
      user.surname = surname;
      const { id: userId } = await userRepository.save(user);
      const alreadyRegisteredContacts = []
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      for (const contact of receivedContacts) {
        console.log(emailRegex.test(contact.identifier));
        console.log(emailRegex.test(contact.identifier));

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
            msg: "Whatsapp is allowed only to phone contacts"
          })
          return
        }
          const contactAlreadyExist = await contactRepository.findOne({
            where: {
              identifier: contact.identifier
            }
          })
        if (contactAlreadyExist) {
          alreadyRegisteredContacts.push(contact.identifier)
        }
      }

      if (alreadyRegisteredContacts.length) {
        let identifiers = ''
        alreadyRegisteredContacts.forEach((identifier: string) => {
          identifiers = `${identifiers} ${identifier}`
        })
        const message = alreadyRegisteredContacts.length > 1 ? `The following contacts are already registered: ${identifiers}` : `The following contact is already registered: ${identifiers}`
        res.status(409).json({
          msg: message
        })
        return
      }

      for (const contact of receivedContacts) {
        await contactRepository.save({ ...contact, userId });
      }
      const result = await userRepository.findOne({
        where: {
          id: userId
        },
        relations: {
          contacts: true
        }
      })
      res.status(200).json(result as UserInterface);
    } else {
      const errorMessage = setErrorValidationMessage(errors.array());
      res.status(403).json({ msg: errorMessage })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: 'There was an error registering the contact.'
    })
  }
});

const UserController: Router = router;
export default UserController;
