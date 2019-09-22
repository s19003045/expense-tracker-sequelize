const userObj = {
  name: {
    name: 'Name',
    title: 'Name',
    required: true,
    tag: '*',
    htmlInputType: 'name',
    hint: '必填欄位，只允許英文，不能有空白',
    fontAwesome: '',
    inputId: 'name',
    placeholder: 'Enter name'
  },
  email: {
    name: 'email',
    title: 'Email',
    required: true,
    tag: '*',
    htmlInputType: 'email',
    hint: '必填欄位',
    fontAwesome: '',
    inputId: 'email',
    placeholder: 'Enter email'
  },
  password: {
    name: 'password',
    title: 'Password',
    required: true,
    tag: '*',
    htmlInputType: 'password',
    hint: '必填欄位',
    fontApasswordme: '',
    inputId: 'password',
    placeholder: 'Create password'
  },
  password2: {
    name: 'password2',
    title: 'Confirm password',
    required: true,
    tag: '*',
    htmlInputType: 'password',
    hint: '必填欄位',
    fontAwesome: '',
    inputId: 'password2',
    placeholder: 'Confirm password'
  },
}
module.exports = userObj