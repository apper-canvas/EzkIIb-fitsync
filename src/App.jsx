import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Home, Calendar, Dumbbell, Users, Bell, User } from 'lucide-react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check user preference for dark mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/" },
    { icon: <Calendar size={20} />, label: "Classes", path: "/classes" },
    { icon: <Dumbbell size={20} />, label: "Workouts", path: "/workouts" },
    { icon: <Users size={20} />, label: "Trainers", path: "/trainers" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FitSync
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-accent rounded-full"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
              <User size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white dark:bg-surface-800 md:hidden"
          >
            <div className="flex flex-col h-full pt-16 px-4">
              <div className="py-6">
                <div className="flex flex-col space-y-1">
                  {navItems.map((item, index) => (
                    <a 
                      key={index}
                      href={item.path}
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                    >
                      <span className="text-primary">{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="flex flex-1">
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 sticky top-16 h-[calc(100vh-4rem)]">
          <nav className="flex flex-col p-4 space-y-1">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <span className="text-primary">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;