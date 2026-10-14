import NavButton from "@/shared/components/NavButton.tsx"

const NAVIGATION_ITEMS = [
  {path: "/i2Group", display: "i2 Group"}
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
