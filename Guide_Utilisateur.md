# Manuel d'Utilisation – Plateforme Clinique TCC (Ory+ Simulator)

Bienvenue dans le manuel d'utilisation de la **Plateforme Clinique TCC**. Ce guide est destiné aux psychologues et cliniciens pour vous aider à naviguer dans le système, gérer vos dossiers patients, mener des séances et exploiter les outils cognitivo-comportementaux pour le **Trouble d'Anxiété Généralisée (TAG)** et le **Trouble Bipolaire**.

---

## 1. Prise en Main et Interface Principale

L’interface de la plateforme est pensée pour imiter un dossier médical informatisé moderne. Elle est divisée en trois grandes zones.

![Aperçu de l'Interface Principale](screenshots/interface_principale.png)

1. **Le Menu Latéral (Sidebar, à gauche)** : Votre outil de navigation principal. Il vous permet de naviguer dans le dossier du patient actif (Tableau de bord, Historique, Séance du jour, Exercices).
2. **La Barre Supérieure (Header, en haut)** : Affiche votre profil clinicien et le "Fil d'Ariane" (qui vous indique toujours dans quel dossier et quelle séance vous vous trouvez).
3. **L'Espace de Travail (Au centre)** : C'est ici que s'affichent les données manipulées.

> 💡 **Information Sauvegarde :** La plateforme est actuellement conçue pour fonctionner localement. Toutes les données que vous entrez (notes, scores, exercices) sont sauvegardées directement et de façon sécurisée dans la mémoire de votre navigateur (*localStorage*).

---

## 2. Le Tableau de Bord (Dashboard)

Le Tableau de bord est votre point d'entrée clinique. Il vous offre une vue globale sur l'état du patient actuellement sélectionné.

![Vue du Tableau de Bord](screenshots/tableau_de_bord.png)

- **Carte Résumé (Header Patient)** : Affiche les informations vitales du patient (Nom, troubles, phase actuelle de traitement).
- **Indicateurs de Progrès** : Jauges mesurant l'avancement global dans le protocole.
- **Accès Rapides** : Vous permet de reprendre le traitement exactement là où vous l'avez laissé à la fin de la dernière consultation.

---

## 3. Le Dossier Patient (Timeline)

L'onglet **Dossier Patient** vous donne une vision chronologique et structurée du protocole.

![Vue du Dossier Patient](screenshots/dossier_patient.png)

- **Timeline des Séances** : Les séances sont regroupées par *Phases* (ex: Phase d'Évaluation, Psychoéducation, Restructuration cognitive).
- **Statuts Visuels** : 
  - 🟢 **Vert** : Séance clôturée.
  - 🟡 **Orange** : Séance active en cours.
  - ⚪ **Gris** : Séance future.
- **Synthèse des tests** : Vous y retrouverez également l'évolution des scores psychométriques (Inventaire de Beck, ASRM, MDQ, etc.).

---

## 4. Mener une Séance (Live Clinical Interface)

Lorsque vous démarrez une nouvelle séance, l'application bascule en mode "Consultation en direct".

![Interface de la Séance en cours](screenshots/seance_verbatim.png)

L'écran se scinde en deux parties :
- **À gauche : L'Agenda de la séance**. L'application vous guide pas-à-pas sur les étapes cliniques à aborder (ex: 1. Revue de la semaine, 2. Analyse du Lifechart, 3. Prescriptions de tâches).
- **À droite : Le Verbatim / Notes**. Un espace dynamique affichant des exemples de dialogues thérapeutiques (bulles de chat) pour orienter vos relances, ou une zone de saisie pour vos notes cliniques (Observations directes). N'oubliez pas de cliquer sur **Sauvegarder** pour conserver vos observations.

---

## 5. Le Classeur d'Exercices (Workbooks et Outils)

L'onglet **Exercices** contient toute la librairie des outils TCC à utiliser avec le patient.

![Catalogue des Exercices et Formulaires](screenshots/catalogue_exercices.png)

Le système propose plusieurs typologies d'outils :
- **Matériel de Psychoéducation :** Dépliants, modèles visuels animés des troubles, informations textuelles.
- **Registres d'auto-observation (Daily Logs) :** *Graphique de l'Humeur*, *Inventaire des rythmes sociaux (IPSRT)*. Vous pouvez ajouter des lignes indéfiniment.
- **Formulaires de Restructuration Cognitive :** *Tableaux d'enregistrement des pensées Automatiques*, *Résolution de problème*, *Colonnes d'avantages/désavantages*.

### 📥 Impression et Distribution aux Patients (Export PDF)

Un aspect crucial de la TCC est la remise de fiches de travail (*worksheets*) au patient. La plateforme rend ce processus particulièrement fluide.

![Bouton de téléchargement PDF et aperçu de l'impression](screenshots/bouton_pdf_impression.png)

Sur la vue détaille de n'importe quel exercice, repérez **l'icône Rouge PDF** en haut à droite.

En cliquant dessus, le système réagit intelligemment :
1. **Ressources Officielles (Priorité)** : Si nous possédons le fichier PDF d'origine du manuel (ex: le véritable *Graphique de l'humeur* officiel), l'application le télécharge directement.
2. **Génération Intelligente sur mesure** : Pour les outils interactifs n'ayant pas de PDF d'origine, le système convertit automatiquement l'outil web en **fiche de travail vierge prête à imprimer**. Il masque l'interface du logiciel, retire vos textes pour inclure des espaces blancs structurés, et ajoute automatiquement des **lignes vides supplémentaires** pour permettre au patient d'écrire à la main.

---

## 6. Passer d'un trouble à l'autre (TAG / Bipolaire)

La plateforme gère les pathologies dans des environnements isolés pour ne pas mélanger les bases cliniques.
Pour changer de répertoire clinique :
- Cliquez sur le logo ou le lien racine pour revenir à la page d'accueil (Portail de sélection des troubles).
- Choisissez le module souhaité (**TAG** ou **Trouble Bipolaire**). Le système chargera automatiquement l'interface, les protocoles, les listes de patients et le catalogue d'exercices propres à ce trouble.

***
***

# Annexe : Utilisation d'IA pour vos rapports cliniques (Exemple de Prompt)

Si vous désirez confier la rédaction (ou la mise en page formelle via **LaTeX**) de vos *Comptes-rendus cliniques* à une intelligence artificielle externe en vous basant sur les notes générées par cette plateforme, vous pouvez utiliser ce template de requête (Prompt) :

> **Prompt à copier à l'IA :**
> 
> Tu es un expert en rédaction clinique informatisée et en LaTeX. À partir des notes brutes issues de ma plateforme TCC, génère le code LaTeX complet et compilable pour un **Rapport d'Évaluation Clinique (Compte-rendu de séance)** digne d'un dossier patient hospitalier.
> 
> **Structure et Design LaTeX exigés :**
> **1. En-tête :** Informations du cabinet (Thérapeute, date) et grand titre "COMPTE-RENDU D'ÉVALUATION CLINIQUE".
> **2. Encart Patient :** Une zone élégante (package `tcolorbox`, coins arrondis) listant l'identité, le diagnostic principal (Ex: TAG ou Bipolarité de Type II), et la séance actuelle.
> **3. Corps du Bilan (3 sections avec icônes via `fontawesome5`) :**
> - **Scores et Suivi Psychométrique :** Graphisme ou tableau structuré (`booktabs`) avec les échelles de Beck, Altman, etc.
> - **Observations Cliniques :** Un bloc de texte professionnel (Euthymie, observance du lithium, ou éléments d'activation comportementale).
> - **Plan d'Action (Prescription des Tâches) :** Une liste à puce (avec `\faCheckCircle`) avec les objectifs de la quinzaine (ex: Remplir le journal d'humeur, régularité du lever).
> **4. Bas de page :** Zone de signature et numérotation.
> 
> Le résultat doit être sobre (bleu marine profond, gris), lisible, et compilable en `pdfLaTeX` (fournis tout le préambule). Voici mes notes brutes pour remplir ton contenu fictif : [insérer notes du psychologue ici].
