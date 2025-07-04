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
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <Card className={cn("bg-transparent shadow-none border-none", cardClassName)}>
          {title && (
            <CardHeader className={cn("text-center mb-8 p-0", headerClassName)}>
              <CardTitle className={cn("text-3xl font-bold text-foreground tracking-tight", titleClassName)}>{title}</CardTitle>
              {description && <CardDescription className={cn("mt-3 text-lg max-w-2xl mx-auto text-muted-foreground", descriptionClassName)}>{description}</CardDescription>}
            </CardHeader>
          )}
          <CardContent className={cn("p-0", contentClassName)}>
            {children}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
