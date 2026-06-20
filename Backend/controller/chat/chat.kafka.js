import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId:"collabsphere",
    brokers:["localhost:9092"]
});

export default kafka;