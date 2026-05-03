import { motion } from "framer-motion";

const skills = [
  { name: "MongoDB", level: 75, color: "var(--color-primary)" },
  { name: "Express.js", level: 80, color: "var(--color-secondary)" },
  { name: "React", level: 85, color: "var(--color-primary)" },
  { name: "Node.js", level: 78, color: "var(--color-secondary)" },
  { name: "Tailwind CSS", level: 90, color: "var(--color-accent)" },
  { name: "JavaScript", level: 82, color: "var(--color-primary)" },
  { name: "Three.js", level: 50, color: "var(--color-secondary)" },
  { name: "Git & GitHub", level: 80, color: "var(--color-accent)" },
];

const Skills = () => {
  return (
    <section
      id="skills"
      style={{ padding: "6rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}
    >
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
        // SKILL_MATRIX
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
        TECH <span style={{ color: "var(--color-primary)" }}>STACK</span>
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{
              padding: "1.2rem 1.5rem",
              background: "var(--color-card)",
              border: "1px solid rgba(0,255,249,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.7rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  color: "rgba(224,224,255,0.8)",
                }}
              >
                {skill.name}
              </span>
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.7rem",
                  color: skill.color,
                }}
              >
                {skill.level}%
              </span>
            </div>
            {/* Track */}
            <div
              style={{
                height: "3px",
                background: "rgba(255,255,255,0.05)",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: skill.color,
                  boxShadow: `0 0 8px ${skill.color}`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
