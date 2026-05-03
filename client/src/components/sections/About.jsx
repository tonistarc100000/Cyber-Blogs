import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { value: "10+", label: "PROJECTS BUILT" },
    { value: "7", label: "DAYS TO BUILD THIS" },
    { value: "∞", label: "CUPS OF CHAI" },
  ];

  return (
    <section
      id="about"
      style={{ padding: "6rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.3em",
          color: "var(--color-primary)",
          marginBottom: "1rem",
        }}
      >
        // ABOUT_ME
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: "#fff",
            }}
          >
            BUILDING THE{" "}
            <span style={{ color: "var(--color-primary)" }}>FUTURE</span>,<br />
            ONE COMMIT AT A TIME
          </h2>
          <p
            style={{
              color: "rgba(224,224,255,0.6)",
              lineHeight: 1.8,
              marginBottom: "1rem",
              fontSize: "1rem",
            }}
          >
            I'm a MERN Stack developer who loves turning ideas into real,
            working products. I care about clean code, smooth UX, and building
            things that actually work in production.
          </p>
          <p
            style={{
              color: "rgba(224,224,255,0.6)",
              lineHeight: 1.8,
              fontSize: "1rem",
            }}
          >
            Currently leveling up every day — one project at a time.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "1.5rem",
                background: "var(--color-card)",
                border: "1px solid rgba(0,255,249,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  background:
                    i % 2 === 0
                      ? "var(--color-primary)"
                      : "var(--color-secondary)",
                  boxShadow: `0 0 10px ${i % 2 === 0 ? "var(--color-primary)" : "var(--color-secondary)"}`,
                }}
              />
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "2rem",
                  fontWeight: 900,
                  color:
                    i % 2 === 0
                      ? "var(--color-primary)"
                      : "var(--color-secondary)",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: "rgba(224,224,255,0.5)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
