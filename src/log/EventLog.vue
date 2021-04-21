<template lang="">
<div id="app">
    <div class="pageTitle"> 
        이벤트 로그
    </div>
    <br/>
    <div>
        검색기간
        <input type="date" v-model="firstDate"/><input type="time" v-model="firstTime"/> ~ 
        <input type="date" v-model="lastDate"/><input type="time" v-model="lastTime"/>
            
        <!-- {{firstDate + " " + firstTime}}
        {{lastDate + " " + lastTime}} -->
    </div>
    <div>
        처리 상태
        <select name="selectingProceStatus" v-model="selProceStat">
            <option v-for="(value, index) in processingStat" :key="index">
               {{value}}
            </option>
        </select>
    </div>
    <br/>

    <div>
        CCTV
        <select name="selectingCCTV" v-model="selCCTVId">
            <option v-for="(cctvs, index) in getCCTVs" :key="index" v-bind:value="cctvs.id">
                {{cctvs.name}}
            </option>
        </select>
        <button v-on:click="addObject()">추가</button>
    </div>

    <!-- <span v-for="(object,index) in objectArr" :key="index+1">
        {{object}}
        <span class="objectRemove" type="button" v-on:click="removeObject(index+1)">
            <i class="closeBtn fas fa-times"></i>
        </span>
    </span>     -->

    <br/>
    <div>
        이벤트 타입
        <select name="selectingEvent" v-model="selEvent">
            <option v-for="(event,index) in eventType" :key="index">
                {{event}}
            </option>
        </select>
        <button v-on:click="addEvent()">추가</button>
        <div class="searchBtn">
            <button v-on:click="searchObjectArea()">
                조회
            </button>
            <button>
                내보내기
            </button>
        </div>
    </div>
    <!-- <span v-for="(area,index) in areaArr" :key="index">
        {{area}}
        <span class="areaRemove" type="button" v-on:click="removeArea(index)">
            <i class="closeBtn fas fa-times"></i>
        </span>
    </span> -->

    <br/>
    <div>
        <table class="tableAll">
            <!-- <colgroup>
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
            </colgroup> -->
            <thead>
                <tr class="tTitle">
                    <th>시간</th>
                    <th>CCTV이름</th>
                    <th>이벤트 타입</th>
                    <th>시(도) 구(군) 동(읍)</th>
                    <th>이벤트 설명</th>
                    <th>처리자</th>
                    <th>처리상태</th>
                    <th>처리설명</th>
                    <th>오브젝트</th>
                </tr>
            </thead>
            <tbody>
                <tr class="tBody" >
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
    </div>

</div>
</template>

<script>
export default {
    components:{

    },
    data(){
        return{
            //json-server로 가져온 CCTV ID,이름 정보
            getCCTVs:[],

            processingStat:["이상없음","미처리","오탐"],
            eventType:["배회","움직임","침입","화제","범람"],
            selCCTVId:'',
            selProceStat:'',
            selEvent:'',
            firstDate:'',
            firstTime:'',
            lastDate:'',
            lastTime:'',  
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
    },
    mounted() {
        this.getCCTVsToJson()
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
.tTitle {
    border: 1px solid black;
    border-bottom: 1px solid ;
    font-size:12px;
}
.tableAll{
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0px;
}
</style>