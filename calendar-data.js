/* Eritrean / Ethiopian Orthodox Tewahedo calendar helpers. Offline. */
window.TEWAHEDO = (function () {
  const MONTHS = [
    { en: "Meskerem", geez: "መስከረም" },
    { en: "Tikimt", geez: "ጥቅምት" },
    { en: "Hidar", geez: "ኅዳር" },
    { en: "Tahsas", geez: "ታኅሣሥ" },
    { en: "Tir", geez: "ጥር" },
    { en: "Yekatit", geez: "የካቲት" },
    { en: "Megabit", geez: "መጋቢት" },
    { en: "Miazia", geez: "ሚያዝያ" },
    { en: "Ginbot", geez: "ግንቦት" },
    { en: "Sene", geez: "ሰኔ" },
    { en: "Hamle", geez: "ሐምሌ" },
    { en: "Nehase", geez: "ነሐሴ" },
    { en: "Pagumen", geez: "ጳጉሜን" }
  ];
  const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const EVANGELISTS = ["John", "Matthew", "Mark", "Luke"];

  function isGregLeap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }

  function toEthiopic(date) {
    const gy = date.getFullYear(), gm = date.getMonth() + 1, gd = date.getDate();
    const newYearDay = isGregLeap(gy + 1) ? 12 : 11; // Sep 11, or 12 in the year before a Greg leap
    let ey, start;
    const sepNew = new Date(gy, 8, newYearDay);
    if (date >= sepNew) {
      ey = gy - 7;
      start = sepNew;
    } else {
      ey = gy - 8;
      const prevNY = isGregLeap(gy) ? 12 : 11;
      start = new Date(gy - 1, 8, prevNY);
    }
    const doy = Math.floor((date - start) / 86400000) + 1;
    let month = Math.ceil(doy / 30);
    let day = doy - (month - 1) * 30;
    if (month > 13) { month = 13; day = doy - 360; }
    return { year: ey, month: month, day: day, doy: doy };
  }

  const FIXED = {
    "1-1": "Enkutatash — Ethiopian / Eritrean New Year",
    "1-17": "Meskel — Finding of the True Cross",
    "3-6": "Feast of the Archangel Gabriel (Hidar)",
    "3-21": "Tsion Maryam — St. Mary of Zion",
    "4-19": "Feast of St. Gabriel (Tahsas)",
    "4-29": "Genna — Nativity of our Lord",
    "5-6": "Feast of the Circumcision / St. John",
    "5-11": "Timket — Epiphany, Baptism of Christ",
    "5-12": "Synaxis after Timket",
    "6-8": "Kiddus Mikael (Yekatit)",
    "7-10": "Feast of the Cross in Lent season (when it falls)",
    "7-29": "Sene Tselot / mid-year commemorations",
    "9-1": "Lideta — Nativity of the Theotokos",
    "10-12": "Feast of St. Michael (Sene 12)",
    "10-21": "Nativity of St. John the Baptist",
    "11-5": "Feast of the Apostles (near Hamle)",
    "11-12": "Sts. Peter and Paul (Hamle 5–12 season)",
    "12-16": "Filseta — Assumption of the Holy Virgin",
    "12-21": "St. Mary commemorations of Nehase"
  };

  /* Alexandrian Easter (Coptic / Tewahedo) as Gregorian date, 2025–2029 */
  const EASTER_G = {
    2025: [4, 20],
    2026: [4, 12],
    2027: [5, 2],
    2028: [4, 16],
    2029: [4, 8]
  };

  function easterGreg(y) {
    const p = EASTER_G[y];
    if (!p) return null;
    return new Date(y, p[0] - 1, p[1]);
  }

  function daysBetween(a, b) { return Math.round((b - a) / 86400000); }

  function season(date) {
    const y = date.getFullYear();
    const pascha = easterGreg(y) || easterGreg(y - 1);
    if (!pascha) return { name: "", fast: null };
    const d = daysBetween(pascha, date);
    // Great Lent starts 55 days before Pascha in Tewahedo counting (Abiy Tsom)
    if (d >= -55 && d < -8) return { name: "Abiy Tsom — Great Lent (Hudadi)", fast: "Great Lent · fasting" };
    if (d >= -8 && d < -2) return { name: "Holy Week", fast: "Holy Week · strict fast" };
    if (d === -2) return { name: "Good Friday — Siqlet", fast: "Crucifixion · strict fast" };
    if (d === 0) return { name: "Tinsae — Holy Pascha / Resurrection", fast: "Feast · no fast" };
    if (d === 39) return { name: "Erget — Ascension", fast: "Feast · no fast" };
    if (d === 49) return { name: "Peraqlitos — Pentecost", fast: "Feast · no fast" };
    if (d > 0 && d <= 50) return { name: "Zemen Tinsae — Season of Resurrection", fast: null };
    return { name: "", fast: null };
  }

  function fastOfDay(date, eth) {
    const wd = date.getDay();
    const key = eth.month + "-" + eth.day;
    const seas = season(date);
    if (FIXED[key] && /Genna|Timket|Meskel|Tinsae|Filseta|Enkutatash|Lideta/.test(FIXED[key])) {
      return "Feast day · fast lifted";
    }
    if (seas.fast) return seas.fast;
    // Advent / Tsome Nebiyat: Hidar 15 to Tahsas 29
    if ((eth.month === 3 && eth.day >= 15) || (eth.month === 4 && eth.day < 29)) {
      return "Tsome Nebiyat — Fast of the Prophets (Advent)";
    }
    // Filseta fast: Nehase 1–16
    if (eth.month === 12 && eth.day <= 16) return "Tsome Filseta — Fast of the Assumption";
    // Weekly Wednesday and Friday
    if (wd === 3 || wd === 5) return "Wednesday / Friday fast";
    return "No fast";
  }

  function commemorations(eth) {
    const out = [];
    const f = FIXED[eth.month + "-" + eth.day];
    if (f) out.push(f);
    const cycle = [
      "St. Mary, Mother of God",
      "The holy angels",
      "St. John the Baptist",
      "St. Stephen the Protomartyr",
      "St. George the Martyr",
      "St. Tekle Haymanot",
      "Abune Aregawi / the Nine Saints",
      "St. Michael the Archangel",
      "St. Gabriel the Archangel",
      "The righteous kings of Axum",
      "St. Yared the Melodist",
      "The martyrs of the Tewahedo Church"
    ];
    out.push(cycle[(eth.day + eth.month) % cycle.length]);
    return out;
  }

  function evangelistName(ethYear) {
    return EVANGELISTS[ethYear % 4];
  }

  /* Personal daily cycle shaped like Tewahedo Qidase: prophet, psalm, gospel, epistle.
     Not the official printed Gitsawē for every parish. */
  const GOSPELS = { John: "JHN", Matthew: "MAT", Mark: "MRK", Luke: "LUK" };
  const PROPHETS = ["ISA","JER","EZK","DAN","HOS","AMO","MIC","JOL","OBA","JON","NAM","HAB","ZEP","HAG","ZEC","MAL","SIR","WIS"];
  const EPISTLES = ["ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","HEB","JAS","1PE","1JN"];

  function readingsFor(eth, date) {
    const ev = evangelistName(eth.year);
    const gId = GOSPELS[ev];
    const gChans = (window.BIBLE && window.BIBLE.t[gId] || []).length || 28;
    const gCh = ((eth.doy - 1) % gChans) + 1;
    const psalm = ((eth.doy - 1) % 150) + 1;
    const pr = PROPHETS[(eth.doy - 1) % PROPHETS.length];
    const prChans = (window.BIBLE && window.BIBLE.t[pr] || []).length || 1;
    const prCh = ((eth.doy - 1) % prChans) + 1;
    const ep = EPISTLES[(eth.doy - 1) % EPISTLES.length];
    const epChans = (window.BIBLE && window.BIBLE.t[ep] || []).length || 1;
    const epCh = ((eth.doy - 1) % epChans) + 1;
    const actsCh = ((eth.doy - 1) % 28) + 1;
    return [
      { src: "Psalm", ref: "Psalm " + psalm, b: "PSA", c: psalm, s: 1, e: 999 },
      { src: "Prophet / Wisdom", ref: bookName(pr) + " " + prCh, b: pr, c: prCh, s: 1, e: 999 },
      { src: "Epistle", ref: bookName(ep) + " " + epCh, b: ep, c: epCh, s: 1, e: 999 },
      { src: "Acts", ref: "Acts " + actsCh, b: "ACT", c: actsCh, s: 1, e: 999 },
      { src: "Gospel of " + ev + " (year of " + ev + ")", ref: ev + " " + gCh, b: gId, c: gCh, s: 1, e: 999 }
    ];
  }

  function bookName(id) {
    const b = window.BIBLE && window.BIBLE.books.find(x => x.id === id);
    return b ? b.name : id;
  }

  return { MONTHS, WEEKDAYS, toEthiopic, fastOfDay, commemorations, evangelistName, readingsFor, season };
})();

/* Coptic Orthodox calendar — same Alexandrian months as Tewahedo, different year (Anno Martyrum) and synaxarium. */
window.COPTIC = (function () {
  const MONTHS = [
    { en: "Thoout", cop: "Tout" },
    { en: "Paopi", cop: "Baba" },
    { en: "Hathor", cop: "Hator" },
    { en: "Koiak", cop: "Kiahk" },
    { en: "Tobi", cop: "Toba" },
    { en: "Meshir", cop: "Amshir" },
    { en: "Paremhat", cop: "Baramhat" },
    { en: "Parmouti", cop: "Baramouda" },
    { en: "Pashons", cop: "Bashans" },
    { en: "Paoni", cop: "Baounah" },
    { en: "Epep", cop: "Abib" },
    { en: "Mesori", cop: "Mesra" },
    { en: "Pi Kogi Enavot", cop: "Nasi" }
  ];

  function toCoptic(date) {
    const eth = window.TEWAHEDO.toEthiopic(date);
    return { year: eth.year - 276, month: eth.month, day: eth.day, doy: eth.doy };
  }

  const FIXED = {
    "1-1": "Nayrouz — Coptic New Year",
    "1-17": "Feast of the Cross",
    "2-12": "Archangel Michael (Baba 12)",
    "3-8": "The Four Incorporeal Creatures",
    "3-12": "Archangel Michael (Hathor 12)",
    "3-15": "St. Mina the Wonder-worker",
    "4-3": "Presentation of the Theotokos (Kiahk season)",
    "4-22": "Forefeast of the Nativity",
    "4-28": "Paramoun of the Nativity",
    "4-29": "Nativity of our Lord",
    "5-6": "Circumcision of the Lord",
    "5-11": "Theophany — Baptism of Christ",
    "5-12": "Second day of Theophany",
    "5-13": "Wedding at Cana",
    "6-8": "Presentation of the Lord (Amshir)",
    "7-29": "Annunciation of the Theotokos",
    "8-23": "St. George the Prince of Martyrs",
    "9-1": "Nativity of the Theotokos",
    "9-12": "Archangel Michael (Pashons 12)",
    "9-24": "Entry of the Lord into Egypt",
    "10-13": "Archangel Gabriel",
    "11-5": "Martyrdom of Sts. Peter and Paul",
    "11-12": "Archangel Michael (Abib 12)",
    "12-13": "Transfiguration of the Lord",
    "12-16": "Assumption of the Theotokos"
  };

  const EASTER_G = {
    2025: [4, 20],
    2026: [4, 12],
    2027: [5, 2],
    2028: [4, 16],
    2029: [4, 8]
  };

  function easterGreg(y) {
    const p = EASTER_G[y];
    return p ? new Date(y, p[0] - 1, p[1]) : null;
  }
  function daysBetween(a, b) { return Math.round((b - a) / 86400000); }

  function season(date) {
    const y = date.getFullYear();
    const pascha = easterGreg(y) || easterGreg(y - 1);
    if (!pascha) return { name: "", fast: null };
    const d = daysBetween(pascha, date);
    if (d >= -55 && d < -8) return { name: "Great Lent (Holy Fast)", fast: "Great Lent · fasting" };
    if (d >= -8 && d < -2) return { name: "Holy Pascha Week", fast: "Pascha Week · strict fast" };
    if (d === -2) return { name: "Great Friday", fast: "Crucifixion · strict fast" };
    if (d === 0) return { name: "Glorious Feast of the Resurrection", fast: "Feast · no fast" };
    if (d > 0 && d < 39) return { name: "Fifty Holy Days", fast: null };
    if (d === 39) return { name: "Ascension", fast: "Feast · no fast" };
    if (d === 49) return { name: "Pentecost", fast: "Feast · no fast" };
    return { name: "", fast: null };
  }

  function fastOfDay(date, cop) {
    const wd = date.getDay();
    const key = cop.month + "-" + cop.day;
    const seas = season(date);
    if (FIXED[key] && /Nayrouz|Nativity|Theophany|Resurrection|Assumption|Annunciation|Cross|Transfiguration/.test(FIXED[key])) {
      return "Feast day · fast lifted";
    }
    if (seas.fast) return seas.fast;
    if ((cop.month === 3 && cop.day >= 16) || (cop.month === 4 && cop.day < 29)) {
      return "Advent fast (Kiahk)";
    }
    if (cop.month === 12 && cop.day <= 16) return "Fast of the Theotokos";
    if (wd === 3 || wd === 5) return "Wednesday / Friday fast";
    return "No fast";
  }

  function commemorations(cop) {
    const out = [];
    const f = FIXED[cop.month + "-" + cop.day];
    if (f) out.push(f);
    if (cop.day === 12) out.push("Monthly commemoration of the Archangel Michael");
    if (cop.day === 21) out.push("Monthly commemoration of the Theotokos");
    if (cop.day === 29) out.push("Monthly commemoration of the Annunciation and Resurrection");
    const cycle = [
      "St. Mary, the Theotokos",
      "The heavenly hosts",
      "St. John the Baptist",
      "St. Mark the Apostle, Beholder of God",
      "St. Athanasius the Apostolic",
      "St. Cyril of Alexandria",
      "St. Anthony the Great",
      "St. Macarius the Great",
      "St. Mina the Wonder-worker",
      "St. George the Prince of Martyrs",
      "The martyrs of the Coptic Church",
      "The monastic fathers of Scetis"
    ];
    out.push(cycle[(cop.day + cop.month) % cycle.length]);
    return out;
  }

  const GOSPELS = ["JHN", "MAT", "MRK", "LUK"];
  const GNAMES = { JHN: "John", MAT: "Matthew", MRK: "Mark", LUK: "Luke" };
  const PROPHETS = ["ISA","JER","EZK","DAN","HOS","AMO","MIC","JOL","OBA","JON","NAM","HAB","ZEP","HAG","ZEC","MAL","SIR","WIS"];
  const EPISTLES = ["ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","HEB","JAS","1PE","1JN"];

  function bookName(id) {
    const b = window.BIBLE && window.BIBLE.books.find(x => x.id === id);
    return b ? b.name : id;
  }

  function readingsFor(cop) {
    const gId = GOSPELS[cop.year % 4];
    const gChans = (window.BIBLE && window.BIBLE.t[gId] || []).length || 28;
    const gCh = ((cop.doy - 1) % gChans) + 1;
    const psalm = ((cop.doy - 1) % 150) + 1;
    const pr = PROPHETS[(cop.doy - 1) % PROPHETS.length];
    const prChans = (window.BIBLE && window.BIBLE.t[pr] || []).length || 1;
    const prCh = ((cop.doy - 1) % prChans) + 1;
    const ep = EPISTLES[(cop.doy - 1) % EPISTLES.length];
    const epChans = (window.BIBLE && window.BIBLE.t[ep] || []).length || 1;
    const epCh = ((cop.doy - 1) % epChans) + 1;
    const actsCh = ((cop.doy - 1) % 28) + 1;
    return [
      { src: "Psalm", ref: "Psalm " + psalm, b: "PSA", c: psalm, s: 1, e: 999 },
      { src: "Prophet / Wisdom", ref: bookName(pr) + " " + prCh, b: pr, c: prCh, s: 1, e: 999 },
      { src: "Pauline", ref: bookName(ep) + " " + epCh, b: ep, c: epCh, s: 1, e: 999 },
      { src: "Praxis (Acts)", ref: "Acts " + actsCh, b: "ACT", c: actsCh, s: 1, e: 999 },
      { src: "Gospel of " + GNAMES[gId], ref: GNAMES[gId] + " " + gCh, b: gId, c: gCh, s: 1, e: 999 }
    ];
  }

  return { MONTHS, toCoptic, fastOfDay, commemorations, readingsFor, season };
})();

