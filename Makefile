
vpath %.adoc parts
vpath %.html html
vpath %.adoc chapters
vpath %.publ html

allparts: 數1.html 數2.html 數3.html 數4.html 數5.html 數6.html 數7.html 數8.html 數9.html 數10.html 數11.html 數12.html 數13.html 數14.html 數15.html 數16.html 數17.html 數18.html 數19.html 數20.html

數1.html: 數1.adoc 01_2064_Das\ Spiele-Labor.adoc  02_2019_Marianne.adoc
	asciidoctor -D html parts/數1.adoc
	tools/wordpressformat html/數1.html

數2.html: 數2.adoc 03_2064_TRON-Attacke.adoc  04_2064_Schwachstellen\ in\ Computern.adoc
	asciidoctor -D html parts/數2.adoc
	tools/wordpressformat html/數2.html

數3.html: 數3.adoc 05_2019_Einbruch\ in\ Amerika.adoc  06_2064_Ein\ Überraschungspaket.adoc  07_2019_Nur\ 30\ Sekunden.adoc
	asciidoctor -D html parts/數3.adoc
	tools/wordpressformat html/數3.html

數4.html: 數4.adoc 08_1913_Wilhelm.adoc  09_2019_Endlich\ mal\ Action!.adoc 10_2019_Auf\ dem\ Heimweg.adoc  11_2019_Verrat.adoc
	asciidoctor -D html parts/數4.adoc
	tools/wordpressformat html/數4.html

數5.html: 數5.adoc 12_2064_Marianne\ Lasser.adoc  13_2019,1913_Rede.adoc  14_2064_Die\ Cypherpunk-Akademie.adoc
	asciidoctor -D html parts/數5.adoc
	tools/wordpressformat html/數5.html

數6.html: 數6.adoc 15_2019_Wir\ holen\ sie\ nicht!.adoc  16_2019_Allein.adoc  17_2019_Eine\ Freundin.adoc  18_2064_Elf\ Grundgedanken.adoc
	asciidoctor -D html parts/數6.adoc
	tools/wordpressformat html/數6.html

數7.html: 數7.adoc 19_2019_Die\ Psychologin.adoc  20_2019_Unterschiedliche\ Strategien.adoc  21_2064_Die\ Sphinx.adoc
	asciidoctor -D html parts/數7.adoc
	tools/wordpressformat html/數7.html

數8.html: 數8.adoc 22_2019_Flucht\ aus\ dem\ Keller.adoc  23_1913_Drohung.adoc  24_2019_Night-Raid.adoc
	asciidoctor -D html parts/數8.adoc
	tools/wordpressformat html/數8.html

數9.html: 數9.adoc 25_2021_Zwei\ Jahre\ später.adoc  26_2019_Strandcafé\ in\ Dahab.adoc  27_1915_Kampf\ am\ Brandenburger\ Tor.adoc
	asciidoctor -D html parts/數9.adoc
	tools/wordpressformat html/數9.html

數10.html: 數10.adoc 28_2064_Angriff!.adoc  29_2064_Eine\ neue\ Aufgabe.adoc  30_2021_Nach\ Hause.adoc
	asciidoctor -D html parts/數10.adoc
	tools/wordpressformat html/數10.html

數11.html: 數11.adoc 31_2019_The\ Boatly\ Hackerspace.adoc  32_2019_Wo\ ist\ Marianne\ Lasser.adoc  33_2021_Ich\ will\ hier\ bleiben.adoc
	asciidoctor -D html parts/數11.adoc
	tools/wordpressformat html/數11.html

數12.html: 數12.adoc 34_2019_Die\ Schwachstellen-Datenbank.adoc 35_1915_Nach\ der\ Bombe.adoc 36_2019_Überraschende\ Nachricht.adoc
	asciidoctor -D html parts/數12.adoc
	tools/wordpressformat html/數12.html

數13.html: 數13.adoc 37_2021_Der\ Oberst.adoc 38_2019_Academi.adoc 39_2064_Fortunato.adoc
	asciidoctor -D html parts/數13.adoc
	tools/wordpressformat html/數13.html

數14.html: 數14.adoc 40_2064_Im\ Strand-Appartment.adoc 41_2064_Ein\ Plan.adoc  42_1915_In\ einer\ Suppenküche.adoc
	asciidoctor -D html parts/數14.adoc
	tools/wordpressformat html/數14.html

數15.html: 數15.adoc 43_2064_Tresoreinbruch.adoc 44_2021_Night-Owl.adoc
	asciidoctor -D html parts/數15.adoc
	tools/wordpressformat html/數15.html

數16.html: 數16.adoc 45_2064_Spezial-Kommando.adoc 46_2064_Nichts\ wie\ weg\ hier.adoc 47_2020_An\ einem\ See\ in\ Tasmanien.adoc
	asciidoctor -D html parts/數16.adoc
	tools/wordpressformat html/數16.html

數17.html: 數17.adoc 48_2020_Sharing\ is\ Caring.adoc  49_2021_Linda.adoc
	asciidoctor -D html parts/數17.adoc
	tools/wordpressformat html/數17.html

數18.html: 數18.adoc 50_2020_Und\ los.adoc  51_1915_Deutsch-National.adoc  52_2064_Wo\ ist\ das\ LBI.adoc  53_2064_Einschüchtern.adoc
	asciidoctor -D html parts/數18.adoc
	tools/wordpressformat html/數18.html

數19.html: 數19.adoc 54_1918_Festnahme.adoc  55_2021_Ein\ Blutstropfen.adoc  56_2064_Bombendrohung.adoc
	asciidoctor -D html parts/數19.adoc
	tools/wordpressformat html/數19.html

數20.html: 數20.adoc 57_2021_Der\ Haftbefehl.adoc  58_2021_Krisensitzung.adoc  59_1918_2021_Verhör\ (1).adoc
	asciidoctor -D html parts/數20.adoc
	tools/wordpressformat html/數20.html

# 數21.html: 數21.adoc
#	asciidoctor -D html parts/數21.adoc
#	tools/wordpressformat html/數21.html

# 數22.html: 數22.adoc
#	asciidoctor -D html parts/數22.adoc
#	tools/wordpressformat html/數22.html

# 數23.html: 數23.adoc
#	asciidoctor -D html parts/數23.adoc
#	tools/wordpressformat html/數23.html

# 數24.html: 數24.adoc
#	asciidoctor -D html parts/數24.adoc
#	tools/wordpressformat html/數24.html

# 數25.html: 數25.adoc
#	asciidoctor -D html parts/數25.adoc
#	tools/wordpressformat html/數25.html

# 數26.html: 數26.adoc
#	asciidoctor -D html parts/數26.adoc
#	tools/wordpressformat html/數26.html

# 數27.html: 數27.adoc
#	asciidoctor -D html parts/數27.adoc
#	tools/wordpressformat html/數27.html

# 數28.html: 數28.adoc
#	asciidoctor -D html parts/數28.adoc
#	tools/wordpressformat html/數28.html

# 數29.html: 數29.adoc
#	asciidoctor -D html parts/數29.adoc
#	tools/wordpressformat html/數29.html

# 數30.html: 數30.adoc
#	asciidoctor -D html parts/數30.adoc
#	tools/wordpressformat html/數30.html

# 數31.html: 數31.adoc
#	asciidoctor -D html parts/數31.adoc
#	tools/wordpressformat html/數31.html

# 數32.html: 數32.adoc
#	asciidoctor -D html parts/數32.adoc
#	tools/wordpressformat html/數32.html

# 數33.html: 數33.adoc
#	asciidoctor -D html parts/數33.adoc
#	tools/wordpressformat html/數33.html



publish: .1.publ .2.publ .3.publ .4.publ .5.publ .6.publ .7.publ .8.publ .9.publ .10.publ .11.publ .12.publ .13.publ .14.publ .15.publ .16.publ .17.publ .18.publ .19.publ .20.publ

.1.publ: 數1.html
	casperjs tools/wordpresspublish.js 1 "$$(cat html/數1.html)" $$(cat tools/wppwd)
	touch html/.1.publ

.2.publ: 數2.html
	casperjs tools/wordpresspublish.js 2 "$$(cat html/數2.html)" $$(cat tools/wppwd)
	touch html/.2.publ

.3.publ: 數3.html
	casperjs tools/wordpresspublish.js 3 "$$(cat html/數3.html)" $$(cat tools/wppwd)
	touch html/.3.publ

.4.publ: 數4.html
	casperjs tools/wordpresspublish.js 4 "$$(cat html/數4.html)" $$(cat tools/wppwd)
	touch html/.4.publ

.5.publ: 數5.html
	casperjs tools/wordpresspublish.js 5 "$$(cat html/數5.html)" $$(cat tools/wppwd)
	touch html/.5.publ

.6.publ: 數6.html
	casperjs tools/wordpresspublish.js 6 "$$(cat html/數6.html)" $$(cat tools/wppwd)
	touch html/.6.publ

.7.publ: 數7.html
	casperjs tools/wordpresspublish.js 7 "$$(cat html/數7.html)" $$(cat tools/wppwd)
	touch html/.7.publ

.8.publ: 數8.html
	casperjs tools/wordpresspublish.js 8 "$$(cat html/數8.html)" $$(cat tools/wppwd)
	touch html/.8.publ

.9.publ: 數9.html
	casperjs tools/wordpresspublish.js 9 "$$(cat html/數9.html)" $$(cat tools/wppwd)
	touch html/.9.publ

.10.publ: 數10.html
	casperjs tools/wordpresspublish.js 10 "$$(cat html/數10.html)" $$(cat tools/wppwd)
	touch html/.10.publ

.11.publ: 數11.html
	casperjs tools/wordpresspublish.js 11 "$$(cat html/數11.html)" $$(cat tools/wppwd)
	touch html/.11.publ

.12.publ: 數12.html
	casperjs tools/wordpresspublish.js 12 "$$(cat html/數12.html)" $$(cat tools/wppwd)
	touch html/.12.publ

.13.publ: 數13.html
	casperjs tools/wordpresspublish.js 13 "$$(cat html/數13.html)" $$(cat tools/wppwd)
	touch html/.13.publ

.14.publ: 數14.html
	casperjs tools/wordpresspublish.js 14 "$$(cat html/數14.html)" $$(cat tools/wppwd)
	touch html/.14.publ

.15.publ: 數15.html
	casperjs tools/wordpresspublish.js 15 "$$(cat html/數15.html)" $$(cat tools/wppwd)
	touch html/.15.publ

.16.publ: 數16.html
	casperjs tools/wordpresspublish.js 16 "$$(cat html/數16.html)" $$(cat tools/wppwd)
	touch html/.16.publ

.17.publ: 數17.html
	casperjs tools/wordpresspublish.js 17 "$$(cat html/數17.html)" $$(cat tools/wppwd)
	touch html/.17.publ

.18.publ: 數18.html
	casperjs tools/wordpresspublish.js 18 "$$(cat html/數18.html)" $$(cat tools/wppwd)
	touch html/.18.publ

.19.publ: 數19.html
	casperjs tools/wordpresspublish.js 19 "$$(cat html/數19.html)" $$(cat tools/wppwd)
	touch html/.19.publ

.20.publ: 數20.html
	casperjs tools/wordpresspublish.js 20 "$$(cat html/數20.html)" $$(cat tools/wppwd)
	touch html/.20.publ

# .21.publ: 數21.html
#	casperjs tools/wordpresspublish.js 21 "$$(cat html/數21.html)" $$(cat tools/wppwd)
#	touch html/.21.publ

# .22.publ: 數22.html
#	casperjs tools/wordpresspublish.js 22 "$$(cat html/數22.html)" $$(cat tools/wppwd)
#	touch html/.22.publ

# .23.publ: 數23.html
#	casperjs tools/wordpresspublish.js 23 "$$(cat html/數23.html)" $$(cat tools/wppwd)
#	touch html/.23.publ

# .24.publ: 數24.html
#	casperjs tools/wordpresspublish.js 24 "$$(cat html/數24.html)" $$(cat tools/wppwd)
#	touch html/.24.publ

# .25.publ: 數25.html
#	casperjs tools/wordpresspublish.js 25 "$$(cat html/數25.html)" $$(cat tools/wppwd)
#	touch html/.25.publ

# .26.publ: 數26.html
#	casperjs tools/wordpresspublish.js 26 "$$(cat html/數26.html)" $$(cat tools/wppwd)
#	touch html/.26.publ

# .27.publ: 數27.html
#	casperjs tools/wordpresspublish.js 27 "$$(cat html/數27.html)" $$(cat tools/wppwd)
#	touch html/.27.publ

# .28.publ: 數28.html
#	casperjs tools/wordpresspublish.js 28 "$$(cat html/數28.html)" $$(cat tools/wppwd)
#	touch html/.28.publ

# .29.publ: 數29.html
#	casperjs tools/wordpresspublish.js 29 "$$(cat html/數29.html)" $$(cat tools/wppwd)
#	touch html/.29.publ

# .30.publ: 數30.html
#	casperjs tools/wordpresspublish.js 30 "$$(cat html/數30.html)" $$(cat tools/wppwd)
#	touch html/.30.publ

# .31.publ: 數31.html
#	casperjs tools/wordpresspublish.js 31 "$$(cat html/數31.html)" $$(cat tools/wppwd)
#	touch html/.31.publ

# .32.publ: 數32.html
#	casperjs tools/wordpresspublish.js 32 "$$(cat html/數32.html)" $$(cat tools/wppwd)
#	touch html/.32.publ

# .33.publ: 數33.html
#	casperjs tools/wordpresspublish.js 33 "$$(cat html/數33.html)" $$(cat tools/wppwd)
#	touch html/.33.publ

