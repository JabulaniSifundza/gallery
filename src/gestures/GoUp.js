import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const goUpGetsure = new GestureDescription('scroll_up');

goUpGetsure.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
goUpGetsure.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
goUpGetsure.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);

for(let finger of [Finger.Pinky, Finger.Ring]){
	goUpGetsure.addCurl(finger, FingerCurl.FullCurl, 0.75);
}

for(let finger of [Finger.Middle, Finger.Index]){
	goUpGetsure.addCurl(finger, FingerCurl.NoCurl, 0.75)
	goUpGetsure.addDirection(finger, FingerDirection.VerticalUp, 0.50);
}

