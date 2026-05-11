const tw = require('tailwindcss/defaultTheme');
console.log(Object.keys(tw.spacing).filter(k => k.includes('.5')));
