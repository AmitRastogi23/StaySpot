import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-info">
        <div className="footer-socials">
          <a href="#" aria-label="Facebook">
            <i className="fa-brands fa-square-facebook"></i>
          </a>

          <a href="#" aria-label="Instagram">
            <i className="fa-brands fa-square-instagram"></i>
          </a>

          <a href="#" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>

        <div className="footer-copyright">
          &copy; WanderLust Private Limited
        </div>

        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
