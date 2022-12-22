import { FC, useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { minusSecond } from '../store/slices/resultSlice';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export const QuestionTimer: FC<{ questionId: string }> = ({ questionId }) => {
    const dispatch = useAppDispatch();
    const { timeout, allTime } = useAppSelector(
        state => state.resultReducer
    ).questionsStatuses.find(({ id }) => id === questionId)!;
    const minutes = useMemo(
        () =>
            Math.floor(timeout / 60)
                .toString()
                .padStart(2, '0'),
        [timeout]
    );
    const seconds = useMemo(
        () => (timeout - +minutes * 60).toString().padStart(2, '0'),
        [timeout, minutes]
    );
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(minusSecond({ id: questionId }));
        }, 1000);
        return () => clearInterval(interval);
    }, [questionId, dispatch]);
    return (
        <>
            <div className="mx-auto text-center mt-[120px] mb-[-120px]">
                <span className="text-2xl">
                    {minutes}:{seconds}
                </span>
            </div>
        </>
    );
};
