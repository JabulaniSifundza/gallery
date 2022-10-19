import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const goUpGetsure = new GestureDescription('scroll_up');

goUpGetsure.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
goUpGetsure.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5);
goUpGetsure.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5);

for(let finger of [Finger.index, Finger.Middle, Finger.Pinky, Finger.Ring]){
	goUpGetsure.addCurl(finger, Finger.FullCurl, 0.80);
	goUpGetsure.addDirection(finger, FingerDirection.VerticalDown, 0.75)

}

