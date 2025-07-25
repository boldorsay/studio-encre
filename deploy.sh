#!/bin/bash

# Vérifie si un message de commit a été fourni
if [ -z "$1" ]; then
  echo "❌ Merci de fournir un message de commit en argument."
  echo "👉 Exemple : ./deploy.sh \"Mon super commit\""
  exit 1
fi

# Stocker le message de commit
commitMessage="$1"

# Étapes Git
echo "📦 Ajout des fichiers..."
git add .

echo "✅ Commit avec message : $commitMessage"
git commit -m "$commitMessage"

echo "🔄 Synchronisation avec le dépôt distant..."
git fetch origin main
git merge origin/main --no-edit

echo "🚀 Push vers GitHub..."
if ! git push origin main; then
    echo "❌ Erreur lors du push vers GitHub. Le déploiement Vercel a été annulé."
    exit 1
fi

# Déclenchement Vercel
echo "⚙️ Déclenchement du déploiement Vercel..."
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_khXkdO17Q9CJMpCpagUR2tsUTCsv/MzhshRrKjG

echo "✅ Déploiement déclenché avec succès !"