import NavButton from "@/shared/components/NavButton.tsx"

const NAVIGATION_ITEMS = [
  {path: "/", display: "Home"},
  {path: "/highlight/i2-group", display: "i2 Group"},
  {path: "/highlight/velma-mode", display: "Velma Mode"},
  {path: "/highlight/go-auth", display: "Go Auth"},
  {path: "/highlight/aws-certificates", display: "AWS Certs"},
  {path: "/highlight/sherlihy-dot-com", display: "SHerlihy Dot Com"},
  {path: "/highlight/software-crafters", display: "Software Crafters"},
  {path: "/highlight/cambridge-ai", display: "Cambridge AI"},
  {path: "/highlight/day-of-code", display: "Day of Code"},
  {path: "/highlight/tech-week", display: "Tech Week"},
]

function NavList() {
    return (
        <div className={`flex-grow flex flex-col justify-evenly`}>
          {NAVIGATION_ITEMS.map((item)=>
            <NavButton pathname={item.path}>{item.display}</NavButton>
          )}
        </div>
    )
}

export default NavList
