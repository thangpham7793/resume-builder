import { LaneType, SingleTicket } from "../types";
import faker from "faker";

function createFakeGetCall<T>(values: T[]) {
  return async () => {
    return new Promise<T[]>((resolve, reject) => {
      try {
        setTimeout(() => resolve(values), 2000);
      } catch (error) {
        reject(error);
      }
    });
  };
}

const tickets: SingleTicket[] = [
  {
    id: faker.random.uuid(),
    title: faker.lorem.words(1),
    body: faker.lorem.sentence(10),
    lane: LaneType.DONE,
  },
  {
    id: faker.random.uuid(),
    title: faker.lorem.words(1),
    body: faker.lorem.sentence(10),
    lane: LaneType.TODO,
  },
  {
    id: faker.random.uuid(),
    title: faker.lorem.words(1),
    body: faker.lorem.sentence(10),
    lane: LaneType.IN_PROGRES,
  },
  {
    id: faker.random.uuid(),
    title: faker.lorem.words(1),
    body: faker.lorem.sentence(10),
    lane: LaneType.REVIEW,
  },
  {
    id: faker.random.uuid(),
    title: faker.lorem.words(1),
    body: faker.lorem.sentence(10),
    lane: LaneType.REVIEW,
  },
];

export const getTickets = createFakeGetCall(tickets);
