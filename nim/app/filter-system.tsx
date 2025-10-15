'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { XIcon, FilterIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FILTERS } from './data'
import { Portal } from './portal'

interface FilterSystemProps {
  onFiltersChange: (filters: Record<string, string[]>) => void
  className?: string
}

export const FilterSystem: React.FC<FilterSystemProps> = ({
  onFiltersChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  // Gestion du défilement
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev }
      if (!newFilters[category]) newFilters[category] = []
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value)
      } else {
        newFilters[category] = [...newFilters[category], value]
      }
      if (newFilters[category].length === 0) delete newFilters[category]
      return newFilters
    })
  }

  useEffect(() => {
    onFiltersChange(selectedFilters)
  }, [selectedFilters, onFiltersChange])

  const activeFiltersCount = Object.values(selectedFilters).reduce(
    (count, values) => count + values.length, 0
  )

  const resetFilters = () => {
    setSelectedFilters({})
  }

  return (
    <div className={cn('relative', className)}>
      {/* Bouton */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-all duration-200 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        <FilterIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            {activeFiltersCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
              >
                <div className="rounded-xl border border-zinc-200 bg-white/95 shadow-2xl backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/95">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-700">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        Filters
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Refine your search
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={resetFilters}
                          className="rounded-lg px-3 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                          Reset
                        </button>
                      )}
                      <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6">
                    {/* Difficulté */}
                    <div>
                      <h4 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        Difficulty
                      </h4>
                      <div className="flex gap-2">
                        {FILTERS.difficulty.map((value) => {
                          const isSelected = selectedFilters.difficulty?.includes(value)
                          const difficultyColors = {
                            easy: 'bg-emerald-500',
                            medium: 'bg-amber-500', 
                            hard: 'bg-rose-500'
                          }
                          return (
                            <motion.button
                              key={value}
                              onClick={() => toggleFilter('difficulty', value)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={cn(
                                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                                isSelected
                                  ? 'bg-zinc-900 text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900'
                                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                              )}
                            >
                              <div className={cn('h-2 w-2 rounded-full', difficultyColors[value])} />
                              {value.charAt(0).toUpperCase() + value.slice(1)}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Platform */}
                    <div>
                      <h4 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        Platform
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {FILTERS.platform.map((value) => {
                          const isSelected = selectedFilters.platform?.includes(value)
                          return (
                            <motion.button
                              key={value}
                              onClick={() => toggleFilter('platform', value)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={cn(
                                'rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                                isSelected
                                  ? 'bg-blue-100 text-blue-700 shadow-md dark:bg-blue-900/30 dark:text-blue-300'
                                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                              )}
                            >
                              {value}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Catégories & Techniques */}
                    <div>
                      <h4 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        Categories & Techniques
                      </h4>
                      <div className="space-y-4">
                        {Object.entries(FILTERS.categories).map(([category, techniques]) => (
                          <div key={category} className="space-y-2">
                            <h5 className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                              {category.replace('_', ' ')}
                            </h5>
                            <div className="grid grid-cols-2 gap-2">
                              {techniques.map((technique) => {
                                const isSelected = selectedFilters.technique?.includes(technique)
                                return (
                                  <motion.button
                                    key={technique}
                                    onClick={() => toggleFilter('technique', technique)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={cn(
                                      'rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 text-left',
                                      isSelected
                                        ? 'bg-purple-100 text-purple-700 shadow-md dark:bg-purple-900/30 dark:text-purple-300'
                                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                                    )}
                                  >
                                    {technique}
                                  </motion.button>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-zinc-200 p-6 dark:border-zinc-700">
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FilterSystem
