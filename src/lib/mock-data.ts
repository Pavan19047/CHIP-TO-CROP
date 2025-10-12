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

// Use static dates to avoid hydration mismatches
const now = new Date('2024-10-12T12:00:00Z');
const yesterday = new Date('2024-10-11T12:00:00Z');
const twoDaysAgo = new Date('2024-10-10T12:00:00Z');
const threeDaysAgo = new Date('2024-10-09T12:00:00Z');
const fourDaysAgo = new Date('2024-10-08T12:00:00Z');
const fiveDaysAgo = new Date('2024-10-07T12:00:00Z');

export const mockSortSessions: SortSession[] = [
  {
    id: 'SESSION-001',
    machineId: 'AG-001',
    startTime: yesterday,
    endTime: yesterday,
    totalSorted: 10250,
    ripeCount: 9840,
    unripeCount: 410,
    errorRate: 0.04,
  },
  {
    id: 'SESSION-002',
    machineId: 'AG-002',
    startTime: twoDaysAgo,
    endTime: twoDaysAgo,
    totalSorted: 15300,
    ripeCount: 14535,
    unripeCount: 765,
    errorRate: 0.05,
  },
  {
    id: 'SESSION-003',
    machineId: 'AG-001',
    startTime: threeDaysAgo,
    endTime: threeDaysAgo,
    totalSorted: 8900,
    ripeCount: 8010,
    unripeCount: 890,
    errorRate: 0.1, // High error rate
  },
   {
    id: 'SESSION-004',
    machineId: 'AG-002',
    startTime: fourDaysAgo,
    endTime: fourDaysAgo,
    totalSorted: 11200,
    ripeCount: 10976,
    unripeCount: 224,
    errorRate: 0.02,
  },
   {
    id: 'SESSION-005',
    machineId: 'AG-001',
    startTime: fiveDaysAgo,
    endTime: fiveDaysAgo,
    totalSorted: 13450,
    ripeCount: 12000,
    unripeCount: 1450,
    errorRate: 0.107, // High error rate
  },
].map(s => ({...s, totalSorted: s.ripeCount + s.unripeCount}));

// Generate static events to avoid hydration mismatches
export const mockSortEvents: SortEvent[] = Array.from({ length: 50 }, (_, i) => {
    const isRipe = i % 10 !== 0; // Deterministic instead of Math.random()
    const baseTime = new Date('2024-10-12T12:00:00Z').getTime();
    return {
        id: `event-${i}`,
        timestamp: new Date(baseTime - i * 60000), // 1 minute intervals
        fruitType: 'Tomato' as const,
        classification: (isRipe ? 'Ripe' : 'Unripe') as 'Ripe' | 'Unripe',
        isError: i % 20 === 0 // Deterministic error rate (~5%)
    }
}).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
