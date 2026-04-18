import { useState, useEffect, useRef } from 'react';
import { ExternalLink, ChevronRight, ChevronLeft, Briefcase, Calendar } from 'lucide-react';

// ✅ auto-import all images from assets
const images = import.meta.glob("../assets/*.png", { eager: true });

// ✅ helper to safely resolve image
const getImage = (name) => {
  if (!name) return images["../assets/Sample.png"]?.default;

  const path = `../assets/${name}.png`;
  return images[path]?.default || images["../assets/Sample.png"]?.default;
};

export default function ProjectListAlt({ data = [] }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [tooltipPosition, setTooltipPosition] = useState('top');
  const [hoveredId, setHoveredId] = useState(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === 'left'
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

  const handleDescriptionHover = (e, projectId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipHeight = 150;
    const hasSpaceAbove = rect.top > tooltipHeight + 20;

    setTooltipPosition(hasSpaceAbove ? 'top' : 'bottom');
    setHoveredId(projectId);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () =>
        container.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-slate-800/90 hover:bg-slate-700 rounded-full border border-slate-600"
        >
          <ChevronLeft className="w-6 h-6 text-cyan-400" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-slate-800/90 hover:bg-slate-700 rounded-full border border-slate-600"
        >
          <ChevronRight className="w-6 h-6 text-cyan-400" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 px-2 scrollbar-hide"
      >
        {data.map((project) => (
          <div
            key={project._id}
            className="group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 flex-shrink-0 w-[350px]"
          >
            {(project.company || project.role) && (
              <div className="bg-slate-900 border-b border-slate-700 px-6 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-400">
                    {project.company}
                  </span>
                </div>
                <p className="text-xs text-slate-300 pl-6">
                  {project.role}
                </p>
              </div>
            )}

            <div className="relative overflow-hidden h-48">
              <img
                src={getImage(project.uiImagePath)}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h4 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h4>

              <p
                onMouseEnter={(e) =>
                  handleDescriptionHover(e, project._id)
                }
                onMouseLeave={() => setHoveredId(null)}
                className="text-slate-400 text-sm mb-4"
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-cyan-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cyan-400 text-sm"
                  >
                    View <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}