export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Pacific Bots</p>
        <p className="muted">Robotics Research Lab</p>
      </div>
    </footer>
  );
}
