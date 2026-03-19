import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('Tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    task: string;

    @Column()
    isCompleted: boolean;

    @Column()
    hasBeenShown: boolean;

    @ManyToMany(() => User, (user) => user.tasks)
    users: User[];
}
