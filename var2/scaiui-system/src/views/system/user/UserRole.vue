<template>
  <el-form v-model="userData" ref="editForm" label-width="120px">
    {{userData.userName}}
    <el-transfer v-model="userRoleData" :data="roleData" ref="userRoleTransfer"></el-transfer>
    <el-row align="center">
      <el-button type="primary" @click="handleSubmit('editForm')" v-show="operator!='view'">{{$t('ok')}}</el-button>
      <el-button @click="handleCancel">{{$t('cancel')}}</el-button>
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
            if (r.data.code === this.$successCode) {
              let roles = r.data.data["roles"];
              this.roleData = []
              this.userRoleData = []
              roles.forEach(role => {
                this.roleData.push({key: role["roleCode"], label: role["roleName"]})
              })
              let userRoles = r.data.data["userRoles"];
              if (userRoles) {
                userRoles.forEach(userRole => {
                  this.userRoleData.push(userRole["roleCode"])
                })
              }
            }
          })
          .catch(err => {
            this.$Message({
              showClose: true,
              message: this.$t('text.failure') + err.data.msg,
              type: 'error'
            });
          })
      },
      /**
       * 点击取消按钮时关闭对话框
       */
      handleCancel() {
        this.$emit('closeDialog', false)
      },
      /**
       * 点击确定按钮时保存数据
       * @param formName
       * @returns {boolean}
       */
      handleSubmit(formName) {
        //console.log(Object.assign(this.userData, {"roleCodes": this.userRoleData}));
        this.$service.post('/system/userRoles', Object.assign(this.userData, {"roleCodes": this.userRoleData}))
          .then(r => {
            if (r.data.code === this.$successCode) {
              this.$emit('closeDialog', false)
              this.$emit('loadData')
              this.$Message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            }
          })
          .catch(err => {
            this.$Message({
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

<style scoped>

</style>
