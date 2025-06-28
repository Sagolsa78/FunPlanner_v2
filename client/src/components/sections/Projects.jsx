import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, X } from "lucide-react"; 

const ProjectsData = [
  {
    title: "Portfolio Website",
    description: "A personal Portfolio built with React and Tailwind CSS.",
    longDescription:
      "This portfolio website showcases my projects, blogs, and contact information. It's built using React, Tailwind CSS, and hosted on Vercel.",
    tags: ["React", "Tailwind", "Portfolio"],
    imageComponent: (
      <img
        src="/image.png"
        alt="Portfolio"
        className="w-full h-full object-cover"
      />
    ),
    // link: "",
    githubLink: "https://github.com/sagolsa78/Portfolio",
    technologies: ["React", "Tailwind CSS", "Vercel"],
    features: ["Responsive Design", "Dark Mode", "Smooth Scroll"],
  },
  {
    title: "Event Notification System",
    description: "Real-time event communication using WebSocket.",
    longDescription:
      "A real-time event notification system built using React, Node.js, Express, and WebSocket (Socket.IO). Enables admins to send instant notifications to clients about created events. Built with reliability and real-time performance in mind.",
    tags: ["React", "WebSocket", "Node.js"],
    imageComponent: (
      <img
        src="/Event_image.png"
        alt="Event Notification System"
        className="w-full h-full object-cover"
      />
    ),
    // link: "",
    githubLink: "https://github.com/Sagolsa78/Event_Notification",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Mongoose",
      "Tailwind CSS",
      "Socket.IO",
    ],
    features: [
      "Real-Time Notifications",
      "Admin-to-Client Messaging",
      "100% WebSocket Reliability",
    ],
  },
  {
    title: "PayTm Simple Clone",
    description: "A responsive UI clone of the Paytm platform.",
    longDescription:
      "Built a responsive Paytm-inspired interface using React and Tailwind CSS. The project emphasizes dynamic content rendering with reusable React components and polished styling for a clean and modern design.",
    tags: ["React", "UI Clone", "Tailwind CSS"],
    imageComponent: (
      <img
        src="/Paytm_clone.png"
        alt="Paytm Clone"
        className="w-full h-full object-cover"
      />
    ),
    // link: "",
    githubLink: "https://github.com/Sagolsa78/YouTube_Clone_Frontend",
    technologies: ["React", "Node.js", "Express", "Mongoose", "Tailwind CSS"],
    features: [
      "Responsive Layout",
      "Component-Based Design",
      "Professional UI Styling",
    ],
  },
  {
    title: "YouTube Frontend Clone",
    description: "Frontend UI clone of YouTube using React and Tailwind.",
    longDescription:
      "Recreated YouTube's frontend interface with a focus on reusability, modularity, and responsiveness. Features include Navbar, Sidebar, Video Cards, video previews, and a search/recommendation interface built with React components and styled using Tailwind CSS.",
    tags: ["React", "YouTube Clone", "Tailwind CSS"],
    imageComponent: (
      <img
        src="/image.png"
        alt="YouTube Frontend Clone"
        className="w-full h-full object-cover"
      />
    ),
    // link: "",
    githubLink: "https://github.com/Sagolsa78/YouTube_Clone_Frontend",
    technologies: ["React", "Tailwind CSS"],
    features: [
      "Reusable Components",
      "Video Previews",
      "Recommendations & Search",
      "Responsive Design",
    ],
  },
  {
    title: "AI Text Summarizer App",
    description: "AI-powered text summarizer using Rapid API.",
    longDescription:
      "An AI-based text summarization app built with React, Node.js, and Tailwind CSS. Utilizes Rapid API for AI summarization and integrates GitHub OAuth to fetch and visualize user repository data. Features async processing with Celery and Redis.",
    tags: ["React", "AI", "API"],
    imageComponent: (
      <img
        src="/ai_summarizer.png"
        alt="AI Text Summarizer App"
        className="w-full h-full object-cover"
      />
    ),
    // link: "",
    githubLink: "https://github.com/Sagolsa78/",
    technologies: [
      "React",
      "Node.js",
      "Tailwind CSS",
      "Rapid API",
      "GitHub OAuth",
      
    ],
    features: [
      "AI-Powered Summarization",
      "GitHub OAuth Integration",
      "Async Task Handling",
      "Data Visualization",
    ],
  },
];

function Projects() {
  return (
    <div id="Projects" className="py-20   bg-gradient-to-b  from-gray-900  to-black">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              What I've Built
            </span>
            <span className="ml-2 text-white">🏗️</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ProjectsData.map((project, index) => (
              <EnhancedProjectCard
                key={index}
                title={project.title}
                description={project.description}
                longDescription={project.longDescription}
                tags={project.tags}
                imageComponent={project.imageComponent}
                // link={project.link}
                githubLink={project.githubLink}
                technologies={project.technologies}
                features={project.features}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}



function EnhancedProjectCard({
  title,
  description,
  tags,
  imageComponent,
  // link,
  githubLink,
  longDescription,
  technologies,
  features,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="rounded-lg   bg-gray-900 border border-gray-800 hover:border-purple-500 transition-all duration-300 overflow-hidden h-full flex flex-col"
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
      >
        <div className="h-48 overflow-hidden">{imageComponent}</div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
          <p className="text-gray-400 mb-4 flex-grow">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 text-purple-400 hover:text-purple-300 flex items-center justify-center py-2 px-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-purple-400 hover:text-purple-300 flex items-center justify-center py-2 px-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
            >
              <Github className="h-4 w-4 mr-2" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-xl border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="h-64 overflow-hidden rounded-t-xl">{imageComponent}</div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                  <p className="text-gray-300">{longDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 rounded-full bg-gray-800 text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Key Features</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                {/* <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-purple-400 hover:text-purple-300 flex items-center justify-center py-2 px-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                >
                  <span>View Live Project</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a> */}
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-purple-400 hover:text-purple-300 flex items-center justify-center py-2 px-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                >
                  <Github className="h-4 w-4 mr-2" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default Projects;
