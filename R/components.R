rjsfDependency <- function()
{
  htmltools::htmlDependency(
    name = "JsonFormR",
    version = "0.1.0",
    package = "JsonFormR",
    src = "www",
    script = "JsonFormR.js"
  )
}

inputComponent <- function(name) {
  function(inputId, schema, uiSchema, formData = NULL, ...) {
    shiny.react::reactElement(
      module = "@/rjsf",
      name = name,
      props = shiny.react::asProps(
        inputId = inputId,
        schema = schema,
        uiSchema = uiSchema,
        formData = formData,
        ...
      ),
      deps = rjsfDependency()
    )
  }
}

#' SchemaForm
#'
#' Create a React Json Schema Form within an R Shiny app (https://rjsf-team.github.io/react-jsonschema-form/docs/)
#' @param inputId The inputId as used by observeEvents or outputs (input[[inputId]])
#'
#' Within your observeEvents/reactives/outputs, you've got access to two inputs created by this form.
#' - input$`inputId`' which gets triggered on every form update.
#' - 'input$`inputId`_submit' when the submit button is pressed.
#'
#' In both inputs, the formData is captured, which can be manipulated directly or converted back to JSON using `jsonlite::toJSON`
#'
#' @param schema The JSON schema on which to base the form. This can either be:
#' - An imported JSON file (the resulting variable of a call to `jsonlite::fromJSON()`)
#' - The path to a JSON file (`"./path/to/file.json"`)
#' - A raw JSON string (e.g. `{ title: 'Test form', type: 'string', }`)
#'
#' @param uiSchema The uiSchema is used to add more customization to the form's look and feel.
#'
#' The same input formats as for `schema` are possible (import JSON, JSON file path, JSON string)
#'
#' @param formData A JSON used to prefill the form.
#'
#' The same input formats as for `schema` are possible (import JSON, JSON file path, JSON string)
#'
#' @param ... Additional props to pass on to the Form React component.
#' @export
SchemaForm <- function(inputId, schema, uiSchema = NULL, formData = NULL, ...) {
  if(!is.list(schema))
  {
    schema <- jsonlite::fromJSON(schema)
  }

  if(is.null(uiSchema))
  {
    uiSchema <- jsonlite::fromJSON("{}")
  }
  else if(!is.list(uiSchema))
  {
    uiSchema <- jsonlite::fromJSON(uiSchema)
  }

  if(is.null(formData))
  {
    formData <- jsonlite::fromJSON("{}")
  }
  if(!is.list(formData))
  {
    formData <- jsonlite::fromJSON(formData)
  }

  return(
    shiny.react::reactElement(
      module = "@/rjsf",
      name = "ShinyForm",
      props = shiny.react::asProps(
        inputId = inputId,
        schema = schema,
        uiSchema = uiSchema,
        formData = formData,
        ...
      ),
      deps = rjsfDependency()
    )
  )
}
