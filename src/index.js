import "./styles.css";
import * as d3 from "d3";
const size = 400;
const canvas = d3
  .select("#app")
  .append("svg")
  .attr("width", size)
  .attr("height", size);

canvas
  .append("g")
  .attr("id", "nightingale")
  .attr("transform", `translate(${size / 2}, ${size / 2})`);

const skills = [
  { category: "A" },
  { category: "A" },
  { category: "A" },
  { category: "A" },
  { category: "B" },
  { category: "B" },
  { category: "B" },
  { category: "B" },
  { category: "C" },
  { category: "C" },
  { category: "C" },
  { category: "C" },
  { category: "D" },
  { category: "D" },
  { category: "D" },
  { category: "D" }
];

const levels = [0, 1, 2, 3, 4, 5];

const d3Arc = d3.arc;

const padding = 4;

const colorScale = d3
  .scaleOrdinal()
  .domain(["A", "B", "C", "D"])
  .range(["orange", "yellow", "red", "cyan"]);

const radiusScale = d3
  .scaleLinear()
  .domain([1, 2, 4, 16, 32])
  .range([30, 24, 16, 8, 4]);
const cyScale = d3
  .scaleLinear()
  .domain([1, 2, 4, 16, 32])
  .range([0, -30, -35, -50, -55]);

for (let [skillIndex, value] of skills.entries()) {
  const skill = d3
    .select("#nightingale")
    .append("g")
    .attr("class", `skill-${skillIndex}`)
    .attr(
      "transform",
      `rotate(${(skillIndex * 360) / skills.length})
      scale(${size / (size + (size / 2) * 0.15 * 2)})`
    );

  for (let [levelIndex, l] of levels.entries()) {
    if (levelIndex > 0) {
      const levelArc = d3Arc()
        .innerRadius((size / 2) * (l / levels.length) + (size / 2) * 0.15)
        .outerRadius(
          (size / 2) * ((l + 1) / levels.length) - padding + (size / 2) * 0.15
        )
        .startAngle(0)
        .endAngle((Math.PI * 2) / skills.length)
        .padAngle(Math.PI / 60 / l)
        .cornerRadius(Math.PI * 1);

      skill
        .append("path")
        .attr("class", "level")
        .attr("d", levelArc)
        .style("fill", colorScale(value.category));
    }
  }
  d3.select(`.skill-${skillIndex}`)
    .append("circle")
    .attr("class", "level")
    .attr("r", radiusScale(skills.length))
    .attr("cx", `0`)
    .attr("cy", `${skills.length > 1 ? cyScale(skills.length) : 0}`)
    .style("fill", colorScale(value.category))
    .attr("transform", `rotate(${360 / skills.length / 2})`);
}
