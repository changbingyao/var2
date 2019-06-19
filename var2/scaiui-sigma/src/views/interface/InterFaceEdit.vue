<template>
  <div>
    <el-tabs v-model="activeName" :before-leave="handleBeforeLeaveTab">
      <!--基本信息-->
      <el-tab-pane :label="$t('basicinfo')" name="first">
        <el-form :model="baseData" :rules="baseRules" ref="interfaceBaseForm" label-width="120px">
          <el-row>
            <sFormItem2 :label="$t('interface.interfaceId')" prop="interfaceId">
              <el-input v-model="baseData.interfaceId" :disabled="operator=='edit' || operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.interfaceName')" prop="interfaceName">
              <el-input v-model="baseData.interfaceName" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.readoutTime')" prop="readoutTime">
              <el-input v-model="baseData.readoutTime" ref="interfaceOutTimeRef" :disabled="operator=='view'" @input="validateReadOutTime($event)"></el-input>
              <div class="el-form-item__error" v-show="interfaceReadoutTimeCtrl">{{$t('vendor.READOUT_TIME')}}{{$t('validate.exsitNumber')}}</div>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.dataPersistence')" prop="dataPersistence">
              <sSelect v-model="baseData.dataPersistence" option="YN" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('interface.dataPersistence')])" clearable></sSelect>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.dataPerTime')" prop="dataPerTime">
              <el-input v-model="baseData.dataPerTime" type="number" min="0" :disabled="operator=='view' || baseData.dataPersistence == 'N'" :placeholder="$t('placeholder.default',[$t('interface.dataPerTime')])"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.dataPerTimeUnit')" prop="dataPerTimeUnit">
              <sSelect v-model="baseData.dataPerTimeUnit" option="TIME_UNIT" :disabled="operator=='view' || baseData.dataPersistence == 'N'" :placeholder="$t('placeholder.select',[$t('interface.dataPerTimeUnit')])" clearable></sSelect>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.reqType')" prop="reqType">
              <sSelect v-model="baseData.reqType" option="REQ_METHOD" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('interface.reqType')])" clearable></sSelect>
            </sFormItem2>
            <sFormItem2 :label="$t('vendor.VIRTUAL_DIRECTORY')">
              <el-input v-model="baseData.reqUrl" :disabled="operator=='view'" :placeholder="$t('placeholder.default',[$t('vendor.VIRTUAL_DIRECTORY')])"></el-input>
            </sFormItem2>
            <sFormItem2 :required="true" :label="$t('interface.serId')" prop="serId">
              <sSelect v-model="baseData.serId" :option="serviceIdList" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('interface.serId')])" clearable></sSelect>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.interfaceDesc')" prop="interfaceDesc">
              <el-input v-model="baseData.interfaceDesc" :disabled="operator=='view'"></el-input>
            </sFormItem2>
          </el-row>
          <el-row>
            <sFormItem2 align="right" col-span="24">
              <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
              <el-button class="baseBlue" v-permission="'save','确定'" @click="TurnTo(1, 'interfaceBaseForm')" v-show="operator != 'view'">{{$t('nextStep')}}</el-button>
            </sFormItem2>
          </el-row>
        </el-form>
      </el-tab-pane>
      <!--发送报文定义-->
      <el-tab-pane :label="$t('sendinfo')" name="second">
        <el-form :model="{'request':requestData}"  :rules="interRequestRules" ref="interRequestForm" label-width="120px">
          <!--<el-row>-->
          <!--<sFormItem2>-->
          <!--<el-upload class="upload-demo" ref="uploadsend" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false" :disabled="operator=='view'">-->
          <!--<el-button slot="trigger" size="small" type="primary">{{$t('fileupload')}}</el-button>-->
          <!--</el-upload>-->
          <!--</sFormItem2>-->
          <!--</el-row>-->
          <el-row>
            <sTreeTable2 border :data="requestData">
              <el-table-column :label="$t('interface.dcType')" width="110">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getRequestProp(scope.row,'dcType')">
                    <sSelect v-model="scope.row.dcType" option="DC_TYPE"
                             :placeholder="$t('placeholder.select',[$t('interface.dcType')])"
                             :disabled="operator=='view'" clearable prop="dcType"></sSelect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcSign')" width="115">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getRequestProp(scope.row,'dcSign')">
                    <el-input size="small" v-model="scope.row.dcSign" :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcName')" width="115">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getRequestProp(scope.row,'dcName')">
                    <el-input size="small" v-model="scope.row.dcName" :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcMaxLenght')">
                <template slot-scope="scope">
                  <el-form-item label-width="0">
                    <el-input size="small" type="number" min="0" v-model="scope.row.dcMaxLenght"
                              :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcValueRange')">
                <template slot-scope="scope">
                  <el-form-item label-width="0">
                    <el-input size="small" v-model="scope.row.dcValueRange" :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.required')" width="115">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getRequestProp(scope.row,'required')">
                    <sSelect size="small" v-model="scope.row.required" :disabled="operator=='view'" option="YN01"
                             :placeholder="$t('placeholder.select',[$t('interface.required')])" clearable></sSelect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('action')" v-if="operator!=='view'" min-width="120px">
                <template slot-scope="scope">
                  <el-form-item label-width="0">
                    <el-button type="text" size="mini" @click="addRoot('request')" v-show="scope.$index==0" class="el-icon-plus" style="color: #0086FF;" :disabled="operator=='view'">{{$t('addRoot')}}</el-button>
                    <el-button type="text" size="mini" @click="addChildren('request',scope.row)" class="el-icon-circle-plus" style="color: #0086FF;" :disabled="operator=='view'">{{$t('addChildren')}}</el-button>
                    <el-button type="text" size="mini" @click="removeRow('request', scope.row)" class="el-icon-remove" style="color: #0086FF;" v-show="scope.$index>0" :disabled="operator=='view'">{{$t('delete')}}</el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </sTreeTable2>
          </el-row>
          <br>
          <el-row>
            <sFormItem2 align="right" col-span="24">
              <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
              <el-button class="baseBlue" v-permission="'save','保存'" @click="TurnTo(2, 'interRequestForm')" v-show="operator!='view'">{{$t('nextStep')}}</el-button>
            </sFormItem2>
          </el-row>
        </el-form>
      </el-tab-pane>
      <!--页签三：响应报文定义-->
      <el-tab-pane :label="$t('respondinfo')" name="third">
        <el-form :model="{'response':responseData}"  :rules="interResponseRules" ref="interResponseForm" label-width="120px">
          <!--<el-row>-->
          <!--<sFormItem2>-->
          <!--<el-upload class="upload-demo" ref="uploadRespond" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false" :disabled="operator=='view'">-->
          <!--<el-button slot="trigger" size="small" type="primary">{{$t('fileupload')}}</el-button>-->
          <!--</el-upload>-->
          <!--</sFormItem2>-->
          <!--</el-row>-->
          <el-row>
            <sTreeTable2 :data="responseData" expand-all>
              <el-table-column :label="$t('interface.dcType')">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getResponseProp(scope.row,'dcType')">
                    <sSelect v-model="scope.row.dcType" option="DC_TYPE"
                             :placeholder="$t('placeholder.select',[$t('interface.dcType')])"
                             :disabled="operator=='view'" clearable prop="dcType"></sSelect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcSign')">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getResponseProp(scope.row,'dcSign')">
                    <el-input size="small" v-model="scope.row.dcSign" :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcName')">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getResponseProp(scope.row,'dcName')">
                    <el-input size="small" v-model="scope.row.dcName" :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcMaxLenght')">
                <template slot-scope="scope">
                  <el-form-item label-width="0">
                    <el-input size="small" type="number" min="0" v-model="scope.row.dcMaxLenght"
                              :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcValueRange')">
                <template slot-scope="scope">
                  <el-form-item label-width="0">
                    <el-input size="small" v-model="scope.row.dcValueRange" :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('action')" v-if="operator!=='view'" min-width="120px">
                <template slot-scope="scope">
                  <el-form-item label-width="0">
                    <el-button type="text" size="mini" @click="addRoot('response')" v-show="scope.$index==0" class="el-icon-plus" style="color: #0086FF;" :disabled="operator=='view'">{{$t('addRoot')}}</el-button>
                    <el-button type="text" size="mini" @click="addChildren('response',scope.row)" class="el-icon-circle-plus" style="color: #0086FF;" :disabled="operator=='view'">{{$t('addChildren')}}</el-button>
                    <el-button type="text" size="mini" @click="removeRow('response', scope.row)" class="el-icon-remove" style="color: #0086FF;" v-show="scope.$index>0" :disabled="operator=='view'">{{$t('delete')}}</el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </sTreeTable2>
          </el-row>
          <br>
          <el-row>
            <sFormItem2 align="right" col-span="24">
              <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
              <el-button class="baseBlue" v-permission="'save','保存'" @click="handleSubmit" v-show="operator!='view'">{{$t('ok')}}</el-button>
            </sFormItem2>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import '@/assets/js/validate'
  export default {
    name: "InterFaceEdit",
    props: {
      operator: '',
      interfaceId: {type: String}
    },
    data() {
      return {
        baseData: {
          interfaceId: '',
          interfaceName: '',
          readoutTime: '',
          interfaceType: 'A',
          dataPersistence: 'Y',
          dataPerTime: '',
          dataPerTimeUnit: '',
          reqType: 'get',
          reqUrl: '',
          serId: '',
          interfaceDesc: ''
        },
        requestData: [{
          dcType: 'String',
          dcSign: '',
          dcName: '',
          dcMaxLenght: '',
          dcValueRange: '',
          required: '1'
        }],
        responseData: [{
          dcType: 'Object',
          dcSign: '',
          dcName: '',
          dcMaxLenght: '',
          dcValueRange: '',
          required: '1'
        }],
        serviceIdList: [],
        interfaceReadoutTimeCtrl: false,
        activeName: 'first',
        sendInfo: [],
        respondInfo: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        baseRules: {
          interfaceName: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.interfaceName')]), trigger: 'blur'}],
          interfaceId: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.interfaceId')]), trigger: 'blur'}],
          dataPersistence: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.dataPersistence')]), trigger: 'change'}],
          dataPerTime: [{required: '', message: this.$t('placeholder.default', [this.$t('interface.dataPerTime')]), trigger: 'blur'}],
          dataPerTimeUnit: [{required: '', message: this.$t('placeholder.select', [this.$t('interface.dataPerTimeUnit')]), trigger: 'change'}],
          reqType: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.reqType')]), trigger: 'change'}],
          serId: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.serId')]), trigger: 'change'}]
        }
      }
    },
    watch: {
      operator: function(newVal, oldVal) {
        if(newVal == 'add') {
          this.baseData = {
            interfaceId: '',
            interfaceName: '',
            readoutTime: '',
            interfaceType: 'A',
            dataPersistence: 'Y',
            dataPerTime: '',
            dataPerTimeUnit: '',
            reqType: 'get',
            reqUrl: '',
            serId: '',
            interfaceDesc: ''
          };
          this.requestData = [{
            dcType: 'String',
            dcSign: '',
            dcName: '',
            dcMaxLenght: '',
            dcValueRange: '',
            required: '0'
          }];
          this.responseData = [{
            dcType: 'Object',
            dcSign: '',
            dcName: '',
            dcMaxLenght: '',
            dcValueRange: '',
            required: '0'
          }]
        }
      },
      currentRow: {
        handler (newVal, oldVal) {
          if(newVal.dataPersistence == 'Y' || oldVal.dataPersistence == 'Y') {
            this.rules.dataPerTime[0].required = true;
            this.rules.dataPerTimeUnit[0].required = true;
          } else {
            this.currentRow.dataPerTime = '';
            this.currentRow.dataPerTimeUnit = '';
            this.rules.dataPerTime[0].required = false;
            this.rules.dataPerTimeUnit[0].required = false;
          }
        },
        deep:true
      }
    },
    computed: {
      interRequestRules() {
        return {
          request: this.$TableUtil.getRuleByData(this.requestData, {
            0: {
              dcType: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.dcType')]), trigger: 'change'}],
              dcSign: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.dcSign')]), trigger: 'blur'}],
              dcName: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.dcSign')]), trigger: 'blur'}],
              required: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.required')]), trigger: 'change'}]
            }
          })
        }
      },
      interResponseRules() {
        return {
          response: this.$TableUtil.getRuleByData(this.responseData, {
            0: {
              dcType: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.dcType')]), trigger: 'change'}],
              dcSign: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.dcSign')]), trigger: 'blur'}],
              dcName: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.dcSign')]), trigger: 'blur'}]
            }
          })
        }
      }
    },
    mounted() {
      this.handleClear();
    },
    methods: {
      // 发送报文校验属性获取
      getRequestProp(row, column) {
        return "request." + row._path + "." + column;
      },

      // 响应报文校验属性获取
      getResponseProp(row, column) {
        return "response." + row._path + "." + column;
      },

      // 校验超时时间  超时时间不能输入汉字、字符、符号
      validateReadOutTime(evt) {
        if (valiReadoutTime(evt)) {
          //this.$refs.interfaceOutTimeRef.$el.children[0].style.borderColor="#f56c6c";
          this.interfaceReadoutTimeCtrl = true;
        } else {
          //this.$refs.interfaceOutTimeRef.$el.children[0].style.borderColor="#dcdfe6";
          this.interfaceReadoutTimeCtrl = false;
        }
      },

      // 切换标签时校验
      handleBeforeLeaveTab(name) {
        var tabCtrl = '';
        if (this.activeName == 'first' && name == 'second' || this.activeName == 'first' && name == 'third') {
          this.$refs.interfaceBaseForm.validate((valid) => {
            if (valid && !this.interfaceReadoutTimeCtrl) {
              this.activeName = 'second';
              tabCtrl = true;
            } else {
              tabCtrl = false;
            }
          });
          return tabCtrl;
        } else if (this.activeName == 'second' && name == 'third' || this.activeName == 'first' && name == 'third') {
          this.$refs.interRequestForm.validate((valid) => {
            if (valid && !this.interfaceReadoutTimeCtrl) {
              this.activeName = 'third';
              tabCtrl = true;
            } else {
              tabCtrl = false;
            }
          });
          return tabCtrl;
        }
      },

      // 模态框页签切换
      TurnTo(flg, formName) {
        if (flg === 1) {
          this.$refs[formName].validate((valid) => {
            if (valid && !this.interfaceReadoutTimeCtrl) {
              this.activeName = 'second';
            } else {
              return false;
            }
          })
        }
        if (flg === 2) {
          this.$refs[formName].validate((valid) => {
            if (valid && !this.interfaceReadoutTimeCtrl) {
              this.activeName = 'third';
            } else {
              return false;
            }
          });
        }
      },

      // 点击取消按钮时关闭对话框
      handleCancel() {
        this.activeName = 'first';
        this.$refs.interfaceBaseForm.clearValidate();
        this.interfaceReadoutTimeCtrl = false;
        this.baseData = {
          interfaceId: '',
          interfaceName: '',
          readoutTime: '',
          interfaceType: 'A',
          dataPersistence: 'Y',
          dataPerTime: '',
          dataPerTimeUnit: '',
          reqType: 'get',
          reqUrl: '',
          serId: '',
          interfaceDesc: ''
        };
        this.requestData = [{
          dcType: 'String',
          dcSign: '',
          dcName: '',
          dcMaxLenght: '',
          dcValueRange: '',
          required: '1'
        }];
        this.responseData = [{
          dcType: 'Object',
          dcSign: '',
          dcName: '',
          dcMaxLenght: '',
          dcValueRange: '',
          required: '1'
        }];
        this.$emit('closeModal');
        this.$emit('closeDialog', false);
      },

      // 清空验证
      handleClear() {
        this.activeName = 'first';
        this.$refs.interfaceBaseForm.clearValidate();
      },

      // 获取服务ID项
      getServiceIdList() {
        this.$service.get('vendor/vendorInfo/serId', {params: {serType: "O"}})
          .then(r => {
            if (r.data.code === '000000') {
              this.serviceIdList = [];
              r.data.data.map(item => {
                this.serviceIdList.push({value: item.serId, label: item.serName})
              });
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

      // 根据ID查询对应的发送和响应报文
      getInnerInterFaceInfo() {
        if (this.interfaceId) {
          this.$service.get('/interface/inter/' + this.interfaceId)
            .then( r => {
              if (r.data.code === '000000') {
                this.baseData = r.data.data['INTER_INFO'];
                this.requestData = r.data.data.in;
                if (!this.requestData || this.requestData.length == 0) {
                  this.requestData = [{
                    dcType: 'String',
                    dcSign: '',
                    dcName: '',
                    dcMaxLenght: '',
                    dcValueRange: '',
                    required: '1'
                  }]
                }
                this.responseData = r.data.data.out;
                if (!this.responseData || this.responseData.length == 0) {
                  this.responseData = [{
                    dcType: 'Object',
                    dcSign: '',
                    dcName: '',
                    dcMaxLenght: '',
                    dcValueRange: '',
                    required: '1'
                  }]
                }
              } else {
                this.$message({
                  showClose: true,
                  message: r.data.msg,
                  type: 'error'
                });
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: err,
                type: 'error'
              });
            });
        }
      },

      // 点击确定按钮时保存数据
      handleSubmit() {
        if (this.activeName == 'third') {
          this.$refs["interResponseForm"].validate((valid) => {
            if (valid) {
              if (this.operator == "edit") {
                this.interfaceEdit();
              } else {
                this.interfaceAdd();
              }
            } else {
              return false;
            }
          });
        }
      },

      // 添加功能
      interfaceAdd() {
        this.$service.post('/interface/inter', Object.assign(this.baseData, {in: this.requestData, out: this.responseData}))
          .then(r => {
            if (r.data.code === '000000') {
              this.baseData = {
                interfaceId: '',
                interfaceName: '',
                readoutTime: '',
                interfaceType: 'A',
                dataPersistence: 'Y',
                dataPerTime: '',
                dataPerTimeUnit: '',
                reqType: 'get',
                reqUrl: '',
                serId: '',
                interfaceDesc: ''
              };
              this.requestData = [{
                dcType: 'String',
                dcSign: '',
                dcName: '',
                dcMaxLenght: '',
                dcValueRange: '',
                required: '1'
              }];
              this.responseData = [{
                dcType: 'Object',
                dcSign: '',
                dcName: '',
                dcMaxLenght: '',
                dcValueRange: '',
                required: '1'
              }];
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
                message: this.$t('text.failure') + r.data.msg,
                type: 'error'
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      },

      // 编辑功能
      interfaceEdit() {
        this.$service.put('/interface/inter', Object.assign(this.baseData, {in: this.requestData, out: this.responseData}))
          .then(r => {
            if (r.data.code === '000000') {
              this.baseData = {
                interfaceId: '',
                interfaceName: '',
                readoutTime: '',
                interfaceType: 'A',
                dataPersistence: 'Y',
                dataPerTime: '',
                dataPerTimeUnit: '',
                reqType: 'get',
                reqUrl: '',
                serId: '',
                interfaceDesc: ''
              };
              this.requestData = [{
                dcType: 'String',
                dcSign: '',
                dcName: '',
                dcMaxLenght: '',
                dcValueRange: '',
                required: '1'
              }];
              this.responseData = [{
                dcType: 'Object',
                dcSign: '',
                dcName: '',
                dcMaxLenght: '',
                dcValueRange: '',
                required: '1'
              }];
              this.handleCancel();
              this.$emit('loadData');
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
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
      },

      // 添加根节点  flg='request' 发送报文，flg='response'  响应报文
      addRoot(flg) {
        if (flg === "request") {
          this.requestData.push({
            dcType: 'String',
            dcSign: '',
            dcName: '',
            dcMaxLenght: '',
            dcValueRange: '',
            required: '1'
          });
        }
        if (flg === 'response') {
          this.responseData.push({
            dcType: 'Object',
            dcSign: '',
            dcName: '',
            dcMaxLenght: '',
            dcValueRange: '',
            required: '1'
          });
        }
      },

      //添加子节点
      addChildren(flg, row) {
        if (!row.children) {
          this.$set(row, "children", []);
        }
        if (flg === "request") {
          row.children.push({
            dcType: 'String',
            dcSign: '',
            dcName: '',
            dcMaxLenght: '',
            dcValueRange: '',
            required: '1'
          });
        }
        if (flg === 'response') {
          row.children.push({
            dcType: 'Object',
            dcSign: '',
            dcName: '',
            dcMaxLenght: '',
            dcValueRange: '',
            required: '1'
          });
        }
      },

      // 删除节点
      removeRow(flg, row) {
        let parent = null;
        if (flg === 'request') {
          parent = this.$TableUtil.getParentArray(this.requestData, row);
        }
        if (flg === 'response') {
          parent = this.$TableUtil.getParentArray(this.responseData, row);
        }
        if (parent) {
          let i = parent.indexOf(row);
          parent.splice(i, 1);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-input > .el-input__inner[type="number"] {
    padding-right: 0 !important;
  }

  /deep/ .el-select {
    width: 100% !important;
  }
</style>
