var lineMargin = { top: 10, right: 30, bottom: 30, left: 60 },
  lineWidth = 460 - lineMargin.left - lineMargin.right,
  lineHeight = 400 - lineMargin.top - lineMargin.bottom;

function drawLineChart(data) {
  var svg = d3
    .select(".lineChart")
    .append("svg")
    .attr("id", "lineChart")
    .attr("width", lineWidth + lineMargin.left + lineMargin.right)
    .attr("height", lineHeight + lineMargin.top + lineMargin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + lineMargin.left + "," + lineMargin.top + ")"
    );

  var parseTime = d3.timeParse("%Y");
  data.forEach(function (d) {
    d.data.forEach(function (e) {
      e.date = parseTime(e.date);
    });
  });

  var x = d3
    .scaleTime()
    .domain(
      d3.extent(data[0].data, function (d) {
        return d.date;
      })
    )
    .range([0, lineWidth]);
  svg
    .append("g")
    .attr("transform", "translate(0," + lineHeight + ")")
    .call(d3.axisBottom(x));

  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data[0].data, function (d) {
        return +d.sales;
      }),
    ])
    .range([lineHeight, 0]);
  svg.append("g").call(d3.axisLeft(y));

  data.forEach((element, index) => {
    svg
      .append("path")
      .datum(element.data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.date);
          })
          .y(function (d) {
            return y(d.sales);
          })
      );
  });
}
