import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login');
  };

  return (
    <div className="sticky top-6 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
      <nav className="flex h-16 w-full items-center justify-between rounded-full bg-[#404040]/50 px-6 shadow-2xl backdrop-blur-2xl border border-white/10 saturate-150">
        
        <div className="flex h-10 items-center justify-center rounded-full bg-white/5 px-5 border border-white/10 shadow-inner">
          <Link to="/dashboard" className="text-lg font-bold tracking-wide text-white hover:text-gray-200 transition-colors">
            TaskManager
          </Link>
        </div>

        <div className="flex items-center gap-3">
 
          <div className="hidden sm:flex h-10 items-center justify-center rounded-full bg-white/5 px-5 border border-white/10 shadow-inner">
            <span className="text-base font-medium text-zinc-300">
              Hello, <span className="ml-1 font-bold text-white">User</span>
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex h-10 items-center justify-center rounded-full bg-white/10 px-6 text-base font-semibold text-white border border-white/10 shadow-inner hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Log out
          </button>
          
        </div>

      </nav>
    </div>
  );
};

export default Navbar;