export interface Repo {
  id: number;
  name: string;
  full_name: string;
  owner: Owner;
  created_at: string;
  updated_at?: string;
  stargazers_count?: number;
  language?: string;
  html_url?: string;
  // repository_url: string;
}

export interface Owner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface GithubApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repo[];
}

export interface GithubIssue {
  //{total_count: 4797, incomplete_results: false, items: Array(20)}
  total_count: number;
  incomplete_results: boolean;
  items: Issue[];
}

export interface Issue {
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  state: 'open' | 'closed';
  state_reason: string | null;
  locked: boolean;
  assignee: any | null;
  assignees: any[];
  milestone: any | null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  active_lock_reason: string | null;
  body: string;
  reactions: {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  url: string;
  timeline_url: string;
  performed_via_github_app: any | null;
  labels: {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description: string | null;
  }[];
  score: number;
  sub_issues_summary?: {
    total: number;
    completed: number;
    percent_completed: number;
  };
}

