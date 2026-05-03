import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllProjects } from "../../services/api";
import ProjectCard from "../ui/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getAllProjects();
        setProjects(res.data.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      style={{ padding: "6rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}
    >
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.3em",
          color: "var(--color-primary)",
          marginBottom: "1rem",
        }}
      >
        // PROJECT_ARCHIVE
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 700,
          marginBottom: "3rem",
          color: "#fff",
        }}
      >
        WHAT I'VE <span style={{ color: "var(--color-primary)" }}>BUILT</span>
      </motion.h2>

      {/* Loading state */}
      {loading && (
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: "var(--color-primary)",
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
            textAlign: "center",
            padding: "3rem",
          }}
        >
          LOADING_PROJECTS...
        </div>
      )}

      {/* Empty state */}
      {!loading && projects.length === 0 && (
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: "rgba(224,224,255,0.3)",
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
            textAlign: "center",
            padding: "3rem",
            border: "1px solid rgba(0,255,249,0.08)",
          }}
        >
          // NO_PROJECTS_FOUND — Add some from the admin panel
        </div>
      )}

      {/* Project Grid */}
      {!loading && projects.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
