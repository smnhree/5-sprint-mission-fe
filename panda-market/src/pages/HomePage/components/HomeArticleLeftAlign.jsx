function HomeArticleLeftAlign({ image, badge, children }) {
  return (
    <article className="flex justify-center py-[138px]">
      <div className="flex justify-center items-center gap-[64px] w-[988px] bg-[#FCFCFC]">
        <img src={image} alt={badge} className="w-[588px] h-[444px]" />
        <div className="flex flex-col items-start gap-[12px]">
          <span className="left-0 text-primary-100 font-[700]">{badge}</span>
          <div className="flex flex-col items-start gap-[24px]">{children}</div>
        </div>
      </div>
    </article>
  );
}

export default HomeArticleLeftAlign;
