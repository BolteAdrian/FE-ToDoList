export interface TaskSecondary {
  id: number;
  principalTaskId: number;
  title: string;
  objective: string;
  description: string;
  startDate: Date;
  endDate: Date;
  checked: boolean;
  priority: number;
  assignedUser: string;
}
