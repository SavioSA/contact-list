import ContactInterface from '../../../../../../contact-list/src/app/interfaces/contact.interface';
import PaginationReturnInterface from '../../../../../../contact-list/src/app/interfaces/pagination-return.interface';


export default interface  ContactPaginationInterface extends PaginationReturnInterface {
  contacts: ContactInterface[];
}
