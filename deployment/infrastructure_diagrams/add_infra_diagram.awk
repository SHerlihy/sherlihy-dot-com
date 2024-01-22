BEGIN { addText = 1 }

{if (addText == 0) print infraDiagram; addText = 1 }

/^##Infrastructure Diagrams.?$/ { addText = 0 }

{ print }
