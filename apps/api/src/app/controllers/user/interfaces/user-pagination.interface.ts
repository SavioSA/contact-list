import PaginationReturnInterface from '../../../interfaces/pagination-return.interface';
import UserInterface from './user.interface';

interface UserPaginationInterface extends PaginationReturnInterface {
  users: UserInterface[];
}

export default UserPaginationInterface;
