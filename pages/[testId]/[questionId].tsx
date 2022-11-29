import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { IParams, Test } from "../../interfaces";
import Head from "next/head";
import { Layout } from "../../components/Layout";
import { LongButton } from "../../components/LongButton";
import { SecondaryButton } from "../../components/SecondaryButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import connect2db from "../../lib/mongodb";
import { Default } from "../../components/Default";

function getNextNum(f: number, length: number) {
  let res = (f + 1) % (length + 1);
  return res ? res : res + 1;
}

export type Input = {
  answer: string;
};

export default function QuestionPage({ tests }: { tests: Test[] }) {
  const { register, handleSubmit, reset } = useForm<Input>();
  const { query, push } = useRouter();
  const { questionId, testId } = query as IParams;
  const test = tests.find((test) => testId === test._id.toString());
  if (!test) return <Default />;
  const { questions, term } = test;
  const question = questions.find(({ id }) => id === questionId);
  if (!question) return <Default />;
  const { text, answers } = question;
  const onSubmit: SubmitHandler<Input> = ({ answer }) => {
    answers.find(({ isRight }) => isRight)?.content === answer
      ? push(`/${testId}/${getNextNum(+questionId, questions.length)}`)
      : alert("НЕПРРРРРРРРРРРАВИЛЬНО!");
    reset();
  };
  return (
    <div>
      <Head>
        <title>Вопрос №{questionId}</title>
      </Head>
      <Layout length={questions.length} term={term}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={
            "w-[824px] h-[374px] m-[262px_470px_324px_546px] flex flex-col justify-between"
          }
        >
          <div className={"flex flex-col items-center"}>
            <p className={"text-lg w-[650px] text-center mb-[60px]"}>{text}</p>
            <div className={"h-[124px] m-0 grid grid-cols-2 gap-6"}>
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
          <div className={"flex self-end"}>
            <div className={"mr-6"}>
              <SecondaryButton text="ПРОПУСТИТЬ" isDisabled />
            </div>
            <SecondaryButton
              text={"ОТВЕТИТЬ"}
              isDisabled={false}
              type={"submit"}
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
        await (await connect2db()).db.collection("tests").find({}).toArray()
      )
    ) as Test[],
  },
});
