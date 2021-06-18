<template>
  <div id="first">
      <div class="login-box" v-show="showLogin">
        <h2>知识图谱可视化系统</h2>
        <p v-show="showTishi">{{tishi}}</p>
        <div class="form">
          <div class="item">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            <input type="text" placeholder="请输入用户名" v-model="username">
          </div>
          <div class="item">
            <i class="fa fa-key" aria-hidden="true"></i>
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
            <button v-on:click="login">登录</button>
            <button v-on:click="ToRegister">注册</button>
        </div>
      </div>

      <div class="login-box" v-show="showRegister">
        <h2>知识图谱可视化系统</h2>
        <p v-show="showTishi">{{tishi}}</p>
        <div class="form">
          <div class="item">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            <input type="text" placeholder="请输入用户名" v-model="newUsername">
          </div>
          <div class="item">
            <i class="fa fa-key" aria-hidden="true"></i>
            <input type="password" placeholder="请输入密码" v-model="newPassword">
          </div>
          <button v-on:click="register">提交注册</button>
          <button v-on:click="ToLogin">去登录</button>
        </div>
    </div>
    <h6 id="tools">KG666小组呈现</h6>
  </div>
</template>

<script>
import $ from 'jquery'
export default{
  data(){
    return{
      imgSrc: require('../img/01.jpg'),
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishi: '',
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
    }
  },
  methods:{
    ToRegister(){
      this.showRegister = true
      this.showLogin = false
    },
    ToLogin(){
      this.showRegister = false
      this.showLogin = true
    },
    login(){
      let _this = this;
      if(this.username === "" || this.password === ""){
        alert("请输入用户名或密码")
      }else{
        let res = {'name':this.username,'password':this.password}
        $.ajax({
          url:'http://47.99.190.169:8888/user/login',
          type: 'POST',
          dataType: 'json',
          data:JSON.stringify(res),
          contentType: 'application/json; charset=UTF-8',
          success: function(res){
            if(res.success){
              alert('登录成功!')
              _this.$router.push({name:'KG', params: { uid:res.content }})
            }else{
              alert('登录失败!')
            }
          }
        })
      }
    },
    register() {
      if(this.newUsername === "" || this.newPassword === ""){
        alert("请输入用户名或密码")
      }else{
        let res = {'name':this.newUsername,'password':this.newPassword}
        console.log(res)
        $.ajax({
          url:'http://47.99.190.169:8888/user/register',
          type: 'POST',
          dataType: 'json',
          data:JSON.stringify(res),
          contentType: 'application/json; charset=UTF-8',
          success: function(res){
            console.log(res)
            if(res.success){
              alert('注册成功!')
            }else{
              alert('注册失败! '+res.message)
            }
          }
        })
      }
    },
    logout(){
      let _this = this;
      _this.$router.push('/')
    },
  }
}
</script>


<style>
#first {
  background: url('../img/04.jpg');
  background-repeat: no-repeat;
  background-size: 100% auto;
  height: 100%;
  position: fixed;
  width: 100%;
}
.login-box {
  width: 30%;
  height: auto;
  margin: 0 auto;
  margin-top: 15%;
  text-align: center;
  background: rgba(255,255,255,0.8);
  padding: 20px 50px;
  border-radius: 30px;
}
.login-box h1 {
  color: #fff;
}
.login-box .form .item {
  margin-top:15px;
}
.login-box .form .item i {
  font-size: 18px;
  color: #fff;
}
.login-box .form .item input {
  width: 180px;
  font-size: 18px;
  border: 0;
  border-bottom: 2px solid #fff;
  padding: 5px 10px;
  background: #ffffff00;
  color: rgba(0,0,0,1);
}
.login-box button {
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  width: 150px;
  height: 30px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  background: #4a8bcf;
  border: 0;
  border-radius: 12px;
}


</style>