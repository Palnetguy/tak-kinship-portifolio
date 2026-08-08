const themes = {
  dark: {
    'bg-canvas': '#191919',
    'bg-input': '#2e2e2e',
    'bg-surface': '#0a0b0a',
    'bg-elevated': '#0f0f10',
    'text-primary': '#ffffff',
    'text-secondary': '#9e9e9e',
    'text-muted': '#8a8a8a',
    'text-accent': '#5fa968',
  },
  light: {
    'bg-canvas': '#f2f2f2',
    'bg-input': '#ffffff',
    'bg-surface': '#ffffff',
    'bg-elevated': '#ffffff',
    'text-primary': '#111111',
    'text-secondary': '#2e2e2e',
    'text-muted': '#6b6b6b',
    'text-accent': '#3a7a42',
  },
};

function hexToRgb(hex) {
  const value = hex.slice(1);
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function toLinear(c) {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(hex1, hex2) {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const bgOrder = ['bg-canvas', 'bg-input', 'bg-surface', 'bg-elevated'];
const fgOrder = ['text-primary', 'text-secondary', 'text-muted', 'text-accent'];

let failures = 0;

for (const theme of ['dark', 'light']) {
  for (const bg of bgOrder) {
    for (const fg of fgOrder) {
      const value = ratio(themes[theme][bg], themes[theme][fg]);
      const verdict = value >= 4.5 ? 'PASS' : 'FAIL';
      if (verdict === 'FAIL') failures++;
      console.log(`${theme}  ${bg} + ${fg}  ${value.toFixed(2)}  ${verdict}`);
    }
  }
}

console.log(`FAILURES: ${failures}`);
process.exit(failures > 0 ? 1 : 0);
