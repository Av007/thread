import { Database, Message, Operations, Queue, ThreadingWorker } from "./src/index"
import { getRandomIntInRange, range, sleep } from "./src/utils/util"


const ITEMS_NUMBER = getRandomIntInRange(3,6)
const WORKERS_NUMBER = getRandomIntInRange(3,6)

const ITEMS = range(ITEMS_NUMBER).map((item: number) => `item${item}`) 

const applyToAll = (queue: Queue, operation: Operations, val: number): void => {
    for (const product of ITEMS) {
        queue.Enqueue(new Message(
            product,
            operation,
            val
        ))
    }
}

const main = async () => {
    console.log(`Number of items:${ITEMS_NUMBER}`)
    console.log(`Number of workers:${WORKERS_NUMBER}`)
    const db = new Database()
    const queue = new Queue()
    applyToAll(queue, Operations.SET, 50)
    for (let i = 0; i < 10; i++) {
        applyToAll(queue, Operations.ADD, i)
    }
    range(WORKERS_NUMBER).forEach(i => {
        const worker = new ThreadingWorker(i, queue)
        worker.Work(db.set)
    })
    await sleep(10000)
    console.log("Queue size: ", queue.Size())
    console.log("DB state:\n", JSON.stringify(db.state(), null, 4))
}

main().catch(error => {
    console.error("Error during application bootstrap:", error);
    process.exit(1);
});
