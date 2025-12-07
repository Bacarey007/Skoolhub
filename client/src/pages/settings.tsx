import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Bell, Lock, User, Building, Palette, Save } from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your school profile and system preferences.</p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Settings Sidebar Navigation */}
              <aside className="w-full md:w-64 shrink-0">
                <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 space-y-1">
                  <TabsTrigger 
                    value="general" 
                    className="w-full justify-start px-4 py-2 h-10 data-[state=active]:bg-secondary data-[state=active]:text-foreground"
                  >
                    <Building className="w-4 h-4 mr-2" /> General
                  </TabsTrigger>
                  <TabsTrigger 
                    value="account" 
                    className="w-full justify-start px-4 py-2 h-10 data-[state=active]:bg-secondary data-[state=active]:text-foreground"
                  >
                    <User className="w-4 h-4 mr-2" /> Account
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="w-full justify-start px-4 py-2 h-10 data-[state=active]:bg-secondary data-[state=active]:text-foreground"
                  >
                    <Bell className="w-4 h-4 mr-2" /> Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="appearance" 
                    className="w-full justify-start px-4 py-2 h-10 data-[state=active]:bg-secondary data-[state=active]:text-foreground"
                  >
                    <Palette className="w-4 h-4 mr-2" /> Appearance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="w-full justify-start px-4 py-2 h-10 data-[state=active]:bg-secondary data-[state=active]:text-foreground"
                  >
                    <Lock className="w-4 h-4 mr-2" /> Security
                  </TabsTrigger>
                </TabsList>
              </aside>

              {/* Content Area */}
              <div className="flex-1 space-y-6">
                
                {/* General Settings */}
                <TabsContent value="general" className="space-y-6 mt-0 animate-in fade-in-50">
                  <Card>
                    <CardHeader>
                      <CardTitle>School Profile</CardTitle>
                      <CardDescription>Update your school's public information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="school-name">School Name</Label>
                        <Input id="school-name" defaultValue="Springfield High School" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="742 Evergreen Terrace, Springfield" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Contact Email</Label>
                          <Input id="email" type="email" defaultValue="admin@springfield.edu" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="+1 (555) 123-4567" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Academic Configuration</CardTitle>
                      <CardDescription>Set current term and grading standards.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Current Academic Year</Label>
                          <Input defaultValue="2024-2025" />
                        </div>
                        <div className="space-y-2">
                          <Label>Current Term</Label>
                          <Input defaultValue="Fall Semester" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Account Settings */}
                <TabsContent value="account" className="space-y-6 mt-0 animate-in fade-in-50">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile</CardTitle>
                      <CardDescription>Manage your personal administrator account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="bg-primary/10 text-primary text-xl">AD</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm">Change Avatar</Button>
                          <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>First Name</Label>
                            <Input defaultValue="Admin" />
                          </div>
                          <div className="space-y-2">
                            <Label>Last Name</Label>
                            <Input defaultValue="User" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Input defaultValue="Super Administrator" disabled className="bg-muted" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button onClick={handleSave}>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-6 mt-0 animate-in fade-in-50">
                  <Card>
                    <CardHeader>
                      <CardTitle>Email Notifications</CardTitle>
                      <CardDescription>Choose what you want to be notified about.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="new-student" className="flex flex-col space-y-1">
                          <span>New Student Registration</span>
                          <span className="font-normal text-xs text-muted-foreground">Receive emails when a new student is enrolled.</span>
                        </Label>
                        <Switch id="new-student" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="event-creation" className="flex flex-col space-y-1">
                          <span>Event Creation</span>
                          <span className="font-normal text-xs text-muted-foreground">Get notified when staff members create new events.</span>
                        </Label>
                        <Switch id="event-creation" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="exam-results" className="flex flex-col space-y-1">
                          <span>Exam Results Published</span>
                          <span className="font-normal text-xs text-muted-foreground">Alert when results are finalized.</span>
                        </Label>
                        <Switch id="exam-results" />
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button onClick={handleSave}>Save Preferences</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                 {/* Appearance */}
                 <TabsContent value="appearance" className="space-y-6 mt-0 animate-in fade-in-50">
                  <Card>
                    <CardHeader>
                      <CardTitle>Theme Preferences</CardTitle>
                      <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Interface Theme</Label>
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div className="cursor-pointer space-y-2">
                            <div className="items-center rounded-md border-2 border-primary bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                              <div className="space-y-2 rounded-sm bg-slate-100 p-2">
                                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-slate-200" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-200" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full text-center text-sm font-medium">Light</span>
                          </div>
                          <div className="cursor-pointer space-y-2">
                            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full text-center text-sm font-medium">Dark</span>
                          </div>
                          <div className="cursor-pointer space-y-2">
                            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                              <div className="space-y-2 rounded-sm bg-slate-100 p-2">
                                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-200" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full text-center text-sm font-medium">System</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security */}
                <TabsContent value="security" className="space-y-6 mt-0 animate-in fade-in-50">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>Change your password to keep your account secure.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current">Current Password</Label>
                        <Input id="current" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input id="new" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm">Confirm Password</Label>
                        <Input id="confirm" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button onClick={handleSave}>Update Password</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

              </div>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
