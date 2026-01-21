import React, { useState } from 'react';
import { Layout, LogOut, Menu, UserCircle, Search, Filter, BookOpen, X, ChevronDown, PlayCircle } from 'lucide-react';
import { Course, User, ViewState, Module, Lesson } from './types';
import CourseCard from './components/CourseCard';
import Dashboard from './components/Dashboard';
import CoursePlayer from './components/CoursePlayer';
import AICourseAdvisor from './components/AICourseAdvisor';

// --- Mock Data ---
const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced React Patterns & Performance',
    instructor: 'Sarah Drasner',
    description: 'Elevate your React skills. Master advanced patterns like Compound Components, Control Props, and Custom Hooks. Deep dive into React Query, performance optimization, and large-scale state management.',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    students: 1420,
    duration: '8 weeks',
    level: 'Advanced'
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass with Figma',
    instructor: 'Gary Simon',
    description: 'From wireframing to prototyping. Learn the core principles of visual hierarchy, color theory, and typography. Build a complete design system and interactive high-fidelity prototypes using Figma.',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    students: 2150,
    duration: '6 weeks',
    level: 'Beginner'
  },
  {
    id: '3',
    title: 'Machine Learning A-Z: Python & R',
    instructor: 'Andrew Ng',
    description: 'A comprehensive guide to Machine Learning. Dive into algorithms, data processing, and neural networks. Hands-on projects with Scikit-Learn, TensorFlow, and PyTorch.',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef2bb6db9844?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    students: 3400,
    duration: '12 weeks',
    level: 'Intermediate'
  },
  {
    id: '4',
    title: 'Digital Marketing & SEO Mastery',
    instructor: 'Neil Patel',
    description: 'Dominate the digital landscape. Learn advanced SEO, Social Media Marketing, Content Strategy, and Google Analytics 4. Create converting funnels and email campaigns.',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    students: 2100,
    duration: '5 weeks',
    level: 'Beginner'
  },
  {
    id: '5',
    title: 'AWS Certified Solutions Architect',
    instructor: 'Stephane Maarek',
    description: 'The ultimate guide to passing the SAA-C03 exam. Deep dive into EC2, S3, RDS, Lambda, and DynamoDB. Includes real-world architecture case studies and practice exams.',
    category: 'DevOps',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef2bb6db9844?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    students: 1500,
    duration: '10 weeks',
    level: 'Advanced'
  },
  {
    id: '6',
    title: 'Financial Analysis & Valuation',
    instructor: 'Chamath P.',
    description: 'Understand balance sheets, cash flow statements, and valuation metrics specifically for high-growth startups and public companies. Master Excel financial modeling.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    students: 600,
    duration: '5 weeks',
    level: 'Intermediate'
  },
  {
    id: '7',
    title: 'Python for Data Science Bootcamp',
    instructor: 'Jose Portilla',
    description: 'Learn Python programming from scratch. specialized for Data Science. Master NumPy, Pandas, Matplotlib, and Seaborn for data analysis and stunning visualizations.',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543286386-713df548e9cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    students: 5400,
    duration: '9 weeks',
    level: 'Beginner'
  },
  {
    id: '8',
    title: 'Cybersecurity: Zero to Hero',
    instructor: 'Nathan House',
    description: 'Understand hackers to stop them. Learn network security, ethical hacking, encryption, and how to secure enterprise systems against modern cyber threats.',
    category: 'DevOps',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    students: 1890,
    duration: '11 weeks',
    level: 'Intermediate'
  },
  {
    id: '9',
    title: 'PMP Exam Prep Seminar',
    instructor: 'Joseph Phillips',
    description: 'Earn your 35 contact hours for the Project Management Professional (PMP) exam. Covers Agile, Waterfall, and hybrid project management methodologies.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    students: 3100,
    duration: '4 weeks',
    level: 'Advanced'
  },
  {
    id: '10',
    title: 'Flutter & Dart - The Complete Guide',
    instructor: 'Maximilian Schwarzmüller',
    description: 'Build native iOS and Android apps with a single codebase. Learn Dart, Flutter widgets, state management with Riverpod, and how to publish your apps to the stores.',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    students: 2200,
    duration: '14 weeks',
    level: 'Intermediate'
  }
];

const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  enrolledCourseIds: ['2']
};

// Helper to generate mock curriculum content
const generateMockContent = (courseId: string, courseTitle: string): Module[] => {
  return [
    {
      id: `${courseId}-m1`,
      title: 'Module 1: Getting Started',
      lessons: [
        { id: `${courseId}-l1`, title: 'Course Introduction', duration: '5:20', type: 'video' },
        { id: `${courseId}-l2`, title: 'Setting up your environment', duration: '15:10', type: 'video' },
        { id: `${courseId}-l3`, title: 'Core Concepts Overview', duration: '12:45', type: 'reading' },
      ]
    },
    {
      id: `${courseId}-m2`,
      title: 'Module 2: Fundamentals',
      lessons: [
        { id: `${courseId}-l4`, title: 'Deep Dive Part 1', duration: '18:30', type: 'video' },
        { id: `${courseId}-l5`, title: 'Deep Dive Part 2', duration: '22:15', type: 'video' },
        { id: `${courseId}-l6`, title: 'Practical Exercise', duration: '45:00', type: 'quiz' },
      ]
    },
    {
      id: `${courseId}-m3`,
      title: 'Module 3: Advanced Topics',
      lessons: [
        { id: `${courseId}-l7`, title: 'Optimization Techniques', duration: '25:00', type: 'video' },
        { id: `${courseId}-l8`, title: 'Real-world Examples', duration: '30:10', type: 'video' },
      ]
    },
     {
      id: `${courseId}-m4`,
      title: 'Module 4: Final Project',
      lessons: [
        { id: `${courseId}-l9`, title: 'Project Brief', duration: '10:00', type: 'reading' },
        { id: `${courseId}-l10`, title: 'Submission Guide', duration: '5:00', type: 'reading' },
      ]
    }
  ];
};

function App() {
  const [view, setView] = useState<ViewState>('CATALOG');
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackCourseId, setFeedbackCourseId] = useState<string | null>(null);
  
  // State for the active course being played
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  
  // Track previous view for navigation
  const [previousView, setPreviousView] = useState<ViewState>('CATALOG');

  // --- Handlers ---

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setUser(MOCK_USER);
      setShowAuthModal(false);
      setView('CATALOG');
    }, 500);
  };

  const handleLogout = () => {
    setUser(null);
    setView('CATALOG');
    setActiveCourseId(null);
  };

  const handleEnroll = (courseId: string) => {
    if (!user) {
      setAuthMode('LOGIN');
      setShowAuthModal(true);
      return;
    }
    
    // Simulate enrollment
    const updatedUser = { ...user, enrolledCourseIds: [...user.enrolledCourseIds, courseId] };
    setUser(updatedUser);
    alert(`Successfully enrolled in course!`);
  };

  const handleProvideFeedback = (courseId: string) => {
      setFeedbackCourseId(courseId);
      setShowFeedbackModal(true);
  };

  const submitFeedback = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate API submission
      setShowFeedbackModal(false);
      setFeedbackCourseId(null);
      alert("Thank you! Your feedback has been submitted.");
  };

  // Navigate to Course Player
  const handleOpenCourse = (course: Course) => {
     // Lazy load modules if they don't exist
     if (!course.modules) {
        const modules = generateMockContent(course.id, course.title);
        const updatedCourses = courses.map(c => c.id === course.id ? { ...c, modules } : c);
        setCourses(updatedCourses);
     }
     setPreviousView(view); // Save current view context
     setActiveCourseId(course.id);
     setView('COURSE_CONTENT');
     setSelectedCourse(null); // Close details modal if open
  };

  const activeCourse = courses.find(c => c.id === activeCourseId);

  // --- Filtering ---
  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  
  const filteredCourses = courses.filter(course => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = course.title.toLowerCase().includes(query) || 
                          course.instructor.toLowerCase().includes(query) ||
                          course.description.toLowerCase().includes(query) ||
                          course.category.toLowerCase().includes(query);

    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Navigation - Only show full nav if not in course player mode */}
      {view !== 'COURSE_CONTENT' && (
        <nav className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center cursor-pointer" onClick={() => setView('CATALOG')}>
                <div className="bg-indigo-600 p-2 rounded-lg mr-2">
                   <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">CourseFlow</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => setView('CATALOG')}
                  className={`${view === 'CATALOG' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-900'} px-1 pt-1 text-sm font-medium h-full transition-colors`}
                >
                  Browse Courses
                </button>
                {user && (
                  <button 
                    onClick={() => setView('DASHBOARD')}
                    className={`${view === 'DASHBOARD' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-900'} px-1 pt-1 text-sm font-medium h-full transition-colors`}
                  >
                    My Dashboard
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <UserCircle className="h-5 w-5 text-gray-400" />
                      <span className="hidden sm:block">{user.name}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-gray-100"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                     <button 
                      onClick={() => { setAuthMode('LOGIN'); setShowAuthModal(true); }}
                      className="text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors"
                     >
                       Log in
                     </button>
                     <button 
                      onClick={() => { setAuthMode('REGISTER'); setShowAuthModal(true); }}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm hover:shadow transition-all"
                     >
                       Sign up
                     </button>
                  </div>
                )}
                
                {/* Mobile Menu Button (Mock) */}
                <div className="md:hidden flex items-center">
                    <Menu className="h-6 w-6 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className={`flex-1 w-full mx-auto ${view !== 'COURSE_CONTENT' ? 'max-w-7xl px-4 sm:px-6 lg:px-8 py-8' : ''}`}>
        
        {view === 'CATALOG' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="text-center md:text-left">
               <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Explore Courses</h1>
               <p className="text-lg text-gray-500 max-w-3xl">Discover new skills, advance your career, and join a community of lifelong learners.</p>
            </div>
            
            {/* Enhanced Filter Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-4 items-center justify-between sticky top-20 z-30">
               {/* Search */}
               <div className="relative w-full lg:w-96 group">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                 </div>
                 <input
                   type="text"
                   placeholder="Search courses, instructors..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="pl-10 pr-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent w-full transition-all shadow-sm"
                 />
               </div>
               
               <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 items-center">
                 {/* Filters Group */}
                 <div className="flex gap-4 w-full sm:w-auto">
                    {/* Category Filter */}
                    <div className="relative w-full sm:w-48 group">
                        <select 
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="appearance-none w-full pl-4 pr-10 py-3 border border-gray-200 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white cursor-pointer transition-all shadow-sm text-gray-700"
                        >
                          {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                           <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        </div>
                    </div>

                    {/* Level Filter */}
                    <div className="relative w-full sm:w-48 group">
                        <select 
                          value={selectedLevel}
                          onChange={(e) => setSelectedLevel(e.target.value)}
                          className="appearance-none w-full pl-4 pr-10 py-3 border border-gray-200 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white cursor-pointer transition-all shadow-sm text-gray-700"
                        >
                          {levels.map(lvl => <option key={lvl} value={lvl}>{lvl === 'All' ? 'All Levels' : lvl}</option>)}
                        </select>
                         <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                           <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        </div>
                    </div>
                 </div>

                 {/* Reset Button (Conditional) */}
                 {(searchQuery || selectedCategory !== 'All' || selectedLevel !== 'All') && (
                    <button 
                      onClick={() => {setSearchQuery(''); setSelectedCategory('All'); setSelectedLevel('All');}}
                      className="text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Reset Filters
                    </button>
                 )}
               </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isEnrolled={user?.enrolledCourseIds.includes(course.id) || false}
                  isAuthenticated={!!user}
                  onEnroll={handleEnroll}
                  onViewDetails={setSelectedCourse}
                  onOpenCourse={handleOpenCourse}
                />
              ))}
              {filteredCourses.length === 0 && (
                <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                   <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                   </div>
                   <h3 className="text-lg font-bold text-gray-900 mb-1">No courses found</h3>
                   <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                   <button 
                     onClick={() => {setSearchQuery(''); setSelectedCategory('All'); setSelectedLevel('All');}}
                     className="mt-6 text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
                   >
                     Clear all filters
                   </button>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'DASHBOARD' && user && (
          <Dashboard 
            user={user} 
            courses={courses} 
            onProvideFeedback={handleProvideFeedback}
            onOpenCourse={handleOpenCourse}
          />
        )}

        {view === 'COURSE_CONTENT' && user && activeCourse && (
          <CoursePlayer 
            course={activeCourse} 
            user={user}
            onBack={() => {
                setView(previousView);
                setActiveCourseId(null);
            }} 
          />
        )}
      </main>

      {/* AI Advisor Floating Action - Only show on catalog/dashboard */}
      {view !== 'COURSE_CONTENT' && <AICourseAdvisor courses={courses} />}

      {/* --- Modals --- */}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {authMode === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  {authMode === 'LOGIN' ? 'Enter your details to access your courses.' : 'Join thousands of learners today.'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {authMode === 'REGISTER' && (
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                     <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="John Doe" required />
                   </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="••••••••" required />
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
                  {authMode === 'LOGIN' ? 'Sign In' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                {authMode === 'LOGIN' ? (
                  <>
                    Don't have an account?{' '}
                    <button onClick={() => setAuthMode('REGISTER')} className="text-indigo-600 font-semibold hover:underline">
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button onClick={() => setAuthMode('LOGIN')} className="text-indigo-600 font-semibold hover:underline">
                      Log in
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
             <div className="relative h-56 sm:h-72">
                <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-4 right-4 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 backdrop-blur-md transition"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                   <span className="text-xs font-semibold bg-indigo-500 text-white px-2 py-1 rounded mb-2 inline-block">
                      {selectedCourse.category}
                   </span>
                   <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedCourse.title}</h2>
                </div>
             </div>
             
             <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-6 text-sm text-gray-600 border-b border-gray-100 pb-6">
                   <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                      <span><strong>Instructor:</strong> {selectedCourse.instructor}</span>
                      <span><strong>Duration:</strong> {selectedCourse.duration}</span>
                      <span><strong>Level:</strong> {selectedCourse.level}</span>
                   </div>
                   <div className="flex items-center text-yellow-500 font-bold">
                      <span className="mr-1">{selectedCourse.rating}</span>
                      <StarRating rating={selectedCourse.rating} />
                   </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">About this course</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                   {selectedCourse.description}
                   <br/><br/>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                {selectedCourse.gallery && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Course Preview</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {selectedCourse.gallery.map((img, idx) => (
                        <img key={idx} src={img} alt={`Preview ${idx + 1}`} className="rounded-lg h-32 w-full object-cover shadow-sm hover:shadow-md transition-shadow" />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                   {user?.enrolledCourseIds.includes(selectedCourse.id) ? (
                      <button 
                        onClick={() => handleOpenCourse(selectedCourse)}
                        className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                      >
                         <PlayCircle className="w-5 h-5" />
                         <span>Go to Course</span>
                      </button>
                   ) : (
                      <button 
                        onClick={() => {
                          handleEnroll(selectedCourse.id);
                          setSelectedCourse(null);
                        }}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                      >
                         Enroll Now
                      </button>
                   )}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
           <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
              <button 
                 onClick={() => setShowFeedbackModal(false)}
                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                 <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Provide Feedback</h2>
              <p className="text-gray-500 text-sm mb-6">Tell us what you think about this course.</p>
              
              <form onSubmit={submitFeedback} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex space-x-2">
                       {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} type="button" className="text-yellow-400 hover:scale-110 transition-transform focus:outline-none">
                             <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                             </svg>
                          </button>
                       ))}
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                    <textarea 
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none h-32 resize-none"
                       placeholder="What did you learn? What could be improved?"
                       required
                    ></textarea>
                 </div>
                 
                 <div className="flex justify-end pt-2">
                    <button 
                       type="button" 
                       onClick={() => setShowFeedbackModal(false)}
                       className="mr-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition"
                    >
                       Cancel
                    </button>
                    <button 
                       type="submit"
                       className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition"
                    >
                       Submit Review
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
}

// Helper component for stars
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
       {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-current text-yellow-500' : 'fill-gray-300 text-gray-300'}`} viewBox="0 0 24 24">
             <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
       ))}
    </div>
  )
}

export default App;