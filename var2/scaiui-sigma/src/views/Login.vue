<template>
  <div class="container">
    <div class="panel">
      <h1>{{$t('system')}}</h1>
      <div class="login_input">
        <el-input v-model="username" @keyup.enter.native="login" :placeholder="$t('placeholder.default',[$t('username')])" prefix-icon="el-icon-erp-userName"></el-input>
        <el-input v-model="password" @keyup.enter.native="login" :placeholder="$t('placeholder.default',[$t('password')])" prefix-icon="el-icon-erp-password" type="password"></el-input>
        <el-button @click="login" class="login_btn baseBlue">{{$t('signIn')}}</el-button>
        <div class="errorMsg"> {{this.errorMess}}</div>
      </div>
    </div>
    <div class="footer">{{$t('loginFooter')}}</div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import Qs from 'qs'
  var axios = Axios.create({
    baseURL: '/api',
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  export default {
    name: 'Login',
    data () {
      return {
        username: null,
        password: null,
        errorMess: null
      }
    },
    methods: {
      login() {
        if (this.isEmpty(this.username) || this.isEmpty(this.password)) {
          this.errorMess = this.$t('loginTips');
          return;
        } else {
          this.errorMess = null; //清空错误信息
          axios.post("/login", Qs.stringify({
            username: this.username,
            password: this.password
          })).then(r => {
            if (r.data.code === '000000') {
              this.$store.commit('USER_LOGIN', r.data.data);
              this.$store.commit('GET_USER_INFO');
              this.$store.commit('GET_USER_INFO_SUCCESS', this.username);
              try {
                this.$store.commit('GET_USER_PERMISSION_SUCCESS', JSON.stringify(r.data.data.menus));
                sessionStorage.setItem('_PERMISSION_BUTTONS', JSON.stringify(r.data.data.buttons))
              } catch (e) {}
              this.$router.push({name: 'home'});
              if (window.navigator.userAgent.indexOf('MSIE') != -1 || window.navigator.userAgent.indexOf('Trident') != -1) {
                window.location.reload();
              }
            } else if (r.data.code === 'US3001') {
              this.errorMess = r.data.msg;
              this.$store.commit('USER_LOGIN_FAILURE');
            } else {
              this.errorMess = r.data.msg;
              this.$store.commit('USER_LOGIN_FAILURE');
            }
          }).catch(err => {
            this.errorMess = err.response.data.message;
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition-delay: 99999s;
    -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
  }
  input:-webkit-autofill {
    background-color: #fff;
    background-image: none;
    color: #55565b;
  }
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url("../assets/img/bg-sigma.jpg") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    display:table-cell;
    vertical-align: middle;
    .panel {
      width: 45vw;
      height: 67vh;
      background: url("../assets/img/panel.png") no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      margin: 0 auto 8vh;
      h1 {
        color: #b2b2b4;
        font-size: 26px;
        letter-spacing: 4px;
        font-weight: normal;
        margin: 0 0 5vh;
        padding-top: 10vh;
        text-align: center;
      }
      .login_input {
        width: 18vw;
        margin: 0 auto;
        color: #2c3e50 !important;
        .el-input {
          margin-bottom: 3vh;
          ::-webkit-input-placeholder {
            color: #b2b2b4;
            background-color: #fff;
          }
          :-moz-placeholder {
            color: #55565b;
            background-color: #fff;
          }
          ::-moz-placeholder {
            color: #b2b2b4;
            background-color: #fff;
          }
          :-ms-input-placeholder {
            color: #b2b2b4;
            background-color: #fff;
          }
          .el-input__inner {
            color: #55565b;
            background-color: #fff;
            height: 6vh !important;
            line-height: 5vh !important;
            border: 1px solid #5a5a5a !important;
          }
          /deep/ .el-input__prefix {
            .el-input__icon {
              color: #81838a !important;
              line-height: 6vh !important;
            }
          }
        }
        .login_btn {
          width: 100%;
          height: 6vh !important;
          line-height: 1vh !important;
          margin-bottom: 5px;
        }
        .errorMsg {
          color: #F56C6C;
          text-align: center;
        }
      }
    }
    .footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 7vh;
      font-size: 0.7rem;
      color: #b2b2b4;
      text-align: center;
    }
  }
</style>
