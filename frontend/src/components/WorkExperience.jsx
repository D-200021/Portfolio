import { useState, useEffect } from 'react';
import { Briefcase, ChevronRight } from 'lucide-react';

function WorkExperience({ data = [] }) {

    // const [experiences, setExperiences] = useState([]);

    // const fetchWorkExperience = async () => {
    //     try {
    //         const apiRes = await fetch("/api/v1/getexperiencedetail");
    //         const parsedApi = await apiRes.json();
    //         if (parsedApi.status) {
    //             setExperiences(parsedApi.content);
    //         }

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchWorkExperience();
    // }, [])

    return (
        <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500"></div>
            {data.map((exp, index) => (
                <div key={index} className="relative pl-8 pb-12 last:pb-0">
                    <div className="absolute left-0 top-2 w-4 h-4 -ml-[7px] bg-cyan-500 rounded-full border-4 border-slate-900 shadow-lg shadow-cyan-500/50"></div>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
                        <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-slate-400 mb-4">
                            <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {exp.company}
                            </span>
                            <span>•</span>
                            <span>{exp.duration}</span>
                            <span>•</span>
                            <span>{exp.location}</span>
                        </div>
                        <ul className="space-y-2 mb-4">
                            {exp.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-300">
                                    <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            {exp.tech.map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default WorkExperience;
