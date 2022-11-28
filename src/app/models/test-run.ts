export interface TestRun {
  runName: string,
  milestoneId?: number,
  assignedToId?: number,
  description?: string,
  userId?: number,
  projectId?: number,
  createdOn?: number[] | string,
  fullname?: string,
  isCompleted?: boolean,
  completedOn?: number[] | string
}
