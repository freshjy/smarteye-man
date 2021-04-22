<template>
    <div id="app">
        <div class="pageTitle">
            시스템 정보
        </div>
        <br/>
        <div class="languageSetting">
            <h4>언어 설정</h4>
            <label for="lang-select">언어</label>
            <select name="lang-select">
                <option value="ko">Korean</option>
                <!-- <option value="en">English</option> -->
            </select>
            
        </div>
        <div class="loginInfo">
            <!-- <h4>로그인 정보</h4>
            사용자 ID<button v-on:click="pwChangeBtn">암호 변경</button> -->

            <!-- 암호 변경 팝업 -->
            <!-- <Modal v-if="pwChanModal" v-on:close="pwChanModal = false">
                <h4 slot="header" >암호 변경
                    <i class="closeModalBtn fas fa-times" v-on:click="pwChanModal = false" aria-hidden="true"></i>
                </h4>
                <span slot="body">기존 암호 입력<input type="text" v-model="nowPw" placeholder="기존 암호를 입력하세요"></span>
                <div slot="body">새 암호 입력<input type="text" v-model="chanPw" placeholder="새 암호를 입력하세요"></div>
                <span slot="footer" v-on:click="pwChanModal = false">
                    <button v-on:click="pwChan">변경</button>
                    <button v-on:click="userInfoSetModal = false">취소</button>
                </span>
            </Modal> -->
            
        </div>
        <div class="verInfo">
            <h4>버전 정보</h4>
            <label for="ver-select">API 버전</label>
            <select name="ver-select">
                <option value="1.1">1.1</option>
            </select>
        </div>
        <div class="systemMan">
            <h4>시스템 관리</h4>
            설정 초기화<button v-on:click="resetBtn">초기화</button>
        </div>
    </div>
</template>

<script>
import Modal from '../common/Modal.vue'

export default {
    data(){
        return{
            nowPw:this.nowPw,
            chanPw:this.chanPw,
            pwChanModal: false
        }
    },
    methods:{
        pwChangeBtn(){
            this.pwChanModal = !this.pwChanModal;
        },
        pwChan(){
            var a = this.nowPw;
            var b = this.chanPw;
            console.log(a);
            console.log(b);
            this.clearPw();
        },
        clearPw(){
            this.nowPw='';
            this.chanPw='';
        },
        resetBtn(){
            alert("초기화");
        }
    },
    component:{
        Modal: Modal
    }

}
</script>

<style lang="">
.title{
    color:#1E1E1E;
    font-weight: 900;
    margin: 1.5rem 0 1.5rem;
} 
</style>