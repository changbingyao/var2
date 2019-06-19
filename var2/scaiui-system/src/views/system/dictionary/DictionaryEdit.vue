<template>
  <el-form :model="data" :rules="rules" ref="editForm" label-width="120px">
    <el-row>
      <sFormItem2 :label="$t('dictionary.dictName')" prop="dictName">
        <el-input v-model="data.dictName" :disabled="operator=='view'"></el-input>
      </sFormItem2>
      <sFormItem2 :label="$t('dictionary.module')" prop="module">
        <el-input v-model="data.module" :disabled="operator=='view'"></el-input>
      </sFormItem2>
      <sFormItem2 :label="$t('dictionary.parentId')" prop="parentId">
        <el-input v-model="data.parentId" :disabled="operator=='view'"></el-input>
      </sFormItem2>
      <sFormItem2 :label="$t('dictionary.dictCode')" prop="dictCode">
        <el-input v-model="data.dictCode" :disabled="operator=='view'"></el-input>
      </sFormItem2>
      <sFormItem2 :label="$t('dictionary.dictType')" prop="dictType">
        <el-select v-model="data.dictType"
                   path="DICT_TYPE"
                   :placeholder="$t('placeholder.select',[$t('dictionary.dictType')])" :disabled="operator=='view'"
                   clearable>
        </el-select>
      </sFormItem2>
      <sFormItem2 :label="$t('dictionary.status')" prop="status">
        <el-select v-model="data.status"
                   path="STATUS"
                   :placeholder="$t('placeholder.select',[$t('dictionary.status')])" :disabled="operator=='view'"
                   clearable>
        </el-select>
      </sFormItem2>
    </el-row>
    <el-row>
      <sFormItem2 align="right" col-span="24">
        <el-button type="primary" @click="handleSubmit('editForm')" v-show="operator!='view'">{{$t('ok')}}</el-button>
        <el-button @click="handleCancel">{{$t('cancel')}}</el-button>
      </sFormItem2>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    name: "DictionaryEdit",
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
          dictName: [
            {required: true, message: this.$t('placeholder.default', [this.$t('dictionary.dictName')]), trigger: 'blur'}
          ],
          module: [
            {required: true, message: this.$t('placeholder.default', [this.$t('dictionary.module')]), trigger: 'blur'}
          ],
          parentId: [
            {required: true, message: this.$t('placeholder.default', [this.$t('dictionary.parentId')]), trigger: 'blur'}
          ],
          dictCode: [],
          status: [],
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
              this.userAdd()
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
      userAdd() {
        this.$service.post('/system/dictionarys', this.data)
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
      },

      /**
       * 修改服务调用
       */
      userEdit() {
        this.$service.put('/system/dictionarys', this.data)
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
      },
    }
  }
</script>

<style scoped>

</style>
