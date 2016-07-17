vpath %.adoc parts
vpath %.html html

allparts: 數10.html 數1.html 數2.html 數3.html 數4.html 數5.html 數6.html 數7.html 數8.html 數9.html 

數1.html: 數1.adoc
	asciidoctor -D html parts/數1.adoc  

數2.html: 數2.adoc
	asciidoctor -D html parts/數2.adoc

數3.html: 數3.adoc
	asciidoctor -D html parts/數3.adoc

數4.html: 數4.adoc
	asciidoctor -D html parts/數4.adoc

數5.html: 數5.adoc
	asciidoctor -D html parts/數5.adoc

數6.html: 數6.adoc
	asciidoctor -D html parts/數6.adoc

數7.html: 數7.adoc
	asciidoctor -D html parts/數7.adoc

數8.html: 數8.adoc
	asciidoctor -D html parts/數8.adoc

數9.html: 數9.adoc
	asciidoctor -D html parts/數9.adoc

數10.html: 數10.adoc
	asciidoctor -D html parts/數10.adoc  
