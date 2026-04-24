import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { NavBar } from '../../shared/components/nav-bar/nav-bar';
import { HeroSection } from '../../sections/hero/hero.section';
import { AboutSection } from '../../sections/about/about.section';
import { SkillsSection } from '../../sections/skills/skills.section';
import { ExperienceSection } from '../../sections/experience/experience.section';
import { ProjectsSection } from '../../sections/projects/projects.section';
import { ContactSection } from '../../sections/contact/contact.section';
import { FooterSection } from '../../sections/footer/footer.section';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';

/**
 * Container page — composes presenter sections.
 * Follows the Container/Presenter pattern: this owns scroll-spy bootstrap,
 * sections own their own visual presentation only.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBar,
    HeroSection,
    AboutSection,
    SkillsSection,
    ExperienceSection,
    ProjectsSection,
    ContactSection,
    FooterSection,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-nav-bar />
    <main class="relative z-10">
      <app-hero-section />
      <app-about-section />
      <app-skills-section />
      <app-experience-section />
      <app-projects-section />
      <app-contact-section />
    </main>
    <app-footer-section />
  `,
})
export class HomePage implements OnInit {
  private readonly scrollSpy = inject(ScrollSpyService);

  ngOnInit(): void {
    this.scrollSpy.observeSections([
      'hero',
      'about',
      'skills',
      'experience',
      'projects',
      'contact',
    ]);
  }
}
