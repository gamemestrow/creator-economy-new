'use client'

import { useRef, useState } from 'react'
import { X, FileText, Loader2 } from 'lucide-react'
import { refresh } from 'next/cache'

interface DigitalDownloadFormData {
    name: string
    price: string
    description: string
    status: 'public' | 'draft'
    fileUrl: string       // was pdfUrl
    filePublicId: string  // was pdfPublicId
    fileName: string      // new
    fileType: string      // new
    fileSize: number
}

interface UploadDigitalDownloadModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: DigitalDownloadFormData) => Promise<void>
    refresh: () => {}

}

export function UploadDigitalDownloadModal({
    isOpen,
    onClose,
    onSubmit,
    refresh,
}: UploadDigitalDownloadModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploadingPdf, setIsUploadingPdf] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isUploadingFile, setIsUploadingFile] = useState(false)

    const [formData, setFormData] = useState<DigitalDownloadFormData>({
        name: '',
        price: '',
        description: '',
        status: 'draft',
        fileUrl: '',
        filePublicId: '',
        fileName: '',
        fileType: '',
        fileSize: 0,
    })

    if (!isOpen) return null

    const ALLOWED_TYPES = ['pdf', 'epub', 'txt', 'doc', 'docx', 'zip']
    const MAX_SIZE_MB = 50 // bump up since ebooks/docs can be larger than a typical PDF

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const extension = file.name.split('.').pop()?.toLowerCase() || ''

        if (!ALLOWED_TYPES.includes(extension)) {
            alert(`Unsupported file type. Allowed: ${ALLOWED_TYPES.join(', ').toUpperCase()}`)
            return
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            alert(`File must be under ${MAX_SIZE_MB}MB`)
            return
        }

        setIsUploadingFile(true)

        try {
            const uploadData = new FormData()
            uploadData.append('file', file)
            uploadData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload`,
                { method: 'POST', body: uploadData }
            )

            if (!res.ok) {
                const errorBody = await res.json().catch(() => null)
                console.error('Cloudinary error:', errorBody)
                throw new Error(errorBody?.error?.message || 'Upload failed')
            }

            const data = await res.json()
            setFormData((prev) => ({
                ...prev,
                fileUrl: data.secure_url,
                filePublicId: data.public_id,
                fileName: file.name,
                fileType: extension,
                fileSize: data.bytes,
            }))
        } catch (error) {
            console.error('File upload error:', error)
            alert('Failed to upload file')
        } finally {
            setIsUploadingFile(false)
            e.target.value = ''
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.fileUrl) {
            alert('Please upload a PDF before submitting')
            return
        }

        try {
            setIsSubmitting(true)
            await onSubmit(formData)
            setFormData({
                name: '',
                price: '',
                description: '',
                status: 'draft',
                fileUrl: '',
                fileName:"",
                fileType:"",
                filePublicId: '',
                fileSize: 0
            })
            await refresh()
            onClose()
        } catch (error) {
            console.error('Failed to create digital download:', error)
            alert('Failed to create digital download. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <h2 className="text-xl font-bold text-foreground">Upload digital download</h2>
                    </div>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* PDF upload */}
                    <div
                        onClick={() => !isUploadingPdf && fileInputRef.current?.click()}
                        className="flex items-center gap-3 p-3 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                        <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            {isUploadingPdf ? (
                                <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                            ) : (
                                <FileText className="w-6 h-6 text-muted-foreground" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">
                                {isUploadingPdf
                                    ? 'Uploading...'
                                    : formData.fileUrl
                                        ? 'PDF uploaded — click to replace'
                                        : 'Upload file'}
                            </p>
                            <p className="text-xs text-muted-foreground">File up to 20MB</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.epub,.txt,.doc,.docx,.zip"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Product name <span className="text-destructive">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Ultimate React Cheatsheet"
                            className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Price (₹) <span className="text-destructive">*</span>
                        </label>
                        <input
                            required
                            type="number"
                            min="0"
                            step="1"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="e.g., 499"
                            className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Description <span className="text-destructive">*</span>
                        </label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="What's included in this download?"
                            className="w-full bg-input border border-border rounded-lg px-4 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value as 'public' | 'draft' })
                            }
                            className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="draft">Draft</option>
                            <option value="public">Public</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || isUploadingPdf}
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            Create download
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}