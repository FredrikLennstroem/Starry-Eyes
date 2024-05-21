<a id=start></a>

# StarryEyes

Projektwebseite von *StarryEyes*. Die App enthält eine Server und eine Client Umgebung.
- Server: FastAPI, Geoserver
- Client: React + Leaflet

GitHub Repository: [FredrikLennstroem/Starry-Eyes](https://github.com/FredrikLennstroem/Starry-Eyes)

![StarryEyes Startseite Screenshot](images/Startseite.png)

## Inhaltsverzeichnis
- [Die App](#beschrieb)   
- [Anwendung](#funktionen)
    - [Video](#video)
    - [Willkommenstext](#willkommenstext)
    - [Hintergrundkarte](#karte)
    - [Layer](#layer)
    - [Mondphasen](#mond)
    - [Popup](#popup)
    - [Standort überwachen](#standortueberwachen)
- [Architektur Backend](#backend)
    - [API](#api)
    - [Berechnung Sonnenstand](#sonnenstand)
    - [Email Benachrichtigung](#email)
    - [Schatten Berechnung](#schattenber)
    - [Geoserver](#geoserver)
- [Architektur Frontend](#frontend)
    - [Mockup](#mockup)
    - [Berechnung Mondphasen](#berechnungmond)
    - [Lichtverschmutzungskarte](#lichtverschmutzungskarte)
    - [Schatten Visualisierung](#schattenvis)
    - [Farb- und Symbolkonzept](#farbsymbolkonzept)
    - [Feedback Features](#feedback-features)
- [Upcoming Features](#features)
- [Contribution](#contribution)

## Die App
<a id=beschrieb></a>

Die App ermöglicht die Planung von Sternen- und Sonnenaufgangs-/untergangsfotos. Nutzer können mit integrierten Lichtverschmutzungs- und Schattenkarten den idealen Fotostandort wählen. Die App bietet Zugriff auf aktuelle Wetterdaten über eine API (z.B. Wolkenabdeckung). Mit der Überwachungsfunktion können Nutzer per Email über das optimale Zeitfenster für das Foto am ausgewählten Standort informiert werden. Zur weiteren Unterstützung der Planung sind die aktuellen Mondphasen graphisch dargestellt.

## Installation
<a id=installation></a>
Installation der APP erfolgt mit der Anleitung im github repository:
[FredrikLennstroem/Starry-Eyes](https://github.com/FredrikLennstroem/Starry-Eyes)

## Anwendung
<a id=funktionen></a>

### Video
<a id=video></a>

Das Video gibt Ihnen eine kurzen Einblick in die Funktionalität dieser App:

[![StarryEyes Video](images/StarryEyes_Video.png)](images/StarryEyes_Video.mp4)

### Willkommenstext
<a id=willkommenstext></a>

Beim ersten Öffnen der App erhält man eine kurze Erklärung eingeblendet. Durch bestätigen der Checkbox wird diese dem Nutzenden beim erneuten zugreifen auf die App nicht mehr angezeigt. Zu Testzwecken kann dieser Entscheid durch klicken auf das StarryEyes Logo rückgängig gemacht werden.

![Willkommenstext](images/Anwendung_Willkommen.png)

### Hintergrundkarte
<a id=karte></a>

Im Hintergrund sind zwei unterschiedliche Karten der Swisstopo, je nach Zoomstufe. Bis Zoomlevel 15 ist die farbige Pixelkarte sichtbar. Diese bietet dem Nutzenden gute Anhaltspunkte sich zu orientieren. Ab Zoomlevel 16 wird dann die swissTLM-Map (farbig) dargestellt. Diese ist hauptsächlich für den Massstabsbereich 1:10'000 - 1:5'000 geeignet und zeigt eine genauere Darstellung des Geländes. So ist es möglich, den gewünschten Standort exakter abzusetzen.

### Layer
<a id=layer></a>

Das Menuicon Oben Links bietet die Möglichkeit, folgende zusätzliche Layer einzublenden:
- Schattenkarte: Sie zeigt den Schattenwurf des jeweiligen Tages im Viertelstundentakt. Die Zeit kann über einen Slider bestimmt werden.
- Lichtverschmutzungskarte: Sie zeigt die Lichtverschmutzung in vier verschiedenen Klassen (keine, wenig, hohe oder starke Lichtverschmutzung) über die ganze Schweiz.
- Symbolerklärungen: Hier wird eine neue Seite eingeblendet, die alle verwendeten Symbole kurz erklärt.

### Mondphasen
<a id=mond></a>

Am rechten Rand findet sich ein Mondsymbol. Dieses öffnet die Information zu den Mondphasen der kommenden drei Nächte. Die Erklärung zu den Mondphasensymbolen und der Link zur verwendeten Klassierung, findet der Nutzende in der [Symbolerklärung](#layer).

![Mondphasen](images/Anwendung_Mondphase.png)


### Popup
<a id=popup></a>

Wird auf die Positionsnadel geklickt, zeigt ein Popup Informationen zum gewählten Standort an:
- Sonnenzeiten
    - Sonnenuntergang / -aufgang Gelände
    - Sonnenuntergang / -aufgang Horizont
- Wolkenabdeckung in Prozent
    - Tag
    - Nacht

![Popup](images/Anwendung_Popup.png)

### Standort überwachen
<a id=standortueberwachen></a>

Wenn ein Standort von Interesse ist, kann er über Nacht überwacht werden. Durch Klicken auf "ORT ÜBERWACHEN" öffnet sich ein Eingabefenster, in dem eine E-Mail-Adresse für Benachrichtigungen eingegeben werden kann. Nach Eingabe der E-Mail-Adresse wird eine Bestätigung an diese Adresse gesendet. Diese Bestätigung enthält aktuelle Wetterinformationen und ein Hemisphärenbild des Standorts. Diese Funktion ist nur für eine Nacht aktiv.

![Standort überwachen](images/Anwendung_Ueberwachen.png)

## Architektur Backend
<a id=backend></a>

### API
<a id=api></a>

Um aktuelle Wetterinformationen anzeigen zu können wird eine Wetter-API benötigt. Dazu wird die API von Open-Meteo verwendet:
[https://open-meteo.com/](https://open-meteo.com/)

Es werden die Wolkenabdeckungen auf tiefer, mittlerer und hoher Höhe bezogen, sowie das aktuelle Wetter (z.B. "Regen").

### Berechnung Sonnenstand
<a id=sonnenstand></a>

Der Sonnenstand wird auf zwei verschiedene Arten berechnet:
- Theoretisch: Sonnenuntergang/-aufgang hinter dem Horizont. Dazu wird die 'Pyephem'-Bibliothek von Brandon Rhodes verwendet: [Pyephem](https://github.com/brandon-rhodes/pyephem)
- Im Gelände: Sonnenuntergang/-aufgang hinter dem Gelände. Dies wird mit der 'tppss'-Bibliothek von gvellut berechnet: [tppss](https://github.com/gvellut/tppss)

Diese beiden Methoden sind im Backend in einer Funktion verbaut die im Frontend als Rest-API aufgerufen werden kann.

### Email Benachrichtigung
<a id=email></a>

Die Email wird mit der Adresse noreply.starryeyes@gmail.com verschickt. Dazu wurde die IMAP-Funktion im Googlekonto aktiviert. Diese Funktion ermöglichte es, mit dem automatisch generierten Apppasswort, Emails mit Python verschicken zu können. Für den Inhalt, wurde eine HTML-Struktur geschrieben in der die aktuellen Informationen zum Standort eingefühgt werden. 

Für das Hemisphärenbild ist aktuell noch ein Platzhalter drin (siehe [Upcoming Features](#features)).

Wie die Sonnenstandberechnungen, werden die Emails mittels API im Backend verschickt. Damit die Email-Funktion läuft, werden die Zugriffsdaten des Emailkontos benötigt. Aktuell wird dass mittels einem YAML config file gelöst, welches nicht auf Github abgelegt ist. Sollte das Bedürfnis da sein, um die StarryEyes-email zu verwenden kann [Fredrik Lennström](https://github.com/FredrikLennstroem) kontaktiert werden. Zum Aufsetzen einer eigenen Email siehe die Anleitung im REDME des Github Repos [FredrikLennstroem/Starry-Eyes](https://github.com/FredrikLennstroem/Starry-Eyes).

Betreffend Sicherheit ist dieser Ansatz natürlich nicht ideal. Er wurde aber gewählt weil er einfach ist und nur als Prototyp dienen soll.

### Schatten Berechnung
<a id=schattenber></a>

Die Idee ist, jeden Tag (in der Nacht) alle notwendigen Tiff-Dateien zu berechnen und zu erstellen, um den Verlauf der Schatten darstellen zu können. Eine Funktion wird verwendet, um eine Liste von Dictionaries zu erstellen. Jedes Dictionary enthält die Stunde, die Minute und die Position der Sonne zu dieser Zeit (Azimut und Höhe). Um die Position der Sonne berechnen zu können, wurde das Modul ["suncalc"](https://pypi.org/project/suncalc/) verwendet. Dann wird auf der Grundlage des [DHM25-Höhenmodells](https://www.swisstopo.admin.ch/de/hoehenmodell-dhm25) der sogenannte "Horizon Angle" berechnet und überprüft, ob die steilste Neigung  in Richtung der Sonne grösser oder kleiner als die Sonnenhöhe ist.
Die Berechnung der "Horizon Angle" erfolgt dank einer Funktion ("horizonangle") von [Whitebox Geospatial](https://www.whiteboxgeo.com/).
Mit dem Schedule-Modul kann der Startzeitpunkt der Funktion programmiert werden, aber das wurde noch nicht implementiert.

### Geoserver
<a id=geoserver></a>

Über einen lokal aufgesetzten Geoserver werden die zwei einblendbaren Layer publiziert und im Frontend dann als WMS dargestellt. Die Lichtverschmutzung ist eine einzelne GeoTiff Datei, während der Schattenlayer aus 96 GeoTiff Dateien besteht. Diese werden aus einem Orderverzeichnis bezogen und jeweils in der Nacht für den folgenden Tag neu gerechnet. Die Darstellung der Layer wird via *.sld-Datei auf dem Geoserver importiert und als zusätzlicher Parameter vom Frontend bezogen.

## Architektur Frontend
<a id=frontend></a>

### Mock-Up
<a id=mockup></a>

Das Mock-Up dient der ersten Überisicht über die App. Es zeigt den geplanten Aufbau und das ungefähre Aussehen und ist ein grosses Hilfsmittel beim Erstellen des Frontends.

![Mockup_0](images/Mockup_0.png)

![Mockup_1](images/Mockup_1.png)

![Mockup_2](images/Mockup_2.png)

![Mockup_3](images/Mockup_3.png)

### Berechnung Mondphasen
<a id=berechnungmond></a>

Die Mondphasen werden mit dem npm Modul [lunarphase-js](https://www.npmjs.com/package/lunarphase-js) berechnet. Die Einteilung in die acht Mondphasen wurde ebenfalls daraus übernommen.

### Lichtverschmutzungskarte
<a id=lichtverschmutzungskarte></a>

![Lichtverschmutzung](images/Design_Lichtverschmutzung.png)

Die Daten der Lichtverschmutzung wurden als Tiff von [Lightpollutionmap.info](https://www.lightpollutionmap.info/) bezogen. Diese werden jährlich aktualisiert. Die Werte reichen von 0 bis 75 magnitude/arcsec<sup>2</sup> welche die Flächenhelligkeit beschreibt. Diese Werte können in Klassen aufgeteilt werden, welche die Sichtbarkeit der Sterne beschreiben ([Bortle Dark Sky Scale](https://www.handprint.com/ASTRO/bortle.html)). Aufgrund dieser Einschätzung haben wir uns entschieden vier für den Nutzenden unserere App relevante Klassen zu erstellen:
- <0.5:&ensp;&nbsp;keine Lichtverschmutzung
- 0.5-1:&ensp;wenig Lichtverschmutzung
- 1-9:&emsp;&nbsp;hohe Lichtverschmutzung
- \>9:&emsp;&ensp;starke Lichtverschmutzung

### Schatten Visualisierung
<a id=schattenvis></a>

Die Daten werden im Backend berechnet und lokal gespeichert. Sie werden jeden Tag neu berechnet. Jedes in diesen TIFF-Dateien enthaltene Pixel enthält den Wert 0 oder 1. Wenn der Wert 0 ist, befindet sich das betreffende Pixel im Schatten. Auf der Website wird es schwarz angezeigt, aber mit einer gewissen Transparenz, die es ermöglicht, die Karte darunter zu sehen. Wenn der Wert hingegen 1 ist, liegt das Pixel in der Sonne und wird transparent angezeigt. 

### Farb- und Symbolkonzept
<a id=farbsymbolkonzept></a>

Die Farbe <span style="color:#334854">#334854</span> wurde in der ganzen App als Hauptakzentfarbe verwendet und tritt immer wieder auf. Der dunkle Grau-Ton mit Blaustich soll die ganze Seite farblich umrahmen.
Als Sekundärfarbe wurde dann noch ein etwas hellerer Grau-Blau-Ton <span style="color:#667784">#667784</span> gewählt. Dieser wurde verwendet um das Hovern auf Buttons und Icons darzustellen und so dem Nutzenden ein Feedback zu geben.

![Designkonzept](images/Design_Konzept.png)

Buttons, Checkboxen, Icons, etc. stammen alle aus der [MUI-Bibliothek](https://mui.com/) und wurden entsprechend dem Farbkonzept angepasst. So konnte einfach eine einheitliche Seite aufgebaut werden. Die Elemente wurden mit Ecken und ohne Abrundungen versehen. Auch so entstand ein gleichmässiges Erscheinungsbild.

![Symbolerklärungen](images/Design_Symbolerklärungen.png)

Alle verwendeten Symbole wurden selbst designt, sodass ein konsistentes Erscheinungsbild entsteht. Es wurde darauf geachtet, dass sie ins Farbkonzept passen und dass sie möglichst intuitiv zu verstehen sind.

Icons, Symbole und Bilder wurden mit Hovertexten versehen, die dem Nutzenden eine schnelle und kurze Erklärung dazu abgeben. Wo möglich wurde zudem ein Alternativtext vergeben. Dieser wird angezeigt, wenn ein Element nicht geladen werden kann oder er wird erkannt, wenn die Seite mit einem Leseprogramm vorgelesen wird.

### Feedback Features
<a id=feedbackfeatures></a>

![Feedback Features](images/Design_Feedback.png)

Beim Abfragen der Standortinformation im PopUp des Markes kann es einige Sekunden dauern, bis die API die aktuellen Daten abgerufen hat. Diese Zeit wurde mit Ladekreisen überbrückt. <br/>
Es ist wichtig dem Nutzenden Rückmeldungen auf seine Interaktionen zu geben. Also wurde das Abwarten der Übermittlung der Emailadresse mit einem Ladekreis auf dem Button dargestellt.Die erfolgreiche Übermittlung wurde ebenfalls abgefangen um ein kurzes Feedback auszulösen, welches nach kurzer Zeit wieder verschwindet.

## Upcoming Features
<a id=features></a>

- [x] Berechnung der Wolkenabdeckung in Prozent
- [ ] [Standortinformationen über Nacht überwachen](#feature_nachtueberwachung)
- [ ] [Schattenlayer als WMTS aufbereiten](#feature_schattenlayer)
- [ ] [Berücksichtigung der Lichtverschmutzung zur Einschätzung der Sternensichtbarkeit](#feature_lichtverschmutzung)
- [ ] [Hemisphärenbild](#feature_hemisphaerenbild)
- [ ] [Emailstruktur verbessern und verschönern](#email-benachrichtigung)
- [ ] Suchfunktion zur Navigation in der Karte
- [ ] Geräteposition beziehen um Informationen am Livestandort anzuzeigen
- [ ] Luftbilder als zusätzliche Hintergrundkarte


### Standortinformationen über Nacht überwachen
<a id=feature_nachtueberwachung></a>

Diese Funktion ist im Frontend der App bereits implementiert und auch die Möglichkeit besteht bereits, die Emailadresse zu hinterlegen (Speicherung in einer SQLite Datenbank). Diese Funktion würde stündlich an alle E-Mail-Adressen in der Datenbank zum jeweiligen Standort aktuelle Wetterdaten senden. Die Datenbank würde von der Funktionn jeweils am Morgen gelöscht werden.

![Funktion nicht verfügbar](images/Feature_Abo.png)

### Schattenlayer als WMTS
<a id=feature_schattenlayer></a>

Aktuell dauert das Laden der einzelnen Schattenlayer zu lange. Die Daten könnten gekachelt zur Verfügung gestellt werden um diesen Layer performanter zu machen.

### Berücksichtigung der Lichtverschmutzung
<a id=feature_lichtverschmutzung></a>

Die Einschätzung der Sternensichtbarkeit in der Nacht bezieht sich auf die Wolkenabdeckung am jeweiligen Standort. Die Lichtverschmutzung hat einen Einfluss auf die Sichtbarkeit, weshalb diese als Layer vorhanden ist. Sie sollte jedoch auch in diese Einschätzung einfliessen. Dafür müsste zum jeweiligen Standort der Pixelwert aus dem Tiff bezogen werden und eine geeignete Schätzung zusammen mit den Wetterdaten gemacht werden.

### Hemisphärenbild
<a id=feature_hemisphaerenbild></a>

Dieses könnte mit der ersten Bestätigungsmail versendet werden. Es zeigt die Geländeabdeckung am Standort und visulisiert die Abdeckung des Himmels durch anliegendes Gelände.

![StarryEyes Konzept Hemisphärenbild](images/Hemisphärenbild.png)

## Contribution
<a id=contribution></a>

- Alex Burà, GitHub: [alexbura](https://github.com/alexbura)
- Fredrik Lennström, GitHub: [FredrikLennstroem](https://github.com/FredrikLennstroem)
- Silas Haab, GitHub: [SilasHaab](https://github.com/SilasHaab)

[Zurück nach oben](#start)