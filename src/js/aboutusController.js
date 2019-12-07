
function changeTextAboutUs(oEvent){

    document.getElementById("idUeberUns").classList.add('active');
    document.getElementById("idImpressum").classList.remove('active');
    document.getElementById("idAGB").classList.remove('active');
    document.getElementById("idDatenschutz").classList.remove('active');

    document.getElementById("idRightBoxH3").innerHTML = "Das Doggogram"
    document.getElementById("idRightBoxText").innerHTML = "Beim Doggogram handelt es sich um eine Webseite der sozialen Medien für Hunde. Jeder Hundebesitzer kann hier seinem Hund ein Profil anlegen und somit seine Hundeerlebnisse mit anderen teilen. "

}
function changeTextImpressum(oEvent){

    document.getElementById("idImpressum").classList.add('active');
    document.getElementById("idUeberUns").classList.remove('active');
    //document.getElementById("idImpressum").classList.remove('active');
    document.getElementById("idAGB").classList.remove('active');
    document.getElementById("idDatenschutz").classList.remove('active');

    document.getElementById("idRightBoxH3").innerHTML = "Unsere Anschriftdaten"
    document.getElementById("idRightBoxText").innerHTML = "Auch das Doggogram hält sich an folgende gesetzliche Vorschrift: \n (1) Diensteanbieter haben für geschäftsmäßige, in der Regel gegen Entgelt angebotene Telemedien folgende Informationen leicht erkennbar, unmittelbar erreichbar und ständig verfügbar zu halten:\n" +
        "1.\n" +
        "den Namen und die Anschrift, unter der sie niedergelassen sind, bei juristischen Personen zusätzlich die Rechtsform, den Vertretungsberechtigten und, sofern Angaben über das Kapital der Gesellschaft gemacht werden, das Stamm- oder Grundkapital sowie, wenn nicht alle in Geld zu leistenden Einlagen eingezahlt sind, der Gesamtbetrag der ausstehenden Einlagen,\n" +
        "2.\n" +
        "Angaben, die eine schnelle elektronische Kontaktaufnahme und unmittelbare Kommunikation mit ihnen ermöglichen, einschließlich der Adresse der elektronischen Post,\n" +
        "3.\n" +
        "soweit der Dienst im Rahmen einer Tätigkeit angeboten oder erbracht wird, die der behördlichen Zulassung bedarf, Angaben zur zuständigen Aufsichtsbehörde,\n" +
        "4.\n" +
        "das Handelsregister, Vereinsregister, Partnerschaftsregister oder Genossenschaftsregister, in das sie eingetragen sind, und die entsprechende Registernummer,\n" +
        "5.\n" +
        "soweit der Dienst in Ausübung eines Berufs im Sinne von Artikel 1 Buchstabe d der Richtlinie 89/48/EWG des Rates vom 21. Dezember 1988 über eine allgemeine Regelung zur Anerkennung der Hochschuldiplome, die eine mindestens dreijährige Berufsausbildung abschließen (ABl. EG Nr. L 19 S. 16), oder im Sinne von Artikel 1 Buchstabe f der Richtlinie 92/51/EWG des Rates vom 18. Juni 1992 über eine zweite allgemeine Regelung zur Anerkennung beruflicher Befähigungsnachweise in Ergänzung zur Richtlinie 89/48/EWG (ABl. EG Nr. L 209 S. 25, 1995 Nr. L 17 S. 20), zuletzt geändert durch die Richtlinie 97/38/EG der Kommission vom 20. Juni 1997 (ABl. EG Nr. L 184 S. 31), angeboten oder erbracht wird, Angaben über\n" +
        "a)\n" +
        "die Kammer, welcher die Diensteanbieter angehören,\n" +
        "b)\n" +
        "die gesetzliche Berufsbezeichnung und den Staat, in dem die Berufsbezeichnung verliehen worden ist,\n" +
        "c)\n" +
        "die Bezeichnung der berufsrechtlichen Regelungen und dazu, wie diese zugänglich sind,\n" +
        "6.\n" +
        "in Fällen, in denen sie eine Umsatzsteueridentifikationsnummer nach § 27a des Umsatzsteuergesetzes oder eine Wirtschafts-Identifikationsnummer nach § 139c der Abgabenordnung besitzen, die Angabe dieser Nummer,\n" +
        "7.\n" +
        "bei Aktiengesellschaften, Kommanditgesellschaften auf Aktien und Gesellschaften mit beschränkter Haftung, die sich in Abwicklung oder Liquidation befinden, die Angabe hierüber.\n" +
        "(2) Weitergehende Informationspflichten nach anderen Rechtsvorschriften bleiben unberührt. \n \nDoggogramstraße 16 \n 88213 Ravensburg \n Herr Dr. Prof. Max Mustermann"

}
function changeTextAGB(oEvent){

    document.getElementById("idAGB").classList.add('active');
    document.getElementById("idUeberUns").classList.remove('active');
    document.getElementById("idImpressum").classList.remove('active');

    document.getElementById("idDatenschutz").classList.remove('active');

    document.getElementById("idRightBoxH3").innerHTML = "Unsere AGBs"

    document.getElementById("idRightBoxText").innerHTML = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   \n" +
    "\n" +
    "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   \n" +
    "\n" +
    "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse"



}
function changeTextDR(oEvent){

    document.getElementById("idDatenschutz").classList.add('active');
    document.getElementById("idUeberUns").classList.remove('active');
    document.getElementById("idImpressum").classList.remove('active');
    document.getElementById("idAGB").classList.remove('active');


    document.getElementById("idRightBoxH3").innerHTML = "Datenschutz beim Doggogram"
    document.getElementById("idRightBoxText").innerHTML = "Der Schutz personenbezogener Daten ist uns ein\n" +
        "wichtiges Anliegen. Deshalb verarbeiten wir die personenbezogenen Daten unserer Mitarbeiter, Kunden\n" +
        "sowie Geschäftspartner in Übereinstimmung mit\n" +
        "den anwendbaren Rechtsvorschriften zum Schutz\n" +
        "personenbezogener Daten und zur Datensicherheit.\n" +
        "In dieser Datenschutzrichtlinie wird beschrieben, welche Arten von personenbezogenen Daten\n" +
        "wir erheben, wie diese Daten genutzt werden, an\n" +
        "wen sie übermittelt werden und welche Wahlmöglichkeiten und Rechte betroffene Personen im Zusammenhang mit unserer Verarbeitung der Daten\n" +
        "haben. Außerdem beschreiben wir, mit welchen\n" +
        "Maßnahmen wir die Sicherheit der Daten gewährleisten und wie betroffene Personen Kontakt mit\n" +
        "uns aufnehmen können, wenn Sie Fragen zu unseren Datenschutzpraxis haben.\n" +
        "Diese Richtlinie regelt die datenschutzkonforme\n" +
        "Informationsverarbeitung und die insoweit bei der\n" +
        "XY-GmbH bestehenden Verantwortlichkeiten. Alle\n" +
        "Mitarbeiter sind zur Einhaltung der Richtlinie verpflichtet.\n" +
        "Sie richtet sich an\n" +
        ">>\t die Personen oder Abteilungen, die über den\n" +
        "Einsatz/die Bereitstellung eines Anwendungssystems entscheiden (hier kann entsprechend der\n" +
        "Unternehmensorganisation der Name eingesetzt\n" +
        "werden: z.B. IT-Abteilung, Systemadministrator\n" +
        "= nachstehend ist insoweit von IT-Abteilung die\n" +
        "Rede);\n" +
        ">>\t die Personen oder Abteilungen, die über die\n" +
        "Nutzung des Systems für ihre Aufgaben entscheiden (betroffen sind i.d.R. die Fachabteilungen; ggf.\n" +
        "können diese benannt werden);\n" +
        ">>\t Benutzer, d.h. diejenigen, die das zur Verfügung\n" +
        "gestellte System für die Erledigung ihrer betrieblichen Aufgaben nutzen (bei Speicherung personenbezogener Daten auf einem Arbeitsplatzrechner\n" +
        "entscheidet der einzelne Benutzer ggf. auch über\n" +
        "die im System erfolgende Verarbeitung und die dazu\n" +
        "verwendeten Programme),\n" +
        ">> den betrieblichen Datenschutzbeauftragten\n" +
        "(DSB), der ihre Umsetzung beratend und kontrollierend begleitet und die ihm speziell zugewiesenen\n" +
        "Aufgaben wahrzunehmen hat."

}