import { useState, useEffect, useCallback } from 'react'
import { getCreatorDigitalDownloads, DigitalDownload } from '@/lib/firestore/digitalDownloads'

export function useCreatorDigitalDownloads(creatorId: string) {
  const [downloads, setDownloads] = useState<DigitalDownload[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDownloads = useCallback(async () => {
    if (!creatorId) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      setError(null)
      const data = await getCreatorDigitalDownloads(creatorId)
      setDownloads(data)
    } catch (err) {
      console.error('Failed to fetch digital downloads:', err)
      setError('Failed to load digital downloads')
    } finally {
      setLoading(false)
    }
  }, [creatorId])

  useEffect(() => {
    fetchDownloads()
  }, [fetchDownloads])

  return { downloads, loading, error, refresh: fetchDownloads }
}