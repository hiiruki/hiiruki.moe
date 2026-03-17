const fs = require('fs');

const global_css = fs.readFileSync('src/styles/global.css', 'utf8');
const startIdx = global_css.indexOf('/* Matrix ASCII Art */');
let new_global_css = global_css;
if (startIdx !== -1) {
    new_global_css = global_css.substring(0, startIdx);
}

const columns = 90;   // 90 columns mathematically fits the page width exactly with our font-size!
const rows = 6;       // 50% height
const H = 25;
const L = 50; 
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+-=<>?';

function escapeCSS(text) {
    return text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

class Drop {
    constructor() {
        this.c = Math.floor(Math.random() * columns);
        this.start_y = Math.floor(Math.random() * H);
        this.length = Math.floor(Math.random() * 5) + 3; 
        this.speed = Math.floor(Math.random() * 2) + 1; 
    }
}

// Huge amount of drops ensures NO EMPTY SPACES on the right or left!
let drops = Array.from({length: 150}, () => new Drop());

let css = [];
css.push('/* Matrix ASCII Art */');
css.push('.matrix-ascii-art {');
css.push('\twhite-space: nowrap;');
css.push('\tcolor: #2abc89;');
css.push('}');
css.push('.matrix-ascii-art::before {');
css.push('\tcontent: "";');
css.push('\twhite-space: pre;');
css.push('\tline-height: 1.2;');
css.push('\tfont-family: inherit;');
// The letter spacing will naturally stretch it without making the letters huge
css.push('\tletter-spacing: 0.1em;\n\tanimation: matrix-cmatrix-anim 4s infinite step-end;');
css.push('}');
css.push('@keyframes matrix-cmatrix-anim {');

for (let i = 0; i <= L; i++) {
    const progress = i / L;
    let grid = Array.from({length: rows}, () => Array(columns).fill(' '));
    
    for (let d of drops) {
        let y_head = (d.start_y + d.speed * i) % H;
        for (let offset = 0; offset < d.length; offset++) {
            let y_cell = (y_head - offset + H) % H;
            if (y_cell < rows) {
                grid[y_cell][d.c] = chars[Math.floor(Math.random() * chars.length)];
            }
        }
    }
    
    let frameLines = grid.map(row => row.join(''));
    let frameText = frameLines.map(line => escapeCSS(line)).join('\\A ');
    css.push(`\t${Math.round(progress * 1000) / 10}% {\n\t\tcontent: "${frameText}";\n\t}`);
}

css.push('}');
fs.writeFileSync('src/styles/global.css', new_global_css + css.join('\n') + '\n');
console.log('Successfully generated dense looping matrix CSS!');
