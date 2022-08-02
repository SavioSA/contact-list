import { Router } from 'express';
import dbConnection from '../../../database/dbConnection';
import User from '../../../database/entities/user.entity';
const router: Router = Router();
const userRepository = dbConnection.getRepository('User');
const contactRepository = dbConnection.getRepository('Contact');

router.post('/', async (req, res) => {
  try {
    const { name, surname, contacts: receivedContacts } = req.body;
    const user = new User();
    user.name = name;
    user.surname = surname;
    const { id: userId } = await userRepository.save(user);
    for (const contact of receivedContacts) {
      await contactRepository.save({ ...contact, userId });
    }
  } catch (error) {
    console.log(error);
  }
});

const UserController: Router = router;
export default UserController;
