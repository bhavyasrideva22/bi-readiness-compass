import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Brain, 
  TrendingUp, 
  Target,
  BookOpen,
  ArrowRight,
  Star
} from 'lucide-react';

interface AssessmentResultsProps {
  psychometricScores: Record<string, number>;
  onRestart: () => void;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ 
  psychometricScores, 
  onRestart 
}) => {
  // Calculate overall readiness score
  const overallScore = Math.round(
    Object.values(psychometricScores).reduce((sum, score) => sum + score, 0) / 
    Object.values(psychometricScores).length
  );

  const getScoreInterpretation = (score: number) => {
    if (score >= 80) return { level: 'Strong', color: 'success', icon: CheckCircle };
    if (score >= 50) return { level: 'Moderate', color: 'warning', icon: AlertTriangle };
    return { level: 'Developing', color: 'destructive', icon: XCircle };
  };

  const getOverallRecommendation = (score: number) => {
    if (score >= 70) {
      return {
        recommendation: 'Yes - You\'re Ready!',
        description: 'You show strong alignment for a BI Analyst career. Your psychological profile suggests you have the right mindset and interests to succeed.',
        icon: CheckCircle,
        color: 'success'
      };
    } else if (score >= 50) {
      return {
        recommendation: 'Maybe - With Preparation',
        description: 'You have potential but may benefit from developing certain areas before fully committing to this career path.',
        icon: AlertTriangle,
        color: 'warning'
      };
    } else {
      return {
        recommendation: 'Consider Alternatives',
        description: 'Your current profile suggests exploring other career paths might be more suitable. Consider the alternative roles suggested below.',
        icon: XCircle,
        color: 'destructive'
      };
    }
  };

  const dimensionLabels = {
    interest: 'Interest & Curiosity',
    personality: 'Personality Fit',
    cognitive: 'Cognitive Style',
    motivation: 'Motivation & Drive',
    mindset: 'Growth Mindset'
  };

  const nextSteps = overallScore >= 70 ? [
    { step: 'Excel Mastery', description: 'Master pivot tables, formulas, and data analysis' },
    { step: 'SQL Basics', description: 'Learn SELECT, JOIN, WHERE, and GROUP BY operations' },
    { step: 'BI Tools', description: 'Start with Power BI or Tableau fundamentals' },
    { step: 'Dashboard Design', description: 'Practice creating clear, actionable visualizations' }
  ] : [
    { step: 'Explore Alternatives', description: 'Consider UX Research or Operations Analysis' },
    { step: 'Build Foundation', description: 'Strengthen analytical thinking through courses' },
    { step: 'Gain Experience', description: 'Work on data-related projects in your current role' },
    { step: 'Reassess', description: 'Retake this assessment after 6 months of development' }
  ];

  const alternativeRoles = [
    { role: 'UX Researcher', overlap: 'Medium', description: 'User-focused analysis with qualitative methods' },
    { role: 'Operations Analyst', overlap: 'High', description: 'Process improvement with less technical depth' },
    { role: 'Marketing Analyst', overlap: 'High', description: 'Campaign tracking and performance metrics' },
    { role: 'Product Analyst', overlap: 'High', description: 'Product usage and feature analysis' }
  ];

  const overall = getOverallRecommendation(overallScore);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Overall Result */}
        <Card className="mb-8 shadow-soft">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                overall.color === 'success' ? 'bg-success/10' :
                overall.color === 'warning' ? 'bg-warning/10' : 'bg-destructive/10'
              }`}>
                <overall.icon className={`w-8 h-8 ${
                  overall.color === 'success' ? 'text-success' :
                  overall.color === 'warning' ? 'text-warning' : 'text-destructive'
                }`} />
              </div>
            </div>
            <CardTitle className="text-2xl mb-2">Your BI Readiness Assessment</CardTitle>
            <Badge 
              variant={overall.color === 'success' ? 'default' : 'secondary'}
              className="text-lg px-4 py-2"
            >
              {overall.recommendation}
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="text-4xl font-bold text-foreground mb-2">{overallScore}%</div>
              <p className="text-muted-foreground">Overall Readiness Score</p>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {overall.description}
            </p>
          </CardContent>
        </Card>

        {/* Dimension Scores */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Psychometric Evaluation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(psychometricScores).map(([dimension, score]) => {
                const interpretation = getScoreInterpretation(score);
                return (
                  <div key={dimension}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">
                        {dimensionLabels[dimension as keyof typeof dimensionLabels]}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={interpretation.color === 'success' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {interpretation.level}
                        </Badge>
                        <span className="font-semibold">{score}%</span>
                      </div>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-assessment-secondary" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-border">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{step.step}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alternative Roles */}
        {overallScore < 70 && (
          <Card className="mb-8 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-assessment-tertiary" />
                Alternative Career Paths to Consider
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {alternativeRoles.map((role, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{role.role}</h4>
                      <Badge variant="outline">{role.overlap} Overlap</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="text-center space-y-4">
          <Button 
            variant="assessment" 
            size="lg"
            className="mr-4"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Get Learning Plan
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onRestart}
          >
            Retake Assessment
          </Button>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              <Star className="w-4 h-4 inline mr-1" />
              This assessment is part of the "Am I Ready to Become a [Role]?" series. 
              Results are for guidance only and should be combined with real-world experience and career counseling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;