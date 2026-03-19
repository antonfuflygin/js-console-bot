import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTask } from './UserTask';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    task: string;

    @ManyToOne(() => UserTask, (userTask) => userTask.user)
    userTasks: UserTask[];
}
