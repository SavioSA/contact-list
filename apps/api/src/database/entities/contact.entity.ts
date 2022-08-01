import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import ContactType from './contact-type.entity';
import User from './user.entity';

@Entity()
export default class Contact {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      type: string;

    @Column()
      identifier: string;

    @ManyToOne(() => ContactType, (contactType) => contactType.contacts)
      contactTypes: ContactType[];

    @ManyToOne(() => User, (user) => user.contacts)
      user: User;
}
