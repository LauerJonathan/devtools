import { useState, useMemo, useEffect } from "react";
import tinycolor from "tinycolor2";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Thème de Prism
import "prismjs/components/prism-css.min.js"; // Support pour CSS

import { Switch } from "devtools--btns";
import hexPic from "../../assets/media/switchMedia/hex.png";
import rgbPic from "../../assets/media/switchMedia/rgb.png";

import { FaCopy } from "react-icons/fa";
import "./index.css";

const PresentationHome = () => {
  const [primaryColor, setPrimaryColor] = useState("#ff0000"); // Couleur primaire par défaut
  const [copySuccess, setCopySuccess] = useState(false); // État pour afficher un message de succès
  const [colorFormat, setColorFormat] = useState("hex"); // Format de couleur par défaut: hexadécimal

  // Calcul des couleurs
  const colors = useMemo(() => {
    const primary = tinycolor(primaryColor);
    const secondary = primary.clone().spin(120).saturate(20);
    const tertiary = primary.clone().spin(240).saturate(20);

    const formatColor = (color) => {
      const hexValue = color.toHexString().toLowerCase();
      if (hexValue === "#fff") return "rgb(255, 255, 255)";
      if (hexValue === "#000") return "rgb(0, 0, 0)";
      return colorFormat === "rgb" ? color.toRgbString() : color.toHexString();
    };

    const primaryLight = primary.clone().lighten(30);
    const primaryDark = primary.clone().darken(30);
    const secondaryLight = secondary.clone().lighten(30);
    const secondaryDark = secondary.clone().darken(30);
    const tertiaryLight = tertiary.clone().lighten(30);
    const tertiaryDark = tertiary.clone().darken(30);

    return {
      primary: {
        primaryLight: formatColor(primaryLight),
        primary: formatColor(primary),
        primaryDark: formatColor(primaryDark),
      },
      secondary: {
        secondaryLight: formatColor(secondaryLight),
        secondary: formatColor(secondary),
        secondaryDark: formatColor(secondaryDark),
      },
      tertiary: {
        tertiaryLight: formatColor(tertiaryLight),
        tertiary: formatColor(tertiary),
        tertiaryDark: formatColor(tertiaryDark),
      },
    };
  }, [primaryColor, colorFormat]);

  const getTextColor = (bgColor) => {
    return tinycolor(bgColor).isLight() ? "#000" : "#fff";
  };

  const formatTextColor = (color) => {
    if (color === "#fff")
      return colorFormat === "rgb" ? "rgb(255, 255, 255)" : "#fff";
    if (color === "#000")
      return colorFormat === "rgb" ? "rgb(0, 0, 0)" : "#000";
    return color;
  };

  const handleColorChange = (event) => {
    setPrimaryColor(event.target.value);
  };

  const toggleColorFormat = () => {
    setColorFormat((prevFormat) => (prevFormat === "hex" ? "rgb" : "hex"));
  };

  const state = {
    state: colorFormat,
    value: { on: "rgb", off: "hex" },
    func: toggleColorFormat,
  };

  // Générer le CSS sous forme de texte
  const generateCssVariables = () => {
    const cssLines = [
      ":root {",
      `  --primary-light: ${colors.primary.primaryLight};`,
      `  --primary: ${colors.primary.primary};`,
      `  --primary-dark: ${colors.primary.primaryDark};`,
      `  --primary-text: ${formatTextColor(
        getTextColor(colors.primary.primary)
      )};`,
      `  --primary-light-text: ${formatTextColor(
        getTextColor(colors.primary.primaryLight)
      )};`,
      `  --primary-dark-text: ${formatTextColor(
        getTextColor(colors.primary.primaryDark)
      )};`,
      `  --secondary-light: ${colors.secondary.secondaryLight};`,
      `  --secondary: ${colors.secondary.secondary};`,
      `  --secondary-dark: ${colors.secondary.secondaryDark};`,
      `  --secondary-text: ${formatTextColor(
        getTextColor(colors.secondary.secondary)
      )};`,
      `  --secondary-light-text: ${formatTextColor(
        getTextColor(colors.secondary.secondaryLight)
      )};`,
      `  --secondary-dark-text: ${formatTextColor(
        getTextColor(colors.secondary.secondaryDark)
      )};`,
      `  --tertiary-light: ${colors.tertiary.tertiaryLight};`,
      `  --tertiary: ${colors.tertiary.tertiary};`,
      `  --tertiary-dark: ${colors.tertiary.tertiaryDark};`,
      `  --tertiary-text: ${formatTextColor(
        getTextColor(colors.tertiary.tertiary)
      )};`,
      `  --tertiary-light-text: ${formatTextColor(
        getTextColor(colors.tertiary.tertiaryLight)
      )};`,
      `  --tertiary-dark-text: ${formatTextColor(
        getTextColor(colors.tertiary.tertiaryDark)
      )};`,
      "}",
    ];
    return cssLines.join("\n");
  };

  const generateVarExample = () => {
    const cssLines =
      colorFormat === "hex"
        ? [
            "/* Si vous utilisez des couleurs héxa */",
            ".className {",
            "  color: var(--primary-text)",
            `  background-color: var(--primary)`,
            "}",
          ]
        : [
            "/* Si vous utilisez des couleurs RGB() */",
            ".className {",
            "  color: var(--primary-text)",
            "  background-color: var(--primary)",
            "/* Pour changer l'opacité */",
            "  color: rgba(var(--primary), 0.5)",
            `  background-color: rgba(var(--primary), 0.5)`,
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

  // Effectuer la coloration syntaxique après que le code a été mis à jour
  useEffect(() => {
    Prism.highlightAll(); // Applique la coloration à tous les blocs de code
  }, [primaryColor, colorFormat]);

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

      <Switch pic1={hexPic} pic2={rgbPic} state={state} />

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
            <code className="language-css">{generateCssVariables()}</code>
          </pre>
          <button onClick={copyToClipboard} className="copyBtn">
            <FaCopy fill="#333333" />
          </button>
          {copySuccess && <p style={{ color: "green" }}>Copié avec succès !</p>}
        </div>
      </div>
      <pre>
        <code className="language-css">{generateVarExample()}</code>
      </pre>
    </section>
  );
};

export default PresentationHome;
