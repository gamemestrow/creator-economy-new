import { useCsvDownload } from "@/lib/hooks/use-CSV-download"

type Props<T> = {
  data: T[]
  fileName: string
}

export default function DownloadCsvButton<T extends object>({
  data,
  fileName,
}: Props<T>) {
  const { exportCsv } = useCsvDownload()

  return (
    <button
      onClick={() => exportCsv(data, fileName)}
      className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
    >
      Download CSV
    </button>
  )
}