var bubbleWidth = 900;
var bubbleHeight = 450;

function updateBubbles(data) {
  var svg = d3
    .select(".bubble")
    .append("svg")
    .attr("id", "bubble")
    .attr("width", bubbleWidth)
    .attr("height", bubbleHeight);

  var g = svg.append("g").selectAll("circle").data(data).enter().append("g");

  var node = g
    .append("circle")
    .attr("r", 25)
    .attr("cx", bubbleWidth / 2)
    .attr("cy", bubbleHeight / 2)
    .style("fill", "#69b3a2")
    .style("fill-opacity", 0.3)
    .attr("stroke", "#69a2b2")
    .style("stroke-width", 4)
    .on("click", function (d) {
      selectBubble(d.target.__data__.key);
    });

  var simulation = d3
    .forceSimulation()
    .force(
      "center",
      d3
        .forceCenter()
        .x(bubbleWidth / 2)
        .y(bubbleHeight / 2)
    )
    .force("charge", d3.forceManyBody().strength(0.5))
    .force(
      "collide",
      d3.forceCollide().strength(0.01).radius(40).iterations(1)
    );

  simulation.nodes(data).on("tick", function (d) {
    node
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });
    d3.selectAll("#bubbleText").remove();
    g.append("text")
      .attr("id", "bubbleText")
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      })
      .style("text-anchor", "middle")
      .text((d) => {
        return d.key;
      });
  });
}
