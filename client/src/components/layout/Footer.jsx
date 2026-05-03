const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer-root {
          position: relative;
          margin-top: 6rem;
          padding: 2.5rem 0 2rem;
          border-top: 1px solid rgba(0, 255, 249, 0.15);
        }
        .footer-root::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00fff9, #ff2d78, transparent);
          box-shadow: 0 0 12px rgba(0,255,249,0.4);
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 2rem;
          display: flex; align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; gap: 1.5rem;
        }
        .footer-logo {
          font-family: 'Orbitron', monospace;
          font-size: 0.85rem; font-weight: 900;
          color: #00fff9;
          text-shadow: 0 0 20px rgba(0,255,249,0.6);
          letter-spacing: 0.1em;
        }
        .footer-copy {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: rgba(224,224,255,0.25);
          letter-spacing: 0.1em;
          margin-top: 0.35rem;
        }
        .footer-copy span {
          color: rgba(255,45,120,0.6);
        }
        .footer-links {
          display: flex; align-items: center; gap: 0;
        }
        .footer-link {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem; letter-spacing: 0.15em;
          color: rgba(224, 224, 255, 0.5);
          text-decoration: none;
          padding: 0.4rem 1.2rem;
          border-left: 1px solid rgba(0,255,249,0.1);
          position: relative;
          transition: color 0.2s;
        }
        .footer-link:first-child { border-left: none; }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 1.2rem; right: 1.2rem;
          height: 1px;
          background: #00fff9;
          box-shadow: 0 0 6px #00fff9;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .footer-link:hover { color: #00fff9; }
        .footer-link:hover::after { transform: scaleX(1); }
        .footer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,249,0.08), transparent);
          margin: 1.5rem 0 1rem;
        }
        .footer-bottom {
          max-width: 1200px; margin: 0 auto;
          padding: 0 2rem;
          display: flex; justify-content: center;
        }
        .footer-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.62rem;
          color: rgba(224,224,255,0.1);
          letter-spacing: 0.2em;
        }
        .footer-tag span { color: rgba(119,0,255,0.4); }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">&lt;DEVFOLIO /&gt;</div>
            <div className="footer-copy">
              © {year} — BUILT WITH <span>MERN STACK</span>
            </div>
          </div>

          <div className="footer-links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              GH_
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              LI_
            </a>
            <a href="mailto:you@email.com" className="footer-link">
              MAIL_
            </a>
          </div>
        </div>

        <div className="footer-divider" />
        <div className="footer-bottom">
          <p className="footer-tag">
            <span>// </span>SYSTEM.ONLINE — ALL NODES ACTIVE<span> //</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
