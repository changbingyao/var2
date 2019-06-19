<template>
  <div class="change-password">
    <el-form :model="form"
             status-icon
             :rules="rules"
             ref="form"
             label-width="80px"
             class="demo-ruleForm">
      <el-form-item :label="$t('resetUserName')" label-width='120px' prop="username">
        <el-col :span="20">
            <el-input v-model="data.userCode" disabled=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('resetVerify')" label-width='120px' prop="password">
        <el-col :span="20">
            <el-input type="password" v-model="form.password" :placeholder="$t('verifyMessage')" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <el-button type="primary" @click="submit('form')">{{$t('sure')}}</el-button>
        <el-button type="primary" @click="cancel">{{$t('cancel')}}</el-button>
      </el-form-item>
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
      cancel(){
        this.$emit('closeDialog', false)
      },
      submit(formName) {
        this.form.username=this.data.userCode
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.$service.put("/reset-password", this.form).then(r => {
              if (r.data.code === this.$successCode) {
                this.$Message({
                  showClose: true,
                  message: this.$t('resetSuccess'),
                  type: 'success'
                });
                this.$emit('closeDialog', false)
                //this.$router.push({name: 'login'});
              } else {
                this.$Message.error(r.data.msg)
              }
            }).catch(err => {
              console.log('err', err)
            })
          }
          this.$refs[formName].clearValidate
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
