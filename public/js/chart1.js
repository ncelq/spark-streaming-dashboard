    var chartdata1 = [
      {key: "Bearish", y: 1, color: "red"},
      {key: "Bullish", y: 1, color: "green"}
    ];


    var chart1;
    nv.addGraph(function() {
        chart1 = nv.models.pieChart()
            .x(function(d) { return d.key })
            .y(function(d) { return d.y })
            .donut(true)

            .margin({left: 50})
            .padAngle(.08)
            .cornerRadius(5)
            .id('donut1'); // allow custom CSS for this one svg

        chart1.pie.donutLabelsOutside(true).donut(true);
        d3.select("#chart1 svg")
            .datum(chartdata1)
            .transition().duration(1200)
            .call(chart1);

        nv.utils.windowResize(chart1.update);
        return chart1;
    });

socket.on('chart1', function(value){
  var data= JSON.parse(value)

  for (const entry of chartdata1.entries()) {
    if(entry[1].key==data.key) {
      entry[1].y = data.y
    }
  }

  d3.select("#chart1 svg")
      .datum(chartdata1)
      .transition().duration(1200)
      .call(chart1);
});
