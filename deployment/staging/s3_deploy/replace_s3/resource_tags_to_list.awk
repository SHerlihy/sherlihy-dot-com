BEGIN{ ORS="," }

{ gsub(/^.*=/, "") }

NR==1 {$0="resource_tags = ["$0}

NR>1 { print prev }

{ prev=$0 }

ENDFILE{ ORS="]"; print prev }
