<template>
  <div>
    <div style="position: relative; top: 36px; text-align: right;">
      <el-button size="small" class="baseBlue" @click="addRoute" v-show="operator != 'view'">{{$t('add')+$t('routes.line')}}</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-remove="removeRoute" :before-leave="msgBeforeLeave">
      <!--基本信息-->
      <el-tab-pane :label="$t('basicinfo')" key="1" name="1">
        <el-form label-width="120px" :model="baseData" :rules="baseRules" ref="msgBaseForm">
          <el-row>
            <sFormItem2 :label="$t('interface.interfaceId')" prop="interfaceId">
              <el-input v-model="baseData.interfaceId" :disabled="operator=='view' || operator == 'edit'" :placeholder="$t('placeholder.default',[$t('interface.interfaceId')])"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.interfaceName')" prop="interfaceName">
              <el-input v-model="baseData.interfaceName" :disabled="operator=='view'" :placeholder="$t('placeholder.default',[$t('interface.interfaceName')])"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.readoutTime')">
              <el-input v-model="baseData.readoutTime" :disabled="operator=='view'" :placeholder="$t('placeholder.default',[$t('interface.readoutTime')])"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.dataPersistence')" prop="dataPersistence">
              <sSelect v-model="baseData.dataPersistence" option="YN" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('interface.dataPersistence')])"></sSelect>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.dataPerTime')">
              <el-input v-model="baseData.dataPerTime" :disabled="operator=='view' || baseData.dataPersistence === 'N'" :placeholder="$t('placeholder.default',[$t('interface.dataPerTime')])"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.dataPerTimeUnit')">
              <sSelect v-model="baseData.dataPerTimeUnit" :disabled="operator=='view' || baseData.dataPersistence === 'N'" option="TIME_UNIT" :placeholder="$t('placeholder.select',[$t('interface.dataPerTimeUnit')])"></sSelect>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.reqType')" prop="reqType">
              <sSelect v-model="baseData.reqType" option="REQ_METHOD" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('interface.reqType')])"></sSelect>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.serId')" prop="serId">
              <sSelect v-model="baseData.serId" :disabled="operator=='view'" :option="serviceIdList" :placeholder="$t('placeholder.select',[$t('interface.serId')])"></sSelect>
            </sFormItem2>
            <sFormItem2 :label="$t('vendor.REQ_MSG_FORMAT')" prop="msgTypeIn">
              <sSelect v-model="baseData.msgTypeIn" :disabled="operator=='view'" option="MSG_TYPE" :placeholder="$t('placeholder.select',[$t('vendor.REQ_MSG_FORMAT')])"></sSelect>
            </sFormItem2>
            <sFormItem2 :label="$t('vendor.RES_MSG_FORMAT')" prop="msgTypeOut">
              <sSelect v-model="baseData.msgTypeOut" :disabled="operator=='view'" option="MSG_TYPE" :placeholder="$t('placeholder.select',[$t('vendor.RES_MSG_FORMAT')])"></sSelect>
            </sFormItem2>
            <sFormItem2 :label="$t('interface.interfaceDesc')">
              <el-input v-model="baseData.interfaceDesc" :disabled="operator=='view'" :placeholder="$t('placeholder.default',[$t('interface.interfaceDesc')])"></el-input>
            </sFormItem2>
          </el-row>
          <el-row style="margin-bottom: -10px;">
            <sFormItem2 align="right" col-span="24">
              <el-button class="baseGray" @click="handleCancel" :disabled="operator == 'view'">{{$t('cancel')}}</el-button>
            </sFormItem2>
          </el-row>
        </el-form>
      </el-tab-pane>
      <!--发送报文定义-->
      <el-tab-pane :label="$t('sendinfo')" key="2" name="2">
        <el-form :model="{'in': requestData}" :rules="requestRules" ref="msgRequestForm" label-width="120px">
          <el-row>
            <sTreeTable2 border :data="requestData">
              <el-table-column :label="$t('interface.dcType')">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getRequestProp(scope.row, 'dcType')">
                    <sSelect v-model="scope.row.dcType" option="DC_TYPE" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('interface.dcType')])"></sSelect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcSign')">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getRequestProp(scope.row, 'dcSign')">
                    <el-input size="small" v-model="scope.row.dcSign" :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcName')">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getRequestProp(scope.row, 'dcName')">
                    <el-input size="small" v-model="scope.row.dcName" :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcMaxLenght')">
                <template slot-scope="scope">
                  <el-form-item label-width="0">
                    <el-input size="small" type="number" min="0" v-model="scope.row.dcMaxLenght" :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.encryption')">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getRequestProp(scope.row, 'encryptor')">
                    <sSelect size="small" v-model="scope.row.encryptor" :disabled="operator=='view'" option="YN01" :placeholder="$t('placeholder.select',[$t('interface.encryption')])"></sSelect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.required')">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getRequestProp(scope.row, 'required')">
                    <sSelect size="small" v-model="scope.row.required" :disabled="operator=='view'" option="YN01" :placeholder="$t('placeholder.select',[$t('interface.required')])"></sSelect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('action')" v-if="operator!=='view'" min-width="105">
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
          <el-row style="margin-top: 18px; margin-bottom: -10px;">
            <sFormItem2 align="right" col-span="24">
              <el-button class="baseGray" @click="handleCancel" :disabled="operator == 'view'">{{$t('cancel')}}</el-button>
            </sFormItem2>
          </el-row>
        </el-form>
      </el-tab-pane>
      <!--响应报文定义-->
      <el-tab-pane :label="$t('respondinfo')" key="3" name="3">
        <el-form :model="{'out': responseData}" :rules="responseRules" ref="msgResponseForm" label-width="120px">
          <el-row>
            <sTreeTable2 border :data="responseData">
              <el-table-column :label="$t('interface.dcType')">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getResponseProp(scope.row, 'dcType')">
                    <sSelect v-model="scope.row.dcType" option="DC_TYPE" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('interface.dcType')])"></sSelect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcSign')">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getResponseProp(scope.row, 'dcSign')">
                    <el-input size="small" v-model="scope.row.dcSign" :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('interface.dcName')">
                <template slot-scope="scope">
                  <el-form-item label-width="0" :prop="getResponseProp(scope.row, 'dcName')">
                    <el-input size="small" v-model="scope.row.dcName" :disabled="operator=='view'"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('action')" v-if="operator!=='view'">
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
          <el-row style="margin-top: 18px; margin-bottom: -10px;">
            <sFormItem2 align="right" col-span="24">
              <el-button class="baseGray" @click="handleCancel" :disabled="operator == 'view'">{{$t('cancel')}}</el-button>
            </sFormItem2>
          </el-row>
        </el-form>
      </el-tab-pane>
      <!--路由-->
      <el-tab-pane v-for="(route, index) in routeData" :label="$t('routes.line') + (index + 1)" :key="index + 4 + ''" :name="index + 4 + ''" :closable="index > 0 && routeData.length > 1 && operator != 'view'">
        <el-tabs v-model="activeChildrenName" @tab-click="handleChildClick">
          <!--请求信息-->
          <el-tab-pane :label="$t('log.requestInfo')" :key="index + 4 + '-1'" :name="index + 4 + '-1'">
            <el-form :model="{'inter': route.inter}" label-width="120px">
              <el-row class="banner-fileds" v-for="(item, index) in route.inter" :key="index" style="margin-bottom: 15px;">
                <!--请求信息—上-->
                <el-row>
                  <el-row style="margin-bottom: 20px;">
                    <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button>
                    <span class="titles">{{$t('Selectinterface')}}</span>
                  </el-row>
                  <sFormItem2 style="width: 33.1%;" :label="$t('interface.interfaceName')">
                    <sSelect style="width: 100%;" v-model="item.othInterfaceId" :disabled="operator=='view'" :option="interfaceNameList"
                             @change="getInfoByInterfaceId(item.othInterfaceId)" :placeholder="$t('placeholder.select',[$t('interface.interfaceName')])">
                    </sSelect>
                  </sFormItem2>
                  <sFormItem2 style="width: 33.1%;" :label="$t('interface.othInterfaceId')">
                    <el-input style="width: 100%;" v-model="item.othInterfaceId" :disabled="true"></el-input>
                  </sFormItem2>
                </el-row>
                <!--请求信息—下-->
                <el-row v-if="route.inter.length != 0">
                  <el-row>
                    <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button><span class="titles">{{$t('Correspondingfield')}}</span>
                  </el-row>
                  <el-row>
                    <sTreeTable2 :data="item.rel" tooltip-effect="light" style="margin-left: 4%;width: 97%;">
                      <el-table-column :label="$t('interface.dcSign')" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-input :value="scope.row.dcSign" size="small" readonly :disabled="true"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('interface.dcName')" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-input :value="scope.row.dcName" size="small" readonly :disabled="true"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('interface.dcType')" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <sSelect :disabled="operator=='view'" @change="changeOthType(scope.row)" v-model="scope.row.othType" size="small" option="OTH_TYPE"></sSelect>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('interface.othDcSign')" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-input :disabled="operator=='view'" v-model="scope.row.othDcSign" v-if="scope.row.othType==='0'" size="small"></el-input>
                          <el-cascader
                            v-if="scope.row.othType > 0 && scope.row.othType < 5"
                            :disabled="operator=='view'"
                            class="cascaderClass"
                            expand-trigger="hover"
                            :options="requestData"
                            :value="index"
                            :props="defaultProps"
                            change-on-select
                            filterable
                            v-model="scope.row.othDcSign">
                          </el-cascader>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('interface.switchType')" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <sSelect v-if="scope.row.othType=='2'" v-model="scope.row.othTypeCode" :option="othTypeCodeList"></sSelect>
                          <sSelect v-else-if="scope.row.othType=='3'" v-model="scope.row.othTypeCode" :option="othTypeCodeListTwo"></sSelect>
                          <sSelect v-else-if="scope.row.othType=='4'" v-model="scope.row.othTypeCode" :option="othTypeCodeListThree"></sSelect>
                        </template>
                      </el-table-column>
                    </sTreeTable2>
                  </el-row>
                </el-row>
              </el-row>
              <el-row style="margin-top: 18px; margin-bottom: -17px;">
                <sFormItem2 align="right" col-span="24">
                  <el-button class="baseGray" @click="handleCancel" :disabled="operator == 'view'">{{$t('cancel')}}</el-button>
                </sFormItem2>
              </el-row>
            </el-form>
          </el-tab-pane>
          <!--响应信息-->
          <el-tab-pane :label="$t('log.responseInfo')" :key="index + 4 + '-2'" :name="index + 4 + '-2'">
            <el-form :model="{'outter': route.outter}" label-width="120px">
              <el-row class="banner-fileds" :key="index" style="margin-bottom: 15px;">
                <el-row v-if="route.outter.length != 0">
                  <el-row>
                    <sTreeTable2 v-if="routerCtrl" :data="route.outter" tooltip-effect="light">
                      <el-table-column :label="$t('interface.dcSign')" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-input :value="scope.row.dcSign" size="small" readonly :disabled="true"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('interface.dcName')" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-input :value="scope.row.dcName" size="small" readonly :disabled="true"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('interface.othDcSign')" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-cascader
                            :disabled="operator=='view'"
                            class="cascaderClass"
                            expand-trigger="hover"
                            :value="index"
                            :props="defaultProps"
                            :options="outOptions"
                            @blur="handOutOthDcSignBlur(scope.row)"
                            change-on-select
                            filterable
                            v-model="scope.row.othDcSign">
                          </el-cascader>
                        </template>
                      </el-table-column>
                    </sTreeTable2>
                  </el-row>
                </el-row>
              </el-row>
              <el-row style="margin-top: 18px;margin-bottom: -17px;">
                <sFormItem2 align="right" col-span="24">
                  <el-button class="baseGray" @click="handleCancel" :disabled="operator == 'view'">{{$t('cancel')}}</el-button>
                  <el-button class="baseBlue" @click="handleSubmit" v-show="routeData.length == parseInt(activeName - 3) ||  operator!='view'" v-permission="'save','保存'">{{$t('ok')}}</el-button>
                </sFormItem2>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "MsgEdit",
    props: {
      operator: '',
      interFaceId: {type: String, required: false}
    },
    data() {
      return {
        activeName: '1',
        activeChildrenName: '',
        serviceIdList: [],                 // 基本信息—服务名称下拉项
        interfaceNameList: [],             // 对应字段—接口名称下拉项
        othTypeCodeList: [],               // 对应字段—转换形式下拉项
        othTypeCodeListTwo: [],            // 对应字段—转换形式下拉项
        othTypeCodeListThree: [],            // 对应字段—转换形式下拉项
        baseData: {
          interfaceType: 'B',
          interfaceId: '',
          interfaceName: '',
          readoutTime: '',
          dataPersistence: 'Y',
          dataPerTime: '',
          dataPerTimeUnit: '',
          reqType: '',
          serId: '',
          interfaceDesc: ''
        },
        requestData: [{
          dcType: 'String',
          dcSign: '',
          dcName: '',
          dcMaxLenght: '',
          encryptor: '1',
          required: '1'
        }],
        responseData: [{
          dcType: 'Object',
          dcSign: '',
          dcName: '',
        }],
        routeData: [],
        defaultProps: {
          children: 'children',
          value: 'dcSign',
          label: 'dcName'
        },
        routerCtrl: true,
        outList: [],
        baseRules: {
          interfaceId: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.interfaceId')]), trigger: 'blur'}],
          interfaceName: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.interfaceName')]), trigger: 'blur'}],
          dataPersistence: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.dataPersistence')]), trigger: 'change'}],
          reqType: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.reqType')]), trigger: 'change'}],
          serId: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.serId')]), trigger: 'change'}],
          msgTypeIn: [{required: true, message: this.$t('placeholder.select', [this.$t('vendor.REQ_MSG_FORMAT')]), trigger: 'change'}],
          msgTypeOut: [{required: true, message: this.$t('placeholder.select', [this.$t('vendor.RES_MSG_FORMAT')]), trigger: 'change'}]
        }
      }
    },
    watch: {
      activeName(newVal, oldVal) {
        if (newVal) {
          this.activeChildrenName = parseInt(newVal) + '-1';
        }
      },
      responseData: {
        handler: function(newVal, oldVal) {
          if (newVal) {
            if (this.routeData.length > 0) {
              this.routeData.forEach(item => {
                this.iterationChildren(item.outter, newVal);
              })
            }
          }
        },
        deep: true
      }
    },
    computed: {
      outOptions() {
        let out = this.routeData[parseInt(this.activeName) - 4];
        if (out && out.outList) {
          return out.outList;
        } else {
          return [];
        }
      },

      // 请求规则
      requestRules() {
        return {
          in: this.$TableUtil.getRuleByData(this.requestData, {
            0: {
              dcType: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.dcType')]), trigger: 'change'}],
              dcSign: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.dcSign')]), trigger: 'blur'}],
              dcName: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.dcSign')]), trigger: 'blur'}],
              encryptor: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.encryption')]), trigger: 'change'}],
              required: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.required')]), trigger: 'change'}]
            }
          })
        }
      },

      // 响应规则
      responseRules() {
        return {
          out: this.$TableUtil.getRuleByData(this.responseData, {
            0: {
              dcType: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.dcType')]), trigger: 'change'}],
              dcSign: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.dcSign')]), trigger: 'blur'}],
              dcName: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.dcSign')]), trigger: 'blur'}]
            }
          })
        }
      }
    },
    methods: {
      // 请求prop
      getRequestProp(row, column) {
        return "in." + row._path + "." + column;
      },

      // 响应prop
      getResponseProp(row, column) {
        return "out." + row._path + "." + column;
      },

      // 页签离开时校验
      msgBeforeLeave(name) {
        var tabCtrl = '';
        if (this.activeName == 1 && parseInt(name) >= 2) {
          this.$refs.msgBaseForm.validate((valid) => {
            if (valid) {
              this.activeName = this.activeName + 1 + '';
            } else {
              this.activeName = '1';
            }
            tabCtrl = valid;
          })
        } else if (this.activeName == 2 && parseInt(name) >= 3) {
          this.$refs.msgRequestForm.validate((valid) => {
            if (valid) {
              this.activeName = this.activeName + 1 + '';
            } else {
              this.activeName = '2';
            }
            tabCtrl = valid;
          })
        } else if (this.activeName == 3 && parseInt(name) >= 4) {
          this.$refs.msgResponseForm.validate((valid) => {
            if (valid) {
              this.activeName = this.activeName + 1 + '';
            } else {
              this.activeName = '3';
            }
            tabCtrl = valid;
          })
        }
        return tabCtrl;
      },

      // 递归遍历
      iterationChildren(arr1, arr2) {
        for(var i = 0; i < arr2.length; i++) {
          if (!arr1[i]) {
            arr1.push({dcSign: '', dcName: ''});
          }
          this.$set(arr1[i], 'dcSign', arr2[i].dcSign);
          this.$set(arr1[i], 'dcName', arr2[i].dcName);
          if (arr2[i].children && arr2[i].children.length > 0) {
            if (!arr1[i].children) {
              arr1[i].children = [];
            }
            this.iterationChildren(arr1[i].children, arr2[i].children);
          } else {
            arr1[i].children = [];
          }
        }
      },

      // 点击子标签切换
      handleChildClick() {
        this.routerCtrl = false;
        this.$nextTick(() => {
          this.routerCtrl = true;
        });
      },

      // 获取 基本信息—服务ID 列表项
      getServiceIdList() {
        this.$service.get('vendor/vendorInfo/serId', {params: {serType: "I"}})
          .then(r => {
            if (r.data.code === '000000') {
              if (r.data.data) {
                this.serviceIdList = [];
                r.data.data.map(item => {
                  this.serviceIdList.push({value: item.serId, label: item.serName})
                });
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
      },

      // 获取 请求信息—接口名称 列表项
      getInterfaceNameList() {
        this.$service.get('/interface/inter/interfaceCol')
          .then(r => {
            if (r.data.code === '000000') {
              if (r.data.data) {
                this.interfaceNameList = [];
                r.data.data.map(item => {
                  this.interfaceNameList.push({value: item.interfaceId, label: item.interfaceName})
                });
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
      },

      // 获取 请求信息—映射—转换形式 列表项
      getOthTypeCodeList() {
        this.$service.get('/system/datadicmapping/selectCodeList')
          .then(r => {
            if (r.data.code === '000000') {
              if (r.data.data) {
                this.othTypeCodeList = [];
                r.data.data.map(item => {
                  this.othTypeCodeList.push({value: item, label: item})
                });
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
      },

      // 获取 请求信息—替换—转换形式 列表项
      getOthTypeCodeListTwo() {
        this.$service.get('/system/datachangemapping/selectCodeList')
          .then(r => {
            if (r.data.code === '000000') {
              if (r.data.data) {
                this.othTypeCodeListTwo = [];
                r.data.data.map(item => {
                  this.othTypeCodeListTwo.push({value: item, label: item})
                });
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
      },

      // 获取 请求信息—分组—转换形式 列表项
      getOthTypeCodeListThree() {
        this.$service.get('/data/groupMappings/selectCodeList')
          .then(r => {
            if (r.data.code === '000000') {
              if (r.data.data) {
                this.othTypeCodeListThree = [];
                r.data.data.map(item => {
                  this.othTypeCodeListThree.push({value: item, label: item})
                });
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
      },

      // 根据ID查询对应所有数据
      getInterfaceInfo() {
        this.activeName = 1+'';
        if (this.operator == 'add') {
          this.routeData = [];
          this.routeData.push({
            inter: [{
              othInterfaceId: '',
              rel: [{
                dcSign: '',
                dcName: '',
                othType: '0',
                othDcSign: ''
              }]
            }],
            outter: [{
              dcSign: '',
              dcName: '',
              othDcSign: []
            }]
          });
        } else {
          this.$service.get('/interface/inter/outInfo/' + this.interFaceId)
            .then(r => {
              if (r.data.code === '000000') {
                this.baseData = r.data.data['INTER_INFO'];
                this.requestData = r.data.data.in;
                this.responseData = r.data.data.out;
                this.routeData = [];
                for(var i = 1; i <= 3; i++) {
                  if (r.data.data['line'+ i]) {
                    this.routeData.push(r.data.data['line'+ i]);
                  }
                }
                this.activeName = 1 + '';
                //查询对应接口响应报文，供编辑查看时响应报文对应字段回显使用
                this.initOthInfo();
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
            })
        }
      },

      //查询对应接口响应报文，供编辑查看时响应报文对应字段回显使用
      initOthInfo() {
        if (this.operator == 'view' || this.operator == 'edit') {
          for (var i = 0; i < this.routeData.length; i++) {
            let othInterfaceId = this.routeData[i].inter[0].othInterfaceId;
            if (othInterfaceId) {
              let tab = this.routeData[i];
              this.$service.get('/interface/inter/' + othInterfaceId)
                .then(r => {
                  if (r.data.code === '000000') {
                    let outOptions = {
                      dcSign: r.data.data["INTER_INFO"].interfaceId,
                      dcName: r.data.data["INTER_INFO"].interfaceName
                    };
                    outOptions["children"] = r.data.data.out;
                    tab.outList =[];
                    tab.outList.push(JSON.parse(JSON.stringify(outOptions)));
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
          }
        }
      },

      // 添加根节点
      addRoot(flg) {
        if (flg == 'request') {
          this.requestData.push({
            dcType: 'String',
            dcSign: '',
            dcName: '',
            dcMaxLenght: '',
            encryptor: '1',
            required: '1'
          });
        } else {
          this.responseData.push({
            dcType: 'Object',
            dcSign: '',
            dcName: ''
          })
        }
      },

      // 添加子节点
      addChildren(flg, row) {
        if (!row.children) {
          Vue.set(row, "children", []);
        }
        if (flg == "request") {
          row.children.push({
            dcType: 'String',
            dcSign: '',
            dcName: '',
            dcMaxLenght: '',
            encryptor: '1',
            required: '1'
          });
        }
        if (flg == 'response') {
          row.children.push({
            dcType: 'Object',
            dcSign: '',
            dcName: ''
          });
        }
      },

      // 删除节点
      removeRow(flg, row) {
        let parent = null;
        if (flg === 'request') {
          parent = this.$TableUtil.getParentArray( this.requestData, row);
        }
        if (flg === 'response') {
          parent = this.$TableUtil.getParentArray( this.responseData, row);
          if (row._level === 1) {
            let i = parent.indexOf(row);
            this.routeData.forEach(item => {
              item.outter.splice(i, 1);
            })
          }
        }
        if (parent) {
          let i = parent.indexOf(row);
          parent.splice(i, 1);
        }
      },

      // 添加线路
      addRoute() {
        this.routeData.push({
          inter: [{
            othInterfaceId: '',
            rel: [{
              dcSign: '',
              dcName: '',
              othType: '0',
              othDcSign: ''
            }]
          }],
          outter: []
        });
        this.iterationChildren(this.routeData[this.routeData.length - 1].outter, this.responseData);
        this.activeName = this.routeData.length + 3 + '';
      },

      // 移除线路
      removeRoute(targetName) {
        let t = parseInt(targetName);
        let a = parseInt(this.activeName);
        if (t > a) {
          this.routeData.splice(t - 4, 1);
        } else {
          this.routeData.splice(t - 4, 1);
          this.activeName = a - 1 + '';
        }
      },

      // 请求信息—选择接口名称查询对应字段信息
      getInfoByInterfaceId(othInterfaceId) {
        if (!othInterfaceId) {
          return;
        } else {
          this.$service.get('/interface/inter/' + othInterfaceId)
            .then(r => {
              if (r.data.code === '000000') {
                let i = parseInt(this.activeName);
                let outOptions = {
                  dcSign: r.data.data["INTER_INFO"].interfaceId,
                  dcName: r.data.data["INTER_INFO"].interfaceName
                };
                this.routeData[i - 4].inter[0].rel = r.data.data.in;
                outOptions["children"] = r.data.data.out;
                this.outList = [];
                this.outList.push(outOptions);
                if (this.operator == 'edit') {
                  delete this.routeData[i - 4].outList;
                }
                this.$set(this.routeData[i - 4], 'outList', JSON.parse(JSON.stringify(this.outList)));
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

      // 请求信息—字段类型改变时触发
      changeOthType(row) {
        if (parseInt(row.othType) > 0 && typeof(row.othDcSign) == 'string') {
          row.othDcSign = [];
        } else if (parseInt(row.othType) === 0 && typeof(row.othDcSign) == 'object') {
          row.othDcSign = '';
        } else if (parseInt(row.othType) > 0 && typeof(row.othDcSign) == 'object') {
          row.othTypeCode = '';
        }
      },

      // 路由—响应报文定义
      handOutOthDcSignBlur(row) {
        if (row && row.othDcSign && row.othDcSign.length <= 1) {
          row.othDcSign = [];
        }
      },

      // 确认提交功能
      handleSubmit() {
        var params = {
          'in': this.requestData,
          'out': this.responseData,
        };
        for(var i = 1; i <= this.routeData.length; i++) {
          params["line" + i] = {
            "inter": "",
            "outter": ""
          };
          params["line" + i].inter = this.routeData[i - 1].inter;
          params["line" + i].outter = this.routeData[i - 1].outter;
        }
        if (this.operator == 'add') {
          this.$service.post('/interface/inter/dataOut/', Object.assign(this.baseData, params)).then(r => {
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
        } else {
          this.$service.put('/interface/inter/updateData/', Object.assign(this.baseData, params)).then(r => {
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
        }
      },

      // 取消功能
      handleCancel() {
        this.handleClear();
        this.baseData = {
          interfaceType: 'B',
          interfaceId: '',
          interfaceName: '',
          readoutTime: '',
          dataPersistence: 'Y',
          dataPerTime: '',
          dataPerTimeUnit: '',
          reqType: '',
          serId: '',
          interfaceDesc: ''
        };
        this.requestData = [{
          dcType: 'String',
          dcSign: '',
          dcName: '',
          dcMaxLenght: '',
          encryptor: '1',
          required: '1'
        }];
        this.responseData = [{
          dcType: 'Object',
          dcSign: '',
          dcName: '',
        }];
        this.$emit('closeModal');
        this.$emit('closeDialog', false);
      },

      // 清空校验功能
      handleClear() {
        this.$refs.msgBaseForm.clearValidate();
        this.$refs.msgRequestForm.clearValidate();
        this.$refs.msgResponseForm.clearValidate();
        this.activeName = 1+'';
        this.activeChildrenName = '';
        this.baseData = {
          interfaceType: 'B',
          interfaceId: '',
          interfaceName: '',
          readoutTime: '',
          dataPersistence: 'Y',
          dataPerTime: '',
          dataPerTimeUnit: '',
          reqType: '',
          serId: '',
          interfaceDesc: ''
        };
        this.requestData = [{
          dcType: 'String',
          dcSign: '',
          dcName: '',
          dcMaxLenght: '',
          encryptor: '1',
          required: '1'
        }];
        this.responseData = [{
          dcType: 'Object',
          dcSign: '',
          dcName: '',
        }];
        this.routeData = [];
        this.routerCtrl = true;
        this.outList = [];
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog__body {
    padding: 0 20px 20px !important;
  }

  /deep/ .el-tabs__content {
    padding: 0 !important;
  }

  /deep/ .el-input > .el-input__inner[type="number"] {
    padding-right: 0 !important;
  }

  /deep/ .el-icon-plus {
    margin-right: 10px !important;
  }

  /deep/ .el-icon-circle-plus {
    margin-left: 0 !important;
  }

  /deep/ .el-message-box__header > .el-message-box__title > span {
    font-size: 12px !important;
  }

  /deep/ .el-tabs__header{
    margin-bottom: 30px !important;
  }

  /deep/ .el-tabs .el-tabs {
    position: relative !important;
    top: -12px !important;
  }

  /deep/ .el-select {
    width: 100%;
  }
</style>
