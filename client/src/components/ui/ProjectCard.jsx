import { useState } from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ perspective: "1000px", height: "280px", cursor: "pointer" }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: "var(--color-card)",
            border: "1px solid rgba(0,255,249,0.1)",
            padding: "1.8rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "border-color 0.3s",
          }}
        >
          {/* Top */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "var(--color-primary)",
                  padding: "0.2rem 0.6rem",
                  border: "1px solid rgba(0,255,249,0.3)",
                  background: "rgba(0,255,249,0.05)",
                }}
              >
                {project.featured ? "FEATURED" : "PROJECT"}
              </span>
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.55rem",
                  color: "rgba(224,224,255,0.3)",
                  letterSpacing: "0.1em",
                }}
              >
                [ CLICK TO FLIP ]
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "0.8rem",
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                color: "rgba(224,224,255,0.5)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.techStack?.slice(0, 4).map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "var(--color-secondary)",
                  padding: "0.2rem 0.5rem",
                  border: "1px solid rgba(255,45,120,0.2)",
                  background: "rgba(255,45,120,0.05)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "var(--color-card)",
            border: "1px solid rgba(255,45,120,0.3)",
            padding: "1.8rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: "var(--color-secondary)",
                marginBottom: "1rem",
              }}
            >
              // LINKS
            </p>
            <h3
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                color: "rgba(224,224,255,0.6)",
                fontSize: "0.85rem",
                lineHeight: 1.7,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "0.8rem" }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  padding: "0.6rem 1.2rem",
                  background: "var(--color-primary)",
                  color: "#050508",
                  textDecoration: "none",
                  clipPath:
                    "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  fontWeight: 700,
                }}
              >
                LIVE
              </a>
            )}
            {project.githubUrl && (
            <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  padding: "0.6rem 1.2rem",
                  background: "transparent",
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  border: "1px solid rgba(0,255,249,0.4)",
                  clipPath:
                    "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
              >
                GITHUB
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
