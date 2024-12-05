import { useState, useMemo, useEffect } from "react";
import tinycolor from "tinycolor2";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-css.min.js";

import { Switch } from "devtools--btns";
import hexPic from "../../assets/media/switchMedia/hex.png";
import rgbPic from "../../assets/media/switchMedia/rgb.png";

import { FaCopy } from "react-icons/fa";
import "./index.css";

const PresentationHome = () => {
  const [primaryColor, setPrimaryColor] = useState("#FE6E7A");
  const [colorFormat, setColorFormat] = useState("hex");
  const [copySuccess, setCopySuccess] = useState(false);

  // Toggle color format between hex and RGB
  const toggleColorFormat = () => {
    setColorFormat((prevFormat) => (prevFormat === "hex" ? "rgb" : "hex"));
  };

  // Calcul des couleurs de la tétrade
  const colors = useMemo(() => {
    const primary = tinycolor(primaryColor);

    // Générer la tétrade
    const tetrad = [
      primary,
      primary.clone().spin(90),
      primary.clone().spin(180),
      primary.clone().spin(270),
    ];

    const formatColor = (color) =>
      colorFormat === "rgb" ? color.toRgbString() : color.toHexString();

    // Générer des variantes pour chaque couleur de la tétrade
    const generateVariants = (baseColor) => ({
      light: formatColor(baseColor.clone().lighten(10)),
      normal: formatColor(baseColor),
      dark: formatColor(baseColor.clone().darken(30)),
      darker: formatColor(baseColor.clone().darken(50)), // Nouvelle variante plus foncée
    });

    return tetrad.map((baseColor) => generateVariants(baseColor));
  }, [primaryColor, colorFormat]);

  // Génération des variables CSS
  const generateCssVariables = () => {
    return `:root {${colors
      .map(
        (variants, index) => `
    --color${index + 1}-light: ${variants.light};
    --color${index + 1}: ${variants.normal};
    --color${index + 1}-dark: ${variants.dark};
    --color${index + 1}-darker: ${variants.darker};
    --color${index + 1}-text: ${
          tinycolor(variants.normal).isLight() ? "#000" : "#fff"
        };
  `
      )
      .join("")}}`;
  };

  const generateVarExample = () => {
    const cssLines =
      colorFormat === "hex"
        ? [
            "/* If using hex colors */",
            ".className {",
            "  color: var(--color2-text)",
            "  background-color: var(--color2)",
            "}",
          ]
        : [
            "/* If using RGB colors */",
            ".className {",
            "  color: var(--color3-text)",
            "  background-color: var(--color3)",
            "/* To change opacity */",
            "  color: rgba(var(--color3-text), 0.5)",
            "  background-color: rgba(var(--color3-text), 0.5)",
            "}",
          ];
    return cssLines.join("\n");
  };

  // Gestion de la copie
  const copyToClipboard = () => {
    const cssText = generateCssVariables();
    navigator.clipboard
      .writeText(cssText)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => console.error("Erreur lors de la copie :", err));
  };

  // Fonction utilitaire pour déterminer la couleur de contraste (noir ou blanc)
  const getContrastColor = (color) => {
    return tinycolor(color).isLight() ? "#000" : "#fff";
  };

  // Mise en surbrillance des blocs de code
  useEffect(() => {
    Prism.highlightAll();
  }, [colors]);

  return (
    <section className="developUStyle">
      <h1>Développez votre style avec une tétrade de DevTools</h1>
      <p>
        Cet outil génère une palette de 4 couleurs (tétrade) avec des nuances,
        et crée automatiquement des variables CSS.
      </p>

      {/* Sélection de la couleur principale */}
      <div>
        <label>
          Couleur principale :
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </label>
      </div>

      {/* Palette de couleurs */}
      <div className="containerEx">
        <div className="respContainer">
          <div className="leftPart">
            <ul className="colorPalette">
              {colors.map((variants, index) => (
                <li key={`color-${index}`}>
                  {Object.entries(variants).map(([variant, color]) => (
                    <span
                      key={variant}
                      className="colorCase"
                      style={{
                        backgroundColor: color,
                        color: getContrastColor(color), // Déterminer la couleur de contraste
                      }}
                      title={`Couleur ${index + 1}-${variant}: ${color}`}>
                      Txt
                    </span>
                  ))}
                </li>
              ))}
            </ul>
            <pre className="codeBlock">
              <code className="language-css">{generateVarExample()}</code>
            </pre>
          </div>

          {/* Bloc de code généré */}
          <div className="codeBlock right">
            <div className="header">
              <h2>Code CSS Généré</h2>
              {/* Commutateur de format */}
              <Switch
                pic1={hexPic}
                pic2={rgbPic}
                state={{
                  state: colorFormat,
                  value: { on: "rgb", off: "hex" },
                  func: toggleColorFormat,
                }}
              />
            </div>
            <pre>
              <code className="language-css">{generateCssVariables()}</code>
            </pre>
            <button onClick={copyToClipboard} className="copyBtn">
              <FaCopy fill="#333333" />
            </button>
            {copySuccess && (
              <p style={{ color: "green" }}>
                Copié avec succès dans le presse-papier !
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default PresentationHome;
