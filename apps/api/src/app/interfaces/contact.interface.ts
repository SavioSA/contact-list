import ContactTypeInterface from '../controllers/contact-type/interfaces/contact-type.interface';

interface ContactInterface {
  id?: number;
  identifier: string;
  contactType: ContactTypeInterface;
  isWhatsapp: boolean;
  userId: number;
}

export default ContactInterface;
