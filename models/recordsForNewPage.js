const recordsForNewPage = {
  // category: {
  //   name: 'category',
  //   title: '類別',
  //   required: true,
  //   tag: '*',
  //   htmlInputType: 'radio',
  //   hint: '必填欄位',
  //   fontAwesome: '',
  //   defaultValue: ''
  // },
  name: {
    name: 'name',
    title: '支出品項',
    required: true,
    tag: '*',
    htmlInputType: 'text',
    hint: '必填欄位',
    fontAwesome: '',
    inputId: '',
    defaultValue: ''
  },
  unitPrice: {
    name: 'unitPrice',
    title: '單價',
    required: true,
    tag: '*',
    htmlInputType: 'number',
    hint: '必填欄位',
    fontAwesome: '',
    inputId: '',
    defaultValue: ''
  },
  amount: {
    name: 'amount',
    title: '數量',
    required: true,
    tag: '*',
    htmlInputType: 'number',
    hint: '必填欄位',
    fontAwesome: '',
    inputId: '',
    defaultValue: '1'
  },
  merchant: {
    name: 'merchant',
    title: '商家',
    required: false,
    tag: '',
    htmlInputType: 'text',
    hint: '',
    fontAwesome: '',
    inputId: '',
    defaultValue: ''
  },
  date: {
    name: 'date',
    title: '日期',
    required: true,
    tag: '*',
    htmlInputType: 'date',
    hint: '必填欄位',
    fontAwesome: '',
    inputId: 'datepicker',
    // defaultValue: Date.now()
    // 預設為今天的日期，但似乎沒有用
  },
  description: {
    name: 'description',
    title: '備註',
    required: false,
    tag: '',
    htmlInputType: 'text',
    hint: '',
    fontAwesome: '',
    inputId: '',
    defaultValue: ''
  },
}

// exports
module.exports = recordsForNewPage