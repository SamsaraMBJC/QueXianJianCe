let data = [];
let data1 =[];
let data2 =[];
let value = Math.random() * 10;
let value1 = Math.random() * 1300;
let value2 = Math.random() * 500;

// 实时风速统计(m/s)
(function() {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".fs .chart"));
  // 指定配置和数据
  var option;

function randomData() {
  now = new Date(+now +oneDay);
  value = 5 + Math.random()*3-Math.random()*2+Math.random()*1;
  //console.log(value);
  var time = now;
  var h = time.getHours();
  h = h < 10 ? '0' + h : h;
  var m = time.getMinutes();
  m = m < 10 ? '0' + m : m;
  var s = time.getSeconds();
  s = s < 10 ? '0' + s : s;
 
  return {
    name: now.toString(),
    value: [
      [h, m, s].join(':'),
      (value.toFixed(2))
    ]
  };
}

let delay= 1000 * (16 * 60 + 40);
let now = new Date()-delay;
let oneDay = 1000;

for (var i = 0; i < 1000; i++) {
  data.push(randomData());
}
option = {
  color: ['#00f2f1'],
  toolbox: {
    show: true,
    left: 50,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      return (
        (date.getHours()< 10 ? '0' + date.getHours():date.getHours()) +
        ':' +
        (date.getMinutes()< 10 ? '0' + date.getMinutes():date.getMinutes()) +
        ':' +
        (date.getSeconds()< 10 ? '0' + date.getSeconds():date.getSeconds()) +
        ' - ' +
        params.value[1] +
        'm/s'
      );
    },
    axisPointer: {
      animation: false
    }
  },
  dataZoom: [{
    textStyle: {
    color: '#4c9bfd',
    fontWeight: "bold",
    }
  },
    {
      type: 'slider',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      show: true,
      xAxisIndex: [0],
      start: 1,
      end: 35
    },
    {
      type: 'slider',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      show: true,
      yAxisIndex: [0],
      left: '93%',
      start: 29,
      end: 36
    },
    {
      type: 'inside',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      xAxisIndex: [0],
      start: 1,
      end: 35
    },
    {
      type: 'inside',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      yAxisIndex: [0],
      start: 29,
      end: 36
    }
  ],
  xAxis: {
    type: 'category',
    axisLabel: {
      color: '#4c9bfd' // 文字颜色
    },
    splitLine: {
      lineStyle: {
      color: '#012f4a' // 分割线颜色
    },

      show: true
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    axisLabel: {
      color: '#4c9bfd' // 文字颜色
    },
    splitLine: {
      lineStyle: {
        color: '#012f4a' // 分割线颜色
      },
      show: true
    }
  },
  grid: {
    top: '3%',
    left: '0%',
    right: '8%',
    bottom:'23%',
    containLabel:true
  },

  series: [
    {
      name: '实时风速数据(m/s)',
      type: 'line',
      showSymbol: false,
      data: data,
      smooth: true,
      
    }
  ]
};
setInterval(function () {
  for (var i = 0; i < 1; i++) {
    data.push(randomData());
  }
  myChart.setOption({
    series: [
      {
        data: data
      }
    ]
  });
}, 1000);

  // 把配置给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });

})();

//实时风速(m/s)
(function() {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".fs1 .chart"));
  // 指定配置和数据
  var option;


option = {
  series: [
    {
      type: 'gauge',
      center: ['50%', '68%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 10,
      splitNumber: 5,
      itemStyle: {
        color: '#4c9bfd'
      },
      progress: {
        show: true,
        width: 30
      },
      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          width: 30
        }
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: 'skyblue'
        }
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: '#4c9bfd'
        }
      },
      axisLabel: {
        distance: -20,
        color: '#4c9bfd',
        fontSize: 20
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '68%'],
        fontSize: 22,
        fontWeight: 'bolder',
        formatter: '{value} (m/s)',
        color: 'inherit'
      },
      data: [
        {
          value: 20
        }
      ]
    },
    {
      type: 'gauge',
      center: ['50%', '68%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 10,
      itemStyle: {
        color: 'skyblue'
      },
      progress: {
        show: true,
        width: 8
      },
      pointer: {
        show: true,
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      detail: {
        show: false
      },
      data: [
        {
          value: 20
        }
      ]
    }
  ]
};
setInterval(function () {
  //const random = +(Math.random() * 60).toFixed(2);
  myChart.setOption({
    series: [
      {
        data: [
          {
            value: value.toFixed(2)
          }
        ]
      },
      {
        data: [
          {
            value: value.toFixed(2)
          }
        ]
      }
    ]
  });
}, 1000);

// 把配置给实例对象
myChart.setOption(option);
window.addEventListener("resize", function() {
  myChart.resize();
});

})();

// 实时发电机转速统计(每转分)
(function() {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".zs .chart"));
  // 指定配置和数据
  var option;

function randomData1() {
  now1 = new Date(+now1 +oneDay);
  value1 = 1300 + Math.random()*30-Math.random()*20+Math.random()*10;
  //console.log(value);
  var time = now1;
  var h = time.getHours();
  h = h < 10 ? '0' + h : h;
  var m = time.getMinutes();
  m = m < 10 ? '0' + m : m;
  var s = time.getSeconds();
  s = s < 10 ? '0' + s : s;
 
  return {
    name: now1.toString(),
    value: [
      [h, m, s].join(':'),
      (Math.round(value1))
    ]
  };
}

let delay= 1000 * (16 * 60 + 40);
let now1 = new Date()-delay;
let oneDay = 1000;

for (var i = 0; i < 1000; i++) {
  data1.push(randomData1());
}
option = {
  color: ['#00f2f1'],
  toolbox: {
    show: true,
    left: 50,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date1 = new Date(params.name);
      return (
        (date1.getHours()< 10 ? '0' + date1.getHours():date1.getHours()) +
        ':' +
        (date1.getMinutes()< 10 ? '0' + date1.getMinutes():date1.getMinutes()) +
        ':' +
        (date1.getSeconds()< 10 ? '0' + date1.getSeconds():date1.getSeconds()) +
        ' - ' +
        params.value[1] +
        '(每转分)'
      );
    },
    axisPointer: {
      animation: false
    }
  },
  dataZoom: [{
    textStyle: {
    color: '#4c9bfd',
    fontWeight: "bold",
    }
  },
    {
      type: 'slider',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      show: true,
      xAxisIndex: [0],
      start: 1,
      end: 35
    },
    {
      type: 'slider',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      show: true,
      yAxisIndex: [0],
      left: '93%',
      start: 29,
      end: 36
    },
    {
      type: 'inside',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      xAxisIndex: [0],
      start: 1,
      end: 35
    },
    {
      type: 'inside',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      yAxisIndex: [0],
      start: 29,
      end: 36
    }
  ],
  xAxis: {
    type: 'category',
    axisLabel: {
      color: '#4c9bfd' // 文字颜色
    },
    splitLine: {
      lineStyle: {
      color: '#012f4a' // 分割线颜色
    },

      show: true
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    axisLabel: {
      color: '#4c9bfd' // 文字颜色
    },
    splitLine: {
      lineStyle: {
        color: '#012f4a' // 分割线颜色
      },
      show: true
    }
  },
  grid: {
    top: '3%',
    left: '0%',
    right: '8%',
    bottom:'23%',
    containLabel:true
  },

  series: [
    {
      name: '实时发电机转速数据(转每分)',
      type: 'line',
      showSymbol: false,
      data: data1,
      smooth: true,
      
    }
  ]
};
setInterval(function () {
  for (var i = 0; i < 1; i++) {
    data1.push(randomData1());
  }
  myChart.setOption({
    series: [
      {
        data: data1
      }
    ]
  });
}, 1000);

  // 把配置给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });

})();

//实时发电机转速(每转分)
(function() {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".zs1 .chart"));
  // 指定配置和数据
  var option;


option = {
  series: [
    {
      type: 'gauge',
      center: ['50%', '68%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 1400,
      splitNumber: 7,
      itemStyle: {
        color: '#4c9bfd'
      },
      progress: {
        show: true,
        width: 30
      },
      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          width: 30
        }
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: 'skyblue'
        }
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: '#4c9bfd'
        }
      },
      axisLabel: {
        distance: -20,
        color: '#4c9bfd',
        fontSize: 20
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '68%'],
        fontSize: 22,
        fontWeight: 'bolder',
        formatter: '{value} (每转分)',
        color: 'inherit'
      },
      data: [
        {
          value: 20
        }
      ]
    },
    {
      type: 'gauge',
      center: ['50%', '68%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 1400,
      itemStyle: {
        color: 'skyblue'
      },
      progress: {
        show: true,
        width: 8
      },
      pointer: {
        show: true,
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      detail: {
        show: false
      },
      data: [
        {
          value: 20
        }
      ]
    }
  ]
};
setInterval(function () {
  //const random = +(Math.random() * 60).toFixed(2);
  myChart.setOption({
    series: [
      {
        data: [
          {
            value: Math.round(value1)
          }
        ]
      },
      {
        data: [
          {
            value: Math.round(value1)
          }
        ]
      }
    ]
  });
}, 1000);

// 把配置给实例对象
myChart.setOption(option);
window.addEventListener("resize", function() {
  myChart.resize();
});

})();

// 实时发电功率统计(kw)
(function() {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".gl .chart"));
  // 指定配置和数据
  var option;

function randomData2() {
  now2 = new Date(+now2 +oneDay);
  value2 = 500 + Math.random()*20-Math.random()*10+Math.random()*5;
  //console.log(value);
  var time = now2;
  var h = time.getHours();
  h = h < 10 ? '0' + h : h;
  var m = time.getMinutes();
  m = m < 10 ? '0' + m : m;
  var s = time.getSeconds();
  s = s < 10 ? '0' + s : s;
 
  return {
    name: now2.toString(),
    value: [
      [h, m, s].join(':'),
      (value2.toFixed(2))
    ]
  };
}

let delay= 1000 * (16 * 60 + 40);
let now2 = new Date()-delay;
let oneDay = 1000;

for (var i = 0; i < 1000; i++) {
  data2.push(randomData2());
}
option = {
  color: ['#00f2f1'],
  toolbox: {
    show: true,
    left: 50,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date2 = new Date(params.name);
      return (
        (date2.getHours()< 10 ? '0' + date2.getHours():date2.getHours()) +
        ':' +
        (date2.getMinutes()< 10 ? '0' + date2.getMinutes():date2.getMinutes()) +
        ':' +
        (date2.getSeconds()< 10 ? '0' + date2.getSeconds():date2.getSeconds()) +
        ' - ' +
        params.value[1] +
        '(kw)'
      );
    },
    axisPointer: {
      animation: false
    }
  },
  dataZoom: [{
    textStyle: {
    color: '#4c9bfd',
    fontWeight: "bold",
    }
  },
    {
      type: 'slider',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      show: true,
      xAxisIndex: [0],
      start: 1,
      end: 35
    },
    {
      type: 'slider',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      show: true,
      yAxisIndex: [0],
      left: '93%',
      start: 29,
      end: 36
    },
    {
      type: 'inside',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      xAxisIndex: [0],
      start: 1,
      end: 35
    },
    {
      type: 'inside',
      textStyle: {
        color: '#4c9bfd',
        fontWeight: "bold",
      },
      yAxisIndex: [0],
      start: 29,
      end: 36
    }
  ],
  xAxis: {
    type: 'category',
    axisLabel: {
      color: '#4c9bfd' // 文字颜色
    },
    splitLine: {
      lineStyle: {
      color: '#012f4a' // 分割线颜色
    },

      show: true
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    axisLabel: {
      color: '#4c9bfd' // 文字颜色
    },
    splitLine: {
      lineStyle: {
        color: '#012f4a' // 分割线颜色
      },
      show: true
    }
  },
  grid: {
    top: '3%',
    left: '0%',
    right: '8%',
    bottom:'23%',
    containLabel:true
  },

  series: [
    {
      name: '实时发电功率数据(kw)',
      type: 'line',
      showSymbol: false,
      data: data1,
      smooth: true,
      
    }
  ]
};
setInterval(function () {
  for (var i = 0; i < 1; i++) {
    data2.push(randomData2());
  }
  myChart.setOption({
    series: [
      {
        data: data2
      }
    ]
  });
}, 1000);

  // 把配置给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });

})();

//实时发电功率(kw)
(function() {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".gl1 .chart"));
  // 指定配置和数据
  var option;


option = {
  series: [
    {
      type: 'gauge',
      center: ['50%', '68%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 600,
      splitNumber: 6,
      itemStyle: {
        color: '#4c9bfd'
      },
      progress: {
        show: true,
        width: 30
      },
      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          width: 30
        }
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: 'skyblue'
        }
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: '#4c9bfd'
        }
      },
      axisLabel: {
        distance: -20,
        color: '#4c9bfd',
        fontSize: 20
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '68%'],
        fontSize: 22,
        fontWeight: 'bolder',
        formatter: '{value} (kw)',
        color: 'inherit'
      },
      data: [
        {
          value: 20
        }
      ]
    },
    {
      type: 'gauge',
      center: ['50%', '68%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 600,
      itemStyle: {
        color: 'skyblue'
      },
      progress: {
        show: true,
        width: 8
      },
      pointer: {
        show: true,
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      detail: {
        show: false
      },
      data: [
        {
          value: 20
        }
      ]
    }
  ]
};
setInterval(function () {
  //const random = +(Math.random() * 60).toFixed(2);
  myChart.setOption({
    series: [
      {
        data: [
          {
            value: value2.toFixed(2)
          }
        ]
      },
      {
        data: [
          {
            value: value2.toFixed(2)
          }
        ]
      }
    ]
  });
}, 1000);

// 把配置给实例对象
myChart.setOption(option);
window.addEventListener("resize", function() {
  myChart.resize();
});

})();