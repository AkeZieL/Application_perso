"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import AddEtablishmentCard from "../AddEtablishmentCard"

import api from "@/app/lib/api/axios";

export default function DashboardLayout() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tab = searchParams.get("tab") || "overview";
    const [establishments, setEstablishments] = useState([]);

    const handleTabChange = (value: string) => {
        router.push(`/dashboard?tab=${value}`);
    };

    useEffect(() => {
         const fetchData = async () => {
            try {
                const res = await api.get("etablissement/");
                setEstablishments(res.data);
                console.log("RES = ", res);
            }   catch (error) {
                console.error(error);
            }
         };
         fetchData();
    }, []);

    return (
        <div>
            <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
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
                    {establishments.length > 0 ? (
                        <>
                            {establishments.map((etab) => (
                                <Card key={etab.id} className="mb-4">
                                    <CardHeader>
                                        <CardTitle>{etab.name}</CardTitle>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Nom de l'établissement</Label>
                                                <Input placeholder={etab.name}/>

                                            </div>

                                            <div className="space-y-2">
                                                <Label>Adresse</Label>
                                                <Input placeholder={etab.address} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Email</Label>
                                                <Input placeholder={etab.email} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Téléphone</Label>
                                                <Input placeholder={etab.phone} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Site web</Label>
                                                <Input placeholder={etab.website} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Catégorie</Label>
                                                <Input placeholder={etab.category} />
                                            </div>
                                            <div className="space-y-2 col-span-1 md:col-span-2">
                                                <Label>Description</Label>
                                                <Input placeholder={etab.description} />
                                            </div>
                                        </div>
                                        <Button className="mt-4">Enregistrer les modifications</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    ) : (
                        <Card>
                            <CardContent className="py-10 text-center">
                                <p className="text-muted-foreground">
                                    Aucun établissement enregistré
                                </p>
                            </CardContent>
                        </Card>
                    )}
                    <AddEtablishmentCard />
                </TabsContent>
            </Tabs>
        </div>
    );
}