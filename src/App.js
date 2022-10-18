import React from 'react';
import './App.css';
import FetchMet from './apis/FetchMet';
import FetchChi from './apis/FetchChi';

function App() {	
	const getMet = async ()=>{
		const pieces = await FetchMet.get()
		console.log(pieces);
	}

	const getChi = async ()=>{
		const pieces = await FetchChi.get()
		console.log(pieces);
	}

  return (
    <div className="App">
      <button onClick={getMet}>Get Met</button>
	  <button onClick={getChi}>Get Chi</button>
    </div>
  );
}
export default App;
