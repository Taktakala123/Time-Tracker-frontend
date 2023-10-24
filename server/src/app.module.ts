import { Module } from '@nestjs/common';
import { TimeLogModule } from './time-log/time-log.module';


@Module({
  imports: [TimeLogModule],
  controllers: [],
})
export class AppModule {}
