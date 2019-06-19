<template>
  <div>
    <!--列表主体-->
    <br>
    <sTreeTable2 :data="data" expand-all border>
      <el-table-column :label="$t('menu.menuCode')" prop="menuCode" width="135"></el-table-column>
      <el-table-column :label="$t('menu.menuName')" prop="menuName" width="150"></el-table-column>
      <el-table-column :label="$t('menu.menuUrl')" prop="menuUrl" width="155"></el-table-column>
      <el-table-column :label="$t('menu.menuType')" prop="menuType" width="100">
        <template slot-scope="scope">
          <sText option="MENU_TYPE" v-model="scope.row.menuType"></sText>
        </template>
      </el-table-column>
      <el-table-column :label="$t('menu.menuSeq')" prop="menuSeq" width="120"></el-table-column>
      <el-table-column :label="$t('action')" min-width="90px">
        <template slot-scope="scope">
          <el-button type="text" v-permission="'view','查看'" @click="handleView(scope.row)">{{$t('view')}}</el-button>
          <el-button type="text" v-permission="'edit','编辑'" @click="handleEdit(scope.row)">{{$t('edit')}}</el-button>
          <el-button type="text" v-permission="'add','添加'" @click="handleAdd(scope.row.menuCode)">{{$t('add')}}</el-button>
          <el-button type="text" v-permission="'del','删除'" @click="handleDelete(scope.row.menuCode)">{{$t('delete')}}
          </el-button>
        </template>
      </el-table-column>
    </sTreeTable2>
    <!--新增编辑查看-->
    <div>
      <el-row>
        <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="70%" :close-on-click-modal="false">
          <MenuEdit v-model="dialogIsVisible" :operator="operator" :data="currentRow" @loadData="loadData"></MenuEdit>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>

<script>
  import MenuQuery from './MenuQuery'
  import MenuEdit from './MenuEdit'

  export default {
    name: "MenuList",
    components: {MenuQuery, MenuEdit},
    created() {
    },
    data() {
      return {
        limit: this.$pageSize,
        operator: 'view',
        offset: 1,
        isVisible: 1,
        dialogFormVisible: false,
        dialogIsVisible: false,
        data: [],
        params: {},
        currentRow: {},
        dialogTitle: {
          "edit": this.$t('menu.$title', [this.$t('edit')]),
          "add": this.$t('menu.$title', [this.$t('add')]),
          "view": this.$t('menu.$title', [this.$t('view')])
        }
      }
    },
    mounted() {
      this.loadData();
    },
    computed: {},
    methods: {
      // 分页查询列表数据
      loadData(shadow = {}) {
        this.params = Object.assign({}, shadow || this.params);
        this.$service.get('/system/menus/0/tree', {params: this.params})
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
          })
      },

      // 每页显示条数变化
      handleSizeChange(val) {
        this.limit = val;
        this.loadData();
      },

      // 添加
      handleAdd(val) {
        this.operator = "add";
        this.dialogIsVisible = true;
        this.currentRow = {"parentCode": val, isVisible: '1', isStart: '1', menuType: '1', isRelativePath: '1'};
      },

      // 点击翻页时处理
      handleCurrentChange(val) {
        this.offset = val;
        this.loadData();
      },

      // 查看
      handleView(rowData) {
        this.operator = "view";
        this.dialogIsVisible = true;
        this.currentRow = rowData;
      },

      // 编辑
      handleEdit(rowData) {
        this.operator = "edit";
        this.dialogIsVisible = true;
        this.currentRow = rowData;
      },

      // 单笔删除
      handleDelete(menuCode) {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.submitDelete(menuCode);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('cancelled')
          });
        });
      },

      submitDelete(menuCode) {
        this.$service.delete('/system/menus/' + menuCode)
          .then(r => {
            if (r.data.code === '000000') {
              this.loadData();
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            }
          })
          .catch(err => {
            console.error('err', err)
          })
      }
    }
  }
</script>

<style scoped>

</style>
