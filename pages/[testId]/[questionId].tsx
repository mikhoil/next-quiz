import { GetServerSideProps } from 'next';
import { IParams, Test } from '../../interfaces';
import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { LongButton } from '../../components/LongButton/LongButton';
import { SecondaryButton } from '../../components/SecondaryButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import connect2db from '../../lib/mongodb';
import { Default } from '../../components/Default';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAnswer, addPoint } from '../../store/slices/resultSlice';
import { QuestionTimer } from '../../components/QuestionTimer';
import { TimerContext } from '../_app';
import { useContext } from 'react';

export function undercut<T>(arr: T[], index: number): T[] {
    return arr.slice(index).concat(arr.slice(0, index));
}

export type Input = {
    answer: string;
};

export default function QuestionPage({ tests }: { tests: Test[] }) {
    const setIsCounting = useContext(TimerContext)[1];
    const { questionsStatuses } = useAppSelector(state => state.resultReducer);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, isValid },
    } = useForm<Input>();
    const { query, push } = useRouter();
    const { questionId, testId } = query as IParams;
    const test = tests.find(test => testId === test._id.toString());
    if (!test) return <Default />;
    const { questions } = test;
    const question = questions.find(({ id }) => id === questionId);
    if (!question) return <Default />;
    const { text, answers } = question;
    const { timeout } = questionsStatuses.find(({ id }) => id === questionId)!;
    const onSubmit: SubmitHandler<Input> = ({ answer }) => {
        dispatch(addAnswer({ id: questionId }));
        reset();
        if (answers.find(({ isRight }) => isRight)?.content === answer)
            dispatch(addPoint());
        if (
            questionsStatuses.every(
                ({ isAnswered, timeout }) => isAnswered || timeout === 0
            )
        ) {
            push(`/${testId}/results`);
            setIsCounting(false);
        } else
            push(
                `/${testId}/${
                    undercut(questionsStatuses, +questionId).find(
                        ({ isAnswered, timeout }) => !isAnswered && timeout > 0
                    )?.id
                }`
            );
    };
    if (
        questionsStatuses.every(
            ({ isAnswered, timeout }) => isAnswered || timeout === 0
        )
    ) {
        push(`/${testId}/results`);
        setIsCounting(false);
    }
    if (timeout === 0)
        push(
            `/${testId}/${
                undercut(questionsStatuses, +questionId).find(
                    ({ isAnswered, timeout }) => !isAnswered && timeout > 0
                )?.id
            }`
        );

    return (
        <div>
            <Head>
                <title>Вопрос №{questionId}</title>
            </Head>
            <Layout length={questions.length} {...test!}>
                <QuestionTimer questionId={questionId} />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={
                        'w-[824px] h-[374px] m-[262px_470px_324px_546px] flex flex-col justify-between'
                    }
                >
                    <div className={'flex flex-col items-center'}>
                        <p
                            className={
                                'text-lg w-[650px] text-center mb-[60px]'
                            }
                        >
                            {text}
                        </p>
                        <div className={'h-[124px] m-0 grid grid-cols-2 gap-6'}>
                            {answers.map(({ content }, index) => (
                                <LongButton
                                    key={index}
                                    text={text}
                                    isDisable={false}
                                    id={`${index}`}
                                    content={content}
                                    register={register}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={'flex self-end'}>
                        <div className={'mr-6'}>
                            <SecondaryButton
                                text="ПРОПУСТИТЬ"
                                onClick={() => {
                                    push(
                                        `/${testId}/${
                                            undercut(
                                                questionsStatuses,
                                                +questionId
                                            ).find(
                                                ({ isAnswered, timeout }) =>
                                                    !isAnswered && timeout > 0
                                            )?.id
                                        }`
                                    );
                                    reset();
                                }}
                            />
                        </div>
                        <SecondaryButton
                            text={'ОТВЕТИТЬ'}
                            isDisabled={!isDirty || !isValid}
                            type={'submit'}
                        />
                    </div>
                </form>
            </Layout>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => ({
    props: {
        tests: JSON.parse(
            JSON.stringify(
                await (await connect2db()).db
                    .collection('tests')
                    .find({})
                    .toArray()
            )
        ) as Test[],
    },
});
