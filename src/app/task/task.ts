

export interface Task {
  id: number;
  title: string;
  objective: string;
  description: string;
  startDate: Date;
  endDate: Date;
  checked: boolean;
  priority: number;
  assignedUser: string;
}
