import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import dbConnection from '../../../database/dbConnection';
import Contact from '../../../database/entities/contact.entity';
import ContactInputInterface from '../../interfaces/contact-input.interface';
import ContactInterface from '../../interfaces/contact.interface';
import MessageInterface from '../../interfaces/message.interface';
import PaginationInterface from '../../interfaces/pagination.interface';
import ContactPaginationInterface from './interfaces/contact-pagination.interface';

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

function validatedContactBusinessRules(contact: ContactInputInterface) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (contact.contactTypeId === 1 && emailRegex.test(contact.identifier)) {
    return {
      msg: 'You tried to register an email as a phone.',
    };
  }
  if (contact.contactTypeId === 2 && parseInt(contact.identifier, 10)) {
    return {
      msg: 'You tried to register a phone as an email.',
    };
  }
  if (contact.contactTypeId === 2 && contact.isWhatsapp) {
    return {
      msg: 'Whatsapp is allowed only to phone contacts.',
    };
  }
  return null;
}

router.post<unknown, ContactInterface | MessageInterface, ContactInputInterface, unknown>(
  '/',
  body('isWhatsapp').isBoolean().withMessage('isWhatsapp must be a boolean.'),
  oneOf([
    body('identifier').isString().isLength({ max: 11, min: 11 }).withMessage('Invalid phone number.'),
    body('identifier').isString().isEmail().withMessage('Invalid Email.'),
  ], 'Verify your contacts, at leat one is invalid.'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const contact = req.body;
      if (errors.isEmpty()) {
        const contactAlreadyExist = await contactRepository.findOne({
          where: {
            identifier: contact.identifier,
          },
        });
        if (contactAlreadyExist) {
          res.status(409).json({
            msg: 'Contact alredy exists.',
          });
          return;
        }
        const newContact = new Contact();
        newContact.identifier = contact.identifier;
        newContact.isWhatsapp = contact.isWhatsapp;
        newContact.contactType = contact.contactTypeId;
        const isNotValid = validatedContactBusinessRules(contact);
        if (isNotValid) {
          res.status(403).json(isNotValid);
          return;
        }
        const contactRegistered = await contactRepository.save({
          ...newContact, userId: contact.userId,
        });
        const result = await contactRepository.findOne({
          where: {
            id: contactRegistered.id,
          },
          relations: ['contactType'],
        });
        console.log(result);
        res.json(result as ContactInterface);
      } else {
        const errorMessage = setErrorValidationMessage(errors.array());
        res.status(403).json({ msg: errorMessage });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: `There was an error with your request: ${error}` });
    }
  },
);

router.put<unknown, MessageInterface, ContactInputInterface, unknown>(
  '/',
  body('isWhatsapp').isBoolean().withMessage('isWhatsapp must be a boolean.').optional(),
  oneOf([
    body('identifier').isString().isLength({ max: 11, min: 11 }).withMessage('Invalid phone number.'),
    body('identifier').isString().isEmail().withMessage('Invalid Email.'),
  ], 'Contact invalid, please verify.'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const { id, identifier, isWhatsapp } = req.body;
        const contact = await contactRepository.findOne({
          where: {
            id,
          },
        });
        if (!contact) {
          res.status(404).send({
            msg: 'Contact not found.',
          });
        } else {
          contact.identifier = identifier || contact.identifier;
          contact.isWhatsapp = isWhatsapp || contact.isWhatsapp;
          const isNotValid = validatedContactBusinessRules(contact as ContactInputInterface);
          if (isNotValid) {
            res.status(403).json(isNotValid);
            return;
          }
          await contactRepository.update({ id }, contact);
          res.json({
            msg: 'Contact updated successfully.',
          });
        }
      } else {
        const errorMessage = setErrorValidationMessage(errors.array());
        res.status(403).json({ msg: errorMessage });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: `There was an error with your request: ${error}` });
    }
  },
);

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
      relations: ['contactType'],
    });

    const contacts = contactsSearch[0] as unknown as ContactInterface[];
    const contactsTotalCount: number = contactsSearch[1];
    const pagesQuantity: number = Math.ceil(contactsTotalCount / (offset || contactsTotalCount));

    res.status(200).json({ contacts, pagesQuantity, totalItems: contactsTotalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `There was an error with your request: ${error}` });
  }
});

router.get< { id: number }, ContactInterface | MessageInterface, unknown, unknown >('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactRepository.findOne({
      where: { id },
      relations: ['contactType'],
    });
    if (contact) {
      res.status(200).json(contact as ContactInterface);
    } else {
      res.status(404).json({ msg: 'There was an error with your request: Contact not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `There was an error with your request: ${error}` });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contactExists = await contactRepository.findOne({
      where: { id },
    });
    if (!contactExists) {
      res.status(404).json({ msg: 'There was an error with your request: contact not found.' });
    } else {
      await contactRepository.delete({ id });
      res.status(200).json({ msg: 'Contact deleted successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `There was an error with your request: ${error}` });
  }
});

const ContactController: Router = router;
export default ContactController;
