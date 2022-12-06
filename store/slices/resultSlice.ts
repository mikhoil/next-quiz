import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IResultState {
    result: number;
    questionsStatuses: {
        id: string;
        isAnswered: boolean;
        timeout: number;
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
        addPoint: state => {
            state.result++;
        },
        addAnswer(
            state,
            {
                payload: { id },
            }: PayloadAction<{
                id: string;
            }>
        ) {
            state.questionsStatuses = state.questionsStatuses.map(question =>
                question.id === id
                    ? { ...question, isAnswered: true }
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
                isTimeUp: false,
                timeout,
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

export const { addPoint, zeroing, addAnswer, minusSecond } =
    resultSlice.actions;
export default resultSlice.reducer;
