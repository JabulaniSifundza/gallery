import React, {useState, useEffect, useRef} from 'react';
import FetchMet from '../apis/FetchMet';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import {drawHand} from '../utils/utilities';
import * as fp from "fingerpose";
import {goLeftGesture} from '../gestures/GoLeft';
import {goRightGesture} from '../gestures/GoRight';
import {goUpGetsure} from '../gestures/GoUp';
import Canvas from './Canvas';
import WebcamView from './WebcamView';




export default function Met(){
	const [metArtInfo, setMetArtInfo] = useState([]);
	const [currentMetIndex, setCurrentMetIndex] = useState(0);

	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	const leftBtnRef = useRef();
	const rightBtnRef = useRef();

	//const triggerLeft = ()=>{
	//	leftBtnRef.current.click()
	//	//leftBtnRef.click()
	//}

	//const triggerRight = ()=>{
	//	rightBtnRef.current.click()
	//	//rightBtnRef.click()
		
	//}
	const triggerUp = ()=>{
		window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
						if(currentMetIndex > 0){
							setCurrentMetIndex(prevState => prevState - 1);
							console.log("swipe")
						}
					}
					if(gesture.gestures[maxConfidence].name === 'go_left'){
						if(currentMetIndex < (metArtInfo.length - 1)){
							setCurrentMetIndex(prevState => prevState + 1);
							console.log("swipe")
						}
					}
					if(gesture.gestures[maxConfidence].name === 'scroll_up'){
						//To-do: write scroll up function
						triggerUp();
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
		getMet()
	}, [])

	return (
		<div>
		{
			metArtInfo.length > 0 && <div className="carousel-container">
				<div className="carousel-wrapper">
				{
					currentMetIndex > 0 && <button className="met-left-btn" onClick={prevMet} ref={leftBtnRef}>
						<svg className="left-arrow"></svg>
					</button>
				}
				<div className="carousel-content-wrapper">
					<div className="carousel-content" style={{transform: `translateX(-${currentMetIndex*100}%)`}}>
					{
						metArtInfo.map((artPiece)=>{
							return (
								<div className="piece-details">
									<img src={artPiece.primaryImageSmall} alt="Met artwork" key={artPiece.objectID} />
									
										<div className="details-container">
											<h3>Artist</h3>
											<h3 key={artPiece.artistDisplayName}>{artPiece.artistDisplayName}</h3>

											<p>Work Title</p>
											<p key={artPiece.title}>{artPiece.title}</p>

											<p>Artist Bio</p>
											<p key={artPiece.artistDisplayBio}>{artPiece.artistDisplayBio}</p>
										</div>
								</div>	
							)
						})
					}
					</div>
				</div>
				{
					currentMetIndex > 0 && <button className="met-right-btn" onClick={nextMet} ref={rightBtnRef}>
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