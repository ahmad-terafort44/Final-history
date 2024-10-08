import style from "./App.module.scss"
import Navbar from "./components/Navbar"
import DevServer from "./components/DevServer"
import ProductionSever from "./components/Production"
import { useState } from 'react';
function App() {
  const [tab, setTab] = useState("Dev")
  return (
    <>
      <Navbar tab={tab} setTab={setTab}/>
      <div className="modelContainer"></div>
      <div className={style.container}>
        {tab == "Dev" ? <DevServer/> : <ProductionSever/>}
      </div>

    </>
  );
}

export default App;
