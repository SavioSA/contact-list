import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ContactType from './contact-type.entity';
import User from './user.entity';

@Entity()
export default class Contact {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      identifier: string;

    @OneToMany(() => ContactType, (contactType) => contactType.contacts)
      contactType: ContactType;

    @ManyToOne(() => User, (user) => user.contacts)
      user: User;
}
