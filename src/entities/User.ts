import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserTask } from './UserTask';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @ManyToOne(() => UserTask, (userTask) => userTask.task)
    userTasks: UserTask[];
}
