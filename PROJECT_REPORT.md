# Thread Management System - Project Report

## Operating System Course Project

---

## 1. Project Title
**Thread Management System with Priority Scheduling Algorithm**

---

## 2. Abstract
This project implements a visual Thread Management System that simulates CPU thread scheduling using Priority Scheduling Algorithm. The system provides real-time visualization of thread states, CPU usage, and execution timelines. It serves as an educational tool to understand operating system concepts like process scheduling, thread lifecycle management, and resource allocation.

---

## 3. Introduction

### 3.1 Background
In modern operating systems, efficient thread management and CPU scheduling are crucial for optimal system performance. This project demonstrates how operating systems manage multiple threads competing for CPU resources.

### 3.2 Objectives
- Implement a visual thread management system
- Demonstrate Priority Scheduling Algorithm
- Provide real-time CPU usage monitoring
- Enable thread lifecycle management (create, pause, resume, stop)
- Visualize thread execution timeline

---

## 4. System Features

### 4.1 Core Features
| Feature | Description |
|---------|-------------|
| Thread Creation | Create threads with custom names, priorities, and burst times |
| Thread Deletion | Remove threads from the system |
| State Management | Manage thread states (Running, Paused, Stopped, Waiting, Completed) |
| Priority Assignment | Assign priorities (Low, Medium, High, Critical) |
| Burst Time | Auto-completion when execution time reaches burst time |

### 4.2 Visualization Features
| Feature | Description |
|---------|-------------|
| CPU Usage Chart | Real-time line chart showing CPU usage over time |
| System Statistics | Display total threads, running count, CPU & memory usage |
| Thread Timeline | Visual timeline showing thread execution history |
| Thread Cards | Individual cards showing thread details and progress |

### 4.3 Data Export
- Export thread data as JSON format
- Export thread data as CSV format

---

## 5. Scheduling Algorithm

### 5.1 Priority Scheduling
The system implements **Priority Scheduling Algorithm** where CPU time is allocated based on thread priority levels.

### 5.2 Priority Weights
| Priority | Weight | CPU Share Multiplier |
|----------|--------|---------------------|
| Critical | 4 | 4x |
| High | 3 | 3x |
| Medium | 2 | 2x |
| Low | 1 | 1x |

### 5.3 Algorithm Working
1. Threads are sorted by priority level
2. Higher priority threads receive more CPU time
3. Round Robin scheduling is used for threads with equal priority
4. Time quantum is set to 4 units

### 5.4 CPU Share Calculation
```
CPU Share = (Thread Priority Weight / Sum of All Running Thread Weights) × 100%
```

---

## 6. System Architecture

### 6.1 Technology Stack
| Technology | Purpose |
|------------|---------|
| React 18 | Frontend Framework |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Styling |
| Recharts | Data Visualization |
| Vite | Build Tool |

### 6.2 Component Structure
```
src/
├── components/
│   └── thread/
│       ├── ThreadCard.tsx        # Individual thread display
│       ├── ThreadList.tsx        # List of all threads
│       ├── ThreadControls.tsx    # Control buttons
│       ├── ThreadTimeline.tsx    # Execution timeline
│       ├── CPUChart.tsx          # CPU usage chart
│       ├── SystemStats.tsx       # System statistics
│       ├── SchedulerInfo.tsx     # Scheduler information
│       └── CreateThreadDialog.tsx # Thread creation form
├── hooks/
│   ├── useThreadManager.ts       # Thread management logic
│   └── useScheduler.ts           # Scheduling algorithm
├── types/
│   └── thread.ts                 # TypeScript interfaces
└── pages/
    └── Index.tsx                 # Main dashboard
```

---

## 7. Data Structures

### 7.1 Thread Interface
```typescript
interface Thread {
  id: string;
  name: string;
  state: ThreadState;        // 'running' | 'paused' | 'stopped' | 'waiting' | 'completed'
  priority: ThreadPriority;  // 'low' | 'medium' | 'high' | 'critical'
  cpuUsage: number;          // 0-100%
  memoryUsage: number;       // In MB
  startTime: Date;
  executionTime: number;     // In milliseconds
  burstTime: number;         // Total execution duration
  parentId?: string;
}
```

### 7.2 System Statistics Interface
```typescript
interface SystemStats {
  totalThreads: number;
  runningThreads: number;
  pausedThreads: number;
  completedThreads: number;
  totalCpuUsage: number;
  totalMemoryUsage: number;
}
```

---

## 8. Implementation Details

### 8.1 Thread Simulation
- Threads are simulated with random CPU and memory fluctuations
- Running threads accumulate execution time
- Threads auto-complete when execution time reaches burst time
- CPU usage is calculated based on priority weights

### 8.2 State Transitions
```
Created → Running → Paused → Running → Completed
                  → Stopped
```

### 8.3 Key Functions
| Function | Description |
|----------|-------------|
| `createThread()` | Creates a new thread with specified parameters |
| `deleteThread()` | Removes a thread from the system |
| `pauseThread()` | Pauses a running thread |
| `resumeThread()` | Resumes a paused thread |
| `stopThread()` | Stops a thread permanently |
| `updateThreadPriority()` | Changes thread priority |
| `calculatePriorityCpuShare()` | Calculates CPU share based on priority |

---

## 9. User Interface

### 9.1 Dashboard Layout
1. **Header** - Project title and information
2. **System Statistics** - Overview of system state
3. **CPU Chart** - Real-time CPU usage visualization
4. **Scheduler Info** - Current scheduling algorithm details
5. **Thread Timeline** - Execution history visualization
6. **Thread Controls** - Global control buttons
7. **Thread List** - Individual thread management

### 9.2 Color Coding
| State | Color |
|-------|-------|
| Running | Green |
| Paused | Yellow |
| Stopped | Red |
| Waiting | Blue |
| Completed | Cyan |

---

## 10. Screenshots

### Main Dashboard
- System statistics cards showing thread counts and resource usage
- Real-time CPU usage chart with historical data
- Thread timeline with execution bars
- Individual thread cards with progress indicators

---

## 11. How to Run

### 11.1 Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 11.2 Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd thread-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

### 11.3 Access
Open browser and navigate to `http://localhost:5173`

---

## 12. Future Enhancements
1. Implement additional scheduling algorithms (FCFS, SJF, Round Robin)
2. Add inter-thread communication simulation
3. Implement deadlock detection
4. Add memory management visualization
5. Support for thread synchronization primitives

---

## 13. Conclusion
This Thread Management System successfully demonstrates key operating system concepts including:
- Thread lifecycle management
- Priority-based CPU scheduling
- Resource allocation and monitoring
- Real-time system visualization

The project provides an interactive and educational platform for understanding how modern operating systems manage concurrent threads and allocate CPU resources.

---

## 14. References
1. Silberschatz, A., Galvin, P. B., & Gagne, G. - Operating System Concepts
2. Tanenbaum, A. S. - Modern Operating Systems
3. React Documentation - https://react.dev
4. TypeScript Documentation - https://www.typescriptlang.org

---

## 15. Project Information
- **Course**: Operating System
- **Project Type**: Simulation & Visualization
- **Technology**: React, TypeScript, Tailwind CSS
- **Live Demo**: Available via Lovable deployment

---

*Report Generated: December 2024*
