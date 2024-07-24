const React = require('react');
const ReactDOM = require('react-dom');
const Form = require('@rjsf/core').default;
const validator = require('@rjsf/validator-ajv8').default;
const { InputAdapter } = require('@/shiny.react');
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillInputWidget(props) {
  const [value, setValue] = useState(props.value || '');
  const handleChange = (newValue) => {
    setValue(newValue);
    props.onChange(newValue);
  };
  return (
    <ReactQuill
      theme = "snow"
      value={value}
      onChange={handleChange}
    />
  );
}

// Register the custom widget
const widgets = {
  QuillInput: QuillInputWidget,
};

const ShinyForm = InputAdapter(Form, (value, setValue, props) => ({
  schema: props.schema,
  validator: validator,
  formData: value,
  widgets: widgets,
  onChange: (e) => {
    setValue(e.formData);
  },
  onSubmit: (e) => {
    console.log(props);
    console.log(`${props.id}_submit`);
    Shiny.setInputValue(`${props.id}_submit`, e.formData);
  }
}));

window.jsmodule = {
  ...window.jsmodule,
  '@rjsf/core': { Form },
  '@/rjsf': { ShinyForm }
};
