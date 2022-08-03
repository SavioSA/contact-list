import { Router } from 'express';
import dbConnection from '../../../database/dbConnection';
import MessageInterface from '../../interfaces/message.interface';
import { PaginationInterface } from '../../interfaces/pagination.interface';
import ContactTypeInterface from './interfaces/contact-type.interface';
const router: Router = Router();
const contactTypeRepository = dbConnection.getRepository('ContactType');

router.get<unknown, ContactTypeInterface[] | MessageInterface, unknown, PaginationInterface>('/', async (req, res) => {
  try {
    const result = await contactTypeRepository.find({
      select:['id', 'type']
    });
    res.status(200).json(result as ContactTypeInterface[]);
  } catch (error) {
    res.status(500).json({ msg: `There was an error with your request: ${error}` });
  }
})


const ContactTypeController: Router = router;
export default ContactTypeController;
