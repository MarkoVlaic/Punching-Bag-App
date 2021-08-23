/*
This is a small helper module that helps convert size values from the design documents expressed in pixels on a 360x640 screen
into percentage values for responsive design
*/

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const wp = (pixels) => widthPercentageToDP(`${(pixels / 360) * 100}%`);
export const hp = (pixels) => heightPercentageToDP(`${(pixels / 640) * 100}%`);
