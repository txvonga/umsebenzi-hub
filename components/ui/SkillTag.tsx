export function SkillTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-lg bg-gray-100 border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-white/5 dark:border-white/5 dark:text-white/70 transition-colors">
      {children}
    </span>
  )
}