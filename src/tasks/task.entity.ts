import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// this file (.entity.ts) instructs typeORM to autoload the contents into the DB

@Entity() // defines a table... so is an entity a table now?
export class Task {
  // properties of this class translate to columns in our db table "tasks" when we decorate them appropriately
  // Following Decorator indicates that this is the primary key of the the table
  // By default the decorator uses ordered numbers for ID
  // Pass an argument to instruct the us of uuid instead, where order doesn't matter
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;
}
