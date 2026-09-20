(() => {
  const pointValues = {
    lesson: 6,
    vocabulary: 8,
    sentences: 10,
    listening: 12,
    reading: 14,
    "graded-reading": 18,
    writing: 18,
    speaking: 16,
    assessment: 25,
    stage: 12,
    practice: 6
  };

  const clampPercent = (value, target) => Math.max(0, Math.min(100, Math.round(Number(value || 0) / Math.max(1, target) * 100)));
  const plural = (count, singular, pluralForm = singular + "s") => `${count} ${count === 1 ? singular : pluralForm}`;

  function pointsFor(category) {
    return pointValues[category] || pointValues.practice;
  }

  function metric(id, value, detail, progress, complete) {
    const root = document.getElementById(id);
    if (!root) return;
    root.classList.toggle("complete", Boolean(complete));
    const valueNode = root.querySelector("strong");
    const detailNode = root.querySelector("p");
    const meter = root.querySelector(".reward-meter");
    if (valueNode) valueNode.textContent = value;
    if (detailNode) detailNode.textContent = detail;
    if (meter) meter.style.setProperty("--reward-progress", `${progress}%`);
  }

  function render(model) {
    const points = Number(model.points || 0);
    const wins = Number(model.todayWins || 0);
    const streak = Number(model.streak || 0);
    const categories = Number(model.todayCategories || 0);
    const weekDays = Number(model.weekDays || 0);
    const pointsNode = document.getElementById("rewardPoints");
    if (pointsNode) pointsNode.textContent = points.toLocaleString();

    metric(
      "rewardDaily",
      `${Math.min(wins, 3)} / 3`,
      wins >= 3 ? "Daily goal complete." : `${3 - wins} useful ${3 - wins === 1 ? "win" : "wins"} to reach today's goal.`,
      clampPercent(wins, 3),
      wins >= 3
    );
    metric(
      "rewardStreak",
      plural(streak, "day"),
      streak ? "Your current study rhythm." : "Complete one useful activity to begin.",
      clampPercent(streak, 7),
      streak >= 7
    );
    metric(
      "rewardVariety",
      `${Math.min(categories, 3)} / 3`,
      categories >= 3 ? "Three language skills used successfully today." : "Complete useful work in vocabulary, sentences, reading, listening, writing, or speaking.",
      clampPercent(categories, 3),
      categories >= 3
    );
    metric(
      "rewardWeek",
      `${Math.min(weekDays, 3)} / 3`,
      weekDays >= 3 ? "Weekly rhythm complete." : `${3 - weekDays} ${3 - weekDays === 1 ? "day" : "days"} to reach this week's rhythm goal.`,
      clampPercent(weekDays, 3),
      weekDays >= 3
    );

    const recentNode = document.getElementById("rewardRecentText");
    if (recentNode) {
      const recent = (model.recentWins || [])[0];
      recentNode.textContent = recent
        ? `${recent.title} ${recent.detail || ""}`.trim()
        : points > 0
          ? `Your completed course work is reflected in ${points.toLocaleString()} evidence points.`
          : "Your first completed learning step will appear here.";
    }
  }

  window.SatzwerkRewards = { pointsFor, render };
})();
