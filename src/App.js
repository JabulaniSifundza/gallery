import React, {useState, useEffect} from 'react';
import './App.css';
import FetchMet from './apis/FetchMet';
import FetchChi from './apis/FetchChi'; 


function App() {
	const [metArt, setMetArt] = useState([]);
	const [chiArt, setChiArt] = useState([]);


	const getMet = async ()=>{
		const ids = [826362, 818921, 775364, 459112, 437309, 435991, 437052, 45427, 423057, 422136];
		try{
			const responses = await Promise.all(ids.map((artPieceId)=>{
				return FetchMet.get(`/objects/${artPieceId}`,{
				})
			}));
			//console.log(responses)
			const metImages = responses.map((artwork)=>{
				return artwork.data.primaryImageSmall
			})
			console.log(metImages);
			setMetArt(metImages);
		}
		catch(error){
			console.log(error)
		}
		
	}

	const getChi = async ()=>{
		const ids = [16564, 23096, 20347, 28067, 109275, 109260, 23968, 229379, 24096, 47149, 229406, 229361, 230609, 64818, 149784, 147634, 181213, 149068, 149069, 235740];
		try{
			const responses = await Promise.all(ids.map((artPieceId)=>{
				return FetchChi.get(`/artworks/${artPieceId}`,{
					params:{
						fields: `id,title,image_id,artist_title,classification_titles,inscriptions,color,theme_titles`
					}
				})
			}));
			console.log(responses);
			const artworks = responses.map((artwork)=>{
				//return {artwork}
				//console.log()ChiImgUrl.push(artwork.data.data.image_id);
				return `https://www.artic.edu/iiif/2/${artwork.data.data.image_id}/full/843,/0/default.jpg`;	
			})
			//console.log(artworks);
			//console.log(ChiImgUrl);
			setChiArt(artworks);
		}
		catch(error){
			console.log(error)

		}
	}

		useEffect(()=>{
			getChi()
		}, [])
	
		useEffect(()=>{
			getMet()
		}, [])

  return (
    <div className="App">
      
    </div>
  );
}
export default App;
