import {
  PracticeRound,
  RoundFeedback,
  RoundSubmission,
  Scenario,
} from '../types/zhixian';

function evaluateRoundLocally(
  round: PracticeRound,
  userReply: string
): RoundFeedback {
  const normalized = userReply.trim();
  const matchedSignals = round.requiredSignals.filter((sig) =>
    sig.keywords.some((kw) => normalized.includes(kw))
  );

  if (matchedSignals.length >= round.requiredSignals.length) {
    return {
      clearPoints: round.defaultGoodJobClearPoint,
      nextToAdd: `这一句已经把关键意思交代得很清楚了。如果发出前还想更稳妥，可以再看一眼时间或数字是否具体。`,
      isClearEnough: true,
      source: 'local',
    };
  }

  if (matchedSignals.length === 1) {
    const matched = matchedSignals[0];
    const missing = round.requiredSignals.find((s) => s !== matched);
    return {
      clearPoints: matched.clearPoint,
      nextToAdd: missing ? missing.missingHint : round.defaultNextToAdd,
      isClearEnough: false,
      source: 'local',
    };
  }

  return {
    clearPoints: round.defaultClearPoint,
    nextToAdd: round.defaultNextToAdd,
    isClearEnough: false,
    source: 'local',
  };
}

export async function getRoundFeedback(
  scenario: Scenario,
  round: PracticeRound,
  userReply: string
): Promise<RoundFeedback> {
  try {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 6500);

    const response = await fetch('/api/practice-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioTitle: scenario.title,
        role: scenario.role,
        goals: scenario.goals,
        roundNumber: round.roundNumber,
        counterpartLine: round.counterpartLine,
        feedbackFocus: round.feedbackFocus,
        sampleReply: round.sampleReply,
        userReply,
      }),
      signal: controller.signal,
    });

    window.clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (
        typeof data.clearPoints === 'string' &&
        typeof data.nextToAdd === 'string'
      ) {
        return {
          clearPoints: data.clearPoints,
          nextToAdd: data.nextToAdd,
          isClearEnough: Boolean(data.isClearEnough),
          source: 'ai',
        };
      }
    }
  } catch {
    // Gracefully fall back to scenario-configured local script hints
  }

  return evaluateRoundLocally(round, userReply);
}

export interface PracticeSummaryResult {
  goodTakeaway: string;
  improveTakeaway: string;
  suggestedScript: string;
  source: 'ai' | 'local';
}

export async function getPracticeSummary(
  scenario: Scenario,
  submissions: RoundSubmission[]
): Promise<PracticeSummaryResult> {
  try {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 7000);

    const response = await fetch('/api/practice-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioTitle: scenario.title,
        role: scenario.role,
        goals: scenario.goals,
        submissions: submissions.map((s) => ({
          roundNumber: s.roundNumber,
          counterpartLine: s.counterpartLine,
          userReply: s.userReply,
        })),
        defaultTemplate: scenario.resultTemplate,
      }),
      signal: controller.signal,
    });

    window.clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (
        typeof data.goodTakeaway === 'string' &&
        typeof data.improveTakeaway === 'string' &&
        typeof data.suggestedScript === 'string'
      ) {
        return {
          goodTakeaway: data.goodTakeaway,
          improveTakeaway: data.improveTakeaway,
          suggestedScript: data.suggestedScript,
          source: 'ai',
        };
      }
    }
  } catch {
    // Gracefully fall back to local scenario summary
  }

  const clearSubmission = submissions.find((s) => s.feedback.isClearEnough);
  const firstNeedingTip = submissions.find((s) => !s.feedback.isClearEnough);

  return {
    goodTakeaway: clearSubmission
      ? `第 ${clearSubmission.roundNumber} 轮中，${clearSubmission.feedback.clearPoints}`
      : scenario.defaultGoodTakeaway,
    improveTakeaway: firstNeedingTip
      ? `下次遇到类似第 ${firstNeedingTip.roundNumber} 轮的情况时，${firstNeedingTip.feedback.nextToAdd}`
      : scenario.defaultImproveTakeaway,
    suggestedScript: scenario.resultTemplate,
    source: 'local',
  };
}
