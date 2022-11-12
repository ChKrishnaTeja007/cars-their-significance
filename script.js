d3.csv("data/sales_data.csv").then((sales) => {
  updateDendogram("countries");
});
d3.csv("data/countries.csv").then((continents) => {
  updateBubbles(getContinents(continents));
});

function getContinents(data) {
  return d3
    .nest()
    .key(function (element) {
      return element.Continent;
    })
    .entries(data);
}

function groupByRegion(data) {
  return d3
    .nest()
    .key(function (element) {
      return element.region;
    })
    .key(function (element) {
      return element.ownership;
    })
    .entries(data);
}

function groupByOwnership(data) {
  return d3
    .nest()
    .key(function (element) {
      return element.ownership;
    })
    .key(function (element) {
      return element.region;
    })
    .entries(data);
}

function getDataByKey(key, data) {
  list = [];
  isRegion = false;
  isOwnership = false;
  isBrand = false;
  data.forEach((element) => {
    if (element.region === key) {
      isRegion = true;
      list.push(element);
    }
    if (element.ownership === key) {
      isOwnership = true;
      list.push(element);
    }
    if (element.brand === key) {
      isBrand = true;
      list.push(element);
    }
  });
  onBubbleClick(list, isRegion, isOwnership, isBrand);
  return d3
    .nest()
    .key(function (element) {
      return isRegion
        ? element.ownership
        : isOwnership
        ? element.brand
        : element.region;
    })
    .entries(list);
}

function selectGroup(value) {
  d3.select("#dendogram").remove();
  updateDendogram(value);
}

function getCountriesByContinent(continent, data) {
  list = [];
  data.forEach((element) => {
    if (element.Continent === continent) list.push({ key: element.Country });
  });
  return list;
}

function selectBubble(param) {
  param === "America's" || param === "Asia" || param === "Europe"
    ? d3.csv("data/countries.csv").then((data) => {
        d3.select("#bubble").remove();
        updateBubbles(getCountriesByContinent(param, data));
      })
    : d3.csv("data/sales_data.csv").then((data) => {
        d3.select("#bubble").remove();
        updateBubbles(getDataByKey(param, data));
      });
}

function onClear() {
  d3.csv("data/countries.csv").then((continents) => {
    d3.select("#bubble").remove();
    updateBubbles(getContinents(continents));
  });
}

function onBubbleClick(list, isRegion, isOwnership, isBrand) {
  console.log(isRegion, isOwnership, isBrand);
  console.log(list);
}

d3.csv("data/sales_data.csv").then((sales) => {
  array = [];
  year2014 = 0;
  year2015 = 0;
  year2016 = 0;
  year2017 = 0;
  year2018 = 0;
  year2019 = 0;
  year2020 = 0;
  year2021 = 0;
  sales.forEach((element) => {
    if (element.region === "USA") {
      year2014 += parseInt(element[2014]);
      year2015 += parseInt(element[2015]);
      year2016 += parseInt(element[2016]);
      year2017 += parseInt(element[2017]);
      year2018 += parseInt(element[2018]);
      year2019 += parseInt(element[2019]);
      year2020 += parseInt(element[2020]);
      year2021 += parseInt(element[2021]);
    }
  });
  list = [
    { date: "2014", sales: year2014 },
    { date: "2015", sales: year2015 },
    { date: "2016", sales: year2016 },
    { date: "2017", sales: year2017 },
    { date: "2018", sales: year2018 },
    { date: "2019", sales: year2019 },
    { date: "2020", sales: year2020 },
    { date: "2021", sales: year2021 },
  ];
  array.push({ key: "USA", data: list });
  year2014 = 0;
  year2015 = 0;
  year2016 = 0;
  year2017 = 0;
  year2018 = 0;
  year2019 = 0;
  year2020 = 0;
  year2021 = 0;
  sales.forEach((element) => {
    if (element.region === "Canada") {
      year2014 += parseInt(element[2014]);
      year2015 += parseInt(element[2015]);
      year2016 += parseInt(element[2016]);
      year2017 += parseInt(element[2017]);
      year2018 += parseInt(element[2018]);
      year2019 += parseInt(element[2019]);
      year2020 += parseInt(element[2020]);
      year2021 += parseInt(element[2021]);
    }
  });
  list = [
    { date: "2014", sales: year2014 },
    { date: "2015", sales: year2015 },
    { date: "2016", sales: year2016 },
    { date: "2017", sales: year2017 },
    { date: "2018", sales: year2018 },
    { date: "2019", sales: year2019 },
    { date: "2020", sales: year2020 },
    { date: "2021", sales: year2021 },
  ];
  array.push({ key: "Canada", data: list });
  drawLineChart(array);
});

function groupByKey() {}
