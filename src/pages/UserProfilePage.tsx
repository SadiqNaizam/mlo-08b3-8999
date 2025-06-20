import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner'; // For notifications

// Custom Layout Components
import Header from '@/components/layout/Header';
import AppSidebar from '@/components/layout/AppSidebar';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Used implicitly by FormLabel
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Lucide Icons
import { User, Mail, Phone, CalendarDays, KeyRound, Edit3, Save, ShieldAlert, HeartPulse, Users, Pencil } from 'lucide-react';

// Zod Schemas for Form Validation
const personalInfoSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(), // Could be date type if using a date picker
});

const medicalInfoSchema = z.object({
  allergies: z.string().optional(),
  chronicConditions: z.string().optional(),
  bloodType: z.string().optional(),
});

const accountSettingsSchema = z.object({
  currentPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters." }),
  confirmNewPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters." }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New passwords don't match.",
  path: ["confirmNewPassword"], // Point error to confirmNewPassword field
});

// Sample Emergency Contact type
interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

const UserProfilePage: React.FC = () => {
  console.log('UserProfilePage loaded');

  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "Dora E. Mon",
      email: "doraemon@example.com",
      phone: "123-456-7890",
      dateOfBirth: "1970-01-01",
    },
  });

  const medicalInfoForm = useForm<z.infer<typeof medicalInfoSchema>>({
    resolver: zodResolver(medicalInfoSchema),
    defaultValues: {
      allergies: "Dorayaki (causes extreme happiness)",
      chronicConditions: "Fear of mice",
      bloodType: "O+",
    },
  });

  const accountSettingsForm = useForm<z.infer<typeof accountSettingsSchema>>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onPersonalInfoSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    console.log("Personal Info Submitted:", values);
    toast.success("Personal information updated successfully!");
  };

  const onMedicalInfoSubmit = (values: z.infer<typeof medicalInfoSchema>) => {
    console.log("Medical Info Submitted:", values);
    toast.success("Medical information updated successfully!");
  };

  const onAccountSettingsSubmit = (values: z.infer<typeof accountSettingsSchema>) => {
    console.log("Account Settings Submitted:", values);
    // Add actual password change logic here
    toast.success("Password changed successfully!");
    accountSettingsForm.reset();
  };
  
  const sampleEmergencyContacts: EmergencyContact[] = [
    { id: '1', name: 'Nobita Nobi', relationship: 'Best Friend', phone: '555-0101' },
    { id: '2', name: 'Shizuka Minamoto', relationship: 'Friend', phone: '555-0102' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 dark:bg-slate-900">
      <Header />
      <div className="flex flex-1 pt-16"> {/* pt-16 for sticky header */}
        <AppSidebar />
        <ScrollArea className="flex-1">
          <main className="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-sky-700 dark:text-sky-300">User Profile</h1>

            {/* Personal Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-sky-600 dark:text-sky-400">
                  <User className="mr-2 h-5 w-5" /> Personal Information
                </CardTitle>
                <CardDescription>View and update your personal details.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                  <Avatar className="w-24 h-24 ring-2 ring-sky-300 dark:ring-sky-600">
                    <AvatarImage src="https://avatar.iran.liara.run/public/boy?username=DoraemonUser" alt="User Avatar" />
                    <AvatarFallback>DE</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Pencil className="mr-2 h-4 w-4" /> Change Avatar
                  </Button>
                </div>
                <Form {...personalInfoForm}>
                  <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-6">
                    <FormField
                      control={personalInfoForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalInfoForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={personalInfoForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="123-456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth (Optional)</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600">
                      <Save className="mr-2 h-4 w-4" /> Save Personal Info
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Emergency Contacts Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-sky-600 dark:text-sky-400">
                  <ShieldAlert className="mr-2 h-5 w-5" /> Emergency Contacts
                </CardTitle>
                <CardDescription>Manage your emergency contact list.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sampleEmergencyContacts.map(contact => (
                  <div key={contact.id} className="p-3 border rounded-md bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{contact.name} <span className="text-sm text-muted-foreground">({contact.relationship})</span></p>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-sky-600">
                        <Pencil className="h-4 w-4"/>
                    </Button>
                  </div>
                ))}
                {sampleEmergencyContacts.length === 0 && <p className="text-sm text-muted-foreground">No emergency contacts added yet.</p>}
              </CardContent>
              <CardFooter>
                 <Button variant="outline" className="w-full sm:w-auto">
                  <Users className="mr-2 h-4 w-4" /> Add/Manage Contacts
                </Button>
              </CardFooter>
            </Card>

            {/* Medical Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-sky-600 dark:text-sky-400">
                  <HeartPulse className="mr-2 h-5 w-5" /> Medical Information
                </CardTitle>
                <CardDescription>Update your allergies, conditions, and blood type.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...medicalInfoForm}>
                  <form onSubmit={medicalInfoForm.handleSubmit(onMedicalInfoSubmit)} className="space-y-6">
                    <FormField
                      control={medicalInfoForm.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Allergies (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="List any known allergies" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={medicalInfoForm.control}
                      name="chronicConditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chronic Conditions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="List any chronic conditions" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={medicalInfoForm.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Type (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., A+, O-, AB+" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600">
                      <Save className="mr-2 h-4 w-4" /> Save Medical Info
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Account Settings Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-sky-600 dark:text-sky-400">
                  <KeyRound className="mr-2 h-5 w-5" /> Account Settings
                </CardTitle>
                <CardDescription>Change your password.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...accountSettingsForm}>
                  <form onSubmit={accountSettingsForm.handleSubmit(onAccountSettingsSubmit)} className="space-y-6">
                    <FormField
                      control={accountSettingsForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter current password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accountSettingsForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter new password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accountSettingsForm.control}
                      name="confirmNewPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm new password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" variant="destructive">
                      <KeyRound className="mr-2 h-4 w-4" /> Change Password
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </main>
        </ScrollArea>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;