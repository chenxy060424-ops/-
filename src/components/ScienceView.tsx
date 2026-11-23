import React from 'react';
import { ARTICLES } from '../data/zhixianData';
import { SketchArrowRight, SketchCategoryDoodle } from './SketchIcons';
import { SketchNumberBadge, SketchWaveDivider } from './SketchPrimitives';

interface ScienceViewProps {
  onSelectArticle: (articleId: string) => void;
}

export const ScienceView: React.FC<ScienceViewProps> = ({ onSelectArticle }) => {
  return (
    <div className="px-6 pt-6 pb-8">
      <div className="mb-5">
        <h1 className="font-hand text-[32px] leading-snug text-[#292622] mb-1.5">
          遇到问题，先弄清这几件事。
        </h1>
        <p className="text-[13.5px] leading-relaxed text-[#615C54]">
          两三分钟读完一篇短文，先看要核对什么，再练一句怎么开口。
        </p>
      </div>

      <div>
        <SketchWaveDivider seed={0} />
        {ARTICLES.map((article, idx) => (
          <div key={article.id}>
            <button
              type="button"
              onClick={() => onSelectArticle(article.id)}
              className="w-full text-left py-4.5 hover:bg-[#FAF8F3]/40 active:opacity-80 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <SketchNumberBadge num={`0${idx + 1}`} className="mt-0.5" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 text-[12px] text-[#615C54]">
                      <SketchCategoryDoodle
                        category={article.category}
                        className="w-4 h-4"
                      />
                      <span className="text-[#292622] font-medium">
                        {article.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <SketchArrowRight className="w-4 h-4 text-[#292622]/60 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>

                  <h2 className="font-hand text-[23px] leading-snug text-[#292622] mb-1.5">
                    {article.title}
                  </h2>

                  <p className="text-[13.5px] leading-[1.6] text-[#615C54] line-clamp-2">
                    {article.whenYouMeet}
                  </p>
                </div>
              </div>
            </button>
            <SketchWaveDivider seed={idx + 1} />
          </div>
        ))}
      </div>
    </div>
  );
};
