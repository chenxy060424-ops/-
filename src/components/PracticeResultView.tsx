import React, { useEffect, useRef, useState } from 'react';
import {
  SketchBookmark,
  SketchCheck,
  SketchCopy,
  SketchRetry,
} from './SketchIcons';
import {
  SageBrushMark,
  SketchPaperBox,
  SketchPawStamp,
  SketchPillButton,
  SketchWaveDivider,
} from './SketchPrimitives';
import { getPracticeSummary } from '../services/feedbackService';
import {
  formatChineseDate,
  savePracticeRecord,
  saveScript,
} from '../services/storageService';
import { RoundSubmission, Scenario } from '../types/zhixian';

interface PracticeResultViewProps {
  scenario: Scenario;
  submissions: RoundSubmission[];
  onRetry: () => void;
  onGoToProfile: () => void;
  onBackToList: () => void;
}

export const PracticeResultView: React.FC<PracticeResultViewProps> = ({
  scenario,
  submissions,
  onRetry,
  onGoToProfile,
  onBackToList,
}) => {
  const [loading, setLoading] = useState(true);
  const [goodTakeaway, setGoodTakeaway] = useState(scenario.defaultGoodTakeaway);
  const [improveTakeaway, setImproveTakeaway] = useState(
    scenario.defaultImproveTakeaway
  );
  const [editableScript, setEditableScript] = useState(scenario.resultTemplate);
  const [feedbackSource, setFeedbackSource] = useState<'ai' | 'local'>('local');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const savedRecordOnceRef = useRef(false);

  useEffect(() => {
    let active = true;

    async function loadSummary() {
      setLoading(true);
      const summary = await getPracticeSummary(scenario, submissions);
      if (!active) return;

      setGoodTakeaway(summary.goodTakeaway);
      setImproveTakeaway(summary.improveTakeaway);
      setEditableScript(summary.suggestedScript);
      setFeedbackSource(summary.source);
      setLoading(false);

      if (!savedRecordOnceRef.current && submissions.length > 0) {
        savedRecordOnceRef.current = true;
        savePracticeRecord({
          id: `rec-${scenario.id}-${Date.now()}`,
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
          category: scenario.category,
          completedRounds: submissions.length,
          totalRounds: scenario.rounds.length,
          completedAt: formatChineseDate(new Date()),
          goodTakeaway: summary.goodTakeaway,
          improveTakeaway: summary.improveTakeaway,
          userReplies: submissions.map((s) => ({
            roundNumber: s.roundNumber,
            reply: s.userReply,
          })),
        });
      }
    }

    loadSummary();
    return () => {
      active = false;
    };
  }, [scenario, submissions]);

  const handleCopy = async () => {
    const text = editableScript.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const helper = document.createElement('textarea');
      helper.value = text;
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      document.body.removeChild(helper);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveScript = () => {
    const text = editableScript.trim();
    if (!text) return;
    saveScript({
      id: `scr-${scenario.id}-${Date.now()}`,
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      content: text,
      savedAt: formatChineseDate(new Date()),
    });
    setSaved(true);
  };

  return (
    <div className="px-6 pt-6 pb-10">
      <div className="flex items-center justify-between gap-2 text-[12px] text-[#615C54] mb-1.5">
        <span className="truncate">
          {scenario.title} · 完成 {submissions.length} / {scenario.rounds.length} 轮
        </span>
        <span className="shrink-0">
          {feedbackSource === 'local' ? '练习提示' : '陪练总结'}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <h1 className="font-hand text-[31px] leading-snug text-[#292622]">
          这一次，你练会了什么？
        </h1>
        <SketchPawStamp className="w-6 h-6 shrink-0 rotate-12" />
      </div>

      {loading ? (
        <div className="py-6 text-[14px] text-[#615C54]">
          正在整理你刚才写下的回应…
        </div>
      ) : (
        <div className="space-y-6">
          <SketchWaveDivider seed={0} />

          <div className="space-y-4">
            <div>
              <span className="relative inline-block px-1 text-[12.5px] font-semibold text-[#292622] mb-1.5">
                <SageBrushMark className="absolute inset-0 w-full h-full" />
                <span className="relative">做得好的地方</span>
              </span>
              <p className="text-[14.5px] leading-[1.7] text-[#292622]">
                {goodTakeaway}
              </p>
            </div>

            <SketchPaperBox variant="dashed" tilt="left">
              <div className="p-4">
                <div className="text-[12px] font-semibold text-[#615C54] mb-1">
                  下次可以改进的地方
                </div>
                <p className="text-[14.5px] leading-[1.7] text-[#292622]">
                  {improveTakeaway}
                </p>
              </div>
            </SketchPaperBox>
          </div>

          <SketchPaperBox variant="offset" tilt="right" showTape>
            <div className="p-4 pt-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <label
                  htmlFor="result-script-editor"
                  className="text-[12.5px] font-semibold text-[#292622]"
                >
                  可直接发给对方的沟通话术
                </label>
                <button
                  type="button"
                  onClick={() => setEditableScript(scenario.resultTemplate)}
                  className="text-[12px] text-[#615C54] hover:text-[#292622] underline cursor-pointer"
                >
                  恢复模板
                </button>
              </div>

              <textarea
                id="result-script-editor"
                value={editableScript}
                onChange={(e) => {
                  setEditableScript(e.target.value);
                  setSaved(false);
                }}
                rows={5}
                className="w-full rounded-[14px_10px_16px_12px] bg-[#F3F0E7]/85 stationery-lines border border-[#292622]/25 px-3 py-2 text-[14px] text-[#292622] focus:outline-none focus:border-[#292622]"
              />

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <SketchPillButton
                  type="button"
                  onClick={handleCopy}
                  className="w-full min-h-[44px] px-3 py-2"
                >
                  {copied ? (
                    <>
                      <SketchCheck className="w-4 h-4" />
                      <span className="text-[13.5px]">已复制</span>
                    </>
                  ) : (
                    <>
                      <SketchCopy className="w-4 h-4" />
                      <span className="text-[13.5px]">复制话术</span>
                    </>
                  )}
                </SketchPillButton>

                <button
                  type="button"
                  onClick={handleSaveScript}
                  className={`min-h-[44px] px-3 py-2 rounded-[20px_14px_22px_16px] border-[1.3px] text-[13.5px] font-medium inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    saved
                      ? 'bg-[#C6D0BC]/65 border-[#292622] text-[#292622]'
                      : 'bg-[#F3F0E7] hover:bg-[#EAE5D8] border-[#292622]/60 text-[#292622]'
                  }`}
                >
                  {saved ? (
                    <>
                      <SketchCheck className="w-4 h-4" />
                      <span>已收藏</span>
                    </>
                  ) : (
                    <>
                      <SketchBookmark className="w-4 h-4" />
                      <span>收藏话术</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onRetry}
                  className="col-span-2 min-h-[42px] px-4 py-2 rounded-[16px_22px_14px_20px] bg-transparent hover:bg-[#FAF8F3] border border-dashed border-[#292622]/45 text-[13.5px] font-medium text-[#292622] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <SketchRetry className="w-3.5 h-3.5" />
                  <span>再练一次</span>
                </button>
              </div>
            </div>
          </SketchPaperBox>

          <div className="flex items-center justify-between gap-2 pt-1 text-[13px] text-[#615C54]">
            <button
              type="button"
              onClick={onGoToProfile}
              className="min-h-[40px] text-[#292622] underline underline-offset-4 cursor-pointer"
            >
              去「我的」查看记录
            </button>
            <button
              type="button"
              onClick={onBackToList}
              className="min-h-[40px] hover:text-[#292622] cursor-pointer"
            >
              换个情景
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
