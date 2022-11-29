import React, { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Header } from "./Header/Header";
import { useRouter } from "next/router";
import Image from "next/image";

export const Layout: React.FC<{
  length: number;
  term: string;
  children: ReactNode;
}> = ({ length, term, children }) => {
  const { back } = useRouter();
  return (
    <div className="flex">
      <div style={{ boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.06)" }}>
        <div className={"h-32 flex justify-center items-center"}>
          <div onClick={back}>
            <Image src="/layout/back.svg" alt="" width={10} height={18} />
          </div>
        </div>
        <Navbar length={length} />
      </div>
      <div>
        <Header>{term}</Header>
        <main>{children}</main>
      </div>
    </div>
  );
};
