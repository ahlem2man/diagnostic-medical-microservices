const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { Kafka } = require('kafkajs');

const PROTO_PATH = __dirname + '/../diagnosis.proto';

// gRPC setup
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const diagnosisProto = grpc.loadPackageDefinition(packageDefinition).diagnosis;

const client = new diagnosisProto.DiagnosisService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Kafka setup
const kafka = new Kafka({
  clientId: 'symptom-service',
  brokers: ['localhost:9092']
});
const producer = kafka.producer();

exports.getDiagnosis = async (symptoms) => {
  return new Promise(async (resolve, reject) => {
    client.GetDiagnosis({ symptoms }, async (err, response) => {
      if (err) {
        reject(err);
      } else {
        try {
          await producer.connect();
          await producer.send({
            topic: 'diagnosis_topic',
            messages: [
              {
                value: JSON.stringify({
                  event: 'diagnosis.created',
                  source: 'symptom-service',
                  payload: {
                    symptoms,
                    diagnosis: response.result
                  },
                  timestamp: new Date().toISOString()
                })
                
              },
            ],
          });
          await producer.disconnect();

          resolve(response); 
        } catch (e) {
          reject(e);
        }
      }
    });
  });
};
