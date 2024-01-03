BEGIN{ ORS="," }

{ gsub(/^.*\/dist\//, "") }

{ $0="{path:\""$0 }

NR==1 {$0="dist_files = ["$0}

/.html$/ { $0=$0"\",type:\"text/html\"}"}
/.css$/ { $0=$0"\",type:\"text/css\"}"}
/.js$/ { $0=$0"\",type:\"text/javascript\"}"}
/.png$/ { $0=$0"\",type:\"image/x-png\"}"}
/.svg$/ { $0=$0"\",type:\"image/svg+xml\"}"}

NR>1 { print prev }

{ prev=$0 }

ENDFILE{ ORS="]"; print prev }
