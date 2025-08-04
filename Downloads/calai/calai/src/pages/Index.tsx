
import MatrixCalculator from "@/components/MatrixCalculator";
import NumberConverter from "@/components/NumberConverter";
import ScientificCalculator from "@/components/ScientificCalculator";
import ProfitLossCalculator from "@/components/ProfitLossCalculator";
import PercentageCalculator from "@/components/PercentageCalculator";
import InterestCalculator from "@/components/InterestCalculator";
import EquationSolver from "@/components/EquationSolver";
import AreaVolumeCalculator from "@/components/AreaVolumeCalculator";
import LogarithmCalculator from "@/components/LogarithmCalculator";
import PhysicsFormulas from "@/components/PhysicsFormulas";
import ChemistryFormulas from "@/components/ChemistryFormulas";
import CalculationHistoryComponent from "@/components/CalculationHistory";
import AppSidebar from "@/components/AppSidebar";
import AiChat from "@/components/AiChat";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, User } from "lucide-react";
import phoneDock from "@/assets/phone-dock.png";

const Index = () => {
  const [selectedOperation, setSelectedOperation] = useState("converter");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOperationSelect = (operation: string) => {
    setSelectedOperation(operation);
  };

  const renderMainContent = () => {
    switch (selectedOperation) {
      case 'converter':
        return <NumberConverter />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'matrix':
        return <MatrixCalculator initialOperation="add" />;
      case 'profit-loss':
        return <ProfitLossCalculator />;
      case 'percentage':
        return <PercentageCalculator />;
      case 'interest':
        return <InterestCalculator />;
      case 'equation-solver':
        return <EquationSolver />;
      case 'area-volume':
        return <AreaVolumeCalculator />;
      case 'logarithm':
        return <LogarithmCalculator />;
      case 'physics-formulas':
        return <PhysicsFormulas />;
      case 'chemistry-formulas':
        return <ChemistryFormulas />;
      case 'history':
        return <CalculationHistoryComponent />;
      default:
        return <NumberConverter />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar onOperationSelect={handleOperationSelect} />
        <main className="flex-1 relative overflow-hidden">
          {/* Header */}
          <div className="absolute top-4 right-4 z-20">
            <Button
              onClick={() => navigate(user ? '/account' : '/auth')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {user ? <User className="w-4 h-4 mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
              {user ? 'Account' : 'Sign In'}
            </Button>
          </div>
          {/* Background gradient overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{ background: 'var(--gradient-hero)' }}
          />
          
          
          {/* Main content */}
          <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
            {renderMainContent()}
          </div>
          
          {/* AI Chat Component */}
          <AiChat />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
