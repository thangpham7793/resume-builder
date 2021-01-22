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
    body: `Thang Pham 
    21 Whitaker Place, 
    Grafton 1010, Auckland
    0210 868 2380 
    thangnus@gmail.com
    5 Jan 2021
    Dear Hiring Manager,
    I’m writing to apply for the Graduate Developer position, as advertised on SEEK.  
    `,
    lane: LaneType.Snippet,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    body: `Thank you for considering my application. I look forward to hearing from you.
    Yours sincerely
    Thang Pham`,
    lane: LaneType.Snippet,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    body: `All in all, I believe I can quickly integrate and become a productive team member. I’m also very excited at the chance to craft digital solutions for different sectors with diverse needs.`,
    lane: LaneType.Draft,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    body: `I’ve worked with teammates from diverse backgrounds using agile practices like sprint planning and daily standups. I can use Git to do merges, rebasing, conflict resolution, etc. I also use Bitbucket, Jira, and Confluence on a daily basis.
    `,
    lane: LaneType.Draft,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    body: `As an intern junior developer at Mentemia’s agile team since November, I have deployed two features to production: mobile app notifications around subscription expiry and changes, and an API endpoint to automatically activate premium subscription when customers link their account.
    `,
    lane: LaneType.Snippet,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    body: `I have personal projects using React, Redux, React-Router and other common libraries, have a fair grasp of basic design patterns in React like Container-Component and Higher-Order Component, and can confidently use React’s standard hooks or write custom ones.`,
    lane: LaneType.Draft,
    tags: [`${word(1)}`, `${word(1)}`],
  },
  {
    id: faker.random.uuid(),
    body: `I have developed JavaScript applications ever since I started programming, and am comfortable with Node’s event-driven architecture, Javascript’s OOP and functional design patterns, ES6/Typescript and Express.`,
    lane: LaneType.Draft,
    tags: [`${word(1)}`, `${word(1)}`],
  },
];

export const getSnippets = createFakeGetCall(snippets);
