import { ParsedUrlQuery } from 'querystring';

export interface Answer {
    content: string;
    isRight: boolean;
}

export interface Question {
    id: string;
    text: string;
    answers: Answer[];
    timeout: number;
    allTime: number;
}

export interface Test {
    questions: Question[];
    _id: number;
    term: string;
    timeout: number;
    results: number[];
}

export interface IParams extends ParsedUrlQuery {
    testId: string;
    questionId: string;
}
