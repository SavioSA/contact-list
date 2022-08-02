import ContactInterface from '../../../interfaces/contact.interface';

export default interface UserInterface {
  id?: number;
  name: string;
  surname: string;
  contacts?: ContactInterface[];
}
