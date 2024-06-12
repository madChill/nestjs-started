/* eslint-disable no-restricted-syntax */
import { promisify } from 'util';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ManagementServiceDto } from './management.interface';
class ManagementService {
  public managementServiceGrpc: ManagementServiceDto;
  constructor() {
    const packageDefinition = protoLoader.loadSync('src/proto/user.proto', {
      keepCase: true,
      longs: String,
      enums: String,
      arrays: true,
    });
    const usersPackage = grpc.loadPackageDefinition(packageDefinition);
    const { UserService } = usersPackage.user as any
    const client = new UserService(
      process.env.MANAGEMENT_SERVICE,
      grpc.credentials.createInsecure(),
    );

    const promisifyAll = (c) => {
      const to = {};
      for (const k in c) {
        if (typeof c[k] === 'function') {
          to[k] = promisify(c[k].bind(c));
        }
      }
      return to;
    };
    this.managementServiceGrpc = promisifyAll(client) as any
  }
}
export default new ManagementService();