import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [serije, setSerije] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);
      const jsonResult = await result.json();
      setSerije(jsonResult);
    };
    fetchData();
  }, [searchQuery]);

  const handleSearch = () =>{
    setSerije([]);
  };

  return (
    <div className="App">
      <h1>Popis serija</h1>
      <div>
        <input
          type="text"
          placeholder="Pretraži serije"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Pretraži</button>
      </div>
      <div className="serije-container">
        {serije.map((serie) => (
          <div key={serie.show.id} className="serija">
            <h2>{serie.show.name}</h2>
            <img
              src={serie.show.image ? serie.show.image.medium : ''}
              alt={serie.show.name}
              width="200"
              height="300"
            />
            <p>Žanr: {serie.show.genres.join(', ')}</p>
            <p>Jezik: {serie.show.language}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
