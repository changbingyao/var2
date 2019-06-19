const lang = {
  locale: 'zh-CN',
  landing:{

  },
  // router: {
  //   user: '用户',
  // },
  resetPassword:'重置密码',
  resetUserName:'重置用户',
  resetVerify:'权限验证',
  verifyMessage:'请输入您的密码进行权限验证',
  resetSuccess:'重置成功',
  userRole: {
    $title : '{0}系统管理->系统管理-用户角色对照表信息',
    userRoleId : 'ID',
    userCode : '用户编码',
    roleCode : '角色编码',
    crtUserCode : '创建人',
    crtOrgCode : '创建机构',
    crtDate : '创建日期',
    updUserCode : '修改人',
    updOrgCode : '修改机构',
    updDate : '修改日期',
  },
  authorize: {
    $title : '{0}系统管理->系统管理-角色权限表信息',
    authorizeId : '权限ID',
    crtDate : '创建日期',
    updUserCode : '修改人',
    updOrgCode : '修改机构',
    updDate : '修改日期',
    resourceId : '资源ID',
    resourceName : '资源名称',
    roleCode : '角色编码',
    resourceType : '资源类型',
    authorizeType : '授权类型',
    dataAuthType : '权限级别',
    crtUserCode : '创建人',
    crtOrgCode : '创建机构',
  },
  dictionary: {
    $title : '{0}数据字典信息',
    dictId : 'ID',
    module : '模块',
    legalOrg : '法人行社',
    crtUserCode : '创建人',
    crtOrgCode : '创建机构',
    crtDate : '创建日期',
    updUserCode : '修改人',
    updOrgCode : '修改机构',
    updDate : '修改日期',
    parentId : '上级ID',
    dictType : '类型' ,
    dictCode : '代码',
    dictName : '名称',
    dictDesc : '描述',
    status : '状态',
    sortNo : '排序',
    isSystem : '系统类',
  },
  org: {
    $title : '{0}机构信息',
    orgId : '机构ID',
    status : '状态',
    country : '国家或地区',
    email : '联系邮箱',
    officeAddr : '办公地址',
    post : '邮政编码',
    tel : '联系电话',
    contact : '联系人',
    orgFiNo : '金融机构编码（人行）',
    orgPayNo : '支付行号（人行）',
    orgCreditNo : '机构信用代码（人行）',
    orgCode : '机构编码',
    orgPermitNo : '金融许可证号码（银监）',
    orgRegNo : '营业执照注册号（工商）',
    orgIdNumber : '组织机构代码证号码',
    orgTaxNo : '税务登记证号码',
    orgCreateDate : '成立日期',
    orgStartDate : '营业开始时间',
    orgEndDate : '营业终止时间',
    orgHeader : '机构负责人',
    nodeNo : '网点号',
    isLeaf : '是否最末端',
    orgName : '机构名称',
    busiStatus : '营业状态',
    areaCode : '行政区划代码',
    orders : '顺序号',
    ownLine : '所属条线',
    verNo : '版本号',
    processInstanceId : '审批流ID',
    remark : '备注',
    crtUserCode : '创建人',
    crtOrgCode : '创建机构',
    crtDate : '创建日期',
    orgBrief : '机构简称',
    updUserCode : '修改人',
    updOrgCode : '修改机构',
    updDate : '修改日期',
    parentOrgCode : '直接上级机构ID',
    orgCategory : '机构类别',
    orgLevel : '机构层级',
    orgGrade : '机构级别',
    pathName : '中文路径',
  },
  menu: {
    $title : '{0}菜单信息',
    menuCode: '菜单编码',
    menuName: '菜单名称',
    menuType: '菜单类型',
    menuUrl: '菜单路径',
    parentCode: '所属父菜单',
    menuModule: '所属模块',
    isRelativePath: '是否绝对路径',
    menuLevel: '菜单层次',
    menuSeq: '同级菜单顺序号',
    menuIcon: '菜单图标',
    menuIcona: '菜单激活图标路径/或样式',
    isVisible: '是否可视',
    openMode: '主窗口打开、弹出窗口打开',
    menuTip: '提示信息',
    isStart: '是否启用'
  },
  user: {
    $title : '{0}用户基本信息',
    orgName: '机构名称',
    userId : '主键',
    nationality : '国籍',
    ethnic : '民族',
    nativePlace : '籍贯',
    birthPlace : '出生地',
    birthDate : '出生日期',
    idDecimal : '身份证号码',
    photoId : '证件照',
    joinDate : '入职日期',
    status : '用户状态',
    tellerId : '柜员编码',
    userCode : '用户编码',
    residentialAddress : '现居住地址',
    mobilePhone : '手机',
    remark : '备注',
    password : '密码',
    salt : '盐（密码）',
    onlineStatus : '在线状态',
    ipAddr : 'IP地址',
    userTheme : '用户皮肤',
    pdCount : '密码输入次数',
    pdModtime : '密码修改时间',
    userName : '用户姓名',
    pdLocktime : '密码锁定时间',
    lastSignonTime : '最后一次登陆时间',
    lastSignoutTime : '最后一次退出时间',
    legalOrg : '法人机构编号',
    crtUserCode : '创建人',
    crtOrgCode : '创建机构',
    crtDate : '创建日期',
    updUserCode : '修改人',
    updOrgCode : '修改机构',
    updDate : '修改日期',
    userNameEn : '英文名',
    userNamePy : '拼音码',
    userNameFr : '曾用名',
    orgCode : '机构编码',
    postNo : '岗位',
    userSex : '性别',
  },
  role: {
    $title : '{0}角色信息',
    roleId : 'ID',
    updUserCode : '修改人',
    updOrgCode : '修改机构',
    updDate : '修改日期',
    roleCode : '角色编码',
    roleName : '角色名称',
    remark : '角色描述',
    roleLevel : '角色级别',
    status : '角色状态',
    crtUserCode : '创建人',
    crtOrgCode : '创建机构',
    crtDate : '创建日期',
  },
  actionLog: {
    $title: '{0}操作日志信息',
    userName: '用户名',
    startDate: '起始日期',
    endDate: '结束日期',
    operationAction: '操作动作',
    operationTime: '操作时间'
  },
  themSet: {
    headerBg: '导航栏背景色',
    headerColor: '导航栏字体颜色',
    sideBg: '侧边栏背景色',
    panelBg: '面板背景色',
    panelColor: '面板字体颜色',
    mainColor: '字体颜色',
    logoUrl: 'logo地址',
    apply: '应用',
    submit: '确定'
  }
};

export default lang;
