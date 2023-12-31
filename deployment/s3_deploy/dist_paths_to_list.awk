BEGIN{ ORS="\"," }

{ gsub("./dist/", "\"") }

NR==1 {$0="["$0}

NR>1 { print prev }

{ prev=$0 }

ENDFILE{ ORS="\"]"; print prev }
