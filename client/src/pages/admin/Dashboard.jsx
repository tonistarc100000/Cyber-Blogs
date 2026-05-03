import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllPostsAdmin, deletePost } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin, logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await getAllPostsAdmin();
      setPosts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deletePost(id);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "6rem 1.5rem 3rem",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "3rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "var(--color-primary)",
              marginBottom: "0.5rem",
            }}
          >
            // ADMIN_DASHBOARD
          </p>
          <h1
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            WELCOME,{" "}
            <span style={{ color: "var(--color-primary)" }}>
              {admin?.name?.toUpperCase()}
            </span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <button
            onClick={() => navigate("/admin/editor")}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              padding: "0.7rem 1.5rem",
              background: "var(--color-primary)",
              color: "#050508",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            + NEW POST
          </button>
          <button
            onClick={handleLogout}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              padding: "0.7rem 1.5rem",
              background: "transparent",
              color: "var(--color-secondary)",
              border: "1px solid rgba(255,45,120,0.3)",
              cursor: "pointer",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        {[
          { label: "TOTAL POSTS", value: posts.length },
          {
            label: "PUBLISHED",
            value: posts.filter((p) => p.isPublished).length,
          },
          {
            label: "DRAFTS",
            value: posts.filter((p) => !p.isPublished).length,
          },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: "1.5rem",
              background: "var(--color-card)",
              border: "1px solid rgba(0,255,249,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background:
                  i === 0
                    ? "var(--color-primary)"
                    : i === 1
                      ? "var(--color-secondary)"
                      : "var(--color-accent)",
              }}
            />
            <p
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "2rem",
                fontWeight: 900,
                color: "#fff",
                marginBottom: "0.3rem",
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "rgba(224,224,255,0.4)",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Posts Table */}
      <div
        style={{
          background: "var(--color-card)",
          border: "1px solid rgba(0,255,249,0.1)",
        }}
      >
        <div
          style={{
            padding: "1rem 1.5rem",
            borderBottom: "1px solid rgba(0,255,249,0.08)",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "var(--color-primary)",
          }}
        >
          // POST_LIST
        </div>

        {loading && (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              fontFamily: "'Share Tech Mono', monospace",
              color: "rgba(224,224,255,0.3)",
              fontSize: "0.8rem",
            }}
          >
            LOADING...
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              fontFamily: "'Share Tech Mono', monospace",
              color: "rgba(224,224,255,0.3)",
              fontSize: "0.8rem",
            }}
          >
            NO_POSTS_FOUND — Create your first post!
          </div>
        )}

        {!loading &&
          posts.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                padding: "1.2rem 1.5rem",
                borderBottom: "1px solid rgba(0,255,249,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.8rem",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: "0.3rem",
                  }}
                >
                  {post.title}
                </h3>
                <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      color: post.isPublished
                        ? "var(--color-primary)"
                        : "rgba(224,224,255,0.3)",
                    }}
                  >
                    {post.isPublished ? "● PUBLISHED" : "○ DRAFT"}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.6rem",
                      color: "rgba(224,224,255,0.3)",
                    }}
                  >
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.6rem" }}>
                <button
                  onClick={() => navigate(`/admin/editor/${post._id}`)}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    padding: "0.4rem 0.9rem",
                    background: "transparent",
                    color: "var(--color-primary)",
                    border: "1px solid rgba(0,255,249,0.3)",
                    cursor: "pointer",
                  }}
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    padding: "0.4rem 0.9rem",
                    background: "transparent",
                    color: "var(--color-secondary)",
                    border: "1px solid rgba(255,45,120,0.3)",
                    cursor: "pointer",
                  }}
                >
                  DELETE
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
