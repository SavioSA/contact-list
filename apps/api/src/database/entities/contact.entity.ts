import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import ContactType from './contact-type.entity';
import User from './user.entity';

@Entity()
export default class Contact {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      identifier: string;

    @Column({ name: 'is_whatsapp' })
      isWhatsapp: boolean;

    @ManyToOne(() => ContactType, (contactType) => contactType.contacts)
    @JoinColumn({ name: 'contact_type_id' })
      contactType: number;

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn({ name: 'user_id' })
      userId: User;
}
