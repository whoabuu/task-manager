import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  // Bring in the global user state and the real logout function
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      // This hits the backend API to destroy the cookie and clears React's state
      await logout();
      // Because the state clears, your ProtectedRoute in App.tsx will instantly kick the user back to the Login screen!
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Area */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <span className="text-lg font-black text-black">✓</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
              TaskFlow
            </span>
          </div>
          
          {/* User Controls */}
          <div className="flex items-center gap-6">
            {/* Display the logged-in user's actual name */}
            <span className="hidden text-sm font-medium text-zinc-400 sm:block">
              Hello, <span className="text-zinc-200">{user?.name || 'User'}</span>
            </span>
            
            {/* The Real Logout Button */}
            <button
              onClick={handleLogout}
              className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-inner transition-all hover:scale-105 hover:bg-white/20 active:scale-95"
            >
              Log out
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;