import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSpyService } from '../../../core/services/scroll-spy.service';

interface NavLink {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      [class.py-3]="!scrolled()"
      [class.py-2]="scrolled()"
    >
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <nav
          class="glass flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500"
          [class.shadow-cinematic]="scrolled()"
        >
          <!-- Brand -->
          <button
            type="button"
            class="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold tracking-tight transition-colors hover:text-accent-bright"
            (click)="scrollTo('hero')"
          >
            <span
              class="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent-deep via-accent to-accent-2 text-white shadow-glow"
              >T</span
            >
            <span class="hidden sm:inline text-fg">Tawfik<span class="text-accent">.</span></span>
          </button>

          <!-- Links -->
          <ul class="hidden items-center gap-1 md:flex">
            @for (link of links; track link.id) {
              <li>
                <button
                  type="button"
                  (click)="scrollTo(link.id)"
                  class="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                  [class.text-fg]="active() === link.id"
                  [class.text-fg-muted]="active() !== link.id"
                >
                  @if (active() === link.id) {
                    <span
                      class="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
                    ></span>
                  }
                  <span class="relative">{{ link.label }}</span>
                </button>
              </li>
            }
          </ul>

          <!-- CTA -->
          <button
            type="button"
            (click)="scrollTo('contact')"
            class="hidden rounded-full bg-gradient-to-r from-accent-deep via-accent to-accent-2 px-4 py-1.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Let's Talk
          </button>

          <!-- Mobile toggle -->
          <button
            type="button"
            class="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-fg-muted md:hidden"
            (click)="toggleMobile()"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              @if (mobileOpen()) {
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              } @else {
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              }
            </svg>
          </button>
        </nav>

        <!-- Mobile dropdown -->
        @if (mobileOpen()) {
          <div
            class="glass-strong mt-2 rounded-3xl p-2 md:hidden"
          >
            @for (link of links; track link.id) {
              <button
                type="button"
                (click)="scrollTo(link.id)"
                class="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors"
                [class.bg-white]="active() === link.id"
                [class.bg-opacity-5]="active() === link.id"
                [class.text-fg]="active() === link.id"
                [class.text-fg-muted]="active() !== link.id"
              >
                {{ link.label }}
              </button>
            }
          </div>
        }
      </div>
    </header>
  `,
})
export class NavBar {
  protected readonly links: readonly NavLink[] = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  private readonly scrollSpy = inject(ScrollSpyService);

  protected readonly scrolled = signal(false);
  protected readonly mobileOpen = signal(false);
  protected readonly active = this.scrollSpy.activeId;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  protected toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  protected scrollTo(id: string): void {
    this.mobileOpen.set(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
