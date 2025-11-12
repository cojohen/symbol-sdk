export type SymbolConfig = {
  apiKey: string;
  baseUrl?: string;
};

export default class Symbol {
  memory: {
    inject: {
      create: (params: {
        input: string;
      }) => Promise<{ contextualInput: string }>;
    };
    save: {
      create: (params: { output: string }) => Promise<void>;
    };
  };

  private apiKey: string;
  private baseUrl: string;

  constructor(config: SymbolConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://api.symbol.ai/v1";

    this.memory = {
      inject: {
        create: async ({ input }) => this.post("/memory/inject", { input }),
      },
      save: {
        create: async ({ output }) => this.post("/memory/save", { output }),
      },
    };
  }

  private async post<T>(endpoint: string, body: object): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Symbol Machines API Error: ${res.status} - ${text}`);
    }

    return res.json();
  }
}
