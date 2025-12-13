import { Database, Server, Layout, Cpu } from 'lucide-react';

export default function Skills() {
    const skillCategories = [
        {
            icon: <Layout className="w-5 h-5" />,
            title: "Frontend",
            skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux"]
        },
        {
            icon: <Server className="w-5 h-5" />,
            title: "Backend",
            skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "WebSockets"]
        },
        {
            icon: <Database className="w-5 h-5" />,
            title: "Database",
            skills: ["MongoDB", "PostgreSQL", "Redis", "Prisma", "Mongoose"]
        },
        {
            icon: <Cpu className="w-5 h-5" />,
            title: "DevOps",
            skills: ["Docker", "CI/CD", "AWS", "Git", "Linux"]
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, idx) => (
                <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                            {category.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-900/50 rounded-full text-xs text-slate-300 border border-slate-700">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}