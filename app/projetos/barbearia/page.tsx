import type { Metadata } from "next";
import ProjectDetail from "../ProjectDetail";
import { projectMetadata, projects } from "../project-data";

const project = projects.barbearia;

export function generateMetadata(): Promise<Metadata> {
  return projectMetadata(project);
}

export default function BarbeariaProjectPage() {
  return <ProjectDetail project={project} />;
}
