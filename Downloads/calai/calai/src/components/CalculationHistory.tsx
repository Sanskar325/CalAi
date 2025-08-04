import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Clock, Trash2, Calculator, Grid3X3, Binary } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import CalculationHistory, { HistoryItem } from '@/hooks/useCalculationHistory';
import { useToast } from '@/hooks/use-toast';

const CalculationHistoryComponent: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [history, setHistory] = React.useState<HistoryItem[]>([]);
  const historyManager = CalculationHistory.getInstance();

  React.useEffect(() => {
    if (user) {
      setHistory(historyManager.getHistory());
    }
  }, [user]);

  const handleClearHistory = () => {
    historyManager.clearHistory();
    setHistory([]);
    toast({
      title: "History Cleared",
      description: "All calculation history has been cleared.",
    });
  };

  const getTypeIcon = (type: HistoryItem['type']) => {
    switch (type) {
      case 'scientific':
        return Calculator;
      case 'matrix':
        return Grid3X3;
      case 'converter':
        return Binary;
      default:
        return Calculator;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp);
  };

  if (!user) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Calculation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Please sign in to view your calculation history.
            </p>
            <Button onClick={() => window.location.href = '/auth'}>
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Calculation History
          </CardTitle>
          {history.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearHistory}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No calculations in history yet. Start calculating to see your history here!
            </p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {history.map((item, index) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <TypeIcon className="w-5 h-5 mt-1 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium capitalize">
                            {item.type} Calculator
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(item.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2 break-all">
                          {item.calculation}
                        </div>
                        <div className="text-sm font-mono bg-background rounded px-2 py-1 break-all">
                          {item.result}
                        </div>
                      </div>
                    </div>
                    {index < history.length - 1 && <Separator />}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default CalculationHistoryComponent;