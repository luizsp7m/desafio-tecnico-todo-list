## Funcionalidades
- **Adicionar colunas**: Criação dinâmica de novas colunas dentro da interface.
- **Editar colunas**: Modificação de propriedades das colunas existentes.
- **Apagar colunas**: Remoção de colunas da interface.
- **Arrastar/trocar de lugar as colunas**: Reordenação das colunas por meio de arrastar e soltar, utilizando `hello-pangea/dnd`.
- **Adicionar tarefas**: Inclusão de novas tarefas nas colunas.
- **Editar tarefas**: Edição de informações das tarefas existentes.
- **Apagar tarefas**: Remoção de tarefas de qualquer coluna.
- **Mover tarefas entre colunas**: Arrastar e soltar tarefas entre diferentes colunas.
- **Tema Dark/Light**: Alternância entre o modo escuro e claro da interface.
- **Persistência dos dados**: Armazenamento local dos dados para manter as alterações, mesmo após o fechamento da aplicação.

## Tecnologias utilizadas
- **React**: Biblioteca para construção de interfaces dinâmicas e reutilizáveis.
- **hello-pangea/dnd**: Facilita a implementação de arrastar e soltar em React com uma API simples.
- **React Hook Form**: Melhora a performance e simplifica a gestão de formulários em React.
- **Zod**: Validação de esquemas com tipagem estática robusta e validações seguras.
- **Tailwind CSS**: Framework utilitário que permite estilizar de maneira eficiente e responsiva.
- **shadcn**: Componente de UI moderno e acessível para React, focado em design minimalista.
- **Zustand**: Gerenciamento de estado simples e eficiente, com ótima integração ao React.
- **Vitest**: Ferramenta de teste rápida e com boa integração ao ecossistema do React.
  
## Era planejado, mas não vai dar tempo

- **Adicionar tags**: Possibilidade de adicionar tags às tarefas.
- **Responsáveis pela tarefa**: Atribuição de responsáveis às tarefas.
- **Comentários nas tarefas**: Adição de uma funcionalidade de comentários nas tarefas.
- **Testes unitários**: Implementação de testes unitários para todos os componentes, garantindo maior confiabilidade.
- **Lazy loading com Suspense**: Lazy imports para reduzir o bundle e melhorar o desempenho, com skeletons no carregamento.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)

Verificar se o Node.js está instalado:

```
node -v
```

Verificar se o Git está instalado:

```
git -v
```

### 1. Clonar o repositório

Clone este repositório em sua máquina local usando o comando abaixo:

```
git clone https://github.com/luizsp7m/desafio-tecnico-todo-list
```

### 2. Navegue até o diretório do projeto

```
cd desafio-tecnico-todo-list
```

### 3. Instale as dependências

```
npm install
```

### 4. Execute o projeto

Para iniciar o servidor de desenvolvimento, execute:

``` 
npm run dev
```

O projeto estará disponível no endereço [http://localhost:5173/](http://localhost:5173/)

Se preferir, pode ver o projeto online aqui: [https://desafio-tecnico-todo-list.vercel.app/](https://desafio-tecnico-todo-list.vercel.app/)
