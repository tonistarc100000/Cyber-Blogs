import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost, getAllPostsAdmin } from "../../services/api";

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: "",
    isPublished: false,
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isEditing) return;
    const fetchPost = async () => {
      try {
        const res = await getAllPostsAdmin();
        const post = res.data.data.find((p) => p._id === id);
        if (post) {
          setForm({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || "",
            content: post.content,
            tags: post.tags?.join(", ") || "",
            isPublished: post.isPublished,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id, isEditing]);

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setForm({ ...form, title, slug });
  };

  const handleSubmit = async (publish) => {
    setStatus("SAVING...");
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        isPublished: publish,
      };
      if (isEditing) {
        await updatePost(id, payload);
      } else {
        await createPost(payload);
      }
      setStatus("SAVED ✓");
      setTimeout(() => navigate("/admin/dashboard"), 800);
    } catch (err) {
      setStatus("ERROR — " + (err.response?.data?.message || "Try again"));
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

  const labelStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    color: "var(--color-primary)",
    display: "block",
    marginBottom: "0.5rem",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "6rem 1.5rem 3rem",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: "var(--color-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {isEditing ? "// EDIT_POST" : "// NEW_POST"}
        </p>
        <h1
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {isEditing ? "EDIT POST" : "CREATE POST"}
        </h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Title */}
        <div>
          <label style={labelStyle}>TITLE</label>
          <input
            type="text"
            value={form.title}
            onChange={handleTitleChange}
            placeholder="Post title..."
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-primary)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(0,255,249,0.15)")
            }
          />
        </div>

        {/* Slug */}
        <div>
          <label style={labelStyle}>SLUG (auto-generated)</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            style={{ ...inputStyle, color: "var(--color-primary)" }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-primary)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(0,255,249,0.15)")
            }
          />
        </div>

        {/* Excerpt */}
        <div>
          <label style={labelStyle}>EXCERPT (short description)</label>
          <input
            type="text"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            placeholder="Brief description shown in blog list..."
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-primary)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(0,255,249,0.15)")
            }
          />
        </div>

        {/* Tags */}
        <div>
          <label style={labelStyle}>TAGS (comma separated)</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="react, nodejs, webdev"
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-primary)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(0,255,249,0.15)")
            }
          />
        </div>

        {/* Content */}
        <div>
          <label style={labelStyle}>CONTENT (Markdown supported)</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Write your post in Markdown...&#10;&#10;## Heading&#10;**bold**, *italic*&#10;&#10;```javascript&#10;const hello = 'world';&#10;```"
            rows={18}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-primary)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(0,255,249,0.15)")
            }
          />
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => handleSubmit(true)}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              padding: "0.9rem 2rem",
              background: "var(--color-primary)",
              color: "#050508",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            }}
          >
            PUBLISH
          </button>
          <button
            onClick={() => handleSubmit(false)}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              padding: "0.9rem 2rem",
              background: "transparent",
              color: "var(--color-primary)",
              border: "1px solid rgba(0,255,249,0.3)",
              cursor: "pointer",
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            }}
          >
            SAVE DRAFT
          </button>
          <button
            onClick={() => navigate("/admin/dashboard")}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              padding: "0.9rem 2rem",
              background: "transparent",
              color: "rgba(224,224,255,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
            }}
          >
            CANCEL
          </button>

          {status && (
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: status.includes("ERROR")
                  ? "var(--color-secondary)"
                  : "var(--color-primary)",
              }}
            >
              {status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
