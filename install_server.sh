#!/bin/bash

# Script d'installation complète pour AV Concept Projects
# Serveur: Ubuntu 24.04 LTS sur Scaleway

set -e  # Arrêter en cas d'erreur

echo "🚀 Début de l'installation de l'environnement AV Concept Projects"

# Mise à jour du système
echo "📦 Mise à jour du système..."
apt update && apt upgrade -y

# Installation des dépendances de base
echo "🔧 Installation des dépendances de base..."
apt install -y curl wget git nginx ufw software-properties-common

# Installation de Node.js 18+
echo "📦 Installation de Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Vérification des versions
echo "✅ Versions installées:"
node --version
npm --version
nginx -v

# Installation de PM2 globalement
echo "🔧 Installation de PM2..."
npm install -g pm2

# Création de l'utilisateur deploy
echo "👤 Création de l'utilisateur deploy..."
useradd -m -s /bin/bash deploy || echo "Utilisateur deploy existe déjà"
usermod -aG sudo deploy

# Création du répertoire de l'application
echo "📁 Création du répertoire de l'application..."
mkdir -p /var/www/av-concept-projects
chown -R deploy:deploy /var/www/av-concept-projects

# Configuration du firewall
echo "🔒 Configuration du firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Clonage du repository GitHub
echo "📥 Clonage du repository GitHub..."
cd /var/www/av-concept-projects
sudo -u deploy git clone https://github.com/SachaAVCP/av-concept-projects.git .

# Installation des dépendances npm
echo "📦 Installation des dépendances npm..."
sudo -u deploy npm install

# Build de l'application
echo "🏗️ Build de l'application React..."
sudo -u deploy npm run build

# Configuration de nginx
echo "🌐 Configuration de nginx..."
cat > /etc/nginx/sites-available/av-concept-projects << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/av-concept-projects/dist;
    index index.html;

    # Gestion des fichiers statiques
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache pour les assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Logs
    access_log /var/log/nginx/av-concept-projects.access.log;
    error_log /var/log/nginx/av-concept-projects.error.log;
}
EOF

# Activation du site
ln -sf /etc/nginx/sites-available/av-concept-projects /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test de la configuration nginx
nginx -t

# Redémarrage de nginx
systemctl restart nginx
systemctl enable nginx

# Création du script de déploiement
echo "📜 Création du script de déploiement..."
cat > /var/www/av-concept-projects/deploy.sh << 'EOF'
#!/bin/bash

# Script de déploiement pour AV Concept Projects
set -e

echo "🚀 Début du déploiement..."

# Aller dans le répertoire de l'application
cd /var/www/av-concept-projects

# Pull des dernières modifications
echo "📥 Récupération des dernières modifications..."
git pull origin main

# Installation des nouvelles dépendances
echo "📦 Installation des dépendances..."
npm install

# Build de l'application
echo "🏗️ Build de l'application..."
npm run build

# Redémarrage de nginx
echo "🔄 Redémarrage de nginx..."
sudo systemctl reload nginx

echo "✅ Déploiement terminé avec succès!"
echo "🌐 Application accessible sur: http://$(curl -s ifconfig.me)"
EOF

chmod +x /var/www/av-concept-projects/deploy.sh
chown deploy:deploy /var/www/av-concept-projects/deploy.sh

# Création du répertoire de logs
mkdir -p /var/www/av-concept-projects/logs
chown -R deploy:deploy /var/www/av-concept-projects/logs

# Configuration des permissions
chown -R deploy:deploy /var/www/av-concept-projects
chmod -R 755 /var/www/av-concept-projects

echo "🎉 Installation terminée avec succès!"
echo "📊 Résumé de l'installation:"
echo "  - Node.js: $(node --version)"
echo "  - npm: $(npm --version)"
echo "  - nginx: Configuré et démarré"
echo "  - Application: Buildée et déployée"
echo "  - Utilisateur deploy: Créé"
echo "  - Firewall: Configuré (ports 22, 80, 443)"
echo ""
echo "🌐 Application accessible sur:"
echo "  http://$(curl -s ifconfig.me)"
echo ""
echo "🔧 Pour redéployer:"
echo "  sudo -u deploy /var/www/av-concept-projects/deploy.sh"
echo ""
echo "📝 Logs nginx:"
echo "  /var/log/nginx/av-concept-projects.access.log"
echo "  /var/log/nginx/av-concept-projects.error.log"

