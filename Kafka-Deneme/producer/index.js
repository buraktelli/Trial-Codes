const { Kafka, logLevel, Partitioners } = require('kafkajs')

console.log('Producer');

const producer = async () => {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092'],
        logLevel: logLevel.ERROR
    })
    // const MyPartitioner = () => {
    //     return ({ topic, partitionMetadata, message }) => {
    //         // console.log(topic);
    //         // console.log(partitionMetadata);
    //         // console.log(message);
    //         // select a partition based on some logic
    //         // return the partition number
    //         return 1
    //     }
    // }
    // const producer = kafka.producer({ createPartitioner: MyPartitioner })
    const producer = kafka.producer({ createPartitioner: Partitioners.JavaCompatiblePartitioner })

    await producer.connect()
    setInterval(async () => {
        console.log('SENT');
        await producer.send({
            topic: 'test-topic1',
            messages: [
                { value: `Topic 1!` },
            ],
            partitions: [{
                partition: 555
            }]
        })
        await producer.send({
            topic: 'test-topic2',
            messages: [
                { value: `Topic 2!` },
            ],
        })
        await producer.send({
            topic: 'test-topic3',
            messages: [
                { value: `Topic 3!` },
            ],
        })
        await producer.send({
            topic: 'test-topic4',
            messages: [
                { value: `Topic 4!` },
            ],
        })
        await producer.send({
            topic: 'test-topic5',
            messages: [
                { value: `Topic 5!` },
            ],
        })
        await producer.send({
            topic: 'test-topic6',
            messages: [
                { value: `Topic 6!` },
            ],
        })

    }, 2000);

    // await producer.disconnect()

}
producer()