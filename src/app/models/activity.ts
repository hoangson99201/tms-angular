export interface Activity {
  id: number,
  createdOn?: number | string,
  type: string,
  name: string,
  action: string,
  userId: number,
  projectId: number,
  targetId: number,
  description?: string,
  userName: string,
  className?: string,
  url?: string
}
