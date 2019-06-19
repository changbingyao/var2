<template>
  <div>
    <!--查询条件-->
    <el-row type="flex" justify="left">
      <el-form label-position="right" :inline="true" style="width: 100%;">
        <sFormItem3 :label="$t('feeRule.interfaceType')">
          <sSelect v-model="interfaceType" @change="changeType" :option="interfaceTypeList" :placeholder="$t('placeholder.select',[$t('feeRule.interfaceType')])"></sSelect>
        </sFormItem3>
        <sFormItem3 :label="$t('batch.access')">
          <sSelect v-model="reqSystem" :disabled="interfaceType == 'A'" :option="reqSystemList" :placeholder="$t('placeholder.select',[$t('batch.access')])"></sSelect>
        </sFormItem3>
        <sFormItem3 :label="$t('vendor.INTERFACE_NAME')">
          <sSelect v-model="interfaceId" :option="interfaceList" :placeholder="$t('placeholder.select',[$t('vendor.INTERFACE_NAME')])"></sSelect>
        </sFormItem3>
        <sFormItem3 :label="$t('fee.registerTime')">
          <el-date-picker style="width: 94%;" v-model="registerTime" value-format="yyyy-MM-dd" :placeholder="$t('placeholder.default',[$t('fee.registerTime')])"></el-date-picker>
        </sFormItem3>
        <div style="width: 100%; margin-bottom: 18px; text-align: right;">
          <el-button class="baseBlue" @click="loadData(1)">{{$t('query')}}</el-button>
          <el-button class="baseBlue" @click="handleReset">{{$t('reset')}}</el-button>
          <el-button class="baseGreen" @click="handleAdd">{{$t('add')}}</el-button>
          <el-button class="baseRed" :disabled="selectedIds.length === 0" @click="handleDeleteMutil">{{$t('delete')}}</el-button>
        </div>
      </el-form>
    </el-row>
    <!--列表主体-->
    <el-row>
      <el-table style="width: 100%" :data="data.rows" @selection-change="handleSelectionChange" tooltip-effect="light">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column :label="$t('number')" type="index" width="70"></el-table-column>
        <el-table-column :label="$t('feeRule.interfaceType')" show-overflow-tooltip width="110">
          <template slot-scope="scope">
            <sText :option="interfaceTypeList" v-model="scope.row.interfaceType"></sText>
          </template>
        </el-table-column>
        <el-table-column prop="reqSystemName" :label="$t('batch.access')" show-overflow-tooltip width="180"></el-table-column>
        <el-table-column :label="$t('vendor.INTERFACE_NAME')" show-overflow-tooltip width="280">
          <template slot-scope="scope">
            {{scope.row.nameStr.join(',')}}
          </template>
        </el-table-column>
        <el-table-column prop="regUser" :label="$t('fee.registrant')" show-overflow-tooltip width="80"></el-table-column>
        <el-table-column :label="$t('fee.registerTime')" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            {{scope.row.regTime | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('fee.operation')" show-overflow-tooltip min-width="90px">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">{{$t('view')}}</el-button>
            <el-button type="text" @click="handleEdit(scope.row)">{{$t('edit')}}</el-button>
            <el-button type="text" @click="handleDelete(scope.row.id)">{{$t('delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <br>
    <!--底部分页-->
    <el-row type="flex" justify="end" v-if="data.totalCount">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="offset"
        :page-size="limit"
        :page-sizes="$defaultPageSizes"
        layout="total, sizes, prev, pager, next"
        :total="data.totalCount">
      </el-pagination>
    </el-row>
    <!--查看详情模态框-->
    <el-row>
      <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="60%" :close-on-click-modal="false" @opened="openModal" @close="closeModal">
        <FeeRuleView ref="feeRuleEdit" :reqSystemList="reqSystemList" v-model="dialogIsVisible" :operator="operator" :currentRow="currentRow" @loadData="loadData" @closeModal="closeModal"></FeeRuleView>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import FeeRuleView from "./FeeRuleView";
  export default {
    name: "FeeRuleList",
    components: { FeeRuleView },
    data() {
      return {
        interfaceType: '',
        reqSystem: '',
        interfaceId: '',
        registerTime: '',
        interfaceTypeList: [{
          label: '外部服务接口',
          value: 'A'
        }, {
          label: '内部服务接口',
          value: 'B'
        }],
        reqSystemList: [],
        interfaceList: [],
        limit: this.$pageSize,
        offset: 0,
        data: {},
        operator: 'view',
        dialogIsVisible: false,
        currentRow: {},
        selectedIds: [],
        dialogTitle: {
          "add": this.$t('feeRule.$title', [this.$t('add')]),
          "edit": this.$t('feeRule.$title', [this.$t('edit')]),
          "view": this.$t('feeRule.$title', [this.$t('view')])
        }
      }
    },
    mounted() {
      this.loadData();
      this.getReqSystemList();
      this.getInterfaceList();
    },
    methods: {
      // 关闭模态框
      closeModal() {
        // this.$refs.feeRuleEdit.handleClear();
        this.dialogIsVisible = false;
      },

      // 打开模态框
      openModal() {
        this.$refs.feeRuleEdit.getInterList();
        this.$refs.feeRuleEdit.getFeeCodeList();
      },

      // 查询接入商列表
      getReqSystemList() {
        this.$service.get('/req/reqSystemRegs', {params: {offset: this.offset}})
          .then(r => {
            if (r.data.code === '000000') {
              if (r.data.data) {
                this.reqSystemList = [];
                r.data.data.map(item => {
                  this.reqSystemList.push({label: item.regSystemDesc, value: item.reqSystemId})
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

      // 查询接口名称列表
      getInterfaceList() {
        this.$service.get('/interface/interfaceInfo', {params: {offset: this.offset, interfaceType: this.interfaceType}})
          .then(r => {
            if (r.data.code === '000000') {
              if (r.data.data) {
                this.interfaceList = [];
                r.data.data.map(item => {
                  this.interfaceList.push({label: item.interfaceName, value: item.interfaceId})
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

      // 改变接口类别
      changeType() {
        this.getInterfaceList();
      },

      // 分页查询
      loadData(index) {
        var newInterfaceId = '';
        if (index !== 1) {
          this.interfaceType = '';
          this.reqSystem = '';
          this.interfaceId = '';
          this.registerTime = '';
        }
        if (!this.isEmpty(this.interfaceId)) {
          newInterfaceId = '%'+ this.interfaceId + '%';
        }
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
          interfaceType: this.interfaceType,
          reqSystem: this.reqSystem,
          interfaceId: newInterfaceId,
          regTime: this.registerTime,
          operators: {interfaceId: 'like'}
        });
        this.$service.get('/fee/feeRuleDefine', {params: this.params}).then(r => {
          if (r.data.code === '000000') {
            this.data = r.data.data;
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

      // 重置功能
      handleReset() {
        this.offset = 1;
        this.loadData();
      },

      // 添加功能
      handleAdd() {
        this.operator = "add";
        this.currentRow = {
          interfaceType: '',
          idStr: [],
          regUser: JSON.parse(localStorage.getItem('user')),
          regTime: ''
        };
        this.dialogIsVisible = true;
      },

      // 查看功能
      handleView(rowData) {
        this.operator = "view";
        this.currentRow = rowData;
        this.dialogIsVisible = true;
      },

      // 编辑功能
      handleEdit(rowData) {
        this.operator = "edit";
        this.currentRow = rowData;
        this.dialogIsVisible = true;
      },

      // 将选中的id存到ids中
      handleSelectionChange(val){
        this.selectedIds = [];
        val.forEach((item) => {
          this.selectedIds.push(item.id);
        });
      },

      // 多条删除
      handleDeleteMutil() {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.$service.delete('/fee/feeRuleDefine/', {data: this.selectedIds})
            .then(r => {
              if (r.data.code === '000000') {
                this.loadData();
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('cancelled')
          });
        });
      },

      // 单条删除
      handleDelete(id) {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.$service.delete('/fee/feeRuleDefine/' + id)
            .then(r => {
              if (r.data.code === '000000') {
                this.loadData();
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('cancelled')
          });
        });
      },

      // 每页显示条数变化
      handleSizeChange(val) {
        this.limit = val;
        this.loadData(1);
      },

      // 翻页时处理
      handleCurrentChange(val) {
        this.offset = val;
        this.loadData(1);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
