import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const goDownGesture = new GestureDescription('scroll_down');

goDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
goDownGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 0.70);

for(let finger of [Finger.Middle, Finger.Index, Finger.Pinky, Finger.Ring]){
	goDownGesture.addCurl(finger, FingerCurl.FullCurl, 0.75);
	
}





