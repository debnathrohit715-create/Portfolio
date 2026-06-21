export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technicalSpecs: string[];
  imageSrc: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
