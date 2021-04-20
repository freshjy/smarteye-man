<template lang="">
<div>
    <div class="pageTitle"> 
        객체종류 지역별 통계
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
        객체 종류
        <select name="selectingObject" v-model="selObject" >
            <option value="car">차</option>
            <option value="person">사람</option>
        </select>
        <button v-on:click="addObject()">추가</button>
    </div>
    <br/>
    <div>
        검색 지역
        <select name="selectingArea" >
            <option>
                
            </option>
        </select>
        <button v-on:click="addArea()">추가</button>
        <div class="searchBtn">
            <button v-on:click="searchProcess()">
                조회
            </button>
            <button>
                내보내기
            </button>
    </div>
    </div>
    
    <div>
        <table class="firstTable">
            <thead>
                <tr class="tTitle1">
                    <th>지역</th>
                    <th>차</th>
                    <th>사람</th>
                    <th>합계</th>
                </tr>
            </thead>
            <tbody>
                <tr class="tBody1" >
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
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
                    a
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
            objectCategory:["차","사람"],
            selObject:'',
            firstDate:'',
            firstTime:'',
            lastDate:'',
            lastTime:''
            
        }
    },
    methods:{
    
    },
    mounted() {
        
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