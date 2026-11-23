import React, { useEffect, useState } from 'react';
import {
  SketchCategoryDoodle,
  SketchCheck,
  SketchCopy,
  SketchRetry,
  SketchTrash,
} from './SketchIcons';
import {
  SageBrushMark,
  SketchPaperBox,
  SketchPillButton,
  SketchWaveDivider,
} from './SketchPrimitives';
import {
  deletePracticeRecord,
  deleteTreeholeEntry,
  getPracticeRecords,
  getSavedScripts,
  getTreeholeEntries,
  removeSavedScript,
} from '../services/storageService';
import {
  PracticeRecord,
  SavedScript,
  TreeholeEntry,
} from '../types/zhixian';

export type ProfileSubTab = 'records' | 'scripts' | 'treehole';

interface ProfileViewProps {
  initialSubTab?: ProfileSubTab;
  onGoToPracticeList: () => void;
  onRetryScenario: (scenarioId: string) => void;
  onGoToTreehole: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  initialSubTab = 'records',
  onGoToPracticeList,
  onRetryScenario,
  onGoToTreehole,
}) => {
  const [subTab, setSubTab] = useState<ProfileSubTab>(initialSubTab);
  const [records, setRecords] = useState<PracticeRecord[]>([]);
  const [scripts, setScripts] = useState<SavedScript[]>([]);
  const [treeholes, setTreeholes] = useState<TreeholeEntry[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setSubTab(initialSubTab);
  }, [initialSubTab]);

  useEffect(() => {
    setRecords(getPracticeRecords());
    setScripts(getSavedScripts());
    setTreeholes(getTreeholeEntries());
  }, []);

  const handleCopyScript = async (script: SavedScript) => {
    try {
      await navigator.clipboard.writeText(script.content);
    } catch {
      const helper = document.createElement('textarea');
      helper.value = script.content;
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      document.body.removeChild(helper);
    }
    setCopiedId(script.id);
    window.setTimeout(() => setCopiedId(null), 1800);
  };

  const handleRemoveScript = (id: string) => {
    setScripts(removeSavedScript(id));
  };

  const handleDeleteTreehole = (id: string) => {
    setTreeholes(deleteTreeholeEntry(id));
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(deletePracticeRecord(id));
  };

  const tabs: { id: ProfileSubTab; label: string; count: number }[] = [
    { id: 'records', label: '练习记录', count: records.length },
    { id: 'scripts', label: '收藏话术', count: scripts.length },
    { id: 'treehole', label: '我的树洞', count: treeholes.length },
  ];

  return (
    <div className="px-6 pt-6 pb-8">
      <div className="mb-5">
        <h1 className="font-hand text-[32px] leading-snug text-[#292622] mb-1">
          我的
        </h1>
        <p className="text-[13.5px] text-[#615C54]">
          练过的对话、留住的话术，还有写在这台设备的树洞。
        </p>
      </div>

      {/* Hand-Circled Three Entry Tabs */}
      <div
        className="grid grid-cols-3 gap-1.5 mb-5"
        role="tablist"
        aria-label="我的内容分类"
      >
        {tabs.map((tab) => {
          const active = subTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSubTab(tab.id)}
              className={`relative min-h-[42px] px-1.5 py-1.5 text-[13px] whitespace-nowrap cursor-pointer transition-colors ${
                active
                  ? 'text-[#292622] font-semibold'
                  : 'text-[#615C54] hover:text-[#292622]'
              }`}
            >
              {active && (
                <>
                  <SageBrushMark className="absolute inset-x-1 bottom-1.5 h-3.5 w-[calc(100%-8px)]" />
                  <svg
                    viewBox="0 0 112 42"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    <path
                      d="M12 6 C36 2.5, 84 3, 100 9 C108 14, 107 29, 96 35 C74 39, 28 38, 10 32 C3 26, 4 11, 12 6 Z"
                      stroke="#292622"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </>
              )}
              <span className="relative z-[1]">
                {tab.label}
                <span className="ml-0.5 tabular-nums text-[11px] opacity-75">
                  ({tab.count})
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <SketchWaveDivider seed={0} />

      {/* Tab 1: 练习记录 */}
      {subTab === 'records' && (
        <div>
          {records.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[15px] text-[#292622] mb-6">
                还没有练习记录。
              </p>
              <SketchPillButton
                type="button"
                onClick={onGoToPracticeList}
                className="min-h-[44px] px-7 py-2"
              >
                <span>去练一句</span>
              </SketchPillButton>
            </div>
          ) : (
            <div>
              {records.map((rec, idx) => (
                <div key={rec.id}>
                  <div className="py-4">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <div className="flex items-center gap-1.5 text-[12px] text-[#615C54] mb-1">
                          <SketchCategoryDoodle
                            category={rec.category}
                            className="w-3.5 h-3.5"
                          />
                          <span>{rec.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{rec.completedAt}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">
                            {rec.completedRounds} / {rec.totalRounds} 轮
                          </span>
                        </div>
                        <h2 className="font-hand text-[22px] text-[#292622]">
                          {rec.scenarioTitle}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteRecord(rec.id)}
                        aria-label="删除这条练习记录"
                        className="min-h-[38px] min-w-[38px] inline-flex items-center justify-center rounded-full text-[#615C54] hover:text-[#292622] cursor-pointer"
                      >
                        <SketchTrash className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[13.5px] leading-[1.6] text-[#615C54] mb-3">
                      {rec.goodTakeaway}
                    </p>

                    <button
                      type="button"
                      onClick={() => onRetryScenario(rec.scenarioId)}
                      className="min-h-[40px] px-4 py-1.5 rounded-[18px_13px_20px_14px] bg-[#C6D0BC]/75 hover:bg-[#C6D0BC] border-[1.2px] border-[#292622]/75 text-[13px] font-medium text-[#292622] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <SketchRetry className="w-3.5 h-3.5" />
                      <span>重新进入这个情景</span>
                    </button>
                  </div>
                  <SketchWaveDivider seed={idx + 1} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: 收藏话术 */}
      {subTab === 'scripts' && (
        <div>
          {scripts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[15px] text-[#292622] mb-6">
                遇到想留住的句子，可以收藏在这里。
              </p>
              <SketchPillButton
                type="button"
                onClick={onGoToPracticeList}
                className="min-h-[44px] px-7 py-2"
              >
                <span>去陪练</span>
              </SketchPillButton>
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              {scripts.map((scr, idx) => (
                <SketchPaperBox
                  key={scr.id}
                  variant="note"
                  tilt={idx % 2 === 0 ? 'left' : 'right'}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2 text-[12px] text-[#615C54] mb-2">
                      <span className="font-medium text-[#292622]">
                        {scr.scenarioTitle}
                      </span>
                      <span className="tabular-nums">{scr.savedAt}</span>
                    </div>

                    <p className="text-[14px] leading-[1.7] text-[#292622] mb-3.5">
                      {scr.content}
                    </p>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleCopyScript(scr)}
                        className="min-h-[38px] px-4 py-1 rounded-[16px_12px_18px_13px] bg-[#C6D0BC] hover:bg-[#B8C4AC] border-[1.2px] border-[#292622] text-[13px] font-medium text-[#292622] inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedId === scr.id ? (
                          <>
                            <SketchCheck className="w-3.5 h-3.5" />
                            <span>已复制</span>
                          </>
                        ) : (
                          <>
                            <SketchCopy className="w-3.5 h-3.5" />
                            <span>复制</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveScript(scr.id)}
                        className="min-h-[38px] px-3.5 py-1 rounded-[14px_18px_12px_16px] border border-dashed border-[#292622]/40 text-[13px] text-[#615C54] hover:text-[#292622] cursor-pointer"
                      >
                        取消收藏
                      </button>
                    </div>
                  </div>
                </SketchPaperBox>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: 我的树洞 */}
      {subTab === 'treehole' && (
        <div className="pt-3">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[12.5px] text-[#615C54]">
              仅保存在当前设备
            </span>
            <button
              type="button"
              onClick={onGoToTreehole}
              className="min-h-[36px] px-3.5 py-1 rounded-[16px_12px_18px_14px] border border-[#292622]/50 text-[12.5px] text-[#292622] cursor-pointer"
            >
              去写一句
            </button>
          </div>

          {treeholes.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[15px] text-[#292622] mb-6">
                还没有写下的树洞文字。心里乱的时候，可以随时去坐一会儿。
              </p>
              <SketchPillButton
                type="button"
                onClick={onGoToTreehole}
                className="min-h-[44px] px-7 py-2"
              >
                <span>去宽慰树洞</span>
              </SketchPillButton>
            </div>
          ) : (
            <div className="space-y-4 pt-1">
              {treeholes.map((entry, idx) => (
                <SketchPaperBox
                  key={entry.id}
                  variant="dashed"
                  tilt={idx % 2 === 0 ? 'right' : 'left'}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[12px] text-[#615C54] tabular-nums">
                        {entry.createdAt}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteTreehole(entry.id)}
                        className="min-h-[34px] px-2.5 py-1 rounded-full text-[12.5px] text-[#615C54] hover:text-[#292622] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <SketchTrash className="w-3.5 h-3.5" />
                        <span>删除</span>
                      </button>
                    </div>
                    <p className="text-[14.5px] leading-[1.75] text-[#292622] whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </div>
                </SketchPaperBox>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
