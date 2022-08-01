import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Contact from './contact.entity';

@Entity({

})
export default class ContactType {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      type: string;

    @ManyToOne(() => Contact, (contact) => contact.contactType)
      contacts: Contact[];
}
