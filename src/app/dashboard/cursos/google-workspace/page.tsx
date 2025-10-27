
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const workspaceTools = [
    {
      title: "Google Slides",
      description: "Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros",
      bgColor: "bg-amber-500",
      textColor: "text-white",
      href: "/dashboard/cursos/google-slides"
    },
    {
      title: "Google Appscript",
      description: "Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros",
      bgColor: "bg-red-500",
      textColor: "text-white",
      href: "#"
    },
    {
      title: "Google Sites",
      description: "Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros",
      bgColor: "bg-blue-600",
      textColor: "text-white",
      href: "/dashboard/cursos/google-sites"
    },
    {
      title: "Google Sheets",
      description: "Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros",
      bgColor: "bg-green-600",
      textColor: "text-white",
      href: "/dashboard/cursos/google-sheets"
    },
]

export default function GoogleWorkspacePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto text-xs">
          <Link href="/dashboard/cursos" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver a Actívate</span>
          </Link>
        </Button>
      </div>

      <Card className="bg-sky-100/50 rounded-2xl shadow-sm mb-8">
        <CardHeader className="flex flex-row items-center justify-between p-8">
          <div>
            <CardTitle className="text-3xl font-bold text-foreground">Google Workspace</CardTitle>
            <CardDescription className="text-muted-foreground mt-2 max-w-md">
              Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros
            </CardDescription>
          </div>
          <div className="w-24 h-24 relative">
             <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Google_Workspace_Logo.svg/2560px-Google_Workspace_Logo.svg.png" alt="Google Workspace Logo" layout="fill" objectFit="contain" />
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workspaceTools.map((tool) => (
          <Link href={tool.href} key={tool.title} className="group">
            <Card className={`${tool.bgColor} ${tool.textColor} rounded-2xl shadow-lg h-full flex flex-col justify-between transition-transform group-hover:scale-[1.02]`}>
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold">{tool.title}</h3>
                <p className="mt-2 text-sm max-w-sm opacity-90">{tool.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
