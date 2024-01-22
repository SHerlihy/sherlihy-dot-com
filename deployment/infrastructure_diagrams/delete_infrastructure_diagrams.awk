BEGIN { toPrint = 0 }

/---/ { toPrint = 0 }
{if (toPrint == 0) print }
/^##Infrastructure Diagrams.?$/ { toPrint = 1 }
