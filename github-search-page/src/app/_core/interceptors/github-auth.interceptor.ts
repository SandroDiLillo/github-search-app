// src/app/_core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/env';

export const gitubAuthInterceptorFn: HttpInterceptorFn = (req, next) => {
  const isGitHubRequest = req.url.includes('api.github.com');
const token = environment.githubToken
  if (isGitHubRequest) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json'
      }
    });
    return next(modifiedReq);
  }

  return next(req);
};
