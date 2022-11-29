import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Default } from "../../components/Default";
import { Layout } from "../../components/Layout";
import connect2db from "../../lib/mongodb";
import { Test } from "../../interfaces";
import { IParams } from "../../interfaces";

const Index: NextPage<{ tests: Test[] }> = ({ tests }) => {
  const { query, push } = useRouter();
  const { testId } = query as IParams;
  const test = tests.find(({ _id }) => _id.toString() === testId);
  if (!test) return <Default />;
  const {
    questions: { length },
    term,
    _id,
  } = test;
  return (
    <>
      <Layout length={length} term={term}>
        <button onClick={() => push(`/${_id}/1`)}>Приступить к тесту!</button>
      </Layout>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    tests: JSON.parse(
      JSON.stringify(
        await (await connect2db()).db.collection("tests").find({}).toArray()
      )
    ) as Test[],
  },
});
