import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Cut our CAC by 32% in 3 weeks — replaced 4 tools with Omnify's AI Brain.",
    name: "Sarah Chen",
    role: "VP of Growth",
    company: "TechFlow ($85M ARR)",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2",
    rating: 5
  },
  {
    id: 2,
    quote: "We 3x'd our launch volume and saw results in 24 hours — no more creative bottlenecks.",
    name: "Marcus Rodriguez",
    role: "Head of Marketing",
    company: "ScaleUp Inc ($120M ARR)",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2",
    rating: 5
  },
  {
    id: 3,
    quote: "First tool our growth + content team both love — saved $180k in Q1 alone.",
    name: "Emily Watson",
    role: "CMO",
    company: "GrowthLabs ($95M ARR)",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2",
    rating: 5
  },
  {
    id: 4,
    quote: "ROAS improved 240% in 6 weeks — budget moves from losers to winners automatically.",
    name: "David Kim",
    role: "Performance Marketing Lead",
    company: "FastTrack Digital ($75M ARR)",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2",
    rating: 5
  },
  {
    id: 5,
    quote: "Finally, AI that understands our brand voice — maintains tone while optimizing performance.",
    name: "Jessica Park",
    role: "Brand Marketing Director",
    company: "InnovateCorp ($110M ARR)",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2",
    rating: 5
  },
  {
    id: 6,
    quote: "Caught campaign failure 3 days early — saved $50k before we even noticed the drop.",
    name: "Alex Thompson",
    role: "Growth Hacker",
    company: "StartupBoost ($65M ARR)",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2",
    rating: 5
  },
  {
    id: 7,
    quote: "Scaled from $100k to $2M ad spend without hiring — Omnify handles the complexity.",
    name: "Rachel Green",
    role: "Marketing Operations Manager",
    company: "ScaleTech ($140M ARR)",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2",
    rating: 5
  },
  {
    id: 8,
    quote: "One winning ad becomes 25+ variants across Facebook, Google, TikTok — simultaneously.",
    name: "Michael Chang",
    role: "Digital Marketing Specialist",
    company: "OmniChannel Pro ($80M ARR)",
    avatar: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2",
    rating: 5
  },
  {
    id: 9,
    quote: "Dashboard shows exactly which creative elements drive conversions — insights we never had.",
    name: "Lisa Martinez",
    role: "Analytics Lead",
    company: "DataDriven Marketing ($90M ARR)",
    avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2",
    rating: 5
  },
  {
    id: 10,
    quote: "ROI tracking crystal clear — see exactly where every dollar goes in real-time.",
    name: "James Wilson",
    role: "Revenue Operations Director",
    company: "ProfitMax Solutions ($130M ARR)",
    avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2",
    rating: 5
  }
];

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;
  const cardsPerView = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPlaying && !isHovered) {
      intervalRef.current = setInterval(nextSlide, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isHovered, nextSlide]);

  // Touch handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, togglePlayPause]);

  const getCurrentSlideTestimonials = () => {
    const startIndex = currentIndex * cardsPerView;
    const endIndex = Math.min(startIndex + cardsPerView, testimonials.length);
    return testimonials.slice(startIndex, endIndex);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-slate-600'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      ref={carouselRef}
      role="region"
      aria-label="Customer testimonials carousel"
      aria-live="polite"
    >
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500">
          {getCurrentSlideTestimonials().map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25 h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Quote with visual accents */}
                <div className="mb-6">
                  <div className="text-blue-400 text-4xl mb-3 font-serif leading-none">"</div>
                  <p className="text-slate-300 text-lg leading-relaxed font-medium">
                    {testimonial.quote}
                  </p>
                  <div className="text-blue-400 text-4xl text-right font-serif leading-none -mt-2">"</div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    className="w-16 h-16 rounded-full border-2 border-slate-600 group-hover:border-blue-400 transition-colors duration-300 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-400 text-sm font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-blue-400 text-sm font-semibold">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Only show if there are multiple slides */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 bg-slate-800/80 hover:bg-slate-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
            aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue-400 scale-125'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Screen Reader Instructions */}
      <div className="sr-only">
        <p>Use arrow keys to navigate testimonials, spacebar to pause/play auto-scroll</p>
        <p>Currently showing slide {currentIndex + 1} of {totalSlides}</p>
      </div>
    </div>
  );
};

export default TestimonialCarousel;