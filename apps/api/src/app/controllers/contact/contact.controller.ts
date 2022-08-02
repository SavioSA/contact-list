import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import dbConnection from '../../../database/dbConnection';
import Contact from '../../../database/entities/contact.entity';
import ContactInterface from '../../interfaces/contact.interface';
import MessageInterface from '../../interfaces/message.interface';
import { PaginationInterface } from '../../interfaces/pagination.interface';
import ContactPaginationInterface from './contact-pagination.interface';
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

function validatedContactBusinessRules(contact: ContactInterface) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  if (contact.contactTypeId === 1 && emailRegex.test(contact.identifier)) {
   return {
      msg: "You tried to register an email as a phone."
    }
  }
  if (contact.contactTypeId === 2 && parseInt(contact.identifier)) {
    return {
      msg: "You tried to register a phone as an email."
    }
  }
  if (contact.contactTypeId === 2 && contact.isWhatsapp) {
    return {
      msg: "Whatsapp is allowed only to phone contacts."
    }
  }
}

router.post<unknown, ContactInterface | MessageInterface, ContactInterface, unknown>('/',
  body('isWhatsapp').isBoolean().withMessage('isWhatsapp must be a boolean.'),
  oneOf([
    body('identifier').isString().isLength({max: 11, min: 11}).withMessage('Invalid phone number.'),
    body('identifier').isString().isEmail().withMessage('Invalid Email.'),
  ], "Verify your contacts, at leat one is invalid."),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const contact = req.body;
      if (errors.isEmpty()) {
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
        const isNotValid = validatedContactBusinessRules(contact);
        if (isNotValid) {
          res.status(403).json(isNotValid);
          return
        }
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

  router.put<unknown, MessageInterface, ContactInterface, unknown>('/',
  body('isWhatsapp').isBoolean().withMessage('isWhatsapp must be a boolean.').optional(),
  oneOf([
    body('identifier').isString().isLength({max: 11, min: 11}).withMessage('Invalid phone number.'),
    body('identifier').isString().isEmail().withMessage('Invalid Email.'),
  ], "Contact invalid, please verify.",),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const { id , identifier, isWhatsapp} = req.body;
        const contact = await contactRepository.findOne({
          where: {
            id
          }
        })
        if (!contact) {
          res.status(404).send({
            msg: 'Contact not found.'
          })
        } else {
          contact.identifier = identifier || contact.identifier
          contact.isWhatsapp = isWhatsapp || contact.isWhatsapp
          const isNotValid = validatedContactBusinessRules(contact as ContactInterface);
          if (isNotValid) {
            res.status(403).json(isNotValid);
            return
          }
          await contactRepository.update({ id }, contact);
          res.json({
            msg: "Contact updated successfully."
          })
        }
      } else {
        const errorMessage = setErrorValidationMessage(errors.array());
        res.status(403).json({ msg: errorMessage })
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: `There was an error with your request: ${error}`});
    }
  });

router.get<unknown, ContactPaginationInterface | MessageInterface, unknown, PaginationInterface>('/', async (req, res) => {
  try {
    const { offset, page } = req.query;
    const take: number = !offset ? 0 : offset;
    let currentPage: number = !page ? 0 : page;
    currentPage = currentPage > 0 ? currentPage - 1 : currentPage;
    const itensPerPage = currentPage * take;

    const contactsSearch = await contactRepository.findAndCount({
      take,
      skip: itensPerPage,
    });

    const contacts = contactsSearch[0] as unknown as ContactInterface[];
    const contactsTotalCount: number = contactsSearch[1];
    const pagesQuantity: number = Math.ceil(contactsTotalCount / (offset || contactsTotalCount));

    res.status(200).json({ contacts, pagesQuantity });
  } catch (error) {
    res.status(500).json({ msg: `There was an error with your request: ${error}` });
  }
});




const ContactController: Router = router;
export default ContactController;
