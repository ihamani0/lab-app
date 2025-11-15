
// src/components/DoctorDashboard.tsx
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
  Plus,
  FileText,
  Upload,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Calendar,
  DollarSign
} from 'lucide-react';
import Navbar from './Navbar';
import CasesTabe from './cases-tabs';
import { usePage } from '@inertiajs/react';
import { Auth, Doctor, PageProps } from '@/Types';

// Types
type Case = {
  id: string;
  patientName: string;
  diagnosis: string;
  status: 'Active' | 'Completed' | 'Pending';
  createdAt: string;
  updatedAt: string;
};

type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
};

type Invoice = {
  id: string;
  patientName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
  createdAt: string;
};

type FileUpload = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
};

// Mock data
const mockCases: Case[] = [
  { id: '1', patientName: 'John Doe', diagnosis: 'Hypertension', status: 'Active', createdAt: '2025-11-01', updatedAt: '2025-11-10' },
  { id: '2', patientName: 'Jane Smith', diagnosis: 'Diabetes', status: 'Completed', createdAt: '2025-10-15', updatedAt: '2025-11-05' },
  { id: '3', patientName: 'Robert Johnson', diagnosis: 'Migraine', status: 'Pending', createdAt: '2025-11-10', updatedAt: '2025-11-12' },
];

const mockPatients: Patient[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', dateOfBirth: '1985-05-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', dateOfBirth: '1990-08-22' },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com', phone: '+1234567892', dateOfBirth: '1978-12-03' },
];

const mockInvoices: Invoice[] = [
  { id: '1', patientName: 'John Doe', amount: 150.00, status: 'Paid', dueDate: '2025-11-20', createdAt: '2025-11-01' },
  { id: '2', patientName: 'Jane Smith', amount: 200.00, status: 'Pending', dueDate: '2025-11-25', createdAt: '2025-11-05' },
  { id: '3', patientName: 'Robert Johnson', amount: 75.00, status: 'Overdue', dueDate: '2025-11-08', createdAt: '2025-10-28' },
];

const mockFiles: FileUpload[] = [
  { id: '1', name: 'Lab Results.pdf', type: 'PDF', size: '2.4 MB', uploadedAt: '2025-11-10' },
  { id: '2', name: 'X-Ray Report.jpg', type: 'Image', size: '1.8 MB', uploadedAt: '2025-11-08' },
  { id: '3', name: 'Treatment Plan.docx', type: 'Document', size: '0.5 MB', uploadedAt: '2025-11-05' },
];

const DoctorDashboard = ({doctor} : { doctor : Doctor}) => {





  // State management
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [files, setFiles] = useState<FileUpload[]>(mockFiles);
  const [searchTerm, setSearchTerm] = useState('');






  return (

    <div className="min-h-screen p-4 md:p-8 space-y-5">

      <Navbar />

      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
          <p className="text-foreground mt-2">Manage your patients, cases, and invoices</p>
        </header>



        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20</div>
              <p className="text-xs text-muted-foreground mt-1">
                10 active cases
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100</div>
              <p className="text-xs text-muted-foreground mt-1">
                New this month: 5
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $200
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                1 pending
              </p>
            </CardContent>
          </Card>
        </div>



        {/* Tabs */}
        <Tabs defaultValue="cases" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-4">
            <CasesTabe  patients={doctor.patients ?? []} doctor={doctor}/>
          </TabsContent>



          {/* Invoices Tab */}

        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;



// {/* Patients Tab */}
//           <TabsContent value="patients" className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Patients</h2>
//               <Dialog open={isPatientModalOpen} onOpenChange={setIsPatientModalOpen}>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <UserPlus className="mr-2 h-4 w-4" /> New Patient
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-md">
//                   <DialogHeader>
//                     <DialogTitle>{editingPatient ? 'Edit Patient' : 'Create New Patient'}</DialogTitle>
//                     <DialogDescription>
//                       {editingPatient
//                         ? 'Update the patient information'
//                         : 'Add a new patient'}
//                     </DialogDescription>
//                   </DialogHeader>
//                   <div className="space-y-4 py-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Full Name</Label>
//                       <Input
//                         id="name"
//                         value={editingPatient ? editingPatient.name : newPatient.name}
//                         onChange={(e) =>
//                           editingPatient
//                             ? setEditingPatient({...editingPatient, name: e.target.value})
//                             : setNewPatient({...newPatient, name: e.target.value})
//                         }
//                         placeholder="Full name"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         value={editingPatient ? editingPatient.email : newPatient.email}
//                         onChange={(e) =>
//                           editingPatient
//                             ? setEditingPatient({...editingPatient, email: e.target.value})
//                             : setNewPatient({...newPatient, email: e.target.value})
//                         }
//                         placeholder="Email address"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="phone">Phone</Label>
//                       <Input
//                         id="phone"
//                         value={editingPatient ? editingPatient.phone : newPatient.phone}
//                         onChange={(e) =>
//                           editingPatient
//                             ? setEditingPatient({...editingPatient, phone: e.target.value})
//                             : setNewPatient({...newPatient, phone: e.target.value})
//                         }
//                         placeholder="Phone number"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="dateOfBirth">Date of Birth</Label>
//                       <Input
//                         id="dateOfBirth"
//                         type="date"
//                         value={editingPatient ? editingPatient.dateOfBirth : newPatient.dateOfBirth}
//                         onChange={(e) =>
//                           editingPatient
//                             ? setEditingPatient({...editingPatient, dateOfBirth: e.target.value})
//                             : setNewPatient({...newPatient, dateOfBirth: e.target.value})
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="flex justify-end gap-2">
//                     <Button
//                       variant="outline"
//                       onClick={() => {
//                         setIsPatientModalOpen(false);
//                         setEditingPatient(null);
//                       }}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       onClick={editingPatient ? handleUpdatePatient : handleCreatePatient}
//                     >
//                       {editingPatient ? 'Update Patient' : 'Create Patient'}
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>

//             <Card>
//               <CardContent className="p-0">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Email</TableHead>
//                       <TableHead>Phone</TableHead>
//                       <TableHead>Date of Birth</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredPatients.map((patient) => (
//                       <TableRow key={patient.id}>
//                         <TableCell className="font-medium">{patient.name}</TableCell>
//                         <TableCell>{patient.email}</TableCell>
//                         <TableCell>{patient.phone}</TableCell>
//                         <TableCell>{patient.dateOfBirth}</TableCell>
//                         <TableCell className="text-right">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" className="h-8 w-8 p-0">
//                                 <MoreHorizontal className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem
//                                 onClick={() => setEditingPatient(patient)}
//                               >
//                                 <Edit className="mr-2 h-4 w-4" /> Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleDeletePatient(patient.id)}
//                               >
//                                 <Trash2 className="mr-2 h-4 w-4" /> Delete
//                               </DropdownMenuItem>
//                               <DropdownMenuItem>
//                                 <Eye className="mr-2 h-4 w-4" /> View Profile
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </TabsContent>
//  <TabsContent value="invoices" className="space-y-4">
//             <h2 className="text-xl font-semibold">Invoices</h2>
//             <Card>
//               <CardContent className="p-0">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Patient</TableHead>
//                       <TableHead>Amount</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Due Date</TableHead>
//                       <TableHead>Created</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredInvoices.map((invoice) => (
//                       <TableRow key={invoice.id}>
//                         <TableCell className="font-medium">{invoice.patientName}</TableCell>
//                         <TableCell>${invoice.amount.toFixed(2)}</TableCell>
//                         <TableCell>
//                           <span className={`px-2 py-1 rounded-full text-xs ${
//                             invoice.status === 'Paid'
//                               ? 'bg-green-100 text-green-800'
//                               : invoice.status === 'Pending'
//                                 ? 'bg-yellow-100 text-yellow-800'
//                                 : 'bg-red-100 text-red-800'
//                           }`}>
//                             {invoice.status}
//                           </span>
//                         </TableCell>
//                         <TableCell>{invoice.dueDate}</TableCell>
//                         <TableCell>{invoice.createdAt}</TableCell>
//                         <TableCell className="text-right">
//                           <Button variant="outline" size="sm">
//                             <Eye className="mr-2 h-4 w-4" /> View
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Files Tab */}
//           <TabsContent value="files" className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">File Uploads</h2>
//               <div className="flex gap-2">
//                 <Input
//                   type="file"
//                   className="hidden"
//                   id="file-upload"
//                   onChange={handleFileUpload}
//                 />
//                 <label htmlFor="file-upload">
//                   <Button asChild>
//                     <span>
//                       <Upload className="mr-2 h-4 w-4" /> Upload File
//                     </span>
//                   </Button>
//                 </label>
//               </div>
//             </div>

//             <Card>
//               <CardContent className="p-0">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>File Name</TableHead>
//                       <TableHead>Type</TableHead>
//                       <TableHead>Size</TableHead>
//                       <TableHead>Uploaded</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {files.map((file) => (
//                       <TableRow key={file.id}>
//                         <TableCell className="font-medium">{file.name}</TableCell>
//                         <TableCell>
//                           <span className="px-2 py-1 bg-gray-100 rounded text-xs">
//                             {file.type}
//                           </span>
//                         </TableCell>
//                         <TableCell>{file.size}</TableCell>
//                         <TableCell>{file.uploadedAt}</TableCell>
//                         <TableCell className="text-right">
//                           <Button variant="outline" size="sm">
//                             <Eye className="mr-2 h-4 w-4" /> View
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </TabsContent>
