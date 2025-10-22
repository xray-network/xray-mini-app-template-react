import { Divider } from "antd"

export default function TypographyPage() {
  return (
    <section className="mb-10">
      <h2 className="text-5xl font-bold mb-14">Typography</h2>
      <div className="mb-8">Basic Typography</div>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Heading 1 <span className="text-gray-400 dark:text-gray-600">text-3xl</span>
          </h1>
          <h2 className="text-2xl font-bold">
            Heading 2 <span className="text-gray-400 dark:text-gray-600">text-2xl</span>
          </h2>
          <h3 className="text-xl font-bold">
            Heading 3 <span className="text-gray-400 dark:text-gray-600">text-xl</span>
          </h3>
        </div>
        <p>
          Paragraph: Build beautiful interfaces quickly. Tailwind gives you low-level utility classes that let you build
          completely custom designs without ever leaving your HTML. Paragraph: Build beautiful interfaces quickly.
          Tailwind gives you low-level utility classes that let you build completely custom designs without ever leaving
          your HTML.
        </p>
        <p className="text-gray-500">
          Paragraph: Build beautiful interfaces quickly. Tailwind gives you low-level utility classes that let you build
          completely custom designs without ever leaving your HTML.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Build beautiful interfaces quickly </li>
          <li>Tailwind gives you low-level utility classes </li>
        </ul>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Completely custom designs without ever leaving your HTML</li>
          <li>Let you build completely custom designs</li>
        </ol>
      </div>
    </section>
  )
}
