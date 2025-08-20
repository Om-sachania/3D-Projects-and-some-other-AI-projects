import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  isTextTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  textDecal: '',
  textProperties: {
    text: '',
    fontSize: 24,
    fontFamily: 'Arial',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textColor: '#000000',
    textAlign: 'center',
  },
  // Add fabric properties
  fabricProperties: {
    stiffness: 0.8,
    mass: 1.0,
    damping: 0.7,
    stretchiness: 0.3
  }
});

export default state;
