import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Stethoscope } from 'lucide-react';

interface AppointmentCardProps {
  id: string | number; // For React key, not necessarily displayed directly
  doctorName: string;
  clinicName?: string;
  appointmentDate: Date;
  appointmentTime: string; // e.g., "10:30 AM"
  appointmentType: string; // e.g., "Annual Check-up"
  status?: 'Upcoming' | 'Completed' | 'Cancelled';
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  id,
  doctorName,
  clinicName,
  appointmentDate,
  appointmentTime,
  appointmentType,
  status = 'Upcoming', // Default to 'Upcoming' if not provided
}) => {
  console.log(`AppointmentCard loaded for ID: ${id}, Type: ${appointmentType}`);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadgeVariant = (
    currentStatus: 'Upcoming' | 'Completed' | 'Cancelled'
  ): 'default' | 'secondary' | 'destructive' => {
    switch (currentStatus) {
      case 'Completed':
        return 'secondary'; // Typically greyish, good for completed tasks
      case 'Cancelled':
        return 'destructive'; // Red, for cancelled/error states
      case 'Upcoming':
      default:
        return 'default'; // Primary theme color, often blue, good for upcoming
    }
  };

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <CardHeader className="pb-3"> {/* Slightly reduced bottom padding for header */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-grow">
            <CardTitle className="text-lg font-semibold text-blue-700 mb-1">
              {appointmentType}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              <div className="flex items-center">
                <Stethoscope className="h-4 w-4 mr-2 flex-shrink-0 text-blue-600" />
                <span>
                  {doctorName}
                  {clinicName && <span className="text-gray-500"> - {clinicName}</span>}
                </span>
              </div>
            </CardDescription>
          </div>
          {status && (
            <Badge variant={getStatusBadgeVariant(status)} className="whitespace-nowrap">
              {status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4 space-y-2"> {/* Adjusted padding for content */}
        <div className="flex items-center text-sm text-gray-700">
          <CalendarDays className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
          <span>{formatDate(appointmentDate)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
          <span>{appointmentTime}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;