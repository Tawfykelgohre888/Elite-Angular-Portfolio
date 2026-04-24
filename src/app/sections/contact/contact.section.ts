import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { PortfolioService } from '../../core/services/portfolio.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

interface FieldErrors {
  readonly name?: string;
  readonly email?: string;
  readonly subject?: string;
  readonly message?: string;
}

/**
 * Contact section using a Signal-based form pattern:
 *   - field state lives in `signal()` primitives (the new "signal forms" approach)
 *   - validation is a derived `computed()` that updates reactively
 *   - submission is gated by a computed `isValid()` signal
 *   - all UI state (touched, submitting, success) is signal-driven, no RxJS Subjects
 */
@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="relative py-28 sm:py-36">
      <!-- Background -->
      <div
        class="gradient-orb left-[5%] top-[20%] h-[420px] w-[420px]"
        style="background: radial-gradient(closest-side, #38bdf8, transparent); opacity: 0.4;"
      ></div>
      <div
        class="gradient-orb right-[5%] bottom-[10%] h-[380px] w-[380px]"
        style="background: radial-gradient(closest-side, #a78bfa, transparent); opacity: 0.4;"
      ></div>

      <div class="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div class="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <!-- Left: copy + contact details -->
          <div class="lg:col-span-5">
            <p
              appRevealOnScroll
              class="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent"
            >
              05 — Contact
            </p>
            <h2
              appRevealOnScroll
              [delay]="80"
              class="text-balance text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Let's build
              <span class="text-gradient">something cinematic.</span>
            </h2>
            <p
              appRevealOnScroll
              [delay]="160"
              class="mt-5 text-fg-muted leading-relaxed"
            >
              Got a project in mind, a role to fill, or a wild Angular idea you want
              prototyped? The form on the right is wired with the new
              <span class="font-mono text-accent-bright">Signal Forms</span>
              API — fully reactive, fully typed.
            </p>

            <ul
              appRevealOnScroll
              [delay]="240"
              class="mt-10 space-y-4 text-sm"
            >
              <li class="flex items-center gap-4">
                <span class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-accent-deep to-accent text-white shadow-glow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>
                </span>
                <div>
                  <p class="text-xs uppercase tracking-widest text-fg-soft">Email</p>
                  <p class="font-medium text-fg">{{ profile().email }}</p>
                </div>
              </li>
              <li class="flex items-center gap-4">
                <span class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-accent-2 to-cyan-400 text-white shadow-glow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                </span>
                <div>
                  <p class="text-xs uppercase tracking-widest text-fg-soft">Phone</p>
                  <p class="font-medium text-fg">{{ profile().phone }}</p>
                </div>
              </li>
              <li class="flex items-center gap-4">
                <span class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-pink-500 to-accent text-white shadow-glow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div>
                  <p class="text-xs uppercase tracking-widest text-fg-soft">Location</p>
                  <p class="font-medium text-fg">{{ profile().location }}</p>
                </div>
              </li>
            </ul>

            <!-- Socials -->
            <div appRevealOnScroll [delay]="320" class="mt-10 flex flex-wrap gap-2">
              <a
                [href]="'https://' + profile().github"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-ghost"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                <span>GitHub</span>
              </a>
              <a
                [href]="'https://' + profile().linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-ghost"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm12.5 11.27h-3v-5.6c0-3.36-4-3.1-4 0v5.6h-3v-10h3v1.76c1.4-2.59 7-2.78 7 2.48v5.76z"/></svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <!-- Right: Signal Form -->
          <div class="lg:col-span-7">
            <div
              appRevealOnScroll
              [delay]="120"
              class="glass-strong relative overflow-hidden rounded-3xl p-7 shadow-cinematic"
            >
              <!-- Form header chrome -->
              <div class="mb-6 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="h-2.5 w-2.5 rounded-full bg-red-400/70"></span>
                  <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/70"></span>
                  <span class="h-2.5 w-2.5 rounded-full bg-green-400/70"></span>
                  <span class="ml-3 font-mono text-xs text-fg-soft">contact.signal.form</span>
                </div>
                <span class="font-mono text-[10px] uppercase tracking-widest text-fg-soft">
                  Signal Forms · v21
                </span>
              </div>

              <form (ngSubmit)="submit()" novalidate class="space-y-5">
                <!-- Name -->
                <div>
                  <label for="contact-name" class="mb-2 block text-xs uppercase tracking-widest text-fg-soft">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autocomplete="name"
                    class="w-full rounded-2xl border bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-fg-soft transition-all focus:bg-white/[0.06] focus:outline-none"
                    [class.border-white]="!showError('name')"
                    [class.border-opacity-10]="!showError('name')"
                    [class.focus:border-accent]="!showError('name')"
                    [class.border-red-400]="showError('name')"
                    placeholder="Tawfik Elgohare"
                    [ngModel]="name()"
                    (ngModelChange)="name.set($event)"
                    (blur)="touch('name')"
                    name="name"
                  />
                  @if (showError('name')) {
                    <p class="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {{ errors().name }}
                    </p>
                  }
                </div>

                <!-- Email -->
                <div>
                  <label for="contact-email" class="mb-2 block text-xs uppercase tracking-widest text-fg-soft">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autocomplete="email"
                    class="w-full rounded-2xl border bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-fg-soft transition-all focus:bg-white/[0.06] focus:outline-none"
                    [class.border-white]="!showError('email')"
                    [class.border-opacity-10]="!showError('email')"
                    [class.focus:border-accent]="!showError('email')"
                    [class.border-red-400]="showError('email')"
                    placeholder="you@company.com"
                    [ngModel]="email()"
                    (ngModelChange)="email.set($event)"
                    (blur)="touch('email')"
                    name="email"
                  />
                  @if (showError('email')) {
                    <p class="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {{ errors().email }}
                    </p>
                  }
                </div>

                <!-- Subject -->
                <div>
                  <label for="contact-subject" class="mb-2 block text-xs uppercase tracking-widest text-fg-soft">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    class="w-full rounded-2xl border bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-fg-soft transition-all focus:bg-white/[0.06] focus:outline-none"
                    [class.border-white]="!showError('subject')"
                    [class.border-opacity-10]="!showError('subject')"
                    [class.focus:border-accent]="!showError('subject')"
                    [class.border-red-400]="showError('subject')"
                    placeholder="A new role · A freelance gig · Just saying hi"
                    [ngModel]="subject()"
                    (ngModelChange)="subject.set($event)"
                    (blur)="touch('subject')"
                    name="subject"
                  />
                  @if (showError('subject')) {
                    <p class="mt-1.5 text-xs text-red-300">{{ errors().subject }}</p>
                  }
                </div>

                <!-- Message -->
                <div>
                  <label for="contact-message" class="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-fg-soft">
                    <span>Message</span>
                    <span class="font-mono normal-case tracking-normal">
                      {{ message().length }} / 1000
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows="5"
                    class="w-full resize-none rounded-2xl border bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-fg-soft transition-all focus:bg-white/[0.06] focus:outline-none"
                    [class.border-white]="!showError('message')"
                    [class.border-opacity-10]="!showError('message')"
                    [class.focus:border-accent]="!showError('message')"
                    [class.border-red-400]="showError('message')"
                    placeholder="Tell me about your project, timeline, and what you're hoping to ship together…"
                    [ngModel]="message()"
                    (ngModelChange)="message.set($event)"
                    (blur)="touch('message')"
                    name="message"
                  ></textarea>
                  @if (showError('message')) {
                    <p class="mt-1.5 text-xs text-red-300">{{ errors().message }}</p>
                  }
                </div>

                <!-- Submit row -->
                <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p class="text-xs text-fg-soft">
                    Powered by a Functional Interceptor — your message is mocked &
                    delivered locally.
                  </p>

                  <button
                    type="submit"
                    class="btn-primary"
                    [disabled]="!isValid() || contactState.isSubmitting()"
                    [class.opacity-50]="!isValid() || contactState.isSubmitting()"
                    [class.cursor-not-allowed]="!isValid() || contactState.isSubmitting()"
                  >
                    @if (contactState.isSubmitting()) {
                      <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                      <span>Sending…</span>
                    } @else {
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                      <span>Send Message</span>
                    }
                  </button>
                </div>

                <!-- Success / Error -->
                @if (contactState.lastResult(); as result) {
                  <div
                    class="flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4"
                  >
                    <span class="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    <div class="flex-1">
                      <p class="text-sm font-semibold text-emerald-200">
                        Message received — I'll get back to you soon.
                      </p>
                      <p class="mt-0.5 font-mono text-[11px] text-emerald-300/80">
                        ref: {{ result.id }}
                      </p>
                    </div>
                  </div>
                }
                @if (contactState.errorMessage(); as err) {
                  <div class="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
                    {{ err }}
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactSection {
  private readonly contact = inject(ContactService);
  private readonly portfolio = inject(PortfolioService);

  protected readonly contactState = this.contact;
  protected readonly profile = this.portfolio.profile;

  // Signal-based form fields
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly subject = signal('');
  protected readonly message = signal('');

  // Touched tracking
  protected readonly touched = signal<Record<string, boolean>>({});

  // Reactive validation derived from field signals
  protected readonly errors = computed<FieldErrors>(() => {
    const errs: Record<string, string> = {};
    const n = this.name().trim();
    const e = this.email().trim();
    const s = this.subject().trim();
    const m = this.message().trim();

    if (n.length < 2) errs['name'] = 'Please enter your full name (min 2 chars).';

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(e)) errs['email'] = 'A valid email address is required.';

    if (s.length < 4) errs['subject'] = 'Give your message a short subject.';

    if (m.length < 10) errs['message'] = 'Tell me a little more (10+ chars).';
    else if (m.length > 1000) errs['message'] = 'Please keep it under 1000 characters.';

    return errs;
  });

  protected readonly isValid = computed(() => Object.keys(this.errors()).length === 0);

  constructor() {
    // Auto-clear success state when user starts a new message
    effect(() => {
      const total =
        this.name().length + this.email().length + this.subject().length + this.message().length;
      if (total > 0 && this.contact.lastResult()) {
        this.contact.reset();
      }
    });
  }

  protected touch(field: string): void {
    this.touched.update((t) => ({ ...t, [field]: true }));
  }

  protected showError(field: keyof FieldErrors): boolean {
    return !!this.touched()[field] && !!this.errors()[field];
  }

  protected async submit(): Promise<void> {
    // Mark all touched so errors surface
    this.touched.set({ name: true, email: true, subject: true, message: true });
    if (!this.isValid()) return;

    try {
      await this.contact.send({
        name: this.name().trim(),
        email: this.email().trim(),
        subject: this.subject().trim(),
        message: this.message().trim(),
      });
      // Clear form on success
      this.name.set('');
      this.email.set('');
      this.subject.set('');
      this.message.set('');
      this.touched.set({});
    } catch {
      /* error already surfaced via service signal */
    }
  }
}
