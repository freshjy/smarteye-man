<template>

<div div id="app">
    <div class="pageTitle"> 
        처리 현황 통계
    </div>
    <div>
        검색기간
        <!-- <input type="text" class='datepicker-here'  v-model="firstDate"  data-timepicker="true" data-language='ko'  timeFormat= "hh:ii"/> ~ 
        <input type="text" class='datepicker-here'  v-model="lastDate"  data-timepicker="true" data-language='ko'  timeFormat= "hh:ii aa"/> -->
        <input type="date" v-model="firstDate"/><input type="time" v-model="firstTime"/> ~ 
        <input type="date" v-model="lastDate"/><input type="time" v-model="lastTime"/>
        
        {{firstDate + " " + firstTime}}
        {{lastDate + " " + lastTime}}
    </div>
    <div>
        CCTV
        <select name="selectingCCTV" v-model="cctvId">
            <option v-for="(cctvs, index) in getCCTVs" :key="index" v-bind:value="cctvs.id">
                {{cctvs.cctv + cctvs.id}}
            </option>
        </select>
        <button v-on:click="addCCTV(cctvId)">추가</button>
    </div>

    <span v-for="(cctv,index) in cctvsNameArr" :key="cctv">
        {{cctv}}
        <span class="cctvRemove" type="button" v-on:click="removeCCTV(index)">
            <i class="closeBtn fas fa-times"></i>
        </span>
    </span>

    <div>
        관제사
        <select name="selectingCCTV" v-model="controllerId" >
            <option v-for="(controllers, index) in getControllers" :key="index" v-bind:value="controllers.id">
                {{controllers.firstName + controllers.lastName + controllers.id}}
            </option>
        </select>
        <button v-on:click="addController(controllerId)">추가</button>
        <div class="searchBtn">
            <button v-on:click="searchProcess()">
                조회
            </button>
            <button>
                내보내기
            </button>
        </div>
    </div>
    
    <span v-for="(controller, index) in controllersNameArr"  :key="index" >
        {{controller}}
        <span class="cctvRemove" type="button" v-on:click="removeController(index)">
            <i class="closeBtn fas fa-times"></i>
        </span>
    </span>

    
    
    <div>
        <table class="firstTable">
            <thead>
                <tr class="tTitle1">
                    <th>CCTV</th>
                    <th>관제사</th>
                    <th>이벤트 타입</th>
                    <th>처리 상황</th>
                </tr>
            </thead>
            <tbody>
                <tr class="tBody1" v-for="(value,index) in printProcess" :key="index">
                    <td>{{value.cctvName}}</td>
                    <td>{{value.controller}}</td>
                    <td>{{value.eventType}}</td>
                    <td>{{value.processSitu}}</td>
                </tr>
            </tbody>
        </table>
        <table class="secondTable">
            <thead>
                <tr class="tTitle2">
                    <th>차트</th>
                </tr>
            </thead>
            <tbody>
                <tr class="tBody2">
                    <!-- <td><pie-chart :data="chartData" :options="chartOptions"></pie-chart></td> -->
                </tr>
            </tbody>
        </table>
    </div>

</div>
</template>


<script>
// import data from '../data/data'
import PieChart from './PieChart'
    
export default {
    // name:"ProceStatus",
    components:{
        PieChart
    },
    data(){
        return{
            firstDate:'',
            lastDate:'',
            firstTime:'',
            lastTime:'',
            dd:[],
            cctvId:'',
            cctvsIdArr:[],
            cctvsNameArr:[],
            controllerId:'',
            controllersIdArr:[],
            controllersNameArr:[],
            controllers:[],
            searchProcessCCTVArr:[],
            searchProcessControllerArr:[],
            getCCTVs:[],
            getControllers:[],
            printProcess:[],
            saveCid: []
        }
    },
    methods:{
        getCCTVsToJson(){
            this.$http.get('http://localhost:3000/cctvs')
            .then((res) => {
                //console.log('getCCTVs:', res.data)
                this.getCCTVs = res.data
            })            
        },
        getControllerToJson(){
            this.$http.get('http://localhost:3000/staData')
            .then((res) => {
                //console.log('getCotrollers:', res.data)
                this.getControllers = res.data
            })
        },
        isExistCCTV(cctvId){
            var returnFlag = false;
            for(var i in this.cctvsIdArr){
                if(this.cctvsIdArr[i] == cctvId){
                    returnFlag = true;
                }
            }
            //console.log(returnFlag);
            return returnFlag;
        },
        isExistController(controllerId){
            var returnFlag = false;
            for(var i in this.controllersIdArr){
                if(this.controllersIdArr[i] == controllerId){
                    returnFlag = true;
                }
            }
            //console.log(returnFlag);
            return returnFlag;
        },
        addCCTV(cctvId){
            if(!this.isExistCCTV(cctvId)){
                this.cctvsIdArr.push(cctvId);
                for(var i=0; i<this.getCCTVs.length; i++){
                    if(cctvId==this.getCCTVs[i].id){
                        this.cctvsNameArr.push(this.getCCTVs[i].cctv+cctvId);
                    }
                }
            }else{
                alert("이미 선택한 CCTV그룹입니다.");
            }
        },
        addController(controllerId){
            if(!this.isExistController(controllerId)){
                this.controllersIdArr.push(controllerId);
                for(var i=0; i<this.getControllers.length; i++){
                    if(controllerId==this.getControllers[i].id){
                        this.controllersNameArr.push(this.getControllers[i].firstName+this.getControllers[i].lastName+controllerId);
                    }
                }
            }else{
                alert("이미 선택한 관제사입니다.");
            }
        },
        removeCCTV(index){
            this.cctvsIdArr.splice(index,1);
            this.cctvsNameArr.splice(index,1);
            this.searchProcessCCTVArr.splice(index,1);
        },
        removeController(index){
            this.controllersIdArr.splice(index,1);
            this.controllersNameArr.splice(index,1);
        },
        searchProcess(){
            this.saveCid.splice(0)
            this.printProcess.splice(0)
            console.log(typeof this.firstDate)
            console.log(typeof this.firstTime)  
            if( (this.cctvsIdArr.length) != 0 ){
                for(var i=0; i<this.cctvsIdArr.length; i++){
                    for(var j=0; j<this.getControllers.length; j++){
                        if(this.cctvsIdArr[i] == this.getControllers[j].cctvId){
                            if(this.saveCid.length==0){
                                this.saveCid.push(this.getControllers[j].id)
                            }else if(this.saveCid.length!=0){
                                if(this.isExistCId(this.cctvsIdArr[i])){
                                    this.saveCid.push(this.getControllers[j].id)
                                }
                            }
                        }
                    }
                }
            }
            if( this.controllersIdArr.length != 0 ){
                for(var i=0; i<this.controllersIdArr.length; i++){
                    for(var j=0; j<this.getControllers.length; j++){
                        if(this.controllersIdArr[i] == this.getControllers[j].id){
                            if(this.saveCid.length==0){
                                this.saveCid.push(this.getControllers[j].id)
                            }else if(this.saveCid.length!=0){
                                if(this.isExistCId(this.controllersIdArr[i])){
                                    this.saveCid.push(this.getControllers[j].id)
                                }
                            }
                        }
                    }
                }
            }

            for(var i=0; i<this.saveCid.length; i++){
                for(var j=0; j<this.getControllers.length; j++){
                    if(this.saveCid[i] == this.getControllers[j].id){
                        this.printProcess.push({
                            cId:this.getControllers[j].id,                            
                            cctvId:this.getControllers[j].cctvId,
                            cctvName:this.getControllers[j].cctvName,
                            controller:this.getControllers[j].firstName+this.getControllers[j].lastName,
                            eventType:this.getControllers[j].eventType,
                            processSitu:this.getControllers[j].processSitu
                            })
                    }
                }
            }           
        },
        getCCTTName(controllerId){
            for(var i=0; i<this.getCCTVs.length; i++){
                if(controllerId == this.getCCTVs[i].id){
                    return this.getCCTVs[i].cctv;
                }
            }            
        },
        isExistCId(cid){
            var returnFlag = true
            for(var i=0; i<this.saveCid.length; i++){
                if(cid == this.saveCid[i]){
                    returnFlag = false
                }
            }
            return returnFlag
        },
    },
    mounted(){
        this.getCCTVsToJson();
        this.getControllerToJson();
    },

}

</script>

<style scoped>

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
