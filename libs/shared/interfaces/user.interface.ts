import ContactInterface from './contact.interface';

export default interface UserInterface {
  name: string;
  surname: string;
  contacts: ContactInterface[];
}
