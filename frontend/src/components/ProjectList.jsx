import { useState, useEffect, useRef } from 'react';
import { ExternalLink, ChevronRight, ChevronLeft, Briefcase, Calendar } from 'lucide-react';
import RepoLens from "@assets/RepoLens.png";
import ChatBotBuilder from "@assets/ChatBotBuilder.png";
import ExpenseGQL from "@assets/ExpenseGQL.png";
import AIFormBuilder from "@assets/AIFormBuilder.png";
import ChatApp from "@assets/ChatApp.png";
import CodePen from "@assets/CodePen.png";
import DocApp from "@assets/DocApp.png";
import CodeEditor from "@assets/CodeEditor.png";
import TodoApp from "@assets/TodoApp.png";
import Sample from "@assets/Sample.png";
import DDrive from "@assets/DDrive.png";

const projectImageMap = {
  "RepoLens": RepoLens,
  "ChatBotBuilder": ChatBotBuilder,
  "ExpenseGQL": ExpenseGQL,
  "AIFormBuilder": AIFormBuilder,
  "ChatApp": ChatApp,
  "CodePen": CodePen,
  "DocApp": DocApp,
  "CodeEditor": CodeEditor,
  "TodoApp": TodoApp,
  "Sample": Sample,
  "DDrive": DDrive
}

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

  const handleDescriptionHover = (e, projectId) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    // Check if tooltip would be cut off at top
    const tooltipHeight = 150;
    const spaceAbove = rect.top;
    const hasSpaceAbove = spaceAbove > tooltipHeight + 20;

    setTooltipPosition(hasSpaceAbove ? 'top' : 'bottom');
    setHoveredId(projectId);
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
            {/* Company & Role Badge Header */}
            {(project.company || project.role) && (
              <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 border-b border-slate-700 px-6 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  {project.company && (
                    <span className="text-sm font-semibold text-cyan-400">
                      {project.company}
                    </span>
                  )}
                </div>
                {project.role && (
                  <p className="text-xs text-slate-300 pl-6">
                    {project.role}
                  </p>
                )}
              </div>
            )}

            <div className="relative overflow-hidden h-48">
              <img
                src={projectImageMap[project.uiImagePath]}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>

              {/* Description with smart positioned tooltip */}
              <div className="relative group/desc mb-4">
                <p
                  onMouseEnter={(e) => handleDescriptionHover(e, project._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="text-slate-400 text-sm line-clamp-2 cursor-help hover:text-slate-300 transition-colors"
                >
                  {project.description}
                </p>

                {/* Tooltip - positioned dynamically */}
                {hoveredId === project._id && (
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-[320px] max-w-[90vw] opacity-0 invisible group-hover/desc:opacity-100 group-hover/desc:visible transition-all duration-200 z-40 pointer-events-none
                      ${tooltipPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}
                    `}
                  >
                    <div className={`bg-slate-900 border border-cyan-500/50 rounded-lg p-4 shadow-2xl shadow-cyan-500/20
                      ${tooltipPosition === 'top' ? '' : ''}
                    `}>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className={`absolute w-4 h-4 bg-slate-900 border border-cyan-500/50 transform rotate-45
                        ${tooltipPosition === 'top'
                          ? 'top-full left-1/2 -translate-x-1/2 -mt-2 border-r border-b'
                          : 'bottom-full left-1/2 -translate-x-1/2 mt-0 -mb-2 border-l border-t'
                        }
                      `}></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-900/50 border border-slate-700 rounded text-xs text-cyan-400">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Dates Section with Company Duration */}
              <div className="space-y-2 mb-4">
                {(project.startDate || project.endDate) && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400/60" />
                    <span>
                      {project.startDate && project.endDate
                        ? `${new Date(project.startDate).toLocaleDateString()} - ${new Date(project.endDate).toLocaleDateString()}`
                        : project.startDate
                          ? new Date(project.startDate).toLocaleDateString()
                          : ''}
                    </span>
                  </div>
                )}

                {/* Company Duration */}
                {project.companyStartDate && project.companyEndDate && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/40 rounded px-3 py-2 border border-slate-700/50">
                    <span className="font-medium text-cyan-400/70">Company tenure:</span>
                    <span>
                      {new Date(project.companyStartDate).toLocaleDateString()} - {project.companyEndDate === 'present' || project.companyEndDate === 'Present' ? 'Present' : new Date(project.companyEndDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
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
                {!project.link && <div></div>}
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