import { useId } from 'react';
import './FlowerBouquet.css';

type BouquetKind = 'rose' | 'sunflower';
type Flower = { x: number; y: number; size: number; tilt: number; delay: number };

const FLOWERS: Flower[] = [
  { x: 174, y: 104, size: 74, tilt: -8, delay: .1 }, { x: 306, y: 104, size: 74, tilt: 8, delay: .4 },
  { x: 104, y: 215, size: 70, tilt: -12, delay: .7 }, { x: 240, y: 188, size: 82, tilt: 0, delay: .2 }, { x: 376, y: 215, size: 70, tilt: 12, delay: .5 },
  { x: 164, y: 313, size: 67, tilt: -8, delay: .9 }, { x: 303, y: 305, size: 67, tilt: 8, delay: .6 },
];
const LEAVES = [{ x: 213, y: 317, r: -151, side: -1 }, { x: 271, y: 315, r: -28, side: 1 }, { x: 219, y: 385, r: -166, side: -1 }, { x: 269, y: 389, r: -15, side: 1 }, { x: 224, y: 458, r: -170, side: -1 }, { x: 266, y: 465, r: -10, side: 1 }];
const SPARKLES = [[42, 68, 3], [435, 100, 3], [73, 198, 2], [454, 258, 3], [38, 360, 2], [430, 414, 2], [105, 38, 2], [359, 42, 2], [54, 492, 3], [444, 526, 2]];
const petals = Array.from({ length: 16 }, (_, index) => index * 22.5);

function Stem({ flower, index }: { flower: Flower; index: number }) {
  const target = 240 + (index - 3) * 5;
  const path = `M ${flower.x} ${flower.y + 28} Q ${(flower.x + target) / 2 + (target - flower.x) * .15} ${(flower.y + 535) / 2} ${target} 535`;
  return <path className="flower-bouquet__stem" d={path} style={{ animationDelay: `${index * .15}s` }} />;
}

function Leaf({ x, y, r, side, index }: typeof LEAVES[number] & { index: number }) {
  const d = side * 1;
  return <g transform={`translate(${x} ${y}) rotate(${r})`}><g className="flower-bouquet__leaf-motion" style={{ '--leaf-delay': `${index * .28}s` } as React.CSSProperties}>
    <path className="flower-bouquet__leaf" d={`M0 0 C${d * 31} -25 ${d * 61} -17 ${d * 68} 7 C${d * 51} 31 ${d * 19} 40 0 47 C${d * 5} 25 ${d * 5} 10 0 0Z`} />
    <path className="flower-bouquet__vein" d={`M0 2Q${d * 29} 16 ${d * 57} 9M${d * 18} 13L${d * 26} 1M${d * 36} 17L${d * 45} 4`} />
  </g></g>;
}

function Sunflower({ flower }: { flower: Flower }) {
  return <g transform={`translate(${flower.x} ${flower.y}) rotate(${flower.tilt}) scale(${flower.size / 100})`} className="flower-bouquet__flower" style={{ '--flower-delay': `${flower.delay}s` } as React.CSSProperties}><g className="flower-bouquet__flower-motion">
    {petals.map((angle, index) => <ellipse key={angle} cx="0" cy="-40" rx={index % 2 ? 12 : 10} ry="31" className="flower-bouquet__sun-petal" transform={`rotate(${angle})`} />)}
    <circle r="31" className="flower-bouquet__sun-ring" /><circle r="26" className="flower-bouquet__sun-core" />
    {Array.from({ length: 24 }, (_, index) => { const a = index * 2.4; const radius = 6 + (index % 4) * 4.5; return <circle key={index} cx={Math.cos(a) * radius} cy={Math.sin(a) * radius} r="1.8" className="flower-bouquet__seed" />; })}
  </g></g>;
}

function Rose({ flower }: { flower: Flower }) {
  const rosePetals = Array.from({ length: 12 }, (_, index) => index * 30);
  return <g transform={`translate(${flower.x} ${flower.y}) rotate(${flower.tilt}) scale(${flower.size / 100})`} className="flower-bouquet__flower" style={{ '--flower-delay': `${flower.delay}s` } as React.CSSProperties}><g className="flower-bouquet__flower-motion">
    {rosePetals.map((angle) => <ellipse key={angle} cx="0" cy="-20" rx="22" ry="34" className="flower-bouquet__rose-petal" transform={`rotate(${angle})`} />)}
    {rosePetals.filter((_, index) => index % 2 === 0).map((angle) => <ellipse key={angle} cx="0" cy="-10" rx="15" ry="24" className="flower-bouquet__rose-inner" transform={`rotate(${angle + 15})`} />)}
    <circle r="16" className="flower-bouquet__rose-heart" /><path d="M-9 2C-2-12 10-9 8 1C7 10-5 14-10 8" className="flower-bouquet__rose-spiral" />
  </g></g>;
}

export default function FlowerBouquet({ kind, label }: { kind: BouquetKind; label: string }) {
  const id = useId().replace(/:/g, '');
  const FlowerComponent = kind === 'sunflower' ? Sunflower : Rose;
  return <section className={`flower-bouquet flower-bouquet--${kind}`} aria-label={label}>
    <svg viewBox="0 0 480 600" role="img" aria-label={label}>
      <defs><linearGradient id="flower-leaf" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a4d85b" /><stop offset=".6" stopColor="#3d7d3c" /><stop offset="1" stopColor="#153824" /></linearGradient><linearGradient id="flower-sun-petal" x1="0" y1="0" x2=".7" y2="1"><stop stopColor="#fff7b5" /><stop offset=".5" stopColor="#ffe63d" /><stop offset="1" stopColor="#f4a716" /></linearGradient><filter id={`${id}-shadow`} x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#110714" floodOpacity=".58" /></filter></defs>
      <ellipse cx="240" cy="294" rx="222" ry="278" className="flower-bouquet__halo" />
      <g className="flower-bouquet__art" filter={`url(#${id}-shadow)`}>{FLOWERS.map((flower, index) => <Stem key={index} flower={flower} index={index} />)}{LEAVES.map((leaf, index) => <Leaf key={index} {...leaf} index={index} />)}{FLOWERS.map((flower, index) => <FlowerComponent key={index} flower={flower} />)}</g>
      <g className="flower-bouquet__sparkles">{SPARKLES.map(([x, y, size], index) => <g key={index} transform={`translate(${x} ${y})`} style={{ '--sparkle-delay': `${index * .33}s` } as React.CSSProperties}><circle r={size} /><path d={`M${-size * 2} 0H${size * 2}M0 ${-size * 2}V${size * 2}`} /></g>)}</g>
    </svg>
  </section>;
}
