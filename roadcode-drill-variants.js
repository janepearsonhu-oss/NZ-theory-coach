(() => {
  const baseCards = Array.isArray(window.OFFICIAL_QUESTION_CARDS)
    ? window.OFFICIAL_QUESTION_CARDS.filter((card) => card.answerText && card.sourceUrl)
    : [];

  const variants = baseCards.flatMap((card) => [
    {
      id: `${card.id}-rule-recall`,
      officialId: `${card.officialId || card.id}-R`,
      category: `${card.category} - Recall`,
      question: `Recall the Road Code rule: ${card.question}`,
      answerText: card.answerText,
      explanation: card.explanation || "Use this as a quick memory check for the linked Road Code rule.",
      sourceUrl: card.sourceUrl,
      verificationStatus: "derived-roadcode-drill",
    },
    {
      id: `${card.id}-reverse-drill`,
      officialId: `${card.officialId || card.id}-D`,
      category: `${card.category} - Drill`,
      question: `Which rule or driving situation matches this answer? ${card.answerText}`,
      answerText: card.question,
      explanation: card.explanation || "This reverses the card so you can recognise the rule from the answer.",
      sourceUrl: card.sourceUrl,
      verificationStatus: "derived-roadcode-drill",
    },
  ]);

  const existingIds = new Set(window.OFFICIAL_QUESTION_CARDS.map((card) => card.id));
  window.OFFICIAL_QUESTION_CARDS = [
    ...window.OFFICIAL_QUESTION_CARDS,
    ...variants.filter((card) => !existingIds.has(card.id)),
  ];
})();
