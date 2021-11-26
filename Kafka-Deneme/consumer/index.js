const { Kafka, logLevel } = require('kafkajs')

console.log('Consumer');

const consumer = async () => {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092'],
        logLevel: logLevel.ERROR
    })
    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic1', fromBeginning: true })
    await consumer.subscribe({ topic: 'test-topic2', fromBeginning: true })
    await consumer.subscribe({ topic: 'test-topic3', fromBeginning: true })
    await consumer.subscribe({ topic: 'test-topic4', fromBeginning: true })
    await consumer.subscribe({ topic: 'test-topic5', fromBeginning: true })
    await consumer.subscribe({ topic: 'test-topic6', fromBeginning: true })

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                topic,
                value: message.value.toString(),
            })
        },
    })
}
consumer()
