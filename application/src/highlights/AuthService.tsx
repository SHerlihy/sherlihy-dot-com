import highlightCss from "./Highlight.module.css"
import authHighlightCss from "./AuthHighlight.module.css"
import HighlightFeatureMobile from "./layouts/HighlightFeatureMobile"

const AuthServiceHighlight=()=>{
    return (
        <>
            <HighlightFeatureMobile>
            <div className={`${highlightCss.container_standout}`}>
            <div className={`${highlightCss.container_image}`}>
                <img src="/authService/robo3.png" className={`${highlightCss.img} ${authHighlightCss.queue_up3}`}/>
                <img src="/authService/robo2.png" className={`${highlightCss.img} ${authHighlightCss.queue_up2}`}/>
                <img src="/authService/robo1.png" className={`${highlightCss.img} ${authHighlightCss.queue_up1}`}/>
                <img src="/authService/boop3.png" className={`${highlightCss.img} ${authHighlightCss.talk3}`}/>
                <img src="/authService/boop2.png" className={`${highlightCss.img} ${authHighlightCss.talk2}`}/>
                <img src="/authService/notAToaster.png" className={`${highlightCss.img} ${authHighlightCss.talk1}`}/>
                <img src="/authService/queueBarrier.png" className={`${highlightCss.img}`}/>
            </div>
            </div>
            </HighlightFeatureMobile>
            <div className={`${highlightCss.container_content}`}>
            <p>
                Using Go v1.22 and only the standard http package, I created a backend REST service to handle authentication requests.
            </p>
                &nbsp;
            <p>
                    I had previous experience creating Go backend services using the GoFiber framework, however, on discovering the standard http package was updated I wanted to experience and use the updated package.
            </p>
                &nbsp;
                <p>
                    Further to the backend service, I also created a MySQL database to store the authenication data.
                </p>
            </div>
        </>

    )
}

export default AuthServiceHighlight
