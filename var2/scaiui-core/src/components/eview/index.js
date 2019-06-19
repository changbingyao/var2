import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification
}  from   'element-ui'

import customSelect from './custom/SelectInput'
import DragTree from './custom/DragTree'

// 这里是重点
const eview = {
  install: function(Vue){
    Vue.component(Dialog.name, Dialog);
    Vue.component(Menu.name, Menu);
    Vue.component(Submenu.name, Submenu);
    Vue.component(MenuItem.name, MenuItem);
    Vue.component(MenuItemGroup.name, MenuItemGroup);
    Vue.component(Button.name, Button);
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);
    Vue.component(Pagination.name, Pagination);
    Vue.component(Input.name, Input);
    Vue.component(DatePicker.name,DatePicker),
    Vue.component(InputNumber.name, InputNumber);
    Vue.component(Table.name, Table);
    Vue.component(TableColumn.name, TableColumn);
    Vue.component(Form.name, Form);
    Vue.component(FormItem.name, FormItem);
    Vue.component(Select.name, Vue.extend(customSelect));
    // Vue.extend('customSelect', Select);
    Vue.component(Tree.name, Tree);
    Vue.component('DragTree', DragTree);

    Vue.component(Option.name, Option);
    Vue.component(Container.name, Container);
    Vue.component(Header.name, Header);
    Vue.component(Aside.name, Aside);
    Vue.component(Main.name, Main);
    Vue.component(Footer.name, Footer);
    Vue.component(Input.name, Input);
    Vue.component(Table.name, Table);
    Vue.component(Tabs.name, Tabs);
    Vue.component(Pagination.name, Pagination);
    Vue.component(TableColumn.name, TableColumn);
    Vue.component(Form.name, Form);
    Vue.component(FormItem.name, FormItem);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(CheckboxButton.name, CheckboxButton);
    Vue.component(CheckboxGroup.name, CheckboxGroup);
    Vue.component(Autocomplete.name, Autocomplete);
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(DropdownMenu.name, DropdownMenu);
    Vue.component(DropdownItem.name, DropdownItem);
    Vue.component(MessageBox.name, MessageBox);
    Vue.component(Message.name, Message);
    Vue.component(Notification.name, Notification);
    Vue.component(DatePicker.name, DatePicker);
    Vue.component(TimeSelect.name, TimeSelect);
    Vue.component(TimePicker.name, TimePicker);
    Vue.component(Popover.name, Popover);
    Vue.component(Popover.name, Popover);
    Vue.component(Breadcrumb.name, Breadcrumb);
    Vue.component(Breadcrumb.name, Breadcrumb);
    Vue.component(Upload.name, Upload);
    Vue.component(Progress.name, Progress);
    Vue.component(Badge.name, Badge);
    Vue.component(Radio.name, Radio);
    Vue.component(RadioButton.name, RadioButton);
    Vue.component(RadioGroup.name, RadioGroup);
    Vue.component(TabPane.name, TabPane);
    Vue.component(Transfer.name, Transfer);
    Vue.component(ColorPicker.name, ColorPicker);
    Vue.component(Cascader.name, Cascader);
    Vue.component(CollapseItem.name, CollapseItem);
    Vue.component(Step.name, Step);
    Vue.component(Collapse.name, Collapse);
    Vue.component(CarouselItem.name, CarouselItem);
    Vue.component(Carousel.name, Carousel);
    Vue.component(Steps.name, Steps);
    Vue.component(Rate.name, Rate);
    Vue.component(Card.name, Card);
    Vue.component(Alert.name, Alert);
    Vue.component(Tag.name, Tag);
    Vue.component(Switch.name, Switch);
    Vue.component(Slider.name, Slider);
    Vue.component(BreadcrumbItem.name, BreadcrumbItem);
    Vue.component(Tooltip.name, Tooltip);
    Vue.component(ButtonGroup.name, ButtonGroup);
    Vue.component(OptionGroup.name, OptionGroup);
    // Vue.component(Loading.name, Loading);
  }
};

// 导出组件
export default eview
