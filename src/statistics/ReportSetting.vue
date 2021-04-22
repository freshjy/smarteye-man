<template>
    <div id="app">
        <div class="pageTitle">
            리포트 설정
            <span class="addContainer" v-on:click="addReportBtn">
                <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
            </span>
            <span class="addContainer" v-on:click="modifyReportBtn(selected.length, selected, getReportSet)">
                <i class="fas fa-pencil-alt" aria-hidden="true"></i>
            </span>
            <span class="addContainer" v-on:click="deleteReportBtn(selected)">
                <i class="fas fa-trash-alt" aria-hidden="true"></i>
            </span>
        </div>
        <br/>
        
        

        <!-- 리포트 설정 추가 팝업 -->
        <Modal v-if="reportSetModal" v-on:close="reportSetModal = false">
            <div slot="header">리포트 추가
                <i class="closeModalBtn fas fa-times" v-on:click="reportSetModal = false" aria-hidden="true"></i>
            </div>
            <div slot="body">
                <div>리포트 정보</div><br/>
                <div>이름<input type="text" v-model="userName" placeholder="사용자 ID"/></div>
                <div>주기
                    <select name="selectingPeriod" v-model="selectPeriod">
                        <option value="일간">일간</option>
                        <option value="월간">월간</option>
                        <option value="연간">연간</option>
                    </select>
                </div>
                <br>
            </div>
            <div  slot="body">
                <div>이벤트 타입</div><br/>
                <div>이벤트 추가
                    <select name="selectingEvent" v-model="selectEvent">
                        <option v-for="(event, index) in events" :key="index" >
                            {{ event.eventName }}
                        </option>
                    </select>
                    <button v-on:click="addEvent(selectEvent)">추가</button>
                </div>
                <span v-for="(event,index) in eventArr" :key="index+1">
                    {{event}}
                    <span class="eventRemove" type="button" v-on:click="removeEvent(index+1)">
                        <i class="closeBtn fas fa-times"></i>
                    </span>
                </span>    
                <br/>
            </div>

            <span slot="footer" v-on:click="reportSetModal = false">
                <button class="addBtn" v-on:click="addReport(userName,selectPeriod)" >추가</button>
                <button v-on:click="reportSetModal = false">취소</button>
            </span>
        </Modal>

        <!-- 리포트 설정 수정 팝업 -->
        <Modal v-if="reportModifyModal" v-on:close="reportModifyModal = false">
            <div slot="header">리포트 수정
                <i class="closeModalBtn fas fa-times" v-on:click="reportModifyModal = false" aria-hidden="true"></i>
            </div>
            <div slot="body">
                <div>리포트 정보</div><br/>
                <div>이름<input type="text" v-model="userName" placeholder="사용자 ID"/></div>
                <div>주기
                    <select name="selectingPeriod" v-model="selectPeriod">
                        <option value="일간">일간</option>
                        <option value="월간">월간</option>
                        <option value="연간">연간</option>
                    </select>
                </div>
                <br>
            </div>
            <div  slot="body">
                <div>이벤트 타입</div><br/>
                <div>이벤트 추가
                    <select name="selectingEvent" v-model="selectEvent">
                        <option v-for="(event, index) in events" :key="index" >
                            {{ event.eventName }}
                        </option>
                    </select>
                    <button v-on:click="addEvent(selectEvent)">추가</button>
                </div>
                <span v-for="(event,index) in eventArr" :key="index+1">
                    {{event}}
                    <span class="eventRemove" type="button" v-on:click="removeEvent(index+1)">
                        <i class="closeBtn fas fa-times"></i>
                    </span>
                </span>    
                <br/>
            </div>

            <span slot="footer" v-on:click="reportModifyModal = false">
                <button class="addBtn" v-on:click="modifyReport(selected,userName,selectPeriod)" >수정</button>
                <button v-on:click="reportModifyModal = false">취소</button>
            </span>
        </Modal>


        <table>
            <colgroup>
                <col width="1%">
                <col width="29%">
                <col width="29%">
                <col width="29%">
                <col width="12%">
            </colgroup>
            <thead>
                <tr class="title">
                    <th><input type="checkbox" v-model="selectAll" v-on:click="select"></th>
                    <th>이름</th>
                    <th>주기</th>
                    <th>이벤트 타입</th>
                    <th></th>
                </tr>
                <tr v-for="(val,i) in getReportSet" :key="i"  >
                    <td><input type="checkbox" :value="val.id" v-model="selected"></td>
                    <td>{{val.eventType}}보고</td>
                    <td>{{val.cycle}}</td>
                    <td >{{val.eventType}}</td>
                    <td><button>다운로드</button></td>
                </tr>
            </thead>
        </table>
        
    </div>
</template>

<script>
import Modal from '../common/Modal.vue'

export default {
    data(){
        return{
            // report data
            //  values:[
            //      {name:"화재 보고", period:"월간", eType:"화재", download:"□"},
            //      {name:"화재 보고", period:"주간", eType:"화재", download:"□"}
            //  ],
            // addReport data
            reportSetModal:false,
            reportModifyModal:false,

            getReportSet:[],

            selected:[],
            selectAll:false,
            selectGroup:'',

            userName:'',

            selectPeriod:'daily',
            selectEvent:'움직임',
            eventArr:[],
            events:[
                {eventName:"움직임"},
                {eventName:"배회"},
                {eventName:"침입"},
                {eventName:"쓰러짐"},
                {eventName:"화재"},
                {eventName:"연기"},
                {eventName:"싸움"},
                {eventName:"주차"},
                {eventName:"정차"},               
                {eventName:"수위감시"}
            ]        
        }
    },
    methods:{
        getReportSetToJson(){
            this.$http.get('http://localhost:3000/report_setting')
            .then((res) => {
                console.log('getdata: ', res.data)
                this.getReportSet = res.data
            })
        },        
        deleteReportBtn(selected){
            for(let i=0; i<selected.length; i++){
                this.$http.delete('http://localhost:3000/report_setting/'+selected[i])
                .then((res) => {
                    this.getReportSetToJson()
                })
            }
            this.selected=[]
        },
        select() {
			this.selected = [];
            if(!this.selectAll){
                for(let i in this.getReportSet){
                    this.selected.push(this.getReportSet[i].id)
                }
            }
		},     
        addEvent(event){
            if(!this.isExistEvent(event)){
                this.eventArr.push(event)
            }else{
                alert("이미 선택한 이벤트 입니다.")
            }
        },
        isExistEvent(event){
            let returnFlag = false;
            for(let i in this.eventArr){
                if(this.eventArr[i] == event){
                    returnFlag = true;
                }
            }
            console.log(returnFlag);
            return returnFlag;
        },
        removeEvent(){
            this.eventArr.splice(index-1,1);
        },
        addReportBtn(){
            this.reportSetModal = !this.reportSetModal;
        },
        addReport(userName,selectPeriod){
            this.$http.post('http://localhost:3000/report_setting',{
                userName:userName,
                cycle:selectPeriod,
                eventType:this.eventArr,
            }).then((res) => {
                this.getReportSet.push(res.data);
                this.userName = '',
                this.cycle = '',
                this.eventType=[]
            })
        },
        modifyReportBtn(length, id, getReportSet){
            // this.reportModifyModal = !this.reportModifyModal;
             if(length==0){
                alert("수정하실 사용자를 체크해 주세요")
            }else if(length==1){
                for(let i=0; i<getReportSet.length; i++){
                    if(id==getReportSet[i].id){
                        this.userName=getReportSet[i].userName
                        this.selectPeriod=getReportSet[i].cycle
                        this.eventArr=getReportSet[i].eventType
                    }
                }
                this.reportModifyModal = !this.reportModifyModal;
            }else{
                alert("수정하실 리포트를 1명만 체크해 주세요")
            }
        },
        modifyReport(id,userName,selectPeriod){
            // if(id && firstName && lastName && team && position && role){
                this.$http.patch('http://localhost:3000/report_setting/'+id,{
                    userName:userName,
                    cycle:selectPeriod,
                    eventType:this.eventArr
                }).then((res) => {
                    this.getReportSet()
                    this.userName = '',
                    this.cycle = '',
                    this.eventArr=[];
                })
            // }
            this.selected=[]
            this.reportModifyModal = !this.reportModifyModal;
        },
    },
    components:{
        Modal: Modal
    },
    mounted() {
        this.getReportSetToJson()
    },
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    border: 1px solid black;
    text-align:center;
    table-layout: fixed;
}
.title {
    border-bottom: 1px solid ;
}
.addContainer{
    font-size:0.8em;
}
.modalBody{
    font-size:2em;
}
.closeModalBtn {
    float:right;
}
</style>