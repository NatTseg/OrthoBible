window.AGPEYA = {
  about: "The Book of Hours of the Alexandrian Church — the tradition Eritrean Tewahedo shares with Coptic Orthodoxy through the See of St. Mark. Each hour remembers a moment in the Lord’s Passion and Resurrection. Psalms and Gospels are from the bundled English Bible. This is a home prayer companion, not a parish service book.",
  hours: [
    {
      id: "prime",
      name: "Prime",
      hour: "First Hour",
      when: "About 6 a.m. — on rising",
      theme: "The Resurrection of Christ. Begin the day in the light of the empty tomb.",
      psalms: [1, 2, 3, 4, 5, 6, 8, 11, 12, 14, 15, 18, 24, 26, 62, 66, 69, 112, 142],
      gospel: { b: "JHN", c: 1, s: 1, e: 17 },
      litanies: [
        "O true Light, who gives light to every man coming into the world, come and shine on us, for You are the true Light who shines on the world.",
        "Let us see this day in Your light, and let us not walk in darkness, but have the light of life.",
        "O Lord, You have raised us from the sleep of night; raise us from the sleep of sin, and shine Your face upon us."
      ]
    },
    {
      id: "terce",
      name: "Terce",
      hour: "Third Hour",
      when: "About 9 a.m.",
      theme: "The descent of the Holy Spirit at Pentecost, and the Lord’s condemnation by Pilate.",
      psalms: [19, 22, 23, 24, 25, 28, 29, 33, 40, 42, 44, 45, 46],
      gospel: { b: "JHN", c: 14, s: 26, e: 31 },
      extraGospel: { b: "JHN", c: 15, s: 1, e: 7 },
      litanies: [
        "O Lord, who at the third hour sent down Your Holy Spirit upon Your apostles, do not take Him from us, but renew Him in us, we pray.",
        "O Spirit of truth, who proceeds from the Father, come and dwell in us, cleanse us from every stain, and save our souls, O Good One."
      ]
    },
    {
      id: "sext",
      name: "Sext",
      hour: "Sixth Hour",
      when: "About noon",
      theme: "The Crucifixion. Christ is lifted up on the Cross for the life of the world.",
      psalms: [53, 56, 60, 66, 69, 83, 84, 85, 86, 90, 92],
      gospel: { b: "MAT", c: 27, s: 45, e: 54 },
      litanies: [
        "O You who on the sixth day and at the sixth hour were nailed to the Cross for the sin which Adam dared in Paradise, tear up the record of our sins, O Christ our God, and save us.",
        "You have worked salvation in the midst of the earth, O Christ our God. Stretch out Your pure hands and gather all the nations to knowledge of You."
      ]
    },
    {
      id: "none",
      name: "None",
      hour: "Ninth Hour",
      when: "About 3 p.m.",
      theme: "The death of the Lord in the flesh, and the confession of the thief on the right.",
      psalms: [95, 96, 97, 98, 99, 100, 109, 110, 111, 112, 114, 115],
      gospel: { b: "LUK", c: 23, s: 39, e: 49 },
      litanies: [
        "O You who at the ninth hour tasted death in the flesh for our sake, put to death our carnal mind, O Christ our God, and save us.",
        "Remember us, O Lord, when You come into Your kingdom, as You remembered the thief who cried to You from the Cross."
      ]
    },
    {
      id: "vespers",
      name: "Vespers",
      hour: "Eleventh Hour",
      when: "About 5 p.m. — toward evening",
      theme: "The taking down of the Lord’s body from the Cross, wrapped in linen and spices.",
      psalms: [116, 117, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128],
      gospel: { b: "LUK", c: 4, s: 38, e: 41 },
      extraGospel: { b: "LUK", c: 24, s: 28, e: 32 },
      litanies: [
        "O You who at this hour granted resurrection to the departed by Your coming down to those in Hades, fill us with Your light and grant us life.",
        "Let my prayer be set forth before You as incense, the lifting up of my hands as the evening sacrifice."
      ]
    },
    {
      id: "compline",
      name: "Compline",
      hour: "Twelfth Hour",
      when: "About 6 p.m. — before sleep",
      theme: "The laying of Christ’s body in the tomb. Sleep is a little death; we commit ourselves to God.",
      psalms: [129, 130, 131, 132, 133, 136, 137, 140, 141, 145, 146, 147],
      gospel: { b: "LUK", c: 2, s: 25, e: 32 },
      litanies: [
        "Behold, I am about to sleep. Cover me under the shadow of Your wings. Guard my soul from every evil.",
        "Into Your hands, O Lord, I commend my spirit. You have redeemed me, O Lord, God of truth.",
        "Grant us, O Lord, a peaceful night, a blameless sleep, and a holy rising, through the prayers of the Theotokos and all the saints."
      ]
    },
    {
      id: "midnight1",
      name: "Midnight — First Watch",
      hour: "Midnight, Watch I",
      when: "Night — first watch",
      theme: "The first prayer of the Lord in Gethsemane. “Watch and pray.”",
      psalms: [3, 6, 12, 69, 70, 85, 90],
      gospel: { b: "MAT", c: 25, s: 1, e: 13 },
      litanies: [
        "Arise, you who sleep, and Christ will give you light. Behold the Bridegroom comes at midnight.",
        "My soul, my soul, arise. Why do you sleep? The end is drawing near, and you will be troubled. Awake then, that Christ our God may spare you."
      ]
    },
    {
      id: "midnight2",
      name: "Midnight — Second Watch",
      hour: "Midnight, Watch II",
      when: "Night — second watch",
      theme: "The second prayer in the garden. The disciples sleep; the Lord keeps watch for us.",
      psalms: [119],
      psalmNote: "In the full Agpeya this watch reads long portions of Psalm 119 (the Psalm of the Law). Read as much as you can with attention.",
      gospel: { b: "LUK", c: 7, s: 36, e: 50 },
      litanies: [
        "Give me understanding, O Lord, and I will search Your law, and keep it with my whole heart.",
        "Your word is a lamp to my feet and a light to my path."
      ]
    },
    {
      id: "midnight3",
      name: "Midnight — Third Watch",
      hour: "Midnight, Watch III",
      when: "Night — third watch",
      theme: "The third prayer in Gethsemane, and the coming judgment. Be ready.",
      psalms: [129, 130, 131, 132, 133, 136],
      gospel: { b: "LUK", c: 12, s: 32, e: 46 },
      litanies: [
        "Behold the Bridegroom comes in the middle of the night, and blessed is the servant whom He shall find watching.",
        "O my Judge and my God, at the fearful judgment do not enter into judgment with Your servant, for in Your sight no one living is justified."
      ]
    }
  ],
  common: {
    sign: "In the name of the Father, and of the Son, and of the Holy Spirit, one God. Amen.",
    kyrieShort: "Lord have mercy. Lord have mercy. Lord bless us. Amen.",
    gloria: "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto the ages of ages. Amen.",
    fathers: "Our Father who art in heaven, hallowed be Thy name. Thy kingdom come. Thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. In Christ Jesus our Lord. For Thine is the kingdom, the power, and the glory, forever. Amen.",
    thanksgiving: "Let us give thanks to the beneficent and merciful God, the Father of our Lord, God, and Savior Jesus Christ, for He has covered us, helped us, guarded us, accepted us to Himself, spared us, supported us, and brought us to this hour. Let us also ask Him, the Lord our God, the Almighty, to keep us in all peace this holy day and all the days of our life. O Master, Lord, God the Almighty, the Father of our Lord, God, and Savior Jesus Christ, we thank You for every condition, concerning every condition, and in every condition. For You have covered us, helped us, guarded us, accepted us to Yourself, spared us, supported us, and brought us to this hour.",
    trisagion: "Holy God, Holy Mighty, Holy Immortal, have mercy on us. (three times)\nGlory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto the ages of ages. Amen.\nO Holy Trinity, have mercy on us. O Lord, forgive our sins. O Master, pardon our iniquities. O Holy One, visit and heal our infirmities, for Your name’s sake.\nLord have mercy. Lord have mercy. Lord have mercy.",
    hail: "Hail to you, we ask you, O saint, full of glory, the ever-virgin Theotokos, the Mother of God, the Mother of Christ. Lift up our prayers to your beloved Son, that He may forgive us our sins.\nHail to the Holy Virgin, who brought forth for us the true Light, Christ our God. Ask the Lord on our behalf, that He may have mercy on our souls and forgive us our sins.",
    conclusion: "Have mercy on us, O God, and have mercy on us, who, at all times and in every hour, in heaven and on earth, is worshipped and glorified, Christ our God, the good, the long-suffering, the abundant in mercy, the great in compassion, who loves the righteous and has mercy on the sinners, of whom I am first.\nThrough the prayers of our holy fathers, O Lord Jesus Christ our God, have mercy on us and save us. Amen."
  }
};
