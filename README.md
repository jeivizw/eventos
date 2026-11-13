# 🎟️ EventCraft

**Organizador e Check-in de Ingressos para Eventos**

O **EventCraft** é um aplicativo mobile desenvolvido para facilitar a vida de produtores de eventos. Com ele, é possível gerenciar listas de participantes e realizar o check-in rápido de ingressos diretamente na portaria através de dispositivos Android.

## 📱 Funcionalidades
- Controle e listagem de eventos.
- Validação rápida de ingressos e check-in.
- Interface amigável e "Safe Zones" adaptadas para diferentes resoluções.

## 🚀 Tecnologias Utilizadas
- **React.js** (Interface de Usuário)
- **Capacitor** (Empacotamento Nativo Mobile)
- **@capacitor/assets** (Geração automática de Ícone e Splash Screen)
- **GitHub Actions** (CI/CD para geração automática do APK na nuvem)

## 📸 Capturas de Tela
> **Nota para o aluno:** Arraste as fotos que você tirou do emulador/celular para cá.
> 
> *Ícone do EventCraft na grade de aplicativos:*
> ![Grade de Apps](./caminho-para-sua-foto-da-grade.jpg)
> 
> *Tela Inicial / Splash Screen:*
> ![Splash Screen](./caminho-para-sua-foto-da-splash.jpg)

## 🛠️ Como rodar o projeto localmente
1. Clone este repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Faça o build do projeto web:
   ```bash
   npm run build
   ```
4. Sincronize com o Android e abra no Android Studio:
   ```bash
   npx cap sync android
   npx cap open android
   ```
