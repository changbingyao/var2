<template>
    <div>
        <!--列表功能-->
        <br>
        <AuthorizeQuery :selectedIds="selectedIds"
                   @add="handleAdd"
                   @loadData="loadData"/>
        <br>
        <!--列表主体-->
        <div>
            <el-row>
                <el-table
                        ref="multipleTable"
                        :data="data.rows"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            type="index"
                            width="55">
                        <template slot-scope="scope">
                            {{(scope.$index+1) + (offset-1) * limit}}
                        </template>
                    </el-table-column>
                   <el-table-column
                           :label="$t('authorize.resourceName')"
                           prop="resourceName" show-overflow-tooltip>
                   </el-table-column>
                   <el-table-column
                           :label="$t('authorize.roleCode')"
                           prop="roleCode" show-overflow-tooltip>
                   </el-table-column>
                   <el-table-column
                           :label="$t('authorize.resourceType')"
                           prop="resourceType" show-overflow-tooltip>
                   </el-table-column>
                   <el-table-column
                           :label="$t('authorize.authorizeType')"
                           prop="authorizeType" show-overflow-tooltip>
                   </el-table-column>
                   <el-table-column
                           :label="$t('authorize.dataAuthType')"
                           prop="dataAuthType" show-overflow-tooltip>
                   </el-table-column>
                    <el-table-column :label="$t('action')" min-width="90px">
                        <template slot-scope="scope">
                            <el-button type="text" v-permission="'view','查看'" @click="handleView(scope.row)">{{$t('view')}}</el-button>
                            <el-button type="text" v-permission="'edit','编辑'" @click="handleEdit(scope.row)">{{$t('edit')}}</el-button>
                            <el-button type="text" v-permission="'del','删除'" @click="handleDelete(scope.row.authorizeId)">{{$t('delete')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <br><br>
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
        </div>

        <!--新增编辑查看-->
        <div>
            <el-row>
                <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="70%">
                    <AuthorizeEdit v-model="dialogIsVisible"
                              :operator="operator"
                              :data="currentRow"
                              @loadData="loadData"></AuthorizeEdit>
                </el-dialog>
            </el-row>
        </div>
    </div>
</template>

<script>
    import AuthorizeQuery from './AuthorizeQuery'
    import AuthorizeEdit from './AuthorizeEdit'

    export default {
        name: "AuthorizeList",
        components: {AuthorizeQuery, AuthorizeEdit},
        created() {
        },
        data() {
            return {
                limit: this.$pageSize,
                selectedIds: [],
                operator: 'view',
                offset: 1,
                dialogFormVisible: false,
                dialogIsVisible: false,
                data: {},
                params:{},
                currentRow: {},
                dialogTitle: {
                    "edit": this.$t('authorize.$title', [this.$t('edit')]),
                    "add": this.$t('authorize.$title', [this.$t('add')]),
                    "view": this.$t('authorize.$title', [this.$t('view')])
                }
            }
        },
        mounted() {
            this.loadData()
        },
        computed: {
        },
        methods: {
            /**
             * 分页查询列表数据
             * @param shadow
             */
            loadData(shadow = {}) {
                this.params = Object.assign({
                    limit: this.limit,
                    offset: this.offset,
                }, shadow||this.params);
                this.$service.get('/system/authorizes', {params: this.params})
                        .then(r => {
                    if (r.data.code === this.$successCode) {
                    this.data = r.data.data
                }
            })
            .catch(err => {
                    this.$Message({
                    showClose: true,
                    message: this.$t('text.failure') + err.data.msg,
                    type: 'error'
                });
            })
            },

            /**
             * 选择行数据
             * @param val
             */
            handleSelectionChange(val) {
                this.selectedIds = [];
                val.map(item => {
                    this.selectedIds.push(item.authorizeId)
            })
                console.log('val', this.selectedIds)
            },

            /**
             * 每页显示条数变化
             * @param val
             */
            handleSizeChange(val) {
                this.limit = val
                this.loadData()
            },

            /**
             * 点击添加按钮时调用添加页面
             * @param val
             */
            handleAdd(val) {
                this.operator = "add"
                this.dialogIsVisible = val
                this.currentRow = {};
            },

            /**
             * 点击翻页时处理
             * @param val
             */
            handleCurrentChange(val) {
                this.offset = val
                this.loadData()
            },

            /**
             * 点击列表中的查看按钮时，弹出详情页
             * @param rowData
             */
            handleView(rowData) {
                this.operator = "view"
                this.dialogIsVisible = true;
                this.currentRow = rowData
            },

            /**
             * 点击列表中的编辑按钮时，弹出编辑页面
             * @param rowData
             */
            handleEdit(rowData) {
                this.operator = "edit"
                this.dialogIsVisible = true;
                this.currentRow = rowData
            },

            /**
             * 点击列表中的删除按钮时，处理单笔删除
             * @param id
             */
            handleDelete(id) {
                this.$Confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
                    distinguishCancelAndClose: true,
                    confirmButtonText: this.$t('ok'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning',
                }).then(() => {
                    this.$service.delete('/system/authorizes/'+id)
                        .then(r => {
                    if (r.data.code === this.$successCode) {
                    this.$emit('loadData')
                    this.$Message({
                        showClose: true,
                        message: this.$t('text.success'),
                        type: 'success'
                    })
                }
            })
            .catch(err => {
                    this.$Message({
                    showClose: true,
                    message: this.$t('text.failure') + err.data.msg,
                    type: 'error'
                });
            })
            })
            .catch(action => {
                });
            }
        }
    }
</script>

<style scoped>

</style>
