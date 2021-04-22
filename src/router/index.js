import Vue from 'vue'
import Router from 'vue-router'
// 사용자관리->사용자 정보
import UserInfo from '../userManagement/UserInfo'
// 통계 -> 처리현황, , , 리포트설정
import ProceStatus from '../statistics/ProceStatus'
import HourlyStatistics from '../statistics/HourlyStatistics'
import RegionalStatistics from '../statistics/RegionalStatistics'
import FailureReportStatistics from '../statistics/FailureReportStatistics'
import ReportSetting from '../statistics/ReportSetting'
// 로그
import EventLog from '../log/EventLog'
import SystemLog from '../log/SystemLog'


import RecoinfoForm from '@/components/RecodingInfo/RecoinfoForm'
import CCTVInfoForm from "@/components/CCTV/CCTVInfoForm"
import CCTVGroupForm from "@/components/CCTV/CCTVGroupForm"
import ControlGroupForm from "@/components/CCTV/ControlGroupForm"
import RTSPInfoForm from '@/components/CCTV/RTSPInfoForm.vue'
import FixReportForm from '@/components/CCTV/FixReportForm.vue'
import CameraHealthForm from '@/components/CCTV/CameraHealthForm.vue'

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
      path: '/failurereportstatistics',
      name: FailureReportStatistics,
      component: FailureReportStatistics
    },
    {
      path: '/reportsetting',
      name: ReportSetting,
      component: ReportSetting
    },
    // 로그
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
    
    // 정수 추가
    { // 1-1.녹화장치 정보
      path: '/RecoinfoForm',
      name: 'RecoinfoForm',
      component: RecoinfoForm
    },
    { // 2-1 카메라 목록
      path: '/CCTVInfoForm',
      name: 'CCTVInfoForm',
      component: CCTVInfoForm
    },
    {
      path: '/CCTVGroupForm',
      name: 'CCTVGroupForm',
      component: CCTVGroupForm
    },
    {
      path: '/ControlGroupForm',
      name: 'ControlGroupForm',
      component: ControlGroupForm
    },
    {
      path: '/RTSPInfoForm',
      name: 'RTSPInfoForm',
      component: RTSPInfoForm
    },
    {
      path: '/FixReportForm',
      name: 'FixReportForm',
      component: FixReportForm
    },    {
      path: '/CameraHealthForm',
      name: 'CameraHealthForm',
      component: CameraHealthForm
    }
  ]
})
