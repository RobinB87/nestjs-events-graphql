import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { AttendeesService } from './attendees.service';

@Controller('events/:eventId/attendees')
@SerializeOptions({ strategy: 'excludeAll' })
export class EventAttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.attendeesService.findByEventId(eventId);
  }
}
