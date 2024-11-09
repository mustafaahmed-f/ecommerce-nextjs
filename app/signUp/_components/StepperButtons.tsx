import { useFormStatus } from "react-dom";

interface StepperButtonsProps {}

function StepperButtons({}: StepperButtonsProps) {
  const { pending } = useFormStatus();
  return <div></div>;
}

export default StepperButtons;
