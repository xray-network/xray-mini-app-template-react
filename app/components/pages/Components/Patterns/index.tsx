const patterns = [
  {
    title: "Design tokens first",
    description: "Define one primary color, a clear type scale (max 3 levels), and an 8px spacing grid.",
  },
  {
    title: "Layout clarity",
    description: "Use grid structure, keep consistent gutters, and group related elements in cards or sections.",
  },
  {
    title: "Typography hierarchy",
    description: "Headings bold, body text readable, secondary info lighter; limit line length for readability.",
  },
  {
    title: "Color & surfaces",
    description: "Use light backgrounds with subtle contrast, soft borders/shadows, and ensure high text contrast.",
  },
  {
    title: "Component use",
    description: "Let AntD handle behavior, Tailwind handle spacing/layout. Keep component variants minimal.",
  },
  {
    title: "Forms",
    description: "Prefer vertical layout, single column, clear labels with helper text, and inline validation.",
  },
  {
    title: "States covered",
    description: "Always provide loading (skeletons), empty (icon + message + action), success, and error states.",
  },
  {
    title: "Icons & motion",
    description: "Use one icon set, consistent sizes, and apply only subtle, purposeful transitions.",
  },
  {
    title: "Responsiveness",
    description: "Stack elements on small screens, split on medium, add sidebars on large, collapse extras on mobile.",
  },
  {
    title: "Accessibility",
    description: "Keep focus visible, don’t rely only on color, provide clear labels, and support screen readers.",
  },
  {
    title: "Readability & density",
    description: "Use whitespace intentionally, truncate long text, and avoid overloading tables.",
  },
  {
    title: "Content style",
    description: "Buttons should be actions, copy short and clear, titles in Title Case, body in sentence case.",
  },
  {
    title: "Hygiene",
    description: "Avoid class soup, extract repeated styles, and use tokens consistently across the app.",
  },
  {
    title: "Consistency",
    description: "Ensure similar components look and behave the same across the entire app for predictability.",
  },
]

export default function PatternsComp() {
  return (
    <section className="mb-10">
      <p className="mb-5 text-gray-500">
        Please follow these design patterns when building your Mini App. They help ensure a clean, consistent, and
        user-friendly experience. Use Tailwind CSS for layout and typography, and Ant Design components for interactive
        elements.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {patterns.map((pattern, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900"
          >
            <h3 className="font-semibold mb-2">
              {index + 1}. {pattern.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{pattern.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
