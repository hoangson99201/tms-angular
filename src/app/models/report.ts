import { TestRun } from 'src/app/models/test-run';
import { Result } from 'src/app/models/result';
export interface Report {
  reportId?: number,
  reportName?: string,
  reportDescription?: string,
  createdBy?: number,
  createdOn?: number | string,
  projectId?: number,
  jsonData?: string | {
    results: Result[],
    testRuns: TestRun[]
  },
  projectName?: string,
  fullName?: string,
  testRunIds? : any[]
}
