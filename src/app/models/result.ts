import { FileUpload } from './fileUpload';
export interface Result {
  resultId?: number,
  status?: string,
  comment?: string,
  caseName?: string,
  sectionName?: string,
  caseId?: number,
  fileUploads?: FileUpload[]
}
