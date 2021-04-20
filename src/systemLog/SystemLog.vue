<template lang="">
    <div>
        <div class="pageTitle"> 
        시스템 로그
        </div>
        <br/>
        <div>
        검색기간
            <input type="date" v-model="firstDate"/><input type="time" v-model="firstTime"/> ~ 
            <input type="date" v-model="lastDate"/><input type="time" v-model="lastTime"/>
            
            <!-- {{firstDate + " " + firstTime}}
            {{lastDate + " " + lastTime}} -->
        </div>
        <br/>
        <div>
            검색 조건 <input type="checkbox" v-model="loginCheck"> 로그인 <input type="checkbox" v-model="logoutCheck"> 로그아웃 <input type="checkbox" v-model="resetSet"> 설정 초기화
        </div>
        <br/>
        <!-- {{loginCheck}}  {{logoutCheck}}  {{resetSet}} -->
        <br/>
        <div class="searchBtn">
            <button v-on:click="seletLog(firstDate,firstTime,lastDate,lastTime,loginCheck,logoutCheck,resetSet)">
                조회
            </button>
            <button>
                내보내기
            </button>
        </div>
        <div>
            <table>
                <colgroup>
                    <col width="20%">
                    <col width="20%">
                    <col width="20%">
                    <col width="20%">
                    <col width="20%">
                </colgroup>
                <thead>
                    <tr class="tTitle">
                        <th>시간</th>
                        <th>사용자</th>
                        <th>상대IP</th>
                        <th>행동</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                <tr class="tBody" v-for="(value,index) in searchData" :key="index">
                    <td>{{value.created_at}}</td>
                    <td>{{value.user_name}}</td>
                    <td>{{value.remote_ip}}</td>
                    <td>{{value.action}}</td>
                    <td>{{value.state}}</td>
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
            getAuthData:[],
            firstDate:'',
            lastDate:'',
            firstTime:'',
            lastTime:'',

            searchData:[],
            aa:[],
            loginCheck:false,
            logoutCheck:false,
            resetSet:false,
        }
    },
    methods:{
        getAuthToJson(){
            this.$http.get('http://localhost:3000/authentication_logs')
            .then((res) => {
                console.log('getdata: ', res.data)
                this.getAuthData = res.data
            })
        },
        seletLog(firstDate,firstTime,lastDate,lastTime,loginCheck,logoutCheck,resetSet){
            this.searchData.splice(0)
            const moment = require('moment');
            var fDateTime = firstDate+" "+firstTime
            var lDateTime = lastDate+" "+lastTime
            if(!firstDate&&!firstTime&&!lastDate&&!lastTime){
                alert("기간을 입력하세요")
            }else{
                for(var i=0; i<this.getAuthData.length; i++){
                    if(moment(this.getAuthData[i].created_at).isBetween(fDateTime, lDateTime, undefined, '()') && loginCheck && logoutCheck){
                        console.log(this.getAuthData[i].action=="Logout")
                        this.searchData.push({
                            created_at:this.getAuthData[i].created_at,
                            user_name:this.getAuthData[i].user_name,
                            remote_ip: this.getAuthData[i].remote_ip,
			                action: this.getAuthData[i].action,
			                state: this.getAuthData[i].state
                        })
                    }else if(moment(this.getAuthData[i].created_at).isBetween(fDateTime, lDateTime, undefined, '()') &&logoutCheck){
                        if(this.getAuthData[i].action=="Logout"){
                            this.searchData.push({
                            created_at:this.getAuthData[i].created_at,
                            user_name:this.getAuthData[i].user_name,
                            remote_ip: this.getAuthData[i].remote_ip,
			                action: this.getAuthData[i].action,
			                state: this.getAuthData[i].state
                        })
                        }
                    }else if(moment(this.getAuthData[i].created_at).isBetween(fDateTime, lDateTime, undefined, '()') &&loginCheck){
                        if(this.getAuthData[i].action=="Login"){
                            this.searchData.push({
                            created_at:this.getAuthData[i].created_at,
                            user_name:this.getAuthData[i].user_name,
                            remote_ip: this.getAuthData[i].remote_ip,
			                action: this.getAuthData[i].action,
			                state: this.getAuthData[i].state
                        })
                        }
                    }
                }
            }
        }
    },
    mounted(){
        this.getAuthToJson()
    }
}
</script>

<style lang="">

.searchBtn{
    float: right;
}
table {
    width:100%;
    border-collapse: collapse;
    text-align:center;
}
.tTitle {
    border: 1px solid black;
    border-bottom: 1px solid ;
}
.tBody{
    border:0px;
}

</style>