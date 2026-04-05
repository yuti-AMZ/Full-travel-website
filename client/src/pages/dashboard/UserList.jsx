import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Mail, UserX, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const navigate = useNavigate();

  // Mock data
  const users = [
    { id: 1, name: "Hayat", email: "hayat@alif.com", role: "Admin", status: "Active" },
    { id: 2, name: "Tinsae", email: "tinsae@alif.com", role: "Developer", status: "Active" },
    { id: 3, name: "Abebe", email: "abe@gmail.com", role: "User", status: "Pending" },
    { id: 4, name: "Sara", email: "sara@design.com", role: "Designer", status: "Inactive" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 gap-2 text-orange-500 hover:text-orange-600"
          onClick={() => navigate('/welcome')}
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </Button>

        <Card className="border-zinc-200 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-white border-b border-zinc-100">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-orange-500">Community Members</CardTitle>
                <CardDescription className="text-zinc-500">
                  Manage and view all registered innovators in your network.
                </CardDescription>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Add New User
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-zinc-50/50">
                <TableRow>
                  <TableHead className="w-50">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-zinc-50/80 transition-colors">
                    <TableCell className="font-semibold text-orange-500">{user.name}</TableCell>
                    <TableCell className="text-zinc-500">{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.role === 'Admin' ? <MoreHorizontal size={14} className="text-orange-500" /> : null}
                        {user.role}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'Active' ? 'success' : 'secondary'}
                        className={user.status === 'Active' ? 'bg-orange-100 text-orange-700 hover:bg-orange-100' : ''}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Email User">
                          <Mail size={16} className="text-orange-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50" 
                          title="Delete User"
                        >
                          <UserX size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserList;