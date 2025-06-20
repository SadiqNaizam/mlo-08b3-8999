import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Pill, Repeat2, Clock, ClipboardPlus } from 'lucide-react';

interface MedicationCardProps {
  id: string | number;
  name: string;
  dosage: string;
  frequency: string;
  nextDueTime: string; // e.g., "2:00 PM Today", "Tomorrow 8:00 AM"
  onLogIntake?: (id: string | number) => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  id,
  name,
  dosage,
  frequency,
  nextDueTime,
  onLogIntake,
}) => {
  const { toast } = useToast();
  console.log('MedicationCard loaded for:', name);

  const handleLogIntake = () => {
    if (onLogIntake) {
      onLogIntake(id);
    } else {
      // Placeholder action if no handler is provided
      toast({
        title: "Intake Logged (Placeholder)",
        description: `Logged intake for ${name}.`,
      });
    }
    console.log(`Logged intake for medication ${id}: ${name}`);
  };

  return (
    <Card className="w-full shadow-lg flex flex-col h-full bg-white dark:bg-slate-900">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400 flex items-center">
          <Pill className="mr-2 h-6 w-6" />
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
          <Pill className="h-4 w-4 mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
          <div>
            <span className="font-medium text-gray-800 dark:text-gray-200">Dosage:</span> {dosage}
          </div>
        </div>
        <div className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
          <Repeat2 className="h-4 w-4 mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
          <div>
            <span className="font-medium text-gray-800 dark:text-gray-200">Frequency:</span> {frequency}
          </div>
        </div>
        <div className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
          <Clock className="h-4 w-4 mt-0.5 text-orange-500 dark:text-orange-400 flex-shrink-0" />
          <div>
            <span className="font-medium text-gray-800 dark:text-gray-200">Next Due:</span> <span className="font-semibold text-orange-600 dark:text-orange-400">{nextDueTime}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button 
          onClick={handleLogIntake} 
          className="w-full bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
        >
          <ClipboardPlus className="mr-2 h-4 w-4" />
          Log Intake
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedicationCard;