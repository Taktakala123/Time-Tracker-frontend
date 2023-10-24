import { Module } from '@nestjs/common';
import { TimeLogService } from './time-log.service';
import { TimeLogController } from './time-log.controller';
import { PrismaService } from "src/prisma.service";
@Module({
  providers: [TimeLogService,PrismaService],
  controllers: [TimeLogController],
  exports:[TimeLogService]
})
export class TimeLogModule {}
