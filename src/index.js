import "./styles.css";
import * as d3 from "d3";
const size = 500;
const canvas = d3
  .select("#app")
  .append("svg")
  .attr("width", size)
  .attr("height", size);

canvas.append("g").attr("transform", `translate( ${size / 2}, ${size / 2})`);

let previousAngle = null;

const arcs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const colorScale = d3
  .scaleLinear()
  .domain([arcs[0], arcs[arcs.length - 1]])
  .range([0, 99]);

const d3Arc = d3.arc;

var rainbow = d3
  .scaleSequential()
  .interpolator(d3.interpolateLab("coral", "orange"))
  .domain([0, 99]);

for (let i of arcs) {
  // const color = randomColor();
  const endAngle = (Math.PI * 2) / (arcs.length / i);
  const arc = d3Arc()
    .innerRadius((size / 2) * 0.7)
    .outerRadius(size / 2)
    .startAngle(previousAngle || 0)
    .endAngle(endAngle)
    .padAngle(Math.PI / size)
    .cornerRadius(Math.PI * 2);

  previousAngle = endAngle;
  d3.select("g")
    .append("path")
    .attr("d", arc)
    .style("fill", rainbow(colorScale(i)));
}

var scale = d3
  .scaleOrdinal()
  .domain(["A", "B"])
  .range(["Prout", "Mammouth"]);
console.log(scale("A"));
console.log(scale("B"));
