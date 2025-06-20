import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import AppSidebar from '@/components/layout/AppSidebar';
import Footer from '@/components/layout/Footer';

// Custom Data Display Components
import HealthMetricCard from '@/components/HealthMetricCard';
import AppointmentCard from '@/components/AppointmentCard';
import MedicationCard from '@/components/MedicationCard';

// Shadcn/ui Components
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Lucide Icons
import { CalendarDays, Pill, Activity, User, ListChecks, Smile } from 'lucide-react';

// Placeholder data
const sampleAppointments = [
  {
    id: 'apt1',
    doctorName: 'Dr. Dora',
    clinicName: 'Future Clinic',
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from now
    appointmentTime: '10:00 AM',
    appointmentType: 'Annual Check-up',
    status: 'Upcoming' as 'Upcoming' | 'Completed' | 'Cancelled',
  },
  {
    id: 'apt2',
    doctorName: 'Dr. Nobi',
    clinicName: 'Health Hub',
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 7)), // A week from now
    appointmentTime: '02:30 PM',
    appointmentType: 'Dental Cleaning',
    status: 'Upcoming' as 'Upcoming' | 'Completed' | 'Cancelled',
  },
];

const sampleMedications = [
  {
    id: 'med1',
    name: 'Vitamin Joy',
    dosage: '1 tablet',
    frequency: 'Once a day',
    nextDueTime: 'Today 9:00 AM',
  },
  {
    id: 'med2',
    name: 'Energy Booster X',
    dosage: '2 capsules',
    frequency: 'Twice a day',
    nextDueTime: 'Today 1:00 PM',
  },
];

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');

  // Example: Get a dynamic count for HealthMetricCard
  const upcomingAppointmentsCount = sampleAppointments.filter(a => a.status === 'Upcoming').length;
  const todaysMedicationsCount = sampleMedications.length; // Assuming these are for today

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 dark:bg-slate-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <ScrollArea className="flex-1">
          <main className="p-6 space-y-8">
            {/* Welcome Message */}
            <section>
              <h1 className="text-3xl font-bold text-sky-700 dark:text-sky-300">
                Welcome Back!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Here's your health summary for today. Stay healthy and happy!
              </p>
            </section>

            {/* Health Metrics Section */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-700 dark:text-sky-300 mb-4">Key Health Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <HealthMetricCard
                  icon={<CalendarDays className="h-7 w-7 text-sky-600 dark:text-sky-400" />}
                  metricLabel="Upcoming Appointments"
                  metricValue={upcomingAppointmentsCount.toString()}
                  metricValueClassName="text-sky-600 dark:text-sky-400"
                  className="bg-white dark:bg-slate-800"
                />
                <HealthMetricCard
                  icon={<Pill className="h-7 w-7 text-red-500 dark:text-red-400" />}
                  metricLabel="Medications Today"
                  metricValue={todaysMedicationsCount.toString()}
                  metricValueClassName="text-red-500 dark:text-red-400"
                  className="bg-white dark:bg-slate-800"
                />
                <HealthMetricCard
                  icon={<Activity className="h-7 w-7 text-green-500 dark:text-green-400" />}
                  metricLabel="Mood Level"
                  metricValue="Good" // Placeholder
                  metricValueClassName="text-green-500 dark:text-green-400"
                  className="bg-white dark:bg-slate-800"
                />
              </div>
            </section>

            {/* Upcoming Appointments Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-sky-700 dark:text-sky-300">Upcoming Appointments</h2>
                <Link to="/appointments">
                  <Button variant="link" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">
                    View All
                  </Button>
                </Link>
              </div>
              {sampleAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sampleAppointments.slice(0, 2).map(appt => ( // Show max 2 on dashboard
                    <AppointmentCard key={appt.id} {...appt} />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400">No upcoming appointments scheduled. Hooray!</p>
              )}
            </section>

            {/* Medication Reminders Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-sky-700 dark:text-sky-300">Today's Medication Reminders</h2>
                <Link to="/medications">
                  <Button variant="link" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">
                    View All
                  </Button>
                </Link>
              </div>
              {sampleMedications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sampleMedications.slice(0, 2).map(med => ( // Show max 2 on dashboard
                    <MedicationCard key={med.id} {...med} onLogIntake={(id) => console.log(`Logged intake for ${id} from Dashboard`)} />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400">No medications due today. Enjoy your day!</p>
              )}
            </section>

            {/* Quick Actions Section */}
            <section>
              <h2 className="text-2xl font-semibold text-sky-700 dark:text-sky-300 mb-4">Quick Actions</h2>
              <Card className="bg-white dark:bg-slate-800 shadow-lg">
                <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link to="/appointments/new" state={{ fromDashboard: true }}> {/* Assuming a route for new appointment */}
                    <Button className="w-full bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white">
                      <CalendarDays className="mr-2 h-5 w-5" /> Book Appointment
                    </Button>
                  </Link>
                  <Link to="/medications/new" state={{ fromDashboard: true }}> {/* Assuming a route for new medication */}
                    <Button className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:red-sky-700 text-white">
                      <Pill className="mr-2 h-5 w-5" /> Add Medication
                    </Button>
                  </Link>
                  <Link to="/user-profile">
                    <Button variant="outline" className="w-full border-sky-500 text-sky-600 hover:bg-sky-50 dark:border-sky-600 dark:text-sky-400 dark:hover:bg-sky-700 dark:hover:text-white">
                      <User className="mr-2 h-5 w-5" /> View Profile
                    </Button>
                  </Link>
                  {/* Example for future features */}
                   <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white" onClick={() => alert("Feature coming soon!")}>
                      <ListChecks className="mr-2 h-5 w-5" /> Log Symptoms
                    </Button>
                     <Button variant="outline" className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-700 dark:hover:text-white" onClick={() => alert("Feature coming soon!")}>
                      <Smile className="mr-2 h-5 w-5" /> Track Mood
                    </Button>
                </CardContent>
              </Card>
            </section>

          </main>
        </ScrollArea>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;