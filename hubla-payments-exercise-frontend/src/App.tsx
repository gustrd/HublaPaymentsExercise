import { Routes , Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Transaction';

function App(): JSX.Element {
  return (
    <div className="App">
    <Navbar />
      <div className={'container'}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='create' element={<Create />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;