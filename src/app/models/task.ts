export class Task {
    id: number;
    name: string;
    complete: boolean;
    toDoListId: number;

    constructor(id: number, name: string, complete: boolean, toDoListId: number){
        this.id = id;
        this.name = name;
        this.complete = complete;
        this.toDoListId = toDoListId
    }
}