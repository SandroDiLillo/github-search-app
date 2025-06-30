import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/env';
import { GithubIssue, Repo } from '../../../repos/model/SearchPage';
import { Commit } from '../../../repos/model/CommitsPage';

interface GithubApiResponse {
  items: Repo[];
  total_count: number;
  // add other fields you need
}

@Injectable()
export class Github {
  private readonly baseUrl = environment.githubApiBaseUrl;

  // Replace with your GitHub token or use environment variables
  private readonly authToken = environment.githubToken;

  constructor(private http: HttpClient) { }

  /**
   * Searches GitHub issues by title.
   * @param params HttpParams containing search criteria.
   * @returns Observable of GithubApiResponse containing search results.
   */
  searchReposByIssueTitle(params: HttpParams): Observable<GithubApiResponse> {
    const url = `${this.baseUrl}${environment.githubSearchIssuesPath}`;
    return this.http.get<GithubIssue>(url, { params })
      .pipe(
        map(response => {
          return this.extractUniqueReposFromIssues(response);
        })
      );
  }

  /**
   * Extracts unique repositories from the issues returned by the GitHub API.
   * @param issues The issues returned by the GitHub API.
   * @returns An object containing unique repositories and their total count.
   */
  private extractUniqueReposFromIssues(issues: GithubIssue): GithubApiResponse {
    const repoMap = new Map<string, Repo>();
    for (const issue of issues.items) {
      if (issue.repository_url) {
        const repoUrl = issue.repository_url;
        if (!repoMap.has(repoUrl)) {
          const repo: Repo = {
            id: issue.id,
            name: issue.title, // Assuming title is used as name
            full_name: repoUrl.split('/').slice(-2).join('/'), // Extracting full name from URL
            owner: {
              login: issue.user.login,
              id: issue.user.id,
              avatar_url: issue.user.avatar_url,
              html_url: issue.user.html_url,
            },
            created_at: new Date(issue.created_at).toISOString(),
          };
          repoMap.set(repoUrl, repo);
        }
      }
    }

    const uniqueRepos = Array.from(repoMap.values());

    return {
      items: uniqueRepos,
      total_count: uniqueRepos.length,
    };
  }

  /**
   * Searches GitHub repositories based on the provided parameters.
   * @param params HttpParams containing search criteria.
   * @returns Observable of GithubApiResponse containing search results.
   */
  searchRepositories(
    params: HttpParams
  ): Observable<GithubApiResponse> {

    return this.http
      .get<GithubApiResponse>(`${this.baseUrl}${environment.githubSearchReposPath}`, { params })
      .pipe(
        map(response => ({
          items: response.items || [],
          total_count: response.total_count || 0
        })),
        catchError(err => {
          console.error('GitHub API error', err);
          return of({ items: [], total_count: 0 }); // fallback to empty GithubApiResponse on error
        })
      );
  }

/**
   * Fetches commits for a specific repository.
   * @param owner The owner of the repository.
   * @param repo The name of the repository.
   * @returns Observable of Commit array containing commit details.
   */

  getCommits(owner: string, repo: string): Observable<Commit[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits`;
  return this.http.get<Commit[]>(url);
}
}
