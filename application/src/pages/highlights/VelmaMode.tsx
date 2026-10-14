import css from "./VelmaMode.module.css"

import HighlightLayout from "@/shared/layouts/HighlightLayout"

function VelmaMode() {
  return <HighlightLayout
  image={<Image/>}
  content={<Content/>}
  />
}

function Image () {
    return (
        <span className="grid grid-cols-1 grid-rows-1">
            <img
                src="/velmaMode/velmaGlasses.png"
                className={`z-3 col-span-full row-span-full ${css.glasses_on}`}
            />
            <img
                src="/velmaMode/velmaNoGlasses.png"
                className={`z-2 col-span-full row-span-full ${css.mask} ${css.mask_up}`}
            />
            <img
                src="/velmaMode/velmaNoGlasses.png"
                className={`z-1 col-span-full row-span-full ${css.blur_in}`}
            />
        </span>
    )
}

function Content () {
    return (
        <>
            <p>
                The core idea of this project was to provide users with the control to change the size of text and at the same time respect the existing layout of the applications the wrapping component is used in.
            </p>
            &nbsp;
            <p>
                The application uses a custom hook and the react context API to provide and update the user specified magnification for only the components wrapped in the 'Velma Mode' component.
            </p>
            &nbsp;
            <p>
                As the project has grown it's become more important to clearly explore and document the desired user experience which has led to creating design decision documents inside the project.
            </p>
        </>
    )
}

export default VelmaMode
