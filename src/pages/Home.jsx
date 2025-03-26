import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Dumbbell, Users, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  
  const upcomingClasses = [
    { id: 1, name: "HIIT Workout", trainer: "Alex Johnson", time: "10:00 AM", duration: "45 min", attendees: 12, maxAttendees: 20 },
    { id: 2, name: "Yoga Flow", trainer: "Sarah Miller", time: "12:30 PM", duration: "60 min", attendees: 8, maxAttendees: 15 },
    { id: 3, name: "Strength Training", trainer: "Mike Davis", time: "4:00 PM", duration: "50 min", attendees: 6, maxAttendees: 10 }
  ];
  
  const myWorkouts = [
    { id: 1, name: "Upper Body", date: "Yesterday", exercises: 8, duration: "45 min", completed: true },
    { id: 2, name: "Cardio", date: "3 days ago", exercises: 5, duration: "30 min", completed: true },
    { id: 3, name: "Lower Body", date: "5 days ago", exercises: 7, duration: "40 min", completed: true }
  ];

  const stats = [
    { id: 1, title: "Classes Attended", value: 12, icon: <Calendar className="text-primary" size={24} /> },
    { id: 2, title: "Workouts Completed", value: 24, icon: <Dumbbell className="text-secondary" size={24} /> },
    { id: 3, title: "Active Trainers", value: 8, icon: <Users className="text-accent" size={24} /> },
    { id: 4, title: "Progress Score", value: "78%", icon: <TrendingUp className="text-primary-light" size={24} /> }
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Jamie</h1>
          <p className="text-surface-500 dark:text-surface-400">Your fitness journey continues today</p>
        </div>
        <button className="btn btn-primary">
          Book a Class
        </button>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className="card p-5 flex items-center space-x-4 hover:shadow-soft transition-shadow duration-300"
          >
            <div className="p-3 rounded-xl bg-surface-100 dark:bg-surface-700">
              {stat.icon}
            </div>
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main Feature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MainFeature />
      </motion.div>

      {/* Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card overflow-visible"
      >
        <div className="border-b border-surface-200 dark:border-surface-700">
          <div className="flex space-x-6 px-6 pt-4">
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`pb-4 font-medium text-sm relative ${
                selectedTab === 'upcoming' 
                  ? 'text-primary' 
                  : 'text-surface-500 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              Upcoming Classes
              {selectedTab === 'upcoming' && (
                <motion.div 
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setSelectedTab('workouts')}
              className={`pb-4 font-medium text-sm relative ${
                selectedTab === 'workouts' 
                  ? 'text-primary' 
                  : 'text-surface-500 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              Recent Workouts
              {selectedTab === 'workouts' && (
                <motion.div 
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {selectedTab === 'upcoming' ? (
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Dumbbell className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{cls.name}</h3>
                      <p className="text-sm text-surface-500 dark:text-surface-400">with {cls.trainer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="hidden md:block text-right">
                      <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                        <Clock size={14} className="mr-1" />
                        <span>{cls.time} • {cls.duration}</span>
                      </div>
                      <div className="text-sm mt-1">
                        <span className="text-primary">{cls.attendees}</span>
                        <span className="text-surface-400 dark:text-surface-500">/{cls.maxAttendees} attending</span>
                      </div>
                    </div>
                    <button className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-center mt-4">
                <button className="btn btn-outline">
                  View All Classes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {myWorkouts.map((workout) => (
                <div key={workout.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center">
                      <Dumbbell className="text-secondary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{workout.name}</h3>
                      <p className="text-sm text-surface-500 dark:text-surface-400">{workout.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="hidden md:block text-right">
                      <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                        <span>{workout.exercises} exercises • {workout.duration}</span>
                      </div>
                      <div className="text-sm mt-1 text-secondary">
                        Completed
                      </div>
                    </div>
                    <button className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-center mt-4">
                <button className="btn btn-outline">
                  View Workout History
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;