import { downloadCSV } from "@/utils/csv"

export function useCsvDownload() {
  const exportCsv = <T extends object>(
    data: T[],
    fileName: string
  ) => {
    downloadCSV(data, fileName)
  }

  return { exportCsv }
}