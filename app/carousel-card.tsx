'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface CarouselCardProps {
  image: string
  title: string
  subtitle: string
  difficulty: 'easy' | 'medium' | 'hard'
  link?: string
  className?: string
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
  image,
  title,
  subtitle,
  difficulty,
  link,
  className,
}) => {
  // Définir les couleurs en fonction de la difficulté
  const difficultyColors = {
    easy: 'bg-emerald-500',
    medium: 'bg-amber-500',
    hard: 'bg-rose-500',
  }

  const difficultyColor = difficultyColors[difficulty] || 'bg-zinc-500'

  return (
    <motion.div
      className={cn(
        'group relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-zinc-100 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-zinc-800',
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Badge de difficulté */}
      <div className={`absolute right-2 top-2 z-10 rounded-full ${difficultyColor} px-2 py-0.5 text-xs font-medium text-white`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </div>

      {/* Image */}
      <div className="relative h-32 w-full overflow-hidden">
        {image ? (
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 240px"
            />
            <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20" />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-700">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">No image</span>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      </div>
    </motion.div>
  )
}

export default CarouselCard
