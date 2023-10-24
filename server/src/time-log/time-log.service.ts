import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma.service";
import { TimeLog } from './time-log.model';

@Injectable()
export class TimeLogService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<TimeLog[]> {
        return this.prisma.timeLog.findMany();
    }

    async startNew() {
        const createdTimeLog = await this.prisma.timeLog.create({
            data: {
                StartTime: new Date(),
            },
            
        });
        return createdTimeLog;
    }
    

    async stopTimeLog(id: number){
        const existingTimeLog = await this.prisma.timeLog.findUnique({
            where: { id: Number(id) },
        });
    
        const endTime = new Date();
        const startTime = existingTimeLog.StartTime; // Assuming StartTime is a property of the model instance
        const durationMillis = endTime.getTime() - startTime.getTime(); // Difference in milliseconds
    
        // Convert milliseconds to hh:mm:ss format
        const hours = Math.floor(durationMillis / 3600000);
        const minutes = Math.floor((durationMillis % 3600000) / 60000);
        const seconds = Math.floor((durationMillis % 60000) / 1000);
        const formattedDuration = `${hours}:${minutes}:${seconds}`;
    
        await this.prisma.timeLog.update({
            where: { id: Number(id) },
            data: {
                EndTime: endTime,
                duration: formattedDuration,
            },
        });
    
        const updatedTimeLog = await this.prisma.timeLog.findUnique({
            where: { id: Number(id) },
        });
    
        return updatedTimeLog; 
    }
    
}
