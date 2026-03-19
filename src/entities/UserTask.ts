import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Task } from './Task';

@Entity('user_tasks')
export class UserTask {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    taskId: number;

    @ManyToOne(() => User, (user) => user.userTasks, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Task, (task) => task.userTasks, { onDelete: 'CASCADE' })
    task: Task;

    @Column()
    isCompleted: boolean;
}
