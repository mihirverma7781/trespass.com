declare global {
  var signin: () => Promise<string[]>;
}
export {}; // Ensure the file is treated as a module
