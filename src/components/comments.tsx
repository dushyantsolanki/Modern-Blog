"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

interface Comment {
  id: string
  author: {
    name: string
    avatarGradient?: string
  }
  content: string
  timestamp: string
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: { name: "Michael Torres", avatarGradient: "linear-gradient(135deg,#10B981,#06B6D4)" },
    content: "This is one of the most balanced takes I've read on AI and design. The emphasis on 'craft direction' as a critical skill really resonates with my experience leading a design team.",
    timestamp: "2 days ago"
  },
  {
    id: "2",
    author: { name: "Aisha Johnson", avatarGradient: "linear-gradient(135deg,#F97316,#F59E0B)" },
    content: "Great article! I'd love to see a follow-up diving deeper into the ethical considerations. The question of training data consent is one that I think deserves much more attention.",
    timestamp: "1 day ago"
  },
  {
    id: "3",
    author: { name: "Tom Wright", avatarGradient: "linear-gradient(135deg,#EC4899,#F43F5E)" },
    content: "The practical steps section is incredibly helpful. I've been experimenting with AI tools for prototyping and the speed increase is remarkable. Thanks for the thoughtful framework.",
    timestamp: "12 hours ago"
  }
]

export function Comments() {
  const [comments, setComments] = React.useState(mockComments)
  const [commentText, setCommentText] = React.useState("")
  const [guestName, setGuestName] = React.useState("")
  const [guestEmail, setGuestEmail] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim() || !guestName.trim() || !guestEmail.trim()) return

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: {
        name: guestName,
        avatarGradient: "linear-gradient(135deg,#6366F1,#8B5CF6)"
      },
      content: commentText,
      timestamp: "Just now"
    }

    setComments([...comments, newComment])
    setCommentText("")
    setGuestName("")
    setGuestEmail("")
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-8 text-foreground">
        Comments ({comments.length})
      </h2>

      <div className="space-y-0">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 py-6 border-b border-border/50 first:pt-0">
            <div 
              className="w-10 h-10 rounded-full flex-shrink-0" 
              style={{ background: comment.author.avatarGradient }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-sm text-foreground">{comment.author.name}</span>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-border/10">
        <h3 className="text-lg font-semibold mb-6 text-foreground">
          Leave a Comment
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Write your comment..."
            required
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full min-h-[120px] p-3 px-4 border border-border bg-surface rounded-md text-sm text-foreground focus:border-primary focus:ring-3 focus:ring-primary/10 outline-none transition-all resize-vertical placeholder:text-muted-foreground/50"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-3 px-4 border border-border bg-surface rounded-md text-sm text-foreground focus:border-primary focus:ring-3 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/50"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full p-3 px-4 border border-border bg-surface rounded-md text-sm text-foreground focus:border-primary focus:ring-3 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/50"
            />
          </div>

          <Button
            type="submit"
          >
            Post Comment
          </Button>
        </form>
      </div>
    </section>
  )
}
