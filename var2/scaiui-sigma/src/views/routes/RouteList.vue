<template>
  <div>
    <!--列表功能-->
    <RouteQuery :selectedIds="selectedIds" @add="handleAdd" @loadData="loadData"/>
    <!--列表主体-->
    <div>
      <el-row>
        <el-table ref="multipleTable" :data="data.rows" tooltip-effect="light" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" :label="$t('number')" width="70">
            <template slot-scope="scope">{{(scope.$index+1)}}</template>
          </el-table-column>
          <el-table-column :label="$t('routes.routeName')" prop="routeName" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column :label="$t('routes.switchType')" show-overflow-tooltip width="80">
            <template slot-scope="scope">
              <sText option="SWITCH_TYPE" v-model="scope.row.switchType"></sText>
            </template>
          </el-table-column>
          <el-table-column :label="$t('routes.switchCondition')" show-overflow-tooltip width="180">
            <template slot-scope="scope">
              <sText option="SWITCH_COND" v-model="scope.row.switchCond"></sText>
            </template>
          </el-table-column>
          <el-table-column :label="$t('basicInfoOne')" show-overflow-tooltip>
            <template slot-scope="scope">
              <sText option="LINE_TYPE" v-model="scope.row.line1"></sText>
            </template>
          </el-table-column>
          <el-table-column :label="$t('basicInfoTwo')" show-overflow-tooltip>
            <template slot-scope="scope">
              <sText option="LINE_TYPE" v-model="scope.row.line2"></sText>
            </template>
          </el-table-column>
          <el-table-column :label="$t('basicInfoThree')" show-overflow-tooltip>
            <template slot-scope="scope">
              <sText option="LINE_TYPE" v-model="scope.row.line3"></sText>
            </template>
          </el-table-column>
          <el-table-column :label="$t('basicInfoFour')" show-overflow-tooltip>
            <template slot-scope="scope">
              <sText option="LINE_TYPE" v-model="scope.row.line4"></sText>
            </template>
          </el-table-column>
          <el-table-column :label="$t('action')" min-width="110px">
            <template slot-scope="scope">
              <el-button type="text" v-permission="'view','查看'" @click="handleView(scope.row.routeId)">{{$t('view')}}</el-button>
              <el-button type="text" v-permission="'edit','编辑'" @click="handleEdit(scope.row.routeId)">{{$t('edit')}}</el-button>
              <el-button type="text" v-permission="'del','删除'" @click="handleDelete(scope.row.routeId)">{{$t('delete')}}</el-button>
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
        <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="60%" :close-on-click-modal="false">
          <RouteEdit ref="routeEditRef" v-model="dialogIsVisible" :operator="operator" :currentRow="currentRow"
                     @loadData="loadData"></RouteEdit>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>

<script>
  import RouteQuery from './RouteQuery';
  import RouteEdit from './RouteEdit';

  export default {
    name: "RouteList",
    components: {RouteQuery, RouteEdit},
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
          "edit": this.$t('routes.$title', [this.$t('edit')]),
          "add": this.$t('routes.$title', [this.$t('add')]),
          "view": this.$t('routes.$title', [this.$t('view')]),
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 查询功能
      loadData(data) {
        if (data && data.routeName != '') {
          this.params = Object.assign({
            limit: this.limit,
            offset: this.offset,
            routeName: data.routeName
          });
        } else {
          this.params = Object.assign({
            limit: this.limit,
            offset: this.offset
          });
        }
        this.$service.get('/interface/routeConfigs', {params: this.params})
          .then( r => {
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
          this.$refs.routeEditRef.handleClear();
          this.$refs.routeEditRef.getInterfaceList();
          this.$refs.routeEditRef.getLineOptions();
        });
        this.currentRow = {
          interfaceInfos: [],
          switchType: '1'
        };
        this.dialogIsVisible = true;
      },

      // 查看功能
      handleView(id) {
        this.operator = "view";
        this.$service.get('/interface/routeConfigs/' + id)
          .then( r => {
            if (r.data.code === '000000') {
              this.currentRow = r.data.data;
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
        this.dialogIsVisible = true;
        this.$nextTick(() => {
          this.$refs.routeEditRef.handleClear();
          this.$refs.routeEditRef.getInterfaceList(id, '01');
          this.$refs.routeEditRef.getLineOptions();
        });
      },

      // 编辑功能
      handleEdit(id) {
        this.operator = "edit";
        this.$service.get('/interface/routeConfigs/' + id)
          .then( r => {
            if (r.data.code === '000000') {
              this.currentRow = r.data.data;
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
        this.dialogIsVisible = true;
        this.$nextTick(() => {
          this.$refs.routeEditRef.handleClear();
          this.$refs.routeEditRef.getInterfaceList(id, '');
          this.$refs.routeEditRef.getLineOptions();
        });
      },

      // 选择Ids
      handleSelectionChange(val) {
        this.selectedIds = [];
        val.map(item => {
          this.selectedIds.push(item.routeId);
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
          this.$service.delete('/interface/routeConfigs/' + id)
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
                })
              }
            }).catch(err => {
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

<style lang="scss" scoped>

</style>
