<template lang="">
<div>
    <div class="pageTitle"> 
        고장 리포트 통계
    </div>
    <br/>
    <div>
        검색기간
        <input type="date" v-model="firstDate"/><input type="time" v-model="firstTime"/> ~ 
        <input type="date" v-model="lastDate"/><input type="time" v-model="lastTime"/>
            
        {{firstDate + " " + firstTime}}
        {{lastDate + " " + lastTime}}
    </div>
    <br/>
    <div>
        CCTV
        <select name="selectingCCTV" v-model="cctvName">
            <option v-for="(cctvs,index) in getCCTVNames" :key="index">
                {{cctvs.name}}
            </option>
        </select>
        <button v-on:click="addCCTV(cctvName)">추가</button>
    </div>
    <div class="searchBtn">
            <button v-on:click="searchFailReport(firstDate,firstTime,lastDate,lastTime)">
                조회
            </button>
            <button v-on:click="makeExcelFile()">
                내보내기
            </button>
        </div>
    <span v-for="(cctvName,index) in cctvNames" :key="index">
        {{cctvName}}
        <span class="cctvRemove" type="button" v-on:click="removeCCTV(index)">
            <i class="closeBtn fas fa-times"></i>
        </span>
    </span>
    <br/>
    <br/>
    <br/>
    
    <div>
        <table class="firstTable">
            <thead>
                <tr class="tTitle1">
                    <th>번호</th>
                    <th>보고 일자</th>
                    <th>장치 이름</th>
                    <th>주소</th>
                    <th>수리 현황</th>
                </tr>
            </thead>
            <tbody>
                <tr class="tBody1" v-for="(data,index) in searchData" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{data.date}}</td>
                    <td>{{data.cctvName}}</td>
                    <td>{{data.region}}</td>
                    <td>{{data.repairStat}}</td>
                </tr>
            </tbody>
        </table>
        <table class="secondTable">
            <thead>
                <tr class="tTitle2">
                    <th>월별 통계</th>
                </tr>
            </thead>
            <tbody>
                <tr class="tBody2">
                    <!-- <td v-if='showChart'><pie-chart  :data="chartData" :options="chartOptions"></pie-chart></td>                  -->
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import Xlsx from 'xlsx'

export default {
    components:{

    },
    data(){
        return{
            firstDate:'',
            lastDate:'',
            firstTime:'',
            lastTime:'',

            cctvName:'',
            cctvNames:[],

            getCCTVs:[],
            getCCTVNames:[],

            barStatistic:[0,0,0,0,0,0,0,0,0,0,0,0],
            searchData:[]

        }
    },
    methods:{
        getCCTVsToJson(){
            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                console.log('getCCTVs:', res.data)
                this.getCCTVs = res.data
            })            
        },
        getCCTVInfoToJson(){
            this.$http.get('http://localhost:3000/cctv_info')
            .then((res) => {
                console.log('getCCTVName:', res.data)
                this.getCCTVNames = res.data
            })            
        },
        addCCTV(cctvName){
            if(!this.isExistCCTV(cctvName)){
                this.cctvNames.push(cctvName);
            }else{
                alert("이미 선택한 CCTV그룹입니다.");
            }
        },
        isExistCCTV(cctvName){
            var returnFlag = false;
            for(var i in this.cctvNames){
                if(this.cctvNames[i] == cctvName){
                    returnFlag = true;
                }
            }
            return returnFlag;
        },
        removeCCTV(index){
            this.cctvNames.splice(index,1);
        },
        searchFailReport(firstDate,firstTime,lastDate,lastTime){
            this.searchData.splice(0)
            this.chartArr = [];  // 차트에 들어가는 수 초기화 // 추가해줌!!
            let fDateTime = firstDate+" "+firstTime
            let lDateTime = lastDate+" "+lastTime

            if(!firstDate&&!firstTime&&!lastDate&&!lastTime){
                alert("기간을 입력하세요")
            }else{
                for(let i=0; i<this.getCCTVs.length; i++){
                    if(this.isbetweenDate(fDateTime,lDateTime,this.getCCTVs[i].updated_at)){
                        for(let j=0; j<this.cctvNames.length; j++){
                            if(this.getCCTVs[i].name==this.cctvNames[j]){
                                this.searchData.push({
                                    date:this.getCCTVs[i].updated_at,
                                    cctvName:this.getCCTVs[i].name,
                                    region:this.getCCTVs[i].area1+" "+this.getCCTVs[i].area2+" "+this.getCCTVs[i].area3,
                                    repairStat:this.getCCTVs[i].ptz_control_usage
                                })
                            }
                        }
                    }
                }
            }
            for(let i=0; i<this.searchData.length; i++){
                if(this.searchData[i].repairStat==0){
                    this.searchData[i].repairStat="수리 대기"
                }else if(this.searchData[i].repairStat==1){
                    this.searchData[i].repairStat="수리 완료"
                }
            }
            for(let i=0; i<this.getCCTVs.length; i++){
                let repairNum = Number(this.getCCTVs[i].updated_at.substr(5,2))
                if(repairNum==1){
                    this.barStatistic[repairNum-1]++
                }else if(repairNum==2){
                    this.barStatistic[repairNum-1]++
                }else if(repairNum==3){
                    this.barStatistic[repairNum-1]++
                }else if(repairNum==4){
                    this.barStatistic[repairNum-1]++
                }else if(repairNum==5){
                    this.barStatistic[repairNum-1]++
                }else if(repairNum==6){
                    this.barStatistic[repairNum-1]++
                }else if(repairNum==7){
                    this.barStatistic[repairNum-1]++
                }else if(repairNum==8){
                    this.barStatistic[repairNum-1]++
                }else if(repairNum==9){
                    this.barStatistic[repairNum-1]++
                }else if(repairNum==10){
                    this.barStatistic[repairNum-1]++
                }else if(repairNum==11){
                    this.barStatistic[repairNum-1]++
                }else if(repairNum==12){
                    this.barStatistic[repairNum-1]++
                }
            }
        },
        isbetweenDate(fDateTime,lDateTime,searchDate){
            let returnFlag=false
            const moment = require('moment');
            if(moment(searchDate).isBetween(fDateTime, lDateTime, undefined, '()')){
                returnFlag = true
            }
            return returnFlag
        },








        // 엑셀 내보내기
        makeExcelFile(){
        console.log("엑셀내보내기");
        const workBook = Xlsx.utils.book_new();
        const workSheet = Xlsx.utils.json_to_sheet(this.searchData);
        Xlsx.utils.book_append_sheet(workBook, workSheet, '시트이름');
        Xlsx.writeFile(workBook, '고장리포트통계.xlsx')
        },       
    },
    mounted(){
        this.getCCTVsToJson()
        this.getCCTVInfoToJson()
    }
}

</script>

<style lang="">
table {
    width:100%;
    border-collapse: collapse;
    border: 1px solid black;
    text-align:center;
    table-layout: fixed;
}
tr{
    vertical-align : top;
}
.searchBtn{
    float: right;
}
.tTitle1 {
    border-left: 1px solid;
    border-bottom: 1px solid ;
}
.tTitle2{
    border-bottom: 1px solid ;
}
.tBody2{
    border-left: 1px solid;
}
.firstTable{
    width:60%;
    float:left;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0px;
}
.secondTable{
    width:40%;
    float:right;
    border-left: 1px;
    border-bottom: 1px solid;
}
</style>