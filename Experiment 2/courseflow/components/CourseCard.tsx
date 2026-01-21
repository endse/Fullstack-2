import React, { useState } from 'react';
import { Clock, Users, Star, BookOpen, Image as ImageIcon, PlayCircle } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  onEnroll: (courseId: string) => void;
  onViewDetails: (course: Course) => void;
  onOpenCourse: (course: Course) => void;
  isAuthenticated: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled, onEnroll, onViewDetails, onOpenCourse, isAuthenticated }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleEnrollClick = () => {
    if (isAuthenticated) {
      setShowConfirm(true);
    } else {
      onEnroll(course.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 flex flex-col h-full relative group">
      
      {/* Confirmation Overlay */}
      {showConfirm && (
        <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-indigo-600" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Confirm Enrollment</h4>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to enroll in <span className="font-semibold text-gray-900">{course.title}</span>?
          </p>
          <div className="flex space-x-3 w-full">
            <button 
              onClick={() => setShowConfirm(false)}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                onEnroll(course.id);
                setShowConfirm(false);
              }}
              className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      <div className="relative h-48 overflow-hidden bg-gray-100">
        {/* Placeholder / Skeleton */}
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
            <ImageIcon className="w-8 h-8 text-gray-300 animate-pulse" />
        </div>

        <img 
          src={course.image} 
          alt={course.title} 
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`} 
        />
        
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-indigo-700 uppercase tracking-wide z-10">
          {course.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1 bg-white group-hover:bg-slate-50/50 transition-colors duration-300">
        <div className="flex items-center space-x-1 text-yellow-500 mb-2">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium text-gray-700">{course.rating}</span>
          <span className="text-xs text-gray-400">({course.students * 2} reviews)</span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors" title={course.title}>{course.title}</h3>
        <p className="text-sm text-gray-500 mb-4">by {course.instructor}</p>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-5">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{course.students} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-3 h-3" />
            <span>{course.level}</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-auto">
          {isEnrolled ? (
             <button 
              onClick={() => onOpenCourse(course)}
              className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Go to Course</span>
            </button>
          ) : (
            <button 
              onClick={handleEnrollClick}
              disabled={!isAuthenticated}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isAuthenticated 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isAuthenticated ? 'Enroll Now' : 'Login to Enroll'}
            </button>
          )}
          
          <button 
            onClick={() => onViewDetails(course)}
            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-white hover:text-indigo-600 hover:border-indigo-200 transition-colors bg-white"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;