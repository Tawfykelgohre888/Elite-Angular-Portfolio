import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { Skill } from '../../core/models/portfolio.models';

type CategoryKey = 'all' | Skill['category'];

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="relative py-28 sm:py-36">
      <!-- Background -->
      <div
        class="gradient-orb left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-30"
        style="background: radial-gradient(closest-side, #7c3aed, transparent);"
      ></div>

      <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
        <!-- Heading -->
        <div appRevealOnScroll class="max-w-2xl">
          <p class="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            02 — Skills Cloud
          </p>
          <h2 class="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            An interactive arsenal of
            <span class="text-gradient">modern web tooling.</span>
          </h2>
          <p class="mt-4 text-fg-muted">
            Hover the orbits, filter the categories — every skill below is something I
            actively use shipping production interfaces.
          </p>
        </div>

        <!-- Filter pills -->
        <div
          appRevealOnScroll
          [delay]="120"
          class="mt-10 flex flex-wrap gap-2"
        >
          @for (cat of categories; track cat.key) {
            <button
              type="button"
              (click)="setCategory(cat.key)"
              class="rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
              [class.bg-gradient-to-r]="active() === cat.key"
              [class.from-accent-deep]="active() === cat.key"
              [class.via-accent]="active() === cat.key"
              [class.to-accent-2]="active() === cat.key"
              [class.text-white]="active() === cat.key"
              [class.shadow-glow]="active() === cat.key"
              [class.bg-white]="active() !== cat.key"
              [class.bg-opacity-5]="active() !== cat.key"
              [class.text-fg-muted]="active() !== cat.key"
              [class.ring-1]="active() !== cat.key"
              [class.ring-white]="active() !== cat.key"
              [class.ring-opacity-10]="active() !== cat.key"
            >
              {{ cat.label }}
              <span class="ml-1 text-xs opacity-70">
                {{ cat.key === 'all' ? skills().length : countFor(cat.key) }}
              </span>
            </button>
          }
        </div>

        <!-- Skills grid -->
        <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (skill of filteredSkills(); track skill.name; let i = $index) {
            <article
              appRevealOnScroll
              [delay]="i * 35"
              class="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/15"
              [attr.data-accent]="skill.accent"
            >
              <!-- Hover glow -->
              <div
                class="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                [style.background]="glowFor(skill.accent)"
              ></div>

              <div class="relative">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h3 class="text-base font-semibold text-fg">{{ skill.name }}</h3>
                    <p class="mt-1 text-[11px] uppercase tracking-widest text-fg-soft">
                      {{ skill.category }}
                    </p>
                  </div>
                  <span
                    class="font-mono text-xs font-bold"
                    [style.color]="textFor(skill.accent)"
                  >
                    {{ skill.level }}%
                  </span>
                </div>

                <!-- Progress bar -->
                <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    class="h-full rounded-full transition-all duration-1000 ease-out"
                    [style.width.%]="skill.level"
                    [style.background]="barFor(skill.accent)"
                  ></div>
                </div>
              </div>
            </article>
          }
        </div>

        <!-- Marquee tech ribbon -->
        <div
          appRevealOnScroll
          [delay]="200"
          class="relative mt-16 overflow-hidden rounded-3xl glass py-6"
        >
          <div
            class="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
            style="background: linear-gradient(to right, var(--color-bg), transparent);"
          ></div>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
            style="background: linear-gradient(to left, var(--color-bg), transparent);"
          ></div>

          <div class="flex animate-marquee gap-12 whitespace-nowrap will-change-transform">
            @for (tech of marqueeItems; track $index) {
              <span class="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-fg-muted">
                <span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
                {{ tech }}
              </span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsSection {
  private readonly portfolio = inject(PortfolioService);
  protected readonly skills = this.portfolio.skills;

  protected readonly active = signal<CategoryKey>('all');

  protected readonly categories: readonly { key: CategoryKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'state', label: 'State & Forms' },
    { key: 'styling', label: 'Styling' },
    { key: 'tools', label: 'Tools & APIs' },
    { key: 'practice', label: 'Practices' },
  ];

  protected readonly marqueeItems = [
    'Angular',
    'TypeScript',
    'Signals',
    'RxJS',
    'NgRx',
    'Tailwind',
    'PrimeNG',
    'Angular Material',
    'Nx',
    'Jest',
    'Azure DevOps',
    'GraphQL',
    'REST',
    // duplicate for seamless loop
    'Angular',
    'TypeScript',
    'Signals',
    'RxJS',
    'NgRx',
    'Tailwind',
    'PrimeNG',
    'Angular Material',
    'Nx',
    'Jest',
    'Azure DevOps',
    'GraphQL',
    'REST',
  ];

  protected readonly filteredSkills = computed<readonly Skill[]>(() => {
    const active = this.active();
    if (active === 'all') return this.skills();
    return this.skills().filter((s) => s.category === active);
  });

  protected setCategory(key: CategoryKey): void {
    this.active.set(key);
  }

  protected countFor(key: Skill['category']): number {
    return this.skills().filter((s) => s.category === key).length;
  }

  protected glowFor(accent: string): string {
    switch (accent) {
      case 'cyan':
        return 'radial-gradient(circle, rgba(56,189,248,0.55), transparent)';
      case 'pink':
        return 'radial-gradient(circle, rgba(240,171,252,0.55), transparent)';
      default:
        return 'radial-gradient(circle, rgba(167,139,250,0.55), transparent)';
    }
  }

  protected barFor(accent: string): string {
    switch (accent) {
      case 'cyan':
        return 'linear-gradient(90deg, #0ea5e9, #38bdf8, #7dd3fc)';
      case 'pink':
        return 'linear-gradient(90deg, #d946ef, #f0abfc, #fbcfe8)';
      default:
        return 'linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd)';
    }
  }

  protected textFor(accent: string): string {
    switch (accent) {
      case 'cyan':
        return '#7dd3fc';
      case 'pink':
        return '#f0abfc';
      default:
        return '#c4b5fd';
    }
  }
}
