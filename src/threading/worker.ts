import { Message } from "./message";
import { Queue } from "./queue";

export class ThreadingWorker {
    private queue: Queue
    private workerId: number

    constructor(workerId: number, queue: Queue) {
        this.queue = queue
        this.workerId = workerId
    }

    Work = async (callback: (message: Message) => Promise<void>): Promise<void> => {
        while (true) {
            const message = this.queue.Dequeue(this.workerId)
            if (!message) {
                break
            }
            await callback(message)
            this.queue.Confirm(this.workerId, message.id)
        }
    }
}
