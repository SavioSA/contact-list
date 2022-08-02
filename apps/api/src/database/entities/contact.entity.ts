import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import ContactType from './contact-type.entity';
import User from './user.entity';

@Entity()
export default class Contact {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      identifier: string;

    @Column({name: 'is_whatsapp'})
      isWhatsapp: string;

    @Column({name: 'contact_type_id'})
      contactTypeId: string;

    @OneToOne(() => ContactType, (contactType) => contactType.contacts)
      contactType: ContactType;

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn({name: 'user_id'})
      userId: User;
}
