<template>
  <el-row type="flex" justify="left" style="margin: 0 !important;">
    <el-col :span="18">
      <el-form label-position="left" :inline="true" :model="formData" ref="queryForm" >
        <sFormItem2 :label="$t('interface.interfaceName')" style="width: 50%;">
          <el-input v-model="formData.interfaceName" clearable :placeholder="$t('placeholder.default',[$t('interface.interfaceName')])"></el-input>
        </sFormItem2>
        <sFormItem2 label-width="0px" style="width: 40%; margin-left: 30px;">
          <el-button class="baseBlue" @click="handleSearch">{{$t('query')}}</el-button>
          <el-button class="baseBlue" @click="handleReset('queryForm')" >{{$t('reset')}}</el-button>
        </sFormItem2>
      </el-form>
    </el-col>
    <el-col :span="6" style="text-align: right; padding-top: 0px;">
      <el-dropdown style="position: relative; top: -4px;">
        <el-button type="info">
          <i class="el-icon-arrow-down el-icon--center"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><a  @click="searchInterface()"><div class="circle-all"></div>{{$t('interface.allInterface')}}</a></el-dropdown-item>
          <el-dropdown-item><a  @click="searchInterface('0')"><div class="circle-normal"></div>{{$t('interface.normalInterface')}}</a></el-dropdown-item>
          <el-dropdown-item><a  @click="searchInterface('1')"><div class="circle-excep"></div>{{$t('interface.timeOutInterface')}}</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "CountQuery",
    data() {
      return {
        formData: {},
      }
    },
    methods: {
      // 查询功能
      handleSearch() {
        this.$emit('loadData', this.formData)
      },

      // 重置功能
      handleReset(name) {
        this.$refs[name].resetFields();
        this.formData.interfaceName = '';
        this.$emit('loadData', {offset: 1})
      },

      // 根据状态查询
      searchInterface(status){
        let param = {};
        if(this.formData.interfaceName != '' && this.formData.interfaceName != undefined){
          param = {
            'interfaceStatus': status,
            'interfaceName': this.formData.interfaceName
          };
        }else{
          param = {
            'interfaceStatus': status,
          };
        }
        this.$emit('loadData', param)
      }
    }
  }
</script>

<style>
  .circle-all{
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: #BCBCBC;
    border: 1px solid #BCBCBC;
    display: inline-block;
    margin-right: 2px;
  }
  .circle-normal{
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: #22AC38;
    border: 1px solid #BCBCBC;
    display: inline-block;
    margin-right: 2px;
  }

  .circle-excep{
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: #EC6941;
    border: 1px solid #BCBCBC;
    display: inline-block;
    margin-right: 2px;
  }
</style>
