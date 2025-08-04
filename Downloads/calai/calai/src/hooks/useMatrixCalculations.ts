
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import CalculationHistory from '@/hooks/useCalculationHistory';

export const useMatrixCalculations = () => {
  const { toast } = useToast();
  const [result, setResult] = useState<number[][] | number | string>([]);
  const historyManager = CalculationHistory.getInstance();

  const calculateResult = (
    matrix1: number[][],
    matrix2: number[][],
    operation: string,
    rows1: number,
    cols1: number,
    rows2: number,
    cols2: number
  ) => {
    try {
      let newResult: number[][] | number | string = [];
      
      switch (operation) {
        case 'add':
        case 'subtract':
          if (rows1 !== rows2 || cols1 !== cols2) {
            throw new Error('Matrices must have the same dimensions for addition/subtraction');
          }
          newResult = matrix1.map((row, i) =>
            row.map((val, j) => operation === 'add' ? 
              val + matrix2[i][j] : 
              val - matrix2[i][j]
            )
          );
          break;

        case 'multiply':
          if (cols1 !== rows2) {
            throw new Error('Number of columns in first matrix must equal number of rows in second matrix');
          }
          newResult = Array(rows1).fill(0).map(() => Array(cols2).fill(0));
          for (let i = 0; i < rows1; i++) {
            for (let j = 0; j < cols2; j++) {
              newResult[i][j] = matrix1[i].reduce((sum, val, k) => 
                sum + val * matrix2[k][j], 0
              );
            }
          }
          break;

        case 'divide':
          if (rows1 !== rows2 || cols1 !== cols2) {
            throw new Error('Matrices must have the same dimensions for division');
          }
          newResult = matrix1.map((row, i) =>
            row.map((val, j) => {
              if (matrix2[i][j] === 0) throw new Error('Division by zero');
              return val / matrix2[i][j];
            })
          );
          break;

        case 'transpose':
          newResult = Array(cols1).fill(0).map((_, i) =>
            Array(rows1).fill(0).map((_, j) => matrix1[j][i])
          );
          break;

        case 'determinant':
          if (rows1 !== cols1) {
            throw new Error('Matrix must be square for determinant calculation');
          }
          newResult = calculateDeterminant(matrix1);
          break;

        case 'inverse':
          if (rows1 !== cols1) {
            throw new Error('Matrix must be square for inverse calculation');
          }
          newResult = calculateMatrixInverse(matrix1);
          break;

        case 'rank':
          newResult = calculateMatrixRank(matrix1);
          break;

        case 'cramer':
          if (rows1 !== cols1) {
            throw new Error('Matrix must be square for Cramer\'s rule');
          }
          if (rows2 !== rows1 || cols2 !== 1) {
            throw new Error('Second matrix must be a column vector of same height for Cramer\'s rule');
          }
          newResult = solveCramersRule(matrix1, matrix2);
          break;

        case 'gauss-jordan':
          newResult = gaussJordanElimination(matrix1);
          break;

        case 'power':
          if (rows1 !== cols1) {
            throw new Error('Matrix must be square for power operation');
          }
          if (rows2 !== 1 || cols2 !== 1) {
            throw new Error('Power must be a single number (1x1 matrix)');
          }
          const power = Math.round(matrix2[0][0]);
          if (power < 0) {
            throw new Error('Negative powers not supported');
          }
          newResult = calculateMatrixPower(matrix1, power);
          break;

        case 'binary':
        case 'hexadecimal':
        case 'decimal':
        case 'octal':
          // Handle number system conversions
          if (rows1 !== 1 || cols1 !== 1) {
            throw new Error('Please use a 1x1 matrix (single number) for number system conversions');
          }
          
          const num = matrix1[0][0];
          switch (operation) {
            case 'binary':
              newResult = num.toString(2);
              break;
            case 'hexadecimal':
              newResult = num.toString(16).toUpperCase();
              break;
            case 'decimal':
              newResult = num.toString(10);
              break;
            case 'octal':
              newResult = num.toString(8);
              break;
          }
          break;

        default:
          newResult = matrix1;
      }
      
      setResult(newResult);
      
      // Save to history
      const calculation = `Matrix ${operation}: ${JSON.stringify(matrix1)} ${operation} ${JSON.stringify(matrix2)}`;
      const resultStr = typeof newResult === 'object' ? JSON.stringify(newResult) : String(newResult);
      historyManager.addEntry('matrix', calculation, resultStr);
      
      toast({
        title: "Success",
        description: "Operation completed successfully",
      });
      console.log("Calculation result:", newResult);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return { result, calculateResult };
};

// Helper functions for matrix operations
const calculateMatrixInverse = (matrix: number[][]): number[][] => {
  const n = matrix.length;
  
  // Create augmented matrix [A|I]
  const augmented = matrix.map((row, i) => [
    ...row,
    ...Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))
  ]);
  
  // Gauss-Jordan elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
        maxRow = k;
      }
    }
    
    // Swap rows
    [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
    
    // Check for singular matrix
    if (Math.abs(augmented[i][i]) < 1e-10) {
      throw new Error('Matrix is singular and cannot be inverted');
    }
    
    // Scale pivot row
    const pivot = augmented[i][i];
    for (let j = 0; j < 2 * n; j++) {
      augmented[i][j] /= pivot;
    }
    
    // Eliminate column
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = augmented[k][i];
        for (let j = 0; j < 2 * n; j++) {
          augmented[k][j] -= factor * augmented[i][j];
        }
      }
    }
  }
  
  // Extract inverse matrix from right side
  return augmented.map(row => row.slice(n));
};

const calculateMatrixRank = (matrix: number[][]): number => {
  const m = matrix.length;
  const n = matrix[0].length;
  const copy = matrix.map(row => [...row]);
  
  let rank = 0;
  for (let col = 0; col < n && rank < m; col++) {
    // Find pivot
    let pivotRow = rank;
    for (let row = rank + 1; row < m; row++) {
      if (Math.abs(copy[row][col]) > Math.abs(copy[pivotRow][col])) {
        pivotRow = row;
      }
    }
    
    if (Math.abs(copy[pivotRow][col]) < 1e-10) continue;
    
    // Swap rows
    [copy[rank], copy[pivotRow]] = [copy[pivotRow], copy[rank]];
    
    // Eliminate below
    for (let row = rank + 1; row < m; row++) {
      const factor = copy[row][col] / copy[rank][col];
      for (let j = col; j < n; j++) {
        copy[row][j] -= factor * copy[rank][j];
      }
    }
    
    rank++;
  }
  
  return rank;
};

const solveCramersRule = (A: number[][], b: number[][]): number[][] => {
  const n = A.length;
  const detA = calculateDeterminant(A);
  
  if (Math.abs(detA) < 1e-10) {
    throw new Error('System has no unique solution (determinant is zero)');
  }
  
  const solution: number[][] = [];
  for (let i = 0; i < n; i++) {
    const Ai = A.map((row, j) => row.map((val, k) => k === i ? b[j][0] : val));
    const detAi = calculateDeterminant(Ai);
    solution.push([detAi / detA]);
  }
  
  return solution;
};

const calculateDeterminant = (matrix: number[][]): number => {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  
  let det = 0;
  for (let i = 0; i < n; i++) {
    const minor = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
    det += matrix[0][i] * Math.pow(-1, i) * calculateDeterminant(minor);
  }
  return det;
};

const gaussJordanElimination = (matrix: number[][]): number[][] => {
  const m = matrix.length;
  const n = matrix[0].length;
  const result = matrix.map(row => [...row]);
  
  let currentRow = 0;
  for (let col = 0; col < n && currentRow < m; col++) {
    // Find pivot
    let pivotRow = currentRow;
    for (let row = currentRow + 1; row < m; row++) {
      if (Math.abs(result[row][col]) > Math.abs(result[pivotRow][col])) {
        pivotRow = row;
      }
    }
    
    if (Math.abs(result[pivotRow][col]) < 1e-10) continue;
    
    // Swap rows
    [result[currentRow], result[pivotRow]] = [result[pivotRow], result[currentRow]];
    
    // Scale pivot row
    const pivot = result[currentRow][col];
    for (let j = 0; j < n; j++) {
      result[currentRow][j] /= pivot;
    }
    
    // Eliminate column
    for (let row = 0; row < m; row++) {
      if (row !== currentRow) {
        const factor = result[row][col];
        for (let j = 0; j < n; j++) {
          result[row][j] -= factor * result[currentRow][j];
        }
      }
    }
    
    currentRow++;
  }
  
  return result;
};

const calculateMatrixPower = (matrix: number[][], power: number): number[][] => {
  if (power === 0) {
    const n = matrix.length;
    return Array(n).fill(0).map((_, i) => Array(n).fill(0).map((_, j) => i === j ? 1 : 0));
  }
  
  if (power === 1) return matrix;
  
  let result = matrix;
  for (let i = 1; i < power; i++) {
    const newResult = Array(matrix.length).fill(0).map(() => Array(matrix[0].length).fill(0));
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[0].length; c++) {
        newResult[r][c] = result[r].reduce((sum, val, k) => sum + val * matrix[k][c], 0);
      }
    }
    result = newResult;
  }
  
  return result;
};
