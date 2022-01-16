import Link from "next/link";

export const Footer = () => (
  <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="col-md-4 mb-0 text-muted">© 2022 NFTix, Inc</p>
      <Link href="/">
        <a className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none fs-1">
          🎟
        </a>
      </Link>

      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link px-2 text-muted">Home</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="https://twitter.com/jpmonette">
            <a className="nav-link px-2 text-muted">
              <i className="bi bi-twitter"></i> Twitter
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="https://t.me/jpmonette">
            <a className="nav-link px-2 text-muted">
              <i className="bi bi-telegram"></i> Telegram
            </a>
          </Link>
        </li>
      </ul>
    </footer>
  </div>
);
