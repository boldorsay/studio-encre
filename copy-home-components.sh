#!/bin/bash

# Script pour copier la home d'un projet Tina self-hosted vers un projet Tina Cloud
# Usage: ./copy-home-components.sh /chemin/vers/projet/source

SOURCE_PROJECT="$1"

if [ -z "$SOURCE_PROJECT" ]; then
    echo "❌ Erreur: Veuillez spécifier le chemin du projet source"
    echo "Usage: ./copy-home-components.sh /chemin/vers/projet/source"
    exit 1
fi

if [ ! -d "$SOURCE_PROJECT" ]; then
    echo "❌ Erreur: Le dossier source n'existe pas: $SOURCE_PROJECT"
    exit 1
fi

echo "🚀 Début de la copie des composants de la home..."
echo "📁 Source: $SOURCE_PROJECT"
echo "📁 Destination: $(pwd)"
echo ""

# 1. Copier les composants de la home
echo "📦 Copie des composants..."
if [ -d "$SOURCE_PROJECT/components/blocks" ]; then
    cp -r "$SOURCE_PROJECT/components/blocks" ./components/
    echo "✅ Composants blocks copiés"
fi

if [ -d "$SOURCE_PROJECT/components/layout" ]; then
    cp -r "$SOURCE_PROJECT/components/layout" ./components/
    echo "✅ Composants layout copiés"
fi

if [ -d "$SOURCE_PROJECT/components/ui" ]; then
    cp -r "$SOURCE_PROJECT/components/ui" ./components/
    echo "✅ Composants UI copiés"
fi

if [ -d "$SOURCE_PROJECT/components/motion-primitives" ]; then
    cp -r "$SOURCE_PROJECT/components/motion-primitives" ./components/
    echo "✅ Composants motion copiés"
fi

# 2. Copier les styles
echo ""
echo "🎨 Copie des styles..."
if [ -f "$SOURCE_PROJECT/styles.css" ]; then
    cp "$SOURCE_PROJECT/styles.css" ./
    echo "✅ styles.css copié"
fi

# 3. Copier les assets
echo ""
echo "🖼️ Copie des assets..."
if [ -d "$SOURCE_PROJECT/public/uploads" ]; then
    cp -r "$SOURCE_PROJECT/public/uploads" ./public/
    echo "✅ Assets uploads copiés"
fi

if [ -d "$SOURCE_PROJECT/public/blocks" ]; then
    cp -r "$SOURCE_PROJECT/public/blocks" ./public/
    echo "✅ Assets blocks copiés"
fi

# 4. Copier les collections TinaCMS
echo ""
echo "⚙️ Copie des collections TinaCMS..."
if [ -d "$SOURCE_PROJECT/tina/collection" ]; then
    cp -r "$SOURCE_PROJECT/tina/collection" ./tina/
    echo "✅ Collections copiées"
fi

# 5. Copier les requêtes GraphQL
echo ""
echo "🔍 Copie des requêtes GraphQL..."
if [ -d "$SOURCE_PROJECT/tina/queries" ]; then
    cp -r "$SOURCE_PROJECT/tina/queries" ./tina/
    echo "✅ Requêtes GraphQL copiées"
fi

# 6. Copier les champs personnalisés
echo ""
echo "🏷️ Copie des champs personnalisés..."
if [ -d "$SOURCE_PROJECT/tina/fields" ]; then
    cp -r "$SOURCE_PROJECT/tina/fields" ./tina/
    echo "✅ Champs personnalisés copiés"
fi

# 7. Copier le contenu de la home
echo ""
echo "📄 Copie du contenu de la home..."
if [ -f "$SOURCE_PROJECT/content/pages/home.mdx" ]; then
    cp "$SOURCE_PROJECT/content/pages/home.mdx" ./content/pages/
    echo "✅ Contenu home.mdx copié"
fi

# 8. Copier les utilitaires
echo ""
echo "🔧 Copie des utilitaires..."
if [ -d "$SOURCE_PROJECT/lib" ]; then
    cp -r "$SOURCE_PROJECT/lib" ./
    echo "✅ Utilitaires copiés"
fi

# 9. Copier les dépendances si nécessaire
echo ""
echo "📦 Vérification des dépendances..."
if [ -f "$SOURCE_PROJECT/package.json" ]; then
    echo "📋 Dépendances du projet source:"
    cat "$SOURCE_PROJECT/package.json" | grep -E '"dependencies"' -A 20 | grep -E '"[^"]+"' | head -10
    echo ""
    echo "💡 Vérifiez si vous devez installer des dépendances manquantes"
fi

echo ""
echo "🎉 Copie terminée !"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Vérifiez que tous les fichiers ont été copiés correctement"
echo "2. Installez les dépendances manquantes si nécessaire: yarn install"
echo "3. Adaptez le contenu de home.mdx pour Tina Cloud"
echo "4. Relancez le serveur: yarn dev"
echo ""
echo "🔧 Pour adapter le contenu:"
echo "- Ouvrez content/pages/home.mdx"
echo "- Modifiez les références self-hosted vers Tina Cloud"
echo "- Ajustez les chemins d'assets si nécessaire"
echo ""
echo "✅ Votre projet est prêt pour l'adaptation !" 