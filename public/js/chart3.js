var chartdata3 = [
    {
        key: 'Bullish', values: []
    },
    {
        key: 'Bearish', values: []
    }
];

   // create the chart
   var chart3;
   nv.addGraph(function() {
       chart3 = nv.models.scatterChart()
           .showDistX(true)
           .showDistY(true)
           .useVoronoi(true)
           .color(  [d3.rgb("green"), d3.rgb("red")] )
           .duration(300)
       ;
       chart3.dispatch.on('renderEnd', function(){
           console.log('render complete');
       });
       //chart3.xAxis.tickFormat(formatDateTick).axisLabel('Time');
       chart3.xAxis.tickFormat(
         function(d) {
          return d3.time.format('%H:%M')(new Date(d))
        }
       ).axisLabel('Time');
       chart3.xScale(d3.time.scale.utc());

       chart3.yAxis.tickFormat(d3.format('')).axisLabel('Count');
       d3.select('#chart3 svg')
           .datum(chartdata3)
           .call(chart3);
       nv.utils.windowResize(chart3.update);
       chart3.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });
       return chart3;
   });



       socket.on('chart3', function(value){
         var data= JSON.parse(value)
         for (const entry of chartdata3.entries()) {
           if(entry[1].key==data.key) {
             var iso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%L+08:00");
             var date = iso.parse(data.created_at.start);
             for (var i =0; i < entry[1].values.length; i++)

             if (entry[1].values[i].x-date==0) {
                entry[1].values.splice(i,1);
                break;
             }
             entry[1].values.push({x:date,y:data.count,size:data.count,sharp:'circle'})


           }
         }

         d3.select("#chart3 svg")
             .datum(chartdata3)
             .transition().duration(1200)
             .call(chart3);
       });


       function formatDateTick(time) {
         //
         var iso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%L+08:00");
                  console.log(time)
         var date = iso.parse(time);


         return d3.time.format('%H:%M')(new Date(time));
       };
