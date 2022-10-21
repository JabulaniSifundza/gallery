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
			paddingTop: "80px",
			top: 16,
			left: 0,
			right: 0,
			textAlign: "center",
			zIndex: -1,
			
			height: 480
		}}/>
	)
})

export default WebcamView;