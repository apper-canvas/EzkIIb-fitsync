import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
    >
      <div className="w-24 h-24 mb-8 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
        <span className="text-5xl font-bold text-gradient">404</span>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
      
      <p className="text-surface-500 dark:text-surface-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. 
        Let's get you back on track.
      </p>
      
      <Link 
        to="/" 
        className="btn btn-primary"
      >
        <Home size={18} className="mr-2" />
        Back to Home
      </Link>
    </motion.div>
  );
};

export default NotFound;