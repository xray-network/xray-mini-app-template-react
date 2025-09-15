import Typography from "./Typography"
import ButtonsTabs from "./ButtonsTabs"
import Form from "./Form"
import Table from "./Table"

const uiRules = [
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

export default function Components() {
  return (
    <div>
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-5">Example Components</h1>
        <p>
          This page showcases common UI patterns using Tailwind for typography and Ant Design for components. Use it as
          a quick reference and playground while building your Mini App.
        </p>
        <p>
          Links:{" "}
          <a href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer">
            Tailwind Docs
          </a>
          ,{" "}
          <a href="https://ant.design/components/overview/" target="_blank" rel="noreferrer">
            Ant Design Docs
          </a>
        </p>
      </section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {uiRules.map((rule, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900"
          >
            <h3 className="font-semibold mb-2">
              {index + 1}. {rule.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{rule.description}</p>
          </div>
        ))}
      </div>
      <Typography />
      <ButtonsTabs />
      <Form />
      <Table />
    </div>
  )
}
