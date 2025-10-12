'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Send, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';
import { askAdvisor, getFAQs, type AdvisorInput } from '@/app/actions/advisor';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  confidence?: number;
  sources?: string[];
  followUpQuestions?: string[];
}

export const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string; category: string }>>([]);
  const [showFAQs, setShowFAQs] = useState(false);

  React.useEffect(() => {
    // Load FAQs
    getFAQs().then(setFaqs);
  }, []);

  const handleSubmit = async (question?: string) => {
    const messageText = question || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const advisorInput: AdvisorInput = {
        question: messageText,
        context: {
          userRole: 'farmer',
          recentActivity: messages.slice(-3).map((m) => m.content),
        },
      };

      const response = await askAdvisor(advisorInput);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        confidence: response.confidence,
        sources: response.sources,
        followUpQuestions: response.followUpQuestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUp = (question: string) => {
    handleSubmit(question);
  };

  const groupedFAQs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Main Chat Interface */}
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Advisor</CardTitle>
          </div>
          <CardDescription>
            Ask questions about your crops, analysis results, or how to use the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto p-4 border rounded-lg bg-muted/20">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  No messages yet. Ask me anything about Chip to Crop!
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      'How do I upload images?',
                      'What crops can you analyze?',
                      'How do I interpret confidence scores?',
                    ].map((q) => (
                      <Button
                        key={q}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSubmit(q)}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border'
                    }`}
                  >
                    <div className="text-sm">
                      {message.role === 'assistant' ? (
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      ) : (
                        message.content
                      )}
                    </div>
                    {message.confidence !== undefined && (
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Confidence: {Math.round(message.confidence * 100)}%
                        </Badge>
                      </div>
                    )}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        Sources: {message.sources.join(', ')}
                      </div>
                    )}
                    {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                      <div className="mt-3 space-y-1">
                        <p className="text-xs font-medium">Follow-up questions:</p>
                        {message.followUpQuestions.map((q, idx) => (
                          <Button
                            key={idx}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-left h-auto py-1 px-2"
                            onClick={() => handleFollowUp(q)}
                          >
                            <HelpCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                            <span className="text-xs">{q}</span>
                          </Button>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-background border rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className="min-h-[60px]"
              disabled={isLoading}
            />
            <Button onClick={() => handleSubmit()} disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>

          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertDescription>
              Tip: Be specific in your questions for better answers. You can ask about image analysis,
              crop diseases, platform features, or best practices.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* FAQ Sidebar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(groupedFAQs).map(([category, questions]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-sm font-medium">
                  {category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {questions.map((faq, idx) => (
                      <div key={idx} className="space-y-1">
                        <button
                          onClick={() => handleSubmit(faq.question)}
                          className="text-xs font-medium text-primary hover:underline text-left"
                        >
                          {faq.question}
                        </button>
                        <p className="text-xs text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};
