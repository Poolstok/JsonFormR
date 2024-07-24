#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    https://shiny.posit.co/
#

library(shiny)
library(JsonFormR)
library(bslib)

# Define UI for application that draws a histogram
ui <- page_fluid(
    theme = bs_theme(version = 5, preset='flatly'),
    tags$head(
        tags$script(src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.js", type="text/javascript"),
        tags$link(rel="stylesheet", type="text/css", href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.css"),
        # Debugging script to ensure Summernote is loaded
        tags$script(HTML('
      $(document).ready(function() {
        console.log("jQuery version:", $.fn.jquery);
        if ($.fn.summernote) {
          console.log("Summernote is loaded");
        } else {
          console.log("Summernote is NOT loaded");
        }
      });
    '))
    ),
    # Application title
    titlePanel("ReactJsonSchemaForm in Shiny"),

    # Sidebar with a slider input for number of bins
    sidebarLayout(
        sidebarPanel(
            fileInput('json_schema', 'Upload JSON Schema'),
            fileInput('json_ui_schema', 'Upload JSON UI Schema')
        ),

        # Show a plot of the generated distribution
        mainPanel(
           uiOutput('json_form'),
           hr(),
           verbatimTextOutput('formdata')
        )
    )
)

# Define server logic required to draw a histogram
server <- function(input, output) {

    output$json_form <- renderUI({

        if(!is.null(input$json_schema)){
            schema <- jsonlite::fromJSON(input$json_schema$datapath)
        }
        else {
            schema <- jsonlite::fromJSON('{"title": "Test form", "type": "string"}')
        }
        if(!is.null(input$json_ui_schema)){
            uiSchema <- jsonlite::fromJSON(input$json_ui_schema$datapath)
        }
        else {
            uiSchema <- jsonlite::fromJSON('{}')
        }
        SchemaForm(
            'this.json.form',
            schema,
            uiSchema
        )
    })
    output$formdata <- renderPrint({
      input$this.json.form
    })
}

# Run the application
shinyApp(ui = ui, server = server)
