export interface HistoryItem {
  id: string;
  type: 'scientific' | 'matrix' | 'converter';
  calculation: string;
  result: string;
  timestamp: Date;
}

class CalculationHistory {
  private static instance: CalculationHistory;
  private history: HistoryItem[] = [];

  private constructor() {
    // Load history from localStorage on initialization
    this.loadHistory();
  }

  public static getInstance(): CalculationHistory {
    if (!CalculationHistory.instance) {
      CalculationHistory.instance = new CalculationHistory();
    }
    return CalculationHistory.instance;
  }

  public addEntry(type: HistoryItem['type'], calculation: string, result: string): void {
    const newEntry: HistoryItem = {
      id: Date.now().toString(),
      type,
      calculation,
      result,
      timestamp: new Date(),
    };

    this.history.unshift(newEntry); // Add to beginning
    
    // Keep only last 100 entries
    if (this.history.length > 100) {
      this.history = this.history.slice(0, 100);
    }

    this.saveHistory();
  }

  public getHistory(): HistoryItem[] {
    return this.history;
  }

  public clearHistory(): void {
    this.history = [];
    this.saveHistory();
  }

  private saveHistory(): void {
    try {
      localStorage.setItem('calculationHistory', JSON.stringify(this.history));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }

  private loadHistory(): void {
    try {
      const saved = localStorage.getItem('calculationHistory');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.history = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
      this.history = [];
    }
  }
}

export default CalculationHistory;
