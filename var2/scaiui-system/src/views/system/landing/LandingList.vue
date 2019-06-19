<template>
  <div class="all">
      <el-row>
        <el-col :span="2">用户名：</el-col>
        <el-col :span="10">
          <el-input data="userName" placeholder="请输入用户名" validate-event="change"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">密码：</el-col>
        <el-col :span="10">
          <el-input v-model="passWord" placeholder="请输入密码"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-button type="primary" v-on:click="confirm">登陆</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" v-on:click="cancel">取消</el-button>
        </el-col>
      </el-row>
  </div>
</template>

<script>
  export default {
    name: "LandingList",
    data() {
      return {
        userName: '',
        passWord: '',
      }
    },
    methods() {
      confirm = function () {
        if (userName == "") {
          console.log("illegal")
        }
      }
      cancel = function () {

      }
      change = function (userName) {

      }
    },
  }
</script>

<style scoped>
  .all {
    color: #20252c;
  }
</style>
