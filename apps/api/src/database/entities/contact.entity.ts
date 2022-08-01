import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';

@Entity()
export default class Contact {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      name: string;

    @ManyToOne(() => User, (user) => user.contacts)
    user: User
}
