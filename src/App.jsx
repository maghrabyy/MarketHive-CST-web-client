import './App.css';
import logo from '../src/assets/MHLogo.png';

function App() {
  return (
    <>
      <div className="navbar py-2 px-16">
        <img src={logo} className="w-32" alt="Market Hive logo" />
      </div>
      <h1 className="text-4xl font-bold">MarketHive project</h1>
    </>
  );
}

export default App;
