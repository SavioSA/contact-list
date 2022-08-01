import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Contact from './contact.entity';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      name: string;

    @Column()
      surname: string;

    @OneToMany(() => Contact, (contact) => contact.user)
      contacts: Contact[];
}
