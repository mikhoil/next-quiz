import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Default } from '../../components/Default';
import { TimerContext } from '../_app';
import { IParams, Test } from '../../interfaces';
import connect2db from '../../lib/mongodb';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { zeroing } from '../../store/slices/resultSlice';
import { Layout } from '../../components/Layout';

const Results: NextPage<{ tests: Test[] }> = ({ tests }) => {
    const setIsCounting = useContext(TimerContext)[1];
    const dispatch = useAppDispatch();
    const { query, push } = useRouter();
    const { testId } = query as IParams;
    const test = tests.find(({ _id }) => _id.toString() === testId);
    const { result } = useAppSelector(state => state.resultReducer);
    if (!test) return <Default />;
    const { questions, _id } = test;
    return (
        <>
            <Head>
                <title>Результаты</title>
            </Head>
            <Layout length={questions.length} {...test}>
                <div className="flex flex-col items-center jus">
                    <div className="text-2xl text-center mt-10">
                        Ваш результат: {result}/{questions.length}
                    </div>
                    <button
                        className="mt-10"
                        onClick={() => {
                            push(`/${_id}/1`);
                            dispatch(
                                zeroing({
                                    timeouts: questions.map(
                                        ({ timeout }) => timeout
                                    ),
                                })
                            );
                            setIsCounting(true);
                        }}
                    >
                        Пройти заново
                    </button>
                </div>
            </Layout>
        </>
    );
};

export default Results;

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
