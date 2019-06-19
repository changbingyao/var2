<template>
  <div style="width: 93%;">
    <el-form :model="batchData" :rules="batchRules" ref="batchViewRef" label-width="120px">
      <el-row>
        <sFormItem2 required style="width: 100%;" :label="$t('batch.access')">
          <sSelect class="batchWidth" @change="changeAccess" v-model="batchData.accessId" :option="accessOptions" :placeholder="$t('placeholder.select',[$t('batch.access')])"></sSelect>
        </sFormItem2>
        <sFormItem2 required style="width: 100%;" :label="$t('batch.chooseTemplate')">
          <sSelect class="batchWidth" @change="changeTemplate" v-model="batchData.templateName" :option="templateOptions" :placeholder="$t('placeholder.select',[$t('batch.template')])"></sSelect>
        </sFormItem2>
        <sFormItem2 required style="width: 100%;" :label="$t('batch.testInterface')">
          <div style="text-align: center">
            <el-transfer
              style="display: inline-block; text-align: left;"
              v-model="transferValue"
              :data="transferData"
              :props="{
                key: 'key',
                label: 'label'
              }"
              :left-default-checked="[]"
              :right-default-checked="[]"
              :titles="['供应商 — 接口名称', '供应商 — 接口名称']"
              :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
              }">
            </el-transfer>
          </div>
        </sFormItem2>
        <sFormItem2 style="width: 100%;" :label="$t('batch.download')">
          <span class="download" @click="downloadTemplate(batchData.templateName)">{{batchData.templateName}}</span>
          <span class="tips" v-show="batchData.templateName != ''">* 点击文件名下载</span>
        </sFormItem2>
        <sFormItem2 required style="width: 100%;" :label="$t('batch.callType')">
          <sSelect class="batchWidth" v-model="batchData.useType" :option="callTypeOptions" :placeholder="$t('placeholder.select',[$t('batch.callType')])"></sSelect>
        </sFormItem2>
        <sFormItem2 required style="width: 100%;" :label="$t('batch.pendingFile')">
          <el-input v-if="fileList[0] && fileList[0].name" v-model="fileList[0].name" style="width: 90.3%;" :placeholder="$t('placeholder.select',[$t('batch.uploadFile')])" disabled></el-input>
          <el-input v-else style="width: 90.3%;" :placeholder="$t('placeholder.select',[$t('batch.uploadFile')])" disabled></el-input>
          <el-upload
            style="display: inline-block; width: 9%;"
            ref="upload"
            accept=".xlsx, .xls"
            action=""
            :on-change="handleFileChange"
            :before-upload="beforeFileUpload"
            :auto-upload="false">
            <el-button slot="trigger" size="small" class="baseBlue">浏览</el-button>
          </el-upload>
          <div class="tips">* 只能上传excel文件，且不超过10MB</div>
        </sFormItem2>
      </el-row>
      <!--footer部分-->
      <el-row>
        <sFormItem2 align="right" col-span="24">
          <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
          <el-button class="baseBlue" v-permission="'save','保存'" @click="handleSubmit">{{$t('ok')}}</el-button>
        </sFormItem2>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "BatchView",
    data() {
      return {
        transferValue: [],
        batchData: {
          accessId: '',
          accessName: '',
          templateName: '',
          useType: ''
        },
        templateInterData: {},
        accessOptions: [],
        templateOptions: [],
        transferData: [],
        callTypeOptions: [
          {label: '产品开发测试', value: '产品开发测试'},
          {label: '产品销售测试', value: '产品销售测试'},
          {label: '客户正式调用', value: '客户正式调用'}
        ],
        fileList: [],
        batchRules: {
          userName: [{required: true, message: this.$t('placeholder.select', [this.$t('vendor.VENDOR_NAME')]), trigger: 'change'}],
          templateName: [{required: true, message: this.$t('placeholder.select', [this.$t('batch.chooseTemplate')]), trigger: 'change'}],
          testInterface: [{required: true, message: this.$t('placeholder.default', [this.$t('batch.testInterface')]), trigger: 'blur'}],
          callType: [{required: true, message: this.$t('placeholder.select', [this.$t('batch.callType')]), trigger: 'change'}],
          pendingFile: [{required: true, message: this.$t('placeholder.select', [this.$t('batch.pendingFile')]), trigger: 'blur'}],
        }
      }
    },
    methods: {
      // 查询接入商列表项
      getAccessOptions() {
        this.$service.get('/req/reqSystemRegs', {params: {limit: 10000, offset: 0}})
          .then(r => {
            if (r.data.code === '000000') {
              this.accessOptions = [];
              if (r.data.data.rows.length > 0) {
                r.data.data.rows.forEach((item) => {
                  this.accessOptions.push({label: item.regSystemDesc, value: item.reqSystemId})
                })
              }
            } else {
              this.$message({
                showClose: true,
                message: r.data.msg,
                type: 'error'
              });
            }
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      },

      //  查询模板列表项
      getTemplateOptions() {
        this.$service.get('/batch/getXmlList')
          .then(r => {
            if (r.data.code === '000000') {
              this.templateInterData = {};
              this.templateOptions = [];
              this.templateInterData = r.data.data;
              for(var key in r.data.data) {
                this.templateOptions.push({label: key, value: key, key: key});
              }
            } else {
              this.$message({
                showClose: true,
                message: r.data.msg,
                type: 'error'
              });
            }
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      },

      // 根据接入商ID选取接入商名称
      changeAccess(name) {
        this.accessOptions.forEach((item) => {
          if (item.value == name) {
            this.batchData.accessName = item.label;
          }
        })
      },

      //  根据模板查询对应接口
      changeTemplate(name) {
        for(var key in this.templateInterData) {
          if (name == key) {
            this.transferData = [];
            this.templateInterData[key].forEach((item) => {
              this.transferData.push({label: item.supplier + '—' + item.name, key: item.supplierId + '—' + item.name + '—' + item.id})
            })
          }
        }
      },

      handleFileChange(file) {
        this.fileList = [];
        this.fileList.push(file);
      },

      beforeFileUpload(file) {
        this.fileList = [];
        this.fileList[0] = file;
      },

      // 下载模板功能
      downloadTemplate(name) {
        const API_ROOT = (process.env.NODE_ENV === 'production') ? '' : 'http://192.168.145.181:8080';
        window.location = API_ROOT + '/batch/download/?downloadType=templet&filePath=' + name;
      },

      // 提交功能
      handleSubmit() {
        var ids = [];
        var names = [];
        var idList = '';
        var nameList = '';
        this.transferValue.forEach(item => {
          names.push(item.split('—')[1]);
          ids.push(item.split('—')[2]);
        });
        idList = ids.join(',');
        nameList = names.join(',');
        this.$refs['upload'].submit();
        let fd = new FormData();
        var bean = {
          userName: JSON.parse(localStorage.getItem('user')),
          useServiceId: idList,
          useService: nameList,
          requestId: this.batchData.accessId,
          requestName: this.batchData.accessName,
          useType: this.batchData.useType
        };
        fd.append('inFile', this.fileList[0]);
        fd.append('bean',JSON.stringify(bean));
        this.$service.post('/batch/batch', fd)
          .then(r => {
            if(r.data.code === '000000') {
              this.handleCancel();
              this.$message({
                showClose: true,
                message: r.data.msg,
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
          });
      },

      // 取消功能
      handleCancel() {
        this.handleClose();
        this.$emit('closeModal');
        this.$emit('loadData');
      },

      // 清空数据
      handleClose() {
        this.$refs.batchViewRef.clearValidate();
        this.batchData = {
          accessId: '',
          accessName: '',
          templateName: '',
          useType: ''
        };
        this.templateInterData = {};
        this.transferValue = [];
        this.transferData = [];
        this.fileList = [];
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .batchWidth {
    width: 100% !important;
  }

  /deep/ .el-transfer {
    width: 100% !important;
  }

  /deep/ .el-transfer > .el-transfer-panel {
    width: 41.8% !important;
  }

  /deep/ .el-transfer > .el-transfer-panel > .el-transfer-panel__header > .el-checkbox > .el-checkbox__label {
    font-size: 14px;
  }

  /deep/ .el-transfer > .el-transfer-panel > .el-transfer-panel__body > .el-checkbox-group > .el-checkbox > .el-checkbox__label > span {
    font-size: 12px !important;
  }

  /deep/ .el-transfer__buttons {
    padding: 0 10px !important;
  }

  /deep/ .el-upload-list {
    display: none !important;
  }

  /deep/ .download {
    padding-right: 10px;
    text-decoration: underline;
    color:rgba(0, 0, 238, 1);
    cursor: pointer;
  }

  .tips {
    font-size: 12px;
    color:#f56c6c;
  }
</style>
