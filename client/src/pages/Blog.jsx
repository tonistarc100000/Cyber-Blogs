import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllPosts } from "../services/api";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllPosts();
        setPosts(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "7rem 1.5rem 4rem",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.3em",
          color: "var(--color-primary)",
          marginBottom: "1rem",
        }}
      >
        // BLOG_FEED
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "3rem",
        }}
      >
        DEV <span style={{ color: "var(--color-primary)" }}>BLOG</span>
      </motion.h1>

      {loading && (
        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: "var(--color-primary)",
            letterSpacing: "0.2em",
          }}
        >
          LOADING_POSTS...
        </p>
      )}

      {!loading && posts.length === 0 && (
        <div
          style={{
            padding: "3rem",
            textAlign: "center",
            border: "1px solid rgba(0,255,249,0.08)",
            fontFamily: "'Share Tech Mono', monospace",
            color: "rgba(224,224,255,0.3)",
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
          }}
        >
          // NO_POSTS_YET — Check back soon
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {posts.map((post, i) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(`/blog/${post.slug}`)}
            style={{
              padding: "2rem",
              background: "var(--color-card)",
              border: "1px solid rgba(0,255,249,0.08)",
              cursor: "pointer",
              transition: "border-color 0.2s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(0,255,249,0.3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(0,255,249,0.08)")
            }
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "3px",
                background: "var(--color-primary)",
                boxShadow: "0 0 10px var(--color-primary)",
                opacity: 0,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 1)}
            />

            {/* Tags */}
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                marginBottom: "0.8rem",
                flexWrap: "wrap",
              }}
            >
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    color: "var(--color-secondary)",
                    padding: "0.15rem 0.5rem",
                    border: "1px solid rgba(255,45,120,0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "0.6rem",
              }}
            >
              {post.title}
            </h2>

            <p
              style={{
                color: "rgba(224,224,255,0.5)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                marginBottom: "1rem",
              }}
            >
              {post.excerpt}
            </p>

            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "var(--color-primary)",
              }}
            >
              READ_MORE →
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
