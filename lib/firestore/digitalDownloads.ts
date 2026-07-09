import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { COLLECTIONS, DigitalDownload } from "./types"
import { query, where, getDocs, orderBy } from 'firebase/firestore'


interface DigitalDownloadInput {
  name: string
  price: string
  description: string
  status: 'public' | 'draft'
  fileUrl: string
  filePublicId: string
  fileName: string
  fileType: string
  fileSize: number
  creatorId: string
  creatorName?: string
}

export async function createDigitalDownload(input: DigitalDownloadInput): Promise<string> {
  try {
    const docRef = doc(collection(db, COLLECTIONS.DIGITAL_DOWNLOADS))
    await setDoc(docRef, {
      downloadId: docRef.id,
      name: input.name,
      price: Number(input.price),
      description: input.description,
      isPublic: input.status === 'public',
      fileUrl: input.fileUrl,
      filePublicId: input.filePublicId,
      fileName: input.fileName,
      fileType: input.fileType,
      fileSize: input.fileSize,
      creatorId: input.creatorId,
      creatorName: input.creatorName || '',
      downloadCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating digital download:', error)
    throw error
  }
}


export async function getCreatorDigitalDownloads(creatorId: string): Promise<DigitalDownload[]> {
  try {
    const downloadsRef = collection(db, COLLECTIONS.DIGITAL_DOWNLOADS)
    const q = query(
      downloadsRef,
      where('creatorId', '==', creatorId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => doc.data() as DigitalDownload)
  } catch (error) {
    console.error('Error fetching digital downloads:', error)
    throw error
  }
}