import { Prisma } from "@prisma/client";

export class TimeLog implements Prisma.TimeLogCreateInput{
    id : number;
    StartTime : Date;
    EndTime? : Date;
    duration?: string;
}