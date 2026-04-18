function parsePoint(wkt: string): [number, number] | null {
  if (!wkt) return null;

  const match = wkt.match(/POINT \(([-\d.]+) ([-\d.]+)\)/);
  if (!match) return null;

  const lng = Number(match[1]);
  const lat = Number(match[2]);

  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

  return [lat, lng];
}

export default parsePoint