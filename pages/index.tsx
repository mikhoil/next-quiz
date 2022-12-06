import type { NextPage, GetServerSideProps } from 'next';
import { Test } from '../interfaces';
import connect2db from '../lib/mongodb';
import Link from 'next/link';

const Home: NextPage<{ tests: Test[] }> = ({ tests }) => {
    return (
        <>
            <title>Выбор теста</title>
            <div>
                {tests?.map(({ _id, term }) => (
                    <div key={_id}>
                        <Link href={`/${_id}`}>{term}</Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;

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
