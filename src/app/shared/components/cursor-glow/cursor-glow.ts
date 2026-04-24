import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-cursor-glow',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 z-0 hidden md:block"
    >
      <div
        class="absolute h-[480px] w-[480px] rounded-full opacity-30 transition-transform duration-300 ease-out will-change-transform"
        [style.transform]="
          'translate3d(' + (x() - 240) + 'px,' + (y() - 240) + 'px,0)'
        "
        style="background: radial-gradient(closest-side, rgba(167,139,250,0.55), rgba(56,189,248,0.15) 45%, transparent 70%); filter: blur(40px);"
      ></div>
    </div>
  `,
})
export class CursorGlow {
  protected readonly x = signal(0);
  protected readonly y = signal(0);

  @HostListener('window:pointermove', ['$event'])
  onMove(event: PointerEvent): void {
    this.x.set(event.clientX);
    this.y.set(event.clientY);
  }
}
