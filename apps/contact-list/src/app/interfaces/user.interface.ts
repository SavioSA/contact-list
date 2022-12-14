import ContactInputInterface from './contact-input.interface';
import ContactInterface from './contact.interface';

export default interface UserInterface {
  id?: number;
  name: string;
  surname: string;
  contacts?: ContactInterface[] | ContactInputInterface[];
}
