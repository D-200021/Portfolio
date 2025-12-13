import React, { useEffect, useState } from 'react'
import { Code, Terminal, Briefcase } from 'lucide-react';

export default function AboutMe({ data = {} }) {
    return (
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-2xl opacity-20"></div>
                    <img
                        src={data[0]?.profilePic}
                        alt="Profile"
                        className="relative rounded-2xl w-full aspect-square object-cover border-2 border-slate-700"
                    />
                </div>
            </div>
            <div>
                <h4 className="text-2xl font-bold text-white mb-4">About Me</h4>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                    <p>
                        Hey there! I'm <span className="text-cyan-400 font-semibold">Dhruv Sheth</span>, a Senior Software Engineer with a passion for building scalable, efficient, and user-centric web applications. With expertise in the <span className="text-cyan-400">MERN stack</span> (MongoDB, Express.js, React, Node.js), I transform complex problems into elegant digital solutions.
                    </p>
                    <p>
                        My journey in software development began with a curiosity about how things work under the hood. Over the years, I've evolved from writing my first "Hello World" to architecting microservices that serve millions of users. I believe in writing clean, maintainable code and building systems that stand the test of time.
                    </p>
                    <p>
                        Beyond coding, I'm passionate about <span className="text-cyan-400">mentoring junior developers</span>, contributing to open-source projects, and staying updated with the latest tech trends. When I'm not debugging or deploying, you'll find me exploring new technologies, writing technical blogs, or enjoying a good cup of coffee.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                            <Code className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm">3+ Years Experience</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                            <Terminal className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm">10+ Projects Delivered</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                            <Briefcase className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm">Full-Stack Developer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
