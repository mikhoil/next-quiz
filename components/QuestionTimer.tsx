import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { minusSecond } from '../store/slices/resultSlice';

export const QuestionTimer: FC<{ questionId: string }> = ({ questionId }) => {
    const dispatch = useAppDispatch();
    const { timeout } = useAppSelector(
        state => state.resultReducer
    ).questionsStatuses.find(({ id }) => id === questionId)!;
    const minutes = Math.floor(timeout / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (timeout - +minutes * 60).toString().padStart(2, '0');
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(minusSecond({ id: questionId }));
        }, 1000);
        return () => clearInterval(interval);
    }, [questionId, dispatch]);
    return (
        <div className="mx-auto text-center mt-[120px] mb-[-120px]">
            <span className="text-2xl">
                {minutes}:{seconds}
            </span>
        </div>
    );
};
