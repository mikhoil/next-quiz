import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Default } from '../../components/Default';
import { Layout } from '../../components/Layout';
import connect2db from '../../lib/mongodb';
import { Test } from '../../interfaces';
import { IParams } from '../../interfaces';
import { useAppDispatch } from '../../store/hooks';
import { zeroing } from '../../store/slices/resultSlice';
import { useContext } from 'react';
import { TimerContext } from '../_app';

const Index: NextPage<{ tests: Test[] }> = ({ tests }) => {
    const setIsCounting = useContext(TimerContext)[1];
    const dispatch = useAppDispatch();
    const { query, push } = useRouter();
    const { testId } = query as IParams;
    const test = tests.find(({ _id }) => _id.toString() === testId);
    if (!test) return <Default />;
    const { questions, _id, term } = test;
    return (
        <>
            <title>Тест &quot;{term}&quot;</title>
            <Layout length={questions.length} {...test}>
                <button
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
                    Приступить к тесту
                </button>
            </Layout>
        </>
    );
};

export default Index;

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
