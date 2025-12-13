// import React, { useState, useEffect } from "react";

// const lines = [
//     "> compiling assets...",
//     "> running tests...",
//     "> deploying to prod...",
//     "✔ release complete — v1.12.0",
// ];

// export default function TerminalAnimation() {
//     const [displayedLines, setDisplayedLines] = useState([]);
//     const [currentLine, setCurrentLine] = useState("");
//     const [lineIndex, setLineIndex] = useState(0);
//     const [charIndex, setCharIndex] = useState(0);

//     useEffect(() => {
//         if (lineIndex < lines.length) {
//             if (charIndex < lines[lineIndex].length) {
//                 const timeout = setTimeout(() => {
//                     setCurrentLine((prev) => prev + lines[lineIndex][charIndex]);
//                     setCharIndex(charIndex + 1);
//                 }, 50);
//                 return () => clearTimeout(timeout);
//             } else {
//                 const timeout = setTimeout(() => {
//                     setDisplayedLines((prev) => [...prev, lines[lineIndex]]);
//                     setCurrentLine("");
//                     setCharIndex(0);
//                     setLineIndex(lineIndex + 1);
//                 }, 500);
//                 return () => clearTimeout(timeout);
//             }
//         }
//     }, [charIndex, lineIndex]);

//     return (
//         <div className="terminal">
//             {displayedLines.map((line, i) => (
//                 <div
//                     key={i}
//                     className={line.startsWith("✔") ? "success" : ""}
//                 >
//                     {line}
//                 </div>
//             ))}
//             {lineIndex < lines.length && (
//                 <div className="typing">
//                     {currentLine}
//                     <span className="cursor">|</span>
//                 </div>
//             )}
//         </div>
//     );
// }


import { useState, useEffect } from 'react';


// TerminalAnimation Component
const TerminalAnimation = () => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLine, setCurrentLine] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const lines = [
        "$ npm run build",
        "> Building production bundle...",
        "> Optimizing assets...",
        "> Running tests... ✓ All passed",
        "> Deploying to production...",
        "✓ Deployment successful - v2.4.0",
    ];

    useEffect(() => {
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                const timeout = setTimeout(() => {
                    setCurrentLine((prev) => prev + lines[lineIndex][charIndex]);
                    setCharIndex(charIndex + 1);
                }, 30);
                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => {
                    setDisplayedLines((prev) => [...prev, lines[lineIndex]]);
                    setCurrentLine("");
                    setCharIndex(0);
                    setLineIndex(lineIndex + 1);
                }, 400);
                return () => clearTimeout(timeout);
            }
        }
    }, [charIndex, lineIndex]);

    return (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
            <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-slate-400 text-sm ml-2">terminal</span>
            </div>
            <div className="p-6 font-mono text-sm min-h-[240px]">
                {displayedLines.map((line, i) => (
                    <div
                        key={i}
                        className={`mb-1 ${line.includes("✓") ? "text-emerald-400" : "text-slate-300"
                            }`}
                    >
                        {line}
                    </div>
                ))}
                {lineIndex < lines.length && (
                    <div className="flex items-center text-slate-300">
                        {currentLine}
                        <span className="ml-1 w-2 h-4 bg-cyan-400 animate-pulse"></span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TerminalAnimation