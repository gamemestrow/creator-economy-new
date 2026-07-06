"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Video,
    Calendar,
    Users,
    Plus,
    Clock,
    TrendingUp,
    PlayCircle,
    Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import CreateEventForm from "@/components/creator/CreateEventForm";
import { createAnEvent } from "@/lib/firestore/events";
import { useRequireRole } from "@/lib/use-auth-redirect";
import { useCreatorEvent } from "@/lib/hooks/use-creator-data";
import { useAuth } from "@/contexts/AuthContext";

const webinars = [
    {
        id: 1,
        title: "Creator Growth Blueprint",
        date: "15 Jun 2026",
        attendees: 1250,
        duration: "90 mins",
        status: "Upcoming",
    },
    {
        id: 2,
        title: "Instagram Monetization Masterclass",
        date: "20 Jun 2026",
        attendees: 840,
        duration: "60 mins",
        status: "Live",
    },
    {
        id: 3,
        title: "Community Building Secrets",
        date: "05 Jun 2026",
        attendees: 620,
        duration: "75 mins",
        status: "Completed",
    },
];

export default function WebinarsPage() {
    const [isModelOpen, setisModelOpen] = useState(false);

    const {
        loading: authLoading,
        user,
        authorized,
    } = useRequireRole(["creator"]);

    const { userData, loading:userLoading } = useAuth();
    const {
        events,
        loadingEvent,
        error,
        refresh: fetchEvent,
    } = useCreatorEvent(user?.uid || "");

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
                    <h1 className="text-3xl font-bold">Webinars</h1>
                    <p className="text-muted-foreground">
                        Manage live webinars, registrations and attendee
                        engagement
                    </p>
                </div>

                <Button onClick={() => setisModelOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Webinar
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Webinars</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{events.length}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Registrations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{events.reduce((sum, e) => sum + e.currentAttendees, 0).toLocaleString()}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-600">81%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">₹8.2L</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming & Recent Webinars</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {events.map((webinar) => (
                            <div
                                key={webinar.eventId}
                                className="flex items-center justify-between rounded-lg border p-4"
                            >
                                <div className="flex items-center gap-4">
                                    <Video className="h-8 w-8 text-primary" />

                                    <div>
                                        <h3 className="font-semibold">
                                            {webinar.title}
                                        </h3>

                                        <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {webinar.date
                                                    .toDate()
                                                    .toLocaleString()}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                {webinar.currentAttendees}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {webinar.duration}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Button variant="outline">
                                    {webinar.isPublished
                                        ? "Registration open"
                                        : "Upcomming"}
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Webinar Analytics</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-primary" />
                            <span>{events.reduce((sum, e) => sum + e.currentAttendees, 0).toLocaleString()} total registrations</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <PlayCircle className="h-5 w-5 text-green-500" />
                            <span>14,900 attendees joined live</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            <span>32% increase in registrations</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Download className="h-5 w-5 text-orange-500" />
                            <span>4,200 webinar recording downloads</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Webinar</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="rounded-lg border p-4">
                            <h3 className="font-semibold">
                                Creator Growth Blueprint
                            </h3>

                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Registrations</span>
                                    <span>2,450</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Attendance</span>
                                    <span>1,980</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Conversion Rate</span>
                                    <span>38%</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Revenue</span>
                                    <span>₹2.4L</span>
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
                            eventType="webinars"
                            onSubmit={onSubmit}
                            onCancel={() => setisModelOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
