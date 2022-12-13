export interface Milestone {
  milestoneId?: number,
  milestoneName: string,
  description?: string,
  startDate?: string | number[],
  endDate?: string | number[],
  projectId: number,
  completed?: boolean,
  completedOn?: string | number[],
  activeTestRun?: number
}
