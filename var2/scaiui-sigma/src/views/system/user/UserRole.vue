<template>
  <el-form v-model="userData" ref="editForm" label-width="120px">
    <span style="display: block; margin-bottom: 10px; color: #0086FF;">{{userData.userName}}</span>
    <el-transfer v-model="userRoleData" :data="roleData" ref="userRoleTransfer"></el-transfer>
    <el-row align="center" style="margin-top: 20px;text-align: right;">
      <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
      <el-button class="baseBlue" @click="handleSubmit('editForm')" v-show="operator!='view'">{{$t('ok')}}</el-button>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    name: "UserRole",
    model: {
      prop: 'dialogIsVisible',
      event: 'closeDialog'
    },
    operator: {
      type: String,
      required: true
    },
    props: {
      dialogIsVisible: {
        required: true
      },
      operator: {
        type: String,
        required: true
      },
      userData: {type: Object, required: true}
    },
    data() {
      return {
        roleData: [],
        userRoleData: []
      };
    },
    mounted() {
      this.loaderData()
    },
    methods: {
      loaderData() {
        this.$service.get('/system/userRoles', {params: {userCode:this.userData.userCode}})
          .then(r => {
            if (r.data.code === '000000') {
              let roles = r.data.data["roles"];
              this.roleData = [];
              this.userRoleData = [];
              roles.forEach(role => {
                this.roleData.push({key: role["roleCode"], label: role["roleName"]})
              });
              let userRoles = r.data.data["userRoles"];
              if (userRoles) {
                userRoles.forEach(userRole => {
                  this.userRoleData.push(userRole["roleCode"])
                })
              }
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: this.$t('text.failure') + err.data.msg,
              type: 'error'
            });
          })
      },

      // 取消
      handleCancel() {
        this.$emit('closeDialog', false)
      },

      // 确定
      handleSubmit(formName) {
        this.$service.post('/system/userRoles', Object.assign(this.userData, {"roleCodes": this.userRoleData}))
          .then(r => {
            if (r.data.code === '000000') {
              this.$emit('closeDialog', false);
              this.$emit('loadData');
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: this.$t('text.failure') + err.data.msg,
              type: 'error'
            });
          })
      }
    },
    watch: {
      'userData.userCode' (nVal, oVal) {
        this.loaderData()
      }
    }
  };
</script>

<style lang="scss" scoped>
  /deep/ .el-transfer {
    width: 100% !important;
  }

  /deep/ .el-transfer > .el-transfer-panel {
    width: 40.4% !important;
  }

  /deep/ .el-transfer > .el-transfer-panel > .el-transfer-panel__header > .el-checkbox > .el-checkbox__label {
    font-size: 14px;
  }

  /deep/ .el-transfer > .el-transfer-panel > .el-transfer-panel__body > .el-checkbox-group > .el-checkbox > .el-checkbox__label > span {
    font-size: 12px !important;
  }
</style>
