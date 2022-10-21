import React, {forwardRef} from 'react';

const Canvas = forwardRef(({width}, canvasRef)=>{

	return (
		<canvas ref={canvasRef}
		width={width}
		style={{
			//display: "none",
			position: "absolute",
			marginLeft: "auto",
			marginRight: "auto",
			paddingTop: "80px",
			top: 16,
			left: 0,
			right: 0,
			textAlign: "center",
			zindex: -1,
			height: 480,
		}}/>
	)
});

export default Canvas;

