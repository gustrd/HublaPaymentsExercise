import { Routes , Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/TransactionCreate';
import TransactionUploadForm from './components/TransactionUpload';
import {ToastContainer} from "react-toastify";
import TransactionListDataTable from './components/TransactionListDataTable';

function App(): JSX.Element {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer position="top-left"/>
        <div className={'container'}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='create' element={<Create />} />
            <Route path='upload' element={<TransactionUploadForm />} />
            <Route path='list' element={<TransactionListDataTable />} />
          </Routes>
        </div>
      </div>
  );
}
export default App;