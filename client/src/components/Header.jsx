const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#">
          <h2 className="text-warning">Daberna</h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mob-navbar"
          aria-label="Toggle"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mob-navbar">
          <ul className="navbar-nav mb-2 mb-lg-0 mx-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                About
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Our Services
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/#">
                    Web designing
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Web Development
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    SEO Analysis
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/#">
                    Explore More
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Contact Us
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Username"
            />
            <input
              className="form-control me-2"
              type="password"
              placeholder="Password"
            />
            <button className="btn btn-warning" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
