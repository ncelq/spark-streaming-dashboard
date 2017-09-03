var socket = io.connect('http://localhost:3000');
var chart1
    var chartdata = [
        {key: "Bearish", y: 1, color: "red"},
        {key: "Bullish", y: 1, color: "green"}
    ];
    var height = 300;
    var width = 300;
    var chart1;
    nv.addGraph(function() {
        chart1 = nv.models.pieChart()
            .x(function(d) { return d.key })
            .y(function(d) { return d.y })
            .donut(true)
            .width(width)
            .height(height)
            .padAngle(.08)
            .cornerRadius(5)
            .id('donut1'); // allow custom CSS for this one svg

        chart1.pie.donutLabelsOutside(true).donut(true);
        d3.select("#chart1 svg")
            .datum(chartdata)
            .transition().duration(1200)
            .call(chart1);

        nv.utils.windowResize(chart.update);
        return chart1;
    });

socket.on('chart1', function(value){
  var data= JSON.parse(value)

  for (const entry of chartdata.entries()) {
    if(entry[1].key==data.key) {
      entry[1].y = data.y
    }
  }

  d3.select("#chart1 svg")
      .datum(chartdata)
      .transition().duration(1200)
      .call(chart1);
});
