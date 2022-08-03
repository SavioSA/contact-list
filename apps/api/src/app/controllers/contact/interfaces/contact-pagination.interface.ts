import ContactInterface from '../../../interfaces/contact.interface';
import PaginationReturnInterface from '../../../interfaces/pagination-return.interface';
export default interface  ContactPaginationInterface extends PaginationReturnInterface {
  contacts: ContactInterface[];
}
