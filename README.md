# BlogPosts App

Um aplicativo de blog desenvolvido em React Native com recursos de CRUD, gerenciamento de estado, suporte offline e muito mais.

## 📱 Funcionalidades

- **Tela Inicial**: Lista de postagens com funcionalidade de favoritar e busca por título/conteúdo
- **Criar Postagem**: Formulário para criação de novas postagens
- **Detalhes da Postagem**: Visualização do conteúdo completo, comentários e perfil do autor
- **Perfil do Usuário**: Informações do usuário e lista de suas postagens
- **Favoritos**: Gerenciamento de postagens favoritas com persistência local

## 📚 Stack Tecnológica

- **React Native** - Framework para desenvolvimento mobile multiplataforma
- **TypeScript** - Superset JavaScript com tipagem estática
- **Expo Router** - Sistema de navegação baseado em arquivo para Expo
- **Styled Components** - Estilização de componentes com CSS-in-JS
- **Redux Toolkit** - Gerenciamento de estado global
- **Context API** - Gerenciamento de estados locais
- **AsyncStorage** - Persistência de dados local
- **Axios** - Cliente HTTP para consumo de APIs
- **Offline First** - Suporte para funcionamento sem conexão

## 🔧 Ferramentas e Bibliotecas

- **UI/UX**
  - Styled Components para estilização consistente
  - React Native Reanimated para animações fluidas
  - Expo Vector Icons para iconografia

- **Gerenciamento de Estado**
  - Redux com Redux Toolkit para estado global
  - Context API para estados específicos de componentes
  - Hooks personalizados para lógica reutilizável

- **Armazenamento**
  - AsyncStorage para persistência local
  - Estratégia de cache para funcionamento offline

- **Networking**
  - Axios para consumo da API
  - JSONPlaceholder como backend de exemplo

## 🧩 Arquitetura

A aplicação segue uma arquitetura modular baseada em recursos:

```
/app
  /app                   # Rotas e navegação (Expo Router)
    /tabs                # Navegação por abas
    /post                # Telas de posts
    /user                # Telas de usuários
  /components            # Componentes reutilizáveis
    /ui                  # Componentes UI básicos
    /post                # Componentes relacionados a posts
    /comment             # Componentes relacionados a comentários
    /user                # Componentes relacionados a usuários
  /services              # Serviços e API
  /store                 # Estado global (Redux)
   /reducers             # Slices do Redux Toolkit
  /types                 # Definições de tipos
  /utils                 # Utilitários e helpers
  /hooks                 # Hooks personalizados
```

## 📦 Instalação e Uso

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)

### Passos para instalação

1. Clone o repositório
   ```bash
   git clone https://github.com/guilhermehub12/BlogPosts.git
   cd BlogPosts
   ```

2. Instale as dependências
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o aplicativo
   ```bash
   npx expo start
   ```

4. Abra o aplicativo no emulador ou dispositivo físico
   - Pressione `a` para abrir no emulador Android
   - Pressione `i` para abrir no emulador iOS
   - Ou escaneie o QR code com o aplicativo Expo Go no seu dispositivo

## 💡 Decisões Técnicas

### Por que TypeScript?
TypeScript foi escolhido para adicionar tipagem estática, melhorando a qualidade do código e a experiência de desenvolvimento com autocomplete e detecção de erros em tempo de compilação.

### Por que Expo?
Expo foi utilizado para facilitar o desenvolvimento e testes, permitindo executar o aplicativo em dispositivos físicos sem a necessidade de configurações complexas.

### Por que Redux + Context API?
Redux foi usado para gerenciar o estado global da aplicação (posts, usuários, favoritos), enquanto Context API foi utilizado para estados mais locais. Esta combinação oferece flexibilidade e evita o boilerplate excessivo.

### Por que Styled Components?
Styled Components permite criar componentes com estilos encapsulados, tornando o código mais legível e manutenível, além de facilitar a criação de temas e variantes de componentes.

### Por que AsyncStorage?
AsyncStorage foi implementado para persistência de dados e suporte offline, permitindo que o aplicativo mantenha seus dados mesmo quando o usuário sai do aplicativo ou perde a conexão.

## ✨ Recursos Adicionais

- **Animações**: Micros interações animadas para melhor feedback visual
- **Offline First**: Funcionamento básico sem conexão com internet
- **Avatar de Usuário**: Geração de avatares baseados no nome usando ui-avatars.com
- **Busca Otimizada**: Busca em tempo real de posts por título e conteúdo
- **Paginação**: Implementada para listas grandes de posts

## 📝 Melhorias Futuras

- Implementação de testes unitários e de integração
- Autenticação de usuários
- Melhorias na performance de listas longas
- Modo escuro/claro com tema persistente

## 👤 Autor

Desenvolvido por [Guilherme](https://github.com/guilhermehub12) como parte do desafio técnico para a vaga de Desenvolvedor Front-End/Mobile na Soffia.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.