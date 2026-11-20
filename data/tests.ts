// data/tests.ts
export type TestSummary = {
  id: string;
  name: string;
  description: string;
  numberOfTasks: number;
};

export const TESTS: TestSummary[] = [
  {
    id: 'history',
    name: 'Historia',
    description: 'Rzym, Grecja i wszystko pomiędzy',
    numberOfTasks: 3,
  },
  {
    id: 'geography',
    name: 'Geografia',
    description: 'Stolice, rzeki, szczyty',
    numberOfTasks: 3,
  },
  {
    id: 'cs',
    name: 'Informatyka',
    description: 'Sieci, systemy, języki',
    numberOfTasks: 3,
  },
];

export function findTest(id: string): TestSummary | undefined {
  return TESTS.find((test) => test.id === id);
}
