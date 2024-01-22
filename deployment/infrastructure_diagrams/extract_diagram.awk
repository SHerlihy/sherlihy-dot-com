BEGIN {toPrint = 1}
/<\/pre>/ {toPrint = 1; print "```"}
{if (toPrint == 0) print}
/<pre class="mermaid">/ {toPrint=0; print "```mermaid"}
