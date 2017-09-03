
    var long_short_data = [
        {
            key: 'Series1',
            values: [
                {
                    "label" : "Group A" ,
                    "value" : -1.8746444827653
                } ,
                {
                    "label" : "Group B" ,
                    "value" : -8.0961543492239
                } ,
                {
                    "label" : "Group C" ,
                    "value" : -0.57072943117674
                }
            ]
        },
        {
            key: 'Series2',
            values: [
                {
                    "label" : "Group A" ,
                    "value" : 25.307646510375
                } ,
                {
                    "label" : "Group B" ,
                    "value" : 16.756779544553
                } ,
                {
                    "label" : "Group C" ,
                    "value" : 18.451534877007
                }
            ]
        }
    ];
    var chart;
    var height = 300;
    var width = 400;
    nv.addGraph(function() {
        chart = nv.models.multiBarHorizontalChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .width(width)
            .height(height)
            .barColor(d3.scale.category10().range())
            .duration(250)
            .margin({left: 100})
            .stacked(true);
        chart.yAxis.tickFormat(d3.format(',.2f'));
        chart.yAxis.axisLabel('Y Axis');
        chart.xAxis.axisLabel('X Axis').axisLabelDistance(20);
        d3.select('#chart2 svg')
            .datum(long_short_data)
            .call(chart);
        nv.utils.windowResize(chart.update);
        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
        chart.state.dispatch.on('change', function(state){
            nv.log('state', JSON.stringify(state));
        });
        return chart;
    });
