import { ClientsModule } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

// To load env files on start:
dotenv.config();

export default ClientsModule.register([])
