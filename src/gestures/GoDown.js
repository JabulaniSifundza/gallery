import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const goDownGesture = new GestureDescription('scroll_down');

goDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
goDownGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5);
goDownGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5);

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]){
	goDownGesture.addCurl(finger, Finger.NoCurl, 0.8);
	goDownGesture.addDirection(finger, FingerDirection.VerticalUp, 0.8);
}
