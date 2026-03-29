"use client";

/* ─── Arrow helpers ─────────────────────────────────────────── */

export function ArrowL({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x + 6},${y - 3} ${x + 6},${y + 3}`} fill={c} />;
}
export function ArrowR({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x - 6},${y - 3} ${x - 6},${y + 3}`} fill={c} />;
}
export function ArrowU({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x - 3},${y + 6} ${x + 3},${y + 6}`} fill={c} />;
}
export function ArrowD({ x, y, c }: { x: number; y: number; c: string }) {
  return <polygon points={`${x},${y} ${x - 3},${y - 6} ${x + 3},${y - 6}`} fill={c} />;
}

/* ─── Gear teeth helper ─────────────────────────────────────── */

export function GearTeeth({
  cx, cy, rootR, tipR, count, tw, stroke, fill,
}: {
  cx: number; cy: number; rootR: number; tipR: number;
  count: number; tw: number; stroke: string; fill: string;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * 360;
        return (
          <rect
            key={i}
            x={cx - tw / 2}
            y={cy - tipR}
            width={tw}
            height={tipR - rootR}
            fill={fill}
            stroke={stroke}
            strokeWidth={0.7}
            transform={`rotate(${angle}, ${cx}, ${cy})`}
          />
        );
      })}
    </>
  );
}
