import { LaneType, ISnippet } from "../types";
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

const snippets: ISnippet[] = [
  {
    id: faker.random.uuid(),
    title: faker.lorem.words(1),
    body: faker.lorem.sentence(10),
    lane: LaneType.Snippet,
  },
  {
    id: faker.random.uuid(),
    title: faker.lorem.words(1),
    body: faker.lorem.sentence(10),
    lane: LaneType.Snippet,
  },
  {
    id: faker.random.uuid(),
    title: faker.lorem.words(1),
    body: faker.lorem.sentence(10),
    lane: LaneType.Draft,
  },
  {
    id: faker.random.uuid(),
    title: faker.lorem.words(1),
    body: faker.lorem.sentence(10),
    lane: LaneType.Draft,
  },
  {
    id: faker.random.uuid(),
    title: faker.lorem.words(1),
    body: faker.lorem.sentence(10),
    lane: LaneType.Draft,
  },
];

export const getSnippets = createFakeGetCall(snippets);
