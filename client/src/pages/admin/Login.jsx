import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(form);
      loginAdmin(res.data.data);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("ACCESS_DENIED — Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.9rem 1rem",
    background: "#0a0a14",
    border: "1px solid rgba(0,255,249,0.15)",
    color: "#e0e0ff",
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.85rem",
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "420px" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "var(--color-primary)",
              marginBottom: "1rem",
            }}
          >
            // ADMIN_ACCESS
          </p>
          <h1
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "1.8rem",
              fontWeight: 900,
              color: "#fff",
            }}
          >
            CMS <span style={{ color: "var(--color-primary)" }}>LOGIN</span>
          </h1>
        </div>

        {/* Form */}
        <div
          style={{
            background: "var(--color-card)",
            border: "1px solid rgba(0,255,249,0.1)",
            padding: "2.5rem",
          }}
        >
          {error && (
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: "var(--color-secondary)",
                padding: "0.8rem",
                border: "1px solid rgba(255,45,120,0.3)",
                background: "rgba(255,45,120,0.05)",
                marginBottom: "1.5rem",
              }}
            >
              {error}
            </div>
          )}

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
                EMAIL
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                PASSWORD
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={inputStyle}
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
              disabled={loading}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                padding: "1rem",
                background: loading
                  ? "rgba(0,255,249,0.3)"
                  : "var(--color-primary)",
                color: "#050508",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 700,
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                marginTop: "0.5rem",
              }}
            >
              {loading ? "AUTHENTICATING..." : "ACCESS_SYSTEM"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
