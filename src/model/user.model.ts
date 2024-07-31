import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  bio: string;

  @Column()
  avatarUrl: string;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  circlesCount: number;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  passWord: string;
}
