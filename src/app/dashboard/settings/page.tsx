
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockUser as initialUser, mockFarm as initialFarm, mockMachines as initialMachines } from "@/lib/mock-data"
import { format } from "date-fns"
import type { User, Farm, Machine } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";

export default function SettingsPage() {
  const [user, setUser] = useState<User>(initialUser);
  const [farm, setFarm] = useState<Farm>(initialFarm);
  const [machines, setMachines] = useState<Machine[]>(initialMachines);

  const [newMachineModel, setNewMachineModel] = useState('');
  const [newMachineId, setNewMachineId] = useState('');

  const { toast } = useToast();

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  }

  const handleFarmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const key = id.replace('farm-', '');
    setFarm({ ...farm, [key]: value });
  }

  const handleSaveChanges = (type: 'User' | 'Farm') => {
    toast({
      title: `${type} Profile Updated`,
      description: `Your ${type.toLowerCase()} information has been saved.`,
    });
  }

  const handleRegisterMachine = () => {
    if (!newMachineId || !newMachineModel) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill out both Machine ID and Model.',
      });
      return;
    }
    const newMachine: Machine = {
      id: newMachineId,
      model: newMachineModel,
      farmId: 'FARM-01',
      registrationDate: new Date(),
    };
    setMachines([...machines, newMachine]);
    setNewMachineId('');
    setNewMachineModel('');
    toast({
      title: 'Machine Registered',
      description: `Machine ${newMachine.id} has been successfully registered.`,
    });
  }

  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold tracking-tight font-headline">Settings</h2>
            <p className="text-muted-foreground">Manage your account, farm, and machine settings.</p>
        </div>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="farm">Farm</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={user.name} onChange={handleUserChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user.email} onChange={handleUserChange} />
              </div>
              <Button onClick={() => handleSaveChanges('User')}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="farm" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Farm Profile</CardTitle>
              <CardDescription>Manage your farm's details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="farm-name">Farm Name</Label>
                <Input id="farm-name" value={farm.name} onChange={handleFarmChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farm-location">Location</Label>
                <Input id="farm-location" value={farm.location} onChange={handleFarmChange} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="farm-contact">Contact Email</Label>
                <Input id="farm-contact" type="email" value={farm.contact} onChange={handleFarmChange} />
              </div>
              <Button onClick={() => handleSaveChanges('Farm')}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="machines" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Machine Management</CardTitle>
                    <CardDescription>View and manage your KrishiGrade sorting machines.</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Register New Machine</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Register a New Machine</DialogTitle>
                      <DialogDescription>
                        Enter the details for the new machine to add it to your farm.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-machine-id" className="text-right">
                          Machine ID
                        </Label>
                        <Input id="new-machine-id" value={newMachineId} onChange={(e) => setNewMachineId(e.target.value)} className="col-span-3" placeholder="e.g., AG-003" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-machine-model" className="text-right">
                          Model
                        </Label>
                        <Input id="new-machine-model" value={newMachineModel} onChange={(e) => setNewMachineModel(e.target.value)} className="col-span-3" placeholder="e.g., KrishiGrade Sorter v3.0" />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" onClick={handleRegisterMachine}>Register Machine</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Machine ID</TableHead>
                            <TableHead>Model</TableHead>
                            <TableHead>Registration Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {machines.map((machine) => (
                            <TableRow key={machine.id}>
                                <TableCell className="font-medium">{machine.id}</TableCell>
                                <TableCell>{machine.model}</TableCell>
                                <TableCell>{format(machine.registrationDate, "PP")}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">Manage</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
