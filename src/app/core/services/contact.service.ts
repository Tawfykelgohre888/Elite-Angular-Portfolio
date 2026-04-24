import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ContactPayload, ContactResult } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  // UI state surfaced as signals
  readonly isSubmitting = signal(false);
  readonly lastResult = signal<ContactResult | null>(null);
  readonly errorMessage = signal<string | null>(null);

  async send(payload: ContactPayload): Promise<ContactResult> {
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const result = await firstValueFrom(
        this.http.post<ContactResult>('/api/mock/contact', payload),
      );
      this.lastResult.set(result);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      this.errorMessage.set(message);
      throw err;
    } finally {
      this.isSubmitting.set(false);
    }
  }

  reset(): void {
    this.lastResult.set(null);
    this.errorMessage.set(null);
  }
}
