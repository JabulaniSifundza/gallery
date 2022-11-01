import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const goUpGetsure = new GestureDescription('scroll_up');

goUpGetsure.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
goUpGetsure.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.80);
goUpGetsure.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.80);

goUpGetsure.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
goUpGetsure.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.80);

for(let finger of [Finger.Middle, Finger.Pinky, Finger.Ring]){
	goUpGetsure.addCurl(finger, FingerCurl.FullCurl, 0.85);
}

