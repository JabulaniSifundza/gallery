import React, {useState, useEffect} from 'react';
import './App.css';
import FetchMet from './apis/FetchMet';
import FetchChi from './apis/FetchChi'; 


function App() {	
	const [metArtInfo, setMetArtInfo] = useState([]);
	const [chiArtInfo, setChiArtInfo] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentMetIndex, setCurrentMetIndex] = useState(0);

	const nextChi = ()=>{
		if(currentIndex < (chiArtInfo.length - 1)){
			setCurrentIndex(prevState => prevState + 1)
		}
	}

	const prevChi = () =>{
		if(currentIndex > 0){
			setCurrentIndex(prevState => prevState - 1)
		}
	}

	const nextMet = ()=>{
		if(currentMetIndex < (metArtInfo.length - 1)){
			setCurrentMetIndex(prevState => prevState + 1)
		}
	}

	const prevMet = ()=>{
		if(currentMetIndex > 0){
			setCurrentMetIndex(prevState => prevState - 1)
		}
	}

	const getMet = async ()=>{
		const ids = [826362, 818921, 775364, 459112, 437309, 435991, 437052, 45427, 423057, 422136];
		try{
			const responses = await Promise.all(ids.map((artPieceId)=>{
				return FetchMet.get(`/objects/${artPieceId}`,{
				})
			}));
			//console.log(responses)
			//const metImages = responses.map((artwork)=>{
			//	return artwork.data.primaryImageSmall
			//})
			const metInfo = responses.map((art)=>{
				return art.data
			})
			//console.log(metImages);
			console.log(metInfo);
			setMetArtInfo(metInfo);
			
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
			//console.log(responses);
			const artworks = responses.map((artwork)=>{
				//return {artwork}
				//console.log()ChiImgUrl.push(artwork.data.data.image_id);
				return [artwork.data.data.imageLnk = `https://www.artic.edu/iiif/2/${artwork.data.data.image_id}/full/843,/0/default.jpg`, artwork.data.data]
				//return `https://www.artic.edu/iiif/2/${artwork.data.data.image_id}/full/843,/0/default.jpg`;	
			});
			const chiArtInfo = responses.map((art)=>{
				return art.data.data
			})
			console.log(artworks);
			//console.log(ChiImgUrl);
			//console.log(chiArtInfo);
			setChiArtInfo(chiArtInfo);
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
    <div>
		{
			chiArtInfo.length > 0 && <div className="carousel-container">
				<div className="carousel-wrapper">
					{
						currentIndex > 0 && <button className="left-btn">
							<svg className="left-arrow"></svg>
						</button>
					}

					<div className="carousel-content-wrapper">
						<div className="carousel-content" style={{transform: `translateX(-${currentIndex*100}%)`}}>
							{
								chiArtInfo.map((artwork)=>{
									return (
										<div className="details-container">

											<img src={artwork.imageLnk} alt="Artwork" key={artwork.id} />
											<h3>Artist</h3>
											<h3 key={artwork.artist_title}>{artwork.artist_title}</h3>

											<p>Work Title</p>
											<p key={artwork.title}>{artwork.title}</p>
											
											<p>Inscriptions</p>
											<p key={artwork.inscriptions}>{artwork.inscriptions}</p>
										</div>
										

									)
								})
								
							}
							<div className="piece-details">
							
							</div>
						</div>
					</div>
					{
						currentIndex > 0 && <button className="right-btn">
							<svg className="right-arrow"></svg>
						</button>
					}
				</div>
			</div>
		}

		{
			metArtInfo.length > 0 && <div className="carousel-container">
				<div className="carousel-wrapper">
				{
					currentMetIndex > 0 && <button className="met-left-btn">
						<svg className="left-arrow"></svg>
					</button>
				}
				<div className="carousel-content-wrapper">
					<div className="carousel-content" style={{transform: `translateX(-${currentMetIndex*100}%)`}}>
					{
						metArtInfo.map((artPiece)=>{
							return (
								<div>
								<img src={artPiece.primaryImageSmall} alt="Met artwork" key={artPiece.objectID} />
									<div className="piece-details">
										<div className="details-container">
											<h3>Artist</h3>
											<h3 key={artPiece.artistDisplayName}>{artPiece.artistDisplayName}</h3>

											<p>Work Title</p>
											<p key={artPiece.title}>{artPiece.title}</p>

											<p>Artist Bio</p>
											<p key={artPiece.artistDisplayBio}>{artPiece.artistDisplayBio}</p>
										</div>
									</div>
								</div>	
							)
						})
					}
					</div>
				</div>
				{
					currentMetIndex > 0 && <button className="met-right-btn">
						<svg className="right-arrow"></svg>
					</button>
				}
				</div>
			</div>
		}
      
    </div>
  );
}
export default App;
