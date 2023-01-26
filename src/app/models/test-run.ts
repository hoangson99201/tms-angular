import { Result } from './result';
export interface TestRun {
  runName: string,
  runId?: string,
  milestoneId?: number,
  assignedToId?: number,
  description?: string,
  userId?: number,
  projectId?: number,
  createdOn?: number[] | string,
  fullname?: string,
  isCompleted?: boolean,
  completedOn?: number[] | string,
  includeAll?: boolean,
  passedCount?: number,
  blockedCount?: number,
  untestedCount?: number,
  retestCount?: number,
  failedCount?: number,
  testRunResults?: Result[],
  results?: Result[], // Report only
}
