import { Controller, Get, Post, Put, Param ,Req,Body } from '@nestjs/common';
import { TimeLogService } from './time-log.service';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger'; 
import { TimeLog } from './time-log.model';
@Controller('') 
@ApiTags('Time Triker') 
export class TimeLogController {
    constructor(private readonly timeLogService: TimeLogService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Get all time logs' })
    async findAll() {
        return this.timeLogService.findAll();
    }

    @Post('start')
    @ApiResponse({ status: 201, description: 'Start a new time log' })
    async startNewTimeLog(){
        return this.timeLogService.startNew();
    }

    @Put('stop/:id')
    @ApiParam({ name: 'id', description: 'Time log ID' })
    @ApiResponse({ status: 200, description: 'Stop a time log by ID' })

    async stopTimeLog(@Param('id') id: number){
        return this.timeLogService.stopTimeLog(id);
    }
}
 