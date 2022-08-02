import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

    @Column({name: 'user_id'})
      userId: string;

    @Column({name: 'contact_type_id'})
      contactTypeId: string;

    @OneToMany(() => ContactType, (contactType) => contactType.id)
      contactType: ContactType;

    @OneToMany(() => User, (user) => user.id)
      user: User;
}
