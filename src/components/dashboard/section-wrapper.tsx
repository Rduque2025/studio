import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

interface SectionWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  contentClassName?: string;
}

export function SectionWrapper({ title, description, children, className, cardClassName, contentClassName }: SectionWrapperProps) {
  return (
    <section className={className}>
      <Card className={cardClassName}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className={contentClassName}>
          {children}
        </CardContent>
      </Card>
    </section>
  );
}
