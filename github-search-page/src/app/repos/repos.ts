import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, debounceTime, distinctUntilChanged, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { Github } from '../_core/api/github/github';
import { Repo } from './model/SearchPage';
@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    MatPaginator,
    MatTabsModule,
  ],
  providers: [
    Github
  ],
  templateUrl: './repos.html',
  styleUrls: ['./repos.css']
})
export class Repos implements OnInit {
  constructor(private fb: FormBuilder, private githubService: Github, private router: Router) {
    // The constructor is used to inject dependencies
  }
  selectedTabIndex = 0;
  repoForm!: UntypedFormGroup;
  issueForm!: UntypedFormGroup;
  nameControl = new UntypedFormControl('', { validators: [Validators.required] });
  languageControl = new UntypedFormControl('');
  starsControl = new UntypedFormControl(0);
  languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go'];
  displayedColumns: string[] = ['avatar', 'name', 'created_at'];

  repos$: Observable<Repo[]> = of([]);
  pageIndex = 0;
  pageSize = 20;
  totalCount = 0;
  isLoading = false;
  private pageChange$ = new BehaviorSubject<{ pageIndex: number, pageSize: number }>({ pageIndex: 0, pageSize: 20 });
  private tabChange$ = new BehaviorSubject<number>(0);

  ngOnInit() {
    this.repoForm = this.fb.group({
      nameControl: ['', [Validators.required, Validators.minLength(3)]],
      languageControl: [''],
      starsControl: [0],
    });

    this.issueForm = this.fb.group({
      issueTextControl: ['', [Validators.required]],
    });

    // Watch tab changes and reset pagination + trigger search
    this.tabChange$.subscribe(tabIndex => {
      this.pageChange$.next({ pageIndex: 0, pageSize: 20 });
      // reset forms if you want
      if (tabIndex === 0) this.issueForm.reset();
      else this.repoForm.reset();
    });

    // Combine tab, page changes and form value changes to trigger search
    this.repos$ = combineLatest([
      this.tabChange$,
      this.pageChange$,
      this.repoForm.valueChanges.pipe(
        startWith(this.repoForm.value),
        debounceTime(300),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      ),
      this.issueForm.valueChanges.pipe(
        startWith(this.issueForm.value),
        debounceTime(300),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
    ]).pipe(
      tap(() => {
        this.isLoading = true;
      }),
      switchMap(([tabIndex, page, repoFormVal, issueFormVal]) => {
        if (tabIndex === 0) {
          // repo tab
          const q = this.buildRepoQuery(repoFormVal);
          if (!q) {
            this.totalCount = 0;
            return of([]);
          }
          const params = new HttpParams()
            .set('q', q)
            .set('sort', 'stars')
            .set('order', 'desc')
            .set('per_page', page.pageSize.toString())
            .set('page', (page.pageIndex + 1).toString());
          return this.githubService.searchRepositories(params).pipe(
            tap(res => this.totalCount = res.total_count ?? 0),
            map(res => res.items ?? [])
          );
        } else {
          // issue tab
          const issueText = issueFormVal.issueTextControl?.trim() ?? '';
          if (!issueText) {
            this.totalCount = 0;
            return of([]);
          }
          const q = `*${issueText}* in:title`;
          const params = new HttpParams()
            .set('q', q)
            .set('per_page', page.pageSize.toString())
            .set('page', (page.pageIndex + 1).toString());
          return this.githubService.searchReposByIssueTitle(params).pipe(
            tap(res => this.totalCount = res.total_count ?? 0),
            map(res => res.items ?? [])

          );
        }
      }),
      catchError(err => {
        console.error('Error fetching repositories:', err);
        this.isLoading = false;
        this.totalCount = 0;
        return of([]);
      })
    )


  }

  // Helper to build repo query string
  private buildRepoQuery(formVal: any): string | null {
    const name = formVal.nameControl?.trim() ?? '';
    if (!name) return null;
    let q = `${name} in:name`;
    if (formVal.languageControl) q += ` language:${formVal.languageControl}`;
    if (formVal.starsControl && formVal.starsControl > 0) q += ` stars:>=${formVal.starsControl}`;
    return q;
  }

  onPageChange(event: PageEvent) {
    this.pageChange$.next({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
    this.tabChange$.next(index);
  }

  openCommits(repo: Repo): void {
  const repoFullName = repo.owner.login; 
  const repoName = repo.name;
  if (!repoFullName || !repoName) {
    console.error('Repository full name or name is missing:', repo);
    return;
  }
  // Navigate to the commits page with the full repository name
  this.router.navigate(['/commits', repoFullName, repoName])
}
}