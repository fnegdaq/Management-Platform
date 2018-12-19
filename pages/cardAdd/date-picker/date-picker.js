// pages/date-picker/date-picker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dateData()
  },

  //选择日期
  selectday: function (e) {
    var index = e.currentTarget.dataset.index;
    var indexs = e.currentTarget.dataset.indexs;
    var $dates = wx.getStorageSync('date');
    var $days = $dates[index][indexs];
    var select = $days.selected;
    wx.setStorageSync('year', $days.year)
    wx.setStorageSync('month', $days.month)
    wx.setStorageSync('day', $days.day)
    if (wx.getStorageSync('date') != "") {
      $dates[index][indexs].selected = 1
      this.setData({
        date: $dates
      })
    }
  },

  //保存日期
  submitbtn: function () {
    var $year = wx.getStorageSync('year');
    var $month = wx.getStorageSync('month');
    var $day = wx.getStorageSync('day');
    var _date = $year + "." + $month + "." + $day;
    wx.setStorageSync('_date',_date)
    if ($month < 10 && $day < 10) {
      $month = '0' + $month
      $day = '0' + $day
    } else if ($month < 10) {
      $month = '0' + $month
    } else if ($day < 10) {
      $day = '0' + $day
    }
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      year: $year,
      month: $month,
      day: $day,
    });
    wx.navigateBack({});
    wx.setStorageSync('dateid',1)
  },



  //日期插件
  dateData: function () {
    let dataAll = []//总日历数据
    let dataAll2 = []//总日历数据
    let dataMonth = []//月日历数据
    let date = new Date//当前日期
    let year = date.getFullYear()//当前年
    let week = date.getDay();//当天星期几
    let weeks = []
    let month = date.getMonth() + 1//当前月份
    let day = date.getDate()//当天
    let daysCount = 100//一共显示多少天
    let dayscNow = 0//计数器
    let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]//月份列表
    let nowMonthList = []//本年剩余年份
    //本年剩余月份
    for (let i = month; i < 13; i++) {
      nowMonthList.push(i)
    }
    //当前年
    let yearList = [year];
    //年份最大可能
    for (let i = 0; i < daysCount / 365 + 2; i++) {
      yearList.push(year + i + 1)
    }
    let leapYear = function (Year) {//判断是否闰年 
      if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return (true);
      } else { return (false); }
    }
    for (let i = 0; i < yearList.length; i++) {//遍历年
      let mList
      if (yearList[i] == year) {//判断当前年份
        mList = nowMonthList
      } else {
        mList = monthList
      }
      for (let j = 0; j < mList.length; j++) {//循环月份
        dataMonth = []
        let t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let t_days_thisYear = []  //某年某月有多少天（30还是31或28、29）
        if (yearList[i] == year) {
          for (let m = 0; m < nowMonthList.length; m++) {
            t_days_thisYear.push(t_days[mList[m] - 1])
          }
          t_days = t_days_thisYear
        } else {
          t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        }
        for (let k = 0; k < t_days[j]; k++) {//循环每天
          dayscNow++
          let nowData
          if (dayscNow < daysCount) {//如果计数器没满
            let days = k + 1
            if (days < 10) {
              days = "0" + days
            }
            nowData = {//组装自己需要的数据
              year: yearList[i],
              month: mList[j],
              day: k + 1,
              date: yearList[i] + "" + mList[j] + days,
              selected: 0,
              re: yearList[i] + "-" + mList[j] + "-" + days,
            }
            dataMonth.push(nowData)
            if (k == 0) {
              let date = new Date(yearList[i] + "-" + mList[j] + "-" + k + 1)
              let weekss = date.getDay()//获取每个月第一天是周几
              weeks.push(weekss)
            }
          } else {
            break
          }
        }
        dataAll.push(dataMonth)
      }
    }
    for (let i = 0; i < dataAll.length; i++) {
      if (dataAll[i].length != 0) {
        dataAll2.push(dataAll[i]);
      }
    }
    this.setData({
      date: dataAll2,
      weeks: weeks
    })
    wx.setStorageSync('date', this.data.date);
  },
})