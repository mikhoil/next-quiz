import styles from '../styles/SecondaryButton.module.scss';

interface ISecondaryProps {
    isDisabled?: boolean;
    text: string;
    type?: 'submit' | undefined;
    onClick?: () => void;
}

export const SecondaryButton: React.FC<ISecondaryProps> = ({
    isDisabled = false,
    text,
    type,
    onClick,
}) => {
    const { secondary, defaultBtn, secondaryDisabled } = styles;
    return (
        <button
            type={type ?? 'button'}
            className={
                isDisabled ? secondaryDisabled : defaultBtn + ' ' + secondary
            }
            onClick={onClick}
        >
            {text}
        </button>
    );
};
