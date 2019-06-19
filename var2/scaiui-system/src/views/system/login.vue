<template>
  <!-- <div>
    <el-input v-model="username" placeholder="请输入用户"></el-input>
    <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
    <el-button @click="login">登录</el-button>

    <router-view></router-view>


  </div> -->
  <div class="container">
    <div class="panel">
      <div class="panel-right">
        <div class="mess-bar"></div>
        <div class="login">
          <div class="login-input">
            <div><span></span><input v-model="username" placeholder="请输入用户" class="bar" @keyup.enter="login"/></div>
            <div><span></span><input type="password" v-model="password" placeholder="请输入密码" class="bar"
                                     @keyup.enter="login"/></div>
            <div class="btn" @click="login">登&nbsp;陆</div>
          </div>
          <div class="errorMess"> {{this.errorMess}}</div>
        </div>
      </div>
      <div class="foot">
        {{$t('company')}}
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import Qs from 'qs'

  Axios.defaults.baseURL = '/api'
  Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  export default {
    name: "login",
    data() {
      return {
        username: null,
        password: null,
        errorMess: null,
      }
    },
    methods: {
      login() {
        if (this.username == null || this.password == null) {
          this.errorMess = '用户名或密码为空';
        } else {
          this.errorMess = null; //清空错误信息
          Axios.post("/login", Qs.stringify({
            username: this.username,
            password: this.password
          })).then(r => {
            if (r.data.code === '000000') {
              localStorage.setItem('isLogin', 'true')
              //this.$store.commit('RETURN_BROWER_TYPE')
              try {
                sessionStorage.setItem('_PERMISSION_BUTTONS', JSON.stringify(r.data.data.buttons))
              } catch (e) {
              }
              this.$router.push({name: 'system'})
            } else {
              this.$message.error(r.data.msg)
            }
          }).catch(err => {
            localStorage.removeItem('isLogin')
            this.$message.error(err.response.data.message);
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    background-image: url("../../assets/images/background.png");
    background-size: 100% 100%;
    overflow: hidden;
    font-family: "microsoft yahei";

    .panel {
      width: 61.3vw;
      height: 66.7vh;
      background-image: url("../../assets/images/panel.png");
      background-size: 100% 100%;
      margin: 0 auto;
      margin-top: 13vh;

      .panel-right {
        width: 48%;
        height: 100%;
        margin-left: 50%;
        overflow: hidden;
        .mess-bar {
          width: 16vh;
          height: 4vh;
          margin: 0 auto;
          margin-top: 11vh;
          margin-bottom: 4vh;
          background-image: url("../../assets/images/mess-bar.png");
          background-size: 100% 100%;
        }

        .login {
          width: 70%;
          overflow: hidden;
          margin: 0 auto;
          position: relative;

          .login-input {
            width: 90%;
            margin-left: 5%;
            margin-top: 4vh;
            font-size: 0;

            > div:nth-of-type(1), > div:nth-of-type(2) {
              width: 96%;
              height: 5vh;
              margin: 0 2%;
              margin-top: 3vh;
              background-image: url("../../assets/images/border.png");
              background-size: 100% 100%;
              span {
                display: inline-block;
                width: 3vh;
                height: 3vh;
                margin: 1vh;
                vertical-align: top;
              }
              input {
                width: calc(100% - 5vh);
                height: 100%;
                border: none;
                outline: none;
                background-color: transparent;
                font-size: 0.7rem;
                vertical-align: top;
                font-family: "microsoft yahei";
              }
            }
            > div:nth-of-type(1) > span {
              background-image: url("../../assets/images/icon-person.png");
              background-size: 100% 100%;
            }
            > div:nth-of-type(2) > span {
              background-image: url("../../assets/images/icon-pass.png");
              background-size: 100% 100%;
            }
            .btn {
              width: 100%;
              height: 7vh;
              margin-top: 6vh;
              background-image: url("../../assets/images/btn.png");
              background-size: 100% 100%;
              text-align: center;
              line-height: 5.6vh;
              font-size: 0.9rem;
              color: #DDDDDD;
              cursor: pointer;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
          }
          .errorMess {
            width: 100%;
            margin-bottom: 3vh;
            height: 2vh;
            color: red;
            text-align: center;
            font-size: 0.9rem;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

        }
      }
    }
    .foot {
      text-align: center;
      margin-top: 11.5vh;
      font-size: 0.7rem;
      color: #515A6E;
    }
  }
</style>
