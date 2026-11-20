// data/tasks.ts
export type Answer = {
  content: string;
  isCorrect: boolean;
};

export type Task = {
  question: string;
  answers: Answer[];
  /** Seconds allowed for this question. */
  duration: number;
};

export const TASKS_BY_TEST: Record<string, Task[]> = {
  history: [
    {
      question: 'Który wódz prowadził wojnę domową z Sullą?',
      duration: 30,
      answers: [
        { content: 'Lucjusz Cynna', isCorrect: true },
        { content: 'Juliusz Cezar', isCorrect: false },
        { content: 'Lucjusz Murena', isCorrect: false },
        { content: 'Marek Krassus', isCorrect: false },
      ],
    },
    {
      question: 'W którym roku odbyła się bitwa pod Grunwaldem?',
      duration: 20,
      answers: [
        { content: '1385', isCorrect: false },
        { content: '1410', isCorrect: true },
        { content: '1444', isCorrect: false },
        { content: '1525', isCorrect: false },
      ],
    },
    {
      question: 'Kto był pierwszym koronowanym królem Polski?',
      duration: 20,
      answers: [
        { content: 'Mieszko I', isCorrect: false },
        { content: 'Bolesław Chrobry', isCorrect: true },
        { content: 'Kazimierz Odnowiciel', isCorrect: false },
        { content: 'Władysław Łokietek', isCorrect: false },
      ],
    },
  ],
  geography: [
    {
      question: 'Jakie miasto jest stolicą Australii?',
      duration: 20,
      answers: [
        { content: 'Sydney', isCorrect: false },
        { content: 'Melbourne', isCorrect: false },
        { content: 'Canberra', isCorrect: true },
        { content: 'Perth', isCorrect: false },
      ],
    },
    {
      question: 'Która rzeka jest najdłuższa w Polsce?',
      duration: 15,
      answers: [
        { content: 'Odra', isCorrect: false },
        { content: 'Warta', isCorrect: false },
        { content: 'Wisła', isCorrect: true },
        { content: 'Bug', isCorrect: false },
      ],
    },
    {
      question: 'Najwyższy szczyt Tatr to:',
      duration: 20,
      answers: [
        { content: 'Rysy', isCorrect: false },
        { content: 'Gerlach', isCorrect: true },
        { content: 'Łomnica', isCorrect: false },
        { content: 'Świnica', isCorrect: false },
      ],
    },
  ],
  cs: [
    {
      question: 'Która warstwa modelu OSI odpowiada za trasowanie pakietów?',
      duration: 25,
      answers: [
        { content: 'Warstwa łącza danych', isCorrect: false },
        { content: 'Warstwa sieciowa', isCorrect: true },
        { content: 'Warstwa transportowa', isCorrect: false },
        { content: 'Warstwa sesji', isCorrect: false },
      ],
    },
    {
      question: 'Co zwraca dzielenie 1 / 0 w JavaScripcie?',
      duration: 20,
      answers: [
        { content: 'NaN', isCorrect: false },
        { content: 'null', isCorrect: false },
        { content: 'Infinity', isCorrect: true },
        { content: 'Rzuca wyjątek RangeError', isCorrect: false },
      ],
    },
    {
      question: 'Jaką domyślną wartość ma flexDirection w React Native?',
      duration: 20,
      answers: [
        { content: 'row', isCorrect: false },
        { content: 'column', isCorrect: true },
        { content: 'row-reverse', isCorrect: false },
        { content: 'stretch', isCorrect: false },
      ],
    },
  ],
};

export function getTasksForTest(testId: string): Task[] {
  return TASKS_BY_TEST[testId] ?? [];
}
