<template>
  <div class="change-password" style="width: 95%;">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
      <el-row>
        <sFormItem2 style="width: 100%;" :label="$t('resetUserName')" prop="username">
          <el-input v-model="data.userCode"></el-input>
        </sFormItem2>
        <sFormItem2 style="width: 100%;" :label="$t('resetVerify')" prop="password">
          <el-input type="password" v-model="form.password" :placeholder="$t('verifyMessage')" autocomplete="off"></el-input>
        </sFormItem2>
        <!--<sFormItem2>-->
          <!--<el-button class="baseGray" @click="cancel">{{$t('cancel')}}</el-button>-->
          <!--<el-button class="baseBlue" @click="submit('form')">{{$t('ok')}}</el-button>-->
        <!--</sFormItem2>-->
      </el-row>
      <el-row>
        <sFormItem2 align="right" col-span="24">
          <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
          <el-button class="baseBlue" @click="handleSubmit">{{$t('ok')}}</el-button>
        </sFormItem2>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "ResetPwd",
    data(){
      return{
        form: {
          username:'',
          password: '',
        },
        rules:  {
          password: [
            { required: true, message: this.$t('pasMust'), trigger: 'blur' }
          ],
        }
      }
    },
    model: {
      prop: 'dialogPwdVisible',
      event: 'closeDialog'
    },
    props: {
      dialogPwdVisible: Boolean,
      operator: {
        type: String,
        required: true
      },
      data: {type: Object}
    },
    methods:{
      // 取消
      handleCancel(){
        this.$emit('closeDialog', false);
      },

      // 确定
      handleSubmit(formName) {
        this.form.username=this.data.userCode;
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.$service.put("/reset-password", this.form).then(r => {
              if (r.data.code === '000000') {
                this.$message({
                  showClose: true,
                  message: this.$t('resetSuccess'),
                  type: 'success'
                });
                this.$emit('closeDialog', false)
              } else {
                this.$message.error(r.data.msg)
              }
            }).catch(err => {
              console.log('err', err)
            })
          }
          this.$refs[formName].clearValidate;
        })
      }
    },
    watch: {
      'dialogPwdVisible'(nVal) {
        if(nVal) {
          this.form.password=''
          this.$refs.form.clearValidate()
        }
      }
    }
  }
</script>

<style scoped>

</style>
