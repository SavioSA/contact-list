export default interface ContactInterface {
  id?: number;
  identifier: string;
  contactTypeId: number;
  contactTypeName?: string | undefined;
  isWhatsapp: boolean;
  userId?: number;
}
