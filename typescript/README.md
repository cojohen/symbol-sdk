# Symbol Machines Memory SDK (TypeScript)

A lightweight SDK that adds structured long-term memory to any LLM.

Learn more at https://symbolmachines.com

---

## Installation

```bash
npm install @symbolmachines/memory
```

## Usage

```typescript
import Symbol from "@symbolmachines/memory";

const symbol = new Symbol({ apiKey: process.env.SYMBOL_API_KEY });

// Inject memory before calling your LLM
const context = await symbol.memory.inject.create({
  input: "What should I eat for lunch?",
});

// ... call your LLM with the contextual input ...

// Save memory afterward
await symbol.memory.save.create({
  output: "Eat sushi is a healthy meal.",
});
```

---

## API

`symbol.memory.inject.create({ input })`
Injects memory context into user input.

`symbol.memory.save.create({ output })`
Writes output into the Symbol's memory.

---

## Configuration

```typescript
const symbol = new Symbol({
  apiKey: "sk-...",
  baseUrl: "https://api.symbol.ai/v1", // optional override
});
```
