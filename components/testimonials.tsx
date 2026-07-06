'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Fitness Coach',
    avatar: '👩‍🏫',
    rating: 5,
    quote: 'Cloud has completely transformed how I manage my online coaching business. Revenue increased by 200% in just 3 months.'
  },
  {
    name: 'Marcus Johnson',
    role: 'Content Creator',
    avatar: '👨‍💻',
    rating: 5,
    quote: 'The simplicity and power of Cloud is unmatched. I can focus on creating content instead of managing logistics.'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Digital Entrepreneur',
    avatar: '👩‍🚀',
    rating: 5,
    quote: 'Best investment I made for my business. The analytics alone helped me optimize my courses and increase sales by 150%.'
  },
  {
    name: 'David Park',
    role: 'Online Educator',
    avatar: '👨‍🎓',
    rating: 5,
    quote: 'Customer support is incredible. They helped me set up everything in one day. Cloud is the only platform I recommend.'
  },
  {
    name: 'Lisa Anderson',
    role: 'Wellness Influencer',
    avatar: '👩‍🌾',
    rating: 5,
    quote: 'From courses to communities to payments - everything is integrated seamlessly. This is the future of creator platforms.'
  },
  {
    name: 'James Wilson',
    role: 'Tech Educator',
    avatar: '👨‍🔧',
    rating: 5,
    quote: 'The gamification features have been a game-changer for student engagement. Retention rates went up significantly.'
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Loved by Creators Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how creators are using Cloud to transform their businesses and reach their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-border hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
