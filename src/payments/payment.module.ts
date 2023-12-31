
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.sevice';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
