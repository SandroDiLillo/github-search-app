import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Github } from '../../_core/api/github/github';

@Component({
  selector: 'app-commits',
  imports: [CommonModule,  MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,],
  providers: [Github],
  templateUrl: './commits.html',
  styleUrl: './commits.css'
})
export class Commits {
  commits: any[] = [];
  displayedColumns: string[] = ['author', 'message', 'url'];

  constructor(
    private route: ActivatedRoute,
    private githubService: Github
  ) {}

  ngOnInit(): void {
    const fullName = this.route.snapshot.paramMap.get('owner'); // e.g., "owner/repo"
    const repo = this.route.snapshot.paramMap.get('repo'); // e.g., "repo"
    if (fullName && repo) {
      this.githubService.getCommits(fullName, repo).subscribe((data) => {
        this.commits = data;
      });
    }
  }
}
