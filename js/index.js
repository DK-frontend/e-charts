var china, world

function formatterDateTime() {
    var date = new Date()
    var month = date.getMonth() + 1
    var datetime = date.getFullYear() +
        "" // "年"
        +
        (month >= 10 ? month : "0" + month) +
        "" // "月"
        +
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
        "" +
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
        "" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        "" +
        (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
    return datetime;
}

$.ajax({
    type: 'post',
    url: 'https://route.showapi.com/2217-2',
    dataType: 'json',
    data: {
        "showapi_timestamp": formatterDateTime(),
        "showapi_appid": '300816', //这里需要改成自己的appid
        "showapi_sign": '0b956dbeabe848b8a06b46cb0b8ab8a2', //这里需要改成自己的应用的密钥secret
    },

    error: function(XmlHttpRequest, textStatus, errorThrown) {
        alert("操作失败!");
    },
    success: function(result) {
        console.log(result) //console变量在ie低版本下不能用
        china = result
    }
});

(function() {
    var worldList = []
    $.ajax({
        type: 'post',
        url: 'https://route.showapi.com/2217-5',
        dataType: 'json',
        data: {
            "showapi_timestamp": formatterDateTime(),
            "showapi_appid": '300816', //这里需要改成自己的appid
            "showapi_sign": '0b956dbeabe848b8a06b46cb0b8ab8a2', //这里需要改成自己的应用的密钥secret
        },

        error: function(XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败!");
        },
        success: function(result) {
            console.log(result) //console变量在ie低版本下不能用
            world = result.showapi_res_body.foreignList
            console.log(world[0].confirmedNum)
            worldList.push(world[0].yesterday_inc_info.confirmed_inc, world[1].yesterday_inc_info.confirmed_inc, world[2].yesterday_inc_info.confirmed_inc, world[3].yesterday_inc_info.confirmed_inc, world[7].yesterday_inc_info.confirmed_inc, world[8].yesterday_inc_info.confirmed_inc, world[5].yesterday_inc_info.confirmed_inc)
            console.log(worldList)
            myChart.setOption(option);

        }
    });
    var myChart = echarts.init(document.querySelector(".bar .chart"))
    var option = {
        color: ['#2f89cf'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '3%',
            top: '10%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['美国', '英国', '俄罗斯', '巴西', '印度', '秘鲁', '西班牙'],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                fontSize: "12",
                color: "rgba(255,255,255,.6)"
            },
            axisLine: {
                show: false
            }
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                fontSize: "12",
                color: "rgba(255,255,255,.6)"
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 2
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                }
            }
        }],
        series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: worldList,
            itemStyle: {
                barBorderRadius: 5
            }
        }]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

(function() {
    var rate = [],
        curedNum = []
    $.ajax({
        type: 'post',
        url: 'https://route.showapi.com/2217-5',
        dataType: 'json',
        data: {
            "showapi_timestamp": formatterDateTime(),
            "showapi_appid": '300816', //这里需要改成自己的appid
            "showapi_sign": '0b956dbeabe848b8a06b46cb0b8ab8a2', //这里需要改成自己的应用的密钥secret
        },

        error: function(XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败!");
        },
        success: function(result) {
            console.log(result) //console变量在ie低版本下不能用
            world = result.showapi_res_body.foreignList
            console.log(world[0].confirmedNum)
            rate.push((world[0].curedNum / world[0].confirmedNum * 100).toFixed(2), (world[2].curedNum / world[2].confirmedNum * 100).toFixed(2), (world[3].curedNum / world[3].confirmedNum * 100).toFixed(2), (world[7].curedNum / world[7].confirmedNum * 100).toFixed(2), (world[8].curedNum / world[8].confirmedNum * 100).toFixed(2))
            curedNum.push(world[0].curedNum, world[2].curedNum,
                world[3].curedNum, world[7].curedNum, world[8].curedNum)
            console.log(rate)
            myChart.setOption(option);

        }
    });
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['2011年', '2012年']
        },
        grid: {
            left: '4%',
            right: '4%',
            bottom: '-10%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            show: false
        },
        yAxis: [{
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#fff"
                },
                inverse: true,
                type: 'category',
                data: ['美国', '俄罗斯', '巴西', '印度', '秘鲁']
            },
            {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#fff"
                },
                inverse: true,
                type: 'category',
                data: curedNum
            },
        ],
        series: [{
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: rate,
                barCategoryGap: 50,
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function(params) {
                            return myColor[params.dataIndex];
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: "inside",
                        formatter: "{c}%"
                    }
                }
            },
            {
                name: '框',
                type: 'bar',
                barCategoryGap: 50,
                barWidth: 15,
                yAxisIndex: 1,
                itemStyle: {
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 3,
                    barBorderRadius: 15
                },
                data: [100, 100, 100, 100, 100]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

(function() {
    var day = [],
        num = []
    $.ajax({
        type: 'post',
        url: 'https://route.showapi.com/2217-3',
        dataType: 'json',
        data: {
            "showapi_timestamp": formatterDateTime(),
            "showapi_appid": '300816', //这里需要改成自己的appid
            "showapi_sign": '0b956dbeabe848b8a06b46cb0b8ab8a2', //这里需要改成自己的应用的密钥secret
        },

        error: function(XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败!");
        },
        success: function(result) {
            console.log(result) //console变量在ie低版本下不能用
            world = result.showapi_res_body.historyList
            console.log(world)
            day.push(world[6].date.substr(5), world[5].date.substr(5), world[4].date.substr(5), world[3].date.substr(5), world[2].date.substr(5), world[1].date.substr(5), world[0].date.substr(5))
            num.push(world[6].suspectedIncr, world[5].suspectedIncr, world[4].suspectedIncr, world[3].suspectedIncr, world[2].suspectedIncr, world[1].suspectedIncr, world[0].suspectedIncr)
            console.log(day)
            myChart.setOption(option);

        }
    });
    var myChart = echarts.init(document.querySelector(".line .chart"))
    var option = {
        tooltip: {
            trigger: "axis"
        },
        legend: {
            textStyle: {
                color: "#4c9bfd"
            },
            right: "10%"
        },
        grid: {
            top: "20%",
            left: "3%",
            right: "6%",
            bottom: "3%",
            show: true,
            borderColor: "#012f4a",
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: day,
            axisTick: {
                show: false // 去除刻度线
            },
            axisLabel: {
                color: "#4c9bfd" // 文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false // 去除刻度线
            },
            axisLabel: {
                color: "#4c9bfd" // 文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            },
            splitLine: {
                lineStyle: {
                    color: "#012f4a"
                }
            }
        },
        series: [{
            name: "新增疑似病例",
            data: num,
            type: 'line',
            smooth: true
        }]
    };
    myChart.setOption(option)
    window.addEventListener("resize", function() {
        myChart.resize();
    })
})();

(function() {
    var dayData = [{
            country: "美国",
            data: [
                // 两个数组是因为有两条线
                [568, 1362, 1311, 1203, 1290, 976, 534],
                [66581, 34882, 58457, 36531, 40299, 21503, 26231]
            ]
        },
        {
            country: "俄罗斯",
            data: [
                // 两个数组是因为有两条线
                [79, 144, 139, 116, 119, 129, 77],
                [3420, 7878, 7555, 7331, 7235, 6615, 3215]
            ]
        },
        {
            country: "巴西",
            data: [
                // 两个数组是因为有两条线
                [572, 1394, 1322, 1226, 1058, 841, 593],
                [28268, 58448, 49870, 27023, 20734, 25899, 24167]
            ]
        },
        {
            country: "印度",
            data: [
                // 两个数组是因为有两条线
                [810, 849, 919, 899, 940, 875, 1013],
                [43212, 51220, 45540, 50184, 50285, 52135, 54474]
            ]
        },
        {
            country: "秘鲁",
            data: [
                // 两个数组是因为有两条线
                [197, 196, 221, 196, 225, 195, 228],
                [3904, 4366, 3973, 3907, 3995, 4839, 4849]
            ]
        }
    ];
    var myChart = echarts.init(document.querySelector(".line2 .chart"));
    var option = {
        tooltip: {
            trigger: "axis"
        },
        legend: {
            top: "0%",
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },

        grid: {
            left: "10",
            top: "30",
            right: "10",
            bottom: "10",
            containLabel: true
        },
        xAxis: [{
            type: "category",
            boundaryGap: false,
            // x轴更换数据
            data: [
                "8.3",
                "8.4",
                "8.5",
                "8.6",
                "8.7",
                "8.8",
                "8.9",
            ],
            // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },
            // x轴线的颜色为   rgba(255,255,255,.2)
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.2)"
                }
            }
        }],
        yAxis: [{
            type: "value",
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },
            // 修改分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            }
        }],
        series: [{
                name: "新增死亡",
                type: "line",
                smooth: true,
                // 单独修改当前线条的样式
                lineStyle: {
                    color: "#0184d5",
                    width: "2"
                },
                // 填充颜色设置
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1, [{
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                },
                // 设置拐点
                symbol: "circle",
                // 拐点大小
                symbolSize: 8,
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                data: [568, 1362, 1311, 1203, 1290, 976, 534]
            },
            {
                name: "新增治愈",
                type: "line",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: "#00d887",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1, [{
                                    offset: 0,
                                    color: "rgba(0, 216, 135, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(0, 216, 135, 0.1)"
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                // 设置拐点 小圆点
                symbol: "circle",
                // 拐点大小
                symbolSize: 5,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                data: [66581, 34882, 58457, 36531, 40299, 21503, 26231]
            }
        ]
    };
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });

    $(".line2 h3").on("click", "a", function() {
        // alert(1);
        // console.log($(this).index());
        // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
        // console.log(yearData[$(this).index()]);
        var obj = dayData[$(this).index()];
        $(this).css("color", "blue").siblings().css("color", "white")
        option.series[0].data = obj.data[0];
        option.series[1].data = obj.data[1];
        // 需要重新渲染
        myChart.setOption(option);
    });
})();

(function() {
    var myChart = echarts.init(document.querySelector(".pie .chart"))
    var option = {
        color: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6", "#00d887"],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            bottom: "0%",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        series: [{
            name: '各州感染人数',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 6110070, name: '北美洲' },
                { value: 4880114, name: '南美洲' },
                { value: 5241172, name: '亚洲' },
                { value: 3056288, name: '欧洲' },
                { value: 1067211, name: '非洲' },
                { value: 23745, name: '大洋洲' }
            ]
        }]
    };
    myChart.setOption(option)
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

// 饼形图2 地区分布模块
(function() {
    var myChart = echarts.init(document.querySelector(".pie2 .chart"));
    var option = {
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            bottom: "0%",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "10"
            }
        },
        series: [{
            name: "地区分布",
            type: "pie",
            radius: ["10%", "70%"],
            center: ["50%", "45%"],
            roseType: "radius",
            // 图形的文字标签
            label: {
                fontSize: 10
            },
            // 链接图形和文字的线条
            labelLine: {
                // length 链接图形的线条
                length: 6,
                // length2 链接文字的线条
                length2: 8
            },
            data: [
                { value: 456, name: "上海" },
                { value: 387, name: "黑龙江" },
                { value: 310, name: "广东" },
                { value: 182, name: "内蒙古" },
                { value: 176, name: "北京" },
                { value: 96, name: "陕西" },
                { value: 77, name: "甘肃" },
                { value: 75, name: "四川" }
            ]
        }]
    };
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

(function() {
    var myChart = echarts.init(document.querySelector(".map .chart"))
    window.dataList = [{
            name: "南海诸岛",
            value: 0
        },
        {
            name: '北京',
            value: 935
        },
        {
            name: '天津',
            value: 205
        },
        {
            name: '上海',
            value: 798
        },
        {
            name: '重庆',
            value: 583
        },
        {
            name: '河北',
            value: 350
        },
        {
            name: '河南',
            value: 1276
        },
        {
            name: '云南',
            value: 191
        },
        {
            name: '辽宁',
            value: 261
        },
        {
            name: '黑龙江',
            value: 948
        },
        {
            name: '湖南',
            value: 1019
        },
        {
            name: '安徽',
            value: 991
        },
        {
            name: '山东',
            value: 817
        },
        {
            name: '新疆',
            value: 875
        },
        {
            name: '江苏',
            value: 659
        },
        {
            name: '浙江',
            value: 1275
        },
        {
            name: '江西',
            value: 932
        },
        {
            name: '湖北',
            value: 68139
        },
        {
            name: '广西',
            value: 255
        },
        {
            name: '甘肃',
            value: 169
        },
        {
            name: '山西',
            value: 201
        },
        {
            name: '内蒙古',
            value: 259
        },
        {
            name: '陕西',
            value: 341
        },
        {
            name: '吉林',
            value: 157
        },
        {
            name: '福建',
            value: 368
        },
        {
            name: '贵州',
            value: 147
        },
        {
            name: '广东',
            value: 1705
        },
        {
            name: '青海',
            value: 18
        },
        {
            name: '西藏',
            value: 1
        },
        {
            name: '四川',
            value: 616
        },
        {
            name: '宁夏',
            value: 75
        },
        {
            name: '海南',
            value: 171
        },
        {
            name: '台湾',
            value: 480
        },
        {
            name: '香港',
            value: 4181
        },
        {
            name: '澳门',
            value: 46
        }
    ];
    var option = {
        tooltip: {
            triggerOn: "click",
            formatter: function(e, t, n) {
                return .5 == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
            }
        },
        visualMap: {
            min: 0,
            max: 1000,
            left: 26,
            bottom: 40,
            showLabel: !0,
            text: ["高", "低"],
            pieces: [{
                gt: 100,
                label: "> 100 人",
                color: "#7f1100"
            }, {
                gte: 10,
                lte: 100,
                label: "10 - 100 人",
                color: "#ff5428"
            }, {
                gte: 1,
                lt: 10,
                label: "1 - 9 人",
                color: "#ff8c71"
            }, {
                gt: 0,
                lt: 1,
                label: "疑似",
                color: "#ffd768"
            }, {
                value: 0,
                color: "#ffffff"
            }],
            show: !0
        },
        geo: {
            map: "china",
            roam: !1,
            scaleLimit: {
                min: 1,
                max: 2
            },
            zoom: 1,
            top: 120,
            label: {
                normal: {
                    show: !0,
                    fontSize: "14",
                    color: "rgba(0,0,0,0.7)"
                }
            },
            itemStyle: {
                normal: {
                    //shadowBlur: 50,
                    //shadowColor: 'rgba(0, 0, 0, 0.2)',
                    borderColor: "rgba(0, 0, 0, 0.2)"
                },
                emphasis: {
                    areaColor: "#f2d5ad",
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    borderWidth: 0
                }
            }
        },
        series: [{
            name: "确诊病例",
            type: "map",
            geoIndex: 0,
            data: window.dataList
        }]
    };
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})()