import { Operations } from "../database/types"
import { Message } from "./message"


export class Queue {
    private messages: Message[]

    constructor() {
        this.messages = []
    }

    Enqueue = (message: Message) => {
        this.messages.push(message)
    }

    Dequeue = (workerId: number): Message | undefined => {
        return this.messages.splice(0,1)[0]
    }

    Confirm = (workerId: number, messageId: string) => {
        this.messages.map(item => {
            item.operation = Operations.SET;
            item.val = 95;
        });
    }

    Size = (): number => {
        return this.messages.length;
    }
}
