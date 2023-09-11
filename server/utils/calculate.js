function calculate({ height, radius, segments }) {
  const vertices = [];
  const pointTop = [0, 0, height];
  const x = (i) => (radius * Math.cos(2 * Math.PI * i / segments)).toFixed(2);
  const y = (i) => (radius * Math.sin(2 * Math.PI * i / segments)).toFixed(2);
  for(let i = 0; i < segments; i += 1) {
    const pointCurrent = [x(i), y(i), 0];
    const pointNext = [x(i + 1), y(i + 1), 0];
    vertices.push(...pointTop, ...pointCurrent, ...pointNext);
  }
  return vertices;
}

export default calculate;