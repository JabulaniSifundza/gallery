import React, {forwardRef} from 'react';
import Webcam from "react-webcam";

const WebcamView = forwardRef(({width}, webcamRef)=>{

	return (
		<Webcam ref={webcamRef}
		width={width}
		style={{
			position: "absolute",
			//display: "none",
			marginLeft: "auto",
			marginRight: "auto",
			left: 0,
			right: 0,
			textAlign: "center",
			zIndex: 0,
			
			height: 480
		}}/>
	)
})

export default WebcamView;