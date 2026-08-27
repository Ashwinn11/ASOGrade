/**
 * Structured data.
 *
 * The same four-line `<script type="application/ld+json">` block was written by
 * hand 26 times across 11 files. Accepts one object or several so a page can
 * emit its whole set in one call.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
