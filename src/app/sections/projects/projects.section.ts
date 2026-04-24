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
import { Project } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="relative py-28 sm:py-36">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <!-- Heading -->
        <div appRevealOnScroll class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div class="max-w-2xl">
            <p class="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              04 — Selected Work
            </p>
            <h2 class="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Projects I've shipped &
              <span class="text-gradient">obsessed over.</span>
            </h2>
          </div>
          <p class="text-sm text-fg-muted sm:max-w-xs sm:text-right">
            From scalable Nx monorepos to real-time exam platforms —
            click any card to see the details.
          </p>
        </div>

        <!-- Grid -->
        <div class="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[280px]">
          @for (project of projects(); track project.id; let i = $index) {
            <button
              type="button"
              appRevealOnScroll
              [delay]="i * 100"
              (click)="open(project)"
              class="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:shadow-cinematic"
              [class.lg:col-span-7]="i === 0"
              [class.lg:row-span-2]="i === 0"
              [class.lg:col-span-5]="i === 1 || i === 2"
              [class.lg:col-span-12]="i === 3"
            >
              <!-- Decorative orb -->
              <div
                class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl transition-all duration-700 group-hover:opacity-60 group-hover:scale-110"
                [style.background]="orbFor(project.accent)"
              ></div>

              <!-- Top row -->
              <div class="relative flex items-start justify-between gap-4">
                <div>
                  <p class="font-mono text-xs uppercase tracking-widest text-fg-soft">
                    {{ project.period }}
                  </p>
                  <h3
                    class="mt-2 text-xl font-bold text-fg sm:text-2xl"
                    [class.lg:text-3xl]="i === 0"
                  >
                    {{ project.title }}
                  </h3>
                  <p class="mt-1 text-sm text-accent-bright">{{ project.tagline }}</p>
                </div>

                <span
                  class="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-fg-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:text-accent-bright"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                </span>
              </div>

              <!-- Description -->
              <p class="relative mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
                {{ project.description }}
              </p>

              <!-- Tech chips -->
              <div class="relative mt-4 flex flex-wrap gap-1.5">
                @for (tech of project.tech; track tech) {
                  <span class="chip">{{ tech }}</span>
                }
              </div>
            </button>
          }
        </div>

        <!-- Project Modal -->
        @if (selected(); as p) {
          <div
            class="fixed inset-0 z-[60] grid place-items-center bg-bg/85 p-4 backdrop-blur-md"
            (click)="close()"
            role="dialog"
            aria-modal="true"
          >
            <div
              class="glass-strong relative w-full max-w-2xl overflow-hidden rounded-3xl p-7 shadow-cinematic"
              (click)="$event.stopPropagation()"
            >
              <button
                type="button"
                (click)="close()"
                class="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/5 text-fg-muted transition-colors hover:bg-white/10 hover:text-fg"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>

              <div
                class="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full opacity-50 blur-3xl"
                [style.background]="orbFor(p.accent)"
              ></div>

              <p class="font-mono text-xs uppercase tracking-widest text-accent-bright">
                {{ p.period }}
              </p>
              <h3 class="mt-2 text-2xl font-bold sm:text-3xl">{{ p.title }}</h3>
              <p class="mt-1 text-accent-bright">{{ p.tagline }}</p>
              <p class="mt-5 leading-relaxed text-fg-muted">{{ p.description }}</p>

              <div class="mt-6">
                <h4 class="mb-3 text-xs uppercase tracking-widest text-fg-soft">
                  Highlights
                </h4>
                <ul class="space-y-2">
                  @for (h of p.highlights; track h) {
                    <li class="flex gap-3 text-sm text-fg-muted">
                      <span class="mt-1 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-accent/20 text-accent-bright">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span>{{ h }}</span>
                    </li>
                  }
                </ul>
              </div>

              <div class="mt-6 flex flex-wrap gap-1.5">
                @for (tech of p.tech; track tech) {
                  <span class="chip">{{ tech }}</span>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class ProjectsSection {
  private readonly portfolio = inject(PortfolioService);
  protected readonly projects = this.portfolio.projects;
  protected readonly selected = signal<Project | null>(null);

  protected readonly hasSelection = computed(() => this.selected() !== null);

  protected open(project: Project): void {
    this.selected.set(project);
  }

  protected close(): void {
    this.selected.set(null);
  }

  protected orbFor(accent: Project['accent']): string {
    switch (accent) {
      case 'cyan':
        return 'radial-gradient(closest-side, rgba(56,189,248,0.55), transparent)';
      case 'pink':
        return 'radial-gradient(closest-side, rgba(240,171,252,0.55), transparent)';
      default:
        return 'radial-gradient(closest-side, rgba(167,139,250,0.55), transparent)';
    }
  }
}
