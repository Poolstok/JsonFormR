import $ from 'jquery'; 
window.jQuery = $;
window.$ = $;

import 'bootstrap/dist/css/bootstrap.css';
import 'react-summernote/dist/react-summernote.css';
import 'summernote/dist/lang/summernote-en-US';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'summernote/dist/summernote.js';

import React from 'react';
import ReactDOM from 'react-dom';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { InputAdapter } from '@/shiny.react';
import ReactSummernote from 'react-summernote';

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