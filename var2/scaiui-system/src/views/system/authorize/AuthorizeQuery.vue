<template>
        <el-row type="flex" justify="end">
            <el-form label-position="right"
                     :inline="true"
                     :model="formData" ref="queryForm">
                <sFormItem3 :label="$t('authorize.authorizeId')" prop="authorizeId">
                    <el-input v-model="formData.authorizeId" clearable
                              :placeholder="$t('placeholder.default',[$t('authorize.authorizeId')])"></el-input>
                </sFormItem3>
                <sFormItem3 :label="$t('authorize.resourceId')" prop="resourceId">
                    <el-input v-model="formData.resourceId" clearable
                              :placeholder="$t('placeholder.default',[$t('authorize.resourceId')])"></el-input>
                </sFormItem3>
                <sFormItem3 :label="$t('authorize.resourceName')" prop="resourceName">
                    <el-input v-model="formData.resourceName" clearable
                              :placeholder="$t('placeholder.default',[$t('authorize.resourceName')])"></el-input>
                </sFormItem3>
                <sFormItem3 :label="$t('authorize.authorizeType')" prop="authorizeType">
                    <el-input v-model="formData.authorizeType" clearable
                              :placeholder="$t('placeholder.default',[$t('authorize.authorizeType')])"></el-input>
                </sFormItem3>
                <sFormItem3 :label="$t('authorize.dataAuthType')" prop="dataAuthType">
                    <el-input v-model="formData.dataAuthType" clearable
                              :placeholder="$t('placeholder.default',[$t('authorize.dataAuthType')])"></el-input>
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
        name: "AuthorizeQuery",
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
                this.$service.delete('/system/authorizes', {data: this.selectedIds})
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
