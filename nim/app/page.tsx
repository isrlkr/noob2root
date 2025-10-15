'use client'
import * as React from 'react'
import { motion } from 'motion/react'
import { XIcon, FilterIcon, CheckIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import { Tilt } from '@/components/motion-primitives/tilt';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TextScramble } from '@/components/motion-primitives/text-scramble';
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselItem,
} from '@/components/motion-primitives/carousel';
import Link from 'next/link'
import { CarouselCard } from './carousel-card'
import { FilterSystem } from './filter-system'
import { AnimatedBackground } from '@/components/ui/animated-background'
import {
  easyBox,
  mediumBox,
  hardBox,
  FILTERS,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
} from './data'

const cards = [...easyBox, ...mediumBox, ...hardBox];

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

function NoResultsMessage() {
  return (
    <div className="flex justify-center items-center py-10 w-full">
      <TextScramble className="font-mono text-sm"
      >
        No Results Found
      </TextScramble>
    </div>
  );
}

export default function Personal() {
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string[]>>({});

  // Fonction pour gérer les changements de filtres
  const handleFiltersChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
    console.log('Filtres actifs:', filters);
  };

  const filteredCards = cards.filter((card) =>
    Object.entries(activeFilters).every(([category, selected]) => {
      if (selected.length === 0) return true;
      
      if (category === 'technique') {
        // Pour les techniques, vérifier si au moins une technique sélectionnée est présente dans le tableau card.techniques
        return selected.some(technique => card.techniques.includes(technique));
      } else {
        // Pour les autres catégories (difficulty, platform), vérifier l'égalité simple
        return selected.includes(card[category as keyof typeof card] as string);
      }
    })
  );

  const easyFilteredCards = filteredCards.filter(card => card.difficulty === 'easy');
  const mediumFilteredCards = filteredCards.filter(card => card.difficulty === 'medium');
  const hardFilteredCards = filteredCards.filter(card => card.difficulty === 'hard');

  const difficultyFilters = activeFilters.difficulty || [];
  
  let showEasySection = false;
  let showMediumSection = false;
  let showHardSection = false;

  if (difficultyFilters.length === 0) {
    showEasySection = true;
    showMediumSection = true;
    showHardSection = true;
  } else {
    showEasySection = difficultyFilters.includes('easy');
    showMediumSection = difficultyFilters.includes('medium');
    showHardSection = difficultyFilters.includes('hard');
  }

  return (
    <motion.main
      className="space-y-12 max-w-6xl mx-auto px-0"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            Dive into the world of cybersecurity through detailed, hands-on write-ups from platforms like Hack The Box, TryHackMe, and more.<br/>
            Whether you're a beginner exploring your first machine or a seasoned hacker refining your skills — this is your knowledge base.<br/>
            <br/>
            🔍 Filter by difficulty, platform, or technique.<br/>
            📚 Learn, exploit, and level up.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">WriteUps</h1>
          <FilterSystem onFiltersChange={handleFiltersChange} />
        </div>

        {showEasySection && (
          <>
            <h2 className="mb-5 mt-12 text-lg font-medium">Easy</h2>
            <div className='relative px-2 mb-20 overflow-visible'>
              {easyFilteredCards.length > 0 ? (
                <Carousel>
                  <CarouselContent className="flex gap-2">
                    {easyFilteredCards.map((card, index) => (
                      <CarouselItem className="w-[240px]" key={card.id}>
                        <Link href="/blog/exploring-the-intersection-of-design-ai-and-design-engineering">
                          <CarouselCard 
                            image={card.image}
                            title={card.title}
                            subtitle={card.subtitle}
                            difficulty={card.difficulty}
                          />
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNavigation
                    className='absolute -bottom-20 left-auto top-auto w-full justify-end gap-2'
                    classNameButton='bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800'
                    alwaysShow
                  />
                </Carousel>
              ) : (
                <NoResultsMessage />
              )}
            </div>
          </>
        )}
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        {showMediumSection && (
          <>
            <h2 className="mb-5 mt-8 text-lg font-medium">Medium</h2>
            <div className='relative px-2 mb-20 overflow-visible'>
              {mediumFilteredCards.length > 0 ? (
                <Carousel>
                  <CarouselContent className="flex gap-2">
                    {mediumFilteredCards.map((card, index) => (
                      <CarouselItem className="w-[240px]" key={card.id}>
                        <Link href="/blog/exploring-the-intersection-of-design-ai-and-design-engineering">
                          <CarouselCard 
                            image={card.image}
                            title={card.title}
                            subtitle={card.subtitle}
                            difficulty={card.difficulty}
                          />
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNavigation
                    className='absolute -bottom-20 left-auto top-auto w-full justify-end gap-2'
                    classNameButton='bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800'
                    alwaysShow
                  />
                </Carousel>
              ) : (
                <NoResultsMessage />
              )}
            </div>
          </>
        )}
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        {showHardSection && (
          <>
            <h2 className="mb-5 mt-8 text-lg font-medium">Hard</h2>
            <div className='relative px-2 mb-32 overflow-visible'>
              {hardFilteredCards.length > 0 ? (
                <Carousel>
                  <CarouselContent className="flex gap-2">
                    {hardFilteredCards.map((card, index) => (
                      <CarouselItem className="w-[240px]" key={card.id}>
                        <Link href="/blog/exploring-the-intersection-of-design-ai-and-design-engineering">
                          <CarouselCard 
                            image={card.image}
                            title={card.title}
                            subtitle={card.subtitle}
                            difficulty={card.difficulty}
                          />
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNavigation
                    className='absolute -bottom-20 left-auto top-auto w-full justify-end gap-2'
                    classNameButton='bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800'
                    alwaysShow
                  />
                </Carousel>
              ) : (
                <NoResultsMessage />
              )}
            </div>
          </>
        )}
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-3 text-lg font-medium">Blog</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Connect</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Feel free to contact me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
