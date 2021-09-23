<template>
  <div>
    <div id="graph" style="margin-left: -16px"></div>
  </div>
</template>

<script>
const d3 = require("d3");

export default {
  data: () => ({
    margin: 0,
    width: 0,
    height: 0,
    svg: null,
  }),
  mounted() {
    this.loadGraph();
  },
  computed: {},
  watch: {},
  methods: {
    processDate(d) {
      return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
    },
    loadGraph() {
      this.margin = { top: 0, right: 0, bottom: 0, left: 0 };
      this.width = 286 - this.margin.left - this.margin.right;
      this.height = 216 - this.margin.top - this.margin.bottom;

      this.svg = d3
        .select("#graph")
        .append("svg")
        .style("border-radius", "0px 0px 24px 24px")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);
      // .append("g")
      // .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

      d3.csv(
        "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

        (d) => {
          return {
            date: d3.timeParse("%Y-%m-%d")(d.date),
            value: d.value,
          };
        }
      ).then(
        // Now I can use this dataset:
        (data) => {
          // Add X axis --> it is a date format
          const x = d3
            .scaleTime()
            .domain(d3.extent(data, (d) => d.date))
            .range([0, this.width]);
          this.svg.append("g").attr("transform", `translate(0,${this.height})`);
          // .call(d3.axisBottom(x));

          // Add Y axis
          const y = d3.scaleLinear().domain([0, 1400]).range([this.height, 0]);
          // this.svg.append("g").call(d3.axisLeft(y)
          // );

          // Add the area
          this.svg
            .append("path")
            .datum(data)
            .attr("fill", "white")
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .attr(
              "d",
              d3
                .area()
                .x((d) => x(d.date))
                .y0(y(0))
                .y1((d) => y(d.value))
            );
        }
      );
    },
  },
};
</script>

<style>
</style>