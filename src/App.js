import "./App.css";
import { useEffect, useState } from 'react';
import Axios from 'axios'; 
import Coin from './components/Coin.js'

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    Axios.get('https://api.coinstats.app/public/v1/coins?skip=0').then(
        (response) => {
          console.log(response);
          setListOfCoins(response.data.coins);
        }
      )
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.includes(searchWord);
  })

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input type="text" placeholder="Search your Coin.." onChange={(event) => {
          setSearchWord(event.target.value);
        }}/>
      </div>

      <div className="cryptoDisplay">
      {filteredCoins.map((coin) => {
          return <h1>
            <Coin 
            name={coin.name}
            icon={coin.icon}
            price={coin.price} 
            symbol={coin.symbol}/> </h1>;
        })}
      </div>
    </div>
  );
}

export default App;