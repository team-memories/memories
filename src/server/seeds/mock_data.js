const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("comment").del();
  await knex("media").del();
  await knex("user").del();

  // Mock data generated from https://mockaroo.com/
  await knex("user").insert([
    {
      name: "Yun-hyeok Kwak",
      email: "rev1c0sm0s@gmail.com",
      profileImgUrl:
        "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
      password: await bcrypt.hash("8q5w2e0r123", 3),
    },
    {
      name: "Byeong Jo King",
      email: "gee05053@kookmin.ac.kr",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/5fa2dd/ffffff",
      password: await bcrypt.hash("123", 3),
    },
    {
      name: "Test",
      email: "test@test.com",
      profileImgUrl: "http://dummyimage.com/30x30.png/cc0000/ffffff",
      password: await bcrypt.hash("test", 3),
    },
    {
      name: "Theo Waine",
      email: "twaine3@utexas.edu",
      profileImgUrl: "http://dummyimage.com/30x30.png/ff4444/ffffff",
      password: "xpvfEqRym",
    },
    {
      name: "Salli Houlton",
      email: "shoulton4@wix.com",
      profileImgUrl: "http://dummyimage.com/30x30.png/ff4444/ffffff",
      password: "fSQLIIPx",
    },
    {
      name: "Abbe Beart",
      email: "abeart5@shareasale.com",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/dddddd/000000",
      password: "lV6P4P",
    },
    {
      name: "Dominique Siveter",
      email: "dsiveter6@deliciousdays.com",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/5fa2dd/ffffff",
      password: "9ts9UOX",
    },
    {
      name: "Teresina Hattoe",
      email: "thattoe7@toplist.cz",
      profileImgUrl: "http://dummyimage.com/30x30.png/5fa2dd/ffffff",
      password: "BWGpGuXCTnf",
    },
    {
      name: "Salomone Jaukovic",
      email: "sjaukovic8@amazon.co.jp",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/cc0000/ffffff",
      password: "eadD2p",
    },
    {
      name: "Jeno Parkey",
      email: "jparkey9@lulu.com",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/dddddd/000000",
      password: "UlOjYNBm5Dko",
    },
    {
      name: "Collie Lemary",
      email: "clemarya@tamu.edu",
      profileImgUrl: "http://dummyimage.com/30x30.png/dddddd/000000",
      password: "v7fEVHjFrAE",
    },
    {
      name: "Alleyn Bartomeu",
      email: "abartomeub@columbia.edu",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/5fa2dd/ffffff",
      password: "HYGWyY",
    },
    {
      name: "Lavinie Arro",
      email: "larroc@ibm.com",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/5fa2dd/ffffff",
      password: "pzkPltj",
    },
    {
      name: "Jacquelynn Pelzer",
      email: "jpelzerd@fema.gov",
      profileImgUrl: "http://dummyimage.com/30x30.png/dddddd/000000",
      password: "Cs6a73A",
    },
    {
      name: "Georgiana Tomlins",
      email: "gtomlinse@youku.com",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/5fa2dd/ffffff",
      password: "Y4EsqfsbKJ",
    },
    {
      name: "Gabriello Gennerich",
      email: "ggennerichf@zdnet.com",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/5fa2dd/ffffff",
      password: "fL2va1p0",
    },
    {
      name: "Frederic Trewett",
      email: "ftrewettg@slideshare.net",
      profileImgUrl: "http://dummyimage.com/30x30.png/dddddd/000000",
      password: "MjiddO",
    },
    {
      name: "Shana Ditzel",
      email: "sditzelh@newyorker.com",
      profileImgUrl: "http://dummyimage.com/30x30.png/dddddd/000000",
      password: "NeRRCjyv",
    },
    {
      name: "Yardley Verny",
      email: "yvernyi@scribd.com",
      profileImgUrl: "http://dummyimage.com/30x30.png/ff4444/ffffff",
      password: "4xCtnyFz6wN",
    },
    {
      name: "Kenon Matteucci",
      email: "kmatteuccij@epa.gov",
      profileImgUrl: "http://dummyimage.com/30x30.png/dddddd/000000",
      password: "KfEx3VMC4r",
    },
    {
      name: "Amii Potter",
      email: "apotterk@baidu.com",
      profileImgUrl: "http://dummyimage.com/30x30.png/cc0000/ffffff",
      password: "cpRWRB",
    },
    {
      name: "Jocelin Valadez",
      email: "jvaladezl@merriam-webster.com",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/ff4444/ffffff",
      password: "qEYbvZBM",
    },
    {
      name: "Pavia Canellas",
      email: "pcanellasm@sina.com.cn",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/ff4444/ffffff",
      password: "qJlaMeiYN0C",
    },
    {
      name: "Jennifer Bax",
      email: "jbaxn@github.io",
      profileImgUrl: "http://dummyimage.com/30x30.png/5fa2dd/ffffff",
      password: "6HKpQADeG0AB",
    },
    {
      name: "Sanders Marquess",
      email: "smarquesso@arizona.edu",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/cc0000/ffffff",
      password: "57AhhetIEdS0",
    },
    {
      name: "Hale Tirte",
      email: "htirtep@cocolog-nifty.com",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/cc0000/ffffff",
      password: "X2Yf3pz",
    },
    {
      name: "Laetitia Tirone",
      email: "ltironeq@earthlink.net",
      profileImgUrl: "http://dummyimage.com/30x30.png/dddddd/000000",
      password: "lAZVXBvm",
    },
    {
      name: "Whitby Clutram",
      email: "wclutramr@acquirethisname.com",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/dddddd/000000",
      password: "SCfUx24Pn0",
    },
    {
      name: "Booth Dixsee",
      email: "bdixsees@storify.com",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/5fa2dd/ffffff",
      password: "zV5Ge1Cj6t",
    },
    {
      name: "Vance Duny",
      email: "vdunyt@reference.com",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/cc0000/ffffff",
      password: "N5AnNZ",
    },
    {
      name: "Christean Brehat",
      email: "cbrehatu@homestead.com",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/cc0000/ffffff",
      password: "UdHKIQDWjq",
    },
    {
      name: "Joane Lowten",
      email: "jlowtenv@netvibes.com",
      profileImgUrl: "http://dummyimage.com/30x30.png/5fa2dd/ffffff",
      password: "7rewS1YBEl",
    },
    {
      name: "Lauryn Ainsby",
      email: "lainsbyw@buzzfeed.com",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/dddddd/000000",
      password: "zRONOAY6TGz",
    },
    {
      name: "Larry Frostdyke",
      email: "lfrostdykex@ustream.tv",
      profileImgUrl: "http://dummyimage.com/30x30.png/dddddd/000000",
      password: "iYWY7RSHDRl",
    },
    {
      name: "Hermina Epinoy",
      email: "hepinoyy@virginia.edu",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/cc0000/ffffff",
      password: "YKjx43C",
    },
    {
      name: "Patrizia Roly",
      email: "prolyz@com.com",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/ff4444/ffffff",
      password: "1hZV5xj",
    },
    {
      name: "Abbey Riceards",
      email: "ariceards10@nih.gov",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/5fa2dd/ffffff",
      password: "AtQatWGkzOd5",
    },
    {
      name: "Wernher Carden",
      email: "wcarden11@toplist.cz",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/cc0000/ffffff",
      password: "119XhWhO26O",
    },
    {
      name: "Fidole Wrathall",
      email: "fwrathall12@sina.com.cn",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/cc0000/ffffff",
      password: "5az5azLJ5dO",
    },
    {
      name: "Lennard Danneil",
      email: "ldanneil13@pen.io",
      profileImgUrl: "http://dummyimage.com/30x30.jpg/ff4444/ffffff",
      password: "dqje5Gu4wb",
    },
    {
      name: "Austina Janauschek",
      email: "ajanauschek14@topsy.com",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/cc0000/ffffff",
      password: "pRLE8YMLfJiR",
    },
    {
      name: "Sargent Bartles",
      email: "sbartles15@pen.io",
      profileImgUrl: "http://dummyimage.com/30x30.png/ff4444/ffffff",
      password: "MwxQsLwQAX8q",
    },
    {
      name: "Nonna Blinckhorne",
      email: "nblinckhorne16@surveymonkey.com",
      profileImgUrl: "http://dummyimage.com/30x30.png/ff4444/ffffff",
      password: "f0zQzm1SM",
    },
    {
      name: "Kellby Leroy",
      email: "kleroy17@loc.gov",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/5fa2dd/ffffff",
      password: "A9bMDtnRpR",
    },
    {
      name: "Gabriela Behling",
      email: "gbehling18@g.co",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/ff4444/ffffff",
      password: "Kmp8EXTvjonv",
    },
    {
      name: "Marya Shatliff",
      email: "mshatliff19@cmu.edu",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/dddddd/000000",
      password: "DwqHP8IqLjCK",
    },
    {
      name: "Ardyth MacIlhagga",
      email: "amacilhagga1a@domainmarket.com",
      profileImgUrl: "http://dummyimage.com/30x30.png/cc0000/ffffff",
      password: "wXc2X2",
    },
    {
      name: "Garner Willingale",
      email: "gwillingale1b@mac.com",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/5fa2dd/ffffff",
      password: "OYaSGF3lN",
    },
    {
      name: "Faythe Palluschek",
      email: "fpalluschek1c@newsvine.com",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/dddddd/000000",
      password: "iUyiicTd8",
    },
    {
      name: "Merlina Ivashnyov",
      email: "mivashnyov1d@comcast.net",
      profileImgUrl: "http://dummyimage.com/30x30.bmp/ff4444/ffffff",
      password: "ssih9W",
    },
  ]);
  await knex("media").insert([
    {
      description: "1980년 경주",
      originalUrl: process.env.URL + ":8080/media/original/경주_1980년.jpg",
      url: process.env.URL + ":8080/media/converted/경주_1980년.png",
      isProcessing: false,
      type: "PHOTO",
      thumbnailUrl: "https://dummyimage.com/1920x1080.png/cc0000/ffffff",
      title: "1980년 경주시 모습",
      location: "대한민국 경상북도 경주시",
      year: 1980,
      authorId: 1,
    },
    {
      description: "다시볼 수 없는 1970년 광화문",
      originalUrl:
        process.env.URL + ":8080/media/original/광화문_1970년6월.jpg",
      url: process.env.URL + ":8080/media/converted/광화문_1970년6월.png",
      isProcessing: false,
      type: "PHOTO",
      thumbnailUrl: "https://dummyimage.com/1920x1080.png/cc0000/ffffff",
      title: "광화문 1970년 6월",
      location: "대한민국 서울특별시 종로구",
      year: 1970,
      authorId: 2,
    },
    {
      description: "국회의사당_서울특별시 영등포구_1996년",
      originalUrl:
        process.env.URL +
        ":8080/media/original/국회의사당_서울특별시 영등포구_1996년.jpg",
      url:
        process.env.URL +
        ":8080/media/converted/국회의사당_서울특별시 영등포구_1996년.png",
      isProcessing: false,
      type: "PHOTO",
      thumbnailUrl: "https://dummyimage.com/1920x1080.png/cc0000/ffffff",
      title: "국회의사당 1996년",
      location: "대한민국 서울특별시 영등포구",
      year: 1996,
      authorId: 4,
    },
    {
      description: "1980년 김포 모습",
      originalUrl:
        process.env.URL + ":8080/media/original/김포군_고촌_1980년.jpg",
      url: process.env.URL + ":8080/media/converted/김포군_고촌_1980년.png",
      isProcessing: false,
      type: "PHOTO",
      thumbnailUrl: "https://dummyimage.com/1920x1080.png/cc0000/ffffff",
      title: "1980년 김포",
      location: "대한민국 경기도 김포시",
      year: 1980,
      authorId: 6,
    },
    {
      description: "2015년 김해도심",
      originalUrl: process.env.URL + ":8080/media/original/김해도심_2015.jpg",
      url: process.env.URL + ":8080/media/converted/김해도심_2015.png",
      isProcessing: false,
      type: "PHOTO",
      thumbnailUrl: "https://dummyimage.com/1920x1080.png/cc0000/ffffff",
      title: "2015년 김해도심 모습",
      location: "대한민국 경상남도 김해시",
      year: 2015,
      authorId: 8,
    },
    {
      description: "난지도 서울월드컵경기장 인근",
      category: "CITY",
      originalUrl:
        process.env.URL +
        ":8080/media/original/난지도 서울월드컵경기장 인근_서울특별시 마포구_2000년.jpg",
      url:
        process.env.URL +
        ":8080/media/converted/난지도 서울월드컵경기장 인근_서울특별시 마포구_2000년.png",
      isProcessing: false,
      type: "PHOTO",
      thumbnailUrl: "https://dummyimage.com/1920x1080.png/cc0000/ffffff",
      title: "2000년 서울월드컵경기장 인근 모습",
      location: "대한민국 서울특별시 마포구",
      year: 2000,
      authorId: 1,
    },
    {
      description: "1995년 난지도 인근 가양대교",
      category: "CITY",
      originalUrl:
        process.env.URL +
        ":8080/media/original/난지도 인근 가양대교_서울특별시 마포구_1995년.jpg",
      url:
        process.env.URL +
        ":8080/media/converted/난지도 인근 가양대교_서울특별시 마포구_1995년.png",
      isProcessing: false,
      type: "PHOTO",
      thumbnailUrl: "https://dummyimage.com/1920x1080.png/cc0000/ffffff",
      title: "1995년 가양대교 모습",
      location: "대한민국 서울특별시 마포구",
      year: 1995,
      authorId: 1,
    },
    {
      description: "1995년 난지도 인근",
      originalUrl:
        process.env.URL +
        ":8080/media/original/난지도 인근_서울특별시 마포구_1995년.jpg",
      url:
        process.env.URL +
        ":8080/media/converted/난지도 인근_서울특별시 마포구_1995년.png",
      isProcessing: false,
      type: "PHOTO",
      thumbnailUrl: "https://dummyimage.com/1920x1080.png/cc0000/ffffff",
      title: "1995년 난지도 인근 모습",
      location: "대한민국 서울특별시 마포구",
      year: 1995,
      authorId: 2,
    },
    {
      description: "1950년 남대문",
      originalUrl:
        process.env.URL + ":8080/media/original/남대문_1950년9월28일.jpeg",
      url: process.env.URL + ":8080/media/converted/남대문_1950년9월28일.png",
      isProcessing: false,
      type: "PHOTO",
      thumbnailUrl: "https://dummyimage.com/1920x1080.png/cc0000/ffffff",
      title: "1950년 9월 28일 남대문 모습",
      location: "대한민국 서울특별시 중구",
      year: 1950,
      authorId: 3,
    },
    {
      description: "1950년 남대문 주변 시가지",
      category: "CITY",
      originalUrl:
        process.env.URL +
        ":8080/media/original/남대문_주변_시가지_1950년10월.jpeg",
      url:
        process.env.URL +
        ":8080/media/converted/남대문_주변_시가지_1950년10월.png",
      isProcessing: false,
      type: "PHOTO",
      thumbnailUrl: "https://dummyimage.com/1920x1080.png/cc0000/ffffff",
      title: "1950년 남대문 주변 시가지 모습",
      location: "대한민국 서울특별시 중구",
      year: 1950,
      authorId: 4,
    },
  ]);
  await knex("comment").insert([
    {
      mediaId: 4,
      authorId: 3,
      body:
        "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
    },
    {
      mediaId: 4,
      authorId: 7,
      body:
        "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    },
    {
      mediaId: 3,
      authorId: 14,
      body:
        "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    },
    {
      mediaId: 6,
      authorId: 15,
      body:
        "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    },
    {
      mediaId: 3,
      authorId: 6,
      body:
        "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
    },
    {
      mediaId: 5,
      authorId: 20,
      body:
        "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    },
    {
      mediaId: 6,
      authorId: 3,
      body:
        "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    {
      mediaId: 3,
      authorId: 6,
      body:
        "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    },
    {
      mediaId: 7,
      authorId: 17,
      body:
        "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    },
    {
      mediaId: 4,
      authorId: 12,
      body:
        "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    },
    {
      mediaId: 7,
      authorId: 7,
      body:
        "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    },
    {
      mediaId: 4,
      authorId: 1,
      body:
        "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    },
    {
      mediaId: 3,
      authorId: 7,
      body:
        "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    },
    {
      mediaId: 5,
      authorId: 6,
      body:
        "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    {
      mediaId: 6,
      authorId: 20,
      body:
        "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    {
      mediaId: 1,
      authorId: 7,
      body:
        "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    },
    {
      mediaId: 7,
      authorId: 9,
      body:
        "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    },
    {
      mediaId: 6,
      authorId: 6,
      body:
        "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    },
    {
      mediaId: 4,
      authorId: 15,
      body:
        "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    },
    {
      mediaId: 5,
      authorId: 18,
      body:
        "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    },
    {
      mediaId: 1,
      authorId: 3,
      body:
        "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    },
    {
      mediaId: 6,
      authorId: 14,
      body:
        "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    },
    {
      mediaId: 3,
      authorId: 8,
      body:
        "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    },
    {
      mediaId: 1,
      authorId: 8,
      body: "Fusce consequat. Nulla nisl. Nunc nisl.",
    },
    {
      mediaId: 2,
      authorId: 17,
      body:
        "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    },
    {
      mediaId: 7,
      authorId: 1,
      body:
        "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
    },
    {
      mediaId: 5,
      authorId: 10,
      body:
        "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    },
    {
      mediaId: 4,
      authorId: 8,
      body:
        "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    },
    {
      mediaId: 3,
      authorId: 6,
      body:
        "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    },
    {
      mediaId: 2,
      authorId: 12,
      body:
        "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    },
    {
      mediaId: 4,
      authorId: 15,
      body:
        "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    },
    {
      mediaId: 6,
      authorId: 18,
      body:
        "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    },
    {
      mediaId: 5,
      authorId: 13,
      body:
        "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    },
    {
      mediaId: 1,
      authorId: 8,
      body:
        "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    },
    {
      mediaId: 5,
      authorId: 5,
      body:
        "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    },
    {
      mediaId: 3,
      authorId: 4,
      body:
        "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    },
    {
      mediaId: 4,
      authorId: 6,
      body:
        "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    },
    {
      mediaId: 2,
      authorId: 17,
      body:
        "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    },
    {
      mediaId: 5,
      authorId: 18,
      body:
        "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
    },
    {
      mediaId: 3,
      authorId: 11,
      body:
        "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    },
    {
      mediaId: 4,
      authorId: 18,
      body:
        "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    },
    {
      mediaId: 1,
      authorId: 4,
      body:
        "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    },
    {
      mediaId: 5,
      authorId: 2,
      body:
        "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    {
      mediaId: 6,
      authorId: 17,
      body:
        "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    },
    {
      mediaId: 6,
      authorId: 17,
      body:
        "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    },
    {
      mediaId: 1,
      authorId: 14,
      body:
        "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    },
    {
      mediaId: 3,
      authorId: 19,
      body:
        "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    },
    {
      mediaId: 2,
      authorId: 13,
      body:
        "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    },
    {
      mediaId: 4,
      authorId: 10,
      body:
        "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    },
    {
      mediaId: 5,
      authorId: 15,
      body:
        "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    },
  ]);
};
