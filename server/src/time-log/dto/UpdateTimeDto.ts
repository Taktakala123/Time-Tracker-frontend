import { ApiProperty } from "@nestjs/swagger";

export class UpdateTimeDto {
    
  @ApiProperty({ required: true })
  id?: Number;

  @ApiProperty({ required: true })
  startTime?: Date;

  @ApiProperty({ required: true })
  endTime?: Date;

  @ApiProperty({ required: true })
  duration?: string;
  }