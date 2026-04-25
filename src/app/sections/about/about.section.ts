import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { PortfolioService } from "../../core/services/portfolio.service";
import { RevealOnScrollDirective } from "../../shared/directives/reveal-on-scroll.directive";

@Component({
  selector: "app-about-section",
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="relative py-28 sm:py-36">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <!-- Section heading -->
          <div class="lg:col-span-5">
            <p
              appRevealOnScroll
              class="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent"
            >
              01 — About Me
            </p>
            <h2
              appRevealOnScroll
              [delay]="80"
              class="text-balance text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Building the
              <span class="text-gradient">web of tomorrow</span>
              with Angular today.
            </h2>
            <p
              appRevealOnScroll
              [delay]="160"
              class="mt-6 text-fg-muted leading-relaxed"
            >
              {{ profile().summary }}
            </p>

            <!-- Personal info chips -->
            <dl appRevealOnScroll [delay]="240" class="mt-8 grid gap-3 text-sm">
              <div class="flex items-center gap-3">
                <span class="text-accent">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <dt class="sr-only">Location</dt>
                <dd class="text-fg-muted">{{ profile().location }}</dd>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-accent">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 5L2 7" />
                  </svg>
                </span>
                <dt class="sr-only">Email</dt>
                <dd class="text-fg-muted">{{ profile().email }}</dd>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-accent">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"
                    />
                  </svg>
                </span>
                <dt class="sr-only">Phone</dt>
                <dd class="text-fg-muted">{{ profile().phone }}</dd>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-accent">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path
                      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                    />
                  </svg>
                </span>
                <dt class="sr-only">Languages</dt>
                <dd class="text-fg-muted">
                  @for (
                    lang of profile().languages;
                    track lang.name;
                    let last = $last
                  ) {
                    {{ lang.name }} ({{ lang.level }})
                    @if (!last) {
                      <span>, </span>
                    }
                  }
                </dd>
              </div>
            </dl>
          </div>

          <!-- Right: feature cards -->
          <div class="lg:col-span-7">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              @for (feature of features; track feature.title; let i = $index) {
                <article
                  appRevealOnScroll
                  [delay]="i * 100"
                  class="group glass relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-cinematic"
                >
                  <div
                    class="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                    [style.background]="feature.glow"
                  ></div>

                  <div
                    class="mb-4 grid h-11 w-11 place-items-center rounded-2xl text-white shadow-glow"
                    [style.background]="feature.iconBg"
                    [innerHTML]="trust(feature.icon)"
                  ></div>

                  <h3 class="text-lg font-semibold text-fg">
                    {{ feature.title }}
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed text-fg-muted">
                    {{ feature.body }}
                  </p>
                </article>
              }
            </div>

            <!-- Code-style quote -->
            <div
              appRevealOnScroll
              [delay]="400"
              class="glass mt-5 rounded-3xl p-6"
            >
              <p class="font-mono text-sm leading-relaxed text-fg-muted">
                <span class="text-accent-bright">&#64;Component</span>(&#123;
                <span class="block pl-4 text-fg"
                  >selector:
                  <span class="text-emerald-300">'app-tawfik'</span>,</span
                >
                <span class="block pl-4 text-fg"
                  >mission:
                  <span class="text-emerald-300"
                    >'Ship interfaces that feel inevitable'</span
                  >,</span
                >
                <span class="block pl-4 text-fg"
                  >stack:
                  <span class="text-emerald-300"
                    >'Angular · TypeScript · Tailwind'</span
                  >,</span
                >
                &#125;)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutSection {
  private readonly portfolio = inject(PortfolioService);
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly profile = this.portfolio.profile;

  protected trust(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  protected readonly features = [
    {
      title: "Component-Driven Mindset",
      body: "I architect interfaces as composable, signal-driven primitives — clean, predictable, and effortless to extend.",
      iconBg: "linear-gradient(135deg, #7c3aed, #a78bfa)",
      glow: "radial-gradient(circle, rgba(167,139,250,0.6), transparent)",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    },
    {
      title: "Performance, By Default",
      body: "OnPush change detection, lazy loading, and zoneless rendering — every pixel earns its place on screen.",
      iconBg: "linear-gradient(135deg, #38bdf8, #06b6d4)",
      glow: "radial-gradient(circle, rgba(56,189,248,0.6), transparent)",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    },
    {
      title: "Reactive State Mastery",
      body: "From RxJS streams to NgRx selectors to Angular Signals — I pick the right primitive for the job, every time.",
      iconBg: "linear-gradient(135deg, #f0abfc, #e879f9)",
      glow: "radial-gradient(circle, rgba(240,171,252,0.6), transparent)",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>',
    },
    {
      title: "Cinematic Polish",
      body: "Glassmorphism, micro-interactions, and choreographed motion — the details users feel before they notice.",
      iconBg: "linear-gradient(135deg, #fb7185, #f0abfc)",
      glow: "radial-gradient(circle, rgba(251,113,133,0.55), transparent)",
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    },
  ];
}
