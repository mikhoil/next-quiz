import styles from '../styles/LongButton.module.scss';
import { UseFormRegister } from 'react-hook-form';
import type { Input } from '../../pages/[testId]/[questionId]';

interface LongButtonProps {
    isDisable: boolean;
    content: string;
    id: string;
    text: string;
    register: UseFormRegister<Input>;
}

export const LongButton: React.FC<LongButtonProps> = ({
    isDisable,
    content,
    id,
    text,
    register,
}) => {
    const {
        longButton,
        defaultButton,
        radioButton,
        formRadio,
        longButtonDisabled,
    } = styles;
    return (
        <div
            className={
                formRadio +
                ' ' +
                (isDisable ? longButtonDisabled : longButton) +
                ' ' +
                defaultButton
            }
        >
            <input
                type="radio"
                id={'radio' + id}
                className={radioButton}
                disabled={isDisable}
                value={content}
                {...register('answer')}
            />
            <label htmlFor={'radio' + id}>
                <span>{content}</span>
            </label>
        </div>
    );
};
