<template>
    <div>
       <!-- <div class="demo-split">
            <iSplit v-model="split1">
                <div slot="left" class="demo-split-pane">-->
                    <MenuQuery @on-query="d=>retData=d"></MenuQuery>
                    <MenuList :data="[retData]" @on-add="toAdd" @on-del="toDel"></MenuList>
               <!-- </div>
                <div slot="right" class="demo-split-pane">
                    Right Pane
                </div>
            </iSplit>
        </div>-->

        <iModal v-model="editDialog" title="菜單管理" draggable @on-ok="save"
                :loading="loading">
            <MenuEdit :data="currentRow" ref="edit"></MenuEdit>
        </iModal>
    </div>
</template>

<script>
    import MenuQuery from './MenuQuery'
    import MenuList from './MenuList'
    import MenuEdit from './MenuEdit'

    export default {
        name: "MenuManage",
        data() {
            return {
                retData: {},
                currentRow: {},
                editDialog: false,
                isCollapsed: false,
                loading: true,
                split1: 0.3
            }
        },
        props: ['option'],
        components: {MenuQuery, MenuList, MenuEdit},
        methods: {
            toAdd(d) {
                this.currentRow = d;
                this.editDialog = true;
            },
            toDel(d) {
                /*this.currentRow = d;
                this.$Modal.confirm({
                  title: '确定要删除该记录吗？', onOk: function () {
                    alert(d.menuCode);
                  }
                })*/
                this.$PageUtil.delete('/system/menu/' + d.menuCode, {}, {
                    error: function (message) {
                        this.loading = false;
                        //this.$Modal.error({});
                        this.$nextTick(() => {
                            this.loading = true;
                        });
                    }, success: function (data) {
                        //this.$Modal.success({});
                    }
                });
            },
            save() {
                this.$refs.edit.$refs['menuValidate'].validate((valid) => {
                    if (valid) {
                        console.log(JSON.stringify(this.$refs.edit.menu))

                        this.$PageUtil.post('/system/menu', Object.assign(this.$refs.edit.menu, {parentMenuCode: this.currentRow.menuCode}), {
                            error: function (message) {
                                this.loading = false;
                                //this.$Modal.error({});
                                this.$nextTick(() => {
                                    this.loading = true;
                                });
                            }, success: function (data) {
                                //this.$Modal.success({});
                            }
                        });

                        return true;
                    } else {
                        this.loading = false;
                        this.$nextTick(() => {
                            this.loading = true;
                        });
                        return false;
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .demo-split {
        height: 600px;
        border: 1px solid #dcdee2;
    }

    .demo-split-pane {
        padding: 10px;
    }
</style>
