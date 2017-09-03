var $table = $('#table1');
    var mydata =
[
    {
        "tweet": "i am a boy",
        "view": "Bullish"
    },
    {
      "tweet": "A for apple a boy",
      "view": "Bullish"
    },
    {
      "tweet": "A for apple a boy",
      "view": "Bullish"
    },
    {
      "tweet": "A for apple a boy",
      "view": "Bullish"
    },
    {
      "tweet": "A for apple a boy",
      "view": "Bullish"
    }
];

$(function () {
    $('#table1').bootstrapTable({
        data: mydata
    });
});

function priceFormatter(value) {
    // 16777215 == ffffff in decimal
    if (value=='Bullish') {
      var color="green"
    } else {
      var color="red"
    }
    return '<div  style="color: ' + color + '">' +
            '' +
            value +
            '</div>';
}
