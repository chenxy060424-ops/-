import React, { useState } from 'react';
import { SCENARIOS } from '../data/zhixianData';
import { ScienceArticle } from '../types/zhixian';
import {
  SketchArrowLeft,
  SketchArrowRight,
  SketchCategoryDoodle,
  SketchCheck,
  SketchCopy,
} from './SketchIcons';
import {
  SageBrushMark,
  SketchNumberBadge,
  SketchPaperBox,
  SketchPillButton,
  SketchWaveDivider,
} from './SketchPrimitives';

interface ArticleDetailViewProps {
  article: ScienceArticle;
  onBack: () => void;
  onGoToScenario: (scenarioId: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onBack,
  onGoToScenario,
}) => {
  const [copied, setCopied] = useState(false);
  const linkedScenario = SCENARIOS.find((s) => s.id === article.linkedScenarioId);

  const handleCopyPhrase = async () => {
    try {
      await navigator.clipboard.writeText(article.howToAsk);
    } catch {
      // Ignored safely
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="px-6 pt-4 pb-10">
      <button
        type="button"
        onClick={onBack}
        className="min-h-[44px] inline-flex items-center gap-1.5 text-[14px] text-[#615C54] hover:text-[#292622] mb-3 cursor-pointer"
      >
        <SketchArrowLeft className="w-4 h-4" />
        <span>返回权益科普</span>
      </button>

      <div className="flex items-center gap-2 text-[12.5px] text-[#615C54] mb-2">
        <SketchCategoryDoodle category={article.category} className="w-4 h-4" />
        <span>{article.code}</span>
        <span aria-hidden="true">·</span>
        <span>{article.category}</span>
        <span aria-hidden="true">·</span>
        <span>{article.readTime}</span>
      </div>

      <h1 className="font-hand text-[31px] leading-snug text-[#292622] mb-5">
        {article.title}
      </h1>

      <SketchWaveDivider seed={0} className="mb-5" />

      <div className="space-y-6">
        <section>
          <h2 className="text-[12.5px] font-semibold text-[#615C54] mb-1.5">
            什么时候会遇到
          </h2>
          <p className="text-[15px] leading-[1.75] text-[#292622]">
            {article.whenYouMeet}
          </p>
        </section>

        <section>
          <h2 className="text-[12.5px] font-semibold text-[#615C54] mb-2.5">
            先核对什么
          </h2>
          <ul className="space-y-3">
            {article.checkFirst.map((point, index) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-[15px] leading-[1.7] text-[#292622]"
              >
                <SketchNumberBadge num={`0${index + 1}`} className="mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <SketchPaperBox variant="offset" tilt="left" showTape>
          <section className="p-4 pt-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="relative inline-block px-1 text-[12.5px] font-semibold text-[#292622]">
                <SageBrushMark className="absolute inset-0 w-full h-full" />
                <span className="relative">{article.howToAskLabel}</span>
              </span>
              <button
                type="button"
                onClick={handleCopyPhrase}
                className="min-h-[34px] px-2.5 py-1 rounded-full text-[12px] text-[#292622] hover:bg-[#C6D0BC]/45 inline-flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <SketchCheck className="w-3.5 h-3.5" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <SketchCopy className="w-3.5 h-3.5" />
                    <span>复制这句</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[15px] leading-[1.7] text-[#292622] font-medium">
              「{article.howToAsk}」
            </p>
          </section>
        </SketchPaperBox>
      </div>

      {linkedScenario && (
        <div className="mt-8">
          <SketchWaveDivider seed={2} className="mb-4" />
          <div className="text-[12px] text-[#615C54] mb-2.5">
            看完清单，试着开口练一遍
          </div>
          <SketchPillButton
            type="button"
            onClick={() => onGoToScenario(linkedScenario.id)}
            className="w-full"
          >
            <span className="truncate text-[14px]">
              去练：{linkedScenario.title}
            </span>
            <SketchArrowRight className="w-4 h-4 shrink-0" />
          </SketchPillButton>
        </div>
      )}
    </div>
  );
};
