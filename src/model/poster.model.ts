import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Poster {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  name: string;

  @Column()
  avatarUrl: string;
}
