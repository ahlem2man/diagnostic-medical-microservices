const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { getDiagnosis } = require('./diagnosisService');

const PROTO_PATH = './diagnosis.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const diagnosisProto = grpc.loadPackageDefinition(packageDefinition).diagnosis;

function GetDiagnosis(call, callback) {
  const symptoms = call.request.symptoms;
  const result = getDiagnosis(symptoms);
  callback(null, { result });
}

const server = new grpc.Server();
server.addService(diagnosisProto.DiagnosisService.service, { GetDiagnosis });

const PORT = '0.0.0.0:50051';
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Error binding server:', err);
    return;
  }
  console.log(`Diagnosis gRPC server running at ${PORT}`);
  
});
