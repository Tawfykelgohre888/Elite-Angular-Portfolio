import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorGlow } from './shared/components/cursor-glow/cursor-glow';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CursorGlow],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-cursor-glow />
    <router-outlet />
  `,
})
export class App {}
