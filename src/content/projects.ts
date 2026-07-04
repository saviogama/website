export type Project = {
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "WEBSITE",
    description: "A portfolio controlled through typed commands.",
    technologies: ["Vite", "React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/saviogm/website",
    featured: true,
  },
];
