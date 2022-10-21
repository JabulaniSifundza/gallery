import React, {useState, useEffect, useRef} from 'react';
import FetchChi from '../apis/FetchChi';
import {drawHand} from '../utils/utilities';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import {goDownGesture} from '../gestures/GoDown';
import {goLeftGesture} from '../gestures/GoLeft';
import {goRightGesture} from '../gestures/GoRight';
import Canvas from './Canvas';
import WebcamView from './WebcamView';



export default function ChicagoArt(){
	const [chiArtInfo, setChiArtInfo] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	const leftBtnRef = useRef();
	const rightBtnRef = useRef();

	//const triggerLeft = ()=>{
	//	//leftBtnRef.current.click()
	//	leftBtnRef.click()
	//}

	//const triggerRight = ()=>{
	//	//rightBtnRef.current.click()
	//	rightBtnRef.click()
		
	//}

	const triggerDown = ()=>{
		window.scrollTo({bottom: 0, left: 0, behavior: 'smooth'});
		
	}

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

	const runHandPose = async()=>{
		const net = await handpose.load();
		console.log("Hand pose model loaded");
		setInterval(()=>{
			detect(net);
		}, 10);
	}

	useEffect(()=>{
		runHandPose()
	},[]);

	const detect = async (net) =>{
		if(typeof webcamRef.current !== "undefined" &&
		webcamRef.current !== null &&
		webcamRef.current.video.readyState === 4){
			const video = webcamRef.current.video;
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;

			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;

			const hand = await net.estimateHands(video);


			if(hand.length > 0){
				const GE = new fp.GestureEstimator([
					goRightGesture,
					goLeftGesture,
					goDownGesture
				]);
				const gesture = await GE.estimate(hand[0].landmarks, 4);
				if(gesture.gestures !== undefined && gesture.gestures.length > 0){
					console.log(gesture.gestures);

					const confidence = gesture.gestures.map(
						(prediction) => prediction.score
 					);

					const maxConfidence = confidence.indexOf(
						Math.max.apply(null, confidence)
					);

					console.log(gesture.gestures[maxConfidence].name);
					if(gesture.gestures[maxConfidence].name === 'go_right'){
						setCurrentIndex(prevState => prevState + 1);
						console.log(currentIndex);
						console.log("swipe");	
					}
					if(gesture.gestures[maxConfidence].name === 'go_left'){
						setCurrentIndex(prevState => prevState - 1);
						console.log(currentIndex);
						console.log("swipe");
					}
					if(gesture.gestures[maxConfidence].name === 'scroll_down'){
						//To-do: write scroll down function
						triggerDown();
						console.log("swipe");
					}
					else{
						return;
					}
				}
			}
			//Draw hand mesh
			const ctx = canvasRef.current.getContext("2d");
      		drawHand(hand, ctx);
		}
	}
	useEffect(()=>{
		getChi()
	}, [])

	return (
		<div>
			{
				chiArtInfo.length > 0 && <div className="carousel-container">
					<div className="carousel-wrapper">
						{
							currentIndex > 0 && <button className="left-btn" ref={leftBtnRef} onClick={prevChi}>
								<svg className="left-arrow"></svg>
							</button>
						}

						<div className="carousel-content-wrapper">
							<div className="carousel-content" style={{transform: `translateX(-${currentIndex*100}%)`}}>
								{
									chiArtInfo.map((artwork)=>{
										return (
											<div className="piece-details">
												<img src={artwork.imageLnk} alt="Artwork" key={artwork.id} />
												<div className="details-container">
													
													<h3>Artist</h3>
													<h3 key={artwork.artist_title}>{artwork.artist_title}</h3>

													<p>Work Title</p>
													<p key={artwork.title}>{artwork.title}</p>
													
													<p>Inscriptions</p>
													<p key={artwork.inscriptions}>{artwork.inscriptions}</p>
												</div>
											</div>
										)
									})	
								}
								<div className="piece-details">
								
								</div>
							</div>
						</div>
						{
							currentIndex > 0 && <button className="right-btn" onClick={nextChi} ref={rightBtnRef}>
								<svg className="right-arrow"></svg>
							</button>
						}
					</div>
				</div>
			}
			<Canvas width="640" ref={canvasRef}/>
			<WebcamView width="640" ref={webcamRef}/>
		</div>
		
		
	)

} 
