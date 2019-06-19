<template>
  <div class="container">
    <div class="panel">
      <h1>{{$t('system')}}</h1>
      <div class="login_input">
        <el-input v-model="userName" @keyup.enter.native="submit" :placeholder="$t('placeholder.default',[$t('username')])" prefix-icon="el-icon-erp-userName"></el-input>
        <el-input v-model="oldPwd" @keyup.enter.native="submit" :placeholder="$t('placeholder.default',[$t('oldPwd')])" prefix-icon="el-icon-erp-password" type="password"></el-input>
        <el-input v-model="newPwd" @keyup.enter.native="submit" :placeholder="$t('placeholder.default',[$t('newPwd')])" prefix-icon="el-icon-erp-password" type="password"></el-input>
        <span class="back" @click="goBack">{{$t('goBack')}}</span>
        <el-button class="login_btn baseBlue" @click="submit">{{$t('submit')}}</el-button>
        <div class="errorMsg"> {{this.errorMsg}}</div>
      </div>
    </div>
    <div class="footer">{{$t('loginFooter')}}</div>
  </div>
</template>

<script>
  export default {
    name: 'ModifyPwd',
    data () {
      return {
        userName: '',
        oldPwd: '',
        newPwd: '',
        errorMsg: ''
      }
    },
    mounted() {
      this.userName = '';
      this.oldPwd = '';
      this.newPwd = '';
      this.errorMsg = '';
    },
    methods: {
      // 返回登录页
      goBack() {
        this.$router.push({name: 'login'});
      },

      // 确认提交功能
      submit() {
        if (this.isEmpty(this.userName) || this.isEmpty(this.oldPwd) || this.isEmpty(this.newPwd)) {
          this.errorMsg = this.$t('loginTips');
          return;
        } else {
          this.errorMsg = null;
          this.$service.put("/change-password",{
            username: this.userName,
            password: this.oldPwd,
            newpassword: this.newPwd
          }).then(r => {
            if (r.data.code === '000000') {
              this.$message({
                showClose: true,
                message: this.$t('modifySuccess'),
                type: 'success'
              });
              this.$router.push({name: 'login'});
            } else {
              this.errorMsg = r.data.msg;
            }
          }).catch(err => {
            this.errorMsg = err.response.data.message;
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
    background: url("../assets/img/bg-sigma.jpg");
    background-size: 100% 100%;
    display:table-cell;
    vertical-align: middle;
    .panel {
      width: 45vw;
      height: 67vh;
      background-image: url("../assets/img/panel.png");
      background-size: 100% 100%;
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
        position: relative;
        width: 18vw;
        margin: 0 auto;
        color: #2c3e50 !important;
        .back {
          font-size: 12px;
        }
        .el-input {
          margin-bottom: 3vh;
          ::-webkit-input-placeholder {
            color: #b2b2b4;
            background-color: #fff;
          }
          :-moz-placeholder {
            color: #b2b2b4;
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
          .el-input__prefix {
            .el-input__icon {
              color: #81838a !important;
              line-height: 6vh !important;
            }
          }
        }
        .back {
          position: absolute;
          width: 100%;
          top: 24vh;
          text-align: right;
          cursor: pointer;
          color: #66b1ff;
        }
        .back:hover{
          text-decoration: underline;
          color: #409EFF;
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
