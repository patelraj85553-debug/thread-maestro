import jsPDF from 'jspdf';

export const generateProjectReportPDF = () => {
  const doc = new jsPDF();
  let y = 20;
  const lineHeight = 7;
  const pageHeight = 280;
  const margin = 20;

  const addText = (text: string, fontSize: number = 11, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, 170);
    lines.forEach((line: string) => {
      if (y > pageHeight) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });
  };

  const addHeading = (text: string, level: number = 1) => {
    y += 5;
    const fontSize = level === 1 ? 16 : level === 2 ? 14 : 12;
    addText(text, fontSize, true);
    y += 3;
  };

  const addBullet = (text: string) => {
    if (y > pageHeight) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('•', margin, y);
    const lines = doc.splitTextToSize(text, 165);
    lines.forEach((line: string, index: number) => {
      doc.text(line, margin + 5, y);
      if (index < lines.length - 1) y += lineHeight;
    });
    y += lineHeight;
  };

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('THREAD MANAGEMENT SYSTEM', 105, y, { align: 'center' });
  y += 10;
  doc.setFontSize(14);
  doc.text('Operating System Project Report', 105, y, { align: 'center' });
  y += 20;

  // 1. Project Overview
  addHeading('1. Project Overview');
  addText('This project is a Thread Management System that simulates how an Operating System manages multiple threads using Priority Scheduling algorithm. It provides a visual, interactive interface to understand core OS concepts like thread states, CPU scheduling, burst time, and resource allocation.');
  addText('The system demonstrates real-time thread execution, state transitions, and priority-based CPU time distribution in an educational context.');

  // 2. Module-Wise Breakdown
  addHeading('2. Module-Wise Breakdown');
  
  addHeading('Thread Manager (useThreadManager.ts)', 3);
  addBullet('Core hook managing all thread operations');
  addBullet('Handles thread creation, deletion, state updates');
  addBullet('Runs simulation loop every 500ms');
  addBullet('Tracks CPU history for visualization');

  addHeading('Scheduler (useScheduler.ts)', 3);
  addBullet('Implements Priority Scheduling algorithm');
  addBullet('Calculates CPU share based on priority weights');
  addBullet('Critical: 4x, High: 3x, Medium: 2x, Low: 1x');

  addHeading('Thread Components', 3);
  addBullet('ThreadCard: Displays individual thread info and controls');
  addBullet('ThreadList: Renders all active threads');
  addBullet('ThreadControls: Global simulation controls');
  addBullet('ThreadTimeline: Visual execution history');

  addHeading('Visualization Components', 3);
  addBullet('CPUChart: Real-time CPU usage graph');
  addBullet('SystemStats: Overall system metrics');
  addBullet('SchedulerInfo: Current algorithm details');

  // 3. Functionalities
  addHeading('3. Functionalities');
  addBullet('Create threads with custom name, priority, and burst time');
  addBullet('Delete individual threads');
  addBullet('Manage thread states: Running, Paused, Stopped, Waiting, Completed');
  addBullet('Pause/Resume/Stop individual or all threads');
  addBullet('Priority-based CPU scheduling with weighted time allocation');
  addBullet('Burst time tracking with automatic completion');
  addBullet('Real-time CPU and memory usage monitoring');
  addBullet('Thread execution timeline visualization');
  addBullet('Export thread data as JSON or CSV');

  // 4. Technology Used
  addHeading('4. Technology Used');
  
  addHeading('Programming Languages:', 3);
  addBullet('TypeScript - Primary language with type safety');
  addBullet('JavaScript (ES6+) - Runtime execution');
  addBullet('HTML5/CSS3 - Structure and styling');

  addHeading('Libraries and Tools:', 3);
  addBullet('React 18 - UI component library');
  addBullet('Vite - Build tool and dev server');
  addBullet('Tailwind CSS - Utility-first styling');
  addBullet('Recharts - Data visualization charts');
  addBullet('Radix UI - Accessible UI primitives');
  addBullet('Lucide React - Icon library');
  addBullet('React Router - Client-side routing');
  addBullet('date-fns - Date formatting utilities');

  addHeading('Other Tools:', 3);
  addBullet('GitHub - Version control');
  addBullet('Lovable - Development platform');
  addBullet('npm/bun - Package management');

  // 5. Flow Diagram
  addHeading('5. Flow Diagram');
  y += 3;
  addText('System Architecture Flow:');
  addText('User Input → Thread Manager → Scheduler → State Update → UI Render');
  y += 5;
  addText('Thread State Transitions:');
  addText('Created → Running ↔ Paused → Stopped');
  addText('Running → Completed (when execution time >= burst time)');

  // 6. Revision Tracking
  addHeading('6. Revision Tracking on GitHub');
  addText('Repository Name: [Insert Repository Name]');
  addText('GitHub Link: [Insert Link]');
  y += 3;
  addText('Key Commits:');
  addBullet('Initial project setup with React and TypeScript');
  addBullet('Implemented thread creation and state management');
  addBullet('Added Priority Scheduling algorithm');
  addBullet('Implemented burst time and auto-completion');
  addBullet('Added timeline visualization and data export');

  // 7. Conclusion and Future Scope
  addHeading('7. Conclusion and Future Scope');
  addText('Conclusion:');
  addText('This project successfully demonstrates OS thread management concepts through an interactive visualization. It helps students understand priority scheduling, thread states, and CPU allocation.');
  y += 5;
  addText('Future Scope:');
  addBullet('Add more scheduling algorithms (Round Robin, FCFS, SJF)');
  addBullet('Implement inter-thread communication');
  addBullet('Add deadlock detection and prevention');
  addBullet('Memory management simulation');
  addBullet('Multi-core CPU simulation');

  // 8. References
  addHeading('8. References');
  addBullet('Operating System Concepts - Silberschatz, Galvin, Gagne');
  addBullet('Modern Operating Systems - Andrew S. Tanenbaum');
  addBullet('React Documentation - react.dev');
  addBullet('TypeScript Handbook - typescriptlang.org');

  // Appendix
  doc.addPage();
  y = 20;
  addHeading('APPENDIX');

  addHeading('A. AI-Generated Project Elaboration', 2);
  addText('Thread Object Structure:');
  addText('Each thread contains: id, name, state, priority, cpuUsage, memoryUsage, createdAt, startTime, executionTime, burstTime, parentId');
  y += 3;
  addText('Priority Scheduling Implementation:');
  addText('CPU Share = (Thread Priority Weight / Sum of All Running Thread Weights) × 100');
  addText('Priority Weights: Critical=4, High=3, Medium=2, Low=1');
  y += 3;
  addText('Simulation Loop (runs every 500ms):');
  addBullet('Calculate CPU share for each running thread');
  addBullet('Update execution time (+0.5 seconds)');
  addBullet('Check if execution time >= burst time');
  addBullet('Mark completed threads and update stats');

  addHeading('B. Problem Statement', 2);
  addText('Design and implement a Thread Management System that simulates how an Operating System manages multiple threads using CPU scheduling algorithms. The system should provide visual representation of thread states, priority-based execution, and resource utilization to help understand core OS concepts.');

  addHeading('C. Solution/Code: Logical Part', 2);
  addText('Core Scheduling Logic (from useThreadManager.ts):');
  y += 3;
  doc.setFontSize(9);
  doc.setFont('courier', 'normal');
  const codeLines = [
    'const runningThreads = threads.filter(t => t.state === "running");',
    'const totalWeight = runningThreads.reduce((sum, t) =>',
    '  sum + PRIORITY_WEIGHTS[t.priority], 0);',
    '',
    'runningThreads.forEach(thread => {',
    '  const weight = PRIORITY_WEIGHTS[thread.priority];',
    '  const cpuShare = (weight / totalWeight) * 100;',
    '  thread.cpuUsage = Math.min(cpuShare, 100);',
    '  thread.executionTime += 0.5;',
    '',
    '  if (thread.executionTime >= thread.burstTime) {',
    '    thread.state = "completed";',
    '    thread.cpuUsage = 0;',
    '  }',
    '});'
  ];
  codeLines.forEach(line => {
    if (y > pageHeight) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, margin, y);
    y += 5;
  });

  // Save PDF
  doc.save('Thread_Management_System_Report.pdf');
};
