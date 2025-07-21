
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';

export interface EventHighlightProps {
  icon: LucideIcon;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
}

export function EventHighlightCard({ icon: Icon, title, date, description, imageUrl, dataAiHint }: EventHighlightProps) {
  return (
    <Card className="relative overflow-hidden rounded-2xl group border-none shadow-lg h-96">
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        data-ai-hint={dataAiHint}
        className="transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg w-fit mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <Badge variant="secondary" className="w-fit mb-2 bg-white/20 text-white backdrop-blur-sm">
          {date}
        </Badge>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-white/80 mt-1">{description}</CardDescription>
      </div>
    </Card>
  );
}
