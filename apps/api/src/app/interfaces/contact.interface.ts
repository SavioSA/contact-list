interface ContactInterface {
  id?: number;
  identifier: string;
  contactTypeId: number;
  isWhatsapp: boolean;
  userId?: number;
}

export default ContactInterface;
