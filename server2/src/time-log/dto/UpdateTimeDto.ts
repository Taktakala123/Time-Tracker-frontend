import { ApiProperty } from "@nestjs/swagger";

export class UpdateTimeDto {
    
  @ApiProperty({ required: true })
  id?: Number;

  @ApiProperty({ required: true })
  StartTime?: Date;

  @ApiProperty({ required: true })
  EndTime?: Date;

  @ApiProperty({ required: true })
  duration?: string;
  }