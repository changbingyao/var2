<template>
    <el-form :model="data" :rules="rules" ref="editForm" label-width="120px">
        <el-row>
            <sFormItem2 :label="$t('authorize.authorizeId')" prop="authorizeId">
                <el-input v-model="data.authorizeId" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.crtDate')" prop="crtDate">
                <el-input v-model="data.crtDate" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.updUserCode')" prop="updUserCode">
                <el-input v-model="data.updUserCode" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.updOrgCode')" prop="updOrgCode">
                <el-input v-model="data.updOrgCode" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.updDate')" prop="updDate">
                <el-input v-model="data.updDate" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.resourceId')" prop="resourceId">
                <el-input v-model="data.resourceId" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.resourceName')" prop="resourceName">
                <el-input v-model="data.resourceName" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.roleCode')" prop="roleCode">
                <el-input v-model="data.roleCode" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.resourceType')" prop="resourceType">
                <el-input v-model="data.resourceType" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.authorizeType')" prop="authorizeType">
                <el-input v-model="data.authorizeType" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.dataAuthType')" prop="dataAuthType">
                <el-input v-model="data.dataAuthType" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.crtUserCode')" prop="crtUserCode">
                <el-input v-model="data.crtUserCode" :disabled="operator=='view'"></el-input>
            </sFormItem2>
            <sFormItem2 :label="$t('authorize.crtOrgCode')" prop="crtOrgCode">
                <el-input v-model="data.crtOrgCode" :disabled="operator=='view'"></el-input>
            </sFormItem2>
        </el-row>
        <el-row>
            <sFormItem2 align="right" col-span="24">
                <el-button type="primary" @click="handleSubmit('editForm')" v-show="operator!='view'">{{$t('ok')}}</el-button>
                <el-button @click="handleCancel">{{$t('cancel')}}</el-button>
            </sFormItem2>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "AuthorizeEdit",
        model: {
            prop: 'dialogIsVisible',
            event: 'closeDialog'
        },
        props: {
            dialogIsVisible: {
                required: true
            },
            operator: {
                type: String,
                required: true
            },
            data: {type: Object}
        },
        data() {
            return {
                rules: {
					authorizeId: [
                    ],
					crtDate: [
                    ],
					updUserCode: [
                    ],
					updOrgCode: [
                    ],
					updDate: [
                    ],
					resourceId: [
                    ],
					resourceName: [
                    ],
					roleCode: [
                    ],
					resourceType: [
                    ],
					authorizeType: [
                    ],
					dataAuthType: [
                    ],
					crtUserCode: [
                    ],
					crtOrgCode: [
                    ],
                }
            }
        },
        methods: {

            /**
			 * 点击取消按钮时关闭对话框
             */
            handleCancel() {
                this.$emit('closeDialog', false)
            },

            /**
			 * 点击确定按钮时保存数据
             * @param formName
             * @returns {boolean}
             */
            handleSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.operator=="edit") {
                            this.userEdit()
                        } else {
                            this.userAdd()
                        }
                    } else {
                        console.log('error submit!!');
						return false;
					}
            });

            },

            /**
			 * 添加服务调用
             */
            userAdd() {
                this.$service.post('/system/authorizes', this.data)
                        .then(r => {
                    if (r.data.code === this.$successCode) {
                    this.$emit('closeDialog', false)
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
                    message:this.$t('text.failure') + err.data.msg,
                    type: 'error'
                });
            })
            },

            /**
			 * 修改服务调用
             */
            userEdit() {
                this.$service.put('/system/authorizes', this.data)
                        .then(r => {
                    if (r.data.code === this.$successCode) {
                    this.$emit('closeDialog', false)
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
        }
    }
</script>

<style scoped>

</style>
