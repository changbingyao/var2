<template>
  <el-form :model="data" :rules="rules" ref="editForm" label-width="132px">
    <el-row>
      <sFormItem2 :label="$t('user.userCode')" prop="userCode">
        <el-input v-model="data.userCode" :disabled="operator!='add'"></el-input>
      </sFormItem2>
      <sFormItem2 :label="$t('user.userName')" prop="userName">
        <el-input v-model="data.userName" :disabled="operator=='view'"></el-input>
      </sFormItem2>
      <sFormItem2 :label="$t('user.orgCode')" prop="orgCode">
        <el-input v-model="data.orgCode" :disabled="operator=='view'"></el-input>
      </sFormItem2>
      <sFormItem2 :label="$t('user.remark')" prop="remark">
        <el-input v-model="data.remark" :disabled="operator=='view'"></el-input>
      </sFormItem2>
      <sFormItem2 :label="$t('user.userSex')" prop="userSex">
       <sSelect v-model="data.userSex"
                   option="SEX"
                   :placeholder="$t('placeholder.select',[$t('user.userSex')])" :disabled="operator=='view'" clearable>
        </sSelect>
      </sFormItem2>
      <sFormItem2 :label="$t('user.status')" prop="status">
        <sSelect v-model="data.status"
                   option="STATUS"
                   :placeholder="$t('placeholder.select',[$t('user.status')])" :disabled="operator=='view'" clearable>
        </sSelect>
      </sFormItem2>
    </el-row>
    <el-row>
      <sFormItem2 align="right" col-span=24>
        <el-button type="primary" @click="handleSubmit('editForm')" v-show="operator!='view'">{{$t('ok')}}</el-button>
        <el-button @click="handleCancel">{{$t('cancel')}}</el-button>
      </sFormItem2>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    name: "UserEdit",
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
          userCode: [
            {required: true, message: this.$t('placeholder.default', [this.$t('user.userCode')]), trigger: 'blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: this.$t('placeholder.default', [this.$t('user.userName')]), trigger: 'blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
          ],
          orgCode: [
            {required: true, message: this.$t('placeholder.default', [this.$t('user.orgCode')]), trigger: 'blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
          ],
          status: [
            {required: true, message: this.$t('placeholder.select', [this.$t('user.status')]), trigger: 'change'},
          ],
          remark: [
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
    /*  loadData(shadow = {}) {
        //const _this = this
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
        }, shadow || this.params);
        this.$service.get('/system/users', {params: this.params})
          .then(r => {
            if (r.data.code === this.$successCode) {
              this.userData = r.data.data
            }
          })
          .catch(err => {
            console.log('_this', this.$t('text.failure'))
            this.$Message({
              showClose: true,
              message: this.$t('text.failure') + err,
              type: 'error'
            });
          })
      },*/

      handleCancel() {
        this.$emit('closeDialog', false)
        this.$emit('loadData');
        /*this.$Message({
          showClose: true,
          message: this.$t('text.success'),
          type: 'success'
        })*/
      },
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operator == "edit") {
              this.userEdit()
            } else {
              this.userAdd()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      userAdd() {
        this.$service.post('/system/users', this.data)
          .then(r => {
            if (r.data.code === this.$successCode) {
              this.$emit('closeDialog', false)
              this.$emit('loadData')
              this.$Message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            }else{
              if(r.data.code=='U1000'){
                this.$Message({
                  showClose: true,
                  message:  this.$t('text.failure')+"  " +"用户编号重复！",
                  type: 'error'
                })
              }
            }
          })
          .catch(err => {
            console.error('err', err)
          })
      },
      userEdit() {
        this.$service.put('/system/users', this.data)
          .then(r => {
            //console.log('then:'+JSON.stringify(r))
            if (r.data.code === this.$successCode) {
              //console.log('333')
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
            console.error('err', err)
          })
      },
    }
  }
</script>

<style scoped>

</style>
