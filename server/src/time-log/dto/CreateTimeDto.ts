import { ApiProperty } from "@nestjs/swagger";

export class CreateTimeDto {

  @ApiProperty({ required: true })
  id: Number;

  @ApiProperty({ required: true })
  startTime: Date;

  @ApiProperty({ required: false })
  endTime?: Date;

  @ApiProperty({ required: false })
  duration?: string;
}