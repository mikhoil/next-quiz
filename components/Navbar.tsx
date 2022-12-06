import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IParams } from '../interfaces';
import { useAppSelector } from '../store/hooks';

export const Navbar: React.FC<{ length: number }> = ({ length }) => {
    const { testId = 0 } = useRouter().query as IParams;
    const { questionsStatuses } = useAppSelector(state => state.resultReducer);
    return (
        <nav className={'w-[100px] flex flex-col items-center'}>
            {Array.from({ length }).map((_, index) => {
                const { isAnswered, timeout } = questionsStatuses.find(
                    ({ id }) => index + 1 === +id
                )!;
                return (
                    <div key={index}>
                        <div className="w-[34px] text-center h-6 text-lg">
                            {!isAnswered && timeout > 0 ? (
                                <Link href={`/${testId}/${index + 1}`}>
                                    {index + 1}
                                </Link>
                            ) : (
                                <div className="text-[#BDBDBD]">
                                    {index + 1}
                                </div>
                            )}
                        </div>
                        {index < length - 1 && <hr className="my-3" />}
                    </div>
                );
            })}
        </nav>
    );
};
