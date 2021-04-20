import Vue from 'vue'
import Router from 'vue-router'
// 사용자관리->사용자 정보
import UserInfo from '../userManagement/UserInfo'
// 통계 -> 처리현황, , , 리포트설정
import ProceStatus from '../statistics/ProceStatus'

import RegionalStatistics from '../statistics/RegionalStatistics'
import ReportSetting from '../statistics/ReportSetting'
// 로그
import EventLog from '../systemLog/EventLog'
import SystemLog from '../systemLog/SystemLog'



Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path:'/chart',
    //   name : Chart,
    //   component : Chart
    // },
    {
      path: '/userinfo',
      name: UserInfo,
      component: UserInfo
    },
    {
      path: '/procestatus',
      name: ProceStatus,
      component: ProceStatus
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
    },{
      path: '/systemlog',
      name: SystemLog,
      component: SystemLog
    }
    
  ]
})
