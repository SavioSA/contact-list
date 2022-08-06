import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import dbConnection from '../../../database/dbConnection';
import User from '../../../database/entities/user.entity';
import MessageInterface from '../../interfaces/message.interface';
import PaginationInterface from '../../interfaces/pagination.interface';
import UserPaginationInterface from './interfaces/user-pagination.interface';
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

router.post<unknown, UserInterface | MessageInterface, UserInterface, unknown>(
  '/',
  body('name').isLength({ min: 3, max: 100 }).withMessage('name must have beetwen 3 and 100 characters.'),
  body('name').notEmpty(),
  body('name').isString().withMessage('name must be a string.'),
  body('surname').isLength({ min: 3, max: 100 }).withMessage('surname must have beetwen 3 and 100 characters.'),
  body('surname').notEmpty(),
  body('surname').isString().withMessage('name must be a string.'),
  body('contacts.*.isWhatsapp').isBoolean().withMessage('isWhatsapp must be a boolean.'),
  oneOf([
    body('contacts.*.identifier').isString().isLength({ max: 11, min: 11 }).withMessage('Invalid phone number.'),
    body('contacts.*.identifier').isString().isEmail().withMessage('Invalid Email.'),
  ], 'Verify your contacts, at least one is invalid.'),
  async (req, res) => {
    try {
      console.log(req.body);

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const { name, surname, contacts: receivedContacts } = req.body;
        const user = new User();
        user.name = name;
        user.surname = surname;
        const { id: userId } = await userRepository.save(user);
        const alreadyRegisteredContacts = [];
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        receivedContacts.forEach(async (contact) => {
          if (contact.contactTypeId === 1 && emailRegex.test(contact.identifier)) {
            res.status(403).json({
              msg: 'You tried to register an email as a phone.',
            });
            return;
          }
          if (contact.contactTypeId === 2 && parseInt(contact.identifier, 10)) {
            res.status(403).json({
              msg: 'You tried to register a phone as an email.',
            });
            return;
          }
          if (contact.contactTypeId === 2 && contact.isWhatsapp) {
            res.status(403).json({
              msg: 'Whatsapp is allowed only to phone contacts',
            });
            return;
          }
          const contactAlreadyExist = await contactRepository.findOne({
            where: {
              identifier: contact.identifier,
            },
          });
          if (contactAlreadyExist) {
            alreadyRegisteredContacts.push(contact.identifier);
          }
        });

        if (alreadyRegisteredContacts.length) {
          let identifiers = '';
          alreadyRegisteredContacts.forEach((identifier: string) => {
            identifiers = `${identifiers} ${identifier}`;
          });
          const message = alreadyRegisteredContacts.length > 1 ? `The following contacts are already registered: ${identifiers}` : `The following contact is already registered: ${identifiers}`;
          res.status(409).json({
            msg: message,
          });
          return;
        }

        receivedContacts.forEach(async (contact) => {
          await contactRepository.save({ ...contact, userId });
        });

        const result = await userRepository.findOne({
          where: {
            id: userId,
          },
          relations: {
            contacts: true,
          },
        });
        res.status(200).json(result as UserInterface);
        return;
      }
      const errorMessage = setErrorValidationMessage(errors.array());

      res.status(403).json({ msg: errorMessage });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: `There was an error with your request: ${error}` });
    }
  },
);

router.put<unknown, MessageInterface, UserInterface, unknown>(
  '/',
  body('id').isNumeric().withMessage('id must be a number.'),
  body('name').isLength({ min: 3, max: 100 }).optional().withMessage('name must have beetwen 3 and 100 characters.'),
  body('name').isString().optional().withMessage('name must be a string.'),
  body('surname').isLength({ min: 3, max: 100 }).optional().withMessage('surname must have beetwen 3 and 100 characters.'),
  body('surname').isString().optional().withMessage('name must be a string.'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const { id, name, surname } = req.body;
        const user = await userRepository.findOne({
          where: {
            id,
          },
        });
        if (!user) {
          res.status(404).send({
            msg: 'User not found.',
          });
        } else {
          user.name = name || user.name;
          user.surname = surname || user.surname;
          await userRepository.update({ id }, user);
          res.json({
            msg: 'User updated successfully.',
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

router.get<unknown, UserPaginationInterface | MessageInterface, unknown, PaginationInterface>('/', async (req, res) => {
  try {
    const { offset, page } = req.query;
    const take: number = !offset ? 0 : offset;
    let currentPage: number = !page ? 0 : page;
    currentPage = currentPage > 0 ? currentPage - 1 : currentPage;
    const itensPerPage = currentPage * take;

    const usersSearch = await userRepository.findAndCount({
      take,
      skip: itensPerPage,
    });

    const users = usersSearch[0] as unknown as UserInterface[];
    const usersTotalCount: number = usersSearch[1];
    const pagesQuantity: number = Math.ceil(usersTotalCount / (offset || usersTotalCount));

    res.status(200).json({ users, pagesQuantity, totalItems: usersTotalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `There was an error with your request: ${error}` });
  }
});

router.get<{ id: number }, UserInterface | MessageInterface, unknown, unknown>('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findOne({
      where: { id },
      relations: ['contacts', 'contacts.contactType'],
    });
    if (user) {
      res.status(200).json(user as UserInterface);
    } else {
      res.status(404).json({ msg: 'There was an error with your request: User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `There was an error with your request: ${error}` });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await userRepository.findOne({
      where: { id },
    });
    if (!userExists) {
      res.status(404).json({ msg: 'There was an error with your request: User not found.' });
    } else {
      await userRepository.delete({ id });
      res.status(200).json({ msg: 'User deleted successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `There was an error with your request: ${error}` });
  }
});

const UserController: Router = router;
export default UserController;
