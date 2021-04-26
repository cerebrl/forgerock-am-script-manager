declare var outcome: string;

const greeting = (name:string = 'World'): string => {
  return `Hello, ${name}!`;
};

outcome = greeting();
