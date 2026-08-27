import type { Metadata } from "next";
import ProjectDetail from "../ProjectDetail";
import { projectMetadata, projects } from "../project-data";

const project = projects.pizzaria;

export function generateMetadata(): Promise<Metadata> {
  return projectMetadata(project);
}

export default function PizzariaProjectPage() {
  return <ProjectDetail project={project} />;
}
