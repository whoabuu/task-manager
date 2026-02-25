import { useState } from 'react';
import Navbar from '../components/Navbar';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { _id: '1', title: 'Setup MERN Architecture', description: 'Initialize Vite and Express', status: 'Completed', createdAt: new Date().toISOString() },
    { _id: '2', title: 'Build Dashboard UI', description: 'Create task cards and forms', status: 'In Progress', createdAt: new Date().toISOString() },
    { _id: '3', title: 'Connect to MongoDB', description: 'Write Mongoose schemas', status: 'Pending', createdAt: new Date().toISOString() },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      _id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDesc,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 lg:px-8">
        
        {/* --- Top Controls --- */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
            My Tasks
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 rounded-full bg-[#404040]/40 backdrop-blur-xl border border-white/10 px-5 py-2.5 text-sm text-white placeholder-zinc-400 shadow-inner focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto rounded-full bg-[#404040]/40 backdrop-blur-xl border border-white/10 px-5 py-2.5 text-sm text-white shadow-inner focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none cursor-pointer"
            >
              <option value="All" className="bg-zinc-900">All Statuses</option>
              <option value="Pending" className="bg-zinc-900">Pending</option>
              <option value="In Progress" className="bg-zinc-900">In Progress</option>
              <option value="Completed" className="bg-zinc-900">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* --- Left Column: Create Task Form --- */}
          <div className="lg:col-span-1">
            <div className="rounded-[2rem] bg-[#404040]/40 p-8 border border-white/10 shadow-2xl backdrop-blur-2xl saturate-150 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-6 tracking-wide">New Task</h2>
              <form onSubmit={handleCreateTask} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider ml-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white shadow-inner focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="What needs to be done?"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider ml-1">Description</label>
                  <textarea
                    rows={3}
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white shadow-inner focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                    placeholder="Add some details..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-white py-3.5 px-4 text-sm font-bold text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-[1.02] transition-all duration-200"
                >
                  Create Task
                </button>
              </form>
            </div>
          </div>

          {/* --- Right Column: Task List --- */}
          <div className="lg:col-span-2 space-y-5">
            {filteredTasks.length === 0 ? (
              <div className="rounded-[2rem] border-2 border-dashed border-white/10 bg-white/5 backdrop-blur-xl p-16 text-center text-zinc-400">
                <p className="text-lg font-medium text-white mb-2">No tasks found</p>
                <p className="text-sm">Try adjusting your search or create a new task.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
               
                <div key={task._id} className="group rounded-[2rem] bg-[#404040]/40 p-6 border border-white/10 shadow-xl backdrop-blur-2xl saturate-150 flex flex-col sm:flex-row justify-between gap-5 hover:bg-[#404040]/50 hover:border-white/20 transition-all duration-300">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white tracking-tight">{task.title}</h3>
                    {task.description && (
                      <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{task.description}</p>
                    )}
                    <p className="mt-4 text-xs font-medium text-zinc-500">
                      Created {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-start sm:items-end justify-between border-t border-white/10 sm:border-t-0 pt-4 sm:pt-0">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border shadow-inner
                      ${task.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {task.status}
                    </span>
                    
                    <div className="mt-4 flex gap-2">
                       <button className="flex h-8 items-center justify-center rounded-full bg-white/5 px-4 text-xs font-semibold text-white border border-white/10 shadow-inner hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/30">
                         Edit
                       </button>
                       <button className="flex h-8 items-center justify-center rounded-full bg-red-500/10 px-4 text-xs font-semibold text-red-400 border border-red-500/20 shadow-inner hover:bg-red-500/20 hover:text-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-red-500/30">
                         Delete
                       </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;