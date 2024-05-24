const React = require('react');
const ReactDOM = require('react-dom');
const Form = require('@rjsf/core').default;
const validator = require('@rjsf/validator-ajv8').default;
const { InputAdapter } = require('@/shiny.react');

const ShinyForm = InputAdapter(Form, (value, setValue, props) => ({
  schema: props.schema,
  validator: validator,
  formData: value,
  onChange: (e) => {
    setValue(e.formData);
  },
  onSubmit: (e) => {
    console.log(props)
    console.log(`${props.id}_submit`);
    Shiny.setInputValue(`${props.id}_submit`, e.formData);
  }
}));

window.jsmodule = {
  ...window.jsmodule,
  '@rjsf/core': { Form },
  '@/rjsf': { ShinyForm }
};