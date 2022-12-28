import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IResultState {
    result: number;
    questionsStatuses: {
        id: string;
        isAnswered: boolean;
        timeout: number;
        allTime: number;
        userAnswer: string;
        isRight: boolean | null;
    }[];
}

const initialState: IResultState = {
    result: 0,
    questionsStatuses: [],
};

const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        addAnswer(
            state,
            {
                payload: { id, content, isRight },
            }: PayloadAction<{
                id: string;
                content: string;
                isRight: boolean;
            }>
        ) {
            if (isRight) state.result++;
            state.questionsStatuses = state.questionsStatuses.map(question =>
                question.id === id
                    ? {
                          ...question,
                          isAnswered: true,
                          userAnswer: content,
                          isRight,
                      }
                    : question
            );
        },
        zeroing(
            state,
            { payload: { timeouts } }: PayloadAction<{ timeouts: number[] }>
        ) {
            state.result = 0;
            state.questionsStatuses = timeouts.map((timeout, index) => ({
                id: `${index + 1}`,
                isAnswered: false,
                timeout,
                allTime: timeout,
                userAnswer: '',
                isRight: null,
            }));
        },
        minusSecond(state, { payload: { id } }: PayloadAction<{ id: string }>) {
            state.questionsStatuses = state.questionsStatuses.map(question =>
                question.id === id
                    ? {
                          ...question,
                          timeout:
                              question.timeout >= 1 ? question.timeout - 1 : 0,
                      }
                    : question
            );
        },
    },
});

export const { zeroing, addAnswer, minusSecond } = resultSlice.actions;
export default resultSlice.reducer;
