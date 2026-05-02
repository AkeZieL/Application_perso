"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"


import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import api from "@/app/lib/api/axios"
import parsePoint from "@/app/lib/utils/parsePoint"
import getGeoPosWithAdresse from "@/app/lib/http/getGeoPosWithAdresse"

export default function AddEventCard() {
  const [establishments, setEstablishments] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [data, setData] = useState({
    title: "",
    etablissement: "",
    adresse: "",
    start_date: undefined as Date | undefined,
    end_date: undefined as Date | undefined,
    start_time: "",
    end_time: "",
    description: "",
  });

  // 🔹 Fetch établissements (ta requête GET ici)
  useEffect(() => {
    const fetchEstablishments = async () => {
        const res = await api.get("etablissement/");
        setEstablishments(res.data);
    }
        fetchEstablishments();
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        let latitude;
        let longitude;

        if (mode === "etablissement") {
            const selected_etablissement = establishments.find(
                (est) => String(est.id) === data.etablissement
            )
             if (!selected_etablissement) {
                console.log ("erreur lors de la selection de l'établissement");
                return ;
            }
            const pos = parsePoint(selected_etablissement?.location);
            console.log("pos = ", pos);
            latitude = pos.lat;
            longitude = pos.lng;
        }

        if (mode === "ailleurs") {
            try {
                const pos = await getGeoPosWithAdresse(data.adresse)
                latitude = pos.latitude;
                longitude = pos.longitude;
                console.log('POS = ', pos);
            } catch (error) {
                console.log('Error Get geo-position with adresse: ', error)
                return ;
            }
        }
        try {
            const data_to_send = {
                ...data,
                latitude,
                longitude,
            }
            const res = await api.post("event/", data_to_send);
            console.log("évènement créé :", res.data);
            // reset form
            setData({
                title: "",
                etablissement: "",
                adresse: "",
                start_date: undefined,
                end_date: undefined,
                start_time: "",
                end_time: "",
                description: "",
            });
            setOpen(false);

        } catch (error) {
            console.error("Erreur création établissement :", error);
        }
    }


  return (
    <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>
            Créer un établissement
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Créer un évènement</DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Formulaire de création d’un événement
                </DialogDescription>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                    {/* NOM */}
                    <Input
                        placeholder="Nom de l'évènement"
                        value={data.title || ""}
                        onChange={(e) =>
                            setData({ ...data, title: e.target.value })
                        }
                    />

                    {/* LIEU DE L'EVENEMENT*/}
                    <div className="space-y-2">
                        <Label>Lieu de l’événement</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <label
                                className={`cursor-pointer rounded-lg border p-3 transition-all
                                    ${mode === "etablissement"
                                    ? "border-black bg-black text-white"
                                    : "border-gray-200 text-gray-500 hover:border-gray-400"
                                    }`}
                                onClick={() => setMode("etablissement")}
                            >
                                <input
                                    type="radio"
                                    value="etablissement"
                                    checked={mode === "etablissement"}
                                    onChange={() => setMode("etablissement")}
                                    className="hidden"
                                />
                                <div className="font-medium">Établissement</div>
                            </label>

                            {/* OPTION 2 */}
                            <label
                                className={`cursor-pointer rounded-lg border p-3 transition-all
                                    ${mode === "ailleurs"
                                    ? "border-black bg-black text-white"
                                    : "border-gray-200 text-gray-500 hover:border-gray-400"
                                    }`}
                                onClick={() => setMode("ailleurs")}
                            >
                                <input
                                    type="radio"
                                    value="ailleurs"
                                    checked={mode === "ailleurs"}
                                    onChange={() => setMode("ailleurs")}
                                    className="hidden"
                                />

                                <div className="font-medium">Autre lieu</div>
                            </label>
                        </div>
                    </div>

                    {/* SELECT ETABLISSEMENT*/}
                    {mode === "etablissement" && (
                        <div className="space-y-2">
                            <Select
                                onValueChange={(value) =>
                                setData({ ...data, etablissement: value })
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choisir un établissement" />  
                                </SelectTrigger>
                                <SelectContent>
                                {establishments.map((est) => (
                                    <SelectItem key={String(est.id)} value={String(est.id)}>
                                        {est.name}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* SELECT AUTRE ENDROIT*/}
                    {mode === "ailleurs" && (
                        <Input
                            placeholder="Adresse de l'événement"
                            value={data.adresse}
                            onChange={(e) =>
                            setData({ ...data, adresse: e.target.value })
                            }
                        />
                    )}

                    {/* DATE DEBUT */}
                    <div className="flex items-end gap-2">
                        <div className="flex flex-col gap-2">
                            <Label>
                                Date de début
                            </Label>
                            {/* Calendar */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button type="button" variant="outline" className="justify-start">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {data.start_date ? 
                                    format(data.start_date, "PPP") :
                                    "Choisir une date"}
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single" //une seule date
                                    selected={data.start_date} 
                                    onSelect={(date) =>
                                        setData({ ...data, start_date: date })
                                    }
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        {/* Heure */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor='start_time' className='px-1'>
                                Commence à
                            </Label>
                           <Input
                                id="start_time"
                                type="time"
                                value={data.start_time || ""}
                                onChange={(e) =>
                                    setData({ ...data, start_time: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* DATE FIN */}
                    <div className="flex items-end gap-2">
                        <div className="flex flex-col gap-2">
                            <Label>Date de fin</Label>
                            {/* Calendar */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button  type="button" variant="outline" className="w-full justify-start">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.end_date ? 
                                        format(data.end_date, "PPP") : 
                                        "Choisir une date"
                                        }
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={data.end_date}
                                        onSelect={(date) =>
                                            setData({ ...data, end_date: date })
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        {/* Heure */}
                        <div className="flex flex-col gap-2">
                             <Label htmlFor='end_time' className='px-1'>
                                Termine à
                            </Label>
                            <Input
                                id="end_time"
                                type="time"
                                value={data.end_time || ""}
                                onChange={(e) =>
                                    setData({ ...data, end_time: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                            placeholder="Description (facultatif)"
                            value={data.description || ""}
                            onChange={(e) =>
                                setData({ ...data, description: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex justify-between">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setOpen(false)}
                            >
                            Annuler
                        </Button>
                        <Button type="submit">
                            Créer l’évènement
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}