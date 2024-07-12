const React = require('react');
const ReactDOM = require('react-dom');
const Form = require('@rjsf/core').default;
const validator = require('@rjsf/validator-ajv8').default;
const { InputAdapter } = require('@/shiny.react');

require('bootstrap/dist/css/bootstrap.min.css');
require('summernote/dist/summernote-bs5.css');
const $ = require('jquery');
require('summernote/dist/summernote-bs5.js');

// Define the Summernote widget
const SummernoteWidget = (props) => {
  const { id, value, onChange } = props;

  React.useEffect(() => {
    $(`#${id}`).summernote({
      height: 200,
      callbacks: {
        onChange: (contents) => {
          onChange(contents);
        },
      },
    });

    // Set initial value
    $(`#${id}`).summernote('code', value);

    // Cleanup on unmount
    return () => {
      $(`#${id}`).summernote('destroy');
    };
  }, [id, value, onChange]);

  return <textarea id={id} />;
};

// Register the custom widget
const widgets = {
  summernoteInput: SummernoteWidget,
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
