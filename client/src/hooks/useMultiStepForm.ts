import { ReactNode, useState } from 'react';

export const useMultiStepForm = (steps: ReactNode[]) => {
  const [stepIndex, setStepIndex] = useState(0);

  const nextStep = () => {
    setStepIndex(prevIndex => {
      if (prevIndex >= steps.length - 1) return prevIndex;

      return prevIndex + 1;
    });
  };

  const prevStep = () => {
    setStepIndex(prevIndex => {
      if (prevIndex === 0) return prevIndex;

      return prevIndex - 1;
    });
  };

  return {
    crrStep: steps[stepIndex],
    nextStep,
    prevStep,
    isFirstStep: stepIndex === 0,
    isLastStep: stepIndex === steps.length - 1,
  };
};
