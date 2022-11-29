import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IParams } from "../interfaces";

export const Navbar: React.FC<{ length: number }> = ({ length }) => {
  const { testId = 0 } = useRouter().query as IParams;
  return (
    <nav className={"w-[100px] flex flex-col items-center"}>
      {Array.from({ length }).map((_, index) => (
        <div key={index}>
          <div className="w-[34px] text-center h-6 text-lg">
            <Link href={`/${testId}/${index + 1}`}>{index + 1}</Link>
          </div>
          {index < length - 1 && <hr className="my-3" />}
        </div>
      ))}
    </nav>
  );
};
