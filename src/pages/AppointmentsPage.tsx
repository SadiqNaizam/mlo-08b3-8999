import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { PlusCircle, List, CalendarDays as CalendarIconLucide, Edit, Trash2 } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import AppSidebar from '@/components/layout/AppSidebar';
import Footer from '@/components/layout/Footer';
import AppointmentCard from '@/components/AppointmentCard';

// Shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils"; // For calendar date picker
import { format } from "date-fns"; // For calendar date picker

// Define the Zod schema for appointment form validation
const appointmentFormSchema = z.object({
  doctorName: z.string().min(2, { message: "Doctor name must be at least 2 characters." }),
  clinicName: z.string().optional(),
  appointmentDate: z.date({ required_error: "Appointment date is required." }),
  appointmentTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format (HH:MM e.g., 14:30)." }),
  appointmentType: z.string().min(3, { message: "Appointment type must be at least 3 characters." }),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

// Interface for appointment data (extending for internal use)
interface AppointmentData extends AppointmentFormValues {
  id: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

const initialAppointments: AppointmentData[] = [
  {
    id: '1',
    doctorName: 'Dr. Emily Carter',
    clinicName: 'City General Hospital',
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    appointmentTime: '10:30',
    appointmentType: 'Annual Check-up',
    status: 'Upcoming',
  },
  {
    id: '2',
    doctorName: 'Dr. John Smith',
    clinicName: 'Dental Care Clinic',
    appointmentDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    appointmentTime: '14:00',
    appointmentType: 'Dental Cleaning',
    status: 'Completed',
  },
  {
    id: '3',
    doctorName: 'Dr. Anya Sharma',
    clinicName: 'Vision First Eye Center',
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 12)),
    appointmentTime: '09:00',
    appointmentType: 'Eye Examination',
    status: 'Upcoming',
  },
];

const AppointmentsPage = () => {
  console.log('AppointmentsPage loaded');
  const [appointments, setAppointments] = useState<AppointmentData[]>(initialAppointments);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<Date | undefined>(new Date());

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      doctorName: "",
      clinicName: "",
      appointmentTime: "",
      appointmentType: "",
    },
  });

  useEffect(() => {
    // Reset form when dialog closes
    if (!isAddDialogOpen) {
      form.reset({
        doctorName: "",
        clinicName: "",
        appointmentDate: undefined, // Reset date
        appointmentTime: "",
        appointmentType: "",
      });
    }
  }, [isAddDialogOpen, form]);


  function onSubmit(data: AppointmentFormValues) {
    const newAppointment: AppointmentData = {
      ...data,
      id: Date.now().toString(), // Simple unique ID
      status: 'Upcoming',
    };
    setAppointments(prev => [newAppointment, ...prev]);
    toast.success("Appointment Added!", {
      description: `Your appointment for ${data.appointmentType} with ${data.doctorName} has been scheduled.`,
    });
    setIsAddDialogOpen(false);
  }

  const handleDeleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
    toast.info("Appointment Cancelled", { description: "The appointment has been removed from your list." });
  }

  const appointmentsForSelectedDate = appointments.filter(app =>
    calendarSelectedDate &&
    app.appointmentDate.toDateString() === calendarSelectedDate.toDateString() &&
    app.status === 'Upcoming'
  ).sort((a,b) => new Date(a.appointmentDate).setHours(Number(a.appointmentTime.split(':')[0]), Number(a.appointmentTime.split(':')[1])) - new Date(b.appointmentDate).setHours(Number(b.appointmentTime.split(':')[0]), Number(b.appointmentTime.split(':')[1])));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <ScrollArea className="flex-1 p-6">
          <main className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-sky-700 dark:text-sky-300">My Appointments</h1>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white dark:bg-sky-500 dark:hover:bg-sky-600">
                    <PlusCircle className="mr-2 h-5 w-5" /> Add Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px] bg-white dark:bg-slate-800">
                  <DialogHeader>
                    <DialogTitle className="text-sky-700 dark:text-sky-300">Add New Appointment</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to schedule a new medical appointment.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
                      <FormField
                        control={form.control}
                        name="appointmentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Appointment Type</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., General Check-up, Dental Visit" {...field} className="dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="doctorName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Doctor's Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Dr. Jane Doe" {...field} className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="clinicName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Clinic/Hospital Name (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="City Health Clinic" {...field} className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="appointmentDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIconLucide className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-800" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setDate(new Date().getDate() -1)) // Disable past dates
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="appointmentTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time (HH:MM)</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">Cancel</Button>
                        <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white dark:bg-sky-500 dark:hover:bg-sky-600">Save Appointment</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:w-1/3 mb-4 bg-sky-100 dark:bg-slate-700">
                <TabsTrigger value="list" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white dark:data-[state=active]:bg-sky-500"><List className="mr-2 h-4 w-4" />List View</TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white dark:data-[state=active]:bg-sky-500"><CalendarIconLucide className="mr-2 h-4 w-4" />Calendar View</TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                {appointments.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                    <CalendarIconLucide className="mx-auto h-12 w-12 mb-4" />
                    <p className="text-lg">No appointments scheduled yet.</p>
                    <p>Click "Add Appointment" to get started.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appointments.sort((a,b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()).map((app) => (
                       <div key={app.id} className="relative group">
                        <AppointmentCard
                          id={app.id}
                          doctorName={app.doctorName}
                          clinicName={app.clinicName}
                          appointmentDate={app.appointmentDate}
                          appointmentTime={`${app.appointmentTime.split(':')[0]}:${app.appointmentTime.split(':')[1]} ${parseInt(app.appointmentTime.split(':')[0]) >= 12 ? 'PM' : 'AM'}`} // Basic AM/PM
                          appointmentType={app.appointmentType}
                          status={app.status}
                        />
                         <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-600" onClick={() => console.log("Edit appointment", app.id)} title="Edit (placeholder)">
                                <Edit className="h-4 w-4 text-sky-600" />
                            </Button>
                            <Button variant="destructive" size="icon" className="h-8 w-8 bg-red-500/80 hover:bg-red-500" onClick={() => handleDeleteAppointment(app.id)} title="Cancel Appointment">
                                <Trash2 className="h-4 w-4 text-white" />
                            </Button>
                        </div>
                       </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="calendar">
                <div className="md:grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                        <Calendar
                            mode="single"
                            selected={calendarSelectedDate}
                            onSelect={setCalendarSelectedDate}
                            className="rounded-md border-none w-full [&>div]:w-full [&_table]:w-full"
                            classNames={{
                                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-sky-100 dark:[&:has([aria-selected])]:bg-sky-700 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-sky-50 dark:hover:bg-sky-800 data-[selected=true]:bg-sky-600 data-[selected=true]:text-white dark:data-[selected=true]:bg-sky-500",
                                day_selected: "bg-sky-600 text-primary-foreground hover:bg-sky-600 hover:text-primary-foreground focus:bg-sky-600 focus:text-primary-foreground dark:bg-sky-500 dark:text-white",
                                head_cell: "text-muted-foreground rounded-md w-10 font-normal text-[0.8rem]",
                                nav_button: cn(
                                    buttonVariants({ variant: "outline" }),
                                    "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 dark:border-slate-600"
                                  ),
                                nav_button_previous: "absolute left-1",
                                nav_button_next: "absolute right-1",
                            }}
                         />
                    </div>
                    <div className="md:col-span-1 mt-6 md:mt-0">
                        <h3 className="text-lg font-semibold mb-3 text-sky-700 dark:text-sky-300">
                            Appointments on {calendarSelectedDate ? format(calendarSelectedDate, "PPP") : 'selected date'}
                        </h3>
                        {appointmentsForSelectedDate.length > 0 ? (
                            <ScrollArea className="h-[300px] space-y-3 pr-3">
                                {appointmentsForSelectedDate.map(app => (
                                     <div key={app.id} className="relative group">
                                    <AppointmentCard
                                        id={app.id}
                                        doctorName={app.doctorName}
                                        clinicName={app.clinicName}
                                        appointmentDate={app.appointmentDate}
                                        appointmentTime={`${app.appointmentTime.split(':')[0]}:${app.appointmentTime.split(':')[1]} ${parseInt(app.appointmentTime.split(':')[0]) >= 12 ? 'PM' : 'AM'}`}
                                        appointmentType={app.appointmentType}
                                        status={app.status}
                                    />
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                        <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-600" onClick={() => console.log("Edit appointment", app.id)} title="Edit (placeholder)">
                                            <Edit className="h-4 w-4 text-sky-600" />
                                        </Button>
                                        <Button variant="destructive" size="icon" className="h-8 w-8 bg-red-500/80 hover:bg-red-500" onClick={() => handleDeleteAppointment(app.id)} title="Cancel Appointment">
                                            <Trash2 className="h-4 w-4 text-white" />
                                        </Button>
                                    </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        ) : (
                            <p className="text-slate-500 dark:text-slate-400">No upcoming appointments for this day.</p>
                        )}
                    </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </ScrollArea>
      </div>
      <Footer />
    </div>
  );
};

// Helper for Shadcn calendar button variants if needed, but it's usually imported.
// Assuming buttonVariants is part of the project setup if cn() and specific variant classes are used this way.
// For simplicity, let's use the standard Button component attributes if buttonVariants is not readily available.
// Re-checking calendar classNames. They look fine. It seems `buttonVariants` is implicitly used by shadcn/ui.
const buttonVariants = ({ variant = "default", size = "default" }: { variant?: string, size?: string }) => {
    // This is a simplified placeholder. In a real shadcn setup, this comes from utils or button component itself.
    // For this context, direct classNames in Calendar props are more robust.
    if (variant === "outline") return "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
    return "bg-primary text-primary-foreground hover:bg-primary/90";
};


export default AppointmentsPage;