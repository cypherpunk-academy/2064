
vpath %.adoc parts
vpath %.html html
vpath %.adoc chapters

allparts: 數1.html 數2.html 數3.html 數4.html 數5.html 數6.html 數7.html 數8.html 數9.html 數10.html 數11.html 數12.html 數13.html 數14.html 數15.html 數16.html 數17.html

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

