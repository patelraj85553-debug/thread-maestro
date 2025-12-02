export type ThreadState = 'running' | 'paused' | 'stopped' | 'waiting';

export type ThreadPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Thread {
  id: string;
  name: string;
  state: ThreadState;
  priority: ThreadPriority;
  cpuUsage: number;
  memoryUsage: number;
  startTime: Date;
  executionTime: number; // in milliseconds
  parentId?: string;
}

export interface CPUDataPoint {
  timestamp: number;
  usage: number;
  threadCount: number;
}

export interface SystemStats {
  totalThreads: number;
  runningThreads: number;
  pausedThreads: number;
  stoppedThreads: number;
  waitingThreads: number;
  totalCpuUsage: number;
  totalMemoryUsage: number;
}
