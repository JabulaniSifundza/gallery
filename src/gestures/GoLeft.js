import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';
export const goLeftGesture = new GestureDescription('go_left');

goLeftGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
goLeftGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.80);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]){
	goLeftGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
	goLeftGesture.addDirection(finger, FingerDirection.HorizontalLeft, 0.80);

}



