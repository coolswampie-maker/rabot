// Renders a JSON-LD <script>. Data is server-generated and trusted.
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
