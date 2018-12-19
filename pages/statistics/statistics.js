// pages/statistics/statistics.js
import * as echarts from '../../ec-canvas/echarts.js'
let app = getApp();
let api = require('../../utils/api.js');
let util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    narrowIcon: false,
    narrowIcon2: true,
    day: 0,
    num: true,
    ec: {
      onInit: initChart
    },
    more: 0,
    mores: 0,
  },

  //日期切换
  dayTap: function (e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      day: id,
      narrowIcon: false,
      narrowIcon2: true,
    })
  },

  //日的函数
  dayPrev: function () {
    this.setData({
      narrowIcon: true,
      narrowIcon2: true,
    })
    this.reduceTime()
  },
  dayNext: function () {
    if(this.data.dates == this.data.date){
      wx.showToast({
        title:"只能为当前日期",
        icon:"none",
        duration:1000
      })
      return false;
    }
    this.setData({
      narrowIcon2: false,
      narrowIcon: false,
    })
    this.addTime()
  },

  //周的函数
  weekPrev: function () {
    this.setData({
      narrowIcon: true,
      narrowIcon2: true,
    })
    this.lastWeek();
    this.nowWeek()
  },
  weekNext: function () {
    if (this.data.endDate == this.data.dates) {
      wx.showToast({
        title: "只能为当前日期",
        icon: "none",
        duration: 1000
      })
      return false;
    }
    this.setData({
      narrowIcon2: false,
      narrowIcon: false,
    })
    this.nextWeek();
    this.nowWeek();
  },

  //月的函数
  monthPrev:function(){
    this.setData({
      narrowIcon: true,
      narrowIcon2: true,
    })
    this.nowMonth();
    this.reduceMonth();
    this.dataDay();
  },
  monthNext:function(){
    if (this.data.dates.substring(0, 7) == this.data.monthDate) {
      wx.showToast({
        title: "只能为当前日期",
        icon: "none",
        duration: 1000
      })
      return false;
    }
    this.setData({
      narrowIcon2: false,
      narrowIcon: false,
    })
    this.nowMonth();
    this.addMonth();
    this.dataDay();
    
  },

  //款项明细
  moneyDetail: function () {
    wx.navigateTo({
      url: '/pages/statisticsMoneyDetail/statisticsMoneyDetail'
    })
  },

  //销量排行
  saleTap: function () {
    this.setData({
      num: !(this.data.num)
    })
  },
  //查看更多
  onMore: function () {
    let page = this;
    wx.showLoading({
      title: '加载中'
    })
    setTimeout(function () {
      wx.hideLoading()
      page.setData({
        more: 1
      })
    }, 1500)
  },
  onMores: function () {
    let page = this;
    wx.showLoading({
      title: '加载中'
    })
    setTimeout(function () {
      wx.hideLoading()
      page.setData({
        mores: 1
      })
    }, 1500)
  },

  //一天的数据统计
  dataDay: function () {
    let page = this;
    let one_day = page.data.date;
    console.log(this.data.startMonth, this.data.endMonth)
    const data = {
      one_day
    }
    api.statisticsDay({
      data,
      success: function (res) {
        console.log(res)
        if(res.data.data.length == 0){
          page.setData({
            pay_money:0,
            pay_person: 0,
            avg_price: 0,
            conversion: 0,
            order_num: 0,
            pay_order_num: 0
          })
        }else{
          page.setData({
            dataDay: res.data.data,
            pay_money: dataDay.pay_money,
            pay_person: dataDay.pay_person,
            avg_price: dataDay.avg_price,
            conversion: dataDay.conversion,
            order_num: dataDay.order_num,
            pay_order_num: dataDay.pay_order_num,
            sale_num_rank: res.data.data.sale_num_rank,
            sale_money_rank: res.data.data.sale_money_rank
          })
        }
      }
    })
  },

  onLoad: function () {
    let page = this;
    let date = (util.dateTime(new Date())).replace(/\//g, '.');
    page.setData({
      date:date,
      dates:date,
      weekDate:date,
      monthDate:date
    })
    page.nowWeek();
    page.nowMonth();
    page.dataDay();
  },


  //加一天时间
  addTime: function () {
    var date = this.data.date;
    var timestamp = Date.parse(new Date(date));
    timestamp = timestamp / 1000;
    var tomorrow_timetamp = timestamp + 24 * 60 * 60;
    //加一天的时间：  
    var n_to = tomorrow_timetamp * 1000;
    var tomorrow_date = new Date(n_to);
    //加一天后的年份  
    var Y_tomorrow = tomorrow_date.getFullYear();
    //加一天后的月份  
    var M_tomorrow = (tomorrow_date.getMonth() + 1 < 10 ? '0' + (tomorrow_date.getMonth() + 1) : tomorrow_date.getMonth() + 1);
    //加一天后的日期  
    var D_tomorrow = tomorrow_date.getDate() < 10 ? '0' + tomorrow_date.getDate() : tomorrow_date.getDate();
    var day_tomorrow = (Y_tomorrow + '.' + M_tomorrow + '.' + D_tomorrow);
    this.setData({
      date: day_tomorrow
    })
  },

  //减一天时间
  reduceTime: function () {
    var date = this.data.date;
    var timestamp = Date.parse(new Date(date));
    timestamp = timestamp / 1000;
    var yesterday_timetamp = timestamp - 24 * 60 * 60;
    //加一天的时间：  
    var n_to = yesterday_timetamp * 1000;
    var yesterday_date = new Date(n_to);
    //加一天后的年份  
    var Y_yesterday = yesterday_date.getFullYear();
    //加一天后的月份  
    var M_yesterday = (yesterday_date.getMonth() + 1 < 10 ? '0' + (yesterday_date.getMonth() + 1) : yesterday_date.getMonth() + 1);
    //加一天后的日期  
    var D_yesterday = yesterday_date.getDate() < 10 ? '0' + yesterday_date.getDate() : yesterday_date.getDate();
    var day_yesterday = (Y_yesterday + '.' + M_yesterday + '.' + D_yesterday);
    this.setData({
      date: day_yesterday
    })
  },

  //上周的今天的时间
  lastWeek: function () {
    var date = this.data.weekDate;
    var timestamp = Date.parse(new Date(date));
    timestamp = timestamp / 1000;
    var yesterday_timetamp = timestamp - 24 * 60 * 60 * 7;
    //加一天的时间：  
    var n_to = yesterday_timetamp * 1000;
    var yesterday_date = new Date(n_to);
    //加一天后的年份  
    var Y_yesterday = yesterday_date.getFullYear();
    //加一天后的月份  
    var M_yesterday = (yesterday_date.getMonth() + 1 < 10 ? '0' + (yesterday_date.getMonth() + 1) : yesterday_date.getMonth() + 1);
    //加一天后的日期  
    var D_yesterday = yesterday_date.getDate() < 10 ? '0' + yesterday_date.getDate() : yesterday_date.getDate();
    var weekDate = (Y_yesterday + '.' + M_yesterday + '.' + D_yesterday);
    this.setData({
      weekDate
    })
  },

  //下周的今天的时间
  nextWeek: function () {
    var date = this.data.weekDate;
    var timestamp = Date.parse(new Date(date));
    timestamp = timestamp / 1000;
    var yesterday_timetamp = timestamp + 24 * 60 * 60 * 7;
    //加一天的时间：  
    var n_to = yesterday_timetamp * 1000;
    var yesterday_date = new Date(n_to);
    //加一天后的年份  
    var Y_yesterday = yesterday_date.getFullYear();
    //加一天后的月份  
    var M_yesterday = (yesterday_date.getMonth() + 1 < 10 ? '0' + (yesterday_date.getMonth() + 1) : yesterday_date.getMonth() + 1);
    //加一天后的日期  
    var D_yesterday = yesterday_date.getDate() < 10 ? '0' + yesterday_date.getDate() : yesterday_date.getDate();
    var weekDate = (Y_yesterday + '.' + M_yesterday + '.' + D_yesterday);
    this.setData({
      weekDate
    })
  },

  //本周的时间
  nowWeek: function () {
    var now = (util.dateTime(new Date())).replace(/\//g, '.');
    var weekDate = this.data.weekDate;
    var newDate = new Date(weekDate);
    var toWeek = newDate.getDay();
    //上周日距离今天的天数（负数表示）  
    var stepSunDay = -toWeek + 1;
    // 如果今天是周日  
    if (toWeek == 0) {
      stepSunDay = -7;
    }
    // 周一距离今天的天数（负数表示）  
    var stepMonday = 7 - toWeek;
    var time = newDate.getTime();
    var monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
    var sunday = new Date(time + stepMonday * 24 * 3600 * 1000);
    //本周一的日期 （起始日期）  
    var startDate = transferDate(monday); // 日期变换  
    //本周日的日期
    var endDate = transferDate(sunday)
    if (now<endDate){
      this.setData({
        startDate,
        endDate: now
      })
    }else{
      this.setData({
        startDate,
        endDate,
      })
    }
  },

  //下月时间
  addMonth: function () {
    var endDay = this.data.endDay;
    var monthDate = this.data.monthDate;
    var timestamp = Date.parse(new Date(monthDate));
    timestamp = timestamp / 1000;
    var tomorrow_timetamp = timestamp + 24 * 60 * 60 * endDay;
    //加一天的时间：  
    var n_to = tomorrow_timetamp * 1000;
    var tomorrow_date = new Date(n_to);
    //加一天后的年份  
    var Y_tomorrow = tomorrow_date.getFullYear();
    //加一天后的月份  
    var M_tomorrow = (tomorrow_date.getMonth() + 1 < 10 ? '0' + (tomorrow_date.getMonth() + 1) : tomorrow_date.getMonth() + 1);
    //加一天后的日期  
    var D_yesterday = tomorrow_date.getDate() < 10 ? '0' + tomorrow_date.getDate() : tomorrow_date.getDate();
    var monthDate = (Y_tomorrow + '.' + M_tomorrow);
    var endMonth = (Y_tomorrow + '.' + M_tomorrow + '.' + D_yesterday);    
    var startMonth = transferDate(new Date(tomorrow_date.setDate(1)));  
    this.setData({
      monthDate,
      endDay,
      endMonth,      
      startMonth,
    })
  },

  //上月时间
  reduceMonth: function () {
    var endDay = this.data.endDay;
    var monthDate = this.data.monthDate;
    var timestamp = Date.parse(new Date(monthDate));
    timestamp = timestamp / 1000;
    var tomorrow_timetamp = timestamp - 24 * 60 * 60 ;
    //加一天的时间：  
    var n_to = tomorrow_timetamp * 1000;
    var yesterday_date = new Date(n_to);
    //加一天后的年份  
    var Y_tomorrow = yesterday_date.getFullYear();
    //加一天后的月份  
    var M_tomorrow = (yesterday_date.getMonth() + 1 < 10 ? '0' + (yesterday_date.getMonth() + 1) : yesterday_date.getMonth() + 1);
    //加一天后的日期  
    var D_yesterday = yesterday_date.getDate() < 10 ? '0' + yesterday_date.getDate() : yesterday_date.getDate();
    var monthDate = (Y_tomorrow + '.' + M_tomorrow);
    var endMonth = (Y_tomorrow + '.' + M_tomorrow + '.' + D_yesterday);
    var startMonth = transferDate(new Date(yesterday_date.setDate(1)));    
    this.setData({
      monthDate,
      endDay,
      endMonth,
      startMonth
    })
  },
  
  //当月的时间
  nowMonth: function () {
    var monthDate = this.data.monthDate
    // 获取当前月的第一天  
    var start = new Date(monthDate);
    start.setDate(1);

    // 获取当前月的最后一天  
    var date = new Date(monthDate);
    var currentMonth = date.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    var end = new Date(nextMonthFirstDay - oneDay);
    var endDay = end.getDate();

    var startMonth = transferDate(start); // 日期变换  
    var endMonth = transferDate(end); // 日期变换
    var monthDate = startMonth.substring(0, 7);
    this.setData({
      startMonth,
      endMonth,
      endDay,
      monthDate,
    })
  },

})

//客流统计分析
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    legend: {
      data: ['店铺浏览量', '商品详情浏览人数']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '店铺浏览量',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [120, 132, 101, 134, 90, 230, 210],
        itemStyle: {
          normal: {
            barBorderColor: '#37a2da',
            color: '#37a2da'
          }
        },
      },
      {
        name: '商品详情浏览人数',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [220, 182, 191, 234, 290, 330, 310],
        itemStyle: {
          normal: {
            barBorderColor: '#ffdb5c',
            color: '#ffdb5c'
          }
        },
      }
    ]
  };
  chart.setOption(option);
  return chart;
}



function transferDate(date) {
  // 年  
  var year = date.getFullYear();
  // 月  
  var month = date.getMonth() + 1;
  // 日  
  var day = date.getDate();

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  var dateString = year + '.' + month + '.' + day;
  return dateString;
}