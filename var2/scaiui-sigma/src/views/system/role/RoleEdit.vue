<template>
  <div style="width: 93%;">
    <el-form :model="data" :rules="rules" ref="editForm" label-width="132px">
      <el-row>
        <sFormItem2 :label="$t('role.roleCode')" prop="roleCode">
          <el-input v-model="data.roleCode" :disabled="operator!='add'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('role.roleName')" prop="roleName">
          <el-input v-model="data.roleName" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('role.status')" prop="status">
          <sSelect v-model="data.status"
                   option="YN"
                   :placeholder="$t('placeholder.select',[$t('role.status')])"
                   :disabled="operator=='view'"
                   clearable>
          </sSelect>
        </sFormItem2>
        <sFormItem2 :label="$t('role.roleLevel')" prop="roleLevel">
          <sSelect v-model="data.roleLevel" option="ORG_GRADE" :disabled="operator=='view'"></sSelect>
        </sFormItem2>
      </el-row>
      <el-row>
        <sFormItem2 align="right" col-span="24">
          <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
          <el-button class="baseBlue" type="primary" @click="handleSubmit('editForm')" v-show="operator!='view'">{{$t('ok')}}</el-button>
        </sFormItem2>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "RoleEdit",
    model: {
      prop: 'dialogIsVisible',
      event: 'closeDialog'
    },
    props: {
      dialogIsVisible: {
        required: true
      },
      operator: {
        type: String,
        required: true
      },
      data: {type: Object}
    },
    data() {
      return {
        rules: {
          roleCode: [
            {required: true, message: this.$t('placeholder.default', [this.$t('role.roleCode')]), trigger: 'blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
          ],
          roleName: [
            {required: true, message: this.$t('placeholder.default', [this.$t('role.roleName')]), trigger: 'blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
          ],
          status: [
            {required: true, message: this.$t('placeholder.default', [this.$t('role.status')]), trigger: 'blur'},
          ],
          roleLevel: [
            {required: true, message: this.$t('placeholder.default', [this.$t('role.roleLevel')]), trigger: 'blur'},
          ],
        }
      }
    },
    methods: {

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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operator == "edit") {
              this.userEdit()
            } else {
              this.roleAdd()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      /**
       * 添加服务调用
       */
      roleAdd() {
        this.$service.post('/system/roles', this.data)
          .then(r => {
            if (r.data.code === '000000') {
              this.$emit('closeDialog', false)
              this.$emit('loadData')
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            }else{
              if(r.data.code=='-100001'){
                this.$message({
                  showClose: true,
                  message:  this.$t('text.failure')+"  " +"角色编码重复！",
                  type: 'error'
                })
              }
            }
          })
          .catch(err => {
            console.error('err', err)
          })
      },

      /**
       * 修改服务调用
       */
      userEdit() {
        this.$service.put('/system/roles', this.data)
          .then(r => {
            if (r.data.code === '000000') {
              this.$emit('closeDialog', false)
              this.$emit('loadData')
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            }
          })
          .catch(err => {
            console.error('err', err)
          })
      },
    }
  }
</script>

<style scoped>

</style>
