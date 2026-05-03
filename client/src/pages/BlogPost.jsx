import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "../services/api";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPostBySlug(slug);
        setPost(res.data.data);
      } catch (err) {
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug, navigate]);

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: "var(--color-primary)",
            letterSpacing: "0.2em",
          }}
        >
          LOADING...
        </p>
      </div>
    );

  if (!post) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "7rem 1.5rem 4rem",
        maxWidth: "750px",
        margin: "0 auto",
      }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate("/blog")}
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          color: "rgba(224,224,255,0.4)",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "2rem",
          padding: 0,
        }}
      >
        ← BACK_TO_BLOG
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            marginBottom: "1.2rem",
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

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.3,
            marginBottom: "1rem",
          }}
        >
          {post.title}
        </h1>

        {/* Date */}
        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "rgba(224,224,255,0.3)",
            marginBottom: "3rem",
            borderBottom: "1px solid rgba(0,255,249,0.08)",
            paddingBottom: "1.5rem",
          }}
        >
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Markdown Content */}
        <div
          style={{
            color: "rgba(224,224,255,0.75)",
            lineHeight: 1.9,
            fontSize: "1rem",
          }}
        >
          <style>{`
            .blog-content h1, .blog-content h2, .blog-content h3 {
              font-family: 'Orbitron', monospace;
              color: #fff; margin: 2rem 0 1rem;
            }
            .blog-content h2 { font-size: 1.3rem; color: var(--color-primary); }
            .blog-content h3 { font-size: 1.1rem; }
            .blog-content p { margin-bottom: 1.2rem; }
            .blog-content code {
              font-family: 'Share Tech Mono', monospace;
              background: rgba(0,255,249,0.08);
              color: var(--color-primary);
              padding: 0.2rem 0.5rem;
              font-size: 0.85rem;
            }
            .blog-content pre {
              background: var(--color-card);
              border: 1px solid rgba(0,255,249,0.15);
              padding: 1.5rem; overflow-x: auto;
              margin: 1.5rem 0;
            }
            .blog-content pre code { background: none; padding: 0; }
            .blog-content strong { color: #fff; }
            .blog-content a { color: var(--color-primary); }
            .blog-content ul, .blog-content ol { padding-left: 1.5rem; margin-bottom: 1.2rem; }
            .blog-content li { margin-bottom: 0.4rem; }
            .blog-content blockquote {
              border-left: 3px solid var(--color-primary);
              padding-left: 1rem; margin: 1.5rem 0;
              color: rgba(224,224,255,0.5);
              font-style: italic;
            }
          `}</style>
          <div className="blog-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPost;
