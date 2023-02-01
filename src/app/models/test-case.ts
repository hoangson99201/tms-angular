export interface TestCase {
  caseId?: number,
  caseName: string,
  sectionId?: number,
  priorityId?: number,
  estimate?: number,
  preconditions?: string,
  steps?: string,
  expectedResult?: string,
  userId?: number,
  projectId: number,
  sectionName?: string,
  fullname?: string
  isSelected?: boolean
}
