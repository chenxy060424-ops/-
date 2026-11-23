import React, { useState } from 'react';
import { SCENARIOS } from '../data/zhixianData';
import { ScenarioCategory } from '../types/zhixian';
import { SketchArrowRight, SketchCategoryDoodle } from './SketchIcons';
import {
  SageBrushMark,
  SketchNumberBadge,
  SketchWaveDivider,
} from './SketchPrimitives';

interface PracticeListViewProps {
  onSelectScenario: (scenarioId: string) => void;
}

const CATEGORIES: ('全部' | ScenarioCategory)[] = ['全部', '租房', '实习', '兼职'];

export const PracticeListView: React.FC<PracticeListViewProps> = ({
  onSelectScenario,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    '全部' | ScenarioCategory
  >('全部');

  const filteredScenarios =
    selectedCategory === '全部'
      ? SCENARIOS
      : SCENARIOS.filter((s) => s.category === selectedCategory);

  return (
    <div className="px-6 pt-6 pb-8">
      <div className="mb-5">
        <h1 className="font-hand text-[32px] leading-snug text-[#292622] mb-1.5">
          今天想练哪一种？
        </h1>
        <p className="text-[13.5px] leading-relaxed text-[#615C54]">
          每个情景约三轮对话，先看清目标，再试着开口回应。
        </p>
      </div>

      {/* Hand-Circled Category Filter Tabs */}
      <div
        className="flex items-center gap-3 mb-6 overflow-x-auto pb-1"
        role="tablist"
        aria-label="按场景类型筛选"
      >
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(category)}
              className={`relative min-h-[40px] px-4 py-1.5 text-[14px] whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                active
                  ? 'text-[#292622] font-semibold'
                  : 'text-[#615C54] hover:text-[#292622]'
              }`}
            >
              {active && (
                <>
                  <SageBrushMark className="absolute inset-x-1 bottom-1.5 h-3.5 w-[calc(100%-8px)]" />
                  <svg
                    viewBox="0 0 84 40"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    <path
                      d="M12 6 C30 2.5, 62 3, 74 9 C81 14, 80 28, 70 33 C52 38, 22 37, 9 31 C3 26, 4 11, 12 6 Z"
                      stroke="#292622"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </>
              )}
              <span className="relative z-[1]">{category}</span>
            </button>
          );
        })}
      </div>

      {/* Wavy-Separated Minimalist List */}
      <div>
        <SketchWaveDivider seed={0} />
        {filteredScenarios.map((scenario, idx) => (
          <div key={scenario.id}>
            <button
              type="button"
              onClick={() => onSelectScenario(scenario.id)}
              className="w-full text-left py-4.5 hover:bg-[#FAF8F3]/40 active:opacity-80 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <SketchNumberBadge num={`0${idx + 1}`} className="mt-0.5" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 text-[12px] text-[#615C54]">
                      <SketchCategoryDoodle
                        category={scenario.category}
                        className="w-4 h-4"
                      />
                      <span className="font-medium text-[#292622]">
                        {scenario.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{scenario.estimatedTime}</span>
                    </div>
                    <SketchArrowRight className="w-4 h-4 text-[#292622]/60 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>

                  <h2 className="font-hand text-[23px] leading-snug text-[#292622] mb-1.5">
                    {scenario.title}
                  </h2>

                  <p className="text-[13.5px] leading-[1.6] text-[#615C54]">
                    练习目标：{scenario.goals.join('、')}
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
