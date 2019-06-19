<template>
  <div>
    <Select ref="preference" :value="value" :multiple="multiple" :disabled="disabled" :value-key="valueKey"
            :size="size"
            :clearable="clearable" :collapse-tags="collapseTags" :multiple-limit="multipleLimit"
            :name="name" :autocomplete="autocomplete"
            :remote="remote" :remote-method="remoteMethod"
            :loading="loading" :loading-text="loadingText" :no-match-text="noMatchText" :no-data-text="noDataText"
            :popper-class="popperClass" :reserve-keyword="reserveKeyword"
            :placeholder="placeholder"
            :filterable="filterable" :allow-create="allowCreate" :filter-method="filterMethod" @change="handChange"
            @blur="handBlur"
            @visible-change="handVisibleChange" @clear="handClear" @focus="handFocus" @remove-tag="handRemoveTag"
    >
      <el-option-group v-for="group in listData" v-if="group && group.children"
                       :key="group.label"
                       :label="group.label">
        <el-option
          v-for="item in group.children"
          :key="item.key"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-option-group>
      <el-option v-for="item in listData"
                 :key="item.key"
                 :label="item.label"
                 :value="item.value"
                 :disabled="item.disabled"></el-option>
    </Select>
  </div>
</template>

<script>
  import {Select, Option, OptionGroup} from 'element-ui'
  //import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
  export default {
    name: "sSelect",
    data() {
      return {
        queryData: [],
      };
    },
    components: {
      Select, Option, OptionGroup
    },
    props: {
      option: {type: [String, Array]}
    },
    extends: Select
    ,
    computed: {
      listData: function () {
        if (this.option && typeof this.option === 'string') {
          return this.queryData;
        } else {
          //console.log("select--option--->", this.option)
          return this.option;
        }
      }
    },
    mounted: function () {
      //removeResizeListener(this.$el, this.handleResize);
      //console.log("select ========mounted", this.$i18n.locale)
      if (this.option && typeof this.option === 'string') {
        let list = window.sessionStorage.getItem('_DICT_' + this.$i18n.locale + "_" + this.option);
        if (list) {
          this.queryData = JSON.parse(list);
        } else {
          this.$service.get(`/plist/${this.option}`, {params: {locale: this.$i18n.locale}}).then(r => {
            this.queryData = r.data.data;
            window.sessionStorage.setItem('_DICT_' + this.$i18n.locale + "_" + this.option, JSON.stringify(r.data.data));
            //console.log("------->", JSON.stringify(this.listData));
          }).catch(error => {
            console.log(error);
          });
        }
      } else {
        this.queryData = this.option;
      }
    }
    ,
    methods: {
      handChange(val) {
        //this.$emit('value', val);
        this.$emit('input', val)
        this.$emit('change', val);
      },
      handRemoveTag(query) {
        this.$emit('remove-tag', query);
      }
      ,
      handClear(event) {
        this.$emit('clear', event);
      },
      handBlur(event) {
        this.$emit('blur', event);
      },
      handFocus(event) {
        this.$emit('focus', event);
      },
      handVisibleChange(event) {
        this.$emit('visible-change', event);
      },
      resetInputWidth() {
        if (!this.$refs.preference || !this.$refs.preference.$refs.reference){
          return;
        }
        this.$refs.preference.inputWidth = this.$refs.preference.$refs.reference.$el.getBoundingClientRect().width;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-select {
    width: 100% !important;
  }
</style>
