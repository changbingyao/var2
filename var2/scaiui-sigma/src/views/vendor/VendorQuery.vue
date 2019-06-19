<template>
  <el-row type="flex" justify="left">
    <el-form label-position="right" :inline="true" :model="formData" ref="queryForm" style="width: 100%;">
      <sFormItem3 :label="$t('vendor.VENDOR_NAME')" prop="vendorName">
        <el-input ref="vendorNameRef" v-model="formData.vendorName" :placeholder="$t('placeholder.default',[$t('vendor.VENDOR_NAME')])"></el-input>
      </sFormItem3>
      <sFormItem3 :label="$t('vendor.REQ_TYPE')" prop="reqType">
        <sSelect ref="reqTypeRef" v-model="formData.reqType" option="REQ_TYPE" :placeholder="$t('placeholder.select',[$t('vendor.REQ_TYPE')])"></sSelect>
      </sFormItem3>
       <sFormItem3 label-width="0px" style="text-align: right;">
        <el-button class="baseBlue" @click="handleSearch">{{$t('query')}}</el-button>
        <el-button class="baseBlue" @click="handleReset('queryForm')">{{$t('reset')}}</el-button>
        <el-button class="baseGreen" v-permission="'add','添加'" @click="handleAdd">{{$t('add')}}</el-button>
        <el-button class="baseRed" :disabled="selectedIds.length === 0" v-permission="'dels','删除(批量)'" @click="handleDelete">{{$t('delete')}}</el-button>
      </sFormItem3>
    </el-form>
  </el-row>
</template>

<script>
  export default {
    name: "VendorQuery",
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
          vendorName:'',
          reqType:''
        },
      }
    },

    methods: {
      // 查询功能
      handleSearch() {
        this.$emit('loadData', this.formData);
      },

      // 重置功能
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$refs.vendorNameRef.customValue="";
        this.$refs.reqTypeRef.customValue="";
        this.formData={};
        this.$emit('loadData', {offset: 1})
      },

      // 添加功能
      handleAdd() {
        this.$emit('add', true)
      },

      submitDelete() {
        this.$service.delete('/vendor/vendorInfo/', {data: this.selectedIds})
          .then(r => {
            if (r.data.code === '000000') {
              this.$emit('loadData');
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
      },

      // 删除功能
      handleDelete() {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.submitDelete();
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

<style>
</style>
