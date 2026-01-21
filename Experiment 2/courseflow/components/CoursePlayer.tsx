import React, { useState, useEffect } from 'react';
import { Course, Module, Lesson, User } from '../types';
import { PlayCircle, Check, FileText, ChevronLeft, ChevronDown, ChevronRight, Menu, X, MessageSquare, Download, Share2 } from 'lucide-react';

interface CoursePlayerProps {
  course: Course;
  user: User;
  onBack: () => void;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({ course, user, onBack }) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(course.modules?.[0]?.id || '');
  const [activeLessonId, setActiveLessonId] = useState<string>(course.modules?.[0]?.lessons?.[0]?.id || '');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'qa' | 'notes'>('overview');

  // Load progress
  useEffect(() => {
    const storageKey = `courseflow_progress_data_${user.id}_${course.id}`;
    const savedProgress = localStorage.getItem(storageKey);
    if (savedProgress) {
      setCompletedLessons(JSON.parse(savedProgress));
    }
  }, [user.id, course.id]);

  // Save progress and update dashboard percentage
  const toggleLessonCompletion = (lessonId: string) => {
    let newCompleted = [...completedLessons];
    if (newCompleted.includes(lessonId)) {
      newCompleted = newCompleted.filter(id => id !== lessonId);
    } else {
      newCompleted.push(lessonId);
    }
    setCompletedLessons(newCompleted);
    
    // Save detailed progress
    localStorage.setItem(`courseflow_progress_data_${user.id}_${course.id}`, JSON.stringify(newCompleted));

    // Update overall dashboard percentage
    const totalLessons = course.modules?.reduce((acc, m) => acc + m.lessons.length, 0) || 1;
    const percent = Math.round((newCompleted.length / totalLessons) * 100);
    
    const dashboardKey = `courseflow_progress_${user.id}`;
    const dashboardData = JSON.parse(localStorage.getItem(dashboardKey) || '{}');
    dashboardData[course.id] = percent;
    localStorage.setItem(dashboardKey, JSON.stringify(dashboardData));
  };

  const currentModule = course.modules?.find(m => m.id === activeModuleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === activeLessonId) || course.modules?.[0]?.lessons[0];

  const totalLessons = course.modules?.reduce((acc, m) => acc + m.lessons.length, 0) || 0;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation Bar for Player */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-gray-900 line-clamp-1 sm:text-base">{course.title}</h1>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
               <span className="bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-medium">{course.category}</span>
               <span>•</span>
               <span className="font-semibold text-emerald-600">{progressPercentage}% Complete</span>
               <span>({completedLessons.length}/{totalLessons} lessons)</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-5xl mx-auto">
            {/* Video Player Placeholder */}
            <div className="bg-black aspect-video w-full relative group">
              <img 
                src={course.image} 
                alt="Lesson Thumbnail" 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/20 backdrop-blur-sm p-4 rounded-full hover:scale-110 transition-transform hover:bg-white/30 group-hover:bg-indigo-600 group-hover:text-white border-2 border-white/50 group-hover:border-transparent">
                   <PlayCircle className="w-12 h-12 fill-current" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                 <h2 className="text-lg font-bold">{currentLesson?.title}</h2>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="px-4 sm:px-8 py-6">
               <div className="flex space-x-6 border-b border-gray-200 mb-6">
                  {['Overview', 'Q&A', 'Notes'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase() as any)}
                      className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.toLowerCase() 
                        ? 'border-indigo-600 text-indigo-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
               </div>

               {activeTab === 'overview' && (
                 <div className="space-y-6 animate-in fade-in duration-300">
                    <div>
                       <h3 className="text-lg font-bold text-gray-900 mb-2">About this lesson</h3>
                       <p className="text-gray-600 leading-relaxed">
                         In this lesson, we will dive deep into {currentLesson?.title}. You'll learn the core concepts and practical applications needed to master this topic.
                         Make sure to download the attached resources for hands-on practice.
                       </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                       <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:border-indigo-200 transition-colors bg-white shadow-sm">
                          <Download className="w-4 h-4" />
                          <span>Exercise Files.zip</span>
                       </button>
                       <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:border-indigo-200 transition-colors bg-white shadow-sm">
                          <Share2 className="w-4 h-4" />
                          <span>Share Lesson</span>
                       </button>
                    </div>

                    <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                       <h4 className="font-bold text-indigo-900 mb-2">Instructor Note</h4>
                       <p className="text-indigo-800 text-sm">
                         "Don't forget to complete the quiz at the end of this module. It counts towards 20% of your final grade!" 
                         <br/>— {course.instructor}
                       </p>
                    </div>
                 </div>
               )}

               {activeTab === 'qa' && (
                 <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                    <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <h3 className="font-medium text-gray-900">No questions yet</h3>
                    <p className="text-gray-500 text-sm mb-4">Be the first to ask a question about this lesson.</p>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                      Ask a Question
                    </button>
                 </div>
               )}

               {activeTab === 'notes' && (
                  <div className="bg-white p-4 rounded-xl border border-gray-200 min-h-[200px]">
                    <textarea 
                      className="w-full h-full p-2 text-gray-700 focus:outline-none resize-y min-h-[150px]"
                      placeholder="Start typing your notes here..."
                    ></textarea>
                  </div>
               )}
            </div>
          </div>
        </div>

        {/* Sidebar / Playlist */}
        <div className={`fixed inset-y-0 right-0 w-80 bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-30 lg:relative lg:translate-x-0 lg:h-auto ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Course Content</h3>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500">
                <X className="w-5 h-5" />
              </button>
           </div>
           
           <div className="overflow-y-auto h-full pb-20 scrollbar-thin scrollbar-thumb-gray-200">
              {course.modules?.map((module, mIndex) => {
                const isModuleOpen = activeModuleId === module.id;
                
                return (
                  <div key={module.id} className="border-b border-gray-100">
                     <button 
                      onClick={() => setActiveModuleId(isModuleOpen ? '' : module.id)}
                      className={`w-full px-4 py-4 flex items-center justify-between transition-colors duration-200 ${isModuleOpen ? 'bg-gray-50 text-indigo-900' : 'bg-white hover:bg-gray-50 text-gray-900'}`}
                     >
                       <div className="text-left">
                         <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${isModuleOpen ? 'text-indigo-500' : 'text-gray-500'}`}>Module {mIndex + 1}</p>
                         <p className="text-sm font-medium">{module.title}</p>
                       </div>
                       <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isModuleOpen ? 'rotate-180' : ''}`} />
                     </button>
  
                     <div 
                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                          isModuleOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                       <div className="overflow-hidden bg-gray-50/30">
                          {module.lessons.map((lesson, lIndex) => {
                            const isActive = activeLessonId === lesson.id;
                            const isCompleted = completedLessons.includes(lesson.id);
                            
                            return (
                              <div 
                                key={lesson.id}
                                className={`flex items-start px-4 py-3 cursor-pointer border-l-4 transition-all duration-200 ${
                                  isActive 
                                  ? 'bg-indigo-50 border-indigo-600 shadow-sm' 
                                  : 'border-transparent hover:bg-gray-100 hover:pl-5'
                                } ${isCompleted && !isActive ? 'opacity-75 grayscale-[0.3] hover:grayscale-0' : ''}`}
                                onClick={() => setActiveLessonId(lesson.id)}
                              >
                                <div 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLessonCompletion(lesson.id);
                                  }}
                                  className="mt-0.5 flex-shrink-0 cursor-pointer group"
                                >
                                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${
                                      isCompleted 
                                      ? 'bg-emerald-600 border-emerald-600 scale-100' 
                                      : 'border-gray-300 bg-white group-hover:border-indigo-400 scale-95 group-hover:scale-100'
                                  }`}>
                                      {isCompleted && <Check className="w-3.5 h-3.5 text-white animate-in zoom-in duration-200" strokeWidth={3} />}
                                  </div>
                                </div>
                                
                                <div className="ml-3 flex-1">
                                   <p className={`text-sm transition-colors ${isActive ? 'font-semibold text-indigo-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                     {lIndex + 1}. {lesson.title}
                                   </p>
                                   <div className="flex items-center mt-1 space-x-2">
                                      {lesson.type === 'video' ? <PlayCircle className="w-3 h-3 text-gray-400" /> : <FileText className="w-3 h-3 text-gray-400" />}
                                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                                   </div>
                                </div>
                              </div>
                            );
                          })}
                       </div>
                     </div>
                  </div>
                );
              })}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;