# Bingo Digital

Bingo Digital é uma aplicação web moderna para sorteio de números de bingo, ideal para eventos online, festas, confraternizações e dinâmicas de grupo. O sistema permite sorteio automático ou manual, exibição animada dos números, ranking de vencedores e repetição do número sorteado com áudio.

## 🌐 Acesse em Produção

Acesse a versão online: [https://bingo-online-iota.vercel.app/](https://bingo-online-iota.vercel.app/)

---

## 🚀 Sobre o Projeto

- **Sorteio de Números**: Realize sorteios automáticos ou manuais de números de bingo (1 a 75), com visualização animada e áudio.
- **Ranking de Ganhadores**: Registre e visualize os vencedores, com detalhes dos números sorteados.
- **Configurações**: Ajuste volume, modo de sorteio (manual/automático), repetição de áudio e outras preferências.
- **Persistência Local**: O estado do jogo e ranking são salvos no navegador, permitindo retomar o bingo mesmo após recarregar a página.
- **Interface Responsiva**: Layout adaptado para desktop e dispositivos móveis.

---

## ⚙️ Como Funciona

1. **Início do Sorteio**: Clique em "Iniciar Sorteio" para começar. O número sorteado aparece em destaque, com áudio correspondente.
2. **Modo Automático**: Ative o sorteio contínuo nas configurações para sortear números automaticamente em intervalos regulares.
3. **Registrar Ganhador**: Após um participante completar sua cartela, registre o nome e os números sorteados.
4. **Ranking**: Veja a lista de ganhadores e detalhes de cada vitória.
5. **Resetar Jogo**: Reinicie o bingo a qualquer momento, limpando números e ranking.

---

## 📚 Rotas da Aplicação

O projeto utiliza [Next.js](https://nextjs.org/) com rotas baseadas em arquivos. As principais rotas são:

- `/`  
  Página principal do bingo digital, onde ocorre o sorteio, registro de ganhadores e acesso às configurações.

> **Nota:** Todas as funcionalidades estão concentradas na rota principal (`/`). Não há rotas privadas ou de autenticação.

---

## 🛠 Tecnologias Utilizadas

- **Next.js** (React)
- **TypeScript**
- **Tailwind CSS**
- **LocalStorage** (persistência no navegador)
- **Vercel** (deploy)

---

## ▶️ Como Rodar Localmente

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/bingo-app.git
    cd bingo-app
    ```

2. Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

4. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📦 Estrutura de Pastas

```
src/
  components/      # Componentes React (cartela, sorteio, ranking, etc)
  services/        # Serviços de lógica e persistência
  types/           # Tipagens TypeScript
  app/             # Páginas e estilos globais
public/
  sounds/          # Áudios dos números sorteados
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

Feito com ❤️ por