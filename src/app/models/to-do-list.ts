import { Task } from "./task";

export class ToDoList {
    id: number;
    createdOn: Date;
    tasks: Task[];

    constructor(id: number, createdOn: Date, tasks: Task[]) {
        this.id = id;
        this.createdOn = createdOn;
        this.tasks = tasks;
    }
}