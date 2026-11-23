import React, { useEffect, useRef, useState } from 'react';
import { CatHighlighting } from './CatIllustrations';
import {
  SketchArrowLeft,
  SketchChevronDown,
  SketchChevronUp,
  SketchPaperPlane,
  SketchPencil,
} from './SketchIcons';
import {
  SageBrushMark,
  SketchPaperBox,
  SketchPawStamp,
  SketchPillButton,
  SketchProgressBeads,
  SketchSpeechBubble,
  SketchWaveDivider,
} from './SketchPrimitives';
import { getRoundFeedback } from '../services/feedbackService';
import { RoundSubmission, Scenario } from '../types/zhixian';

interface PracticeSessionViewProps {
  scenario: Scenario;
  onExit: (submissions: RoundSubmission[]) => void;
  onFinish: (submissions: RoundSubmission[]) => void;
}

export const PracticeSessionView: React.FC<PracticeSessionViewProps> = ({
  scenario,
  onExit,
  onFinish,
}) => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [submissions, setSubmissions] = useState<RoundSubmission[]>([]);
  const [draftReply, setDraftReply] = useState('');
  const [showSample, setShowSample] = useState(false);
  const [sampleDraft, setSampleDraft] = useState(
    scenario.rounds[0]?.sampleReply ?? ''
  );
  const [isEditingCurrent, setIsEditingCurrent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentRound = scenario.rounds[roundIndex];
  const totalRounds = scenario.rounds.length;
  const currentSubmission = submissions.find(
    (s) => s.roundNumber === currentRound.roundNumber
  );

  useEffect(() => {
    setSampleDraft(currentRound.sampleReply);
    setShowSample(false);
    const existing = submissions.find(
      (s) => s.roundNumber === currentRound.roundNumber
    );
    if (existing) {
      setDraftReply(existing.userReply);
      setIsEditingCurrent(false);
    } else {
      setDraftReply('');
      setIsEditingCurrent(true);
    }
  }, [roundIndex, currentRound.roundNumber, currentRound.sampleReply]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [submissions, isEditingCurrent, showSample]);

  const handleSubmitText = async (textToSubmit: string) => {
    const trimmed = textToSubmit.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    const feedback = await getRoundFeedback(scenario, currentRound, trimmed);
    const nextSubmission: RoundSubmission = {
      roundNumber: currentRound.roundNumber,
      counterpartLine: currentRound.counterpartLine,
      userReply: trimmed,
      feedback,
    };

    setSubmissions((prev) => {
      const others = prev.filter(
        (item) => item.roundNumber !== currentRound.roundNumber
      );
      return [...others, nextSubmission].sort(
        (a, b) => a.roundNumber - b.roundNumber
      );
    });
    setDraftReply(trimmed);
    setShowSample(false);
    setIsEditingCurrent(false);
    setIsSubmitting(false);
  };

  const handleNextRound = () => {
    if (roundIndex + 1 < totalRounds) {
      setRoundIndex((prev) => prev + 1);
    } else {
      onFinish(submissions);
    }
  };

  const handleEditAgain = () => {
    if (currentSubmission) {
      setDraftReply(currentSubmission.userReply);
    }
    setIsEditingCurrent(true);
    window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 60);
  };

  const handleUseSampleIntoEditor = () => {
    setDraftReply(sampleDraft);
    setShowSample(false);
    setIsEditingCurrent(true);
    window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 60);
  };

  const previousSubmissions = submissions.filter(
    (s) => s.roundNumber < currentRound.roundNumber
  );

  return (
    <div className="h-full flex flex-col paper-grain">
      <header className="shrink-0 px-4 py-2 border-b border-[#292622]/15 bg-[#F3F0E7]/90 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onExit(submissions)}
          className="min-h-[42px] px-2 -ml-2 inline-flex items-center gap-1 text-[13.5px] text-[#615C54] hover:text-[#292622] shrink-0 cursor-pointer"
        >
          <SketchArrowLeft className="w-4 h-4" />
          <span>返回</span>
        </button>

        <div className="min-w-0 text-center">
          <div className="text-[13px] font-medium text-[#292622] truncate">
            {scenario.title}
          </div>
        </div>

        <div className="text-[12.5px] font-medium text-[#615C54] tabular-nums whitespace-nowrap shrink-0">
          第 {currentRound.roundNumber} / {totalRounds} 轮
        </div>
      </header>

      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto notebook-dots px-5 py-4 space-y-5"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 space-y-1.5">
            <SketchProgressBeads
              current={currentRound.roundNumber}
              total={totalRounds}
            />
            <p className="text-[12.5px] leading-relaxed text-[#292622]/80">
              目标：{scenario.goals.join(' · ')}
            </p>
          </div>
          <CatHighlighting className="w-[80px] h-[52px] shrink-0" />
        </div>

        <SketchWaveDivider seed={0} />

        {previousSubmissions.map((item) => (
          <div
            key={item.roundNumber}
            className="space-y-1.5 opacity-65 pb-2 border-b border-dashed border-[#292622]/18"
          >
            <div className="text-[12px] text-[#615C54] tabular-nums">
              第 {item.roundNumber} 轮 · {scenario.role}：「{item.counterpartLine}」
            </div>
            <div className="text-[13.5px] text-[#292622] leading-relaxed">
              你回：{item.userReply}
            </div>
          </div>
        ))}

        <div className="pb-2">
          <div className="text-[12px] text-[#615C54] mb-1.5 ml-1">
            {scenario.role}说：
          </div>
          <SketchSpeechBubble side="left">
            <p className="font-hand text-[23px] leading-[1.42] text-[#292622]">
              「{currentRound.counterpartLine}」
            </p>
          </SketchSpeechBubble>
        </div>

        {currentSubmission && !isEditingCurrent && (
          <div className="space-y-5 pt-1">
            <div className="pb-2">
              <div className="text-[11.5px] text-[#615C54] mb-1.5 text-right mr-1">
                你试着回：
              </div>
              <SketchSpeechBubble side="right">
                <p className="text-[14.5px] leading-[1.65] text-[#292622]">
                  {currentSubmission.userReply}
                </p>
              </SketchSpeechBubble>
            </div>

            <SketchPaperBox variant="dashed" tilt="right">
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="relative inline-block px-1 text-[12.5px] font-semibold text-[#292622]">
                    <SageBrushMark className="absolute inset-0 w-full h-full" />
                    <span className="relative">
                      {currentSubmission.feedback.source === 'local'
                        ? '练习提示'
                        : '陪练反馈'}
                    </span>
                  </span>
                  <span className="text-[12px] text-[#615C54]">
                    {currentSubmission.feedback.isClearEnough
                      ? '这句已经很明确'
                      : '还可以补一句'}
                  </span>
                </div>

                <div>
                  <div className="text-[12px] font-semibold text-[#615C54] mb-1">
                    你说清楚了什么
                  </div>
                  <p className="text-[14px] leading-[1.65] text-[#292622]">
                    {currentSubmission.feedback.clearPoints}
                  </p>
                </div>

                <SketchWaveDivider seed={2} />

                <div>
                  <div className="text-[12px] font-semibold text-[#615C54] mb-1">
                    还可以补哪一句
                  </div>
                  <p className="text-[14px] leading-[1.65] text-[#292622]">
                    {currentSubmission.feedback.nextToAdd}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleEditAgain}
                    className="min-h-[44px] px-4 py-2 rounded-[18px_14px_20px_15px] bg-[#F3F0E7] hover:bg-[#EAE5D8] border-[1.3px] border-[#292622]/60 text-[13.5px] font-medium text-[#292622] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <SketchPencil className="w-3.5 h-3.5" />
                    <span>修改这句</span>
                  </button>

                  <SketchPillButton
                    type="button"
                    onClick={handleNextRound}
                    className="flex-1 min-h-[44px] py-2"
                  >
                    <span>
                      {roundIndex + 1 < totalRounds
                        ? '继续下一轮'
                        : '查看本次总结'}
                    </span>
                  </SketchPillButton>
                </div>

                {roundIndex + 1 < totalRounds && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => onFinish(submissions)}
                      className="min-h-[36px] px-2 text-[12.5px] text-[#615C54] hover:text-[#292622] underline underline-offset-4 cursor-pointer"
                    >
                      先练到这里，直接看结果
                    </button>
                  </div>
                )}
              </div>
            </SketchPaperBox>
          </div>
        )}
      </div>

      {isEditingCurrent && (
        <div className="shrink-0 border-t border-[#292622]/15 bg-[#F3F0E7] px-4 pt-3 pb-4 safe-bottom">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-[12.5px] font-medium text-[#292622]">
              自己写一句
            </span>

            <button
              type="button"
              onClick={() => setShowSample((prev) => !prev)}
              aria-expanded={showSample}
              className="min-h-[36px] px-3.5 py-1 rounded-[16px_12px_18px_13px] bg-[#FAF8F3] border-[1.3px] border-[#292622]/45 text-[12.5px] text-[#292622] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>看看怎么开口</span>
              {showSample ? (
                <SketchChevronDown className="w-3.5 h-3.5" />
              ) : (
                <SketchChevronUp className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {showSample && (
            <SketchPaperBox variant="note" tilt="left" className="mb-3">
              <div className="p-3">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11.5px] text-[#615C54]">
                    参考话术（可直接改写）
                  </span>
                  <button
                    type="button"
                    onClick={() => setSampleDraft(currentRound.sampleReply)}
                    className="text-[11.5px] text-[#615C54] hover:text-[#292622] underline cursor-pointer"
                  >
                    恢复原句
                  </button>
                </div>
                <textarea
                  value={sampleDraft}
                  onChange={(e) => setSampleDraft(e.target.value)}
                  rows={3}
                  aria-label="编辑参考话术"
                  className="w-full rounded-[14px_10px_16px_12px] bg-[#F3F0E7] border border-[#292622]/25 px-3 py-2 text-[13.5px] leading-relaxed text-[#292622] focus:outline-none focus:border-[#292622] resize-none"
                />
                <div className="mt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleUseSampleIntoEditor}
                    className="min-h-[36px] px-3 py-1 rounded-[14px_10px_16px_12px] border border-[#292622]/40 bg-[#F3F0E7] text-[12.5px] text-[#292622] cursor-pointer"
                  >
                    填入下方继续改
                  </button>
                  <button
                    type="button"
                    disabled={!sampleDraft.trim() || isSubmitting}
                    onClick={() => handleSubmitText(sampleDraft)}
                    className="min-h-[36px] px-4 py-1 rounded-[14px_18px_12px_16px] bg-[#C6D0BC] border-[1.3px] border-[#292622] disabled:opacity-45 text-[12.5px] font-semibold text-[#292622] cursor-pointer"
                  >
                    {isSubmitting ? '思考中…' : '用这句回应'}
                  </button>
                </div>
              </div>
            </SketchPaperBox>
          )}

          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={draftReply}
              onChange={(e) => setDraftReply(e.target.value)}
              onFocus={() => {
                window.setTimeout(() => {
                  textareaRef.current?.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth',
                  });
                }, 120);
              }}
              rows={2}
              placeholder={`试着写一句回应${scenario.role}…`}
              aria-label="输入你的回应"
              className="flex-1 rounded-[18px_14px_20px_15px] bg-[#FAF8F3] border-[1.4px] border-[#292622]/55 px-3.5 py-2.5 text-[14.5px] leading-relaxed text-[#292622] placeholder:text-[#615C54]/70 focus:outline-none focus:border-[#292622] resize-none"
            />
            <button
              type="button"
              disabled={!draftReply.trim() || isSubmitting}
              onClick={() => handleSubmitText(draftReply)}
              className="min-h-[46px] px-4 py-2 rounded-[20px_14px_18px_22px] bg-[#C6D0BC] hover:bg-[#B8C4AC] disabled:opacity-45 border-[1.4px] border-[#292622] text-[13.5px] font-semibold text-[#292622] inline-flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              <SketchPaperPlane className="w-4 h-4" />
              <span>{isSubmitting ? '发送中' : '发送'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
