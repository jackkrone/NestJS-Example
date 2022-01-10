import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// This file is called an entity because it's the template for an entry in a users table
// So while an entity is different from a table, the entity template illucidates the table structure
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) // Argument tells typeORM that the usernames must be unique
  username: string;

  @Column()
  password: string;
}
