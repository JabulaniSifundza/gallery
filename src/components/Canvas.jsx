import React, {forwardRef} from 'react';

export const CanvasDrawing = forwardRef(({width}, canvasRef)=>{

	return (
		<canvas ref={canvasRef}
		width={width}
		style={{
			display: "none",
			position: "absolute",
			marginLeft: "auto",
			marginRight: "auto",
			left: 0,
			right: 0,
			textAlign: "center",
			zindex: 0,
			height: 480,
		}}/>
	)
})

