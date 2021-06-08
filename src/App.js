import { useState } from 'react';
import Navbar from './components/Navbar';
import People from './components/People';
import Planets from './components/Planets';

export default function App() {
  const [page, setPage] = useState('planets');
  return (
    <div className="App">
      <h1>Star Wars</h1>
      <Navbar setPage={setPage} />
      <div className="content">{page === 'planets' ? <Planets /> : <People />}</div>
    </div>
  );
}
