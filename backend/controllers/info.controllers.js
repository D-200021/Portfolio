import Project from "../models/project.models.js"
import Experience from "../models/workexperience.models.js";
import Visitor from "../models/vistors.models.js";
import PersonalInfo from "../models/personal.models.js";

// export const aboutMe = (req, res) => {
//     try {
//         const html = `
//     <section id="about" className="about"> <h3>About Me</h3> <p className='muted'> I’m a <strong>Frontend-Focused Software Engineer</strong> with 3+ years of experience designing and building high-performance, scalable, and intuitive UIs for SaaS applications. My expertise lies in <strong>ReactJS, TypeScript, Zustand, Redux, Vega Charts, Shadcn, DevExtreme</strong>, and crafting seamless integrations with <strong>REST and GraphQL APIs</strong>. </p> <p className='muted'> I thrive at the intersection of <strong>clean design and complex data interaction</strong> — creating component-driven interfaces that feel effortless while handling dynamic, data-heavy workflows behind the scenes. </p > <p className='muted'> Beyond traditional frontend engineering, I’ve also led the development of <strong> AI-powered interfaces</strong> — from LLM-assisted chatbots to smart data assistants. I specialize in bridging frontend experiences with <strong>LLM workflows, system prompts,</strong> and intelligent integrations that enhance usability and business insights. </p> <h4>What I Do Best</h4> <ul className='muted'> <li>⚡ <strong>Frontend Performance Optimization</strong> – fast, efficient, production-ready UIs</li> <li>🎨 <strong>Scalable UI Systems</strong> – component-driven architectures with design consistency</li> <li>🧠 <strong>AI & LLM Integrations</strong> – OpenAI-powered assistants, workflows, and smart UI layers</li> <li>📊 <strong>Interactive Dashboards</strong> – rich data visualizations with Vega & DevExtreme</li> <li>🔁 <strong>End-to-End Delivery</strong> – from frontend to Node.js + MongoDB backend integration</li> <li>🤝 <strong>Collaboration</strong> – working closely with design, backend, QA, and product teams</li> </ul> <h4 >My Goal</h4> <p className='muted'> I’m passionate about building <strong>intelligent, user-centric applications</strong> that combine beautiful design with powerful AI-driven capabilities. If you’re looking for someone who blends <strong> frontend engineering, product thinking, and AI integration</strong>, I’d love to collaborate. </p> </section>
//   `;

//         res.status(200).json({ status: true, content: html });
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getWorkExperience = async (req, res) => {
//     try {
//         const workexperienceData = await Experience.find({});
//         // console.log(workexperienceData);
//         res.status(200).json({ status: true, content: workexperienceData })
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// export const insertWorkExperience = async (req, res) => {
//     try {
//         // 1️⃣ Read the file
//         const filePath = new URL("../data/experience.json", import.meta.url);
//         const fsReadData = fs.readFileSync(filePath, "utf-8");
//         // 2️⃣ Parse JSON
//         const experiences = JSON.parse(fsReadData);

//         // 3️⃣ Insert into MongoDB
//         const inserted = await Experience.insertMany(experiences);

//         // 4️⃣ Send response to client
//         res.status(201).json({
//             message: `Inserted ${inserted.length} experiences successfully`,
//             data: inserted
//         });


//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getProjectDetails = async (req, res) => {
//     try {
//         const projectData = await Project.find({});
//         // console.log(workexperienceData);
//         res.status(200).json({ status: true, content: projectData })
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// export const insertProject = async (req, res) => {
//     try {
//         console.log("I am render Project")
//         const filePath = new URL("../data/projects.json", import.meta.url);
//         const fsReadData = fs.readFileSync(filePath, "utf-8");

//         const Projects = JSON.parse(fsReadData);

//         const inserted = await Project.insertMany(Projects);

//         res.status(201).json({
//             message: `Inserted ${inserted.length} Project successfully`,
//             data: inserted
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// }

export const visitor = async (req, res) => {
    try {
        // console.log("Vistors Starting")
        const ip =
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress;

        // Check if visitor already exists
        const existingVisitor = await Visitor.findOne({ ip });

        if (!existingVisitor) {
            await Visitor.create({ ip });
        }

        res.status(200).json({ success: true });

        // console.log("Vistors end")
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

// export const totalVisitorCount = async (req, res) => {
//     try {
//         const totalVisitors = await Visitor.countDocuments();
//         res.status(200).json({ status: true, content: totalVisitors });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

// export const insertPersonalInfo = async (req, res) => {
//     try {
//         const newData = new PersonalInfo({
//             resumeUrl: "https://drive.google.com/file/d/1kw1ELoVkPDXH91vDhiJCV30TSBIzQgqH/view?usp=drive_link",
//             profilePic: "https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         })
//         await newData.save();

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: err.message })
//     }
// }

export const getAllInfo = async (req, res) => {
    try {
        // console.log("getAllInfo Starting")
        const personalInfo = await PersonalInfo.find({});
        const workExperience = await Experience.find({});
        const projectDetail = await Project.find({});
        const totalVisitors = await Visitor.countDocuments();

        const data = {
            personalInfo,
            workExperience,
            projectDetail,
            totalVisitors
        }

        res.status(200).json({ status: true, content: data });
        // console.log("getAllInfo Ending")
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: err.message })
    }
}
