interface SectionHeaderProps {
  title: string;
  description?: string;
}

/**
 * SectionHeader Component
 *
 * Reusable section header for organizing page content into clear sections.
 * Provides consistent styling and layout for section titles and descriptions.
 *
 * @param title - Section title (required)
 * @param description - Optional description/subtitle
 *
 * @example
 * <SectionHeader
 *   title="Chi tiêu gần đây"
 *   description="5 chi tiêu được thêm gần nhất"
 * />
 */
export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
    </div>
  );
}
