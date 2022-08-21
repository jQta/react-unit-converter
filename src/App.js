import "./App.scss";
import exchange from "./assets/icons/exchange.svg";
import Convert from "./components/convert/Convert";

function App() {
  
  return (
    <div className="app">
      <header className="header">
        <div className="header-box">
          <img src={exchange} className="header-box__exchange" alt="logo" />
          <h1 className="header-box__title">unit converter</h1>
        </div>
      </header>
      <Convert />
      <footer className="footer">
        <div className="footer__box">
          <span>Terms of service</span>
          <span>Privacy Policy</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
