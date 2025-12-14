import ProjectList from './components/ProjectList.jsx';
import TerminalAnimation from './components/TerminalAnimation.jsx';
import WorkExperience from './components/WorkExperience.jsx';
import AboutMe from './components/AboutMe.jsx';
import VisitorCounter from './components/VistorsCount.jsx';
import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, ChevronRight, Download } from 'lucide-react';
import Skills from './components/Skills.jsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [data, setData] = useState([])

  const fetchAllData = async () => {
    try {
      const apiRes = await fetch("/api/v1/", { method: "GET" });
      const parsedRes = await apiRes.json();
      if (parsedRes.status) {
        setData(parsedRes.content);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetch("/api/v1/visit", {
      method: "POST",
    });

    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    fetchAllData()

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        body {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-slate-950">
                DS
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Dhruv Sheth</h1>
                <p className="text-xs text-slate-400">Senior Software Engineer</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {['home', 'about', 'experience', 'projects', 'contact'].map(section => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === section
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              <VisitorCounter data={data.totalVisitors} />
            </div>
          </div>
        </div>
      </nav>

      <div className="relative">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  Available for opportunities
                </div>
                <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Building Scalable Web Solutions
                </h2>
                <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                  Full-Stack Engineer specializing in the MERN stack. I architect and develop high-performance web applications that scale from startup MVPs to enterprise solutions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
                  >
                    View Projects <ChevronRight className="w-4 h-4" />
                  </a>
                  <a
                    href={data?.personalInfo?.[0]?.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                  <a
                    href="#contact"
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-all"
                  >
                    Get in Touch
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <a href="https://github.com/D-200021" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/dhruvsheth1" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:dhruvsheth91@gmail.com" className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all">
                    <Mail className="w-5 h-5" />
                  </a>
                  <div className="ml-2">
                    <VisitorCounter data={data.totalVisitors} />
                  </div>
                </div>
              </div>
              <div>
                <TerminalAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">About Me</h3>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Get to know me better - my journey, passion, and what drives me as a developer
              </p>
            </div>
            <AboutMe data={data.personalInfo} />
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-white mb-4">Technical Expertise</h4>
              <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                Proficient across the full stack with a focus on building robust, maintainable, and scalable applications
              </p>
            </div>
            <Skills />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Work Experience</h3>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Professional journey building impactful software solutions
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <WorkExperience data={data.workExperience} />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Featured Projects</h3>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Selection of recent work showcasing technical capabilities and problem-solving
              </p>
            </div>
            <ProjectList data={data.projectDetail} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Let's Connect</h3>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Always open to discussing new opportunities and collaborations
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <a href="mailto:dhruvsheth91@gmail.com" className="flex flex-col items-center gap-3 p-6 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all">
                  <Mail className="w-8 h-8 text-cyan-400" />
                  <span className="text-white font-medium">Email</span>
                  <span className="text-slate-400 text-sm">dhruvsheth91@gmail.com</span>
                </a>
                <a href="https://linkedin.com/in/dhruvsheth1" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 p-6 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all">
                  <Linkedin className="w-8 h-8 text-cyan-400" />
                  <span className="text-white font-medium">LinkedIn</span>
                  <span className="text-slate-400 text-sm">dhruvsheth1</span>
                </a>
                <a href="https://github.com/D-200021" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 p-6 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all">
                  <Github className="w-8 h-8 text-cyan-400" />
                  <span className="text-white font-medium">GitHub</span>
                  <span className="text-slate-400 text-sm">D-200021</span>
                </a>
              </div>
              <div className="text-center">
                <a
                  href={data?.personalInfo?.[0]?.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download My Resume
                </a>
                <p className="text-slate-400 text-sm mt-4">
                  Get the complete overview of my experience and skills
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
            <p>© {new Date().getFullYear()} Dhruv Sheth. </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
