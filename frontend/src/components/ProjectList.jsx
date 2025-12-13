import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

export default function ProjectList({ data = [] }) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(project => (
        <div key={project._id} className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
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
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
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
  );
}
