
import React from 'react';

interface MatrixResultProps {
  result: number[][] | number | string;
}

const MatrixResult: React.FC<MatrixResultProps> = ({ result }) => {
  if (result === undefined || (Array.isArray(result) && result.length === 0)) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Result</h2>
      
      {/* Display matrix result */}
      {Array.isArray(result) && (
        <div className="grid gap-2 p-4 bg-muted rounded-lg">
          {result.map((row, i) => (
            <div key={i} className="flex gap-2 justify-center">
              {row.map((value, j) => (
                <div
                  key={j}
                  className="w-16 h-16 flex items-center justify-center bg-background rounded border"
                >
                  {typeof value === 'number' ? value.toFixed(2) : value}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      
      {/* Display scalar result (number) */}
      {typeof result === 'number' && (
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex justify-center">
            <div className="w-auto px-6 h-16 flex items-center justify-center bg-background rounded border text-xl">
              {result.toFixed(2)}
            </div>
          </div>
        </div>
      )}
      
      {/* Display string result */}
      {typeof result === 'string' && (
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex justify-center">
            <div className="w-auto px-6 h-16 flex items-center justify-center bg-background rounded border text-xl">
              {result}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixResult;
