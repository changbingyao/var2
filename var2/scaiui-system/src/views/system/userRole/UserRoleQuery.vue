<template>
        <el-row type="flex" justify="end">
            <el-form label-position="right"
                     :inline="true"
                     :model="formData" ref="queryForm">
                <sFormItem3 :label="$t('userRole.userRoleId')" prop="userRoleId">
                    <el-input v-model="formData.userRoleId" clearable
                              :placeholder="$t('placeholder.default',[$t('userRole.userRoleId')])"></el-input>
                </sFormItem3>
                <sFormItem3 :label="$t('userRole.userCode')" prop="userCode">
                    <el-input v-model="formData.userCode" clearable
                              :placeholder="$t('placeholder.default',[$t('userRole.userCode')])"></el-input>
                </sFormItem3>
                <sFormItem3 :label="$t('userRole.roleCode')" prop="roleCode">
                    <el-input v-model="formData.roleCode" clearable
                              :placeholder="$t('placeholder.default',[$t('userRole.roleCode')])"></el-input>
                </sFormItem3>
                <sFormItem3 :label="$t('userRole.crtUserCode')" prop="crtUserCode">
                    <el-input v-model="formData.crtUserCode" clearable
                              :placeholder="$t('placeholder.default',[$t('userRole.crtUserCode')])"></el-input>
                </sFormItem3>
                <sFormItem3 :label="$t('userRole.crtOrgCode')" prop="crtOrgCode">
                    <el-input v-model="formData.crtOrgCode" clearable
                              :placeholder="$t('placeholder.default',[$t('userRole.crtOrgCode')])"></el-input>
                </sFormItem3>
	            <sFormItem3 label-width="0px">
                    <el-button type="primary" @click="handleSearch">{{$t('query')}}</el-button>
                    <el-button type="danger" @click="handleReset('queryForm')">{{$t('reset')}}</el-button>
                    <el-button type="warning"  v-permission="'add','添加'"   @click="handleAdd">{{$t('add')}}</el-button>
                    <el-button type="danger"  v-permission="'dels','删除(批量)'" @click="handleDelete" :disabled="selectedIds.length === 0">
                        {{$t('delete')}}
                    </el-button>
                </sFormItem3>

            </el-form>
        </el-row>
</template>

<script>
    export default {
        name: "UserRoleQuery",
        props: {
            selectedIds: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                formInline: {
                },
                formData: {
                },
            }
        },
        methods: {
            handleSearch() {
                this.$emit('loadData', this.formData)
            },
            handleReset(name) {
                this.$refs[name].resetFields();
                this.$emit('loadData', {offset: 1})
            },
            handleAdd() {
                this.$emit('add', true)
            },
            submitDelete() {
                this.$service.delete('/system/userRoles', {data: this.selectedIds})
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
            },
            handleDelete() {
                this.$Confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
                    distinguishCancelAndClose: true,
                    confirmButtonText: this.$t('ok'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning',
                }) .then(() => {
                    this.submitDelete()
            })
            .catch(action => {
                });
            }
        }
    }
</script>

<style>
</style>
