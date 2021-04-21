import Vue from 'vue'
import Router from 'vue-router'
// 사용자관리->사용자 정보
import UserInfo from '../userManagement/UserInfo'
// 통계 -> 처리현황, , , 리포트설정
import ProceStatus from '../statistics/ProceStatus'
import HourlyStatistics from '../statistics/HourlyStatistics'
import RegionalStatistics from '../statistics/RegionalStatistics'

import ReportSetting from '../statistics/ReportSetting'
// 로그
import EventLog from '../log/EventLog'
import SystemLog from '../log/SystemLog'



Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path:'/chart',
    //   name : Chart,
    //   component : Chart
    // },
    // 사용자관리
    {
      path: '/userinfo',
      name: UserInfo,
      component: UserInfo
    },
    // 통계
    {
      path: '/procestatus',
      name: ProceStatus,
      component: ProceStatus
    },
    {
      path: '/hourlystatistics',
      name: HourlyStatistics,
      component: HourlyStatistics
    },
    {
      path: '/regionalstatistics',
      name: RegionalStatistics,
      component: RegionalStatistics
    },
    {
      path: '/reportsetting',
      name: ReportSetting,
      component: ReportSetting
    },
    {
      path:'/eventlog',
      name: EventLog,
      component: EventLog
    },
    {
      path: '/systemlog',
      name: SystemLog,
      component: SystemLog
    },      
  ]
})
