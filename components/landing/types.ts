import type { ComponentType, HTMLAttributes } from "react"
import type { StaticImageData } from "next/image"

export interface CategoryItem {
  id: string
  name: string
  icon: ComponentType<{ className?: string }>
  onClick?: () => void
}

export interface CategoriesSectionProps extends HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  categories: CategoryItem[]
}

export interface CtaCardItem {
  id: string
  title: string
  description: string
  buttonText: string
  onButtonClick?: () => void
}

export interface CtaCardsSectionProps extends HTMLAttributes<HTMLElement> {
  cards: CtaCardItem[]
}

export interface FeatureItem {
  id: string
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
}

export interface FeaturesSectionProps extends HTMLAttributes<HTMLElement> {
  features: FeatureItem[]
}

export interface HeroSectionProps extends HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  getStartedText?: string
  professionalText?: string
  onGetStarted?: () => void
  onProfessionalClick?: () => void
  heroImage: StaticImageData | string
  badgeName?: string
  badgeStatus?: string
}

