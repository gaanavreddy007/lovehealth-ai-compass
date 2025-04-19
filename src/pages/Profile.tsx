import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/contexts/AuthContext";
import LanguageSelector from "@/components/auth/LanguageSelector";
import { User, Settings, LogOut } from "lucide-react";

const Profile = () => {
  const { user, isLoggedIn, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Update form when user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
    navigate("/");
  };

  const handleSaveProfile = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    updateUser({ name });
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
      duration: 3000,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  if (!isLoggedIn || !user) {
    return null; // Will redirect via useEffect
  }

  return (
    <AppLayout>
      <div className="ayu-container py-12">
        <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Your Profile</h1>
        <p className="text-muted-foreground mb-8">
          Manage your account settings and preferences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-ayurveda-sage/50">
                    <AvatarFallback className="bg-ayurveda-cream text-ayurveda-deepblue text-lg">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={email}
                      disabled
                      placeholder="Your email"
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed in this demo</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Language</h3>
                      <p>{user.language === "en" ? "English" : user.language === "te" ? "Telugu" : "Kannada"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Account Type</h3>
                      <p>Standard</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 border-t pt-4">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </>
              ) : (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </CardTitle>
              <CardDescription>
                Manage your app preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Language Preference</Label>
                <div className="mt-1">
                  <LanguageSelector
                    currentLanguage={user.language}
                    onLanguageChange={(lang) => updateUser({ language: lang })}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    This will change the language for AI responses and UI elements
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Account Status</Label>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Active</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Member Since</Label>
                <p className="text-sm">{new Date().toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
