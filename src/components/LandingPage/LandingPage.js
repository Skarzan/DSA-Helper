import React from "react";
import Banner from "./Banner";
import ImageAndText from "./ImageAndText";
import TextWithCTO from "./TextWithCTO";
import Advantages from "./Advantages";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 1000 });

export default () => {
  const heroAdvantages = [
    {
      text: "Lege dir ein Konto an und speichere deine Heldengruppe",
      imageSrc: require("../../assets/img/Landingpage/Heldengruppe.png"),
      altText: "Mein alt text",
      background:
        "linear-gradient(-115deg, rgb(60,213,130,0.9) 0%, rgb(77,132,71,0.9) 100%)"
    },
    {
      text: "Verwalte die Zustände deiner Helden und lege eigene Zustände fest",
      imageSrc: require("../../assets/img/Landingpage/Heldengruppe.png"),
      altText: "Mein alt text",
      background:
        "linear-gradient(-115deg, rgb(60,213,130,0.9) 0%, rgb(77,132,71,0.9) 100%)"
    },
    {
      text: "Habe die Geldbörsen und Schicksalsmarker immer im Blick",
      imageSrc: require("../../assets/img/Landingpage/Heldengruppe.png"),
      altText: "Mein alt text",
      background:
        "linear-gradient(-115deg, rgb(60,213,130,0.9) 0%, rgb(77,132,71,0.9) 100%)"
    },
    {
      text: "Einfache Visualisierung und Änderung der Lebenspunkte",
      imageSrc: require("../../assets/img/Landingpage/Heldengruppe.png"),
      altText: "Mein alt text",
      background:
        "linear-gradient(-115deg, rgb(60,213,130,0.9) 0%, rgb(77,132,71,0.9) 100%)"
    },
    {
      text: "Automatische Berechnung der Schmerzstufe",
      imageSrc: require("../../assets/img/Landingpage/Heldengruppe.png"),
      altText: "Mein alt text",
      background:
        "linear-gradient(-115deg, rgb(60,213,130,0.9) 0%, rgb(77,132,71,0.9) 100%)"
    }
  ];

  const battleAdvantages = [
    {
      text: "Füge weitere Kämpfer zum Kampf hinzu",
      imageSrc: require("../../assets/img/Landingpage/Heldengruppe.png"),
      altText: "Mein alt text",
      background:
        "linear-gradient(115deg, rgba(200,159,70,0.9),rgba(190,12,70,0.9))"
    },
    {
      text: "Alle Daten der Helden und Gegner auf einem Blick",
      imageSrc: require("../../assets/img/Landingpage/Heldengruppe.png"),
      altText: "Mein alt text",
      background:
        "linear-gradient(115deg, rgba(200,159,70,0.9),rgba(190,12,70,0.9))"
    },
    {
      text: "Automatisches Management von zeitlichen Status",
      imageSrc: require("../../assets/img/Landingpage/Heldengruppe.png"),
      altText: "Mein alt text",
      background:
        "linear-gradient(115deg, rgba(200,159,70,0.9),rgba(190,12,70,0.9))"
    },
    {
      text: "Einfache Visualisierung und Änderung der Lebenspunkte",
      imageSrc: require("../../assets/img/Landingpage/Heldengruppe.png"),
      altText: "Mein alt text",
      background:
        "linear-gradient(115deg, rgba(200,159,70,0.9),rgba(190,12,70,0.9))"
    },
    {
      text: "Optischer Indikator des aktuellen Helden",
      imageSrc: require("../../assets/img/Landingpage/Heldengruppe.png"),
      altText: "Mein alt text",
      background:
        "linear-gradient(115deg, rgba(200,159,70,0.9),rgba(190,12,70,0.9))"
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
