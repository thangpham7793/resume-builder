import { LaneType, ISnippet } from "../types";
import faker from "faker";

function createFakeGetCall<T>(values: T[]) {
  return async () => {
    return new Promise<T[]>((resolve, reject) => {
      try {
        setTimeout(() => resolve(values), 0);
      } catch (error) {
        reject(error);
      }
    });
  };
}

export const word = (n: number) => faker.lorem.words(n);

const snippets: ISnippet[] = [
  {
    id: faker.random.uuid(),
    body: faker.lorem.sentence(10),
    lane: LaneType.Snippet,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    body: faker.lorem.sentence(10),
    lane: LaneType.Snippet,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    body: faker.lorem.sentence(10),
    lane: LaneType.Draft,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    body: faker.lorem.sentence(10),
    lane: LaneType.Draft,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    body: faker.lorem.sentence(10),
    lane: LaneType.Snippet,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    body: faker.lorem.sentence(10),
    lane: LaneType.Draft,
    tags: [`${word(1)}`, `${word(1)}`],
  },
];

export const getSnippets = createFakeGetCall(snippets);
