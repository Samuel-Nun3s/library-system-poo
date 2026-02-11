# Sistema de Biblioteca - POO com Estados

Sistema de empréstimo de livros implementado em TypeScript aplicando conceitos avançados de Programação Orientada a Objetos.

## Funcionalidades

- Cadastro de livros e usuários
- Empréstimo de livros com validações
- Devolução com cálculo automático de multa
- Controle de limite de empréstimos por usuário
- Listagem de empréstimos ativos

## Regras de Negócio

| Regra | Descrição |
|-------|-----------|
| Limite de empréstimos | Máximo 3 livros por usuário |
| Prazo de devolução | 7 dias |
| Multa por atraso | R$2 por dia |
| Disponibilidade | Livro emprestado não pode ser emprestado novamente |

## Estrutura do Projeto

```
src/
├── domain/
│   ├── Book.ts      # Entidade Livro
│   ├── User.ts      # Entidade Usuário
│   ├── Loan.ts      # Entidade Empréstimo
│   └── Library.ts   # Classe coordenadora
├── models/
│   ├── Book.ts      # Interface BookModel
│   ├── User.ts      # Interface UserModel
│   ├── Loan.ts      # Interface LoanModel
│   └── LoanStatus.ts # Enum de status
└── index.ts
```

## Conceitos de POO Aplicados

### Encapsulamento Forte
Todos os atributos das entidades são privados usando `#` (ECMAScript private fields):
```typescript
class Book {
  #id: number;
  #title: string;
  #available: boolean;
}
```

### Objetos com Estado
Cada entidade controla seu próprio estado através de métodos:
```typescript
book.markAsBorrowed();   // Não: book.available = false
book.markAsAvailable();
user.canLend();
```

### Enum de Estados
Status do empréstimo definido como enum:
```typescript
enum LoanStatus {
  ACTIVE = "ACTIVE",
  RETURNED = "RETURNED",
  LATE = "LATE"
}
```

### Composição
`Loan` mantém referências para objetos `Book` e `User`, não apenas IDs.

### Classe Coordenadora
`Library` orquestra as operações sem implementar regras de negócio internas.

## Uso

```typescript
import Library from "./domain/Library.js";

const biblioteca = new Library();

// Cadastrar
const livro = biblioteca.registerBook("Clean Code", "Robert Martin");
const usuario = biblioteca.registerUser("Samuel");

// Emprestar
const emprestimo = biblioteca.borrowBook(usuario.getUserId(), livro.getBookId());

// Devolver (retorna multa se houver atraso)
const multa = biblioteca.returnBook(emprestimo.getLoanId());

console.log("Multa:", multa);
```

## Tecnologias

- Node.js
- TypeScript
