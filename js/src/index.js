// const React = require('react');
// const ReactDOM = require('react-dom');
// const Form = require('@rjsf/core').default;
// const validator = require('@rjsf/validator-ajv8').default;
// const { InputAdapter } = require('@/shiny.react');
// const ReactSummernote = require("react-summernote");
import React from 'react';
import ReactDOM from 'react-dom';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { InputAdapter } from '@/shiny.react';
import ReactSummernote from 'react-summernote';

import 'react-summernote/dist/react-summernote.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'summernote/dist/lang/summernote-en-US';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';

const SummernoteWidget = (props) => {
  const handleChange = (content) => {
    props.onChange(content)
  }

  return (
    <ReactSummernote 
      value={props.value}
      options={{
        height: 200,
        dialogsInBody: true,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['fontname', ['fontname']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview']]
        ]
      }}
      onChange={handleChange}
    />
  )
}

const widgets = {
  summernote: SummernoteWidget,
}

const ShinyForm = InputAdapter(Form, (value, setValue, props) => ({
  schema: props.schema,
  validator: validator,
  formData: value,
  widgets: widgets,
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