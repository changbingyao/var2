<template>
  <div>
    <el-form :model="data" :rules="rules" ref="vendorEditForm" label-width="120px">
      <!--基本信息-->
      <el-row class="leftLine">
        <i></i>{{$t('basicinfo')}}
      </el-row>
      <el-row>
        <sFormItem2 :label="$t('vendor.VENDOR_NAME')" prop="vendorName">
          <el-input v-model="data.vendorName" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('vendor.VERSION_NUM')" prop="versionNum">
          <el-input maxLength="20" v-model="data.versionNum" ref="versionNumRef" :disabled="operator=='view'" @input="validateVersionNum($event)"></el-input>
          <div class="el-form-item__error" v-show="versionNumCtrl">{{$t('vendor.VERSION_NUM')}}{{$t('validate.notExsitChinese')}}</div>
        </sFormItem2>
        <sFormItem2 :label="$t('vendor.VENDOR_ID')" >
          <el-input v-model="data.vendorId"  :disabled="operator=='view'" ></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('vendor.LOGICAL_CLASS_NAME')">
          <el-input v-model="data.logicalClassName" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('vendor.READOUT_TIME')" >
          <el-input v-model="data.readoutTime" ref="readoutTimeRef" :disabled="operator=='view'" @input="validateReadOutTime($event)"></el-input>
          <div class="el-form-item__error" v-show="readoutTimeCtrl">{{$t('vendor.READOUT_TIME')}}{{$t('validate.exsitNumber')}}</div>
        </sFormItem2>
        <sFormItem2 :label="$t('interface.serId')" prop="serId" >
          <el-input v-model="data.serId" :disabled="operator=='view' || operator=='edit'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('vendor.SER_NAME')" >
          <el-input v-model="data.serName" :disabled="operator=='view'" ></el-input>
        </sFormItem2>
        <sFormItem3 style="width: 50%;" :label="$t('vendor.SER_TYPE')" prop="serType">
          <sSelect style="width: 100%;" v-model="data.serType" :option="serviceTypeList" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('vendor.SER_TYPE')])" clearable></sSelect>
        </sFormItem3>
        <sFormItem2 :label="$t('vendor.CONTRACT_INFO')" >
          <el-input v-model="data.contractInfo"  :disabled="operator=='view'"></el-input>
        </sFormItem2>
      </el-row>
      <!--请求信息-->
      <el-row class="leftLine">
        <i></i>{{$t('requestinfo')}}
      </el-row>
      <el-row>
        <sFormItem2 :label="$t('vendor.REQ_TYPE')" prop="reqType" style="width: 50%;">
          <sSelect v-model="data.reqType"
                     :option="vendorReqTypeList"
                     :disabled="operator=='view'"
                     :placeholder="$t('placeholder.select',[$t('vendor.REQ_TYPE')])" clearable
                     style="width: 100%;">
          </sSelect>
        </sFormItem2>
        <sFormItem2 :label="$t('vendor.REQ_ADRESS')" prop="reqAdress">
          <el-input v-model="data.reqAdress" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('vendor.VIRTUAL_DIRECTORY')" prop="virtualDirectory">
          <el-input v-model="data.virtualDirectory" :disabled="operator=='view'" ></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('vendor.REQ_PORT')" prop="reqPort">
          <el-input v-model="data.reqPort" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 :label="$t('vendor.REQ_PARA_MODE')" prop="reqParaMode" style="width: 50%;">
          <sSelect v-model="data.reqParaMode"
                     :option="vendorParamsList"
                     :disabled="operator=='view'"
                     :placeholder="$t('placeholder.select',[$t('vendor.REQ_PARA_MODE')])" clearable
                     style="width: 100%;">
          </sSelect>
        </sFormItem2>
        <sFormItem2 :label="$t('vendor.RES_PARA_MODE')" prop="resParaMode" style="width: 50%;">
          <sSelect v-model="data.resParaMode"
                     :option="vendorParamsList"
                     :disabled="operator=='view'"
                     :placeholder="$t('placeholder.select',[$t('vendor.RES_PARA_MODE')])"
                     clearable
                     style="width: 100%;">
          </sSelect>
        </sFormItem2>
      </el-row>
      <!--评分信息-->
      <el-row class="leftLine">
        <i></i>{{$t('Scoringinfo')}}
      </el-row>
      <el-row>
        <sFormItem2 :label="$t('vendor.REQ_TIME_LEVEL')" >
          <el-input v-model="data.reqTimeLevel" ref="reqTimeLevelRef" :disabled="operator=='view'" @input="validateReqTimeLevel($event)"></el-input>
          <div class="el-form-item__error" v-show="reqTimeLevelCtrl">{{$t('vendor.REQ_TIME_LEVEL')}}{{$t('validate.exsitNumber')}}</div>
        </sFormItem2>
        <sFormItem2 :label="$t('vendor.DATA_ACCU_SCORE')" >
          <el-input maxLength="3" v-model="data.dataAccuScore" ref="reqDataAccuScore" :disabled="operator=='view'" @input="validateDataAccuScore($event)"></el-input>
          <div class="el-form-item__error" v-show="reqDataAccuScoreCtrl">{{$t('vendor.DATA_ACCU_SCORE')}}{{$t('validate.onlyNumber')}}</div>
        </sFormItem2>
      </el-row>
      <el-row>
        <sFormItem2 align="right" col-span="24">
          <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
          <el-button class="baseBlue" v-permission="'save','保存'" @click="handleSubmit('vendorEditForm')" v-show="operator!='view'">{{$t('ok')}}</el-button>
        </sFormItem2>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import '@/assets/js/validate'
  export default {
    name: "VendorEdit",
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
        serviceTypeList: [
          {label: '内部服务', value: 'I'},
          {label: '外部服务', value: 'O'}
        ],
        initCurrentRow: {},
        vendorReqTypeList: [],
        vendorParamsList: [],
        versionNumCtrl: false,
        readoutTimeCtrl: false,
        reqTimeLevelCtrl: false,
        reqDataAccuScoreCtrl: false,
        //校验输入
        rules: {
          vendorName: [{required: true, message: this.$t('placeholder.default', [this.$t('vendor.VENDOR_NAME')])}],
          serId: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.serId')]), trigger: 'blur'}],
          serType: [{required: true, message: this.$t('placeholder.select', [this.$t('vendor.SER_TYPE')]), trigger: 'change'}],
          reqType: [{required: true, message: this.$t('placeholder.select', [this.$t('vendor.REQ_TYPE')]), trigger: 'change'}],
          reqAdress: [{required: true, message: this.$t('placeholder.default', [this.$t('vendor.REQ_ADRESS')]), trigger: 'blur'}],
          virtualDirectory: [{required: true, message: this.$t('placeholder.default', [this.$t('vendor.VIRTUAL_DIRECTORY')]), trigger: 'blur'}],
          reqPort: [{required: true, message: this.$t('placeholder.default', [this.$t('vendor.REQ_PORT')]), trigger: 'blur'}],
          reqParaMode: [{required: true, message: this.$t('placeholder.select', [this.$t('vendor.REQ_PARA_MODE')]), trigger: 'change'}],
          resParaMode: [{required: true, message: this.$t('placeholder.select', [this.$t('vendor.RES_PARA_MODE')]), trigger: 'change'}]
        }
      }
    },
    watch: {
      data: function (newVal, oldVal) {
        if (newVal) {
          this.handleClear();
          this.data = newVal;
        }
      }
    },
    mounted() {
      this.getVendorReqTypeList();
      this.getVendorParamsList();
    },
    methods: {
      // 校验版本号  版本号码不能有中文字符
      validateVersionNum(evt) {
        if (valiVersionNum(evt)) {
          this.$refs.versionNumRef.$el.children[0].style.borderColor="#f56c6c";
          this.versionNumCtrl = true;
        } else {
          this.versionNumCtrl = false;
          this.$refs.versionNumRef.$el.children[0].style.borderColor="#dcdfe6";
        }
      },

      // 校验超时时间  超时时间不能输入汉字、字符、符号
      validateReadOutTime(evt) {
        if (valiReadoutTime(evt)) {
          this.$refs.readoutTimeRef.$el.children[0].style.borderColor="#f56c6c";
          this.readoutTimeCtrl = true;
        } else {
          this.$refs.readoutTimeRef.$el.children[0].style.borderColor="#dcdfe6";
          this.readoutTimeCtrl = false;
        }
      },

      // 校验评分信息响应时间  响应时间不能输入汉字、字符、符号
      validateReqTimeLevel(evt) {
        if (valiReadoutTime(evt)) {
          this.$refs.reqTimeLevelRef.$el.children[0].style.borderColor="#f56c6c";
          this.reqTimeLevelCtrl = true;
        } else {
          this.$refs.reqTimeLevelRef.$el.children[0].style.borderColor="#dcdfe6";
          this.reqTimeLevelCtrl = false;
        }
      },

      // 校验评分信息数据准确性评分  数据准确性评分不能输入汉字、字符、符号（.除外）
      validateDataAccuScore(evt) {
        if (valiDataAccuScore(evt)) {
          this.$refs.reqDataAccuScore.$el.children[0].style.borderColor="#f56c6c";
          this.reqDataAccuScoreCtrl = true;
        } else {
          this.$refs.reqDataAccuScore.$el.children[0].style.borderColor="#dcdfe6";
          this.reqDataAccuScoreCtrl = false;
        }
      },

      // 获取传递过来的数据
      getCurrentRowData(data) {
        this.initCurrentRow = Object.assign({}, data);
      },

      // 获取请求类型下拉框值
      getVendorReqTypeList() {
        this.$service.get('/plist/REQ_TYPE').then(r => {
          if(r.data.code === '000000') {
            this.vendorReqTypeList = r.data.data;
          } else {
            this.$message({
              showClose: true,
              message: r.data.msg,
              type: 'error'
            });
          }
        })
      },

      // 获取参数下拉框值
      getVendorParamsList() {
        this.$service.get('/plist/REQ_PARA_MODE').then(r => {
          if(r.data.code === '000000') {
            this.vendorParamsList = r.data.data;
          } else {
            this.$message({
              showClose: true,
              message: r.data.msg,
              type: 'error'
            });
          }
        })
      },

      // 清空验证
      handleClear() {
        this.$refs.vendorEditForm.clearValidate();
      },

      // 取消功能
      handleCancel() {
        this.$refs.vendorEditForm.clearValidate();
        this.versionNumCtrl = false;
        this.readoutTimeCtrl = false;
        this.reqTimeLevelCtrl = false;
        this.reqDataAccuScoreCtrl = false;
        this.$refs.versionNumRef.$el.children[0].style.borderColor="#dcdfe6";
        this.$refs.readoutTimeRef.$el.children[0].style.borderColor="#dcdfe6";
        this.$refs.reqTimeLevelRef.$el.children[0].style.borderColor="#dcdfe6";
        this.$refs.reqDataAccuScore.$el.children[0].style.borderColor="#dcdfe6";
        Object.assign(this.$options.propsData.data, this.initCurrentRow);
        this.$emit('closeDialog', false);

      },

      // 确认提交功能
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operator == "edit") {
              this.vendorEdit();
            } else {
              this.vendorAdd();
            }
          } else {
            return false;
          }
        });
      },

      // 添加功能
      vendorAdd() {
        if (!this.versionNumCtrl && !this.readoutTimeCtrl && !this.reqTimeLevelCtrl && !this.reqDataAccuScoreCtrl) {
          this.$service.post('/vendor/vendorInfo', this.data)
            .then(r => {
              if (r.data.code === '000000') {
                this.handleCancel();
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
                });
            })
        }
      },

      // 编辑功能
      vendorEdit() {
        if (!this.versionNumCtrl && !this.readoutTimeCtrl && !this.reqTimeLevelCtrl && !this.reqDataAccuScoreCtrl) {
          this.$service.put('/vendor/vendorInfo', this.data)
            .then(r => {
              if (r.data.code === '000000') {
                this.handleCancel();
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
              });
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>
