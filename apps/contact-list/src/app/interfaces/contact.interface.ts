export default interface ContactInterface {
  id?: number;
  identifier: string;
  contactTypeId: number;
  isWhatsapp: boolean;
  userId?: number;
}
