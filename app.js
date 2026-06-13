const STORAGE_KEY = "nz-theory-coach-v1";
const ONE_DAY = 24 * 60 * 60 * 1000;
const EXAM_SIZE = 35;
const PASS_MARK = 32;

const SOURCES = {
  roadCode: "https://www.nzta.govt.nz/roadcode",
  questions: "https://www.nzta.govt.nz/roadcode/theory-test-questions",
  updates: "https://www.nzta.govt.nz/roadcode/road-code-updates",
  night:
    "https://www.nzta.govt.nz/roadcode/general-road-code/about-driving/when-conditions-change/night-driving",
  weather:
    "https://www.nzta.govt.nz/roadcode/general-road-code/about-driving/when-conditions-change/driving-in-bad-weather",
  speed:
    "https://www.nzta.govt.nz/roadcode/general-road-code/about-limits/speed-limits",
  alcohol:
    "https://www.nzta.govt.nz/roadcode/general-road-code/about-limits/alcohol-and-drugs-limits",
};

const seedCards = [
  {
    id: "seed-headlights-visibility",
    category: "Night driving",
    question: "When must you turn on your vehicle's headlights because visibility is poor?",
    options: [
      "When you cannot clearly see a person or vehicle 100 metres away",
      "Only when it is raining",
      "Only on the open road",
      "Only after the vehicle has been parked",
    ],
    answerIndex: 0,
    explanation:
      "The Road Code says headlights must be on when you cannot clearly see a person or vehicle 100 metres away.",
    zh: {
      question: "能见度差时，什么时候必须打开车辆 headlights？",
      options: [
        "看不清 100 metres 外的人或车辆时",
        "只有下雨时",
        "只有在 open road 上",
        "只要车已经停好就必须打开",
      ],
      explanation: "Road Code 要求在看不清 100 metres 外的人或车辆时打开 headlights。",
    },
    sourceUrl: SOURCES.night,
  },
  {
    id: "seed-headlights-time",
    category: "Night driving",
    question: "At night, when must you use your vehicle's headlights?",
    options: [
      "From 30 minutes after sunset until 30 minutes before sunrise",
      "From 10 minutes after sunset until 10 minutes before sunrise",
      "From 8pm until 6am",
      "Only on roads without street lighting",
    ],
    answerIndex: 0,
    explanation:
      "The official Road Code states: from 30 minutes after sunset until 30 minutes before sunrise.",
    zh: {
      question: "夜间驾驶时，headlights 的强制使用时间是？",
      options: [
        "日落后 30 分钟到日出前 30 分钟",
        "日落后 10 分钟到日出前 10 分钟",
        "晚上 8 点到早上 6 点",
        "只有没有路灯的路段",
      ],
      explanation: "官方 Road Code 写明：from 30 minutes after sunset until 30 minutes before sunrise。",
    },
    sourceUrl: SOURCES.night,
  },
  {
    id: "seed-dip-headlights",
    category: "Night driving",
    question: "When must you dip your vehicle's headlights?",
    options: [
      "Only when other vehicles are coming towards you",
      "Only when following another vehicle closely",
      "When other vehicles are coming towards you, when following vehicles, when approaching a police officer directing traffic, or when parked",
      "Only on motorways",
    ],
    answerIndex: 2,
    explanation:
      "The Road Code lists several situations where you must dip headlights so you do not blind other road users.",
    zh: {
      question: "什么时候必须 dip headlights？",
      options: [
        "只有迎面来车时",
        "只有跟车很近时",
        "迎面来车、跟车、接近指挥交通的警察或停车时",
        "只有高速路上",
      ],
      explanation: "Road Code 列出多种必须 dip headlights 的场景，核心目的是避免眩目。",
    },
    sourceUrl: SOURCES.night,
  },
  {
    id: "seed-night-lanes-stop",
    category: "Night driving",
    question: "At night, on a road with lanes, how far ahead must you be able to stop?",
    options: [
      "Within the length of clear road you can see in front of you",
      "Within half the length of clear road you can see in front of you",
      "Within 50 metres at all times",
      "Any distance, as long as you are under the speed limit",
    ],
    answerIndex: 0,
    explanation:
      "On a road with lanes, you must be able to stop in the length of clear road you can see. The half-length rule applies on roads with no lanes.",
    zh: {
      question: "At night，在有 lanes 的道路上，你必须能在多远内停下？",
      options: [
        "你前方可见 clear lane 的长度内",
        "你前方可见 clear road 的一半长度内",
        "任何时候都必须 50 metres 内",
        "只要低于限速即可",
      ],
      explanation: "有 lanes 的道路是 stop in the length of clear road/lane you can see；没有 lanes 时才是 half the length。",
    },
    sourceUrl: SOURCES.night,
  },
  {
    id: "seed-fog-headlights",
    category: "Bad weather",
    question: "When driving in fog, how should you use your vehicle lights?",
    options: [
      "Use full beam because brighter is safer",
      "Use dipped headlights; use fog lamps only in severely reduced visibility",
      "Use park lights only",
      "Turn off all external lights to avoid reflection",
    ],
    answerIndex: 1,
    explanation:
      "Full beam reflects back in fog. The Road Code says to dip your lights, and fog lamps should only be used in severely reduced visibility.",
    zh: {
      question: "Fog 中开车时，灯光应该怎么用？",
      options: [
        "使用 full beam，因为越亮越安全",
        "使用 dipped headlights；严重低能见度时才用 fog lamps",
        "只开 park lights",
        "关闭所有外部灯光避免反光",
      ],
      explanation: "Full beam 在 fog 中会反射回来。Road Code 建议 dip lights，fog lamps 只在严重低能见度下使用。",
    },
    sourceUrl: SOURCES.weather,
  },
  {
    id: "seed-wet-following",
    category: "Following distance",
    question: "On wet, frosty or icy roads, which rule should you use to judge a safe following distance?",
    options: ["2-second rule", "4-second rule", "10-metre rule", "100-metre rule"],
    answerIndex: 1,
    explanation:
      "Slippery roads increase stopping distance, so the Road Code says to use the 4-second rule.",
    zh: {
      question: "Wet, frosty or icy roads 上判断安全跟车距离，应使用哪个规则？",
      options: ["2-second rule", "4-second rule", "10-metre rule", "100-metre rule"],
      explanation: "湿滑或结冰路面刹车距离更长，Road Code 要求增加 following distance，使用 4-second rule。",
    },
    sourceUrl: SOURCES.weather,
  },
  {
    id: "seed-dry-following",
    category: "Following distance",
    question: "Under normal driving conditions, which rule should you use for a safe following distance in a car?",
    options: ["1-second rule", "2-second rule", "4-second rule", "Only check the speedometer"],
    answerIndex: 1,
    explanation:
      "Use the 2-second rule in normal conditions. Increase to the 4-second rule when weather or road conditions are poor.",
    zh: {
      question: "Normal driving conditions 下，car 的基本安全跟车距离规则是？",
      options: ["1-second rule", "2-second rule", "4-second rule", "只看速度表"],
      explanation: "正常条件下用 2-second rule；天气或路面变差时提高到 4-second rule。",
    },
    sourceUrl: SOURCES.roadCode,
  },
  {
    id: "seed-school-bus",
    category: "Speed limits",
    question: "What is the speed limit when passing a stopped school bus that is picking up or dropping off children?",
    options: ["20 km/h or less", "30 km/h", "50 km/h", "The normal road speed limit"],
    answerIndex: 0,
    explanation:
      "No matter which direction you are coming from, you must drive at 20 km/h or less until you are well past the bus.",
    zh: {
      question: "Passing a stopped school bus that is picking up or dropping off children: 最大速度是多少？",
      options: ["20 km/h or less", "30 km/h", "50 km/h", "按原道路限速"],
      explanation: "无论从哪个方向接近，school bus 停下接送儿童时都要 20 km/h or less，直到 well past the bus。",
    },
    sourceUrl: SOURCES.speed,
  },
  {
    id: "seed-emergency-speed",
    category: "Speed limits",
    question: "After you pass a crash, fire or emergency sign, what speed must you drive until you have passed the site?",
    options: ["20 km/h or less", "40 km/h", "50 km/h", "Any speed under the posted limit"],
    answerIndex: 0,
    explanation:
      "For crash, fire or emergency signs, the Road Code says to slow down and drive at 20 km/h or less.",
    zh: {
      question: "看到 crash, fire or emergency sign 后，直到通过现场前应如何控制速度？",
      options: ["20 km/h or less", "40 km/h", "50 km/h", "只要不超过限速即可"],
      explanation: "Road Code 对 crash/fire/emergency signs 的要求是 slow down and drive at 20 km/h or less。",
    },
    sourceUrl: SOURCES.speed,
  },
  {
    id: "seed-speed-limit-meaning",
    category: "Speed limits",
    question: "What does a speed limit mean?",
    options: [
      "The maximum legal speed you can travel at in good conditions",
      "The speed you must keep in all weather",
      "A recommended speed that can be exceeded slightly",
      "A rule that applies only to learner drivers",
    ],
    answerIndex: 0,
    explanation:
      "A speed limit is the maximum legal speed in good conditions. You must drive slower if conditions make the limit unsafe.",
    zh: {
      question: "Speed limit 的含义最准确的是？",
      options: [
        "良好条件下可行驶的最高合法速度",
        "任何天气下都必须保持的速度",
        "建议速度，超一点没有关系",
        "只对 learner drivers 生效",
      ],
      explanation: "限速是 good conditions 下的 maximum legal speed；条件差时必须更慢。",
    },
    sourceUrl: SOURCES.speed,
  },
  {
    id: "seed-speed-increase",
    category: "Speed limits",
    question: "You are driving in an 80 km/h area and there is a 100 km/h speed limit sign ahead. When can you start to increase your speed?",
    options: [
      "After you pass the 100 km/h sign",
      "As soon as you can see the sign",
      "When you are 100 metres before the sign",
      "Any time, as long as the road ahead is clear",
    ],
    answerIndex: 0,
    explanation:
      "Speed limit changes take effect at the sign post. You must not increase speed until you pass a higher speed limit sign.",
    zh: {
      question: "你在 80 km/h 区域行驶，前方有 100 km/h sign。什么时候可以开始加速？",
      options: [
        "通过 100 km/h sign 之后",
        "看到 sign 的时候",
        "离 sign 100 metres 时",
        "任何时候，只要前方没车",
      ],
      explanation: "速度限制变化在 sign post 处生效；更高限速必须 passing the sign 后才能加速。",
    },
    sourceUrl: SOURCES.speed,
  },
  {
    id: "seed-speed-decrease",
    category: "Speed limits",
    question: "You are driving in an 80 km/h area and there is a 60 km/h speed limit sign ahead. When must you be going 60 km/h?",
    options: [
      "By the time you reach the 60 km/h sign",
      "Within 50 metres after you pass the sign",
      "Only when you see police",
      "After you enter the next intersection",
    ],
    answerIndex: 0,
    explanation:
      "A lower speed limit applies from the sign post, so you must be at the new speed by the time you reach the sign.",
    zh: {
      question: "你在 80 km/h 区域行驶，前方有 60 km/h sign。什么时候必须已经降到 60 km/h？",
      options: [
        "到达 60 km/h sign 时",
        "通过 sign 之后 50 metres 内",
        "只要看到警察时",
        "进入下一个路口后",
      ],
      explanation: "较低限速在 sign post 处生效，所以到达标志时就必须符合新限速。",
    },
    sourceUrl: SOURCES.speed,
  },
  {
    id: "seed-slow-driver",
    category: "Road position",
    question: "You are driving slower than the speed limit and notice vehicles following you. What should you do?",
    options: [
      "Keep as close to the left as possible and pull over when it is safe to let them pass",
      "Speed up above the speed limit",
      "Stay in the middle of the lane to stop other drivers passing",
      "Brake suddenly to warn the vehicles behind",
    ],
    answerIndex: 0,
    explanation:
      "The Road Code says slower drivers must keep left and pull over as soon as it is safe to let following vehicles pass.",
    zh: {
      question: "你开得比限速慢，发现后面有车辆排队跟着。应该怎么做？",
      options: [
        "靠左，并在安全时靠边让后车通过",
        "加速到超过限速",
        "保持在车道中间避免别人超车",
        "突然刹车提醒后车",
      ],
      explanation: "Road Code 要求 slower drivers keep left，并在安全时 pull over 让后车通过。",
    },
    sourceUrl: SOURCES.speed,
  },
  {
    id: "seed-alcohol-under-20",
    category: "Alcohol and drugs",
    question: "If you are under 20, what does the zero alcohol limit mean?",
    options: [
      "If you drive after consuming even one drink, you can be charged with drink-driving",
      "You may have one low-alcohol drink",
      "You are legal as long as you stay under 250 micrograms of breath alcohol",
      "It applies only to full licence drivers",
    ],
    answerIndex: 0,
    explanation:
      "For drivers under 20, the law has a zero alcohol limit. Even one drink can lead to a drink-driving charge.",
    zh: {
      question: "If you are under 20, zero alcohol limit 的意思是？",
      options: [
        "开车前喝任何酒都可能被控 drink-driving",
        "最多可以喝一杯低度酒",
        "只要不超 250 micrograms breath alcohol 就行",
        "只适用于 full licence drivers",
      ],
      explanation: "Under 20 的法律限制是 zero alcohol limit，Road Code 明确说喝一杯也可能被控。",
    },
    sourceUrl: SOURCES.alcohol,
  },
  {
    id: "seed-alcohol-over-20",
    category: "Alcohol and drugs",
    question: "If you are 20 or over, which statement about the alcohol limit is correct?",
    options: [
      "You must not exceed 250 micrograms per litre of breath or 50 milligrams per 100 millilitres of blood",
      "Any alcohol reading above zero is illegal",
      "Only blood alcohol counts, not breath alcohol",
      "You may drive as long as you feel alert",
    ],
    answerIndex: 0,
    explanation:
      "Drivers aged 20 or over must not exceed 250 micrograms of alcohol per litre of breath or 50 milligrams per 100 millilitres of blood.",
    zh: {
      question: "Twenty or over 的普通 alcohol limit 说法正确的是？",
      options: [
        "不得超过 250 micrograms per litre of breath 或 50 mg per 100 ml blood",
        "任何酒精读数都是 0 才合法",
        "只看 blood，不看 breath",
        "只要感觉清醒就可以开",
      ],
      explanation: "20 岁及以上不得超过 breath 250 micrograms/litre 或 blood 50 mg/100 ml。",
    },
    sourceUrl: SOURCES.alcohol,
  },
  {
    id: "seed-emergency-vehicle",
    category: "Emergency",
    question: "What should you do when you hear a siren or see red flashing lights from an ambulance or fire engine?",
    options: [
      "Safely move over and let the emergency vehicle pass; stop if necessary",
      "Keep the same speed to avoid affecting traffic behind you",
      "Speed up immediately to get away",
      "Give way only on motorways",
    ],
    answerIndex: 0,
    explanation:
      "You should make way safely for emergency vehicles. Avoid sudden or dangerous movements.",
    zh: {
      question: "听到 siren 或看到 ambulance/fire engine 的 red flashing lights，应该怎么做？",
      options: [
        "安全地靠边，让 emergency vehicle 通过，必要时停下",
        "保持原速，避免影响后车",
        "立即加速离开",
        "只在高速路上需要让行",
      ],
      explanation: "遇到紧急车辆要尽快安全让行；不要突然做危险动作。",
    },
    sourceUrl: SOURCES.questions,
  },
  {
    id: "seed-police-lights",
    category: "Emergency",
    question: "What must you do when you see blue and red flashing lights behind you?",
    options: [
      "Pull over and stop in a safe place",
      "Turn on hazard lights and keep driving",
      "Speed up to the nearest service station",
      "Do nothing unless there is also a siren",
    ],
    answerIndex: 0,
    explanation:
      "When police signal you to stop, pull over in a safe place and wait for instructions.",
    zh: {
      question: "看到后方 blue and red flashing lights 时，应该怎么做？",
      options: [
        "在安全位置靠边并停车",
        "打开 hazard lights 后继续行驶",
        "加速到最近的加油站",
        "只要没有 siren 就不用处理",
      ],
      explanation: "警车示意时，应在安全地点靠边停车并等待指示。",
    },
    sourceUrl: SOURCES.questions,
  },
  {
    id: "seed-rail-red",
    category: "Railway crossings",
    question: "You are waiting at a railway level crossing and the red lights continue to flash after the train has passed. What should you do?",
    options: [
      "Keep waiting until the red lights stop flashing",
      "Drive across after checking there is no second train",
      "Sound the horn and drive across slowly",
      "Follow the vehicle in front as soon as it moves",
    ],
    answerIndex: 0,
    explanation:
      "You must keep waiting while the red lights are flashing.",
    zh: {
      question: "Railway level crossing 的 red lights 仍在 flashing，即使 train 已经过了，你应该？",
      options: [
        "继续等待，直到红灯停止闪烁",
        "确认没有第二列火车后直接通过",
        "按喇叭后慢慢通过",
        "只要前车走了就跟着走",
      ],
      explanation: "红灯仍在闪烁就必须继续停等。",
    },
    sourceUrl: SOURCES.questions,
  },
  {
    id: "seed-rail-space",
    category: "Railway crossings",
    question: "Before crossing a railway level crossing, you must check there is space for your vehicle on the other side of the line. True or false?",
    options: ["True", "False", "Only for heavy vehicles", "Only for crossings without barriers"],
    answerIndex: 0,
    explanation:
      "You must not stop on a crossing. Check there is space before you cross.",
    zh: {
      question: "通过 railway level crossing 前，必须确认另一侧有足够空间容纳你的车。True or False?",
      options: ["True", "False", "只适用于 heavy vehicles", "只适用于没有 barrier 的 crossing"],
      explanation: "不能把车停在 crossing 上；通过前要确认前方有空间。",
    },
    sourceUrl: SOURCES.questions,
  },
  {
    id: "seed-police-overrule",
    category: "Intersections",
    question: "Directions from a police officer overrule traffic signals, road signs and give way rules. True or false?",
    options: ["True", "False", "Only at night", "Only on motorways"],
    answerIndex: 0,
    explanation:
      "A police officer's directions take priority over signals, signs and give way rules.",
    zh: {
      question: "Police officer 的交通指挥是否会 override traffic signals, signs and give way rules?",
      options: ["True", "False", "只在夜间", "只在高速公路"],
      explanation: "现场警察指挥优先于信号灯、道路标志和让行规则。",
    },
    sourceUrl: SOURCES.questions,
  },
  {
    id: "seed-roundabout",
    category: "Intersections",
    question: "When coming up to a roundabout, which traffic do you usually give way to?",
    options: ["Traffic from your right", "Traffic from your left", "Traffic behind you", "Parked vehicles"],
    answerIndex: 0,
    explanation:
      "In New Zealand roundabouts, you usually give way to traffic from your right.",
    zh: {
      question: "Coming up to a roundabout 时，通常应让行给哪个方向会 cross your path 的车辆？",
      options: ["右侧", "左侧", "后方", "停在路边的车辆"],
      explanation: "新西兰靠左行驶，roundabout 通常要 give way to traffic from your right。",
    },
    sourceUrl: SOURCES.questions,
  },
  {
    id: "seed-driveway",
    category: "Give way",
    question: "When coming out of a driveway, you must give way to anyone using a footpath, cycle path, shared path or the road. True or false?",
    options: ["True", "False", "Only give way to motor vehicles", "Only near schools"],
    answerIndex: 0,
    explanation:
      "When leaving a driveway you cross spaces used by pedestrians, cyclists and other road users, so you must give way.",
    zh: {
      question: "从 driveway 出来时，是否必须让行给 footpath, cycle path, shared path 或 road 上的人？",
      options: ["True", "False", "只让机动车", "只在学校附近"],
      explanation: "从 driveway 出来会穿过人行、骑行或道路空间，必须给正在使用这些空间的人让行。",
    },
    sourceUrl: SOURCES.questions,
  },
  {
    id: "seed-red-arrow",
    category: "Intersections",
    question: "You are turning right at traffic signals showing a red arrow pointing to the right. What should you do?",
    options: [
      "Stop and wait until a signal allows you to turn right",
      "Turn right if there is no oncoming traffic",
      "Move into the middle of the intersection and wait",
      "Sound the horn and turn right",
    ],
    answerIndex: 0,
    explanation:
      "A red arrow means you must not travel in that direction until the signal allows it.",
    zh: {
      question: "Traffic signals 显示 red arrow pointing right 时，你想右转应该？",
      options: [
        "停下并等待允许右转的信号",
        "只要没有来车就右转",
        "先开到路口中央等待",
        "鸣笛后右转",
      ],
      explanation: "红色箭头表示该方向不得通行，必须等待允许信号。",
    },
    sourceUrl: SOURCES.questions,
  },
  {
    id: "seed-yellow-flashing",
    category: "Intersections",
    question: "What does one or more yellow lights flashing at traffic signals usually mean?",
    options: [
      "Proceed with care and apply the give way rules",
      "Speed up immediately",
      "All directions must stop for 3 seconds",
      "It applies only to pedestrians",
    ],
    answerIndex: 0,
    explanation:
      "Flashing yellow signals mean you need to be careful and follow the give way rules and any signs.",
    zh: {
      question: "Traffic signals 出现 one or more yellow lights flashing，通常表示？",
      options: [
        "小心通过，并按 give way rules 判断",
        "必须立即加速通过",
        "所有方向都必须停车 3 秒",
        "只对 pedestrians 有效",
      ],
      explanation: "黄灯闪烁时要谨慎，按路口让行规则和现场标志处理。",
    },
    sourceUrl: SOURCES.questions,
  },
  {
    id: "seed-passing-clear-road",
    category: "Passing",
    question: "What is the least distance of clear road you must have in front of you when you have finished passing another vehicle?",
    options: ["100 metres", "50 metres", "20 metres", "Any distance, as long as there is no oncoming vehicle"],
    answerIndex: 0,
    explanation:
      "After passing another vehicle, you must have at least 100 metres of clear road ahead.",
    zh: {
      question: "完成 passing another vehicle 后，前方至少需要多少 clear road？",
      options: ["100 metres", "50 metres", "20 metres", "只要没有迎面车即可"],
      explanation: "完成超车后，前方必须至少有 100 metres clear road。",
    },
    sourceUrl: SOURCES.questions,
  },
  {
    id: "seed-crash-injury",
    category: "Crashes",
    question: "If anybody is hurt in a crash, the driver must tell a police officer as soon as possible but within how long?",
    options: ["24 hours", "48 hours", "7 days", "Only before contacting the insurance company"],
    answerIndex: 0,
    explanation:
      "If someone is hurt in a crash, the driver must tell police as soon as possible and within 24 hours.",
    zh: {
      question: "Crash 中有人受伤，driver must tell a police officer as soon as possible but within 多久？",
      options: ["24 hours", "48 hours", "7 days", "只要保险公司知道即可"],
      explanation: "有人受伤时要尽快报警，并且不得超过 24 hours。",
    },
    sourceUrl: SOURCES.questions,
  },
  {
    id: "seed-visible-smoke",
    category: "Vehicle condition",
    question: "A vehicle should not send out visible smoke for more than how long?",
    options: ["10 seconds", "30 seconds", "1 minute", "There is no limit if it has a current WoF"],
    answerIndex: 0,
    explanation:
      "This Road Code core question commonly tests the 10-second visible smoke limit.",
    zh: {
      question: "车辆排出 visible smoke 不应持续超过多久？",
      options: ["10 seconds", "30 seconds", "1 minute", "只要通过 WOF 就不限制"],
      explanation: "Road Code core questions 涉及 visible smoke，常考点是 10 seconds。",
    },
    sourceUrl: SOURCES.questions,
  },
];

let state = loadState();
let activeSession = null;

const els = {
  tabs: document.querySelectorAll(".tab"),
  views: document.querySelectorAll(".view"),
  exportData: document.querySelector("#export-data"),
  openImport: document.querySelector("#open-import"),
  quickReview: document.querySelector("#quick-review"),
  metricErrorRate: document.querySelector("#metric-error-rate"),
  metricAttempts: document.querySelector("#metric-attempts"),
  metricDue: document.querySelector("#metric-due"),
  metricReadiness: document.querySelector("#metric-readiness"),
  metricPassline: document.querySelector("#metric-passline"),
  metricWeakest: document.querySelector("#metric-weakest"),
  dailyPlan: document.querySelector("#daily-plan"),
  dailyPlanCount: document.querySelector("#daily-plan-count"),
  categoryBars: document.querySelector("#category-bars"),
  categoryCount: document.querySelector("#category-count"),
  recentSessions: document.querySelector("#recent-sessions"),
  recentCount: document.querySelector("#recent-count"),
  categoryFilter: document.querySelector("#category-filter"),
  modeButtons: document.querySelectorAll(".mode-card"),
  quizShell: document.querySelector("#quiz-shell"),
  quizModeLabel: document.querySelector("#quiz-mode-label"),
  quizProgressBar: document.querySelector("#quiz-progress-bar"),
  quizCounter: document.querySelector("#quiz-counter"),
  questionCategory: document.querySelector("#question-category"),
  questionDue: document.querySelector("#question-due"),
  questionText: document.querySelector("#question-text"),
  answerOptions: document.querySelector("#answer-options"),
  toggleTranslation: document.querySelector("#toggle-translation"),
  translationPanel: document.querySelector("#translation-panel"),
  answerFeedback: document.querySelector("#answer-feedback"),
  skipQuestion: document.querySelector("#skip-question"),
  nextQuestion: document.querySelector("#next-question"),
  startOverdue: document.querySelector("#start-overdue"),
  reviewTimeline: document.querySelector("#review-timeline"),
  clearMastered: document.querySelector("#clear-mastered"),
  mistakeList: document.querySelector("#mistake-list"),
  importText: document.querySelector("#import-text"),
  importQuestions: document.querySelector("#import-questions"),
  importStatus: document.querySelector("#import-status"),
  resetDemo: document.querySelector("#reset-demo"),
  downloadTemplate: document.querySelector("#download-template"),
  manualForm: document.querySelector("#manual-form"),
  emptyTemplate: document.querySelector("#empty-template"),
};

wireEvents();
render();

function loadState() {
  const builtInCards = getBuiltInCards();
  const fallback = {
    cards: structuredClone(builtInCards),
    progress: {},
    sessions: [],
    settings: {
      examSize: EXAM_SIZE,
      passMark: PASS_MARK,
      hideMastered: false,
    },
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.cards)) {
      return prepareState(fallback);
    }

    const merged = {
      ...fallback,
      ...saved,
      settings: { ...fallback.settings, ...(saved.settings || {}) },
      progress: saved.progress || {},
      sessions: Array.isArray(saved.sessions) ? saved.sessions : [],
    };

    const seedById = new Map(builtInCards.map((card) => [card.id, structuredClone(card)]));
    merged.cards = merged.cards.map((card) => seedById.get(card.id) || card);
    const ids = new Set(merged.cards.map((card) => card.id));
    for (const card of builtInCards) {
      if (!ids.has(card.id)) {
        merged.cards.push(structuredClone(card));
      }
    }

    return prepareState(merged);
  } catch {
    return prepareState(fallback);
  }
}

function getBuiltInCards() {
  return [
    ...seedCards,
    ...(Array.isArray(window.OFFICIAL_QUESTION_CARDS) ? window.OFFICIAL_QUESTION_CARDS : []),
  ];
}

function prepareState(nextState) {
  nextState.cards = nextState.cards
    .map(normalizeCard)
    .filter((card) => card.question && (card.options.length >= 2 || card.answerText));
  for (const card of nextState.cards) {
    ensureProgress(nextState, card.id);
  }
  return nextState;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeCard(card) {
  const options = Array.isArray(card.options)
    ? card.options.map(String).map((item) => item.trim()).filter(Boolean)
    : [];
  const zhOptions = Array.isArray(card.zh?.options)
    ? card.zh.options.map(String).map((item) => item.trim())
    : Array.isArray(card.zhOptions)
      ? card.zhOptions.map(String).map((item) => item.trim())
      : [];
  const answerIndex = clamp(Number(card.answerIndex ?? 0), 0, Math.max(options.length - 1, 0));
  return {
    id: card.id || `card-${hashString(`${card.category || ""}:${card.question || ""}`)}`,
    category: String(card.category || "Uncategorised").trim() || "Uncategorised",
    question: String(card.question || "").trim(),
    options,
    answerIndex,
    explanation: String(card.explanation || "").trim(),
    answerText: String(card.answerText || "").trim(),
    officialId: String(card.officialId || "").trim(),
    verificationStatus: String(card.verificationStatus || "").trim(),
    zh: {
      question: String(card.zh?.question || card.zhQuestion || "").trim(),
      options: zhOptions,
      explanation: String(card.zh?.explanation || card.zhExplanation || "").trim(),
    },
    sourceUrl: String(card.sourceUrl || "").trim(),
  };
}

function ensureProgress(container, cardId) {
  if (!container.progress[cardId]) {
    container.progress[cardId] = {
      attempts: 0,
      correct: 0,
      wrong: 0,
      streak: 0,
      ease: 2.5,
      intervalDays: 0,
      dueAt: Date.now(),
      lastSeen: null,
      lapses: 0,
      hidden: false,
      history: [],
    };
  }

  const progress = container.progress[cardId];
  progress.attempts ||= 0;
  progress.correct ||= 0;
  progress.wrong ||= 0;
  progress.streak ||= 0;
  progress.ease ||= 2.5;
  progress.intervalDays ||= 0;
  progress.dueAt ||= Date.now();
  progress.history ||= [];
  return progress;
}

function wireEvents() {
  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => showTab(tab.dataset.tab));
  });

  els.openImport.addEventListener("click", () => showTab("import"));
  els.exportData.addEventListener("click", exportData);
  els.quickReview.addEventListener("click", () => startQuiz("due"));
  els.startOverdue.addEventListener("click", () => startQuiz("due"));
  els.clearMastered.addEventListener("click", () => {
    state.settings.hideMastered = !state.settings.hideMastered;
    saveState();
    renderMistakes();
  });

  els.modeButtons.forEach((button) => {
    button.addEventListener("click", () => startQuiz(button.dataset.mode));
  });

  els.toggleTranslation.addEventListener("click", () => {
    if (!activeSession) return;
    activeSession.translationVisible = !activeSession.translationVisible;
    renderTranslation();
  });

  els.answerOptions.addEventListener("click", (event) => {
    const button = event.target.closest(".option-btn");
    if (!button || !activeSession || activeSession.answered) return;
    if (button.dataset.action === "reveal") {
      revealFlashcardAnswer();
      return;
    }
    if (button.dataset.action === "got-it") {
      answerCurrentQuestion(0, true);
      return;
    }
    if (button.dataset.action === "missed-it") {
      answerCurrentQuestion(-1, false);
      return;
    }
    answerCurrentQuestion(Number(button.dataset.index));
  });

  els.skipQuestion.addEventListener("click", () => {
    if (!activeSession || activeSession.answered) return;
    answerCurrentQuestion(-1);
  });

  els.nextQuestion.addEventListener("click", () => {
    if (!activeSession) return;
    if (activeSession.finished) {
      activeSession = null;
      els.quizShell.hidden = true;
      render();
      return;
    }
    activeSession.index += 1;
    if (activeSession.index >= activeSession.queue.length) {
      finishSession();
    } else {
      renderQuestion();
    }
  });

  els.importQuestions.addEventListener("click", importQuestions);
  els.resetDemo.addEventListener("click", resetDemoDeck);
  els.downloadTemplate.addEventListener("click", downloadTemplate);
  els.manualForm.addEventListener("submit", addManualCard);

  els.reviewTimeline.addEventListener("click", (event) => {
    const button = event.target.closest("[data-review]");
    if (!button) return;
    const ids = button.dataset.review.split(",").filter(Boolean);
    startQuiz("custom", ids);
  });

  els.mistakeList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-card-id]");
    if (!button) return;
    startQuiz("custom", [button.dataset.cardId]);
  });
}

function showTab(name) {
  els.tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.tab === name));
  els.views.forEach((view) => view.classList.toggle("is-active", view.id === `${name}-view`));
  if (name === "quiz") renderQuizSetup();
}

function render() {
  saveState();
  renderDashboard();
  renderQuizSetup();
  renderReview();
  renderMistakes();
}

function getCard(cardId) {
  return state.cards.find((card) => card.id === cardId);
}

function getProgress(cardId) {
  return ensureProgress(state, cardId);
}

function getCardStats(card) {
  const progress = getProgress(card.id);
  const attempts = progress.attempts;
  return {
    attempts,
    correct: progress.correct,
    wrong: progress.wrong,
    errorRate: attempts ? progress.wrong / attempts : 0,
    accuracy: attempts ? progress.correct / attempts : 0,
    dueAt: progress.dueAt,
    streak: progress.streak,
  };
}

function renderDashboard() {
  const allProgress = state.cards.map((card) => getCardStats(card));
  const attempts = sum(allProgress.map((item) => item.attempts));
  const wrong = sum(allProgress.map((item) => item.wrong));
  const errorRate = attempts ? wrong / attempts : 0;
  const dueCards = getDueCards();
  const categoryStats = getCategoryStats();
  const weakest = getWeakestCategory(categoryStats);
  const predicted = attempts ? Math.round((1 - errorRate) * state.settings.examSize) : null;

  els.metricErrorRate.textContent = attempts ? formatPercent(errorRate) : "0%";
  els.metricAttempts.textContent = `${attempts} attempts`;
  els.metricDue.textContent = String(dueCards.length);
  els.metricReadiness.textContent = predicted === null ? "--" : `${predicted} / ${state.settings.examSize}`;
  els.metricPassline.textContent = `Target ${state.settings.passMark} / ${state.settings.examSize}`;
  els.metricWeakest.textContent = weakest ? weakest.category : "Start practising";

  renderDailyPlan(dueCards, weakest);
  renderCategoryBars(categoryStats);
  renderRecentSessions();
}

function renderDailyPlan(dueCards, weakest) {
  const tasks = [];
  if (dueCards.length) {
    tasks.push(`Review ${Math.min(dueCards.length, 20)} due questions first to refresh short-term memory.`);
  } else {
    tasks.push("No questions are due yet. Do one random drill to keep your rhythm.");
  }
  if (weakest) {
    tasks.push(`Focus on ${weakest.category}; current error rate is ${formatPercent(weakest.errorRate)}.`);
  }
  tasks.push("Run one mock session and aim for at least 32 / 35. Missed questions go into the review queue.");

  els.dailyPlan.replaceChildren(...tasks.map((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
  }));
  els.dailyPlanCount.textContent = `${dueCards.length} due`;
}

function renderCategoryBars(categoryStats) {
  els.categoryCount.textContent = `${categoryStats.length} categories`;
  if (!categoryStats.length) {
    renderEmpty(els.categoryBars);
    return;
  }

  els.categoryBars.replaceChildren(...categoryStats.map((stat) => {
    const row = document.createElement("div");
    row.className = "category-row";

    const name = document.createElement("strong");
    name.textContent = stat.category;

    const bar = document.createElement("div");
    bar.className = "bar";
    const fill = document.createElement("span");
    fill.style.width = `${Math.max(3, stat.errorRate * 100)}%`;
    fill.classList.toggle("is-risk", stat.errorRate >= 0.35 && stat.attempts > 0);
    fill.classList.toggle("is-watch", stat.errorRate >= 0.18 && stat.errorRate < 0.35);
    bar.append(fill);

    const value = document.createElement("span");
    value.textContent = stat.attempts ? formatPercent(stat.errorRate) : "New";

    row.append(name, bar, value);
    return row;
  }));
}

function renderRecentSessions() {
  const recent = state.sessions.slice(0, 5);
  els.recentCount.textContent = `${state.sessions.length} sessions`;
  if (!recent.length) {
    renderEmpty(els.recentSessions);
    return;
  }

  els.recentSessions.replaceChildren(...recent.map((session) => {
    const card = document.createElement("article");
    card.className = "session-card";

    const text = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = `${getModeLabel(session.mode)}: ${session.correct} / ${session.total}`;
    const detail = document.createElement("small");
    detail.textContent = `${formatDate(session.date)} · ${Math.round(session.duration / 1000)} sec`;
    text.append(title, detail);

    const pill = document.createElement("span");
    pill.className = session.passed ? "pill" : "pill is-warn";
    pill.textContent = session.passed ? "On track" : "Keep going";
    card.append(text, pill);
    return card;
  }));
}

function renderQuizSetup() {
  const categories = ["all", ...new Set(state.cards.map((card) => card.category).sort())];
  const current = els.categoryFilter.value || "all";
  els.categoryFilter.replaceChildren(...categories.map((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category === "all" ? "All categories" : category;
    return option;
  }));
  els.categoryFilter.value = categories.includes(current) ? current : "all";
}

function renderReview() {
  const now = Date.now();
  const buckets = [
    { label: "Now", until: now, cards: [] },
    { label: "Later today", until: endOfToday(), cards: [] },
    { label: "Tomorrow", until: endOfToday() + ONE_DAY, cards: [] },
    { label: "Within 7 days", until: now + 7 * ONE_DAY, cards: [] },
    { label: "Later", until: Number.POSITIVE_INFINITY, cards: [] },
  ];

  for (const card of state.cards) {
    const progress = getProgress(card.id);
    const bucket = buckets.find((item) => progress.dueAt <= item.until);
    bucket.cards.push(card);
  }

  const visibleBuckets = buckets.filter((bucket) => bucket.cards.length);
  if (!visibleBuckets.length) {
    renderEmpty(els.reviewTimeline);
    return;
  }

  els.reviewTimeline.replaceChildren(...visibleBuckets.map((bucket) => {
    const article = document.createElement("article");
    article.className = "timeline-card";

    const text = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = bucket.label;
    const detail = document.createElement("small");
    const preview = bucket.cards
      .slice()
      .sort((a, b) => getProgress(a.id).dueAt - getProgress(b.id).dueAt)
      .slice(0, 3)
      .map((card) => `${card.category} · ${formatDue(getProgress(card.id).dueAt)}`)
      .join(" / ");
    detail.textContent = preview || "No preview";
    text.append(title, detail);

    const button = document.createElement("button");
    button.className = bucket.label === "Now" ? "primary-btn" : "secondary-btn";
    button.dataset.review = bucket.cards.map((card) => card.id).join(",");
    button.textContent = `${bucket.cards.length} questions`;

    article.append(text, button);
    return article;
  }));
}

function renderMistakes() {
  els.clearMastered.textContent = state.settings.hideMastered ? "Show all" : "Hide mastered";

  let cards = state.cards
    .filter((card) => getProgress(card.id).wrong > 0)
    .sort((a, b) => {
      const aStats = getCardStats(a);
      const bStats = getCardStats(b);
      return bStats.errorRate - aStats.errorRate || aStats.dueAt - bStats.dueAt;
    });

  if (state.settings.hideMastered) {
    cards = cards.filter((card) => {
      const stats = getCardStats(card);
      return !(stats.accuracy >= 0.85 && stats.streak >= 3);
    });
  }

  if (!cards.length) {
    renderEmpty(els.mistakeList);
    return;
  }

  els.mistakeList.replaceChildren(...cards.map((card) => {
    const stats = getCardStats(card);
    const article = document.createElement("article");
    article.className = "mistake-card";

    const text = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = card.question;
    const detail = document.createElement("small");
    detail.textContent = `${card.category} · missed ${stats.wrong}/${stats.attempts} · ${formatDue(stats.dueAt)}`;
    text.append(title, detail);

    const button = document.createElement("button");
    button.className = "secondary-btn";
    button.dataset.cardId = card.id;
    button.textContent = "Review";
    article.append(text, button);
    return article;
  }));
}

function renderEmpty(container) {
  container.replaceChildren(els.emptyTemplate.content.firstElementChild.cloneNode(true));
}

function startQuiz(mode, customIds = null) {
  const selectedCategory = els.categoryFilter.value || "all";
  const queue = customIds ? customIds.map(getCard).filter(Boolean) : chooseCards(mode, selectedCategory);

  if (!queue.length) {
    showTab("quiz");
    els.quizShell.hidden = false;
    els.quizModeLabel.textContent = "No questions";
    els.quizCounter.textContent = "0 / 0";
    els.quizProgressBar.style.width = "0%";
    els.questionCategory.textContent = selectedCategory === "all" ? "All categories" : selectedCategory;
    els.questionDue.textContent = "Empty queue";
    els.questionText.textContent = "No questions are available. Import your mistakes or reset the demo deck.";
    els.answerOptions.replaceChildren();
    els.toggleTranslation.hidden = true;
    els.translationPanel.hidden = true;
    els.answerFeedback.hidden = true;
    els.skipQuestion.disabled = true;
    els.nextQuestion.disabled = true;
    return;
  }

  activeSession = {
    id: `session-${Date.now()}`,
    mode,
    modeLabel: getModeLabel(mode),
    queue: queue.map((card) => card.id),
    index: 0,
    correct: 0,
    answered: false,
    selectedIndex: null,
    startedAt: Date.now(),
    answers: [],
    translationVisible: false,
    finished: false,
  };

  showTab("quiz");
  els.quizShell.hidden = false;
  els.skipQuestion.disabled = false;
  renderQuestion();
}

function chooseCards(mode, selectedCategory) {
  let cards = state.cards.filter((card) => selectedCategory === "all" || card.category === selectedCategory);
  if (!cards.length) return [];

  if (mode === "due") {
    const due = cards
      .filter((card) => getProgress(card.id).dueAt <= Date.now())
      .sort((a, b) => getProgress(a.id).dueAt - getProgress(b.id).dueAt);
    return (due.length ? due : sortByWeakness(cards)).slice(0, 20);
  }

  if (mode === "weak") {
    return sortByWeakness(cards).slice(0, 20);
  }

  if (mode === "mock") {
    const weak = sortByWeakness(cards).slice(0, Math.min(12, cards.length));
    const remaining = shuffle(cards.filter((card) => !weak.some((item) => item.id === card.id)));
    return shuffle([...weak, ...remaining]).slice(0, Math.min(state.settings.examSize, cards.length));
  }

  return shuffle(cards).slice(0, Math.min(20, cards.length));
}

function sortByWeakness(cards) {
  return cards.slice().sort((a, b) => {
    const aStats = getCardStats(a);
    const bStats = getCardStats(b);
    const aScore = aStats.errorRate + (aStats.attempts === 0 ? 0.18 : 0) + (aStats.dueAt <= Date.now() ? 0.12 : 0);
    const bScore = bStats.errorRate + (bStats.attempts === 0 ? 0.18 : 0) + (bStats.dueAt <= Date.now() ? 0.12 : 0);
    return bScore - aScore;
  });
}

function renderQuestion() {
  const card = getCard(activeSession.queue[activeSession.index]);
  const progress = getProgress(card.id);
  const counter = `${activeSession.index + 1} / ${activeSession.queue.length}`;
  const percent = (activeSession.index / activeSession.queue.length) * 100;

  activeSession.answered = false;
  activeSession.selectedIndex = null;
  activeSession.translationVisible = false;

  els.quizModeLabel.textContent = activeSession.modeLabel;
  els.quizCounter.textContent = counter;
  els.quizProgressBar.style.width = `${percent}%`;
  els.questionCategory.textContent = card.category;
  els.questionDue.textContent = progress.attempts ? formatDue(progress.dueAt) : "New";
  els.questionText.textContent = card.question;
  els.answerFeedback.hidden = true;
  els.answerFeedback.replaceChildren();
  els.nextQuestion.disabled = true;
  els.nextQuestion.textContent = "Next";
  els.skipQuestion.disabled = false;

  els.answerOptions.replaceChildren(...card.options.map((option, index) => {
    if (!card.options.length && card.answerText) return null;
    const button = document.createElement("button");
    button.className = "option-btn";
    button.dataset.index = String(index);

    const key = document.createElement("span");
    key.className = "option-key";
    key.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = option;

    button.append(key, text);
    return button;
  }).filter(Boolean));
  if (!card.options.length && card.answerText) {
    renderFlashcardPrompt(card);
  }
  renderTranslation();
}

function renderFlashcardPrompt(card) {
  const note = document.createElement("div");
  note.className = "flashcard-note";
  note.textContent = card.verificationStatus === "verified"
    ? "Official question. Answer checked against the linked Road Code section."
    : "Official question. Use the linked Road Code section before marking yourself.";

  const reveal = document.createElement("button");
  reveal.className = "option-btn";
  reveal.dataset.action = "reveal";
  reveal.innerHTML = '<span class="option-key">?</span><span>Reveal official answer</span>';

  els.answerOptions.replaceChildren(note, reveal);
}

function revealFlashcardAnswer() {
  const card = getCard(activeSession.queue[activeSession.index]);
  showAnswerFeedback(card, 0, true, { revealOnly: true });

  const gotIt = document.createElement("button");
  gotIt.className = "option-btn";
  gotIt.dataset.action = "got-it";
  gotIt.innerHTML = '<span class="option-key">G</span><span>Got it</span>';

  const missedIt = document.createElement("button");
  missedIt.className = "option-btn";
  missedIt.dataset.action = "missed-it";
  missedIt.innerHTML = '<span class="option-key">!</span><span>Missed it</span>';

  els.answerOptions.replaceChildren(gotIt, missedIt);
}

function renderTranslation() {
  if (!activeSession || activeSession.finished) {
    els.toggleTranslation.hidden = true;
    els.translationPanel.hidden = true;
    els.translationPanel.replaceChildren();
    return;
  }

  const card = getCard(activeSession.queue[activeSession.index]);
  if (!hasChineseTranslation(card)) {
    els.toggleTranslation.hidden = true;
    els.translationPanel.hidden = true;
    els.translationPanel.replaceChildren();
    return;
  }

  els.toggleTranslation.hidden = false;
  els.toggleTranslation.textContent = activeSession.translationVisible
    ? "Hide Chinese translation"
    : "Show Chinese translation";
  els.translationPanel.hidden = !activeSession.translationVisible;

  if (!activeSession.translationVisible) {
    els.translationPanel.replaceChildren();
    return;
  }

  const title = document.createElement("strong");
  title.textContent = "Chinese translation";

  const question = document.createElement("p");
  question.textContent = card.zh.question || "No Chinese question translation.";

  const list = document.createElement("ol");
  list.className = "translation-options";
  for (const [index, option] of card.options.entries()) {
    const item = document.createElement("li");
    const zhOption = card.zh.options[index] || option;
    item.textContent = `${String.fromCharCode(65 + index)}. ${zhOption}`;
    list.append(item);
  }

  const explanation = document.createElement("p");
  explanation.textContent = card.zh.explanation || "No Chinese explanation.";

  els.translationPanel.replaceChildren(title, question, list, explanation);
}

function hasChineseTranslation(card) {
  return Boolean(
    card.zh?.question ||
      card.zh?.explanation ||
      (Array.isArray(card.zh?.options) && card.zh.options.some(Boolean)),
  );
}

function answerCurrentQuestion(selectedIndex, forcedCorrect = null) {
  const card = getCard(activeSession.queue[activeSession.index]);
  const correct = forcedCorrect === null ? selectedIndex === card.answerIndex : forcedCorrect;
  activeSession.answered = true;
  activeSession.selectedIndex = selectedIndex;
  activeSession.correct += correct ? 1 : 0;
  activeSession.answers.push({
    cardId: card.id,
    selectedIndex,
    correct,
    category: card.category,
  });

  updateProgress(card.id, correct, selectedIndex, activeSession.mode);
  saveState();
  showAnswerFeedback(card, selectedIndex, correct);
  els.nextQuestion.disabled = false;
  els.skipQuestion.disabled = true;
  els.quizProgressBar.style.width = `${((activeSession.index + 1) / activeSession.queue.length) * 100}%`;
  renderDashboard();
  renderReview();
  renderMistakes();
}

function showAnswerFeedback(card, selectedIndex, correct, options = {}) {
  els.answerOptions.querySelectorAll(".option-btn").forEach((button) => {
    const index = Number(button.dataset.index);
    button.classList.toggle("is-selected", index === selectedIndex);
    button.classList.toggle("is-correct", index === card.answerIndex);
    button.classList.toggle("is-wrong", index === selectedIndex && !correct);
  });

  const title = document.createElement("strong");
  title.textContent = options.revealOnly ? "Official answer" : correct ? "Correct" : "Needs review";

  const answer = document.createElement("div");
  answer.textContent = card.answerText
    ? `Answer: ${card.answerText}`
    : `Correct answer: ${String.fromCharCode(65 + card.answerIndex)}. ${card.options[card.answerIndex]}`;

  const explanation = document.createElement("div");
  explanation.textContent = card.explanation || "This question has been added to your review queue.";

  els.answerFeedback.replaceChildren(title, answer, explanation);
  if (card.sourceUrl) {
    const source = document.createElement("a");
    source.href = card.sourceUrl;
    source.target = "_blank";
    source.rel = "noreferrer";
    source.textContent = "View source";
    els.answerFeedback.append(source);
  }
  els.answerFeedback.hidden = false;
  if (options.revealOnly) {
    els.nextQuestion.disabled = true;
    els.skipQuestion.disabled = true;
  }
}

function updateProgress(cardId, correct, selectedIndex, mode) {
  const progress = getProgress(cardId);
  progress.attempts += 1;
  progress.lastSeen = Date.now();

  if (correct) {
    progress.correct += 1;
    progress.streak += 1;
    progress.ease = Math.min(3.2, progress.ease + 0.08);
    progress.intervalDays = getNextInterval(progress.streak, progress.intervalDays, progress.ease);
  } else {
    progress.wrong += 1;
    progress.lapses += 1;
    progress.streak = 0;
    progress.ease = Math.max(1.35, progress.ease - 0.22);
    progress.intervalDays = 10 / (24 * 60);
  }

  progress.dueAt = Date.now() + progress.intervalDays * ONE_DAY;
  progress.history.unshift({
    at: Date.now(),
    correct,
    selectedIndex,
    mode,
  });
  progress.history = progress.history.slice(0, 30);
}

function getNextInterval(streak, currentInterval, ease) {
  if (streak <= 1) return 1;
  if (streak === 2) return 3;
  if (streak === 3) return 7;
  const next = Math.max(10, Math.round((currentInterval || 7) * ease));
  return Math.min(next, 60);
}

function finishSession() {
  const total = activeSession.queue.length;
  const target = Math.ceil(total * (state.settings.passMark / state.settings.examSize));
  const passed = activeSession.correct >= target;
  const duration = Date.now() - activeSession.startedAt;

  state.sessions.unshift({
    id: activeSession.id,
    date: Date.now(),
    mode: activeSession.mode,
    modeLabel: activeSession.modeLabel,
    total,
    correct: activeSession.correct,
    target,
    passed,
    duration,
    answers: activeSession.answers,
  });
  state.sessions = state.sessions.slice(0, 50);
  saveState();

  activeSession.finished = true;
  els.quizModeLabel.textContent = "Complete";
  els.quizCounter.textContent = `${total} / ${total}`;
  els.quizProgressBar.style.width = "100%";
  els.questionCategory.textContent = activeSession.modeLabel;
  els.questionDue.textContent = passed ? "On track" : "Keep practising";
  els.questionText.textContent = `Session complete: ${activeSession.correct} / ${total}`;
  els.answerOptions.replaceChildren();
  els.toggleTranslation.hidden = true;
  els.translationPanel.hidden = true;
  els.translationPanel.replaceChildren();

  const title = document.createElement("strong");
  title.textContent = passed ? "You reached the session target" : "Close, but keep drilling";
  const detail = document.createElement("div");
  detail.textContent = `Scaled from 32 / 35, this session target was ${target} / ${total}. Missed questions have been scheduled for review.`;
  els.answerFeedback.replaceChildren(title, detail);
  els.answerFeedback.hidden = false;

  els.skipQuestion.disabled = true;
  els.nextQuestion.disabled = false;
  els.nextQuestion.textContent = "Start another set";
  render();
}

function getDueCards() {
  return state.cards
    .filter((card) => getProgress(card.id).dueAt <= Date.now())
    .sort((a, b) => getProgress(a.id).dueAt - getProgress(b.id).dueAt);
}

function getCategoryStats() {
  const map = new Map();
  for (const card of state.cards) {
    const progress = getProgress(card.id);
    const current = map.get(card.category) || {
      category: card.category,
      cards: 0,
      attempts: 0,
      correct: 0,
      wrong: 0,
      errorRate: 0,
    };
    current.cards += 1;
    current.attempts += progress.attempts;
    current.correct += progress.correct;
    current.wrong += progress.wrong;
    map.set(card.category, current);
  }

  return [...map.values()]
    .map((stat) => ({
      ...stat,
      errorRate: stat.attempts ? stat.wrong / stat.attempts : 0,
    }))
    .sort((a, b) => {
      if (a.attempts === 0 && b.attempts > 0) return 1;
      if (b.attempts === 0 && a.attempts > 0) return -1;
      return b.errorRate - a.errorRate || a.category.localeCompare(b.category);
    });
}

function getWeakestCategory(categoryStats) {
  const attempted = categoryStats.filter((stat) => stat.attempts >= 2);
  if (attempted.length) return attempted[0];
  return categoryStats.find((stat) => stat.attempts > 0) || null;
}

function importQuestions() {
  const text = els.importText.value.trim();
  if (!text) {
    setImportStatus("Nothing to import");
    return;
  }

  try {
    const incoming = parseImport(text);
    if (!incoming.cards.length) {
      setImportStatus("No questions found");
      return;
    }

    const existingById = new Map(state.cards.map((card, index) => [card.id, index]));
    const existingByQuestion = new Map(state.cards.map((card, index) => [normalizeText(card.question), index]));
    let added = 0;
    let updated = 0;

    for (const rawCard of incoming.cards) {
      const card = normalizeCard(rawCard);
      if (!card.question || card.options.length < 2) continue;

      const questionKey = normalizeText(card.question);
      const existingIndex = existingById.get(card.id) ?? existingByQuestion.get(questionKey);
      if (existingIndex === undefined) {
        state.cards.push(card);
        ensureProgress(state, card.id);
        existingById.set(card.id, state.cards.length - 1);
        existingByQuestion.set(questionKey, state.cards.length - 1);
        added += 1;
      } else {
        const oldId = state.cards[existingIndex].id;
        state.cards[existingIndex] = { ...card, id: oldId };
        updated += 1;
      }
    }

    if (incoming.progress) {
      state.progress = { ...state.progress, ...incoming.progress };
      prepareState(state);
    }

    if (incoming.sessions) {
      state.sessions = [...incoming.sessions, ...state.sessions].slice(0, 50);
    }

    saveState();
    els.importText.value = "";
    setImportStatus(`Added ${added}, updated ${updated}`);
    render();
  } catch (error) {
    setImportStatus(error.message || "Import failed");
  }
}

function parseImport(text) {
  if (text.startsWith("{") || text.startsWith("[")) {
    const data = JSON.parse(text);
    if (Array.isArray(data)) {
      return { cards: data };
    }
    if (Array.isArray(data.cards)) {
      return {
        cards: data.cards,
        progress: data.progress || null,
        sessions: Array.isArray(data.sessions) ? data.sessions : null,
      };
    }
    throw new Error("JSON must be an array of questions or contain a cards field");
  }

  return { cards: csvToCards(text) };
}

function csvToCards(text) {
  const rows = parseCSV(text);
  if (rows.length < 2) return [];
  const header = rows[0].map((cell) => normalizeHeader(cell));

  return rows.slice(1).map((row) => {
    const get = (...names) => {
      for (const name of names.map(normalizeHeader)) {
        const index = header.indexOf(name);
        if (index >= 0) return row[index] || "";
      }
      return "";
    };

    const category = get("category") || "Imported";
    const question = get("question");
    const options = [
      get("optionA", "A", "choiceA"),
      get("optionB", "B", "choiceB"),
      get("optionC", "C", "choiceC"),
      get("optionD", "D", "choiceD"),
    ].filter(Boolean);
    const packedOptions = get("options");
    const finalOptions = options.length ? options : packedOptions.split("|").map((item) => item.trim()).filter(Boolean);
    const answer = get("answer");
    const zhOptions = [
      get("zhOptionA", "zhA"),
      get("zhOptionB", "zhB"),
      get("zhOptionC", "zhC"),
      get("zhOptionD", "zhD"),
    ];
    const packedZhOptions = get("zhOptions");
    const finalZhOptions = zhOptions.some(Boolean)
      ? zhOptions
      : packedZhOptions.split("|").map((item) => item.trim());

    return {
      id: `user-${hashString(`${category}:${question}`)}`,
      category,
      question,
      options: finalOptions,
      answerIndex: answerToIndex(answer, finalOptions),
      explanation: get("explanation"),
      zh: {
        question: get("zhQuestion"),
        options: finalZhOptions,
        explanation: get("zhExplanation"),
      },
      sourceUrl: get("sourceUrl", "source"),
    };
  });
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell.trim());
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function addManualCard(event) {
  event.preventDefault();
  const data = new FormData(els.manualForm);
  const category = data.get("category");
  const question = data.get("question");
  const options = ["optionA", "optionB", "optionC", "optionD"].map((name) => data.get(name));
  const zhOptions = ["zhOptionA", "zhOptionB", "zhOptionC", "zhOptionD"].map((name) => data.get(name));
  const answerIndex = answerToIndex(data.get("answer"), options);
  const card = normalizeCard({
    id: `user-${hashString(`${category}:${question}`)}`,
    category,
    question,
    options,
    answerIndex,
    explanation: data.get("explanation"),
    zh: {
      question: data.get("zhQuestion"),
      options: zhOptions,
      explanation: data.get("zhExplanation"),
    },
    sourceUrl: data.get("sourceUrl"),
  });

  const existingIndex = state.cards.findIndex((item) => normalizeText(item.question) === normalizeText(card.question));
  if (existingIndex >= 0) {
    state.cards[existingIndex] = { ...card, id: state.cards[existingIndex].id };
  } else {
    state.cards.push(card);
    ensureProgress(state, card.id);
  }

  els.manualForm.reset();
  saveState();
  render();
  showTab("quiz");
}

function answerToIndex(answer, options) {
  const normalized = String(answer || "").trim();
  const letter = normalized.toUpperCase();
  if (/^[A-D]$/.test(letter)) return letter.charCodeAt(0) - 65;
  if (/^\d+$/.test(normalized)) {
    const number = Number(normalized);
    if (number >= 0 && number < options.length) return number;
    if (number >= 1 && number <= options.length) return number - 1;
  }
  const textIndex = options.findIndex((option) => normalizeText(option) === normalizeText(normalized));
  return textIndex >= 0 ? textIndex : 0;
}

function resetDemoDeck() {
  if (!confirm("Resetting the demo deck will clear your current study history. Continue?")) return;
  state = prepareState({
    cards: structuredClone(getBuiltInCards()),
    progress: {},
    sessions: [],
    settings: {
      examSize: EXAM_SIZE,
      passMark: PASS_MARK,
      hideMastered: false,
    },
  });
  saveState();
  render();
  setImportStatus("Demo deck reset");
}

function exportData() {
  const payload = {
    app: "NZ Theory Coach",
    exportedAt: new Date().toISOString(),
    cards: state.cards,
    progress: state.progress,
    sessions: state.sessions,
    settings: state.settings,
  };
  downloadFile(
    `nz-theory-coach-${new Date().toISOString().slice(0, 10)}.json`,
    JSON.stringify(payload, null, 2),
    "application/json",
  );
}

function downloadTemplate() {
  const csv = [
    "category,question,optionA,optionB,optionC,optionD,answer,explanation,zhQuestion,zhOptionA,zhOptionB,zhOptionC,zhOptionD,zhExplanation,sourceUrl",
    '"Signs","What does this sign mean?","Stop","Give way","No entry","No stopping","A","Add your note here","这个标志是什么意思？","停车","让行","禁止进入","禁止停车","在这里添加中文解释。","https://www.nzta.govt.nz/roadcode"',
  ].join("\n");
  downloadFile("nz-theory-import-template.csv", csv, "text/csv");
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function setImportStatus(text) {
  els.importStatus.textContent = text;
}

function getModeLabel(mode) {
  return {
    due: "Due review",
    weak: "Weak categories",
    mock: "Mock test",
    random: "Random drill",
    custom: "Custom review",
  }[mode] || "Practice";
}

function getWeaknessLabel(stats) {
  if (!stats.attempts) return "New";
  if (stats.errorRate >= 0.35) return "High risk";
  if (stats.errorRate >= 0.18) return "Needs work";
  return "Stable";
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-NZ", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function formatDue(timestamp) {
  const now = Date.now();
  const diff = timestamp - now;
  if (diff <= 60 * 1000) return "Due now";
  if (diff < 60 * 60 * 1000) return `Due in ${Math.ceil(diff / (60 * 1000))} min`;
  if (diff < ONE_DAY) return `Due in ${Math.ceil(diff / (60 * 60 * 1000))} hr`;
  if (diff < 7 * ONE_DAY) return `Due in ${Math.ceil(diff / ONE_DAY)} days`;
  return formatDate(timestamp);
}

function endOfToday() {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  return date.getTime();
}

function normalizeHeader(text) {
  return String(text || "").toLowerCase().replace(/[\s_-]/g, "");
}

function normalizeText(text) {
  return String(text || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function hashString(text) {
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function shuffle(items) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}
