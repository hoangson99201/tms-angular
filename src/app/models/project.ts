export interface Project {
  projectId?: number,
  projectName: string,
  announcement?: string,
  masterId?: number,
  completed?: boolean,
  activeMilestone?: number,
  activeTestRun?: number,
  startDate?: string | number[],
  endDate?: string | number[],
}
