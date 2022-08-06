import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Contact from './contact.entity';

@Entity()
export default class ContactType {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      type: string;

    @OneToMany(() => Contact, (contact) => contact.contactType)
      contacts: Contact[];
}
