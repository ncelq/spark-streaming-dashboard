
    var chartdata2 = [
        {
            key: 'Bullish',
            values: [
                {
                    "label" : "fb" ,
                    "value" : 0
                } ,
                {
                    "label" : "nflx" ,
                    "value" : 0
                } ,
                {
                    "label" : "amzn" ,
                    "value" : 0
                }
            ]
        },
        {
            key: 'Bearish',
            values: [
              {
                  "label" : "fb" ,
                  "value" : 0
              } ,
              {
                  "label" : "nflx" ,
                  "value" : 0
              } ,
              {
                  "label" : "amzn" ,
                  "value" : 0
              }
            ]
        }
    ];
    var chart2;

    nv.addGraph(function() {
        chart2 = nv.models.multiBarHorizontalChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })

            .barColor(d3.scale.category10().range())
            .duration(250)
            .margin({left: 50})
            .stacked(false);
        chart2.yAxis.tickFormat(d3.format(',.2f'));
        //chart2.yAxis.axisLabel('Number');
        chart2.xAxis.axisLabel('X Axis').axisLabelDistance(20);
        d3.select('#chart2 svg')
            .datum(chartdata2)
            .call(chart2);
        nv.utils.windowResize(chart2.update);
        chart2.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
        chart2.state.dispatch.on('change', function(state){
            nv.log('state', JSON.stringify(state));
        });
        return chart2;
    });

    socket.on('chart2', function(value){
      var data= JSON.parse(value)
      for (const entry of chartdata2.entries()) {
        if(entry[1].key==data.key) {

    for (const entry2 of entry[1].values.entries()) {
      if (entry2[1].label==data.label) {
        entry2[1].value = data.value
      }
    }
        }
      }

      d3.select("#chart2 svg")
          .datum(chartdata2)
          .transition().duration(1200)
          .call(chart2);
    });
