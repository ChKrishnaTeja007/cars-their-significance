var margin = { top: 0, right: 40, bottom: 0, left: 80 },
  width = 1000 - margin.right - margin.left,
  height = 7000 - margin.top - margin.bottom;

function updateDendogram(value) {
  var svg = d3
    .select(".dendogram")
    .append("svg")
    .attr("id", "dendogram")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("data/sales_data.csv").then((data) => {
    data = {
      values:
        value === "countries" ? groupByRegion(data) : groupByOwnership(data),
    };
    var cluster = d3.cluster().size([height, width - 240]);

    var root = d3.hierarchy(data, function (d) {
      return d.values;
    });
    cluster(root);

    svg
      .selectAll("path")
      .data(root.descendants().slice(1))
      .enter()
      .append("path")
      .attr("d", function (d) {
        return (
          "M" +
          d.y +
          "," +
          d.x +
          "C" +
          (d.parent.y + 50) +
          "," +
          d.x +
          " " +
          (d.parent.y + 150) +
          "," +
          d.parent.x +
          " " +
          d.parent.y +
          "," +
          d.parent.x
        );
      })
      .style("fill", "none")
      .attr("stroke", "lightgrey");

    var node = svg
      .selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });

    node
      .append("circle")
      .attr("r", 7)
      .style("fill", "lightblue")
      .attr("stroke", "black")
      .style("stroke-width", 2)
      .on("click", function (d) {
        d.target.__data__.children ?? console.log(d.target.__data__);
      });

    node
      .append("text")
      .attr("dy", ".35em")
      .attr("x", (d) => {
        return d.children ? -10 : 10;
      })
      .attr("y", (d) => {
        return d.children ? -10 : 0;
      })
      .style("text-anchor", (d) => {
        return d.children ? "end" : "start";
      })
      .text((d) => {
        return d.data.key
          ? d.data.key
          : d.data.brand
          ? d.data.brand
          : "countries";
      });
  });
}
