<template>
  <el-row type="flex" justify="end">
    <el-form style="float: right;width: 100%;" label-position="left" :inline="true" :model="formData" ref="queryForm">
      <sFormItem3 style="width: 30%;" :label="$t('vendor.VENDOR_NAME')">
        <el-input ref="countVerdorName" v-model="formData.vendorName" clearable :placeholder="$t('placeholder.default',[$t('vendor.VENDOR_NAME')])"></el-input>
      </sFormItem3>
      <sFormItem3 style="width: 30%;" :label="$t('interface.interfaceName')">
        <el-input ref="countInterFaceName" v-model="formData.interfaceName" clearable :placeholder="$t('placeholder.default',[$t('vendor.INTERFACE_NAME')])"></el-input>
      </sFormItem3>
      <sFormItem3 label-width="0px" style="width: 37.1%;text-align: right;">
        <el-button class="search-btn baseBlue" @click="handleSearch">{{$t('query')}}</el-button>
        <el-button class="search-btn baseBlue" @click="handleReset('queryForm')">{{$t('reset')}}</el-button>
      </sFormItem3>
    </el-form>
  </el-row>
</template>

<script>
  export default {
    name: "CountQuery",
    data() {
      return {
        formData: {}
      }
    },
    methods: {
      // 查询功能
      handleSearch() {
        this.$emit('loadData', this.formData);
      },

      // 重置功能
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$refs.countVerdorName.currentValue = '';
        this.$refs.countInterFaceName.currentValue = '';
        this.formData = {};
        this.$emit('loadData', {offset: 1})
      }
    }
  }
</script>

<style>
  .search-btn{
    position: relative;
    left: 30px;
  }
</style>
