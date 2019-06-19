<template>
  <div style="width: 92%;">
    <el-form :model="data" :rules="rules" label-width="120px">
      <el-row>
        <sFormItem2 :label="$t('log.flowNum')" prop="queryId">
          <el-input v-model="data.queryId" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('log.queryTime')" prop="reqDate">
          <el-input v-model="data.reqDate" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('interface.interfaceId')" prop="interfaceId">
          <el-input v-model="data.interfaceId" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('interface.interfaceName')" prop="interfaceDesc">
          <el-input v-model="data.interfaceDesc" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('log.stateCode')">
          <el-input :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('log.errorInfo')">
          <el-input :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('log.requestInfo')" style="width: 100%;">
          <textarea v-model="data.requestInfo" name="1" id="1" cols="30" rows="6" :disabled="operator=='view'" class="textArea"></textarea>
        </sFormItem2>
        <sFormItem2 :label="$t('log.responseInfo')" style="width: 100%;">
          <textarea v-model="data.responseInfo" name="2" id="2" cols="30" rows="6" :disabled="operator=='view'" class="textArea"></textarea>
        </sFormItem2>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "FLowView",
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
      data: {type: Object},
    },
    data() {
      return {
        rules: {
          queryId: [{required: true, message: this.$t('placeholder.default', [this.$t('log.flowNum')]), trigger: 'blur'}],
          reqDate: [{required: true, message: this.$t('placeholder.default', [this.$t('log.flowNum')]), trigger: 'blur'}],
          interfaceId: [{required: true, message: this.$t('placeholder.default', [this.$t('log.flowNum')]), trigger: 'blur'}],
          interfaceDesc: [{required: true, message: this.$t('placeholder.default', [this.$t('log.flowNum')]), trigger: 'blur'}]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .textArea {
    width: 100%;
    border-radius: 4px;
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
</style>
