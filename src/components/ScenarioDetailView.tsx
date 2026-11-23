import React from 'react';
import { Scenario } from '../types/zhixian';
import {
  SketchArrowLeft,
  SketchArrowRight,
  SketchCategoryDoodle,
} from './SketchIcons';
import {
  SketchNumberBadge,
  SketchPillButton,
  SketchSpeechBubble,
  SketchWaveDivider,
} from './SketchPrimitives';

interface ScenarioDetailViewProps {
  scenario: Scenario;
  onBack: () => void;
  onStartPractice: () => void;
}

export const ScenarioDetailView: React.FC<ScenarioDetailViewProps> = ({
  scenario,
  onBack,
  onStartPractice,
}) => {
  return (
    <div className="px-6 pt-4 pb-8">
      <button
        type="button"
        onClick={onBack}
        className="min-h-[44px] inline-flex items-center gap-1.5 text-[14px] text-[#615C54] hover:text-[#292622] mb-3 cursor-pointer"
      >
        <SketchArrowLeft className="w-4 h-4" />
        <span>返回情景列表</span>
      </button>

      <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-[#615C54] mb-2">
        <SketchCategoryDoodle category={scenario.category} className="w-4 h-4" />
        <span>{scenario.code}</span>
        <span aria-hidden="true">·</span>
        <span>{scenario.category}</span>
        <span aria-hidden="true">·</span>
        <span>对方：{scenario.role}</span>
        <span aria-hidden="true">·</span>
        <span>{scenario.estimatedTime}</span>
      </div>

      <h1 className="font-hand text-[31px] leading-snug text-[#292622] mb-5">
        {scenario.title}
      </h1>

      <SketchWaveDivider seed={1} className="mb-5" />

      <div className="space-y-6">
        <div>
          <h2 className="text-[12.5px] font-semibold text-[#615C54] mb-1.5">
            遇到什么情况
          </h2>
          <p className="text-[15px] leading-[1.75] text-[#292622]">
            {scenario.background}
          </p>
        </div>

        <div>
          <h2 className="text-[12.5px] font-semibold text-[#615C54] mb-2.5">
            这次练习目标
          </h2>
          <ul className="space-y-2.5">
            {scenario.goals.map((goal, idx) => (
              <li
                key={goal}
                className="flex items-center gap-2.5 text-[15px] leading-[1.5] text-[#292622]"
              >
                <SketchNumberBadge num={`0${idx + 1}`} />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-1 pb-2">
          <div className="text-[12px] text-[#615C54] mb-2 ml-1">
            第 1 轮 · {scenario.role}先开口
          </div>
          <SketchSpeechBubble side="left">
            <p className="font-hand text-[22px] text-[#292622] leading-[1.45]">
              「{scenario.rounds[0].counterpartLine}」
            </p>
          </SketchSpeechBubble>
        </div>
      </div>

      <div className="mt-8">
        <SketchPillButton
          type="button"
          onClick={onStartPractice}
          className="w-full"
        >
          <span>开始练习</span>
          <SketchArrowRight className="w-4 h-4" />
        </SketchPillButton>
        <p className="text-center text-[12.5px] text-[#615C54] mt-3.5">
          共 {scenario.rounds.length} 轮，练到任意一轮后都可以返回。
        </p>
      </div>
    </div>
  );
};
