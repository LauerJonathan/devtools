import { useState, useEffect } from "react";
import tinycolor from "tinycolor2"; // Import de la bibliothèque
import "./index.css";

const PresentationHome = () => {
  const [colors, setColors] = useState({
    primary: "#ff0000",   // Couleur rouge par défaut
    secondary: "",        // Calculé dynamiquement
    tertiary: "",         // Calculé dynamiquement
  });

  // Fonction pour calculer les couleurs secondaires et tertiaires
  const calculateSecondaryTertiary = (primaryColor) => {
    const primary = tinycolor(primaryColor);

    // Calculer la couleur secondaire : décaler la teinte de 120°
    const secondary = primary.spin(120).toHexString();

    // Calculer la couleur tertiaire : décaler la teinte de 240° à partir de la couleur secondaire
    const secondaryColor = tinycolor(secondary);
    const tertiary = secondaryColor.spin(120).toHexString();

    return { secondary, tertiary };
  };

  // Fonction pour injecter ou mettre à jour le CSS dynamique
  const updateBeforeColor = (newColors) => {
    // Supprimer les anciennes règles si elles existent
    const styleSheets = document.styleSheets;
    for (let sheet of styleSheets) {
      if (sheet.rules) {
        for (let rule of sheet.rules) {
          if (rule.selectorText === "li.primary::before") {
            sheet.deleteRule(rule.index); // Supprimer la règle existante
          }
          if (rule.selectorText === "li.secondary::before") {
            sheet.deleteRule(rule.index); // Supprimer la règle existante
          }
          if (rule.selectorText === "li.tertiary::before") {
            sheet.deleteRule(rule.index); // Supprimer la règle existante
          }
        }
      }
    }

    // Ajouter de nouvelles règles CSS pour chaque type de `li`
    const style = document.createElement("style");
    style.innerHTML = `
      li.primary::before {
        content: ""; 
        background-color: ${newColors.primary}; 
        transform: translateY(5px);
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
      li.secondary::before {
        content: ""; 
        background-color: ${newColors.secondary}; 
        transform: translateY(5px);
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
      li.tertiary::before {
        content: ""; 
        background-color: ${newColors.tertiary}; 
        transform: translateY(5px);
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    `;
    document.head.appendChild(style); // Ajouter le style au document
  };

  // Effect pour mettre à jour les styles à chaque fois que les couleurs changent
  useEffect(() => {
    const { secondary, tertiary } = calculateSecondaryTertiary(colors.primary);
    const newColors = { ...colors, secondary, tertiary };
    setColors(newColors);
    updateBeforeColor(newColors); // Met à jour les couleurs lorsque 'colors' change
  }, [colors.primary]); // Se déclenche uniquement quand 'primary' change

  // Fonction pour gérer le changement des couleurs
  const handleColorChange = (type, event) => {
    const newColor = event.target.value;
    setColors((prevColors) => ({
      ...prevColors,
      [type]: newColor,
    }));
  };

  return (
    <section className="developUStyle">
      <h1>Develop' your style</h1>
      <p>
        Avec Develop' your style, notre puissant outil de stylisation vous
        permettra de générer des fichiers CSS pour mettre en place des variables
        pour vos couleurs. Vous pouvez choisir la couleur principale et les
        couleurs secondaires et tertiaires seront générées automatiquement !
      </p>

      <div>
        <label>
          Couleur primaire:
          <input
            type="color"
            value={colors.primary}
            onChange={(e) => handleColorChange("primary", e)}
          />
        </label>
      </div>

      <ul>
        <li className="primary">
          --primary: <span>{colors.primary}</span>
        </li>
        <li className="secondary">
          --secondary: <span>{colors.secondary}</span>
        </li>
        <li className="tertiary">
          --tertiary: <span>{colors.tertiary}</span>
        </li>
      </ul>

      <a href="#">Accéder au générateur</a>
    </section>
  );
};

export default PresentationHome;
