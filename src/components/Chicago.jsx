import React, {useState, useEffect, useRef} from 'react';
import FetchChi from '../apis/FetchChi';
import {drawHand} from '../utils/utilities';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import {goDownGesture} from '../gestures/GoDown';
import {goLeftGesture} from '../gestures/GoLeft';
import {goRightGesture} from '../gestures/GoRight';
import {goUpGetsure} from '../gestures/GoUp';
import Canvas from './Canvas';
import WebcamView from './WebcamView';
import go_down from '../img/go_down.png';
import go_up from '../img/go_up.png';
import go_left from '../img/go_left.png';
import go_right from '../img/go_right.png';
import myLogo from '../img/LogoRed.png';
import {InfinitySpin} from "react-loader-spinner";



export default function ChicagoArt(){
	const [chiArtInfo, setChiArtInfo] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [model, setModel] = useState(null);

	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	const leftBtnRef = useRef();
	const rightBtnRef = useRef();

	//const triggerLeft = ()=>{
	//	//leftBtnRef.current.click()
	//	leftBtnRef.click()
	//}

	//const triggerRight = ()=>{
	//rightBtnRef.current.click()
	//	rightBtnRef.click()
		
	//}

	//const triggerDown = ()=>{
	//	window.scrollTo({bottom: 0, left: 0, behavior: 'smooth'});
		
	//}

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

	const runHandPose = async ()=>{
		const net = await handpose.load();
		console.log("Hand pose model loaded");
		setModel(net);
		setInterval(()=>{
			detect(net);
		}, 500);
	}

	useEffect(()=>{
		runHandPose()
	},[]);

	//useEffect(()=>{
	//	setCurrentIndex(chiArtInfo.length)
	//},[chiArtInfo])

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
					goDownGesture,
					goUpGetsure
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
						rightBtnRef.current.click();
						console.log(currentIndex);
					}
					if(gesture.gestures[maxConfidence].name === 'go_left'){
						leftBtnRef.current.click()
						console.log(currentIndex);
					}
					if(gesture.gestures[maxConfidence].name === 'scroll_down'){
						window.scrollBy(0, 140, {
							behavior: 'smooth'
						});
					}
					if(gesture.gestures[maxConfidence].name === 'scroll_up'){
						window.scrollBy(0, -140, {
							behavior: 'smooth'
						});
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
		<div className="main">

			{
				model == null?
				<div className="loader">
					<InfinitySpin 
					color="#1B9AAA"
					width={400}
					/>
				</div>

				:

				<>
				<div className="header">
				<div className="myLogo">
					<img src={myLogo} alt="" className="logoImg"/>
				</div>

				<div className="imgContainer">
					<div className="directions">
						<img src={go_down} alt="go_down" className="img" />
						<p>Scroll Down</p>
					</div>

					<div className="directions">
						<img src={go_up} alt="go_up" className="img"/>
						<p>Scroll Up</p>
					</div>

					<div className="directions">
						<img src={go_left} alt="go_left" className="img"/>
						<p>Next Piece</p>
					</div>
					
					<div className="directions">
						<img src={go_right} alt="go_right" className="img"/>
						<p>Previous Piece</p>
					</div>
				</div>
			</div>
			{
				chiArtInfo.length > 0 && <div className="carousel-container">
					<div className="carousel-wrapper">
						{
							currentIndex >= 0 && <button className="left-btn" ref={leftBtnRef} onClick={prevChi}>
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
													<h3>Artist:</h3>
													<h3 key={artwork.artist_title} className="pieceCaption">{artwork.artist_title}</h3>

													<p className="pieceCaption">Work Title:</p>
													<p key={artwork.title} className="pieceCaption">{artwork.title}</p>
													
													<p className="pieceCaption">Inscriptions:</p>
													<p key={artwork.inscriptions} className="pieceCaption">{artwork.inscriptions}</p>
												</div>
											</div>
										)
									})	
								}	
							</div>
						</div>
						{
							currentIndex >= 0 && <button className="right-btn" onClick={nextChi} ref={rightBtnRef}>
								<svg className="right-arrow"></svg>
							</button>
						}
					</div>
				</div>
			}
			<Canvas width="640" ref={canvasRef}/>
			<WebcamView width="640" ref={webcamRef}/>
			</>

			}
			
		</div>
		
		
	)

} 
