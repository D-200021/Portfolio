import { useState, useEffect, useRef } from 'react';
import { ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

export default function ProjectList({ data = [] }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  return (
    <div className="relative">
      {/* Left Navigation Button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-sm rounded-full border border-slate-600 shadow-lg transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-cyan-400" />
        </button>
      )}

      {/* Right Navigation Button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-sm rounded-full border border-slate-600 shadow-lg transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-cyan-400" />
        </button>
      )}

      {/* Projects Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 px-2 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {data.map(project => (
          <div
            key={project._id}
            className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] flex-shrink-0 w-[350px]"
          >
            <div className="relative overflow-hidden h-48">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>

              {/* Description with hover tooltip */}
              <div className="relative group/desc mb-4">
                <p className="text-slate-400 text-sm line-clamp-2 cursor-help">
                  {project.description}
                </p>

                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-[320px] max-w-[90vw] opacity-0 invisible group-hover/desc:opacity-100 group-hover/desc:visible transition-all duration-200 z-30 pointer-events-none">
                  <div className="bg-slate-900 border border-cyan-500/50 rounded-lg p-4 shadow-2xl shadow-cyan-500/20">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-slate-900 border-r border-b border-cyan-500/50 transform rotate-45"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-900/50 border border-slate-700 rounded text-xs text-cyan-400">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                  >
                    View <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}