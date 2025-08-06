import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Brain, ArrowRight, ArrowLeft } from 'lucide-react';

interface PsychometricQuestion {
  id: string;
  text: string;
  dimension: string;
  scale: 'likert' | 'choice';
  options: string[];
}

interface PsychometricSectionProps {
  onComplete: (scores: Record<string, number>) => void;
  onBack: () => void;
}

const psychometricQuestions: PsychometricQuestion[] = [
  {
    id: 'interest_1',
    text: 'I enjoy analyzing patterns and trends in data.',
    dimension: 'interest',
    scale: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'interest_2', 
    text: 'I find it satisfying to solve complex problems using data.',
    dimension: 'interest',
    scale: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'personality_1',
    text: 'I prefer working with facts and concrete information rather than abstract concepts.',
    dimension: 'personality',
    scale: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'personality_2',
    text: 'I am naturally detail-oriented and thorough in my work.',
    dimension: 'personality',
    scale: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'cognitive_1',
    text: 'When approaching a problem, I prefer to:',
    dimension: 'cognitive',
    scale: 'choice',
    options: [
      'Break it down into logical steps and analyze systematically',
      'Look for creative solutions and think outside the box',
      'Rely on intuition and past experience',
      'Seek input from others before deciding'
    ]
  },
  {
    id: 'motivation_1',
    text: 'What motivates you most about working with data?',
    dimension: 'motivation',
    scale: 'choice',
    options: [
      'The intellectual challenge of solving problems',
      'The potential to impact business decisions',
      'Job security and stable career prospects',
      'The prestige of being a data professional'
    ]
  },
  {
    id: 'motivation_2',
    text: 'I am willing to continuously learn new tools and technologies.',
    dimension: 'motivation',
    scale: 'likert',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'mindset_1',
    text: 'When I encounter a difficult challenge, I usually:',
    dimension: 'mindset',
    scale: 'choice',
    options: [
      'See it as an opportunity to grow and learn',
      'Feel frustrated but push through',
      'Look for easier alternatives',
      'Seek help immediately'
    ]
  }
];

const PsychometricSection: React.FC<PsychometricSectionProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [psychometricQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < psychometricQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate scores
      const scores = calculatePsychometricScores(answers);
      onComplete(scores);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const calculatePsychometricScores = (answers: Record<string, string>) => {
    const dimensionScores: Record<string, number[]> = {};
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = psychometricQuestions.find(q => q.id === questionId);
      if (!question) return;
      
      let score = 0;
      if (question.scale === 'likert') {
        score = question.options.indexOf(answer) + 1; // 1-5 scale
      } else {
        // For choice questions, assign scores based on BI-relevant answers
        score = getChoiceScore(questionId, answer);
      }
      
      if (!dimensionScores[question.dimension]) {
        dimensionScores[question.dimension] = [];
      }
      dimensionScores[question.dimension].push(score);
    });

    // Average scores per dimension and convert to 0-100 scale
    const finalScores: Record<string, number> = {};
    Object.entries(dimensionScores).forEach(([dimension, scores]) => {
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      finalScores[dimension] = Math.round((average / 5) * 100); // Convert to 0-100
    });

    return finalScores;
  };

  const getChoiceScore = (questionId: string, answer: string): number => {
    // Scoring logic for choice questions based on BI analyst fit
    const scoringMap: Record<string, Record<string, number>> = {
      'cognitive_1': {
        'Break it down into logical steps and analyze systematically': 5,
        'Look for creative solutions and think outside the box': 3,
        'Rely on intuition and past experience': 2,
        'Seek input from others before deciding': 3
      },
      'motivation_1': {
        'The intellectual challenge of solving problems': 5,
        'The potential to impact business decisions': 4,
        'Job security and stable career prospects': 2,
        'The prestige of being a data professional': 1
      },
      'mindset_1': {
        'See it as an opportunity to grow and learn': 5,
        'Feel frustrated but push through': 3,
        'Look for easier alternatives': 1,
        'Seek help immediately': 2
      }
    };

    return scoringMap[questionId]?.[answer] || 3;
  };

  const progress = ((currentQuestion + 1) / psychometricQuestions.length) * 100;
  const question = psychometricQuestions[currentQuestion];
  const currentAnswer = answers[question.id];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Progress Header */}
      <div className="bg-card border-b border-border py-4 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Psychometric Evaluation</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {psychometricQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Question {currentQuestion + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-6">
                {question.text}
              </h3>
            </div>

            <RadioGroup 
              value={currentAnswer || ''} 
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentQuestion === 0 ? 'Back to Intro' : 'Previous'}
              </Button>
              
              <Button 
                variant="assessment"
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex items-center gap-2"
              >
                {currentQuestion === psychometricQuestions.length - 1 ? 'Complete Section' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PsychometricSection;