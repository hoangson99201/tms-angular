export interface Milestone {
  milestoneName: string,
  description?: string,
  startDate?: string | number[],
  endDate?: string | number[],
  projectId: number,
  completed?: boolean
}
