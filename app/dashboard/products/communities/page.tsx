'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Users,
  Plus,
  MessageSquare,
  UserPlus,
  TrendingUp,
  Crown,
  Activity,
  Globe,
  ImagePlus,
  X,
  Loader2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { createCommunity } from '@/lib/firestore'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useCreatorcommunities } from '@/lib/hooks/use-creator-data'
import { usePageState } from '@/contexts/PageStatesContext'

export default function CommunitiesPage() {

  const [showCreateCommunityModal, setShowCreateCommunityModal] = useState(false)
  const { loading: authLoading, user, authorized } = useRequireRole(['creator', 'attendee'])
  const [isCreating, setIsCreating] = useState(false)
  const { communities, loading, error, refresh } = useCreatorcommunities(user?.uid || '')
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null)

  const { setpageState } = usePageState()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Technology',
    isPublic: true,
    rules: '',
    thumbnail: '',
  });

  useEffect(() => {
    if (user && authorized) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          const data = userDocSnap.data()
          setUserData({
            name: data.name || user.displayName || 'Creator',
            email: user.email || '',
          })
        }
      }

      fetchUserData()
    }
  }, [user, authorized])

  useEffect(() => {
    setpageState(formData)
  }, [])


const handleCreateCommunity = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!user) return

  try {
    setIsCreating(true)
    await createCommunity({
      ...formData,
      creatorId: user.uid,
      creatorName: userData?.name || 'Unknown Creator',
      // remove the hardcoded thumbnail: 'thumbnail' — formData.thumbnail is already spread in above
    })
    setShowCreateCommunityModal(false)
    setFormData({
      name: '',
      description: '',
      category: 'Technology',
      isPublic: true,
      rules: '',
      thumbnail: '',
    })

    await refresh()
  } catch (error) {
    console.error('Failed to create course:', error)
    alert('Failed to create course. Please try again.')
  } finally {
    setIsCreating(false)
  }
}

  const totalMembers = communities.reduce((sum, community) => sum + community.memberCount, 0)



  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false)

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
      setFormData((prev) => ({ ...prev, thumbnail: data.secure_url }))
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
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Communities
          </h1>

          <p className="text-muted-foreground">
            Manage member communities, engagement and discussions
          </p>
        </div>

        <Button onClick={() => setShowCreateCommunityModal(true)} className="flex items-center gap-2">
          <Plus className="mr-2 h-4 w-4" />
          Create Community
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Communities</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{communities.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Members</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{totalMembers.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Posts This Month</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">2,180</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Rate</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              78%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Community List</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {communities.map((community) => (
              <div
                key={community.communityId}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-blue-500" />

                  <div>
                    <h3 className="font-semibold">
                      {community.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {community.memberCount.toLocaleString()} Members
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {community.category} Category
                    </p>
                  </div>
                </div>

                <Button variant="outline">
                  {community.isPublic ? "Public" : "Private"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Community Analytics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-500" />
              <span>{totalMembers.toLocaleString()} active members</span>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <span>2,180 posts this month</span>
            </div>

            <div className="flex items-center gap-3">
              <UserPlus className="h-5 w-5 text-purple-500" />
              <span>840 new members joined</span>
            </div>

            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-orange-500" />
              <span>78% engagement rate</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>32% growth this month</span>
            </div>

            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span>Top Community: Creator Growth Club</span>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-blue-500" />
              <span>Members from 24 countries</span>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              <span>12,400 total discussions</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {showCreateCommunityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-bold text-foreground">Create new community</h2>
              </div>
              <button onClick={() => setShowCreateCommunityModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateCommunity} className="p-6 space-y-4">

              {/* Thumbnail upload */}
              <div
                onClick={() => !isUploadingThumbnail && thumbnailInputRef.current?.click()}
                className="flex items-center gap-3 p-3 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              >
                {isUploadingThumbnail ? (
                  <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                  </div>
                ) : formData.thumbnail ? (
                  <img src={formData.thumbnail} className="w-14 h-14 rounded-lg object-cover" />
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

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Community name <span className="text-destructive">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., React Developers"
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
                  placeholder="What is this community about?"
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Category + Visibility */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Category <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Health">Health</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Visibility</label>
                  <select
                    value={formData.isPublic ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.value === 'true' })}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="true">Public</option>
                    <option value="false">Private</option>
                  </select>
                </div>
              </div>

              {/* Rules */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Community rules
                  <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                </label>
                <textarea
                  value={formData.rules}
                  onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                  placeholder="e.g., Be respectful. No spam. Stay on topic."
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-xs text-muted-foreground mt-1">These will be visible to all members.</p>
              </div>

              {/* Actions */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateCommunityModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
                  Create community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
