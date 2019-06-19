<template>
    <el-col :span='span'
         :offset='offset'
         :push='push'
         :pull='pull'
         :class-name='className'
         :xs='lxs'
         :sm='lsm'
         :md='lmd'
         :lg='llg'
         :xl="lxl">
      <el-form-item :prop='prop'
                :label='label'
                :label-width='labelWidth'
                :required='required'
                :rules='rules'
                :error='error'
                :show-message='showMessage'>
        <slot></slot>
      </el-form-item>
    </el-col>
</template>

<script>
  import {FormItem, Col} from 'element-ui'

  export default {
    name: "sFormItem3",
    data() {
      return {
        lxl: this._3xl||6,
        llg: this._3lg||8,
        lmd: this._3md||8,
        lsm: this._3sm||12,
        lxs: this._3xs||24,
        order: ''
      };
    },
    components: {
      FormItem, Col
    },
    props: {
      labelWidth: {
        type: String
      },
      // labelFor: {
      //   type: String
      // },
      showMessage: {
        type: Boolean, default: true
      },
      className: {
        type: String
      },
      xs: {
        type: [Number, Object]
      },
      sm: {
        type: [Number, Object]
      },
      md: {
        type: [Number, Object]
      },
      lg: {
        type: [Number, Object]
      },
      colSpan: {type: [Number,String], default: 1}
    },
    extends: {
      mixins: [FormItem, Col]
    },
    created: function () {
      if (this.lg) {
        this.llg = this.lg;
      }
      if (this.md) {
        this.lmd = this.md;
      }
      if (this.sm) {
        this.lsm = this.sm;
      }
      if (this.xs) {
        this.lxs = this.xs;
      }

      //处理跨列
      if (this.colSpan) {
        this.llg = Math.min(this.llg * this.colSpan, 24);
        this.lmd = Math.min(this.lmd * this.colSpan, 24);
        this.lsm = Math.min(this.lsm * this.colSpan, 24);
        this.lxs = Math.min(this.lxs * this.colSpan, 24);
      }
    }
  }
</script>

<style scoped>

</style>
