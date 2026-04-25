import { Injectable, computed, signal } from "@angular/core";
import {
  ExperienceItem,
  Profile,
  Project,
  Skill,
} from "../models/portfolio.models";

/**
 * Portfolio domain state — exposes Signals as the single source of truth.
 * No RxJS Subjects; data is static + immutable, mutations would happen
 * via signal `update()` if we ever extend.
 */
@Injectable({ providedIn: "root" })
export class PortfolioService {
  private readonly _profile = signal<Profile>({
    name: "Tawfik Abdelrahman Elgohare",
    title: " Frontend Developer",
    tagline: "Crafting cinematic, signal-driven interfaces with Angular.",
    summary:
      "Results-oriented Angular Frontend Developer with a proven track record building diverse web applications — E-commerce platforms, Educational systems, and ERP solutions. I transform complex business requirements into seamless digital experiences using Angular (v14+), RxJS, NgRx, and the latest Signal-based primitives.",
    email: "tawfykelgohre8@gmail.com",
    phone: "01000606725",
    location: "Cairo, Egypt",
    github: "github.com/Tawfykelgohre888",
    linkedin: "linkedin.com/in/tawfik-elgohre",
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Fair" },
    ],
  });

  private readonly _skills = signal<readonly Skill[]>([
    { name: "Angular", category: "frontend", level: 92, accent: "violet" },
    { name: "TypeScript", category: "frontend", level: 90, accent: "violet" },
    {
      name: "JavaScript (ES6+)",
      category: "frontend",
      level: 88,
      accent: "violet",
    },
    { name: "HTML5", category: "frontend", level: 95, accent: "violet" },
    { name: "CSS3", category: "frontend", level: 92, accent: "violet" },

    { name: "RxJS", category: "state", level: 85, accent: "cyan" },
    { name: "NgRx", category: "state", level: 82, accent: "cyan" },
    { name: "Angular Signals", category: "state", level: 80, accent: "cyan" },
    { name: "Reactive Forms", category: "state", level: 88, accent: "cyan" },

    { name: "Tailwind CSS", category: "styling", level: 90, accent: "pink" },
    { name: "Bootstrap", category: "styling", level: 85, accent: "pink" },
    {
      name: "Angular Material",
      category: "styling",
      level: 80,
      accent: "pink",
    },
    { name: "PrimeNG", category: "styling", level: 78, accent: "pink" },
    {
      name: "Responsive Design",
      category: "styling",
      level: 92,
      accent: "pink",
    },

    { name: "Git & GitHub", category: "tools", level: 88, accent: "violet" },
    { name: "Azure DevOps", category: "tools", level: 75, accent: "violet" },
    { name: "Jira", category: "tools", level: 80, accent: "violet" },
    { name: "Nx Monorepo", category: "tools", level: 80, accent: "violet" },
    { name: "REST APIs", category: "tools", level: 87, accent: "violet" },
    { name: "GraphQL", category: "tools", level: 70, accent: "violet" },
    { name: "Interceptors", category: "tools", level: 85, accent: "violet" },

    {
      name: "Component Architecture",
      category: "practice",
      level: 90,
      accent: "cyan",
    },
    {
      name: "Design Patterns",
      category: "practice",
      level: 70,
      accent: "cyan",
    },
    { name: "Lazy Loading", category: "practice", level: 86, accent: "cyan" },
    { name: "Unit Testing", category: "practice", level: 75, accent: "cyan" },
    { name: "Clean Code", category: "practice", level: 88, accent: "cyan" },
  ]);

  private readonly _experience = signal<readonly ExperienceItem[]>([
    {
      id: "exp-1",
      role: "Angular Front-End Developer",
      company: "6 October Software Company",
      period: "07/2025 — Present",
      location: "Egypt · Part-Time, Remote",
      type: "experience",
      highlights: [
        "Develop ERP solutions and educational platforms using Angular.",
        "Build modern, responsive, high-performance UIs aligned with strict UI/UX standards.",
      ],
      tags: ["Angular", "TypeScript", "ERP", "Tailwind"],
    },
    {
      id: "exp-2",
      role: "Angular Frontend Developer",
      company: "Verzisca (Saudi Team)",
      period: "04/2025 — 07/2025",
      location: "Remote · Part-Time",
      type: "experience",
      highlights: [
        "Worked with a Saudi team to build a comprehensive ERP system.",
        "Project currently on hold by the client.",
      ],
      tags: ["Angular", "ERP", "RxJS"],
    },
    {
      id: "crs-1",
      role: "Advanced Angular Bootcamp",
      company: "Elevate Tech",
      period: "07/2025 — Present",
      location: "Online (In Progress)",
      type: "training",
      highlights: [
        "NgRx, Unit Testing, Clean Architecture.",
        "AI Integration & real-world Angular projects.",
      ],
      tags: ["NgRx", "Testing", "Architecture"],
    },
    {
      id: "crs-2",
      role: "Frontend Development Track",
      company: "Route Academy",
      period: "10/2024 — 02/2025",
      location: "Cairo, Egypt",
      type: "course",
      highlights: [
        "Comprehensive training covering web fundamentals to advanced Angular projects.",
      ],
      tags: ["Angular", "JavaScript", "HTML/CSS"],
    },
    {
      id: "edu-1",
      role: "BSc. Management Information Systems",
      company: "Delta Academy, Mansoura",
      period: "09/2019 — 05/2023",
      location: "Mansoura, Egypt",
      type: "education",
      highlights: [
        "Cumulative Grade: Very Good.",
        "Graduation Project: Job Recruitment Website (Excellent).",
      ],
      tags: ["MIS", "Computer Science"],
    },
  ]);

  private readonly _projects = signal<readonly Project[]>([
    {
      id: "proj-1",
      title: "Rosr E-Commerce & Admin Dashboard",
      tagline: "Nx Monorepo — Storefront + Admin",
      period: "11/2025 — 04/2026",
      description:
        "Scalable Nx Monorepo separating Storefront and Admin Dashboard, with reusable libraries for shared UI, API services, and TypeScript interfaces.",
      tech: ["Angular", "Nx", "NgRx", "RxJS", "TypeScript", "Tailwind"],
      highlights: [
        "Built scalable Monorepo architecture using Nx.",
        "Reusable libraries for shared UI components, API services, and interfaces.",
        "Managed complex state (Cart & Analytics) using NgRx and RxJS.",
        "Implemented Role-based Routing and secure auth flows across both platforms.",
      ],
      accent: "violet",
    },
    {
      id: "proj-2",
      title: "Online Exam System",
      tagline: "Real-time exam platform",
      period: "07/2025 — 08/2025",
      description:
        "Responsive online exam platform using Angular and Tailwind, with real-time submission and instant results viewing.",
      tech: ["Angular", "Tailwind", "RxJS", "TypeScript"],
      highlights: [
        "Developed a fully responsive exam interface.",
        "Enabled real-time exam submission and instant results viewing.",
      ],
      accent: "cyan",
    },
    {
      id: "proj-3",
      title: "Charity Management Website",
      tagline: "Donations & Volunteer Registration",
      period: "05/2025 — 06/2025",
      description:
        "Responsive website for a charity organization enabling donation management and volunteer registration flows.",
      tech: ["Angular", "TypeScript", "CSS3", "Forms"],
      highlights: [
        "Donation management & tracking interfaces.",
        "Volunteer registration with reactive forms.",
      ],
      accent: "pink",
    },
    {
      id: "proj-4",
      title: "Job Recruitment Website",
      tagline: "Graduation Project — Excellent",
      period: "2022 — 2023",
      description:
        "Full-stack recruitment platform built as graduation project at Delta Academy. Awarded Excellent grade.",
      tech: ["Angular", "TypeScript", "REST APIs"],
      highlights: [
        "Candidate & employer dashboards.",
        "Job posting, application tracking, and search.",
      ],
      accent: "violet",
    },
  ]);

  // Public read-only signals
  readonly profile = this._profile.asReadonly();
  readonly skills = this._skills.asReadonly();
  readonly experience = this._experience.asReadonly();
  readonly projects = this._projects.asReadonly();

  // Derived (computed) signals
  readonly skillsByCategory = computed(() => {
    const grouped = new Map<string, Skill[]>();
    for (const skill of this._skills()) {
      const list = grouped.get(skill.category) ?? [];
      list.push(skill);
      grouped.set(skill.category, list);
    }
    return grouped;
  });

  readonly stats = computed(() => ({
    projects: this._projects().length,
    skills: this._skills().length,
    yearsExperience: 2,
    coursesCompleted: this._experience().filter(
      (e) => e.type === "course" || e.type === "training",
    ).length,
  }));

  readonly experienceOnly = computed(() =>
    this._experience().filter((e) => e.type === "experience"),
  );

  readonly educationOnly = computed(() =>
    this._experience().filter(
      (e) =>
        e.type === "education" || e.type === "course" || e.type === "training",
    ),
  );
}
