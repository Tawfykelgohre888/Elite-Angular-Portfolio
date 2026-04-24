import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="relative py-28 sm:py-36">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div appRevealOnScroll class="max-w-2xl">
          <p class="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            03 — Journey
          </p>
          <h2 class="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            A timeline of
            <span class="text-gradient">growth, ships, and lessons.</span>
          </h2>
          <p class="mt-4 text-fg-muted">
            From Mansoura's classrooms to remote ERP teams across the region —
            here's the path that shaped my craft.
          </p>
        </div>

        <div class="relative mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <!-- Experience -->
          <div>
            <div appRevealOnScroll class="mb-6 flex items-center gap-3">
              <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-deep to-accent-2 text-white shadow-glow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </span>
              <h3 class="text-xl font-semibold">Experience</h3>
            </div>
            <ol class="relative ml-3 border-l border-white/10 pl-6">
              @for (item of experience(); track item.id; let i = $index) {
                <li
                  appRevealOnScroll
                  [delay]="i * 120"
                  class="group relative pb-10 last:pb-0"
                >
                  <span
                    class="absolute -left-[34px] top-1.5 grid h-5 w-5 place-items-center rounded-full bg-bg ring-2 ring-accent transition-all duration-300 group-hover:ring-accent-2"
                  >
                    <span class="h-2 w-2 rounded-full bg-accent transition-all duration-300 group-hover:bg-accent-2 group-hover:scale-125"></span>
                  </span>
                  <div
                    class="glass rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-cinematic"
                  >
                    <p class="font-mono text-xs uppercase tracking-widest text-accent-bright">
                      {{ item.period }}
                    </p>
                    <h4 class="mt-2 text-lg font-semibold text-fg">{{ item.role }}</h4>
                    <p class="text-sm text-fg-muted">
                      {{ item.company }}
                      <span class="text-fg-soft">· {{ item.location }}</span>
                    </p>
                    <ul class="mt-4 space-y-2 text-sm text-fg-muted">
                      @for (h of item.highlights; track h) {
                        <li class="flex gap-2">
                          <span class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent"></span>
                          <span>{{ h }}</span>
                        </li>
                      }
                    </ul>
                    <div class="mt-4 flex flex-wrap gap-1.5">
                      @for (tag of item.tags; track tag) {
                        <span class="chip">{{ tag }}</span>
                      }
                    </div>
                  </div>
                </li>
              }
            </ol>
          </div>

          <!-- Education + Courses -->
          <div>
            <div appRevealOnScroll class="mb-6 flex items-center gap-3">
              <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-pink-500 to-accent text-white shadow-glow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 10-10-5L2 10l10 5 10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </span>
              <h3 class="text-xl font-semibold">Education & Courses</h3>
            </div>
            <ol class="relative ml-3 border-l border-white/10 pl-6">
              @for (item of education(); track item.id; let i = $index) {
                <li
                  appRevealOnScroll
                  [delay]="i * 120"
                  class="group relative pb-10 last:pb-0"
                >
                  <span
                    class="absolute -left-[34px] top-1.5 grid h-5 w-5 place-items-center rounded-full bg-bg ring-2 transition-all duration-300"
                    [class.ring-pink-400]="item.type === 'education'"
                    [class.ring-accent-2]="item.type === 'course'"
                  >
                    <span
                      class="h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-125"
                      [class.bg-pink-400]="item.type === 'education'"
                      [class.bg-accent-2]="item.type === 'course'"
                    ></span>
                  </span>
                  <div
                    class="glass rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-cinematic"
                  >
                    <div class="flex items-center justify-between gap-3">
                      <p class="font-mono text-xs uppercase tracking-widest text-accent-bright">
                        {{ item.period }}
                      </p>
                      <span
                        class="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                        [class.bg-pink-500]="item.type === 'education'"
                        [class.bg-opacity-15]="true"
                        [class.text-pink-300]="item.type === 'education'"
                        [class.bg-cyan-500]="item.type === 'course'"
                        [class.text-cyan-300]="item.type === 'course'"
                      >
                        {{ item.type }}
                      </span>
                    </div>
                    <h4 class="mt-2 text-lg font-semibold text-fg">{{ item.role }}</h4>
                    <p class="text-sm text-fg-muted">
                      {{ item.company }}
                      <span class="text-fg-soft">· {{ item.location }}</span>
                    </p>
                    <ul class="mt-4 space-y-2 text-sm text-fg-muted">
                      @for (h of item.highlights; track h) {
                        <li class="flex gap-2">
                          <span class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent"></span>
                          <span>{{ h }}</span>
                        </li>
                      }
                    </ul>
                    <div class="mt-4 flex flex-wrap gap-1.5">
                      @for (tag of item.tags; track tag) {
                        <span class="chip">{{ tag }}</span>
                      }
                    </div>
                  </div>
                </li>
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceSection {
  private readonly portfolio = inject(PortfolioService);
  protected readonly experience = this.portfolio.experienceOnly;
  protected readonly education = this.portfolio.educationOnly;
}
