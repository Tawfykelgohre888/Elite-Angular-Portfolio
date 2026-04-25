import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
} from "@angular/core";

/**
 * Adds an .is-visible class when the host enters the viewport.
 * Pair with the .reveal class in styles.css for a cinematic fade-in.
 */
@Directive({
  selector: "[appRevealOnScroll]",
  standalone: true,
  host: { class: "reveal" },
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  readonly delay = input<number>(0); // ms
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      this.el.nativeElement.classList.add("is-visible");
      return;
    }

    const node = this.el.nativeElement;
    node.style.transitionDelay = `${this.delay()}ms`;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
