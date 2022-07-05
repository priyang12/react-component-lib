export const callAll =
   (...fns: any) =>
   (...args: any) =>
      fns.forEach((fn: any) => fn(...args));
