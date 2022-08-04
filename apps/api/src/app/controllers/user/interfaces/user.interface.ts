import ContactInputInterface from '../../../interfaces/contact-input.interface';
import ContactInterface from '../../../interfaces/contact.interface';

 interface UserInterface {
  id?: number;
  name: string;
  surname: string;
  contacts?: ContactInputInterface[] | ContactInterface[];
}

export default UserInterface;
