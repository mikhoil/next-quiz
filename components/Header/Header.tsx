import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

export const Header: React.FC<{ children: string }> = ({ children }) => {
  const {
    query: { questionId },
  } = useRouter();
  return (
    <div
      className={
        "border-b border-solid border-[#e0e0e0] h-32 flex flex-col justify-center"
      }
    >
      <div className={"flex justify-between"}>
        <div className={"flex items-center"}>
          <div className={"flex h-12 ml-8 items-center"}>
            <Image src="/header/question.svg" width={48} height={48} alt="" />
            <div className={"text-[#006666] font-medium text-2xl ml-[9px]"}>
              {questionId ?? 0}/20
            </div>
          </div>
          <div className={"flex items-center ml-7"}>
            <Image src={"/header/time.svg"} alt="" width={48} height={48} />
            <div className={"text-[#006666] font-normal text-2xl ml-[6px]"}>
              60:00
            </div>
          </div>
          <h3
            className={
              "w-[824px] h-6 text-center ml-[217px] text-[#828282] uppercase"
            }
          >
            {children}
          </h3>
        </div>
        <div className={"mr-[30px]"}>
          <Image src={"/header/logo.svg"} alt="" width={64} height={67} />
        </div>
      </div>
    </div>
  );
};
