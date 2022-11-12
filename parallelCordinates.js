var parallelMargin = { top: 30, right: 30, bottom: 30, left: 120 },
  parallelWidth = 1250 - parallelMargin.left - parallelMargin.right,
  parallelHeight = 2500 - parallelMargin.top - parallelMargin.bottom;

function drawParallelCordinates(data, brands, columns) {
  var svg = d3
    .select(".parallel")
    .append("svg")
    .attr("width", parallelWidth + parallelMargin.left + parallelMargin.right)
    .attr("height", parallelHeight + parallelMargin.top + parallelMargin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + parallelMargin.left + "," + parallelMargin.top + ")"
    );

  var color = d3.scaleOrdinal().domain(brands).range(colors);

  dimensions = columns;
  var y = {};
  for (i in dimensions) {
    name = dimensions[i];
    if (name !== "brand") {
      y[name] = d3
        .scaleLinear()
        .domain([0, 4500000])
        .range([parallelHeight, 0]);
    } else {
      y[name] = d3
        .scaleLinear()
        .domain([0, brands.length])
        .range([parallelHeight, 0]);
    }
  }

  x = d3.scalePoint().range([0, parallelWidth]).domain(dimensions);
  var highlight = function (d) {
    brand = d.brand;
    d3.selectAll(".line")
      .transition()
      .duration(200)
      .style("stroke", "lightgrey")
      .style("opacity", "0.2");
    d3.selectAll("." + brand)
      .transition()
      .duration(200)
      .style("stroke", color(brand))
      .style("opacity", "1");
  };

  var doNotHighlight = function (d) {
    d3.selectAll(".line")
      .transition()
      .duration(200)
      .delay(1000)
      .style("stroke", function (d) {
        return color(d.brand);
      })
      .style("opacity", "1");
  };

  function path(d) {
    return d3.line()(
      dimensions.map(function (p) {
        if (p === "brand") {
          return [x(p), y[p](brands.indexOf(d[p]))];
        }
        return [x(p), y[p](d[p])];
      })
    );
  }

  svg
    .selectAll("myPath")
    .data(data)
    .enter()
    .append("path")
    .attr("class", function (d) {
      return "line " + d.brand;
    })
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", function (d) {
      return color(d.brand);
    })
    .style("opacity", 0.5);
  // .on("mouseover", highlight)
  // .on("mouseleave", doNotHighlight);

  svg
    .selectAll("myAxis")
    .data(dimensions)
    .enter()
    .append("g")
    .attr("class", "axis")
    .attr("transform", function (d) {
      return "translate(" + x(d) + ")";
    })
    .each(function (d) {
      if (d === "brand") {
        d3.select(this).call(
          d3
            .axisLeft()
            .tickFormat(function (d, i) {
              return brands[i];
            })
            .ticks(brands.length)
            .scale(y[d])
        );
      } else {
        d3.select(this).call(d3.axisLeft().ticks(20).scale(y[d]));
      }
    })
    .append("text")
    .style("text-anchor", "middle")
    .attr("y", -10)
    .text(function (d) {
      return d;
    })
    .style("fill", "black");
}
