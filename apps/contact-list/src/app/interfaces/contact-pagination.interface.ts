import ContactInterface from './contact.interface';
import PaginationReturnInterface from './pagination-return.interface';


export default interface  ContactPaginationInterface extends PaginationReturnInterface {
  contacts: ContactInterface[];
}
