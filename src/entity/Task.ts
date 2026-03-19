import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    task: string;

    @Column()
    isCompleted: boolean;

    @ManyToMany(() => User, (user) => user.tasks)
    users: User[];
}
