// document.addEventListener("DOMContentLoaded", function() {

//     d3.json("data.json").then(function(data) {

//         const svg = d3.select("body").append("svg")
//             .attr("width", 500)
//             .attr("height", 500);

//         const xScale = d3.scaleLinear()
//             .domain([0, d3.max(data, d => d.x)])
//             .range([50, 450]);

//         const yScale = d3.scaleLinear()
//             .domain([0, d3.max(data, d => d.y)])
//             .range([450, 50]);

//         const circles = svg.selectAll("circle")
//             .data(data)
//             .enter()
//             .append("circle")
//             .attr("cx", d => xScale(d.x))
//             .attr("cy", d => yScale(d.y))
//             .attr("r", 5)
//             .attr("fill", "steelblue");

//         const xAxis = d3.axisBottom(xScale);
//         svg.append("g")
//             .attr("transform", "translate(0, 450)")
//             .call(xAxis);

//         const yAxis = d3.axisLeft(yScale);
//         svg.append("g")
//             .attr("transform", "translate(50, 0)")
//             .call(yAxis);
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   d3.json("data.json").then(function (data) {
//     const width = 500;
//     const height = 500;

//     const svg = d3
//       .select("body")
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height);

//     const xScale = d3
//       .scaleLinear()
//       .domain(d3.extent(data, (d) => d.x))
//       .range([50, width - 50]);

//     const yScale = d3
//       .scaleLinear()
//       .domain(d3.extent(data, (d) => d.y))
//       .range([height - 50, 50]);

//     const zScale = d3
//       .scaleLinear()
//       .domain(d3.extent(data, (d) => d.label))
//       .range([5, 20]); // This will represent the size of the dot

//     const circles = svg
//       .selectAll("circle")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("cx", (d) => xScale(d.x))
//       .attr("cy", (d) => yScale(d.y))
//       .attr("r", (d) => zScale(d.label))
//       .attr("fill", "steelblue");

//     const xAxis = d3.axisBottom(xScale);
//     svg
//       .append("g")
//       .attr("transform", `translate(0, ${height - 50})`)
//       .call(xAxis);

//     const yAxis = d3.axisLeft(yScale);
//     svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);
//   });
// });

async function draw() {
  // Data
  const dataset = await d3.json("data.json");


  const xAccessor = (d) => d.x;
  const yAccessor = (d) => d.y;

  // Dimensions
  let dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  };

  dimensions.containerWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.containerHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // Draw Image
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  // Create Container
  const container = svg
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    );

  // Scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.containerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([0, dimensions.containerHeight]);

  // Draw Circles
  container
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("r", 5)
    .attr("fill", "red")
    // .attr("cx", (d) => xScale(xAccessor(d)))
    // .attr("cy", (d) => yScale(yAccessor(d)));
    .attr("cx", (d) => xAccessor(d))
    .attr("cy", (d) => yAccessor(d));
}

draw();
