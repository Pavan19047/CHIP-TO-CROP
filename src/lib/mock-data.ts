import type { User, SortSession, SortEvent, Farm, Machine } from './types';

export const mockUser: User = {
  name: 'John Farmer',
  email: 'john.farmer@krishigrade.com',
  avatarUrl: 'https://picsum.photos/seed/user-avatar-1/100/100',
};

export const mockFarm: Farm = {
    name: "Farmer John's Fields",
    location: "Salinas Valley, CA",
    contact: "john.farmer@krishigrade.com"
}

export const mockMachines: Machine[] = [
    {
        id: 'AG-001',
        farmId: 'FARM-01',
        model: 'KrishiGrade Sorter v2.1',
        registrationDate: new Date('2023-05-15')
    },
    {
        id: 'AG-002',
        farmId: 'FARM-01',
        model: 'KrishiGrade Sorter v2.3',
        registrationDate: new Date('2024-01-20')
    }
];

export const mockSortSessions: SortSession[] = [
  {
    id: 'SESSION-001',
    machineId: 'AG-001',
    startTime: new Date(new Date().setDate(new Date().getDate() - 1)),
    endTime: new Date(new Date().setDate(new Date().getDate() - 1)),
    totalSorted: 10250,
    ripeCount: 9840,
    unripeCount: 410,
    errorRate: 0.04,
  },
  {
    id: 'SESSION-002',
    machineId: 'AG-002',
    startTime: new Date(new Date().setDate(new Date().getDate() - 2)),
    endTime: new Date(new Date().setDate(new Date().getDate() - 2)),
    totalSorted: 15300,
    ripeCount: 14535,
    unripeCount: 765,
    errorRate: 0.05,
  },
  {
    id: 'SESSION-003',
    machineId: 'AG-001',
    startTime: new Date(new Date().setDate(new Date().getDate() - 3)),
    endTime: new Date(new Date().setDate(new Date().getDate() - 3)),
    totalSorted: 8900,
    ripeCount: 8010,
    unripeCount: 890,
    errorRate: 0.1, // High error rate
  },
   {
    id: 'SESSION-004',
    machineId: 'AG-002',
    startTime: new Date(new Date().setDate(new Date().getDate() - 4)),
    endTime: new Date(new Date().setDate(new Date().getDate() - 4)),
    totalSorted: 11200,
    ripeCount: 10976,
    unripeCount: 224,
    errorRate: 0.02,
  },
   {
    id: 'SESSION-005',
    machineId: 'AG-001',
    startTime: new Date(new Date().setDate(new Date().getDate() - 5)),
    endTime: new Date(new Date().setDate(new Date().getDate() - 5)),
    totalSorted: 13450,
    ripeCount: 12000,
    unripeCount: 1450,
    errorRate: 0.107, // High error rate
  },
].map(s => ({...s, totalSorted: s.ripeCount + s.unripeCount}));

export const mockSortEvents: SortEvent[] = Array.from({ length: 50 }, (_, i) => {
    const isRipe = Math.random() > 0.1;
    return {
        id: `event-${i}`,
        timestamp: new Date(Date.now() - i * 1000 * Math.random()),
        fruitType: 'Tomato',
        classification: isRipe ? 'Ripe' : 'Unripe',
        isError: Math.random() < 0.05
    }
}).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
