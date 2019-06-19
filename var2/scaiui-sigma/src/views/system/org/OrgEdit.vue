<template>
  <div style="width: 92%;">
    <el-form :model="data" :rules="rules" ref="editForm" label-width="132px">
      <el-row>
        <sFormItem2 :label="$t('org.orgCode')" prop="orgCode">
          <el-input v-model="data.orgCode" :disabled="operator!='add'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('org.orgName')" prop="orgName">
          <el-input v-model="data.orgName" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('org.orgCategory')" prop="orgCategory">
          <sSelect v-model="data.orgCategory" option="ORG_CATEGORY"
                   :placeholder="$t('placeholder.select',[$t('org.orgCategory')])" :disabled="operator=='view'" clearable>
          </sSelect>
        </sFormItem2>
        <sFormItem2 :label="$t('org.orgLevel')" prop="orgLevel">
          <sSelect v-model="data.orgLevel" option="ORG_GRADE"
                   :placeholder="$t('placeholder.select',[$t('org.orgLevel')])" :disabled="operator=='view'" clearable>
          </sSelect>
        </sFormItem2>
      </el-row>
      <el-row>
        <sFormItem2 align="right" col-span="24">
          <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
          <el-button class="baseBlue" @click="handleSubmit('editForm')" v-show="operator!='view'">{{$t('ok')}}</el-button>
        </sFormItem2>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "OrgEdit",
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
          orgCode: [
            {required: true, message: this.$t('placeholder.default', [this.$t('org.orgCode')]), trigger: 'blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
          ],
          orgName: [
            {required: true, message: this.$t('placeholder.default', [this.$t('org.orgName')]), trigger: 'blur'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur'}
          ],
          orgCategory: [
            {required: true, message: this.$t('placeholder.default', [this.$t('org.orgCategory')]), trigger: 'blur'}
          ],
          orgLevel: [
            {required: true, message: this.$t('placeholder.select', [this.$t('org.orgLevel')]), trigger: 'change'}
          ],
        }
      }
    },
    methods: {
      // 取消
      handleCancel() {
        this.$emit('closeDialog', false)
        this.$emit('loadData');
      },

      // 确定
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operator == "edit") {
              this.userEdit();
            } else {
              this.userAdd();
            }
          } else {
            return false;
          }
        });
      },

      // 添加服务调用
      userAdd() {
        this.$service.post('/system/orgs', this.data)
          .then(r => {
            if (r.data.code === '000000') {
              this.$emit('closeDialog', false);
              this.$emit('loadData');
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: r.data.msg,
                type: 'error'
              })
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            })
          })
      },

      /**
       * 修改服务调用
       */
      userEdit() {
        this.$service.put('/system/orgs', this.data)
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
