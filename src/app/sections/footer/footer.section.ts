import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="relative border-t border-white/5 py-10">
      <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
        <div class="flex items-center gap-3">
          <span
            class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-deep via-accent to-accent-2 text-sm font-bold text-white shadow-glow"
          >T</span>
          <div>
            <p class="text-sm font-semibold">{{ profile().name }}</p>
            <p class="font-mono text-[11px] uppercase tracking-widest text-fg-soft">
              {{ profile().title }}
            </p>
          </div>
        </div>

        <p class="text-xs text-fg-soft">
          Crafted with
          <span class="font-mono text-accent-bright">Angular 21</span> ·
          <span class="font-mono text-accent-2">Signals</span> ·
          <span class="font-mono text-pink-300">Tailwind v4</span>
          — © {{ year }}
        </p>

        <div class="flex items-center gap-2">
          <a
            [href]="'mailto:' + profile().email"
            class="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-fg-muted transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-fg"
            aria-label="Email"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>
          </a>
          <a
            [href]="'https://' + profile().github"
            target="_blank"
            rel="noopener noreferrer"
            class="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-fg-muted transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-fg"
            aria-label="GitHub"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
          <a
            [href]="'https://' + profile().linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-fg-muted transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-fg"
            aria-label="LinkedIn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm12.5 11.27h-3v-5.6c0-3.36-4-3.1-4 0v5.6h-3v-10h3v1.76c1.4-2.59 7-2.78 7 2.48v5.76z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class FooterSection {
  private readonly portfolio = inject(PortfolioService);
  protected readonly profile = this.portfolio.profile;
  protected readonly year = new Date().getFullYear();
}
