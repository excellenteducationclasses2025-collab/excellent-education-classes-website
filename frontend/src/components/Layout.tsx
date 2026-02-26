import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { GraduationCap, Heart } from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Holi Color Splash Decorations - Top Left */}
      <div className="absolute top-4 left-4 z-0 opacity-25 pointer-events-none">
        <img
          src="/assets/generated/gulal-burst.dim_128x128.png"
          alt=""
          className="w-20 h-20 animate-powder-burst"
        />
      </div>

      {/* Holi Color Splash Decorations - Top Right */}
      <div className="absolute top-4 right-4 z-0 opacity-25 pointer-events-none">
        <img
          src="/assets/generated/water-balloon.dim_256x256.png"
          alt=""
          className="w-24 h-24 animate-color-float"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Holi Splash Background - Bottom Right */}
      <div className="absolute bottom-10 right-10 z-0 opacity-15 pointer-events-none">
        <img
          src="/assets/generated/holi-splash.dim_1200x600.png"
          alt=""
          className="w-64 h-32 animate-splash-wave"
        />
      </div>

      {/* Holi Color Bar - Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-holi-gradient z-50"></div>

      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between flex-wrap gap-3">
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-holi-magenta via-holi-yellow to-holi-blue flex items-center justify-center shadow-holi-splash">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">Excellent Education</span>
            </button>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate({ to: '/' })}
                className={`px-4 py-2 rounded-md transition-colors text-sm ${
                  currentPath === '/'
                    ? 'bg-primary text-primary-foreground shadow-holi-splash'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigate({ to: '/live-classes' })}
                className={`px-4 py-2 rounded-md transition-colors text-sm ${
                  currentPath === '/live-classes'
                    ? 'bg-primary text-primary-foreground shadow-holi-splash'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                Live Classes
              </button>
              <button
                onClick={() => navigate({ to: '/register' })}
                className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  currentPath === '/register'
                    ? 'bg-primary text-primary-foreground shadow-holi-splash'
                    : 'bg-gradient-to-r from-holi-magenta/10 to-holi-orange/10 text-primary hover:from-holi-magenta/20 hover:to-holi-orange/20 border border-primary/20'
                }`}
              >
                Register
              </button>
              <button
                onClick={() => navigate({ to: '/admin-login' })}
                className={`px-4 py-2 rounded-md transition-colors text-sm ${
                  currentPath === '/admin-login' || currentPath === '/admin'
                    ? 'bg-primary text-primary-foreground shadow-holi-splash'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                Admin Login
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      <footer className="border-t bg-card/30 backdrop-blur-sm mt-auto relative z-10">
        {/* Holi Color Bar - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-holi-gradient"></div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Excellent Education Classes. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Built with <Heart className="w-4 h-4 text-holi-magenta fill-holi-magenta" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
