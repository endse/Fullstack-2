import React, { useState, useEffect, useMemo } from 'react';
import { Course, User } from '../types';
import { BookOpen, Award, TrendingUp, Clock, PlayCircle, ListChecks, Download, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardProps {
  user: User;
  courses: Course[];
  onProvideFeedback: (courseId: string) => void;
  onOpenCourse: (course: Course) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, courses, onProvideFeedback, onOpenCourse }) => {
  // Memoize enrolled courses to prevent unnecessary re-calculations and stable reference for dependency checks
  const enrolledCourses = useMemo(() => 
    courses.filter(c => user.enrolledCourseIds.includes(c.id)), 
    [courses, user.enrolledCourseIds]
  );

  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [notification, setNotification] = useState<string | null>(null);

  // Load progress from localStorage
  // Using a stable dependency (joined IDs) ensures this only runs when the list of enrolled courses actually changes
  const enrolledIdsStr = enrolledCourses.map(c => c.id).sort().join(',');

  useEffect(() => {
    const storageKey = `courseflow_progress_${user.id}`;
    
    try {
      const savedData = localStorage.getItem(storageKey);
      let map: Record<string, number> = savedData ? JSON.parse(savedData) : {};

      // Ensure all currently enrolled courses have an entry in the map
      let hasUpdates = false;
      enrolledCourses.forEach(c => {
        if (typeof map[c.id] === 'undefined') {
          map[c.id] = 0;
          hasUpdates = true;
        }
      });
      
      // If we added new courses to the map, save back to storage
      if (hasUpdates) {
        localStorage.setItem(storageKey, JSON.stringify(map));
      }

      setProgressMap(map);
    } catch (e) {
      console.error("Failed to load progress data", e);
      // Fallback to zeros if corrupt
      const initialMap: Record<string, number> = {};
      enrolledCourses.forEach(c => initialMap[c.id] = 0);
      setProgressMap(initialMap);
    }
  }, [user.id, enrolledIdsStr]); // Depend on the stringified IDs instead of the array reference

  const handleDownloadCertificate = (courseTitle: string) => {
    setNotification(`Certificate for "${courseTitle}" has been downloaded successfully.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const getProgressStyles = (value: number) => {
    if (value === 100) return 'bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-emerald-200';
    if (value >= 70) return 'bg-gradient-to-r from-violet-500 to-purple-600 shadow-purple-200';
    if (value >= 40) return 'bg-gradient-to-r from-blue-400 to-indigo-500 shadow-indigo-200';
    return 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-orange-200';
  };

  const progressData = enrolledCourses.map((course) => ({
    name: course.title,
    completed: progressMap[course.id] || 0,
    id: course.id
  }));

  const completedCount = progressData.filter(p => p.completed === 100).length;
  const inProgressCount = progressData.filter(p => p.completed > 0 && p.completed < 100).length;
  const notStartedCount = progressData.filter(p => p.completed === 0).length;
  
  const totalProgress = progressData.reduce((acc, curr) => acc + curr.completed, 0);
  const avgProgress = progressData.length > 0 ? Math.floor(totalProgress / progressData.length) : 0;

  const stats = [
    { label: 'Enrolled Courses', value: enrolledCourses.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Certificates', value: completedCount, icon: Award, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Avg. Progress', value: `${avgProgress}%`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Learning Hours', value: '24.5', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const pieData = [
    { name: 'Completed', value: completedCount },
    { name: 'In Progress', value: inProgressCount },
    { name: 'Not Started', value: notStartedCount },
  ].filter(d => d.value > 0);

  const COLORS = ['#10B981', '#3B82F6', '#9CA3AF'];

  if (enrolledCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center px-4">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Courses Yet</h2>
        <p className="text-gray-500 mb-8 max-w-md">You haven't enrolled in any courses yet. Explore our catalog to start your learning journey!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center space-x-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
           <div className="bg-emerald-500 rounded-full p-1">
             <CheckCircle className="w-4 h-4 text-white" />
           </div>
           <span className="font-medium text-sm">{notification}</span>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="opacity-90">You're making great progress. Keep it up!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}

        {/* Status Breakdown Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <div className="p-3 rounded-lg bg-gray-100">
                  <ListChecks className="w-6 h-6 text-gray-600" />
               </div>
               <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Status</p>
                  <div className="flex flex-col text-xs space-y-0.5">
                     <span className="text-green-600 font-semibold">{completedCount} Completed</span>
                     <span className="text-blue-600 font-semibold">{inProgressCount} In Progress</span>
                     <span className="text-gray-500 font-semibold">{notStartedCount} To Start</span>
                  </div>
               </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course List & Progress */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
            Active Courses
          </h2>
          <div className="space-y-4">
            {progressData.map((item) => {
              const course = courses.find(c => c.id === item.id);
              if (!course) return null;
              
              const progressStyle = getProgressStyles(item.completed);
              
              return (
                <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex space-x-4">
                      <img src={course.image} alt={course.title} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <h3 className="font-bold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-500">{course.instructor}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                       <button 
                        onClick={() => onProvideFeedback(course.id)}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Give Feedback
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs font-semibold text-gray-600">
                      <span>Progress</span>
                      <span className={item.completed === 100 ? 'text-emerald-600' : 'text-gray-900'}>{item.completed}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 p-0.5 shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out relative ${progressStyle}`} 
                        style={{ width: `${item.completed}%` }}
                      >
                        {item.completed > 0 && item.completed < 100 && (
                          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {item.completed === 100 ? (
                      <button 
                         onClick={() => handleDownloadCertificate(course.title)}
                         className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow"
                      >
                         <Download className="w-4 h-4" />
                         <span>Download Certificate</span>
                      </button>
                    ) : (
                      <button 
                         onClick={() => onOpenCourse(course)}
                         className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow"
                      >
                         <PlayCircle className="w-4 h-4" />
                         <span>Continue Learning</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
             <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
             Overview
          </h2>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-80">
             <h3 className="text-sm font-semibold text-gray-500 mb-4 text-center">Completion Status</h3>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={pieData}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {pieData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
             <div className="flex justify-center space-x-4 text-xs text-gray-500 mt-2">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span>{entry.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;