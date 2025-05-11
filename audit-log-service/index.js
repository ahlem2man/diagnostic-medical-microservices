const { Kafka } = require('kafkajs');
const connectDB = require('./db');
const DiagnosisLog = require('./models/DiagnosisLog');

//  Connexion MongoDB
connectDB();

const kafka = new Kafka({
  clientId: 'audit-log-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'audit-log-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'diagnosis_topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const parsed = JSON.parse(message.value.toString());
      console.log('[AUDIT] New diagnosis logged:', parsed);

      //  Sauvegarde dans MongoDB
      try {
        await DiagnosisLog.create({
          symptoms: parsed.symptoms,
          diagnosis: parsed.diagnosis,
          date: parsed.date,
        });
        console.log(' Log saved to MongoDB');
      } catch (err) {
        console.error(' Error saving to MongoDB:', err);
      }
    },
  });
};

run().catch(console.error);
