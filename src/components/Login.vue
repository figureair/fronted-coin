<template>
  <div>
      <div class="login-wrap" v-show="showLogin">
        <h3>登录</h3>
        <p v-show="showTishi">{{tishi}}</p>
        <input type="text" placeholder="请输入用户名" v-model="username">
        <input type="password" placeholder="请输入密码" v-model="password">
        <button v-on:click="login">登录</button>
        <span v-on:click="ToRegister">没有账号？马上注册</span>
      </div>

      <div class="register-wrap" v-show="showRegister">
        <h3>注册</h3>
        <p v-show="showTishi">{{tishi}}</p>
        <input type="text" placeholder="请输入用户名" v-model="newUsername">
        <input type="password" placeholder="请输入密码" v-model="newPassword">
        <button v-on:click="register">注册</button>
        <span v-on:click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>

<style>
.login-wrap{text-align:center;}
input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
p{color:red;}
button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}
span{cursor:pointer;}
span:hover{color:#41b883;}
</style>


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
        this.$router.push('/KG')
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
              alert('登录成功! UID: '+res.content)
              _this.$router.push({path:'/KG',query: { uid:res.content }})
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
    }
  }
}
</script>

