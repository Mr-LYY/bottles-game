declare module '*.png';
declare module '*.mp3';
interface Mapping {
  [key: string]: string;
}
declare module '*.module.css' {
  const mapping: Mapping;
  export default mapping;
}
