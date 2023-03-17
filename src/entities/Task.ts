import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";

@Entity("tasks")
class Task {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 40 })
  title: string;

  @Column({ default: false })
  checked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;
}

export default Task;