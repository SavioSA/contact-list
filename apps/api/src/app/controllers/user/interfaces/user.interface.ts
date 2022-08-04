import ContactInterface from '../../../interfaces/contact.interface';

 interface UserInterface {
  id?: number;
  name: string;
  surname: string;
  contacts?: ContactInterface[];
}

export default UserInterface;
