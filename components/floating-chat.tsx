'use client'

import { useState } from 'react'
import { Bot, X, MessageCircle } from 'lucide-react'
import { ChatInterface } from '@/components/chat-interface'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function FloatingChat() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 w-[400px] max-w-[calc(100vw-3rem)] shadow-2xl rounded-xl overflow-hidden border bg-background"
          >
            <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
              <div className="flex items-center gap-2 font-semibold">
                <Bot className="w-5 h-5" />
                AI Assistant
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-primary-foreground/10 text-primary-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="h-[500px]">
              <ChatInterface showCard={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        className="rounded-full w-14 h-14 shadow-lg p-0"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  )
}
