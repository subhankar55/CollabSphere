import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId:"collabsphere",
    brokers:["kafka:9092"]
});

export default kafka;