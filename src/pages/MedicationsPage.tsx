import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

// Custom Components
import Header from '@/components/layout/Header';
import AppSidebar from '@/components/layout/AppSidebar';
import Footer from '@/components/layout/Footer';
import MedicationCard from '@/components/MedicationCard';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label'; // Label might be used with Checkbox if not using FormField for it.
import { ScrollArea } from '@/components/ui/scroll-area';

// Lucide Icons
import { PlusCircle, Edit2, Trash2, Pill } from 'lucide-react';

// Define the shape of a medication
interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string; // e.g., "Once daily", "Twice daily"
  times: string; // Store as comma-separated string e.g., "08:00,20:00"
  refillReminder: boolean;
  refillDate?: string; // Optional: YYYY-MM-DD
}

// Zod schema for form validation
const medicationFormSchema = z.object({
  name: z.string().min(2, { message: "Medication name must be at least 2 characters." }),
  dosage: z.string().min(1, { message: "Dosage is required." }),
  frequency: z.string().min(1, { message: "Frequency is required." }),
  times: z.string().regex(/^(\d{2}:\d{2}(,\s*\d{2}:\d{2})*)?$/, { message: "Enter times like HH:MM, separated by commas if multiple." }).optional(),
  refillReminder: z.boolean().default(false),
  refillDate: z.string().optional(),
});

type MedicationFormValues = z.infer<typeof medicationFormSchema>;

// Sample initial medications
const initialMedications: Medication[] = [
  { id: 'med1', name: 'Amoxicillin', dosage: '250mg', frequency: 'Twice daily', times: '08:00,20:00', refillReminder: true, refillDate: '2024-09-15' },
  { id: 'med2', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', times: '09:00', refillReminder: false },
  { id: 'med3', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', times: '07:00,19:00', refillReminder: true, refillDate: '2024-10-01' },
];

// Helper to generate simple unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

const MedicationsPage: React.FC = () => {
  console.log('MedicationsPage loaded');
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);

  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationFormSchema),
    defaultValues: {
      name: '',
      dosage: '',
      frequency: '',
      times: '',
      refillReminder: false,
      refillDate: '',
    },
  });

  const handleAddNewMedication = () => {
    setEditingMedication(null);
    form.reset({ // Reset form to default values for new medication
      name: '',
      dosage: '',
      frequency: '',
      times: '',
      refillReminder: false,
      refillDate: '',
    });
    setIsDialogOpen(true);
  };

  const handleEditMedication = (medication: Medication) => {
    setEditingMedication(medication);
    form.reset({
      name: medication.name,
      dosage: medication.dosage,
      frequency: medication.frequency,
      times: medication.times,
      refillReminder: medication.refillReminder,
      refillDate: medication.refillDate || '',
    });
    setIsDialogOpen(true);
  };

  const handleDeleteMedication = (id: string) => {
    // Basic confirmation, ideally use an Alert Dialog
    if (window.confirm('Are you sure you want to delete this medication?')) {
      setMedications(meds => meds.filter(med => med.id !== id));
      toast.success('Medication deleted successfully!');
    }
  };
  
  const onSubmit = (data: MedicationFormValues) => {
    if (editingMedication) {
      // Update existing medication
      setMedications(meds => 
        meds.map(med => med.id === editingMedication.id ? { ...med, ...data } : med)
      );
      toast.success('Medication updated successfully!');
    } else {
      // Add new medication
      const newMedication: Medication = { id: generateId(), ...data };
      setMedications(meds => [newMedication, ...meds]);
      toast.success('Medication added successfully!');
    }
    setIsDialogOpen(false);
    form.reset(); // Reset form after submission
  };

  const handleLogIntake = (id: string | number) => {
    const med = medications.find(m => m.id === id);
    toast.info(`Logged intake for ${med?.name || 'medication'}.`);
    // In a real app, you might update last taken time or similar.
  };


  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <div className="flex flex-1">
        <AppSidebar />
        <ScrollArea className="flex-1">
          <main className="p-6 container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-sky-700 dark:text-sky-300 flex items-center">
                <Pill className="mr-3 h-8 w-8" /> Manage Your Medications
              </h1>
              <Button onClick={handleAddNewMedication} className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Medication
              </Button>
            </div>

            {medications.length === 0 ? (
              <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                <Pill className="mx-auto h-12 w-12 mb-4 text-slate-400 dark:text-slate-500" />
                <p className="text-xl font-semibold">No medications yet.</p>
                <p>Click "Add New Medication" to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medications.map((med) => (
                  <div key={med.id} className="relative group">
                     <MedicationCard
                        id={med.id}
                        name={med.name}
                        dosage={med.dosage}
                        frequency={med.frequency}
                        // For 'nextDueTime', this is a simplified representation.
                        // A real app would calculate this based on 'times' and last intake.
                        nextDueTime={med.times?.split(',')[0] ? `Today at ${med.times.split(',')[0].trim()}` : "Scheduled"}
                        onLogIntake={() => handleLogIntake(med.id)}
                      />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <Button variant="outline" size="icon" className="bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700" onClick={() => handleEditMedication(med)}>
                        <Edit2 className="h-4 w-4 text-blue-500" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="outline" size="icon" className="bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700" onClick={() => handleDeleteMedication(med.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </ScrollArea>
      </div>
      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle className="text-2xl text-sky-700 dark:text-sky-300">
              {editingMedication ? 'Edit Medication' : 'Add New Medication'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details of your medication below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Amoxicillin" {...field} className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 250mg, 1 tablet" {...field} className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50">
                        <SelectItem value="Once daily">Once daily</SelectItem>
                        <SelectItem value="Twice daily">Twice daily</SelectItem>
                        <SelectItem value="Three times daily">Three times daily</SelectItem>
                        <SelectItem value="As needed">As needed</SelectItem>
                        <SelectItem value="Other">Other (specify)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="times"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time(s) of Day</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 08:00 or 09:00, 17:00" {...field} className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="refillReminder"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm dark:border-slate-700">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="dark:data-[state=checked]:bg-sky-500 dark:data-[state=checked]:text-slate-50"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Set Refill Reminder?
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              {form.watch('refillReminder') && (
                 <FormField
                  control={form.control}
                  name="refillDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Refill Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                   <Button type="button" variant="outline" className="dark:text-slate-50 dark:border-slate-700 dark:hover:bg-slate-700">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600">
                  {editingMedication ? 'Save Changes' : 'Add Medication'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicationsPage;