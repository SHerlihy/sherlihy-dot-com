import NavButton from "@/shared/components/NavButton.tsx"

const NAVIGATION_ITEMS = [
  {path: "/", display: "Home"},
  {path: "/i2Group", display: "i2 Group"},
  {path: "/velmaMode", display: "Velma Mode"},
  {path: "/goAuth", display: "Go Auth"},
  {path: "/awsCerts", display: "AWS Certs"},
  {path: "/sherlihyDotCom", display: "SHerlihy Dot Com"},
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
