<template>
  <el-form label-position="right"
           :inline="true" width="100%"
           :model="formData" ref="queryForm">
    <!--<el-row type="flex" justify="start" :gutter="20">-->
      <!--<el-col :span="12">-->
        <!--<el-form-item :label="$t('org.orgName')" prop="orgName">-->
          <!--<el-input v-model="formData.orgName" clearable-->
                    <!--:placeholder="$t('placeholder.default',[$t('org.orgBrief')])"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="handleSearch">{{$t('query')}}</el-button>-->
          <!--<el-button type="danger" @click="handleReset('queryForm')">{{$t('reset')}}</el-button>-->
          <!--<el-button type="warning" v-permission="'add','添加'" @click="handleAdd">{{$t('add')}}</el-button>-->
          <!--<el-button type="danger" v-permission="'dels','删除(批量)'" @click="handleDelete"-->
                     <!--:disabled="selectedIds.length === 0">-->
            <!--{{$t('delete')}}-->
          <!--</el-button>-->
        <!--</el-form-item>-->
      <!--</el-col>-->
    <!--</el-row>-->
  </el-form>
</template>

<script>
  export default {
    name: "OrgQuery",
    props: {
      selectedIds: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        formInline: {},
        formData: {
          operators: {orgName: 'like'}
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
        this.$service.delete('/system/orgs', {data: this.selectedIds})
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
        }).then(() => {
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
