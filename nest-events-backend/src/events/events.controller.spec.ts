import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { ListEvents } from './inputs/list.events';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: EventsService;
  let eventsRepository: Repository<Event>;

  beforeAll(() => console.log('logged once for the "group"'));
  beforeEach(() => {
    // before every test in GROUP
    eventsService = new EventsService(eventsRepository);
    eventsController = new EventsController(eventsService);
  });

  it('should return a list of events', async () => {
    const result = {
      first: 1,
      last: 1,
      limit: 10,
      data: [],
    };

    // mock option 1
    // eventsService.getEventsWithAttendeeCountFilteredPaginated = jest
    //   .fn()
    //   .mockImplementation((): any => result);

    // using spy
    const spy = jest
      .spyOn(eventsService, 'getEventsWithAttendeeCountFilteredPaginated')
      .mockImplementation((): any => result);

    expect(await eventsController.findAll(new ListEvents())).toEqual(result);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException when deleting event that is not found', async () => {
    const findSpy = jest
      .spyOn(eventsService, 'findOne')
      .mockImplementation(() => undefined);
    const deleteSpy = jest.spyOn(eventsService, 'deleteEvent');

    // try {
    //   await eventsController.remove(0, new User());
    // } catch (error) {
    //   expect(error).toBeInstanceOf(NotFoundException);
    // }

    // or better:
    await expect(eventsController.remove(0, new User())).rejects.toThrow(
      NotFoundException,
    );

    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledTimes(0);
  });

  //   it('should throw ForbiddenException when trying to delete event that is not organized by self', async () => {
  //     const validEvent = { id: 1, organizerId: 456 };
  //     const findSpy = jest
  //       .spyOn(eventsService, 'findOne')
  //       .mockResolvedValue(() => new Event({ id: 1, name: 'some event' }));
  //   });
});
