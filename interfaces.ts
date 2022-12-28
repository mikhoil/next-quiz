import { ParsedUrlQuery } from 'querystring';

export interface Answer {
    content: string;
}

export interface RightAnswer {
    content: string;
    id: string;
}

export interface Question {
    id: string;
    text: string;
    answers: string[];
    timeout: number;
    allTime: number;
}

export interface Test {
    questions: Question[];
    answers: RightAnswer[];
    _id: number;
    term: string;
    timeout: number;
    results: number[];
}

export interface IParams extends ParsedUrlQuery {
    testId: string;
    questionId: string;
}
