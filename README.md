# NZ Theory Coach

A local study app for the New Zealand learner licence theory test. The app is English-first, because the real test is in English, but each question can include an optional Chinese translation that you can reveal when needed.

## Open the app

Open this file in a browser:

```text
/Users/xiaoyu/Desktop/Git/nz-licence-coach/index.html
```

Study data is stored in the browser's localStorage. Use the export button before changing browsers or machines.

## Share as a link or installable app

The app is PWA-ready. If you host this folder on an HTTPS site, such as GitHub Pages, Netlify, Vercel, Cloudflare Pages or any normal static web host, other people can open it with a link. They can also install it to their phone or desktop from the browser menu.

Important details:

- Opening `index.html` directly works for local use, but install/offline mode usually needs `https://` or `localhost`.
- Each person has their own local study data in their browser.
- To share your question bank or progress, export JSON from the app and send it to them to import.

## Daily routine

1. Start with **Due review**.
2. Practise **Weak categories**.
3. Run a **35-question mock** and aim for at least 32 / 35.
4. Import the questions you missed in other practice apps, with your own notes and optional Chinese translations.

## CSV import format

Use this header:

```csv
category,question,optionA,optionB,optionC,optionD,answer,explanation,zhQuestion,zhOptionA,zhOptionB,zhOptionC,zhOptionD,zhExplanation,sourceUrl
```

`answer` can be `A`, `B`, `C`, `D`, a zero-based index, a one-based index, or the full answer text.

Example:

```csv
category,question,optionA,optionB,optionC,optionD,answer,explanation,zhQuestion,zhOptionA,zhOptionB,zhOptionC,zhOptionD,zhExplanation,sourceUrl
Speed limits,"When can you increase speed after seeing a higher speed limit sign?","Before the sign","After passing the sign","When the road is clear","Any time",B,"Speed limit changes take effect at the sign post.","看到更高限速标志后，什么时候可以加速？","在标志前","通过标志后","道路清空时","任何时候","限速变化从标志所在位置开始生效。","https://www.nzta.govt.nz/roadcode/general-road-code/about-limits/speed-limits"
```

## JSON import format

You can import an array of questions:

```json
[
  {
    "category": "Signs",
    "question": "What does this sign mean?",
    "options": ["Stop", "Give way", "No entry", "No stopping"],
    "answerIndex": 0,
    "explanation": "Add your note here",
    "zh": {
      "question": "这个标志是什么意思？",
      "options": ["停车", "让行", "禁止进入", "禁止停车"],
      "explanation": "在这里添加中文解释。"
    },
    "sourceUrl": "https://www.nzta.govt.nz/roadcode"
  }
]
```

You can also re-import the full JSON exported by this app.

## Review algorithm

- Wrong answer: due again in 10 minutes.
- 1 correct streak: due in 1 day.
- 2 correct streak: due in 3 days.
- 3 correct streak: due in 7 days.
- After that, the interval grows with mastery, capped at 60 days.

## Official sources

Use the official NZTA material as the source of truth:

- Road Code: https://www.nzta.govt.nz/roadcode
- Theory test questions: https://www.nzta.govt.nz/roadcode/theory-test-questions
- Road Code updates: https://www.nzta.govt.nz/roadcode/road-code-updates
- Drive: https://drive.govt.nz

Do not scrape or copy a third-party paid question bank. The safest workflow is to import only your own missed questions, your own notes, or material you are allowed to use from official Road Code sources.

## Built-in Road Code packs

The app includes built-in Road Code practice packs. These cards are paraphrased practice questions rather than a verbatim copy of the NZTA pages, because the NZTA website is copyrighted. Each card includes an answer, explanation and source link to the relevant Road Code section.

Current local count:

- 177 Road Code practice cards
- 354 Road Code recall/drill variants
- 27 demo multiple-choice cards
- 558 total cards

The recall/drill variants are generated from the reviewed Road Code cards. They are designed for spaced repetition: one card asks the rule directly, and another asks you to recognise the rule from the answer.

The NZTA site says the theory question pages include most questions you might be asked, and that questions may be updated at any time. Keep using the official Road Code updates page before the test.
