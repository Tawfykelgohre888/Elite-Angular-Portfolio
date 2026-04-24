import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Functional interceptor that mocks /api/mock/* endpoints so the portfolio
 * is fully self-contained — no real backend needed.
 */
export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url === '/api/mock/contact' && req.method === 'POST') {
    return of(
      new HttpResponse({
        status: 200,
        body: {
          success: true,
          id: `msg_${Math.random().toString(36).slice(2, 10)}`,
          receivedAt: new Date().toISOString(),
        },
      }),
    ).pipe(delay(900));
  }

  return next(req);
};
