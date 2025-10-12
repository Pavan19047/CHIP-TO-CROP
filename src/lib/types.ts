export type SortEvent = {
  id: string;
  timestamp: Date;
  fruitType: 'Tomato';
  classification: 'Ripe' | 'Unripe';
  isError?: boolean;
};

export type SortSession = {
  id: string;
  machineId: string;
  startTime: Date;
  endTime: Date;
  totalSorted: number;
  ripeCount: number;
  unripeCount: number;
  errorRate: number;
};

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
};

export type Farm = {
  name: string;
  location: string;
  contact: string;
}

export type Machine = {
  id: string;
  farmId: string;
  model: string;
  registrationDate: Date;
}
