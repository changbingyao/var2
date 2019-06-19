<template>
  <div>
    <!--列表功能-->
    <AccessQuery :selectedIds="selectedIds" @add="handleAdd" @loadData="loadData"/>
    <!--列表主体-->
    <div>
      <el-row>
        <el-table ref="multipleTable" :data="data.rows" tooltip-effect="light" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" :label="$t('number')" width="80">
            <template slot-scope="scope">
              {{(scope.$index+1) + (offset-1) * limit}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('access.appKey')" prop="appKey" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('access.appSecret')" prop="appSecret" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('access.ipAddress')" prop="ipAddr" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('access.systemDesc')" prop="regSystemDesc" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('interface.encryption')" prop="systemType" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.systemType == 'A'">{{$t('yes')}}</span>
              <span v-else-if="scope.row.systemType == 'B'">{{$t('no')}}</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('action')" min-width="90px">
            <template slot-scope="scope">
              <el-button type="text" v-permission="'view','查看'" @click="handleView(scope.row.reqSystemId)">{{$t('view')}}</el-button>
              <el-button type="text" v-permission="'edit','编辑'" @click="handleEdit(scope.row.reqSystemId)">{{$t('edit')}}</el-button>
              <el-button type="text" v-permission="'del','删除'" @click="handleDelete(scope.row.reqSystemId)">{{$t('delete')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <br>
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
      <el-row>
        <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="70%" :close-on-click-modal="false">
          <AccessEdit ref="accessEditRef" v-model="dialogIsVisible" :operator="operator" :data="currentRow" @loadData="loadData"></AccessEdit>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>

<script>
  import AccessQuery from './AccessQuery';
  import AccessEdit from './AccessEdit';

  export default {
    name: "AccessList",
    components: {AccessQuery, AccessEdit},
    data() {
      return {
        limit: this.$pageSize,
        selectedIds: [],
        operator: 'view',
        offset: 0,
        dialogIsVisible: false,
        data: {},
        transferRes: [],
        transferListData: [],
        params: {},
        currentRow: {},
        folderList: [],
        dialogTitle: {
          "edit": this.$t('access.$title', [this.$t('edit')]),
          "add": this.$t('access.$title', [this.$t('add')]),
          "view": this.$t('access.$title', [this.$t('view')]),
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 查询功能
      loadData(data) {
        if (data && data.regSystemDesc != '') {
          this.params = Object.assign({
            limit: this.limit,
            offset: this.offset,
            regSystemDesc: data.regSystemDesc
          });
        } else {
          this.params = Object.assign({
            limit: this.limit,
            offset: this.offset
          });
        }
        this.$service.get('/req/reqSystemRegs', {params: this.params})
          .then(r => {
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

      // 每页显示条数变化
      handleSizeChange(val) {
        this.limit = val;
        this.loadData();
      },

      // 翻页时处理
      handleCurrentChange(val) {
        this.offset = val;
        this.loadData();
      },

      // 添加功能
      handleAdd() {
        this.operator = "add";
        this.$nextTick(() => {
          this.$refs.accessEditRef.handleClear();
          this.$refs.accessEditRef.queryInterfaceList();
        });
        this.currentRow = {
          reqSystemReg: {},
          systemLimits: []
        };
        this.dialogIsVisible = true;
      },

      // 查看功能
      handleView(id) {
        this.operator = "view";
        this.$service.get('/req/systemLimits/' + id)
          .then((r) => {
            if (r.data.code === '000000') {
              this.currentRow = {
                reqSystemReg: {},
                systemLimits: []
              };
              this.currentRow.reqSystemReg = r.data.data.reqSystemReg;
              r.data.data.systemLimits.forEach((item) => {
                this.currentRow.systemLimits.push({key: item.authorizedInterface, label: item.interfaceName,
                  interfaceType: item.interfaceType, dataPerTime: item.dataPerTime,
                  dataPerTimeUnit: item.dataPerTimeUnit});
              });
              this.$nextTick(() => {
                this.$refs.accessEditRef.handleClear();
                this.$refs.accessEditRef.queryInterfaceList();
                this.$refs.accessEditRef.getCurrentRowData(this.currentRow);
              });
              this.dialogIsVisible = true;
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
              message: this.$t('text.failure') + err.data.msg,
              type: 'error'
            });
          });
      },

      // 编辑功能
      handleEdit(id) {
        this.operator = "edit";
        this.$service.get('/req/systemLimits/' + id)
          .then((r) => {
            if (r.data.code === '000000') {
              this.currentRow = {
                reqSystemReg: {},
                systemLimits: []
              };
              this.currentRow.reqSystemReg = r.data.data.reqSystemReg;
              r.data.data.systemLimits.forEach((item) => {
                this.currentRow.systemLimits.push({key: item.authorizedInterface, label: item.interfaceName,
                  interfaceType: item.interfaceType, dataPerTime: item.dataPerTime,
                  dataPerTimeUnit: item.dataPerTimeUnit});
              });
              this.$nextTick(() => {
                this.$refs.accessEditRef.handleClear();
                this.$refs.accessEditRef.queryInterfaceList();
                this.$refs.accessEditRef.getCurrentRowData(this.currentRow);
              });
              this.dialogIsVisible = true;
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
              message: this.$t('text.failure') + err.data.msg,
              type: 'error'
            });
          });
      },

      // 选择Ids
      handleSelectionChange(val) {
        this.selectedIds = [];
        val.map(item => {
          this.selectedIds.push(item.reqSystemId);
        });
      },

      // 单条删除功能
      handleDelete(id) {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.$service.delete('/req/systemLimits/' + id)
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
      }
    }
  }
</script>

<style scoped>

</style>
