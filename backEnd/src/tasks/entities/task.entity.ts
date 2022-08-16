import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'descrption', type: 'varchar' })
  descrption: string;

  @Column({ name: 'date', type: 'timestamp' })
  date: Timestamp;

  @Column({ name: 'hour', type: 'time' })
  hour: string;

  @Column({ name: 'time', type: 'time' })
  time: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Timestamp;
}
