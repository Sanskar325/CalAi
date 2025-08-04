import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { History, Trash2, Settings, BookOpen, RotateCcw } from 'lucide-react';
import CalculationHistory, { HistoryItem } from '@/hooks/useCalculationHistory';
import CalculatorSettings from './CalculatorSettings';
import FormulaReference from './FormulaReference';
import AngleUnitDialog from './AngleUnitDialog';

const ScientificCalculator = () => {
  const { toast } = useToast();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentCalculation, setCurrentCalculation] = useState('');
  
  // Settings states
  const [showSettings, setShowSettings] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);
  const [showAngleDialog, setShowAngleDialog] = useState(false);
  const [angleUnit, setAngleUnit] = useState<'degree' | 'radian' | 'gradian'>('degree');
  const [outputFormat, setOutputFormat] = useState<'decimal' | 'fraction'>('decimal');
  const [impliedMultiplication, setImpliedMultiplication] = useState(false);
  const [percentageType, setPercentageType] = useState<'standard' | 'additive'>('additive');

  const historyManager = CalculationHistory.getInstance();

  const inputNumber = (value: string) => {
    if (waitingForOperand) {
      setDisplay(value);
      setCurrentCalculation(value);
      setWaitingForOperand(false);
    } else {
      const newDisplay = display === '0' ? value : display + value;
      setDisplay(newDisplay);
      setCurrentCalculation(currentCalculation + value);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setCurrentCalculation('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
      setCurrentCalculation(currentCalculation + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setCurrentCalculation('');
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setCurrentCalculation(currentCalculation + ' ' + nextOperation + ' ');
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      // Complete the calculation display
      const fullCalculation = currentCalculation + ' = ' + newValue;
      setCurrentCalculation(fullCalculation);
      
      // Save to history
      historyManager.addEntry('scientific', currentCalculation, newValue.toString());
      setHistory(historyManager.getHistory());

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      if (nextOperation !== '=') {
        setCurrentCalculation(newValue + ' ' + nextOperation + ' ');
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case 'mod':
        return secondValue !== 0 ? firstValue % secondValue : 0;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performFunction = (func: string) => {
    const value = parseFloat(display);
    let result: number;

    try {
      // Update calculation display to show the function being performed
      let functionDisplay = '';
      switch (func) {
        case 'sin':
          result = calculateTrigFunction(Math.sin, value);
          functionDisplay = `sin(${value})`;
          break;
        case 'cos':
          result = calculateTrigFunction(Math.cos, value);
          functionDisplay = `cos(${value})`;
          break;
        case 'tan':
          result = calculateTrigFunction(Math.tan, value);
          functionDisplay = `tan(${value})`;
          break;
        case 'log':
          result = Math.log10(value);
          functionDisplay = `log(${value})`;
          break;
        case 'ln':
          result = Math.log(value);
          functionDisplay = `ln(${value})`;
          break;
        case 'sqrt':
          result = Math.sqrt(value);
          functionDisplay = `√(${value})`;
          break;
        case '1/x':
          result = 1 / value;
          functionDisplay = `1/(${value})`;
          break;
        case 'x²':
          result = value * value;
          functionDisplay = `(${value})²`;
          break;
        case 'x³':
          result = value * value * value;
          functionDisplay = `(${value})³`;
          break;
        case '!':
          result = factorial(Math.floor(value));
          functionDisplay = `${Math.floor(value)}!`;
          break;
        case 'π':
          result = Math.PI;
          functionDisplay = 'π';
          break;
        case 'e':
          result = Math.E;
          functionDisplay = 'e';
          break;
        case 'mod':
          // For mod, we need a second operand, so we'll use the previousValue
          if (previousValue !== null) {
            result = previousValue % value;
            functionDisplay = `${previousValue} mod ${value}`;
          } else {
            return;
          }
          break;
        case 'asin':
          result = Math.asin(value);
          functionDisplay = `sin⁻¹(${value})`;
          break;
        case 'acos':
          result = Math.acos(value);
          functionDisplay = `cos⁻¹(${value})`;
          break;
        case 'atan':
          result = Math.atan(value);
          functionDisplay = `tan⁻¹(${value})`;
          break;
        default:
          return;
      }

      if (isNaN(result) || !isFinite(result)) {
        throw new Error('Mathematical error');
      }

      // Update calculation display
      setCurrentCalculation(`${functionDisplay} = ${result}`);

      // Save function to history
      const calculation = `${functionDisplay}`;
      historyManager.addEntry('scientific', calculation, result.toString());
      setHistory(historyManager.getHistory());

      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid calculation",
      });
      setCurrentCalculation('Error in calculation');
    }
  };

  const factorial = (n: number): number => {
    if (n < 0) throw new Error('Factorial of negative number');
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const calculateTrigFunction = (func: (value: number) => number, value: number): number => {
    let angleInRadians = value;
    
    switch (angleUnit) {
      case 'degree':
        angleInRadians = value * Math.PI / 180;
        break;
      case 'gradian':
        angleInRadians = value * Math.PI / 200;
        break;
      case 'radian':
      default:
        angleInRadians = value;
        break;
    }
    
    return func(angleInRadians);
  };

  const formatResult = (value: number): string => {
    if (outputFormat === 'fraction' && Number.isInteger(value * 1000000)) {
      // Simple fraction conversion for common cases
      const tolerance = 1e-6;
      let numerator = value;
      let denominator = 1;
      
      for (let i = 1; i <= 1000; i++) {
        if (Math.abs(value * i - Math.round(value * i)) < tolerance) {
          numerator = Math.round(value * i);
          denominator = i;
          break;
        }
      }
      
      if (denominator !== 1 && numerator !== denominator) {
        return `${numerator}/${denominator}`;
      }
    }
    
    return value.toString();
  };

  const clearHistory = () => {
    historyManager.clearHistory();
    setHistory([]);
    toast({
      title: "History Cleared",
      description: "All calculation history has been cleared",
    });
  };

  const loadHistory = () => {
    setHistory(historyManager.getHistory());
    setShowHistory(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <Card className="bg-background border border-border shadow-xl">
            <CardHeader className="text-center border-b border-border pb-3">
              <div className="flex justify-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">NORM</span>
                <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">MATH</span>
                <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">DECI</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {/* Calculation Display */}
              <div className="bg-muted border rounded p-2 min-h-[3rem] text-left">
                <div className="text-sm text-muted-foreground font-mono">
                  {currentCalculation || ''}
                </div>
              </div>

              {/* Display */}
              <Input
                value={display}
                readOnly
                className="text-right text-3xl font-mono h-14 bg-muted border-0 text-foreground"
              />

              {/* First Row - Function Keys */}
              <div className="grid grid-cols-5 gap-1">
                <Button variant="secondary" className="h-10 text-xs">∑</Button>
                <Button onClick={() => setShowSettings(true)} variant="secondary" className="h-10 text-xs">
                  <Settings className="h-3 w-3" />
                </Button>
                <Button variant="secondary" className="h-10 text-xs">%</Button>
                <Button 
                  onClick={() => setShowAngleDialog(true)} 
                  variant="secondary" 
                  className="h-10 text-xs"
                >
                  {angleUnit.toUpperCase()}
                </Button>
                <Button onClick={() => setShowFormulas(true)} variant="secondary" className="h-10 text-xs">
                  MORE
                </Button>
              </div>

              {/* Second Row - SHIFT, ALPHA, Navigation */}
              <div className="grid grid-cols-6 gap-1">
                <Button variant="secondary" className="h-10 text-xs bg-yellow-600 text-white font-bold">
                  SHIFT
                </Button>
                <Button variant="secondary" className="h-10 text-xs bg-red-600 text-white font-bold">
                  ALPHA
                </Button>
                <Button variant="secondary" className="h-10 text-xs">◄</Button>
                <Button variant="secondary" className="h-10 text-xs">►</Button>
                <Button variant="secondary" className="h-10 text-xs">MODE</Button>
                <Button variant="secondary" className="h-10 text-xs">2nd</Button>
              </div>

              {/* Third Row - Advanced Functions */}
              <div className="grid grid-cols-6 gap-1">
                <Button variant="secondary" className="h-10 text-xs">SOLVE</Button>
                <Button variant="secondary" className="h-10 text-xs">=</Button>
                <Button variant="secondary" className="h-10 text-xs">d/dx</Button>
                <Button variant="secondary" className="h-10 text-xs">:</Button>
                <Button onClick={() => performFunction('!')} variant="secondary" className="h-10 text-xs">x!</Button>
                <Button variant="secondary" className="h-10 text-xs">∑</Button>
              </div>

              {/* Fourth Row - Mathematical Functions */}
              <div className="grid grid-cols-6 gap-1">
                <Button onClick={clear} variant="secondary" className="h-10 text-xs">CALC</Button>
                <Button variant="secondary" className="h-10 text-xs">∫dx</Button>
                <Button variant="secondary" className="h-10 text-xs">▲</Button>
                <Button variant="secondary" className="h-10 text-xs">▼</Button>
                <Button onClick={() => performFunction('1/x')} variant="secondary" className="h-10 text-xs">x⁻¹</Button>
                <Button onClick={() => performFunction('log')} variant="secondary" className="h-10 text-xs">Log_y</Button>
              </div>

              {/* Fifth Row - More Functions */}
              <div className="grid grid-cols-8 gap-1">
                <Button variant="secondary" className="h-10 text-xs">x/y</Button>
                <Button variant="secondary" className="h-10 text-xs">+R</Button>
                <Button onClick={() => performFunction('sqrt')} variant="secondary" className="h-10 text-xs">³√</Button>
                <Button onClick={() => performOperation('mod')} variant="secondary" className="h-10 text-xs">mod</Button>
                <Button onClick={() => performFunction('x³')} variant="secondary" className="h-10 text-xs">x³</Button>
                <Button variant="secondary" className="h-10 text-xs">10ˣ</Button>
                <Button onClick={() => performFunction('e')} variant="secondary" className="h-10 text-xs">eˣ</Button>
                <Button variant="secondary" className="h-10 text-xs">t</Button>
              </div>

              {/* Sixth Row - Trig Functions and More */}
              <div className="grid grid-cols-6 gap-1">
                <Button onClick={() => performFunction('sqrt')} variant="secondary" className="h-10 text-xs">√</Button>
                <Button onClick={() => performFunction('x²')} variant="secondary" className="h-10 text-xs">x²</Button>
                <Button variant="secondary" className="h-10 text-xs">xʸ</Button>
                <Button onClick={() => performFunction('log')} variant="secondary" className="h-10 text-xs">Log</Button>
                <Button onClick={() => performFunction('ln')} variant="secondary" className="h-10 text-xs">Ln</Button>
              </div>

              {/* Seventh Row - Trig Functions */}
              <div className="grid grid-cols-12 gap-1">
                <Button variant="secondary" className="h-10 text-xs">∠</Button>
                <Button variant="secondary" className="h-10 text-xs">a</Button>
                <Button variant="secondary" className="h-10 text-xs">FACT</Button>
                <Button variant="secondary" className="h-10 text-xs">b</Button>
                <Button variant="secondary" className="h-10 text-xs">|x|</Button>
                <Button variant="secondary" className="h-10 text-xs">c</Button>
                <Button onClick={() => performFunction('asin')} variant="secondary" className="h-10 text-xs">Sin⁻¹</Button>
                <Button variant="secondary" className="h-10 text-xs">d</Button>
                <Button onClick={() => performFunction('acos')} variant="secondary" className="h-10 text-xs">Cos⁻¹</Button>
                <Button variant="secondary" className="h-10 text-xs">e</Button>
                <Button onClick={() => performFunction('atan')} variant="secondary" className="h-10 text-xs">Tan⁻¹</Button>
                <Button variant="secondary" className="h-10 text-xs">f</Button>
              </div>

              {/* Eighth Row - Trig Functions */}
              <div className="grid grid-cols-6 gap-1">
                <Button onClick={() => {
                  const newDisplay = display.startsWith('-') ? display.slice(1) : '-' + display;
                  setDisplay(newDisplay);
                  setCurrentCalculation(newDisplay);
                }} variant="secondary" className="h-10 text-xs">(-)</Button>
                <Button variant="secondary" className="h-10 text-xs">0''</Button>
                <Button variant="secondary" className="h-10 text-xs">hyp</Button>
                <Button onClick={() => performFunction('sin')} variant="secondary" className="h-10 text-xs">Sin</Button>
                <Button onClick={() => performFunction('cos')} variant="secondary" className="h-10 text-xs">Cos</Button>
                <Button onClick={() => performFunction('tan')} variant="secondary" className="h-10 text-xs">Tan</Button>
              </div>

              {/* Ninth Row - Memory and Special Functions */}
              <div className="grid grid-cols-9 gap-1">
                <Button variant="secondary" className="h-10 text-xs">STO</Button>
                <Button variant="secondary" className="h-10 text-xs">CLRv</Button>
                <Button variant="secondary" className="h-10 text-xs">j</Button>
                <Button variant="secondary" className="h-10 text-xs">Cot</Button>
                <Button onClick={() => {
                  const value = parseFloat(display);
                  const result = value * 0.01;
                  setDisplay(String(result));
                  setCurrentCalculation(`${value}% = ${result}`);
                  setWaitingForOperand(true);
                }} variant="secondary" className="h-10 text-xs">%</Button>
                <Button variant="secondary" className="h-10 text-xs">Cot⁻¹</Button>
                <Button variant="secondary" className="h-10 text-xs">y</Button>
                <Button onClick={loadHistory} variant="secondary" className="h-10 text-xs">M-</Button>
                <Button onClick={clear} variant="secondary" className="h-10 text-xs">AC</Button>
              </div>

              {/* Number Pad Row 1 */}
              <div className="grid grid-cols-5 gap-1">
                <Button onClick={() => inputNumber('7')} className="h-12 text-lg font-bold bg-[hsl(var(--calc-number))] text-[hsl(var(--calc-number-foreground))] hover:bg-[hsl(var(--calc-number))]/80">7</Button>
                <Button onClick={() => inputNumber('8')} className="h-12 text-lg font-bold bg-[hsl(var(--calc-number))] text-[hsl(var(--calc-number-foreground))] hover:bg-[hsl(var(--calc-number))]/80">8</Button>
                <Button onClick={() => inputNumber('9')} className="h-12 text-lg font-bold bg-[hsl(var(--calc-number))] text-[hsl(var(--calc-number-foreground))] hover:bg-[hsl(var(--calc-number))]/80">9</Button>
                <Button onClick={() => performOperation('×')} className="h-12 text-lg bg-[hsl(var(--calc-orange))] text-[hsl(var(--calc-orange-foreground))] hover:bg-[hsl(var(--calc-orange))]/90 font-bold">×</Button>
                <Button onClick={() => performOperation('÷')} className="h-12 text-lg bg-[hsl(var(--calc-orange))] text-[hsl(var(--calc-orange-foreground))] hover:bg-[hsl(var(--calc-orange))]/90 font-bold">÷</Button>
              </div>

              {/* Additional Function Row */}
              <div className="grid grid-cols-8 gap-1">
                <Button variant="secondary" className="h-10 text-xs">MATRIX</Button>
                <Button variant="secondary" className="h-10 text-xs">VECTOR</Button>
                <Button variant="secondary" className="h-10 text-xs">FUNC</Button>
                <Button variant="secondary" className="h-10 text-xs">HELP</Button>
                <Button variant="secondary" className="h-10 text-xs">nPr</Button>
                <Button variant="secondary" className="h-10 text-xs">GCD</Button>
                <Button variant="secondary" className="h-10 text-xs">nCr</Button>
                <Button variant="secondary" className="h-10 text-xs">LCM</Button>
              </div>

              {/* Number Pad Row 2 */}
              <div className="grid grid-cols-5 gap-1">
                <Button onClick={() => inputNumber('4')} className="h-12 text-lg font-bold bg-[hsl(var(--calc-number))] text-[hsl(var(--calc-number-foreground))] hover:bg-[hsl(var(--calc-number))]/80">4</Button>
                <Button onClick={() => inputNumber('5')} className="h-12 text-lg font-bold bg-[hsl(var(--calc-number))] text-[hsl(var(--calc-number-foreground))] hover:bg-[hsl(var(--calc-number))]/80">5</Button>
                <Button onClick={() => inputNumber('6')} className="h-12 text-lg font-bold bg-[hsl(var(--calc-number))] text-[hsl(var(--calc-number-foreground))] hover:bg-[hsl(var(--calc-number))]/80">6</Button>
                <Button onClick={() => performOperation('×')} className="h-12 text-lg bg-[hsl(var(--calc-orange))] text-[hsl(var(--calc-orange-foreground))] hover:bg-[hsl(var(--calc-orange))]/90 font-bold">×</Button>
                <Button onClick={() => performOperation('÷')} className="h-12 text-lg bg-[hsl(var(--calc-orange))] text-[hsl(var(--calc-orange-foreground))] hover:bg-[hsl(var(--calc-orange))]/90 font-bold">÷</Button>
              </div>

              {/* Additional Function Row 2 */}
              <div className="grid grid-cols-7 gap-1">
                <Button variant="secondary" className="h-10 text-xs">STAT</Button>
                <Button variant="secondary" className="h-10 text-xs">CMPLX</Button>
                <Button variant="secondary" className="h-10 text-xs">DISTR</Button>
                <Button variant="secondary" className="h-10 text-xs">Pol</Button>
                <Button variant="secondary" className="h-10 text-xs">Ceil</Button>
                <Button variant="secondary" className="h-10 text-xs">Rec</Button>
                <Button variant="secondary" className="h-10 text-xs">Floor</Button>
              </div>

              {/* Number Pad Row 3 */}
              <div className="grid grid-cols-5 gap-1">
                <Button onClick={() => inputNumber('1')} className="h-12 text-lg font-bold bg-[hsl(var(--calc-number))] text-[hsl(var(--calc-number-foreground))] hover:bg-[hsl(var(--calc-number))]/80">1</Button>
                <Button onClick={() => inputNumber('2')} className="h-12 text-lg font-bold bg-[hsl(var(--calc-number))] text-[hsl(var(--calc-number-foreground))] hover:bg-[hsl(var(--calc-number))]/80">2</Button>
                <Button onClick={() => inputNumber('3')} className="h-12 text-lg font-bold bg-[hsl(var(--calc-number))] text-[hsl(var(--calc-number-foreground))] hover:bg-[hsl(var(--calc-number))]/80">3</Button>
                <Button onClick={() => performOperation('+')} className="h-12 text-lg bg-[hsl(var(--calc-orange))] text-[hsl(var(--calc-orange-foreground))] hover:bg-[hsl(var(--calc-orange))]/90 font-bold">+</Button>
                <Button onClick={() => performOperation('-')} className="h-12 text-lg bg-[hsl(var(--calc-orange))] text-[hsl(var(--calc-orange-foreground))] hover:bg-[hsl(var(--calc-orange))]/90 font-bold">-</Button>
              </div>

              {/* Bottom Function Row */}
              <div className="grid grid-cols-8 gap-1">
                <Button variant="secondary" className="h-10 text-xs">COPY</Button>
                <Button variant="secondary" className="h-10 text-xs">PASTE</Button>
                <Button variant="secondary" className="h-10 text-xs">Ran#</Button>
                <Button variant="secondary" className="h-10 text-xs">RanInt</Button>
                <Button onClick={() => performFunction('π')} variant="secondary" className="h-10 text-xs">π</Button>
                <Button onClick={() => performFunction('e')} variant="secondary" className="h-10 text-xs">e</Button>
                <Button variant="secondary" className="h-10 text-xs">PreAns</Button>
                <Button onClick={loadHistory} variant="secondary" className="h-10 text-xs">History</Button>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-5 gap-1">
                <Button onClick={() => inputNumber('0')} className="h-12 text-lg font-bold bg-[hsl(var(--calc-number))] text-[hsl(var(--calc-number-foreground))] hover:bg-[hsl(var(--calc-number))]/80">0</Button>
                <Button onClick={inputDecimal} className="h-12 text-lg font-bold bg-[hsl(var(--calc-number))] text-[hsl(var(--calc-number-foreground))] hover:bg-[hsl(var(--calc-number))]/80">.</Button>
                <Button variant="secondary" className="h-12 text-lg">Exp</Button>
                <Button variant="secondary" className="h-12 text-lg">Ans</Button>
                <Button 
                  onClick={() => performOperation('=')} 
                  className="h-12 text-lg font-bold bg-[hsl(var(--calc-orange))] text-[hsl(var(--calc-orange-foreground))] hover:bg-[hsl(var(--calc-orange))]/90"
                >
                  =
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="lg:col-span-1">
            <Card className="card-gradient border shadow-lg h-full">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Calculation History</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      onClick={clearHistory}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => setShowHistory(false)}
                      size="sm"
                      variant="secondary"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-96">
                  {history.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No calculations yet
                    </div>
                  ) : (
                    <div className="space-y-2 p-4">
                      {history.map((item, index) => (
                        <div key={item.id} className="space-y-1">
                          <div className="text-xs text-muted-foreground">
                            {item.timestamp.toLocaleString()}
                          </div>
                          <div className="text-sm">
                            <div className="text-foreground">{item.calculation}</div>
                            <div className="text-primary font-mono">= {item.result}</div>
                          </div>
                          {index < history.length - 1 && <Separator />}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Settings Dialog */}
      <CalculatorSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        angleUnit={angleUnit}
        setAngleUnit={setAngleUnit}
        outputFormat={outputFormat}
        setOutputFormat={setOutputFormat}
        impliedMultiplication={impliedMultiplication}
        setImpliedMultiplication={setImpliedMultiplication}
        percentageType={percentageType}
        setPercentageType={setPercentageType}
      />

      {/* Formula Reference Dialog */}
      <FormulaReference
        isOpen={showFormulas}
        onClose={() => setShowFormulas(false)}
      />

      {/* Angle Unit Dialog */}
      <AngleUnitDialog
        isOpen={showAngleDialog}
        onClose={() => setShowAngleDialog(false)}
        angleUnit={angleUnit}
        setAngleUnit={setAngleUnit}
      />
    </div>
  );
};

export default ScientificCalculator;