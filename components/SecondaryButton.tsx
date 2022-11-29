import styles from "../styles/SecondaryButton.module.scss";

interface ISecondaryProps {
  isDisabled: boolean;
  text: string;
  type?: "submit" | undefined;
}

export const SecondaryButton: React.FC<ISecondaryProps> = ({
  isDisabled,
  text,
  type,
}) => {
  const { secondary, defaultBtn, secondaryDisabled } = styles;
  return (
    <button
      type={type ?? "button"}
      className={isDisabled ? secondaryDisabled : defaultBtn + " " + secondary}
    >
      {text}
    </button>
  );
};
