
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Weather from './components/Weather';
import { Routes, Route } from 'react-router-dom';
import WeatherPages from './pages/WeatherPages';
import InfoMorePages from './pages/InfoMorePages';
import { useState } from 'react';
function App() {
  
 const [dataInfo, setDataInfo] = useState(sessionStorage.getItem('dataInfo') ? JSON.parse(sessionStorage.getItem('dataInfo')).list : '' );
 
  return (
    <>
      <Routes>
        <Route exact path='/' element={<WeatherPages  setDataInfo={setDataInfo} />} ></Route>
        <Route exact path='/Info' element={<InfoMorePages dataInfo={dataInfo}/>} ></Route>
      </Routes>
    </>
  );
}

export default App;
