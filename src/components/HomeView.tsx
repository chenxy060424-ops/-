import React from 'react';
import { CatReadingNotebook, SketchArrowDownLeft } from './CatIllustrations';
import {
  SketchArrowRight,
  SketchBookDoodle,
  SketchCategoryDoodle,
  SketchCloudDoodle,
} from './SketchIcons';
import {
  SageBrushMark,
  SageWatercolorWash,
  SketchPaperBox,
  SketchPillButton,
} from './SketchPrimitives';

interface HomeViewProps {
  onStartPracticeList: () => void;
  onOpenDepositScenario: () => void;
  onOpenScience: () => void;
  onOpenTreehole: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartPracticeList,
  onOpenDepositScenario,
  onOpenScience,
  onOpenTreehole,
}) => {
  return (
    <div className="px-6 pt-4 pb-6 flex flex-col">
      {/* Top Bar: Handwritten wordmark + subtle hand-stamped seal */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-hand text-[31px] leading-none text-[#292622] tracking-wide">
          知险
        </span>

        <span className="relative inline-flex items-center justify-center px-2.5 py-1 text-[11px] font-hand text-[#292622]/75 -rotate-3 select-none">
          <svg
            viewBox="0 0 64 26"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
          >
            <path
              d="M6 12 C5 5, 16 2.5, 32 3 C49 3.5, 59 6, 58.5 13 C58 20, 48 23, 31 23 C14 23, 7 19, 6 12 Z"
              fill="#C6D0BC"
              fillOpacity="0.45"
              stroke="#292622"
              strokeOpacity="0.45"
              strokeWidth="1.15"
              strokeDasharray="3 2.5"
            />
          </svg>
          <span className="relative">口袋陪练</span>
        </span>
      </div>

      {/* Hero Illustration Stage with soft watercolor wash */}
      <div className="relative flex items-start justify-between mb-2">
        <div className="relative">
          <SageWatercolorWash className="absolute -left-3 -top-2 w-[142px] h-[88px]" />
          <CatReadingNotebook className="relative w-[112px] h-[78px] -ml-1" />
        </div>

        <div className="flex items-center gap-1 pt-3 pr-2 text-[#292622]/70">
          <SketchArrowDownLeft className="w-7 h-5 mt-2" />
          <span className="font-hand text-[16px] leading-tight -rotate-6">
            先练一句
          </span>
        </div>
      </div>

      {/* Headline with sage brush */}
      <h1 className="font-hand text-[33px] leading-[1.22] text-[#292622] mb-2 [text-wrap:balance]">
        有些话，
        <span className="relative inline-block px-1">
          <SageBrushMark className="absolute left-0 right-0 bottom-0.5 h-4 w-full" />
          <span className="relative">可以先练一遍。</span>
        </span>
      </h1>

      <p className="text-[14px] leading-[1.7] text-[#292622]/80 mb-5">
        租房、实习、找兼职，遇到不知道怎么开口的事，就先在这里试一句。
      </p>

      {/* Primary CTA */}
      <SketchPillButton
        type="button"
        onClick={onStartPracticeList}
        className="w-full"
      >
        <span>开始情景陪练</span>
        <SketchArrowRight className="w-4 h-4" />
      </SketchPillButton>

      {/* Recommended Scenario: Paperclipped Index Slip with dot-grid paper */}
      <div className="mt-7">
        <div className="flex items-center justify-between text-[12px] text-[#615C54] mb-2.5 px-1">
          <span>试试这个情景</span>
          <span className="font-hand text-[14px] text-[#292622]/65">
            点击拆开练习 ↘
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenDepositScenario}
          className="w-full text-left cursor-pointer group block focus-visible:outline-2 focus-visible:outline-[#292622]"
        >
          <SketchPaperBox
            variant="offset"
            tilt="left"
            showClip
            fillClass="bg-[#FAF8F3]/95 notebook-dots"
            className="transition-transform group-hover:rotate-0 group-active:scale-[0.99]"
          >
            <div className="p-4.5 pt-4">
              <div className="flex items-center justify-between gap-2 mb-1.5 text-[12px] text-[#615C54] pr-5">
                <span className="inline-flex items-center gap-1.5">
                  <SketchCategoryDoodle category="租房" className="w-4 h-4" />
                  <span>租房 · 预计 3 分钟</span>
                </span>
              </div>
              <h2 className="font-hand text-[23px] leading-snug text-[#292622] mb-1">
                退租后，押金一直没退
              </h2>
              <p className="text-[13.5px] leading-[1.6] text-[#292622]/80">
                对方说，公司还在走流程。你会怎么回？
              </p>
            </div>
          </SketchPaperBox>
        </button>
      </div>

      {/* Creative Side-by-Side Pocket Bookmark Cards */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onOpenScience}
          className="text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#292622]"
        >
          <SketchPaperBox
            variant="note"
            tilt="left"
            fillClass="bg-[#FAF8F3]/85"
            className="h-full transition-transform group-hover:rotate-0 group-active:scale-[0.98]"
          >
            <div className="p-3.5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-2">
                <SketchBookDoodle className="w-5 h-5" />
                <SketchArrowRight className="w-3.5 h-3.5 text-[#292622]/55 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div>
                <div className="font-hand text-[20px] leading-tight text-[#292622] mb-1">
                  权益科普
                </div>
                <p className="text-[12px] leading-[1.5] text-[#615C54]">
                  先看清楚要确认什么。
                </p>
              </div>
            </div>
          </SketchPaperBox>
        </button>

        <button
          type="button"
          onClick={onOpenTreehole}
          className="text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#292622]"
        >
          <SketchPaperBox
            variant="dashed"
            tilt="right"
            fillClass="bg-[#FAF8F3]/65"
            className="h-full transition-transform group-hover:rotate-0 group-active:scale-[0.98]"
          >
            <div className="p-3.5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-2">
                <SketchCloudDoodle className="w-5 h-5" />
                <SketchArrowRight className="w-3.5 h-3.5 text-[#292622]/55 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div>
                <div className="font-hand text-[20px] leading-tight text-[#292622] mb-1">
                  宽慰树洞
                </div>
                <p className="text-[12px] leading-[1.5] text-[#615C54]">
                  心里乱时先坐一会儿。
                </p>
              </div>
            </div>
          </SketchPaperBox>
        </button>
      </div>
    </div>
  );
};
