import { Prisma } from "@prisma/client";

export class TimeLog implements Prisma.TimeLogCreateInput{
    id : number;
    startTime : Date;
    endTime? : Date;
    duration?: string;
}