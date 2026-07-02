export type ElementType = 'heading' | 'text' | 'button' | 'image' | 'user' | 'section'
export type TextAlign = 'left' | 'center' | 'right'

export type BuilderElement = {
  id: string
  type: ElementType
  label: string
  content: string
  url: string
  imageUrl: string
  fontSize: number
  fontFamily: string
  color: string
  backgroundColor: string
  align: TextAlign
  width: number
  height: number
}