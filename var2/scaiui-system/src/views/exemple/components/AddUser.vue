<template>
    <el-form :model="form" :label-width="formLabelWidth">
      <el-row>
        <el-col :span="15">
          <el-form-item label="用户名：" >
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户编号：" >
            <el-input v-model="form.userCode"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
            <el-button @click="handleCancle">取 消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "addExemple",
        model: {
          prop: 'dialogFormVisible',
          event: 'closeDialog'
        },
        props: {
          dialogFormVisible: {
            requied: true
          },
          isEdit: {
            type: Boolean,
            requied: true
          }
        },
      data() {
          return {
            formLabelWidth: '120px',
            form: {
              userName: '',
              userCode: ''
            },
          }
      },
      methods: {
        handleCancle() {
          this.$emit('handleCancle', false)
        },
        handleSubmit() {
          if(this.isEdit) {
            this.userEdit()
          } else {
            this.userAdd()
          }
        },
        userAdd() {
          this.$service.post('/system/users', this.form)
            .then(r => {
              if(r.data.code === '000000') {
                this.$emit('closeDialog', false)
                this.$emit('loadData')
                this.$message({
                  showClose: true,
                  message: '新增用户成功！',
                  type: 'success'
                })
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: '新增用户出错！' + err.data.msg,
                type: 'error'
              });
            })
        },
        userEdit() {

        },
      }
    }
</script>

<style scoped>

</style>
