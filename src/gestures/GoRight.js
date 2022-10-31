import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';
export const goRightGesture = new GestureDescription('go_right');

goRightGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
goRightGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.90);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]){
	goRightGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
	goRightGesture.addDirection(finger, FingerDirection.HorizontalRight, 0.90);
}