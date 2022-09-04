import hsl from "hsl-to-hex";

export const makeObject = (arg) => {
  const obj = {};
  const keys = Object.keys(arg);
  keys.forEach((key) => {
    if (arg[key]) obj[key] = arg[key];
  });
  return obj;
};

export const random = (min, max) => Math.random() * (max - min) + min;

// map a number from 1 range to another
export const map = (n, start1, end1, start2, end2) =>
  ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;

export const generateColors = () => {
  const hue = ~~random(280, 330);
  const complimentaryHue1 = hue + 30;
  const complimentaryHue2 = hue + 60;
  const saturation = 95;
  const luminosity = 50;
  return {
    baseColor: hsl(hue, saturation, luminosity),
    complimentary1: hsl(complimentaryHue1, saturation, luminosity),
    complimentary2: hsl(complimentaryHue2, saturation, luminosity),
  };
};

export const authenticate = (token) => {
  if (typeof window !== "undefined")
    return localStorage.setItem("token", JSON.stringify(token));
  else return false;
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  const data = JSON.parse(localStorage.getItem("token"));
  if (data && data.expiry * 1000 > Date.now()) 
    return data;
   else return false;
};
