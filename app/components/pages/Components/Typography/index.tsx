import { Divider } from "antd"

export default function TypographyPage() {
  return (
    <section className="mb-10">
      <div className="px-6 py-5 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-5">Tailwind Typography</h2>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Heading 1</h1>
          <h2 className="text-2xl font-bold">Heading 2</h2>
          <h3 className="text-xl font-bold">Heading 3</h3>
          <p>
            Paragraph: Build beautiful interfaces quickly. Tailwind gives you low-level utility classes that let you
            build completely custom designs without ever leaving your HTML.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Unordered list item</li>
            <li>Another item</li>
          </ul>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Ordered item</li>
            <li>Second item</li>
          </ol>
        </div>
      </div>
    </section>
  )
}
