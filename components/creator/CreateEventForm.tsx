// CreateEventForm.tsx
"use client";

import { useRef, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { ImagePlus, Loader2 } from "lucide-react";

export interface CreateEventInput {
  eventId: string; // Document ID
  title: string;
  description: string;
  creatorId: string; // Reference to creator
  creatorName?: string; // Denormalized
  thumbnail?: string;
  date: any; // Firestore Timestamp
  duration: number; // in minutes
  maxAttendees?: number;
  currentAttendees: number; // Denormalized count
  eventType: string;
  registrationDeadline?: any; // Firestore Timestamp
  isPublished: boolean;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

const EVENT_TYPES: CreateEventInput["eventType"][] = ["live", "webinar", "workshop"];

interface CreateEventFormProps {
  creatorId: string;
  creatorName?: string;
  onSubmit: (event: CreateEventInput) => void | Promise<void>;
  onCancel?: () => void;
  eventType: string;
}

interface FormState {
  title: string;
  description: string;
  thumbnail: string;
  date: string; // datetime-local string
  duration: string;
  maxAttendees: string;
  eventType: CreateEventInput["eventType"];
  registrationDeadline: string; // datetime-local string
  isPublished: boolean;
}

const initialState: FormState = {
  title: "",
  description: "",
  thumbnail: "",
  date: "",
  duration: "60",
  maxAttendees: "",
  eventType: "webinars",
  registrationDeadline: "",
  isPublished: false,
};

export default function CreateEventForm({
  creatorId,
  creatorName,
  onSubmit,
  onCancel,
  eventType,
}: CreateEventFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false)

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.date) newErrors.date = "Event date/time is required";
    if (!form.duration || Number(form.duration) <= 0) {
      newErrors.duration = "Duration must be a positive number of minutes";
    }
    if (form.maxAttendees && Number(form.maxAttendees) <= 0) {
      newErrors.maxAttendees = "Max attendees must be a positive number";
    }
    if (
      form.registrationDeadline &&
      form.date &&
      new Date(form.registrationDeadline) > new Date(form.date)
    ) {
      newErrors.registrationDeadline = "Deadline must be before the event date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const now = Timestamp.now();

      const newEvent: CreateEventInput = {
        eventId: crypto.randomUUID(),
        title: form.title.trim(),
        description: form.description.trim(),
        creatorId,
        creatorName,
        thumbnail: form.thumbnail || undefined,
        date: Timestamp.fromDate(new Date(form.date)),
        duration: Number(form.duration),
        maxAttendees: form.maxAttendees ? Number(form.maxAttendees) : undefined,
        currentAttendees: 0,
        eventType: eventType,
        registrationDeadline: form.registrationDeadline
          ? Timestamp.fromDate(new Date(form.registrationDeadline))
          : undefined,
        isPublished: form.isPublished,
        createdAt: now,
        updatedAt: now,
      };

      await onSubmit(newEvent);
      setForm(initialState);
    } finally {
      setSubmitting(false);
    }
  }

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB')
      return
    }

    setIsUploadingThumbnail(true)

    try {
      const uploadData = new FormData()

      uploadData.append('file', file)
      uploadData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: uploadData,
        }
      )

      if (!res.ok) throw new Error('Upload failed')

      const data = await res.json()

      // Store the secure URL for display, and you may also want public_id
      setForm((prev) => ({ ...prev, thumbnail: data.secure_url }))
    } catch (error) {
      console.error('Thumbnail upload error:', error)
      alert('Failed to upload thumbnail')
    } finally {
      setIsUploadingThumbnail(false)
      // allow re-selecting the same file later
      e.target.value = ''
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-5 p-6 bg-white rounded-xl shadow-sm border border-gray-200 max-h-[85vh] overflow-y-auto"
    >
      <h2 className="text-xl font-semibold text-gray-900">Create Event</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="e.g. Intro to Product Design"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          placeholder="What is this event about?"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1">{errors.description}</p>
        )}
      </div>

      {/* Thumbnail */}
      {/* Thumbnail upload */}
      <div
        onClick={() => !isUploadingThumbnail && thumbnailInputRef.current?.click()}
        className="flex items-center gap-3 p-3 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
      >
        {isUploadingThumbnail ? (
          <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
          </div>
        ) : form.thumbnail ? (
          <img src={form.thumbnail} className="w-14 h-14 rounded-lg object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <ImagePlus className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-foreground">
            {isUploadingThumbnail ? 'Uploading...' : 'Upload thumbnail'}
          </p>
          <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
        </div>
        <input
          ref={thumbnailInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleThumbnailChange}
        />
      </div>

      {/* Date & duration */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date &amp; Time
          </label>
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            value={form.duration}
            onChange={(e) => updateField("duration", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.duration && (
            <p className="text-xs text-red-500 mt-1">{errors.duration}</p>
          )}
        </div>
      </div>

      {/* Registration deadline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Registration Deadline{" "}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="datetime-local"
          value={form.registrationDeadline}
          onChange={(e) => updateField("registrationDeadline", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.registrationDeadline && (
          <p className="text-xs text-red-500 mt-1">{errors.registrationDeadline}</p>
        )}
      </div>

      {/* Max attendees */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Max Attendees <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="number"
          min="1"
          value={form.maxAttendees}
          onChange={(e) => updateField("maxAttendees", e.target.value)}
          placeholder="Leave blank for unlimited"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.maxAttendees && (
          <p className="text-xs text-red-500 mt-1">{errors.maxAttendees}</p>
        )}
      </div>

      {/* Publish toggle */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => updateField("isPublished", e.target.checked)}
          />
          Publish immediately
        </label>
        <p className="text-xs text-gray-400 mt-1">
          Unpublished events are saved as drafts and hidden from attendees.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-white border-t border-gray-100 -mx-6 px-6 pb-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Event"}
        </button>
      </div>
    </form>
  );
}