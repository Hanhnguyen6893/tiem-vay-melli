// Declaration for CSS Modules so TypeScript doesn't complain
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
