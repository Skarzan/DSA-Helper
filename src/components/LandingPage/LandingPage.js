import React from "react";
import Banner from "./Banner";
import ImageAndText from "./ImageAndText";
import TextWithCTO from "./TextWithCTO";
import Advantages from "./Advantages";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 1000 });

export default () => {
  const advantageHeroBackground =
    "linear-gradient(-115deg, rgb(60,213,130,0.9) 0%, rgb(77,132,71,0.9) 100%)";

  const advantageBattleBackground =
    "linear-gradient(115deg, rgba(200,159,70,0.9),rgba(190,12,70,0.9))";

  const heroAdvantages = [
    {
      text:
        "Lege dir ein kostenloses Konto an und speichere deine Heldengruppe",
      description:
        "Lege dir ein Nutzerkonto an und spare dir das eingeben der Heldendaten. Lade und speichere deine Heldengruppen. Kein Verlust mehr von Daten.",
      imageSrc: require("../../assets/img/Landingpage/heroAdvantage1.png"),
      altText: "Login Menü",
      backgroundFront: advantageHeroBackground,
      backgroundBack: advantageHeroBackground
    },
    {
      text: "Verwalte die Zustände deiner Helden und lege eigene Zustände fest",
      description:
        "Gebe deinen Helden einen Status aus vorgefertigten Status und Zustand Optionen. Lege die Stufe und die Rundenanzahl des Status fest. Nicht das passende dabei? Erstelle eigene Stati oder Zauberwirkungen",
      imageSrc: require("../../assets/img/Landingpage/heroAdvantage2.png"),
      altText: "Zustandsformular",
      backgroundFront: advantageHeroBackground,
      backgroundBack: advantageHeroBackground
    },
    {
      text: "Habe die Geldbörsen und Schicksalsmarker immer im Blick",
      description:
        "Verwalte die Geldbörsen und Schicksalsmarker deiner Helden mit wenigen Klicks. So hast du immer die Kontrolle und Übersicht über alle deine Helden.",
      imageSrc: require("../../assets/img/Landingpage/heroAdvantage3.png"),
      altText: "Geldbörse und Schicksalsmarker",
      backgroundFront: advantageHeroBackground,
      backgroundBack: advantageHeroBackground
    },
    {
      text: "Einfache Visualisierung und Änderung der Lebenspunkte",
      description:
        "Lebenspunkte, Astralpunkte und Karmapunkte deiner Helden werden in ansprechenden Leisten dargestellt.",
      imageSrc: require("../../assets/img/Landingpage/heroAdvantage4.png"),
      altText: "Lebensleisten",
      backgroundFront: advantageHeroBackground,
      backgroundBack: advantageHeroBackground
    },
    {
      text: "Automatische Berechnung der Schmerzstufe",
      description:
        'Fallen die Lebenspunkte eines Helden unter eine Schmerzstufe, wird ihm automatisch eine Stufe des Zustands "Schmerz" hinzugefügt. Regeneriert der Held den Schaden wird der Zustand wieder automatisch entfernt.',
      imageSrc: require("../../assets/img/Landingpage/heroAdvantage5.png"),
      altText: "Schmerzstufe",
      backgroundFront: advantageHeroBackground,
      backgroundBack: advantageHeroBackground
    }
  ];

  const battleAdvantages = [
    {
      text: "Alle Daten der Helden und Gegner auf einem Blick",
      description:
        "Erkenne und ändere die Lebenspunkte und Zustände aller Kämpfer. Lösche besiegte oder geflohene Kämpfer aus dem Initiativezeitstrahl.",
      imageSrc: require("../../assets/img/Landingpage/battleAdvantage2.png"),
      altText: "Initiativezeitstrahl",
      backgroundFront: advantageBattleBackground,
      backgroundBack: advantageBattleBackground
    },
    {
      text: "Füge weitere Kämpfer zum Kampf hinzu",
      description:
        "Füge Kämpfer zum Kampf hinzu indem du Namen und Werte vergibst. Die Initiative wird automatisch ausgewürfelt und der Kämpfer dem Initiativezeitstrahl hinzugefügt.",
      imageSrc: require("../../assets/img/Landingpage/battleAdvantage1.png"),
      altText: "Kämpferformular",
      backgroundFront: advantageBattleBackground,
      backgroundBack: advantageBattleBackground
    },
    {
      text: "Automatisches Management von zeitlichen Status",
      description:
        "Hält ein Zustand nur für eine bestimmte Rundenanzahl an, wird der Wert nach jeder Kampfrunde des Kämpfers reduziert. Erreicht der Wert 0 wird der Zustand automatisch entfernt.",
      imageSrc: require("../../assets/img/Landingpage/battleAdvantage3.png"),
      altText: "Zustandsentfernung",
      backgroundFront: advantageBattleBackground,
      backgroundBack: advantageBattleBackground
    },
    {
      text: "Schnelles anlegen des Kampfes durch Musterkämpfer",
      description:
        "Erstelle Kämpfer in Sekunden durch vorgefertigte Kämpfermuster. Die Standardwerte werden automatisch ins Kämpferformular eingetragen und können erstellt werden.",
      imageSrc: require("../../assets/img/Landingpage/battleAdvantage4.png"),
      altText: "Vorgefertigter Kämpfer Dropdown",
      backgroundFront: advantageBattleBackground,
      backgroundBack: advantageBattleBackground
    },
    {
      text: "Erstelle Gruppen von Kämpfern mit einem Klick",
      description:
        "Lege Gruppen von Kämpfern an. Die Daten sind für jeden Kämpfer der Gruppe identisch, jedoch wird die Initiative für jeden einzelnen Kämpfer separat ausgewürfelt.",
      imageSrc: require("../../assets/img/Landingpage/battleAdvantage5.png"),
      altText: "Kämpfergruppen Dropdown",
      backgroundFront: advantageBattleBackground,
      backgroundBack: advantageBattleBackground
    }
  ];

  return (
    <div class="LandingPage">
      <Banner
        header="Verbringe mehr Zeit mit spielen"
        subheader="Verwalte deine DSA-Spielgruppen so einfach wie noch nie mit dem digitalen Meisterschirm"
        imageURL={require("../../assets/img/Landingpage/heroshot.png")}
        alt="productImage"
        background={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${require("../../assets/img/Landingpage/banner.jpg")})`}
        ctaText="Jetzt kostenfrei nutzen"
        ctaLink="/heldengruppe"
      />
      <ImageAndText
        text="In der Heldenübersicht hast du die Werte deiner Gruppe auf einem Blick. Ändere aktuelle Lebenspunkte, Schicksalmarker, Zustände und mehr mit nur einem Klick."
        imageURL={require("../../assets/img/Landingpage/Heldengruppe.png")}
        altText="window"
        textPositionLeft={true}
        background="rgba(0, 0, 0, 0) linear-gradient(-115deg, #3cd582 0%, #4d8447 100%) repeat scroll 0% 0%"
      />

      <Advantages advantages={heroAdvantages}></Advantages>

      <ImageAndText
        text="Behalte in Kämpfen die Übersicht über die aktuelle Kampfsituation. Verwalte Helden und Gegner in einem übersichtlichen Initiative Zeitstrahl."
        imageURL={require("../../assets/img/Landingpage/Kampfmanager.png")}
        altText="window"
        textPositionLeft={false}
        background="linear-gradient(115deg, rgba(200,159,70,1),rgba(190,12,70,1))"
      />

      <Advantages advantages={battleAdvantages}></Advantages>

      <TextWithCTO
        text="Schluss mit der Zettelwirtschaft: teste jetzt den digitalen Meisterschirm!"
        buttonText="Kostenfrei ausprobieren"
        buttonLink="/heldengruppe"
        background="linear-gradient(to bottom, #104e82 0%, #0a3355 70%)"
      ></TextWithCTO>
    </div>
  );
};
