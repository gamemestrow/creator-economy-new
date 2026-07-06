'use client'

import { useState, useRef } from 'react'
import { BookOpen, Upload, X, Loader2, DollarSign, ImageIcon, AlertCircle, CheckCircle2 } from 'lucide-react'

interface CourseFormData {
  title: string
  description: string
  price: string
  image: File | null
}

interface FormErrors {
  title?: string
  description?: string
  price?: string
  image?: string
}

interface CreateCourseFormProps {
  onSubmit?: (data: CourseFormData) => Promise<void>
  onCancel?: () => void
}

export function CreateCourseForm({ onSubmit, onCancel }: CreateCourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    price: '',
    image: null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required.'
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters.'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.'
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters.'
    }

    if (!formData.price) {
      newErrors.price = 'Price is required.'
    } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = 'Enter a valid price (0 for free).'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, image: 'Please upload a valid image file.' }))
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'Image must be smaller than 5 MB.' }))
      return
    }

    setErrors((prev) => ({ ...prev, image: undefined }))
    setFormData((prev) => ({ ...prev, image: file }))
    setImagePreview(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }))
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleChange = (field: keyof CourseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async () => {
    if (!validate()) return

    try {
      setSubmitting(true)
      if (onSubmit) {
        await onSubmit(formData)
      }
      setSubmitted(true)
    } catch (err) {
      console.error('Submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({ title: '', description: '', price: '', image: null })
    setErrors({})
    setImagePreview(null)
    setSubmitted(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-white p-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-7 w-7 text-green-600" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">Course created!</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Your course has been submitted and is pending review.
        </p>
        <button
          onClick={handleReset}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary"
        >
          Create another
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-white">
      {/* Form Header */}
      <div className="border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">New Course</h2>
            <p className="text-xs text-muted-foreground">Fill in the details below to publish a course.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-6 py-6">
        {/* Title */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Course title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Introduction to React"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10 ${
              errors.title ? 'border-red-400 bg-red-50' : 'border-border bg-white'
            }`}
          />
          {errors.title && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Cover Image */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Cover image
          </label>

          {imagePreview ? (
            <div className="relative overflow-hidden rounded-xl border border-border">
              <img
                src={imagePreview}
                alt="Cover preview"
                className="h-48 w-full object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-card/70 text-white hover:bg-card"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`flex h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-colors hover:border-primary/20 hover:bg-primary/10/50 ${
                errors.image ? 'border-red-400 bg-red-50' : 'border-border bg-muted'
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Click to upload image
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WEBP — max 5 MB</p>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {errors.image && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.image}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="What will students learn in this course?"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`w-full resize-none rounded-lg border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10 ${
              errors.description ? 'border-red-400 bg-red-50' : 'border-border bg-white'
            }`}
          />
          <div className="mt-1 flex items-start justify-between">
            {errors.description ? (
              <p className="flex items-center gap-1.5 text-xs text-red-600">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.description}
              </p>
            ) : (
              <span />
            )}
            <span className="text-xs text-muted-foreground">{formData.description.length} chars</span>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className={`w-full rounded-lg border py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.price ? 'border-red-400 bg-red-50' : 'border-border bg-white'
              }`}
            />
          </div>
          {errors.price ? (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.price}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-muted-foreground">Set to 0 to make this course free.</p>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
        {onCancel && (
          <button
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating…
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Create course
            </>
          )}
        </button>
      </div>
    </div>
  )
}