import PaginationReturnInterface from './pagination-return.interface';
import UserInterface from './user.interface';

export default interface  UserPaginationInterface extends PaginationReturnInterface {
  users: UserInterface[];
}
