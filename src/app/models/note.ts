export class Note {
    id: number;
    title: string;
    content: string;
    createdOn: Date;

    constructor(id: number, title: string, content: string, createdOn: Date){
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdOn = createdOn;
    }
}