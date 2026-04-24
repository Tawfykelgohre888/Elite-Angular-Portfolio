import { DestroyRef, Injectable, inject, signal } from '@angular/core';

/**
 * Tracks the currently visible section using IntersectionObserver.
 * Exposes the active id as a Signal — composition-friendly.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly destroyRef = inject(DestroyRef);
  private observer: IntersectionObserver | null = null;
  private readonly _activeId = signal<string>('hero');

  readonly activeId = this._activeId.asReadonly();

  observeSections(ids: readonly string[]): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.disconnect();
    this.observer = new IntersectionObserver(
      (entries) => {
        // pick the most-visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          this._activeId.set(visible.target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    queueMicrotask(() => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) this.observer?.observe(el);
      }
    });

    this.destroyRef.onDestroy(() => this.disconnect());
  }

  private disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
