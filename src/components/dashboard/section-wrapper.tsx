import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string; 
}

export function SectionWrapper({ title, description, children, className, cardClassName, contentClassName, headerClassName, titleClassName, descriptionClassName }: SectionWrapperProps) {
  return (
    <section className={className}>
      <Card className={cn("bg-transparent shadow-none border-none", cardClassName)}>
        {title && (
          <CardHeader className={headerClassName}>
            <CardTitle className={cn("text-2xl font-semibold text-primary", titleClassName)}>{title}</CardTitle>
            {description && <CardDescription className={cn("text-secondary", descriptionClassName)}>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className={contentClassName}>
          {children}
        </CardContent>
      </Card>
    </section>
  );
}
