const margin = { top: 10, right: 30, bottom: 30, left: 80 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

let svg = d3.select('#area-visualization')
            .append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
            .append('g')
              .attr('transform',
                    'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('national-population.csv',
  (d) => {
    return { date : d3.timeParse('%Y-%m-%d')(d.date), value : d.value }
  },
  (data) => {
    let x = d3.scaleTime()
      .domain(d3.extent(data, (d) => { return d.date; }))
      .range([ 0, width ]);
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    let y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => { return +d.value; })])
      .range([ height, 0 ]);
    svg.append('g')
      .call(d3.axisLeft(y).tickFormat((d) => ((d/1000000) + 'M')));

    svg.append('path')
      .datum(data)
      .attr('fill', '#BE90D4')
      .attr('stroke-linecap', 'butt')
      .attr('stroke', '#7E349D')
      .attr('stroke-width', .5)
      .attr('d', d3.area()
        .x((d) => { return x(d.date) })
        .y0(y(0))
        .y1((d) => { return y(d.value) })
        )
});