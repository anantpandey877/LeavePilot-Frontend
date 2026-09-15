function Navbar(){
    return (
        <nav className="site-navbar">
            <div className="site-navbar-content">
                <a className="site-brand" href="/">LeavePilot</a>
                <div className="site-nav-links">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;