import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectReport = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black print:bg-white">
      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden fixed top-4 left-4 z-50 flex gap-2">
        <Button variant="outline" onClick={() => navigate("/")} className="bg-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to App
        </Button>
        <Button onClick={handlePrint} className="bg-cyan-600 hover:bg-cyan-700 text-white">
          <Printer className="w-4 h-4 mr-2" />
          Save as PDF
        </Button>
      </div>

      {/* Report Content */}
      <div className="max-w-4xl mx-auto p-8 print:p-0 print:max-w-none">
        {/* Title Page */}
        <div className="text-center mb-16 print:mb-12 pt-20 print:pt-8">
          <div className="border-4 border-black p-8 mb-8">
            <h1 className="text-4xl font-bold mb-4">Thread Management System</h1>
            <h2 className="text-2xl mb-2">with Priority Scheduling Algorithm</h2>
            <p className="text-lg text-gray-600">Operating System Course Project</p>
          </div>
          
          <div className="mt-12 text-left max-w-md mx-auto space-y-2">
            <p><strong>Subject:</strong> Operating System</p>
            <p><strong>Project Type:</strong> Simulation & Visualization</p>
            <p><strong>Technology:</strong> React, TypeScript, Tailwind CSS</p>
            <p><strong>Date:</strong> December 2024</p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 print:break-before-page">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-1 text-lg">
            <li>Abstract</li>
            <li>Introduction</li>
            <li>System Features</li>
            <li>Scheduling Algorithm</li>
            <li>System Architecture</li>
            <li>Data Structures</li>
            <li>Implementation Details</li>
            <li>User Interface</li>
            <li>How to Run</li>
            <li>Future Enhancements</li>
            <li>Conclusion</li>
            <li>References</li>
          </ol>
        </div>

        {/* Section 1: Abstract */}
        <section className="mb-10 print:break-before-page">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">1. Abstract</h2>
          <p className="text-justify leading-relaxed">
            This project implements a visual Thread Management System that simulates CPU thread scheduling 
            using Priority Scheduling Algorithm. The system provides real-time visualization of thread states, 
            CPU usage, and execution timelines. It serves as an educational tool to understand operating system 
            concepts like process scheduling, thread lifecycle management, and resource allocation.
          </p>
        </section>

        {/* Section 2: Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">2. Introduction</h2>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">2.1 Background</h3>
          <p className="text-justify leading-relaxed mb-4">
            In modern operating systems, efficient thread management and CPU scheduling are crucial for 
            optimal system performance. This project demonstrates how operating systems manage multiple 
            threads competing for CPU resources through visual simulation.
          </p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">2.2 Objectives</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Implement a visual thread management system</li>
            <li>Demonstrate Priority Scheduling Algorithm</li>
            <li>Provide real-time CPU usage monitoring</li>
            <li>Enable thread lifecycle management (create, pause, resume, stop)</li>
            <li>Visualize thread execution timeline</li>
          </ul>
        </section>

        {/* Section 3: System Features */}
        <section className="mb-10 print:break-before-page">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">3. System Features</h2>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">3.1 Core Features</h3>
          <table className="w-full border-collapse border border-black mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left">Feature</th>
                <th className="border border-black p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 font-medium">Thread Creation</td>
                <td className="border border-black p-2">Create threads with custom names, priorities, and burst times</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-medium">Thread Deletion</td>
                <td className="border border-black p-2">Remove threads from the system</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-medium">State Management</td>
                <td className="border border-black p-2">Manage thread states (Running, Paused, Stopped, Waiting, Completed)</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-medium">Priority Assignment</td>
                <td className="border border-black p-2">Assign priorities (Low, Medium, High, Critical)</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-medium">Burst Time</td>
                <td className="border border-black p-2">Auto-completion when execution time reaches burst time</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mt-4 mb-2">3.2 Visualization Features</h3>
          <table className="w-full border-collapse border border-black mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left">Feature</th>
                <th className="border border-black p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 font-medium">CPU Usage Chart</td>
                <td className="border border-black p-2">Real-time line chart showing CPU usage over time</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-medium">System Statistics</td>
                <td className="border border-black p-2">Display total threads, running count, CPU & memory usage</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-medium">Thread Timeline</td>
                <td className="border border-black p-2">Visual timeline showing thread execution history</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-medium">Data Export</td>
                <td className="border border-black p-2">Export thread data as JSON or CSV format</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 4: Scheduling Algorithm */}
        <section className="mb-10 print:break-before-page">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">4. Scheduling Algorithm</h2>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">4.1 Priority Scheduling</h3>
          <p className="text-justify leading-relaxed mb-4">
            The system implements Priority Scheduling Algorithm where CPU time is allocated based on 
            thread priority levels. Higher priority threads receive more CPU time compared to lower priority threads.
          </p>

          <h3 className="text-xl font-semibold mt-4 mb-2">4.2 Priority Weights</h3>
          <table className="w-full border-collapse border border-black mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left">Priority</th>
                <th className="border border-black p-2 text-center">Weight</th>
                <th className="border border-black p-2 text-center">CPU Share Multiplier</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">Critical</td>
                <td className="border border-black p-2 text-center">4</td>
                <td className="border border-black p-2 text-center">4x</td>
              </tr>
              <tr>
                <td className="border border-black p-2">High</td>
                <td className="border border-black p-2 text-center">3</td>
                <td className="border border-black p-2 text-center">3x</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Medium</td>
                <td className="border border-black p-2 text-center">2</td>
                <td className="border border-black p-2 text-center">2x</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Low</td>
                <td className="border border-black p-2 text-center">1</td>
                <td className="border border-black p-2 text-center">1x</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mt-4 mb-2">4.3 CPU Share Calculation Formula</h3>
          <div className="bg-gray-100 p-4 rounded border border-black text-center font-mono">
            CPU Share = (Thread Priority Weight / Sum of All Running Thread Weights) × 100%
          </div>
        </section>

        {/* Section 5: System Architecture */}
        <section className="mb-10 print:break-before-page">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">5. System Architecture</h2>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">5.1 Technology Stack</h3>
          <table className="w-full border-collapse border border-black mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left">Technology</th>
                <th className="border border-black p-2 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">React 18</td>
                <td className="border border-black p-2">Frontend Framework</td>
              </tr>
              <tr>
                <td className="border border-black p-2">TypeScript</td>
                <td className="border border-black p-2">Type-safe JavaScript</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Tailwind CSS</td>
                <td className="border border-black p-2">Styling Framework</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Recharts</td>
                <td className="border border-black p-2">Data Visualization</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Vite</td>
                <td className="border border-black p-2">Build Tool</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mt-4 mb-2">5.2 Component Structure</h3>
          <pre className="bg-gray-100 p-4 rounded border border-black text-sm overflow-x-auto">
{`src/
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
    └── Index.tsx                 # Main dashboard`}
          </pre>
        </section>

        {/* Section 6: Data Structures */}
        <section className="mb-10 print:break-before-page">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">6. Data Structures</h2>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">6.1 Thread Interface</h3>
          <pre className="bg-gray-100 p-4 rounded border border-black text-sm overflow-x-auto">
{`interface Thread {
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
}`}
          </pre>

          <h3 className="text-xl font-semibold mt-4 mb-2">6.2 System Statistics Interface</h3>
          <pre className="bg-gray-100 p-4 rounded border border-black text-sm overflow-x-auto">
{`interface SystemStats {
  totalThreads: number;
  runningThreads: number;
  pausedThreads: number;
  completedThreads: number;
  totalCpuUsage: number;
  totalMemoryUsage: number;
}`}
          </pre>
        </section>

        {/* Section 7: Implementation Details */}
        <section className="mb-10 print:break-before-page">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">7. Implementation Details</h2>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">7.1 Thread Simulation</h3>
          <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
            <li>Threads are simulated with random CPU and memory fluctuations</li>
            <li>Running threads accumulate execution time</li>
            <li>Threads auto-complete when execution time reaches burst time</li>
            <li>CPU usage is calculated based on priority weights</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">7.2 State Transitions</h3>
          <div className="bg-gray-100 p-4 rounded border border-black text-center font-mono mb-4">
            Created → Running → Paused → Running → Completed<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stopped
          </div>

          <h3 className="text-xl font-semibold mt-4 mb-2">7.3 Key Functions</h3>
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left">Function</th>
                <th className="border border-black p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 font-mono text-sm">createThread()</td>
                <td className="border border-black p-2">Creates a new thread with specified parameters</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-mono text-sm">deleteThread()</td>
                <td className="border border-black p-2">Removes a thread from the system</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-mono text-sm">pauseThread()</td>
                <td className="border border-black p-2">Pauses a running thread</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-mono text-sm">resumeThread()</td>
                <td className="border border-black p-2">Resumes a paused thread</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-mono text-sm">stopThread()</td>
                <td className="border border-black p-2">Stops a thread permanently</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-mono text-sm">calculatePriorityCpuShare()</td>
                <td className="border border-black p-2">Calculates CPU share based on priority</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 8: User Interface */}
        <section className="mb-10 print:break-before-page">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">8. User Interface</h2>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">8.1 Dashboard Layout</h3>
          <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
            <li><strong>Header</strong> - Project title and information</li>
            <li><strong>System Statistics</strong> - Overview of system state</li>
            <li><strong>CPU Chart</strong> - Real-time CPU usage visualization</li>
            <li><strong>Scheduler Info</strong> - Current scheduling algorithm details</li>
            <li><strong>Thread Timeline</strong> - Execution history visualization</li>
            <li><strong>Thread Controls</strong> - Global control buttons</li>
            <li><strong>Thread List</strong> - Individual thread management</li>
          </ol>

          <h3 className="text-xl font-semibold mt-4 mb-2">8.2 Color Coding for Thread States</h3>
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left">State</th>
                <th className="border border-black p-2 text-left">Color</th>
                <th className="border border-black p-2 text-center">Visual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">Running</td>
                <td className="border border-black p-2">Green</td>
                <td className="border border-black p-2"><div className="w-8 h-4 bg-green-500 mx-auto rounded"></div></td>
              </tr>
              <tr>
                <td className="border border-black p-2">Paused</td>
                <td className="border border-black p-2">Yellow</td>
                <td className="border border-black p-2"><div className="w-8 h-4 bg-yellow-500 mx-auto rounded"></div></td>
              </tr>
              <tr>
                <td className="border border-black p-2">Stopped</td>
                <td className="border border-black p-2">Red</td>
                <td className="border border-black p-2"><div className="w-8 h-4 bg-red-500 mx-auto rounded"></div></td>
              </tr>
              <tr>
                <td className="border border-black p-2">Waiting</td>
                <td className="border border-black p-2">Blue</td>
                <td className="border border-black p-2"><div className="w-8 h-4 bg-blue-500 mx-auto rounded"></div></td>
              </tr>
              <tr>
                <td className="border border-black p-2">Completed</td>
                <td className="border border-black p-2">Cyan</td>
                <td className="border border-black p-2"><div className="w-8 h-4 bg-cyan-500 mx-auto rounded"></div></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 9: How to Run */}
        <section className="mb-10 print:break-before-page">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">9. How to Run</h2>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">9.1 Prerequisites</h3>
          <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
            <li>Node.js (v18 or higher)</li>
            <li>npm or yarn package manager</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">9.2 Installation Steps</h3>
          <pre className="bg-gray-100 p-4 rounded border border-black text-sm overflow-x-auto">
{`# Step 1: Clone the repository
git clone <repository-url>

# Step 2: Navigate to project directory
cd thread-manager

# Step 3: Install dependencies
npm install

# Step 4: Start development server
npm run dev

# Step 5: Open browser
Navigate to http://localhost:5173`}
          </pre>
        </section>

        {/* Section 10: Future Enhancements */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">10. Future Enhancements</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Implement additional scheduling algorithms (FCFS, SJF, Round Robin)</li>
            <li>Add inter-thread communication simulation</li>
            <li>Implement deadlock detection and prevention</li>
            <li>Add memory management visualization</li>
            <li>Support for thread synchronization primitives (mutex, semaphore)</li>
            <li>Add Gantt chart for detailed scheduling visualization</li>
          </ol>
        </section>

        {/* Section 11: Conclusion */}
        <section className="mb-10 print:break-before-page">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">11. Conclusion</h2>
          <p className="text-justify leading-relaxed">
            This Thread Management System successfully demonstrates key operating system concepts including 
            thread lifecycle management, priority-based CPU scheduling, resource allocation, and real-time 
            system monitoring. The project provides an interactive and educational platform for understanding 
            how modern operating systems manage concurrent threads and allocate CPU resources efficiently.
            The visual representation of thread states, CPU usage charts, and execution timelines makes it 
            easier to comprehend complex scheduling concepts that are fundamental to operating system design.
          </p>
        </section>

        {/* Section 12: References */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">12. References</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Silberschatz, A., Galvin, P. B., & Gagne, G. - <em>Operating System Concepts</em></li>
            <li>Tanenbaum, A. S. - <em>Modern Operating Systems</em></li>
            <li>React Documentation - https://react.dev</li>
            <li>TypeScript Documentation - https://www.typescriptlang.org</li>
            <li>Tailwind CSS Documentation - https://tailwindcss.com</li>
          </ol>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 border-t-2 border-black mt-12">
          <p className="text-gray-600">Report Generated: December 2024</p>
          <p className="text-gray-600">Thread Management System - Operating System Project</p>
        </footer>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 2cm;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectReport;
