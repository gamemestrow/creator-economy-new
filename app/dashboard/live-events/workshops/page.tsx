"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Hammer,
    Calendar,
    Users,
    Plus,
    Clock,
    TrendingUp,
    Award,
    BookOpen,
} from "lucide-react";
import { useState } from "react";
import { useRequireRole } from "@/lib/use-auth-redirect";
import { useCreatorEvent } from "@/lib/hooks/use-creator-data";
import { createAnEvent } from "@/lib/firestore/events";
import CreateEventForm from "@/components/creator/CreateEventForm";
import { useAuth } from "@/contexts/AuthContext";

const workshops = [
    {
        id: 1,
        title: "Instagram Growth Workshop",
        date: "18 Jun 2026",
        participants: 850,
        duration: "3 Hours",
        status: "Upcoming",
    },
    {
        id: 2,
        title: "Content Creation Bootcamp",
        date: "25 Jun 2026",
        participants: 620,
        duration: "4 Hours",
        status: "Registration Open",
    },
    {
        id: 3,
        title: "Creator Monetization Workshop",
        date: "05 Jun 2026",
        participants: 430,
        duration: "2 Hours",
        status: "Completed",
    },
];

export default function WorkshopsPage() {
    const [isModelOpen, setisModelOpen] = useState(false);

    const {
        loading: authLoading,
        user,
        authorized,
    } = useRequireRole(["creator"]);

    const {
        events,
        loadingEvent,
        error,
        refresh: fetchEvent,
    } = useCreatorEvent(user?.uid || "", "workshops");


    
    const { userData, loading:userLoading } = useAuth();

    // --- guard before rendering the form ---
    if (authLoading) {
        return <div>Loading...</div>;
    }

    if (!user || !authorized) {
        return <div>You must be signed in to create an event.</div>;
    }

    const onSubmit = (data: any) => {
        createAnEvent(data);
        fetchEvent();
        setisModelOpen(false);
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Workshops</h1>
                    <p className="text-muted-foreground">
                        Create and manage hands-on workshops for your community
                    </p>
                </div>

                <Button onClick={() => setisModelOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Workshop
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Workshops</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{events.length}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Participants</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{events.reduce((sum, e)=> sum + e.currentAttendees,0).toLocaleString()}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Completion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-600">87%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">₹6.4L</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Workshop Schedule</CardTitle>
                </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {events.map((workshop) => (
              <div
                key={workshop.eventId}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Hammer className="h-8 w-8 text-primary" />

                                    <div>
                                        <h3 className="font-semibold">
                                            {workshop.title}
                                        </h3>

                                        <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {workshop.date.toDate().toLocaleString()}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                {workshop.currentAttendees}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {workshop.duration}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Button variant="outline">
                                    {workshop.isPublished ? "Registration open" : "Upcomming"}
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Workshop Analytics</CardTitle>
                    </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span>9,840 total participants</span>
            </div>

                        <div className="flex items-center gap-3">
                            <Award className="h-5 w-5 text-green-500" />
                            <span>87% completion rate</span>
                        </div>

            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>29% growth this month</span>
            </div>

                        <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-orange-500" />
                            <span>4,500 certificates issued</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Workshop</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="rounded-lg border p-4">
                            <h3 className="font-semibold">
                                Instagram Growth Workshop
                            </h3>

                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Registrations</span>
                                    <span>1,450</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Attendance</span>
                                    <span>1,220</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Completion</span>
                                    <span>92%</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Revenue</span>
                                    <span>₹1.8L</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {isModelOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <CreateEventForm
                            creatorId={user?.uid}
                            creatorName={userData?.name}
                            eventType="workshops"
                            onSubmit={onSubmit}
                            onCancel={() => setisModelOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
