import ContactTypeInterface from './contact-type.interface';

export default interface ContactInterface {
  id?: number;
  identifier: string;
  contactType: ContactTypeInterface;
  isWhatsapp: boolean;
  userId?: number;
}
