var preloadVines = function(cb) {
  cb();

  var allVines = [];
  _.each(themes, function(t) {
    allVines = allVines.concat(t.vines);
  });

  console.log('preloading', allVines.length, 'vines');

  _.each(allVines, function(vine, i) {
    $('<video />', {src: vine, preload: 'auto'}).on('canplaythrough', function() {
      console.log('preloaded vine');
    });
  });
}

var init = function() {

  var page = $('html').data('page');

  $('body').show();
  preloadVines(function() {
    listen();
  });
};

var themes = [
  {
  theme: " Design  ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/9BEB6755-AE92-4475-8D88-9418F2B54761-6303-0000051155BB5614_1.0.6.mp4?versionId=QoOKod.Q6ZYCzbpexbNoVXgPCaJ0DjmB ",
      " https://vines.s3.amazonaws.com/v/videos/66C225E5-A0F1-4613-8D7A-A6A94FBF1DAA-2080-0000027C24A3DBF4_1.0.6.mp4?versionId=3isgHShcTzublC2cxuH5eFUFYo7cOgck ",
      " https://vines.s3.amazonaws.com/v/videos/89E180D7-A2DC-4FD0-8BAC-DB1D5DABC12E-4044-000002333D3FEF09_1.0.5.mp4?versionId=bSgp5R9ArKAuxcJdryAnK5LnoHrbN13l ",
      " https://vines.s3.amazonaws.com/v/videos/5D4B1D9A-E9B3-4654-8D93-C72BB62967F0-18457-000014FA2524571F_1.0.6.mp4?versionId=z.fvyaAbeu5TEtBD0QfutFb3u0xRCiya  ",
      " https://vines.s3.amazonaws.com/v/videos/E59B3A15-E4ED-4118-8BEE-E83C81A65AAF-2481-000001BDB2FE38EC_1.0.6.mp4?versionId=M16ONIB5v_wjKrodwWhSTRxI9JMrRs0B "    
      ]
  },
  {
    theme: " Race Cars ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/15D2F70B-0156-42A0-A6A8-A3358D7D45AC-4464-0000020F09367285_1.0.6.mp4?versionId=D5xvlPDMZStEHilwv4oENghNjVaDUoOQ ",
      " https://vines.s3.amazonaws.com/v/videos/BB98C70C-68C7-4537-9B72-EE1D28D72E08-7390-000005FD699B9524_1.0.6.mp4?versionId=PUiNgkyTiYw8P.WIzBAcE1gsjOcQA.gb ",
      " https://vines.s3.amazonaws.com/v/videos/4B5D81F7-B43B-47D3-9F47-8E98B5B5A85F-3367-00000222928D6BEE_1.0.6.mp4?versionId=qay2AiVpQVUPDOg80lBj_lpgJPmyqeKN ",
      " https://vines.s3.amazonaws.com/v/videos/C26BDA74-5C6E-4FC2-B135-D7E46887DBAC-10865-0000020BAF6F02C0_1.0.6.mp4?versionId=NopGcTKT0ZqMEVqBeE5aoOyY_n9jQNxW  ",
      " https://vines.s3.amazonaws.com/v/videos/E44CECEC-EA2E-4AE4-A4EF-1615C7733D46-4283-0000031C400E7C90_1.0.6.mp4?versionId=AcFkEb1zTVPf94zN6NfKABtZYFFC7Dxn ",
      ]
  },
  {
    theme: " Race Cars ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/15D2F70B-0156-42A0-A6A8-A3358D7D45AC-4464-0000020F09367285_1.0.6.mp4?versionId=D5xvlPDMZStEHilwv4oENghNjVaDUoOQ ",
      " https://vines.s3.amazonaws.com/v/videos/BB98C70C-68C7-4537-9B72-EE1D28D72E08-7390-000005FD699B9524_1.0.6.mp4?versionId=PUiNgkyTiYw8P.WIzBAcE1gsjOcQA.gb ",
      " https://vines.s3.amazonaws.com/v/videos/4B5D81F7-B43B-47D3-9F47-8E98B5B5A85F-3367-00000222928D6BEE_1.0.6.mp4?versionId=qay2AiVpQVUPDOg80lBj_lpgJPmyqeKN ",
      " https://vines.s3.amazonaws.com/v/videos/C26BDA74-5C6E-4FC2-B135-D7E46887DBAC-10865-0000020BAF6F02C0_1.0.6.mp4?versionId=NopGcTKT0ZqMEVqBeE5aoOyY_n9jQNxW  ",
      " https://vines.s3.amazonaws.com/v/videos/E44CECEC-EA2E-4AE4-A4EF-1615C7733D46-4283-0000031C400E7C90_1.0.6.mp4?versionId=AcFkEb1zTVPf94zN6NfKABtZYFFC7Dxn ",
      ]
  },
  {
    theme: " Documentary ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/0889A1B8-6A27-43B2-91F9-8D4831A0B93D-17184-00000BD7120C9D49_1.0.6.mp4?versionId=kwZhY3GTgPr6oiT7Vz0YmSnXQYSKc7yj  ",
      " https://vines.s3.amazonaws.com/v/videos/4DDA8B8C-57FC-4B88-8A71-1B35914F1384-666-00000118548E56C5_1.0.6.mp4?versionId=Q6zV7Gg_miJC0RkuszqCjJY27gXD5wh_  ",
      " https://vines.s3.amazonaws.com/v/videos/C50923B3-42FF-48F7-B3A3-7724CA07AD6A-595-0000029A331EDA8E_1.0.6.mp4?versionId=EOZP0toFsy3u9u5zElnM5exQu3XxCuEK  ",
      " https://vines.s3.amazonaws.com/v/videos/E9E7F2F1-6BB4-4865-B854-470DC217BC58-752-000001353C29831D_1.0.6.mp4?versionId=mxmYaH7YmfTMZ4Xb2sdwRP2.UmO8tnqx  ",
    ]
  },
  {
    theme: " Apps  ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/FE865408-E4A5-49C9-AFC0-EF8A4EB4EEF6-12388-000001F593EE0BB8_1.0.6.mp4?versionId=1nbOTcUDNBwh.Z_r1Xpj_v_m.m6f7tsI  ",
      " https://vines.s3.amazonaws.com/v/videos/5CD7FE7E-47E4-4A3E-B41E-DBF97471246F-1363-000001E4D5D09DD3_1.0.1.mp4?versionId=V7wRK7H9gAKhYObgi6G6pVh5j3Ky3ucD ",
      " https://vines.s3.amazonaws.com/v/videos/694C9B82-0860-46B5-A875-1C9109D8D675-4294-000002C05A78100F_1.0.6.mp4?versionId=IUTHd.dFfVEhTYJE5YeTQThMpKnTEsWI ",
    ]
  },
  {
    theme: " Anim  ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/62DC5D41-4EE2-4D21-8F16-E17EA107AFC2-48722-00001B465827A52D_1.0.6.mp4?versionId=llKuKlS2KigJFNGtYEUJdB6974W1zBs5  ",
      " https://vines.s3.amazonaws.com/v/videos/649FB5D1-09F1-4B27-AAD8-B8D1B64D00D9-689-00000092F1147661_1.0.6.mp4?versionId=iRVjWWOd_ZvG.CisTOGM8FE4us_0mPa_  ",
    ]
  },
  {
    theme: " Sports  ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/2013/04/04/BC44DB03-3813-4ECE-B9D7-3012868DA60D-4551-000004FCAA38C9EB_1.0.7.mp4?versionId=suM0WPfYi_fZDgvCULlbxwRd0F8PgHao  ",
      " https://vines.s3.amazonaws.com/v/videos/2013/04/04/19592514-2EF9-471E-850F-7BCCD0579ABC-9083-000004B920E68A82_1.0.7.mp4?versionId=ksjPZ4kUKu7DHf1tR75T6JmJ5KQcnrL3  ",
      " https://vines.s3.amazonaws.com/v/videos/2013/04/04/96645720-ACC1-4CE1-BC4E-A98185A2ED0F-15442-0000040BCB3475C2_1.0.7.mp4?versionId=HyrIMUmH5.JOsYV.PIQfQ5pUDGVyI.vp ",
      " https://vines.s3.amazonaws.com/v/videos/2013/04/04/BA84E17F-9E31-469E-BAC6-4CF52487803C-149-00000004CD4DEC03_1.0.7.mp4?versionId=oLNuwr6IPxn41A2fA3i9mc4J2mkq2341 ",
    ]
  },
  {
    theme: " Space ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/2013/03/31/95B426AD-F6F6-469B-ADBC-9F2A82B3389E-1859-000001A243960389_1.0.7.mp4?versionId=ppJGBctFnu95HI5Q_99HQzVUVoj4AKb8  ",
      " https://vines.s3.amazonaws.com/v/videos/AEF97023-7EA5-4627-83AC-B38EF133F8E0-22367-000010B2FDDA1748_1.0.6.mp4?versionId=c5sgeR_R1pS6uyB5fOcWr327ohOM81Ot  ",
      " https://vines.s3.amazonaws.com/v/videos/2013/04/04/A37E29DB-0B02-48E0-8965-E88D57FE67F2-791-000000D02BA60E09_1.0.7.mp4?versionId=4f3wHkFPPUz_GfmGS09LYpDl104uUK.g ",
      " https://vines.s3.amazonaws.com/v/videos/2013/04/03/EDC587C2-04E3-45DB-82C5-2BA3CA33696E-2227-0000010DF55DA603_1.0.7.mp4?versionId=kbij4N6qu4jMjdn3fxMXXhNGfR8N7Q5P  ",
    ]
  },
  {
    theme: " Art ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/A6CD1802-C4F5-4DA3-92C9-14DE947712B4-13616-00000F4C4BA0B114_1.0.6.mp4?versionId=RZl0xkZzkn3ofhpxzjkpL4rabFFkTYKG  ",
      " https://vines.s3.amazonaws.com/v/videos/644C77E9-9077-43EF-99F2-D236A00F8C92-4633-0000060704884A92_1.0.6.mp4?versionId=kPzvHueKYZBdiHi.OYqmE12hKkgPiF_0 ",
      " https://vines.s3.amazonaws.com/v/videos/B5185A4B-6540-45AA-86C2-1E7E62337C35-505-000000726FE37886_1.0.6.mp4?versionId=X1dyZop30zDjGDmQoOV5GZpEy6gkMPTi  ",
      " https://vines.s3.amazonaws.com/v/videos/A79D1E9A-83A0-455C-97C5-571EB20FCDD2-5305-000003E6EC6EEA3A_1.0.6.mp4?versionId=0tOfzBD3JabbyYUeqojWAjbvwPAXDbSt ",
    ]
  },
  {
    theme: " Literature  ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/1F043396-6EAA-4550-ABC7-B74370BDDDBA-242-00000030B28284EE_1.0.6.mp4?versionId=FEvfWk4bZFlPKT.mPDHddI13K0WjdZkt  ",
      " https://vines.s3.amazonaws.com/v/videos/0FED22A4-02A4-41AC-BD16-40D0A007B8F0-1635-000000AEE469C77F_1.0.5.mp4?versionId=X0TZJAxVbexMQhgljHLp7f4mSifAmc1n ",
      " https://vines.s3.amazonaws.com/v/videos/07D94B5A-4F40-4D19-8A75-6C7A6C36E188-443-000000B387807103_1.0.6.mp4?versionId=j7xt0tv48jdRbo_yPxSlHNn2B6V91J72  ",
      " https://vines.s3.amazonaws.com/v/videos/4C78F1DC-9C89-4933-B153-D8CEA97AC228-5559-0000050D0B76C78C_1.0.6.mp4?versionId=psG6eMMCJYDvHvQLhStFIuyhaY2MNj1q ",
      " https://vines.s3.amazonaws.com/v/videos/7EA7727E-23AE-4534-B61D-54C8737BC677-697-0000004183376DB1_1.0.6.mp4?versionId=9.Y7g3ruEKA4x3NjdZPQNs4Sy7jWLMyi  ",
    ]
  },
  {
    theme: " Public Transport  ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/A748DC84-C9C0-40FD-B7BC-5FAFAEAD3333-2862-0000020CB2721DF0_1.0.6.mp4?versionId=xZ0PaPTpKg2USfLm9RAjGAJGOD5t1f6A ",
      " https://vines.s3.amazonaws.com/v/videos/647DA908-676F-462B-84CC-9A3D46D979F2-19491-00000DC04646DF20_1.0.6.mp4?versionId=MXU74N7DSUk_RlFOZcdye17Xwdio3Gm.  ",
      " https://vines.s3.amazonaws.com/v/videos/56ACA36F-A5E1-4194-9757-9DAD62815D12-182-000000047E9F0D4C_1.0.6.mp4?versionId=sBScI3P0bC5bUzFFAGifcC1uarrGY2O0  ",
      " https://vines.s3.amazonaws.com/v/videos/06BA9750-27CB-4E32-ABA9-79AEE3BA6FA6-16697-00000C141E7FD312_1.0.6.mp4?versionId=PQsiTFxXKvZDhdt3wogJLQMgU9nsiBBY  ",
      " https://vines.s3.amazonaws.com/v/videos/8ADD8E10-61DD-410D-9A6E-B80F816ECA2C-3970-000002CEF4B0F93A_1.0.6.mp4?versionId=yjckkUYGBtgFoXqKWouUScE5gjmNI77W ",
    ]
  },
  {
    theme: " Cute Animals  ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/66708EE8-36A5-4A94-9BC5-5C1979E06F1E-520-00000041700CFF16_1.0.6.mp4?versionId=NcchkQh1RiK911x3HJnpvMWk6u9Zwz.o  ",
      " https://vines.s3.amazonaws.com/v/videos/B16198DB-8525-4390-84C0-0B74C63A4229-1602-000000B8E76410A2_1.0.6.mp4?versionId=od9DD6ilvhbXQHzpr5.waIwnaq.FA14M ",
      " https://vines.s3.amazonaws.com/v/videos/E5C6FDBD-4B95-463E-A908-856A9BFC5A8D-8111-00000B03C53EA200_1.0.4.mp4?versionId=bvY.rXPwmHgGKkTpbc0RV8Wzl0eZmV4I ",
      " https://vines.s3.amazonaws.com/v/videos/580490DE-4C76-4449-8591-FE157FF1377F-1841-00000187339D27D9_1.0.6.mp4?versionId=CJjnDc.iQIQsSXrIp18PdVkm9Ga8bmTa ",
      " https://vines.s3.amazonaws.com/v/videos/4003AB1D-88D0-4F8E-B910-F8E50DFA8D46-2550-00000087F7F5B142_1.0.6.mp4?versionId=jSDkrg9gIdjilaFH1rlA3kAV2EgAQjJp ",
    ]
  },
  {
    theme: " Flowers ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/2013/04/03/B0C9E182-AF87-4A62-91C1-FE69E8B951AB-1199-000000E5B627AE27_1.0.7.mp4?versionId=KdyfuqHLc5dtUwElFpm.jBqx6gfipYI3  ",
      " https://vines.s3.amazonaws.com/v/videos/2013/04/04/ED3ED6C6-F819-4B9B-85E5-0222A5E6EF9F-9471-0000082E242A11C0_1.0.7.mp4?versionId=xBqeY9MrjUnw_FmwShkZnyd0DjQgwB9K  ",
      " https://vines.s3.amazonaws.com/v/videos/2013/04/04/1C2F532D-1F3F-4F3F-9BE2-40AD5C4E7166-4485-0000059C12C3D0BB_1.0.7.mp4?versionId=9tKZQmsQk4uT350AiBPdc3wcwpuLH3W.  ",
      " https://vines.s3.amazonaws.com/v/videos/2013/04/04/018CB082-5445-4376-A0D5-6CF42D51194D-8539-00000B36F0E69B0B_1.0.7.mp4?versionId=TzT8g4GxUKrwb1UT..GBlKxivGoFF8Lq  ",
      " https://vines.s3.amazonaws.com/v/videos/2013/04/03/E3916DB8-18EC-44F2-9DE2-27B06D77B228-1644-00000243CA751FF9_1.0.7.mp4?versionId=ocAW8I_tKjgZ2c1d3sJ6Vbo98y762nZJ  ",
    ]
  },
  {
    theme: " Fashion ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/2013/04/04/BC842ED8-1717-4BBA-B395-79C675E69975-19585-00000D4AED358FDC_1.0.7.mp4?versionId=dnW0KptXtzscNwyt6UNzw2WCwXNfCx7W ",
      " https://vines.s3.amazonaws.com/v/videos/605C55F1-FDC8-4139-87A1-792A1FB1767E-6773-000005B55D0D90D1_1.0.5.mp4?versionId=h6nzMAOx5ZqYdivBr1CHH1LZ4Qfyd6Q. ",
      // " https://vines.s3.amazonaws.com/v/videos/2013/04/04/DC615036-7F6A-44F5-9666-5760835537CB-1404-000001CE67C45711_1.0.7.  ",
      " https://vines.s3.amazonaws.com/v/videos/86027384-D072-4A5F-B4D1-2D4519019738-9722-0000085930EE6417_1.0.5.mp4?versionId=pPswS.AQGxYOedK_A_31mxxJwlkARfxK ",
      " https://vines.s3.amazonaws.com/v/videos/FF442759-BA24-4658-BBD6-2142640B9B3F-26580-00001465BAD02AC5_1.0.5.mp4?versionId=tWDT4hi3RnWfHbjEsadvu.9aakvtZTG1  ",
    ]
  },
  {
    theme: " Theme Parks ",
    vines: [
      " https://vines.s3.amazonaws.com/v/videos/40645490-A994-450D-9A83-D33B1C918BB6-5153-00000445E4004C74_1.0.6.mp4?versionId=9MN2HhD7d8A.NEXN0uTC3vbIGVK21j81 ",
      " https://vines.s3.amazonaws.com/v/videos/91B64DF4-B65B-4350-B0BF-73B144530D9D-480-0000002B806AD12A_1.0.6.mp4?versionId=LFhrPcPlmfRdlb9Vlfh466oATk8KFZrx  ",
      " https://vines.s3.amazonaws.com/v/videos/2013/04/03/1E497410-B35B-44B6-BEE3-F866E732EE0E-21557-00000610CB506F42_1.0.7.mp4?versionId=PhfdB6ee5qpWqiFnDlecaHh8P50tWoG1 ",
      " https://vines.s3.amazonaws.com/v/videos/2013/03/30/CECD5C18-C328-4A81-A115-C4A05138ED1C-6473-00000193677916B5_1.0.7.mp4?versionId=YRFbGVBdLwzgVUPeKKk7RH8cJPem5DLT  ",
      " https://vines.s3.amazonaws.com/v/videos/DE1BCF9C-FFEE-41CB-91BF-1F916E2C868A-319-0000002313A9878E_1.0.6.mp4?versionId=FI073xapNKjVF0YypXwjRP0uyqm9aJZy  ",
    ]
  },
];


var segments = {
  male: [
    'Design',
    'Race Cars',
    // 'Airplanes',
    'Documentary',
    'Apps',
    'Anim',
    'Sports',
    'Space',
  ],
  female: [
    'Art',
    'Literature',
    'Public Transport',
    'Cute Animals',
    'Flowers',
    'Fashion',
    'Theme Parks',
  ]
}

var listen = function() {
  console.log('loaded vines', 'listening');

  var socket = io.connect('http://mvr.me:1340');

  socket.on('newSegment', function(data) {
    updateContent(data.segment);
  });

  var el = $('main');
  var template = function(vine) {
    return '<video loop preload="auto" muted="true" src="' + vine + '"></video>';
  }

  var currentSegment;

  var next;
  var updateContent = function(segment) {
    if(!segment)
      segment = currentSegment
    else {
      console.log('new segment:', segment);
      clearTimeout(next);
    }
    currentSegment = segment;
    var seg = segments[segment];
    var ti = Math.round(Math.random() * (seg.length - 1));
    var theme = seg[ti];
    _.each(themes, function(t) {
      if(t.theme.indexOf(theme) !== -1)
        theme = t;
    });

    var vi = Math.round(Math.random() * (theme.vines.length - 1));
    console.log('selected', 'vine:', vi, 'from theme: ', theme.theme);
    var vine = theme.vines[vi];

    el
      .html( template( vine ) )
      .children()
        .get(0) 
          .play();

    next = setTimeout(updateContent, 7000);
  }
};

$(init);