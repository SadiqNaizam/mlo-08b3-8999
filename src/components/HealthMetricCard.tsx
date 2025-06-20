import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assumed available as per shadcn/ui starter projects

interface HealthMetricCardProps {
  /**
   * Optional icon to display. Recommended to pass a Lucide icon component.
   * Example: <CalendarDays className="h-6 w-6 text-blue-600 dark:text-blue-300" />
   */
  icon?: React.ReactNode;
  /**
   * The label describing the metric (e.g., "Appointments Today", "Next Medication").
   */
  metricLabel: string;
  /**
   * The value of the metric (e.g., "2", "Aspirin at 2 PM").
   */
  metricValue: string;
  /**
   * Optional Tailwind CSS class names for the metric value text.
   * Useful for applying specific colors (e.g., "text-red-500" for alerts).
   * Defaults to "text-gray-900 dark:text-gray-50".
   */
  metricValueClassName?: string;
  /**
   * Optional additional Tailwind CSS class names to apply to the Card root element.
   */
  className?: string;
}

const HealthMetricCard: React.FC<HealthMetricCardProps> = ({
  icon,
  metricLabel,
  metricValue,
  metricValueClassName = 'text-gray-900 dark:text-gray-50',
  className,
}) => {
  console.log('HealthMetricCard loaded:', { metricLabel, metricValue });

  return (
    <Card className={cn(
      "w-full sm:max-w-xs shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 ease-in-out",
      "bg-card text-card-foreground", // Using shadcn/ui theme variables for card background/text
      className
    )}>
      <CardContent className="p-5 flex items-center space-x-4">
        {icon && (
          <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-800 rounded-lg">
            {/* Icon is expected to be passed with its own size and color classes */}
            {icon}
          </div>
        )}
        <div className="flex-grow overflow-hidden">
          <p className={cn(
            "text-3xl font-bold truncate",
            metricValueClassName
          )}>
            {metricValue}
          </p>
          <p className="text-sm font-medium text-muted-foreground truncate">
            {metricLabel}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthMetricCard;