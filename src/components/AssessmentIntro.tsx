import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Target, Users, Lightbulb, Zap } from 'lucide-react';

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

const AssessmentIntro: React.FC<AssessmentIntroProps> = ({ onStartAssessment }) => {
  const successTraits = [
    { icon: Brain, label: "Analytical mindset", description: "Think logically and systematically" },
    { icon: Target, label: "Detail orientation", description: "Focus on accuracy and precision" },
    { icon: TrendingUp, label: "Data curiosity", description: "Love finding patterns in data" },
    { icon: Users, label: "Communication skills", description: "Translate insights to stakeholders" },
    { icon: Lightbulb, label: "Critical thinking", description: "Question assumptions and dig deeper" },
    { icon: Zap, label: "Tech comfort", description: "Embrace new tools and systems" }
  ];

  const careerPaths = [
    "Business Intelligence Analyst",
    "Data Analyst", 
    "Reporting Analyst",
    "Analytics Consultant",
    "BI Developer"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Master Assessment Framework
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Am I Ready to Become a{' '}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Business Intelligence Analyst?
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover whether you're psychologically, technically, and cognitively ready to pursue 
            a career in Business Intelligence. Get personalized insights and tailored learning guidance.
          </p>
        </div>

        {/* What is a BI Analyst */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="w-6 h-6 text-primary" />
              What is a Business Intelligence Analyst?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              A Business Intelligence Analyst collects, analyzes, and transforms data into actionable 
              insights to help organizations make informed decisions. They work with databases, 
              visualization tools, and reporting systems to uncover trends and opportunities.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Typical Career Paths:</h4>
                <div className="space-y-2">
                  {careerPaths.map((career, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {career}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Assessment Duration:</h4>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Badge variant="secondary">25-30 minutes</Badge>
                  <span>•</span>
                  <span>Comprehensive evaluation</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Traits */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Brain className="w-6 h-6 text-assessment-secondary" />
              Traits That Typically Succeed in This Field
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {successTraits.map((trait, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <trait.icon className="w-5 h-5 text-assessment-primary mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-foreground">{trait.label}</h5>
                    <p className="text-sm text-muted-foreground">{trait.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Overview */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Assessment Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Psychometric Evaluation</h4>
                <p className="text-sm text-muted-foreground">
                  Assess personality alignment, motivation, and psychological fit for BI work
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-assessment-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-assessment-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Technical Aptitude</h4>
                <p className="text-sm text-muted-foreground">
                  Evaluate readiness to learn BI tools, SQL, analytics, and technical concepts
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-assessment-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-assessment-tertiary" />
                </div>
                <h4 className="font-semibold mb-2">WISCAR Framework</h4>
                <p className="text-sm text-muted-foreground">
                  Comprehensive analysis of Will, Interest, Skill, Cognitive ability, and Real-world fit
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onStartAssessment}
            className="text-lg px-8 py-4"
          >
            Start Your Assessment
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Get personalized insights and career guidance in 25-30 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;