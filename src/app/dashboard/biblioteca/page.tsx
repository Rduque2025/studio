
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Import Badge

const mockDocuments = [
  { id: "doc1", title: "Manual de Procedimientos Internos", category: "Manuales", size: "2.5 MB", type: "PDF" },
  { id: "doc2", title: "Política de Ética y Conducta", category: "Políticas", size: "1.2 MB", type: "PDF" },
  { id: "doc3", title: "Guía de Inducción para Nuevos Empleados", category: "Guías", size: "3.0 MB", type: "PDF" },
  { id: "doc4", title: "Presentación Corporativa Q1 2025", category: "Presentaciones", size: "5.8 MB", type: "PPTX" },
  { id: "doc5", title: "Informe Anual de Sostenibilidad 2024", category: "Informes", size: "4.1 MB", type: "PDF" },
];


export default function BibliotecaPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Biblioteca Digital"
        description="Acceda a documentos, manuales, políticas y otros recursos importantes de la organización."
      >
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Buscar documentos..." className="pl-10" />
          </div>
          <Button>Buscar</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDocuments.map(doc => (
            <Card key={doc.id} className="transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <Badge variant={doc.type === 'PDF' ? 'destructive' : 'secondary'}>{doc.type}</Badge>
                </div>
                <CardTitle className="text-base font-semibold leading-tight h-12 overflow-hidden">{doc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-1">Categoría: {doc.category}</p>
                <p className="text-xs text-muted-foreground">Tamaño: {doc.size}</p>
              </CardContent>
              <div className="p-4 border-t">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Descargar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
