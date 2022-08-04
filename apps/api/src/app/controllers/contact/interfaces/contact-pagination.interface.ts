import ContactInterface from '../../../interfaces/contact.interface';
import PaginationReturnInterface from '../../../interfaces/pagination-return.interface';

interface ContactPaginationInterface extends PaginationReturnInterface {
  contacts: ContactInterface[];
}

export default ContactPaginationInterface;
