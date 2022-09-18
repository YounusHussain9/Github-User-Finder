import logo from './logo.svg';
import './App.css';
import {Routes ,Route} from 'react-router-dom'
import Home from './Components/Home';
import Detail from './Components/Detail';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Detail/:id' element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
