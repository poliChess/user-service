import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader'

let client = null;

const init = () => {
  const packageDefinition = protoLoader.loadSync(
    __dirname + '/service.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const proto = grpc.loadPackageDefinition(packageDefinition).api;

  client = new proto.ServiceDiscovery('discovery-service:3000', grpc.credentials.createInsecure());
}

const register = (serviceName, serviceAddr) => {
  if (client === null)
    init();

  const payload = {
    serviceName,
    serviceAddr,
  };

  client.Register(payload, (err, res) => {
    if (err !== null) {
      console.warn(err);
      return setTimeout(() => register(serviceName, serviceAddr), 1000);
    }

    if (!res.success) {
      console.warn(res.message);
      return setTimeout(() => register(serviceName, serviceAddr), 1000);
    }
  })
}

export default { register }
