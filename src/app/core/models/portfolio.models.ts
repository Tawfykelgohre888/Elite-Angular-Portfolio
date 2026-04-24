export interface Skill {
  readonly name: string;
  readonly category: 'frontend' | 'state' | 'styling' | 'tools' | 'practice';
  readonly level: number; // 0-100
  readonly accent: string; // tailwind class hint
}

export interface ExperienceItem {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly location: string;
  readonly type: 'experience' | 'education' | 'course';
  readonly highlights: readonly string[];
  readonly tags: readonly string[];
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly tagline: string;
  readonly period: string;
  readonly description: string;
  readonly tech: readonly string[];
  readonly highlights: readonly string[];
  readonly accent: 'violet' | 'cyan' | 'pink';
}

export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly tagline: string;
  readonly summary: string;
  readonly email: string;
  readonly phone: string;
  readonly location: string;
  readonly github: string;
  readonly linkedin: string;
  readonly languages: readonly { name: string; level: string }[];
}

export interface ContactPayload {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export interface ContactResult {
  readonly success: boolean;
  readonly id: string;
  readonly receivedAt: string;
}
