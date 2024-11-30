import { useState, useMemo } from "react";
import tinycolor from "tinycolor2";
import "./index.css";

import { FaCopy } from "react-icons/fa";

const PresentationHome = () => {
  const [primaryColor, setPrimaryColor] = useState("#ff0000"); // Couleur primaire par défaut
  const [copySuccess, setCopySuccess] = useState(false); // État pour afficher un message de succès

  // Calcul des couleurs
  const colors = useMemo(() => {
    const primary = tinycolor(primaryColor);
    const secondary = primary.clone().spin(120).saturate(20).toHexString();
    const tertiary = primary.clone().spin(240).saturate(20).toHexString();

    const primaryLight = primary.clone().lighten(30).toHexString();
    const primaryDark = primary.clone().darken(30).toHexString();
    const secondaryLight = tinycolor(secondary).lighten(30).toHexString();
    const secondaryDark = tinycolor(secondary).darken(30).toHexString();
    const tertiaryLight = tinycolor(tertiary).lighten(30).toHexString();
    const tertiaryDark = tinycolor(tertiary).darken(30).toHexString();

    return {
      primary: {
        primaryLight,
        primary: primary.toHexString(),
        primaryDark,
      },
      secondary: {
        secondaryLight,
        secondary,
        secondaryDark,
      },
      tertiary: {
        tertiaryLight,
        tertiary,
        tertiaryDark,
      },
    };
  }, [primaryColor]);

  const getTextColor = (bgColor) => {
    return tinycolor(bgColor).isLight() ? "#000" : "#fff";
  };

  const handleColorChange = (event) => {
    setPrimaryColor(event.target.value);
  };

  // Générer le CSS sous forme de texte
  const generateCssVariables = () => {
    const cssLines = [
      ":root {",
      `  --primary-light: ${colors.primary.primaryLight};`,
      `  --primary: ${colors.primary.primary};`,
      `  --primary-dark: ${colors.primary.primaryDark};`,
      `  --primary-text: ${getTextColor(colors.primary.primary)};`,
      `  --primary-light-text: ${getTextColor(colors.primary.primaryLight)};`,
      `  --primary-dark-text: ${getTextColor(colors.primary.primaryDark)};`,
      `  --secondary-light: ${colors.secondary.secondaryLight};`,
      `  --secondary: ${colors.secondary.secondary};`,
      `  --secondary-dark: ${colors.secondary.secondaryDark};`,
      `  --secondary-text: ${getTextColor(colors.secondary.secondary)};`,
      `  --secondary-light-text: ${getTextColor(
        colors.secondary.secondaryLight
      )};`,
      `  --secondary-dark-text: ${getTextColor(
        colors.secondary.secondaryDark
      )};`,
      `  --tertiary-light: ${colors.tertiary.tertiaryLight};`,
      `  --tertiary: ${colors.tertiary.tertiary};`,
      `  --tertiary-dark: ${colors.tertiary.tertiaryDark};`,
      `  --tertiary-text: ${getTextColor(colors.tertiary.tertiary)};`,
      `  --tertiary-light-text: ${getTextColor(
        colors.tertiary.tertiaryLight
      )};`,
      `  --tertiary-dark-text: ${getTextColor(colors.tertiary.tertiaryDark)};`,
      "}",
    ];
    return cssLines.join("\n");
  };

  const copyToClipboard = () => {
    const cssText = generateCssVariables();
    navigator.clipboard
      .writeText(cssText)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Réinitialise après 2 secondes
      })
      .catch((err) => {
        console.error("Erreur lors de la copie :", err);
      });
  };

  return (
    <section className="developUStyle">
      <h1>Develop' your style</h1>
      <p>
        Avec Develop' your style, notre puissant outil de stylisation vous
        permettra de générer des fichiers CSS pour mettre en place des variables
        pour vos couleurs.
      </p>
      <div>
        <label>
          Couleur primaire:
          <input
            type="color"
            value={primaryColor}
            onChange={handleColorChange}
          />
        </label>
      </div>

      <div className="containerEx">
        <ul className="colorPalette">
          {Object.entries(colors).map(([key, value]) => {
            return (
              <li key={key}>
                {Object.entries(value).map(([subKey, colorValue]) => {
                  return (
                    <span
                      className="colorCase"
                      key={subKey}
                      style={{
                        backgroundColor: colorValue,
                        color: getTextColor(colorValue),
                      }}
                      title={colorValue}>
                      Txt
                    </span>
                  );
                })}
              </li>
            );
          })}
        </ul>

        <div className="codeBlock">
          <h2>Code CSS Généré</h2>
          <pre>
            <code>{generateCssVariables()}</code>
          </pre>
          <button onClick={copyToClipboard} className="copyBtn">
            <FaCopy fill="#333333" />
          </button>
          {copySuccess && <p style={{ color: "green" }}>Copié avec succès !</p>}
        </div>
      </div>
    </section>
  );
};

export default PresentationHome;
