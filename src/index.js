import "./styles.css";
import * as d3 from "d3";
const size = 500;
const canvas = d3
  .select("#app")
  .append("svg")
  .attr("width", size)
  .attr("height", size);

canvas
  .append("g")
  .attr("id", "nightingale")
  .attr("transform", `translate( ${size / 2}, ${size / 2})`);

const skills = [
  { category: "B" },
  { category: "A" },
  { category: "D" },
  { category: "A" },
  { category: "D" },
  { category: "E" }
];

const levels = [0, 1, 2, 3, 4, 5];

const d3Arc = d3.arc;

const padding = 4;

const scale = d3
  .scaleOrdinal()
  .domain(["A", "B", "C", "D"])
  .range(["blue", "yellow", "red", "green"]);
/*var rainbow = d3
  .scaleSequential()
  .interpolator(d3.interpolateLab("black", "orange"))
  .domain([0, 99]);*/
for (let [index, value] of skills.entries()) {
  const skill = d3
    .select("#nightingale")
    .append("g")
    .attr("class", "skill");

  for (let l of levels) {
    //console.log((Math.PI * 2 * 250) / 90);
    const levelArc = d3Arc()
      .innerRadius((size / 2) * (l / levels.length))
      .outerRadius((size / 2) * ((l + 1) / levels.length) - padding)
      .startAngle(((Math.PI * 2) / skills.length) * index)
      .endAngle(((Math.PI * 2) / skills.length) * (index + 1))
      .padAngle(Math.PI / 60 / l)
      .cornerRadius(Math.PI * 2);
    skill
      .append("path")
      .attr("class", "level")
      .attr("d", levelArc)
      .style("fill", scale(value.category));
  }
}

console.log(scale("A"));
console.log(scale("B"));
