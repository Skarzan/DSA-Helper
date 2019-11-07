import React from "react";
import Banner from "./Banner";
import ImageAndText from "./ImageAndText";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 1000 });

export default () => {
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
        imageURL="https://www.mt66.de/gib-workshops/img/gibweb007-001.jpg"
        altText="window"
        textPositionLeft={true}
        background="rgba(0, 0, 0, 0) linear-gradient(rgb(217, 215, 215), rgb(147, 147, 147)) repeat scroll 0% 0%"
      />
      <ImageAndText
        text="Behalte in Kämpfen die Übersicht über die aktuelle Kampfsituation. Verwalte Helden und Gegner in einem übersichtlichen Initiative Zeitstrahl."
        imageURL="https://www.mt66.de/gib-workshops/img/gibweb007-001.jpg"
        altText="window"
        textPositionLeft={false}
        background="linear-gradient(rgba(200,159,70,1),rgba(190,12,70,1))"
      />
    </div>
  );
};
