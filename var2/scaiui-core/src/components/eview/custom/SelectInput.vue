<template >
  <Select  :placeholder="placeholder"
           v-model="modelData"
           :disabled='disabled' :clearable="clearable"
           :multiple="multiple"
           :filterable="filterable"
           :collapse-tags="collapseTags"
           @visibleChange="customVisibleChange"
           @blur="customBlur"
           @change="customChange">
    <el-option-group v-if="items[0] && items[0].options"
                     v-for="group in items"
                     :key="group.label"
                     :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-option-group>
    <el-option v-for="item in items"
               :key="item.value"
               :label="item.label"
               :value="item.value"
               :disabled="item.disabled"></el-option>
  </Select>
</template>
<script>
  import { Select } from  'element-ui'
  export default {
    name: "sSelect",
    model: {
      prop: 'value',
      event: 'whenValueChange'
    },
    components: { Select },
    props: {
      placeholder: {
        type: String,
        default: function () {
          return '请选择'
        }
      },
      filterable: Boolean,
      value: {
        required: false,
      },
      disabled:Boolean,
      collapseTags: Boolean,
      clearable:Boolean,
      multiple: Boolean,
      change: {type: Function},
      blur: {type: Function},
      visibleChange: {type: Function},
      options: {type: Array},
      path: {
        required: false,
        type: String
      },
    },
    //extends: Select,
    data () {
      return {
        selected: "",
        items: []
      };
    },
    mounted() {
      if(!!this.path) {
        this.loadData()
      } else {
        this.items = this.options
      }
    },
    computed: {
      modelData: {
        get: function () {
          return this.value
        },
        set: function (newValue) {
          this.$emit('whenValueChange', newValue)
        }
      }
    },
    methods: {
      loadData() {
        this.$service.get(`/plist/${this.path}`, {params: {locale: this.$i18n.locale}}).then(r => {
          if(r.data.code === '000000') {
            this.items = r.data.data;
            this.$emit('whenValueChange', '')
          }
        })
      },
      customChange(val) {
        this.$emit('whenValueChange', val);
        this.$emit('change', val)
      },
      customVisibleChange(val) {
        console.log('customVisibleChange', val)
        this.$emit('visibleChange', val)
      },
      customBlur(val) {

        this.$emit('blur', val)
      }
    },
    watch: {
      selected: function (val) {
        this.$emit("change", val);
      },
      options(val){
        this.items = val
      }
    }
  }
</script>

<style scoped>

</style>
