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

const word = (n: number) => faker.lorem.words(n);

const snippets: ISnippet[] = [
  {
    id: faker.random.uuid(),
    title: `${word(1)}`,
    body: faker.lorem.sentence(10),
    lane: LaneType.Snippet,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    title: `${word(1)}`,
    body: faker.lorem.sentence(10),
    lane: LaneType.Snippet,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    title: `${word(1)}`,
    body: faker.lorem.sentence(10),
    lane: LaneType.Snippet,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    title: `${faker.lorem.words(1)}`,
    body: faker.lorem.sentence(10),
    lane: LaneType.Snippet,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    title: faker.lorem.words(1),
    body: faker.lorem.sentence(10),
    lane: LaneType.Snippet,
    tags: [`${word(1)}`, `${word(1)}`],
  },
];

export const getSnippets = createFakeGetCall(snippets);
