import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (id) => {
    setIsOpen(false);
    navigate("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const navLinks = [
    { name: "HOME", action: () => navigate("/") },
    { name: "PROJECTS", action: () => handleScroll("projects") },
    { name: "BLOG", action: () => navigate("/blog") },
    { name: "CONTACT", action: () => handleScroll("contact") },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap');

        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          transition: all 0.3s ease;
        }
        .nav-root.scrolled {
          background: rgba(5, 5, 8, 0.95);
          border-bottom: 1px solid rgba(0, 255, 249, 0.2);
          box-shadow: 0 0 30px rgba(0, 255, 249, 0.05);
        }
        .nav-root.top {
          background: transparent;
          border-bottom: 1px solid rgba(0, 255, 249, 0.08);
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 2rem;
          height: 70px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          font-family: 'Orbitron', monospace;
          font-size: 1.1rem; font-weight: 900;
          color: #00fff9;
          text-decoration: none;
          letter-spacing: 0.1em;
          position: relative;
          text-shadow: 0 0 20px rgba(0,255,249,0.6);
        }
        .nav-logo::before {
          content: '';
          position: absolute; left: -8px; top: 50%;
          transform: translateY(-50%);
          width: 3px; height: 70%;
          background: #ff2d78;
          box-shadow: 0 0 8px #ff2d78;
        }
        .nav-links {
          display: flex; align-items: center; gap: 2.5rem;
        }
        .nav-link {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem; letter-spacing: 0.15em;
          color: rgba(224, 224, 255, 0.5);
          background: none; border: none; cursor: pointer;
          padding: 0; text-decoration: none;
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute; bottom: -4px; left: 0; right: 0;
          height: 1px; background: #00fff9;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
          box-shadow: 0 0 6px #00fff9;
        }
        .nav-link:hover { color: #00fff9; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-admin {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem; letter-spacing: 0.15em;
          color: #050508;
          background: #00fff9;
          border: none; cursor: pointer;
          padding: 0.5rem 1.2rem;
          text-decoration: none;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.2s;
        }
        .nav-admin:hover {
          background: #ff2d78;
          box-shadow: 0 0 20px rgba(255, 45, 120, 0.4);
        }
        .hamburger {
          display: none; flex-direction: column;
          gap: 5px; background: none; border: none;
          cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 24px; height: 1px;
          background: #00fff9;
          box-shadow: 0 0 4px #00fff9;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }

        .mobile-menu {
          background: rgba(5, 5, 8, 0.98);
          border-bottom: 1px solid rgba(0,255,249,0.15);
          padding: 1.5rem 2rem;
          display: flex; flex-direction: column; gap: 0;
        }
        .mobile-link {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem; letter-spacing: 0.2em;
          color: rgba(224, 224, 255, 0.4);
          background: none; border: none; cursor: pointer;
          padding: 1rem 0; text-align: left;
          text-decoration: none;
          border-bottom: 1px solid rgba(0,255,249,0.06);
          transition: color 0.2s, padding-left 0.2s;
        }
        .mobile-link:hover {
          color: #00fff9; padding-left: 0.75rem;
        }
        .mobile-link:last-child { border-bottom: none; }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? "scrolled" : "top"}`}>
        <div className="nav-inner">
          <Link to="#" className="nav-logo">
            &lt;CYBER BLOGS /&gt;
          </Link>

          <div className="nav-links">
            {navLinks.map((link) => (
              <button
                key={link.name}
                className="nav-link"
                onClick={link.action}
              >
                {link.name}
              </button>
            ))}
            <Link to="/admin" className="nav-admin">
              ADMIN
            </Link>
          </div>

          <button
            className={`hamburger ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {isOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <button
                key={link.name}
                className="mobile-link"
                onClick={() => {
                  link.action();
                  setIsOpen(false);
                }}
              >
                // {link.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
