    var chartdata4 = [
      {key: "fb", value: 1},
      {key: "nflx", value: 1},
      {key: "amzn", value: 1}
    ];

    var height = 300;
    var width = 300;
    var chart4;

    nv.addGraph(function() {
      chart4 = nv.models.pieChart()
          .x(function(d) { return d.key })
          .y(function(d) { return d.value })
          .showLabels(true);

        d3.select("#chart4 svg")
            .datum(chartdata4)
          .transition().duration(1200)
            .call(chart4);

      return chart4;
    });

socket.on('chart4', function(value){
  var data= JSON.parse(value)

  for (const entry of chartdata4.entries()) {
    if(entry[1].key==data.key) {
      entry[1].value = data.value
    }
  }

  d3.select("#chart4 svg")
      .datum(chartdata4)
      .transition().duration(1200)
      .call(chart4);
});
