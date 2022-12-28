import React from 'react';
import { useAppSelector } from '../store/hooks';

export const Results = () => {
    const { questionsStatuses } = useAppSelector(state => state.resultReducer);
    return (
        <div
            className={`h-[${
                questionsStatuses.length * 50
            }px] flex flex-col justify-around`}
        >
            {questionsStatuses.map(({ id, userAnswer, isRight }) => (
                <div key={id} className="text-lg">
                    {id}.{' '}
                    <span
                        className={`opacity-${isRight ? 100 : 60} text-${
                            isRight ? 'green' : 'red'
                        }-500`}
                    >
                        {userAnswer ? userAnswer : 'нет ответа'}
                    </span>
                </div>
            ))}
        </div>
    );
};
