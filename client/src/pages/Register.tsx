import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(name, email, password);
      // Automatically redirect to dashboard upon successful signup
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 selection:bg-white/30">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-[2rem] bg-[#404040]/40 border border-white/10 shadow-2xl backdrop-blur-2xl saturate-150 relative">
        
        {/* Decorative subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-[3rem] -z-10 pointer-events-none"></div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Create Account</h1>
          <p className="text-sm text-zinc-400 mt-2">Sign up to start managing your tasks.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400 text-center shadow-inner">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider ml-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white shadow-inner focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white shadow-inner focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white shadow-inner focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 rounded-full bg-white py-3.5 px-4 text-sm font-bold text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-white hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;