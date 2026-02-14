import chefClaudeLogo from "/src/assets/chefbw.png"

export default function Header() {
  return (
    <header>
      <nav className="navbar">
        <img src={chefClaudeLogo} alt="Chef Claude Img"/>
        <h1>Chef Claude</h1>
      </nav>
    </header>
  );
}
