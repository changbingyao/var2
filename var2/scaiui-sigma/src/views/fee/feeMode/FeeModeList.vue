<template>
  <div>
    <!--查询条件-->
    <el-row type="flex" justify="left">
      <el-form label-position="right" :inline="true" style="width: 100%;">
        <sFormItem3 :label="$t('interface.feeCode')">
          <el-input v-model="feeCode" :placeholder="$t('placeholder.default',[$t('interface.feeCode')])" clearable></el-input>
        </sFormItem3>
        <sFormItem3 :label="$t('interface.feeType')">
          <sSelect v-model="feeType" option="COST_TYPE" :placeholder="$t('placeholder.select',[$t('interface.feeType')])" clearable></sSelect>
        </sFormItem3>
        <sFormItem3 :label="$t('fee.registerTime')">
          <el-date-picker v-model="registerTime" value-format="yyyy-MM-dd" :placeholder="$t('placeholder.default',[$t('fee.registerTime')])" clearable></el-date-picker>
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
        <el-table-column :label="$t('number')" type="index" width="80"></el-table-column>
        <el-table-column prop="costCode" :label="$t('interface.feeCode')" show-overflow-tooltip></el-table-column>
        <el-table-column :label="$t('interface.feeType')" show-overflow-tooltip>
          <template slot-scope="scope">
            <sText option="COST_TYPE" v-model="scope.row.costTypeRange"></sText>
          </template>
        </el-table-column>
        <el-table-column prop="costDescribe" :label="$t('feeMode.feeDesc')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="regUser" :label="$t('fee.registrant')" show-overflow-tooltip></el-table-column>
        <el-table-column :label="$t('fee.registerTime')" show-overflow-tooltip width="200">
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
      <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="65%" :close-on-click-modal="false" @opened="openModal" @close="closeModal">
        <FeeModeView ref="feeModeEdit" v-model="dialogIsVisible" :operator="operator" :currentRow="currentRow" :feeCodeList="feeCodeList" @closeModal="closeModal" @loadData="loadData"></FeeModeView>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import FeeModeView from "./FeeModeView";
  export default {
    name: "FeeModeList",
    components: { FeeModeView },
    data() {
      return {
        feeCodeList: [],
        feeCode: '',
        feeType: '',
        registerTime: '',
        limit: this.$pageSize,
        offset: 0,
        data: {},
        operator: 'view',
        dialogIsVisible: false,
        currentRow: {},
        selectedIds: [],
        dialogTitle: {
          "add": this.$t('feeMode.$title', [this.$t('add')]),
          "edit": this.$t('feeMode.$title', [this.$t('edit')]),
          "view": this.$t('feeMode.$title', [this.$t('view')])
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 打开模态框
      openModal() {
        this.$refs.feeModeEdit.handleClear();
      },

      // 关闭模态框
      closeModal() {
        this.dialogIsVisible = false;
      },

      // 分页查询
      loadData(index) {
        if (index !== 1) {
          this.feeCode = '';
          this.feeType = '';
          this.registerTime = '';
        }
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
          costCode: this.feeCode,
          costTypeRange: this.feeType,
          regTime: this.registerTime,
          operators: {regTime: 'like'}
        });
        this.$service.get('/fee/feeQueryDefines/FeeQueryManage', {params: this.params}).then(r => {
          if (r.data.code === '000000') {
            this.feeCodeList = [];
            this.data = r.data.data;
            if (index !==1) {
              r.data.data.rows.forEach((item) => {
                this.feeCodeList.push({label: item.costCode, value: item.costCode})
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
          regUser: JSON.parse(localStorage.getItem('user')),
          regTime: '',
          intervalList: [{
            dictCode: '',
            discount: ''
          }]
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
          this.$service.delete('/fee/feeQueryDefines', {data: this.selectedIds})
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
          this.$service.delete('/fee/feeQueryDefines/' + id)
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
