import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './Task';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @ManyToMany(() => Task, (task) => task.users)
    @JoinTable({
        name: 'user_tasks',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'task_id',
            referencedColumnName: 'id',
        },
    })
    tasks: Task[];
}
