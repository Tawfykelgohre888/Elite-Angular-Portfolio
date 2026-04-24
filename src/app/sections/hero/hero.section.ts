import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="hero"
      class="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 noise"
    >
      <!-- Background orbs -->
      <div
        class="gradient-orb top-[-15%] left-[-10%] h-[480px] w-[480px] animate-pulse-slow"
        style="background: radial-gradient(closest-side, #7c3aed, transparent);"
      ></div>
      <div
        class="gradient-orb top-[10%] right-[-15%] h-[520px] w-[520px] animate-pulse-slow"
        style="background: radial-gradient(closest-side, #38bdf8, transparent); animation-delay: 1.5s;"
      ></div>
      <div
        class="gradient-orb bottom-[-25%] left-[30%] h-[420px] w-[420px] animate-pulse-slow"
        style="background: radial-gradient(closest-side, #f0abfc, transparent); animation-delay: 3s; opacity: 0.35;"
      ></div>

      <!-- Grid backdrop -->
      <div class="absolute inset-0 -z-10 grid-bg"></div>

      <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <!-- Left -->
          <div class="lg:col-span-7">
            <div appRevealOnScroll class="mb-6 flex items-center gap-3">
              <span class="relative flex h-2.5 w-2.5">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
              </span>
              <span class="text-xs uppercase tracking-[0.3em] text-fg-muted">
                Available for new opportunities
              </span>
            </div>

            <h1
              appRevealOnScroll
              [delay]="80"
              class="text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span class="block text-fg">{{ profile().name.split(' ')[0] }}</span>
              <span class="block text-gradient">{{ profile().name.split(' ').slice(1).join(' ') }}</span>
            </h1>

            <p
              appRevealOnScroll
              [delay]="160"
              class="mt-6 max-w-xl text-balance text-lg text-fg-muted sm:text-xl"
            >
              <span class="font-mono text-accent-bright">&lt;</span>
              <span class="font-medium text-fg">{{ profile().title }}</span>
              <span class="font-mono text-accent-bright">/&gt;</span>
              — {{ profile().tagline }}
            </p>

            <div
              appRevealOnScroll
              [delay]="240"
              class="mt-10 flex flex-wrap items-center gap-3"
            >
              <button type="button" class="btn-primary" (click)="scrollTo('projects')">
                <span>See My Work</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
              <button type="button" class="btn-ghost" (click)="scrollTo('contact')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                <span>Get in Touch</span>
              </button>
            </div>

            <!-- Quick Stats -->
            <dl
              appRevealOnScroll
              [delay]="340"
              class="mt-14 grid max-w-lg grid-cols-3 gap-4"
            >
              <div class="glass rounded-2xl p-4">
                <dt class="text-xs uppercase tracking-wider text-fg-soft">Projects</dt>
                <dd class="mt-1 text-2xl font-bold text-gradient-accent">
                  {{ stats().projects }}+
                </dd>
              </div>
              <div class="glass rounded-2xl p-4">
                <dt class="text-xs uppercase tracking-wider text-fg-soft">Skills</dt>
                <dd class="mt-1 text-2xl font-bold text-gradient-accent">
                  {{ stats().skills }}
                </dd>
              </div>
              <div class="glass rounded-2xl p-4">
                <dt class="text-xs uppercase tracking-wider text-fg-soft">Years</dt>
                <dd class="mt-1 text-2xl font-bold text-gradient-accent">
                  {{ stats().yearsExperience }}+
                </dd>
              </div>
            </dl>
          </div>

          <!-- Right: Cinematic Code Card -->
          <div class="lg:col-span-5">
            <div
              appRevealOnScroll
              [delay]="200"
              class="relative animate-float"
            >
              <!-- Orbital ring -->
              <div class="pointer-events-none absolute -inset-8 hidden sm:block">
                <div class="absolute inset-0 animate-orbit-slow">
                  <div class="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_20px_rgba(167,139,250,0.8)]"></div>
                </div>
                <div class="absolute inset-4 animate-orbit-slow" style="animation-direction: reverse; animation-duration: 22s;">
                  <div class="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent-2 shadow-[0_0_15px_rgba(56,189,248,0.8)]"></div>
                </div>
              </div>

              <div class="glass-strong relative overflow-hidden rounded-3xl shadow-cinematic">
                <!-- Window chrome -->
                <div class="flex items-center gap-2 border-b border-white/5 px-5 py-3">
                  <span class="h-2.5 w-2.5 rounded-full bg-red-400/70"></span>
                  <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/70"></span>
                  <span class="h-2.5 w-2.5 rounded-full bg-green-400/70"></span>
                  <span class="ml-3 font-mono text-xs text-fg-soft">developer.signal.ts</span>
                </div>

                <!-- Code -->
                <pre class="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed text-fg-muted"><code><span class="text-accent">const</span> <span class="text-accent-bright">developer</span> = <span class="text-accent">signal</span>(&#123;
  <span class="text-fg">name</span>: <span class="text-emerald-300">'Tawfik Elgohare'</span>,
  <span class="text-fg">role</span>: <span class="text-emerald-300">'Junior Frontend Dev'</span>,
  <span class="text-fg">stack</span>: [
    <span class="text-emerald-300">'Angular'</span>,
    <span class="text-emerald-300">'TypeScript'</span>,
    <span class="text-emerald-300">'RxJS'</span>,
    <span class="text-emerald-300">'NgRx'</span>,
    <span class="text-emerald-300">'Tailwind'</span>,
  ],
  <span class="text-fg">passion</span>: <span class="text-emerald-300">'cinematic UI'</span>,
&#125;);

<span class="text-accent">const</span> <span class="text-accent-bright">isHiring</span> = <span class="text-accent">computed</span>(() =&gt;
  developer().<span class="text-fg">name</span>.<span class="text-accent-bright">length</span> &gt; <span class="text-pink-300">0</span>
);

<span class="text-fg-soft">// → ready.shipping = true</span></code></pre>

                <!-- Footer pill -->
                <div class="flex items-center justify-between border-t border-white/5 px-5 py-3">
                  <span class="font-mono text-[11px] uppercase tracking-widest text-fg-soft">
                    Angular 21 · Standalone · Signals
                  </span>
                  <span class="flex items-center gap-1.5 font-mono text-[11px] text-emerald-300">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    LIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll cue -->
      <div class="mt-20 flex justify-center">
        <button
          type="button"
          (click)="scrollTo('about')"
          class="flex flex-col items-center gap-2 text-fg-soft transition-colors hover:text-fg"
          aria-label="Scroll to next section"
        >
          <span class="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <span class="relative flex h-9 w-5 items-start justify-center rounded-full border border-white/15 pt-1.5">
            <span class="h-1.5 w-1 rounded-full bg-fg-muted animate-bounce"></span>
          </span>
        </button>
      </div>
    </section>
  `,
})
export class HeroSection {
  private readonly portfolio = inject(PortfolioService);
  protected readonly profile = this.portfolio.profile;
  protected readonly stats = this.portfolio.stats;

  protected scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
