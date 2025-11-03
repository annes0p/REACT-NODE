function Header({ info }) {
    return (
        <header className="header">
            <h1>{info.name}</h1>
            <p>{info.slogan}</p>
        </header>
    );
}

export default Header;