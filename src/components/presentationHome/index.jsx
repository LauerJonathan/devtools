import { useState, useMemo } from "react";
import tinycolor from "tinycolor2"; // Import de la bibliothèque
import "./index.css"; // Ajoutez vos styles CSS ici

const PresentationHome = () => {
  const [primaryColor, setPrimaryColor] = useState("#ff0000"); // Couleur primaire par défaut

  // Calcul des couleurs en fonction de la couleur primaire
  const colors = useMemo(() => {
    const primary = tinycolor(primaryColor);

    // Calcul des couleurs secondaires et tertiaires
    const secondary = primary.clone().spin(120).saturate(20).toHexString();
    const tertiary = primary.clone().spin(240).saturate(20).toHexString();

    // Création des nuances
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
  }, [primaryColor]); // Ne recalculer que si la couleur primaire change

  // Détermine la couleur du texte en fonction de la luminosité de l'arrière-plan
  const getTextColor = (bgColor) => {
    return tinycolor(bgColor).isLight() ? "#000" : "#fff";
  };

  // Fonction pour gérer le changement de la couleur primaire
  const handleColorChange = (event) => {
    setPrimaryColor(event.target.value);
  };

  return (
    <section className="developUStyle">
      <h1>Develop' your style</h1>
      <p>
        Avec Develop' your style, notre puissant outil de stylisation vous
        permettra de générer des fichiers CSS pour mettre en place des variables
        pour vos couleurs. Vous pouvez choisir la couleur principale, et les
        couleurs secondaires et tertiaires seront générées automatiquement !
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

      <ul>
        {Object.entries(colors).map(([key, value]) => {
          return (
            <li key={key}>
              {Object.entries(value).map(([key, value]) => {
                return (
                  <span
                    className="colorCase"
                    key={key}
                    style={{
                      backgroundColor: value,
                      color: getTextColor(value),
                    }}
                    title={value}></span>
                );
              })}
            </li>
          );
        })}
      </ul>

      {/*<ul>
        {Object.entries(colors).map(([key, value]) => (
          <li
            key={key}
            className={key}
            style={{
              backgroundColor: value,
              color: getTextColor(value), // Contraste du texte
            }}>
            --{key}: <span>{value}</span>
          </li>
        ))}
      </ul> */}

      <a href="#">Accéder au générateur</a>
    </section>
  );
};

export default PresentationHome;