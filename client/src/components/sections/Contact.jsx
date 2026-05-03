import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING...");

    // We'll use a free service called Web3Forms
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "a7065364-6514-4bcf-a02e-9740dd24f39a",
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("MESSAGE_SENT ✓");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("ERROR — TRY AGAIN");
      }
    } catch {
      setStatus("ERROR — TRY AGAIN");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.9rem 1rem",
    background: "var(--color-card)",
    border: "1px solid rgba(0,255,249,0.15)",
    color: "#e0e0ff",
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.85rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      style={{ padding: "6rem 1.5rem", maxWidth: "700px", margin: "0 auto" }}
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
        // CONTACT_PROTOCOL
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 700,
          marginBottom: "0.8rem",
          color: "#fff",
        }}
      >
        GET IN <span style={{ color: "var(--color-primary)" }}>TOUCH</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          color: "rgba(224,224,255,0.5)",
          marginBottom: "3rem",
          lineHeight: 1.7,
        }}
      >
        Have a project in mind or just want to connect? Send a message and I'll
        get back to you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          background: "var(--color-card)",
          border: "1px solid rgba(0,255,249,0.1)",
          padding: "2.5rem",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <div>
            <label
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "var(--color-primary)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              NAME
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              style={inputStyle}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--color-primary)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(0,255,249,0.15)")
              }
            />
          </div>

          <div>
            <label
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "var(--color-primary)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--color-primary)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(0,255,249,0.15)")
              }
            />
          </div>

          <div>
            <label
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "var(--color-primary)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              MESSAGE
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={5}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--color-primary)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(0,255,249,0.15)")
              }
            />
          </div>

          <button
            onClick={handleSubmit}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              padding: "1rem",
              background:
                status === "MESSAGE_SENT ✓"
                  ? "rgba(0,255,249,0.1)"
                  : "var(--color-primary)",
              color:
                status === "MESSAGE_SENT ✓"
                  ? "var(--color-primary)"
                  : "#050508",
              border:
                status === "MESSAGE_SENT ✓"
                  ? "1px solid var(--color-primary)"
                  : "none",
              cursor: "pointer",
              fontWeight: 700,
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              transition: "all 0.3s",
            }}
          >
            {status || "SEND_MESSAGE"}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

