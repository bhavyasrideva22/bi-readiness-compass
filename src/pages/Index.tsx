import React, { useState } from 'react';
import AssessmentIntro from '@/components/AssessmentIntro';
import PsychometricSection from '@/components/PsychometricSection';
import AssessmentResults from '@/components/AssessmentResults';

type AssessmentStep = 'intro' | 'psychometric' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro');
  const [psychometricScores, setPsychometricScores] = useState<Record<string, number>>({});

  const handleStartAssessment = () => {
    setCurrentStep('psychometric');
  };

  const handlePsychometricComplete = (scores: Record<string, number>) => {
    setPsychometricScores(scores);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    setPsychometricScores({});
  };

  const handleBackToIntro = () => {
    setCurrentStep('intro');
  };

  return (
    <div>
      {currentStep === 'intro' && (
        <AssessmentIntro onStartAssessment={handleStartAssessment} />
      )}
      
      {currentStep === 'psychometric' && (
        <PsychometricSection 
          onComplete={handlePsychometricComplete}
          onBack={handleBackToIntro}
        />
      )}
      
      {currentStep === 'results' && (
        <AssessmentResults 
          psychometricScores={psychometricScores}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
