/*
 * Thread Management System - Operating System Project
 * Priority Scheduling Algorithm Implementation in C++
 * 
 * Compile: g++ -std=c++17 -pthread thread_manager.cpp -o thread_manager
 * Run: ./thread_manager
 */

#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <queue>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <chrono>
#include <random>
#include <iomanip>
#include <algorithm>
#include <atomic>
#include <fstream>
#include <sstream>

using namespace std;

// ==================== ENUMS ====================

enum class ThreadState {
    RUNNING,
    PAUSED,
    STOPPED,
    WAITING,
    COMPLETED
};

enum class ThreadPriority {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    CRITICAL = 4
};

// ==================== THREAD STRUCTURE ====================

struct ThreadInfo {
    int id;
    string name;
    ThreadState state;
    ThreadPriority priority;
    double cpuUsage;
    double memoryUsage;
    chrono::system_clock::time_point startTime;
    int executionTime;    // in milliseconds
    int burstTime;        // total time to complete (in milliseconds)
    int parentId;
    
    ThreadInfo(int _id, string _name, ThreadPriority _priority, int _burstTime, int _parentId = -1)
        : id(_id), name(_name), state(ThreadState::RUNNING), priority(_priority),
          cpuUsage(0.0), memoryUsage(0.0), startTime(chrono::system_clock::now()),
          executionTime(0), burstTime(_burstTime), parentId(_parentId) {
        // Random initial memory usage between 50-200 MB
        random_device rd;
        mt19937 gen(rd());
        uniform_real_distribution<> dis(50.0, 200.0);
        memoryUsage = dis(gen);
    }
};

// ==================== PRIORITY SCHEDULER ====================

class PriorityScheduler {
private:
    map<ThreadPriority, int> priorityWeights = {
        {ThreadPriority::LOW, 1},
        {ThreadPriority::MEDIUM, 2},
        {ThreadPriority::HIGH, 3},
        {ThreadPriority::CRITICAL, 4}
    };
    
public:
    string getAlgorithmName() {
        return "Priority Scheduling";
    }
    
    string getDescription() {
        return "Higher priority threads receive more CPU time. Critical=4x, High=3x, Medium=2x, Low=1x time slices.";
    }
    
    // Calculate CPU share based on priority weight
    double calculateCpuShare(ThreadInfo& thread, vector<ThreadInfo>& allThreads) {
        if (thread.state != ThreadState::RUNNING) return 0.0;
        
        int totalWeight = 0;
        for (auto& t : allThreads) {
            if (t.state == ThreadState::RUNNING) {
                totalWeight += priorityWeights[t.priority];
            }
        }
        
        if (totalWeight == 0) return 0.0;
        
        int threadWeight = priorityWeights[thread.priority];
        double baseShare = (static_cast<double>(threadWeight) / totalWeight) * 100.0;
        
        // Add some variance to simulate real CPU behavior
        random_device rd;
        mt19937 gen(rd());
        uniform_real_distribution<> dis(-5.0, 5.0);
        double variance = dis(gen);
        
        return max(0.0, min(100.0, baseShare + variance));
    }
    
    // Get next thread to execute (highest priority first)
    ThreadInfo* getNextThread(vector<ThreadInfo>& threads) {
        vector<ThreadInfo*> runningThreads;
        for (auto& t : threads) {
            if (t.state == ThreadState::RUNNING) {
                runningThreads.push_back(&t);
            }
        }
        
        if (runningThreads.empty()) return nullptr;
        
        // Sort by priority (critical first), then by execution time (Round Robin within same priority)
        sort(runningThreads.begin(), runningThreads.end(), [](ThreadInfo* a, ThreadInfo* b) {
            if (static_cast<int>(a->priority) != static_cast<int>(b->priority)) {
                return static_cast<int>(a->priority) > static_cast<int>(b->priority);
            }
            return a->executionTime < b->executionTime;
        });
        
        return runningThreads[0];
    }
    
    void printPriorityWeights() {
        cout << "\nPriority Weights:\n";
        cout << "  CRITICAL: " << priorityWeights[ThreadPriority::CRITICAL] << "x\n";
        cout << "  HIGH:     " << priorityWeights[ThreadPriority::HIGH] << "x\n";
        cout << "  MEDIUM:   " << priorityWeights[ThreadPriority::MEDIUM] << "x\n";
        cout << "  LOW:      " << priorityWeights[ThreadPriority::LOW] << "x\n";
    }
};

// ==================== THREAD MANAGER ====================

class ThreadManager {
private:
    vector<ThreadInfo> threads;
    PriorityScheduler scheduler;
    int nextThreadId = 1;
    atomic<bool> simulationRunning{false};
    mutex mtx;
    int timeQuantum = 1000; // 1 second in milliseconds
    
    // Statistics
    struct SystemStats {
        int totalThreads = 0;
        int runningThreads = 0;
        int completedThreads = 0;
        double totalCpuUsage = 0.0;
        double totalMemoryUsage = 0.0;
    };
    
    string stateToString(ThreadState state) {
        switch (state) {
            case ThreadState::RUNNING: return "RUNNING";
            case ThreadState::PAUSED: return "PAUSED";
            case ThreadState::STOPPED: return "STOPPED";
            case ThreadState::WAITING: return "WAITING";
            case ThreadState::COMPLETED: return "COMPLETED";
            default: return "UNKNOWN";
        }
    }
    
    string priorityToString(ThreadPriority priority) {
        switch (priority) {
            case ThreadPriority::LOW: return "LOW";
            case ThreadPriority::MEDIUM: return "MEDIUM";
            case ThreadPriority::HIGH: return "HIGH";
            case ThreadPriority::CRITICAL: return "CRITICAL";
            default: return "UNKNOWN";
        }
    }
    
    int generateRandomBurstTime() {
        random_device rd;
        mt19937 gen(rd());
        uniform_int_distribution<> dis(10000, 30000); // 10-30 seconds
        return dis(gen);
    }
    
public:
    // Create a new thread
    int createThread(string name = "", ThreadPriority priority = ThreadPriority::MEDIUM, 
                     int customBurstTime = -1, int parentId = -1) {
        lock_guard<mutex> lock(mtx);
        
        if (name.empty()) {
            name = "Thread-" + to_string(nextThreadId);
        }
        
        int burstTime = (customBurstTime > 0) ? customBurstTime : generateRandomBurstTime();
        
        threads.emplace_back(nextThreadId, name, priority, burstTime, parentId);
        cout << "[CREATE] Thread '" << name << "' created with ID " << nextThreadId 
             << ", Priority: " << priorityToString(priority) 
             << ", Burst Time: " << burstTime / 1000.0 << "s\n";
        
        return nextThreadId++;
    }
    
    // Delete a thread
    bool deleteThread(int threadId) {
        lock_guard<mutex> lock(mtx);
        
        auto it = find_if(threads.begin(), threads.end(), 
                          [threadId](const ThreadInfo& t) { return t.id == threadId; });
        
        if (it != threads.end()) {
            cout << "[DELETE] Thread '" << it->name << "' (ID: " << threadId << ") deleted\n";
            threads.erase(it);
            return true;
        }
        
        cout << "[ERROR] Thread with ID " << threadId << " not found\n";
        return false;
    }
    
    // Update thread state
    bool updateThreadState(int threadId, ThreadState newState) {
        lock_guard<mutex> lock(mtx);
        
        for (auto& thread : threads) {
            if (thread.id == threadId) {
                ThreadState oldState = thread.state;
                thread.state = newState;
                
                if (newState == ThreadState::STOPPED || newState == ThreadState::COMPLETED) {
                    thread.cpuUsage = 0;
                }
                
                cout << "[STATE] Thread '" << thread.name << "': " 
                     << stateToString(oldState) << " -> " << stateToString(newState) << "\n";
                return true;
            }
        }
        return false;
    }
    
    // Pause thread
    void pauseThread(int threadId) {
        updateThreadState(threadId, ThreadState::PAUSED);
    }
    
    // Resume thread
    void resumeThread(int threadId) {
        updateThreadState(threadId, ThreadState::RUNNING);
    }
    
    // Stop thread
    void stopThread(int threadId) {
        updateThreadState(threadId, ThreadState::STOPPED);
    }
    
    // Update thread priority
    bool updateThreadPriority(int threadId, ThreadPriority newPriority) {
        lock_guard<mutex> lock(mtx);
        
        for (auto& thread : threads) {
            if (thread.id == threadId) {
                ThreadPriority oldPriority = thread.priority;
                thread.priority = newPriority;
                cout << "[PRIORITY] Thread '" << thread.name << "': " 
                     << priorityToString(oldPriority) << " -> " << priorityToString(newPriority) << "\n";
                return true;
            }
        }
        return false;
    }
    
    // Pause all threads
    void pauseAllThreads() {
        lock_guard<mutex> lock(mtx);
        for (auto& thread : threads) {
            if (thread.state == ThreadState::RUNNING) {
                thread.state = ThreadState::PAUSED;
            }
        }
        cout << "[BULK] All running threads paused\n";
    }
    
    // Resume all threads
    void resumeAllThreads() {
        lock_guard<mutex> lock(mtx);
        for (auto& thread : threads) {
            if (thread.state == ThreadState::PAUSED) {
                thread.state = ThreadState::RUNNING;
            }
        }
        cout << "[BULK] All paused threads resumed\n";
    }
    
    // Stop all threads
    void stopAllThreads() {
        lock_guard<mutex> lock(mtx);
        for (auto& thread : threads) {
            if (thread.state != ThreadState::COMPLETED) {
                thread.state = ThreadState::STOPPED;
                thread.cpuUsage = 0;
            }
        }
        cout << "[BULK] All threads stopped\n";
    }
    
    // Simulation step - updates CPU usage and execution time
    void simulationStep() {
        lock_guard<mutex> lock(mtx);
        
        for (auto& thread : threads) {
            if (thread.state == ThreadState::RUNNING) {
                // Update CPU usage based on priority
                thread.cpuUsage = scheduler.calculateCpuShare(thread, threads);
                
                // Update execution time
                thread.executionTime += timeQuantum;
                
                // Check if thread has completed its burst time
                if (thread.executionTime >= thread.burstTime) {
                    thread.state = ThreadState::COMPLETED;
                    thread.cpuUsage = 0;
                    cout << "[COMPLETED] Thread '" << thread.name << "' finished execution\n";
                }
            }
        }
    }
    
    // Get system statistics
    SystemStats getSystemStats() {
        lock_guard<mutex> lock(mtx);
        SystemStats stats;
        
        stats.totalThreads = threads.size();
        
        for (const auto& thread : threads) {
            if (thread.state == ThreadState::RUNNING) {
                stats.runningThreads++;
                stats.totalCpuUsage += thread.cpuUsage;
            }
            if (thread.state == ThreadState::COMPLETED) {
                stats.completedThreads++;
            }
            stats.totalMemoryUsage += thread.memoryUsage;
        }
        
        return stats;
    }
    
    // Display all threads
    void displayThreads() {
        lock_guard<mutex> lock(mtx);
        
        cout << "\n" << string(100, '=') << "\n";
        cout << "| " << setw(4) << "ID" << " | " << setw(15) << "Name" << " | " 
             << setw(10) << "State" << " | " << setw(10) << "Priority" << " | "
             << setw(8) << "CPU %" << " | " << setw(10) << "Memory" << " | "
             << setw(12) << "Exec Time" << " | " << setw(12) << "Burst Time" << " |\n";
        cout << string(100, '-') << "\n";
        
        for (const auto& thread : threads) {
            cout << "| " << setw(4) << thread.id << " | " 
                 << setw(15) << thread.name << " | "
                 << setw(10) << stateToString(thread.state) << " | "
                 << setw(10) << priorityToString(thread.priority) << " | "
                 << setw(7) << fixed << setprecision(1) << thread.cpuUsage << "% | "
                 << setw(8) << fixed << setprecision(1) << thread.memoryUsage << " MB | "
                 << setw(10) << thread.executionTime / 1000.0 << "s | "
                 << setw(10) << thread.burstTime / 1000.0 << "s |\n";
        }
        cout << string(100, '=') << "\n";
    }
    
    // Display system statistics
    void displayStats() {
        SystemStats stats = getSystemStats();
        
        cout << "\n+--- System Statistics ---+\n";
        cout << "| Total Threads:    " << setw(5) << stats.totalThreads << " |\n";
        cout << "| Running Threads:  " << setw(5) << stats.runningThreads << " |\n";
        cout << "| Completed:        " << setw(5) << stats.completedThreads << " |\n";
        cout << "| Total CPU Usage:  " << setw(4) << fixed << setprecision(1) << stats.totalCpuUsage << "% |\n";
        cout << "| Total Memory:     " << setw(4) << fixed << setprecision(0) << stats.totalMemoryUsage << " MB |\n";
        cout << "+-------------------------+\n";
    }
    
    // Display scheduler info
    void displaySchedulerInfo() {
        cout << "\n+--- Scheduler Information ---+\n";
        cout << "| Algorithm: " << scheduler.getAlgorithmName() << "\n";
        cout << "| Description: " << scheduler.getDescription() << "\n";
        cout << "| Time Quantum: " << timeQuantum << "ms\n";
        scheduler.printPriorityWeights();
        
        ThreadInfo* nextThread = scheduler.getNextThread(threads);
        if (nextThread) {
            cout << "| Next Thread: " << nextThread->name << " (Priority: " 
                 << priorityToString(nextThread->priority) << ")\n";
        }
        cout << "+-----------------------------+\n";
    }
    
    // Export data to CSV
    void exportToCSV(const string& filename) {
        lock_guard<mutex> lock(mtx);
        
        ofstream file(filename);
        file << "ID,Name,State,Priority,CPU Usage (%),Memory (MB),Execution Time (ms),Burst Time (ms),Progress (%)\n";
        
        for (const auto& thread : threads) {
            double progress = (static_cast<double>(thread.executionTime) / thread.burstTime) * 100.0;
            file << thread.id << "," << thread.name << "," << stateToString(thread.state) << ","
                 << priorityToString(thread.priority) << "," << fixed << setprecision(2) << thread.cpuUsage << ","
                 << thread.memoryUsage << "," << thread.executionTime << "," << thread.burstTime << ","
                 << progress << "\n";
        }
        
        file.close();
        cout << "[EXPORT] Data exported to " << filename << "\n";
    }
    
    // Start simulation
    void startSimulation() {
        simulationRunning = true;
        cout << "[SIM] Simulation started\n";
    }
    
    // Stop simulation
    void stopSimulation() {
        simulationRunning = false;
        cout << "[SIM] Simulation stopped\n";
    }
    
    bool isSimulationRunning() {
        return simulationRunning;
    }
    
    // Run simulation loop
    void runSimulationLoop(int iterations) {
        startSimulation();
        
        for (int i = 0; i < iterations && simulationRunning; i++) {
            simulationStep();
            
            cout << "\n--- Simulation Step " << (i + 1) << " ---\n";
            displayThreads();
            displayStats();
            
            this_thread::sleep_for(chrono::milliseconds(timeQuantum));
        }
        
        stopSimulation();
    }
};

// ==================== MENU SYSTEM ====================

void displayMenu() {
    cout << "\n╔════════════════════════════════════════╗\n";
    cout << "║     THREAD MANAGEMENT SYSTEM           ║\n";
    cout << "║     Priority Scheduling Algorithm      ║\n";
    cout << "╠════════════════════════════════════════╣\n";
    cout << "║ 1.  Create Thread                      ║\n";
    cout << "║ 2.  Delete Thread                      ║\n";
    cout << "║ 3.  Pause Thread                       ║\n";
    cout << "║ 4.  Resume Thread                      ║\n";
    cout << "║ 5.  Stop Thread                        ║\n";
    cout << "║ 6.  Change Thread Priority             ║\n";
    cout << "║ 7.  Pause All Threads                  ║\n";
    cout << "║ 8.  Resume All Threads                 ║\n";
    cout << "║ 9.  Stop All Threads                   ║\n";
    cout << "║ 10. Display All Threads                ║\n";
    cout << "║ 11. Display System Statistics          ║\n";
    cout << "║ 12. Display Scheduler Info             ║\n";
    cout << "║ 13. Run Simulation (5 steps)           ║\n";
    cout << "║ 14. Export to CSV                      ║\n";
    cout << "║ 0.  Exit                               ║\n";
    cout << "╚════════════════════════════════════════╝\n";
    cout << "Enter choice: ";
}

ThreadPriority getPriorityFromUser() {
    int p;
    cout << "Enter Priority (1=LOW, 2=MEDIUM, 3=HIGH, 4=CRITICAL): ";
    cin >> p;
    switch (p) {
        case 1: return ThreadPriority::LOW;
        case 2: return ThreadPriority::MEDIUM;
        case 3: return ThreadPriority::HIGH;
        case 4: return ThreadPriority::CRITICAL;
        default: return ThreadPriority::MEDIUM;
    }
}

// ==================== MAIN FUNCTION ====================

int main() {
    ThreadManager manager;
    
    // Create some initial threads for demonstration
    cout << "\n=== Initializing Thread Management System ===\n";
    manager.createThread("MainProcess", ThreadPriority::HIGH, 15000);
    manager.createThread("BackgroundTask", ThreadPriority::LOW, 20000);
    manager.createThread("IOHandler", ThreadPriority::MEDIUM, 12000);
    manager.createThread("CriticalService", ThreadPriority::CRITICAL, 8000);
    
    int choice;
    do {
        displayMenu();
        cin >> choice;
        
        switch (choice) {
            case 1: {
                string name;
                int burstTime;
                cout << "Enter thread name (or press enter for auto): ";
                cin.ignore();
                getline(cin, name);
                ThreadPriority priority = getPriorityFromUser();
                cout << "Enter burst time in seconds (0 for random): ";
                cin >> burstTime;
                manager.createThread(name, priority, burstTime > 0 ? burstTime * 1000 : -1);
                break;
            }
            case 2: {
                int id;
                cout << "Enter thread ID to delete: ";
                cin >> id;
                manager.deleteThread(id);
                break;
            }
            case 3: {
                int id;
                cout << "Enter thread ID to pause: ";
                cin >> id;
                manager.pauseThread(id);
                break;
            }
            case 4: {
                int id;
                cout << "Enter thread ID to resume: ";
                cin >> id;
                manager.resumeThread(id);
                break;
            }
            case 5: {
                int id;
                cout << "Enter thread ID to stop: ";
                cin >> id;
                manager.stopThread(id);
                break;
            }
            case 6: {
                int id;
                cout << "Enter thread ID: ";
                cin >> id;
                ThreadPriority priority = getPriorityFromUser();
                manager.updateThreadPriority(id, priority);
                break;
            }
            case 7:
                manager.pauseAllThreads();
                break;
            case 8:
                manager.resumeAllThreads();
                break;
            case 9:
                manager.stopAllThreads();
                break;
            case 10:
                manager.displayThreads();
                break;
            case 11:
                manager.displayStats();
                break;
            case 12:
                manager.displaySchedulerInfo();
                break;
            case 13:
                manager.runSimulationLoop(5);
                break;
            case 14: {
                string filename;
                cout << "Enter filename (e.g., threads.csv): ";
                cin >> filename;
                manager.exportToCSV(filename);
                break;
            }
            case 0:
                cout << "\nExiting Thread Management System...\n";
                break;
            default:
                cout << "Invalid choice. Try again.\n";
        }
    } while (choice != 0);
    
    return 0;
}
