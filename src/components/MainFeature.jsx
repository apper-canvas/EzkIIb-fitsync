import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, Search, Plus, X, Filter, ChevronDown, ImageOff } from 'lucide-react';

// Image handling with error fallbacks
const ClassImage = ({ type, alt }) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Try to dynamically import the image
    const loadImage = async () => {
      try {
        // Attempt to load the image based on class type
        let importedImage;
        
        switch (type) {
          case 'Cardio':
            importedImage = await import('../assets/cardio-class.jpg').catch(() => null);
            break;
          case 'Strength':
            importedImage = await import('../assets/strength-class.jpg').catch(() => null);
            break;
          case 'Yoga':
            importedImage = await import('../assets/yoga-class.jpg').catch(() => null);
            break;
          case 'Pilates':
            importedImage = await import('../assets/pilates-class.jpg').catch(() => null);
            break;
          default:
            importedImage = null;
        }
        
        setImageSrc(importedImage?.default || null);
      } catch (error) {
        console.error(`Failed to load image for ${type}:`, error);
        setImageError(true);
      }
    };
    
    loadImage();
  }, [type]);

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError || !imageSrc) {
    // Fallback content when image fails to load
    return (
      <div className="w-full h-full flex items-center justify-center bg-primary/10">
        <div className="flex flex-col items-center justify-center text-primary">
          <ImageOff size={24} />
          <span className="text-xs mt-1">{type}</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={imageSrc} 
      alt={alt || `${type} class`} 
      className="class-image"
      onError={handleImageError}
    />
  );
};

const MainFeature = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Mock class data
  const mockClasses = [
    {
      id: 1,
      name: "HIIT Cardio Blast",
      trainer: "Alex Johnson",
      time: "10:00 AM",
      date: "2023-11-15",
      duration: "45 min",
      location: "Studio A",
      capacity: 20,
      enrolled: 12,
      type: "Cardio",
      level: "Intermediate",
      description: "High-intensity interval training to boost your cardio fitness and burn calories."
    },
    {
      id: 2,
      name: "Yoga Flow",
      trainer: "Sarah Miller",
      time: "12:30 PM",
      date: "2023-11-15",
      duration: "60 min",
      location: "Studio B",
      capacity: 15,
      enrolled: 8,
      type: "Yoga",
      level: "All Levels",
      description: "A flowing sequence of yoga poses to improve flexibility and reduce stress."
    },
    {
      id: 3,
      name: "Strength Training",
      trainer: "Mike Davis",
      time: "4:00 PM",
      date: "2023-11-15",
      duration: "50 min",
      location: "Weights Room",
      capacity: 10,
      enrolled: 6,
      type: "Strength",
      level: "Advanced",
      description: "Build muscle and increase strength with focused weight training exercises."
    },
    {
      id: 4,
      name: "Pilates Core",
      trainer: "Emma Wilson",
      time: "9:00 AM",
      date: "2023-11-16",
      duration: "45 min",
      location: "Studio B",
      capacity: 12,
      enrolled: 5,
      type: "Pilates",
      level: "Beginner",
      description: "Focus on core strength and stability with controlled Pilates movements."
    },
    {
      id: 5,
      name: "Spin Class",
      trainer: "Jason Lee",
      time: "6:00 PM",
      date: "2023-11-16",
      duration: "45 min",
      location: "Spin Studio",
      capacity: 20,
      enrolled: 15,
      type: "Cardio",
      level: "Intermediate",
      description: "High-energy indoor cycling workout with music and motivation."
    }
  ];

  // Filter options
  const filterOptions = [
    { id: 'type', name: 'Class Type', options: ['Cardio', 'Strength', 'Yoga', 'Pilates'] },
    { id: 'level', name: 'Level', options: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'] },
    { id: 'trainer', name: 'Trainer', options: ['Alex Johnson', 'Sarah Miller', 'Mike Davis', 'Emma Wilson', 'Jason Lee'] }
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setClasses(mockClasses);
      setFilteredClasses(mockClasses);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter classes based on search and filters
  useEffect(() => {
    if (classes.length === 0) return;

    let filtered = [...classes];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(cls => 
        cls.name.toLowerCase().includes(query) || 
        cls.trainer.toLowerCase().includes(query) ||
        cls.type.toLowerCase().includes(query)
      );
    }

    // Apply selected filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(cls => {
        return selectedFilters.every(filter => {
          const [category, value] = filter.split(':');
          if (category === 'type') return cls.type === value;
          if (category === 'level') return cls.level === value;
          if (category === 'trainer') return cls.trainer === value;
          return true;
        });
      });
    }

    setFilteredClasses(filtered);
  }, [searchQuery, selectedFilters, classes]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleFilter = (category, value) => {
    const filterString = `${category}:${value}`;
    
    if (selectedFilters.includes(filterString)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filterString));
    } else {
      setSelectedFilters([...selectedFilters, filterString]);
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchQuery('');
  };

  const handleClassSelect = (cls) => {
    setSelectedClass(cls);
  };

  const handleBookClass = () => {
    // Simulate booking process
    setBookingSuccess(true);
    
    // Update enrolled count
    const updatedClasses = classes.map(cls => 
      cls.id === selectedClass.id 
        ? { ...cls, enrolled: cls.enrolled + 1 } 
        : cls
    );
    
    setClasses(updatedClasses);
    setFilteredClasses(updatedClasses.filter(cls => filteredClasses.some(fc => fc.id === cls.id)));
    
    // Reset after 3 seconds
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedClass(null);
    }, 3000);
  };

  const closeClassDetails = () => {
    setSelectedClass(null);
    setBookingSuccess(false);
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-surface-200 dark:border-surface-700">
        <h2 className="text-xl font-bold">Class Booking</h2>
        <p className="text-surface-500 dark:text-surface-400 text-sm">Find and book your next fitness class</p>
      </div>

      {/* Search and Filters */}
      <div className="p-6 border-b border-surface-200 dark:border-surface-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-surface-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search classes, trainers..."
              className="input pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline flex items-center"
            >
              <Filter size={18} className="mr-2" />
              Filters
              <ChevronDown size={16} className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {selectedFilters.length > 0 && (
              <button 
                onClick={clearFilters}
                className="btn btn-outline text-surface-500"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter tags */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedFilters.map((filter, index) => {
              const [category, value] = filter.split(':');
              return (
                <div 
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <span>{value}</span>
                  <button 
                    onClick={() => toggleFilter(category, value)}
                    className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Filter options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {filterOptions.map((filterGroup) => (
                  <div key={filterGroup.id}>
                    <h3 className="font-medium mb-2">{filterGroup.name}</h3>
                    <div className="space-y-2">
                      {filterGroup.options.map((option) => {
                        const filterString = `${filterGroup.id}:${option}`;
                        const isSelected = selectedFilters.includes(filterString);
                        
                        return (
                          <label 
                            key={option} 
                            className="flex items-center cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleFilter(filterGroup.id, option)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border flex items-center justify-center mr-2 transition-colors ${
                              isSelected 
                                ? 'bg-primary border-primary text-white' 
                                : 'border-surface-300 dark:border-surface-600'
                            }`}>
                              {isSelected && <Check size={14} />}
                            </div>
                            <span className="text-sm">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Class List */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-surface-200 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-surface-500 dark:text-surface-400">Loading classes...</p>
          </div>
        ) : filteredClasses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mb-4">
              <Calendar size={24} className="text-surface-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No classes found</h3>
            <p className="text-surface-500 dark:text-surface-400 mb-4">Try adjusting your filters or search query</p>
            <button 
              onClick={clearFilters}
              className="btn btn-outline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClasses.map((cls) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleClassSelect(cls)}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-3 md:mb-0">
                  <div className="w-16 h-16 rounded-xl class-image-container">
                    <ClassImage type={cls.type} alt={`${cls.type} class`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{cls.name}</h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400">with {cls.trainer}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:flex-row">
                  <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(cls.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                    <Clock size={14} className="mr-1" />
                    <span>{cls.time} • {cls.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                    <MapPin size={14} className="mr-1" />
                    <span>{cls.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                    <Users size={14} className="mr-1" />
                    <span>{cls.enrolled}/{cls.capacity}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Class Details Modal */}
      <AnimatePresence>
        {selectedClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={closeClassDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-surface-800 rounded-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {bookingSuccess ? (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} className="text-green-500 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
                  <p className="text-surface-500 dark:text-surface-400 mb-6">
                    You've successfully booked a spot in {selectedClass.name}
                  </p>
                  <button 
                    onClick={closeClassDetails}
                    className="btn btn-primary w-full"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative h-40 class-image-container overflow-hidden">
                    <ClassImage type={selectedClass.type} alt={`${selectedClass.type} class`} />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <button 
                      onClick={closeClassDetails}
                      className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    >
                      <X size={20} className="text-white" />
                    </button>
                    <div className="absolute bottom-4 left-6">
                      <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                        {selectedClass.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-1">{selectedClass.name}</h2>
                    <p className="text-surface-500 dark:text-surface-400 mb-4">with {selectedClass.trainer}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center">
                        <Calendar size={18} className="text-primary mr-2" />
                        <div>
                          <p className="text-sm text-surface-500 dark:text-surface-400">Date</p>
                          <p className="font-medium">{formatDate(selectedClass.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock size={18} className="text-primary mr-2" />
                        <div>
                          <p className="text-sm text-surface-500 dark:text-surface-400">Time</p>
                          <p className="font-medium">{selectedClass.time} ({selectedClass.duration})</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={18} className="text-primary mr-2" />
                        <div>
                          <p className="text-sm text-surface-500 dark:text-surface-400">Location</p>
                          <p className="font-medium">{selectedClass.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users size={18} className="text-primary mr-2" />
                        <div>
                          <p className="text-sm text-surface-500 dark:text-surface-400">Capacity</p>
                          <p className="font-medium">{selectedClass.enrolled}/{selectedClass.capacity}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-surface-600 dark:text-surface-300 text-sm">
                        {selectedClass.description}
                      </p>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button 
                        onClick={closeClassDetails}
                        className="btn btn-outline flex-1"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleBookClass}
                        className="btn btn-primary flex-1"
                        disabled={selectedClass.enrolled >= selectedClass.capacity}
                      >
                        {selectedClass.enrolled >= selectedClass.capacity ? 'Class Full' : 'Book Class'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper components
const Check = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Activity = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const Dumbbell = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m6.5 6.5 11 11"></path>
    <path d="m21 21-1-1"></path>
    <path d="m3 3 1 1"></path>
    <path d="m18 22 4-4"></path>
    <path d="m2 6 4-4"></path>
    <path d="m3 10 7-7"></path>
    <path d="m14 21 7-7"></path>
  </svg>
);

const Yoga = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2a5 5 0 0 0-5 5c0 2 2 3 3 4.5 1.5 1.5 2 2.5 2 4.5a5 5 0 0 0 10 0c0-2-0.5-3-2-4.5C19 10 17 9 17 7a5 5 0 0 0-5-5Z"></path>
  </svg>
);

const Flame = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
  </svg>
);

// Helper function to format date
const formatDate = (dateString) => {
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default MainFeature;