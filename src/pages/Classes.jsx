import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';

const Classes = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Classes</h1>
        <p className="text-surface-500 dark:text-surface-400">
          Browse and book fitness classes that match your schedule and goals
        </p>
      </div>
      
      <MainFeature />
    </motion.div>
  );
};

export default Classes;