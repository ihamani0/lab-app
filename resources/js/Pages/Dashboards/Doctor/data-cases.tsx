import { Case } from "@/Types"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, MoreHorizontal, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Badge } from "@/components/ui/badge";
import { getBadgeVariantForCases } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Props = {
    cases : Case[];
}

type CaseStatus = 'Active' | 'Completed' | 'On Hold' | 'Canceled';
// --- 2. Create a mapping for status badges for cleaner code ---
const STATUS_STYLES: Record<CaseStatus, string> = {
    'Active': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'On Hold': 'bg-yellow-100 text-yellow-800',
    'Canceled': 'bg-red-100 text-red-800',
};





export default function DataCaseDoctor({cases} : Props) {


    const [searchTerm, setSearchTerm] = useState('');
    const [caseToDelete, setCaseToDelete] = useState<Case | null>(null);


    // --- 4. Memoize filtered results for better performance ---
    const filteredCases = useMemo(()=>{

        if (!searchTerm) {
            return cases;
        }

        return cases.filter((caseItem) =>
            caseItem.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            caseItem.status.toLowerCase().includes(searchTerm.toLowerCase())
        );

    } , [cases, searchTerm]);


    const handleEditCase = (caseId: number) => {
        router.get(route("doctor.prosthesis-case.edit", caseId));
    };

    const handleDeleteCase = (caseId: string) => {
        if (!caseToDelete) return;

        router.delete(route("prosthesis-case.destroy", caseToDelete.id), {
        preserveScroll: true,
        onSuccess: () => setCaseToDelete(null),
        });
    };

    const handleDeleteConfirm = () => {
        if (caseToDelete) {
        handleDeleteCase(caseToDelete.id);
        }
    };

  return (
        <>


            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Doctor Cases</CardTitle>
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by patient or diagnosis..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>

                    {
                    filteredCases.length > 0  ? (
                    filteredCases.map((caseItem) => (
                        <TableRow key={caseItem.id}>
                            <TableCell className="font-medium">{caseItem.patient.name}</TableCell>
                            <TableCell>{caseItem.description}</TableCell>
                            <TableCell>
                                <Badge variant={getBadgeVariantForCases(caseItem.status)} >
                                    {caseItem.status || "-"}
                                </Badge>
                            </TableCell>
                                        {/* --- 8. Format dates for readability --- */}
                                <TableCell>{caseItem.received_date}</TableCell>
                                <TableCell>{caseItem.updated_at}</TableCell>

                                <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEditCase(caseItem.id)}>
                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-600 focus:text-red-600"
                                            onClick={() => setCaseToDelete(caseItem)} // Opens the confirmation dialog
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                </TableCell>
                                </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No cases found.
                                    </TableCell>
                            </TableRow>
                        )
                    }


                  </TableBody>
                </Table>
              </CardContent>
            </Card>


             {/* --- 9. Add a confirmation dialog for deleting --- */}
            <AlertDialog open={!!caseToDelete} onOpenChange={() => setCaseToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the case for <span className="font-semibold">{caseToDelete?.patient.name}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


        </>

  )
}
