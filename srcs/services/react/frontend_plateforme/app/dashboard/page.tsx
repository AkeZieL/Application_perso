import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddEtablishmentCard from "./component/AddEtablishmentCard"

export default function DashboardPage() {

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="establishment">Gestion établissement</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="space-y-6">  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Nombre de vue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Value</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nombre de click</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Value</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nombre de commentaire</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">value</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ESTABLISHMENT */}
        <TabsContent value="establishment">
          <Card>
            <CardHeader>
              <CardTitle>Informations établissement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom de l'établissement</Label>
                  <Input placeholder="Hotel du Soleil" />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder="contact@hotel.com" />
                </div>

                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input placeholder="+33 6 12 34 56 78" />
                </div>

                <div className="space-y-2">
                  <Label>Adresse</Label>
                  <Input placeholder="123 rue principale" />
                </div>
              </div>

              <Button className="mt-4">Enregistrer les modifications</Button>
            </CardContent>
          </Card>
          <AddEtablishmentCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
