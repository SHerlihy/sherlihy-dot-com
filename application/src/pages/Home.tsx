import HighlightDesktopImage from "@/shared/layouts/highlight/HighlightDesktopImage";
import useIsDesktop from "@/shared/hooks/useIsDesktop";
import SherlihyImage from "@/shared/images/sherlihy/SherlihyImage";

import ChatControl from "@/features/query/ChatControl"

function Home() {
  return (
    <article className="h-full p-4 flex flex-col justify-between">
      <ChatControl intro={<Intro/>}/>
    </article>
  );
}

const introText =
  "\
    Welcome to my website!\
    \n \
    \n \
    Here you’ll find events, projects and hobbies that I enjoy so you can get to know me better.\
    \n \
    I spend the majority of my time helping Amazon improve their Alexa AI model but I also find time to practice my web development skills.\
    \n \
";

const Intro = () => {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <div className="flex justify-center">
        <p className="inline-block">
          <HighlightDesktopImage>
            <SherlihyImage />
          </HighlightDesktopImage>
          {introText}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <SherlihyImage />
      </div>
      <p className="pt-4 inline-block">{introText}</p>
    </>
  );
};

export default Home;
