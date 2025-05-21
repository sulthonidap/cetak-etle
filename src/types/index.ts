export interface Record {
  id: string;
  display_date: string;
  jenis_kendaraan: string;
  wilayah_id: string;
  plat_number: string;
  lokasi_cam: string;
  validasi: string;
  report_type: string;
  inserted_date: string;
  ref_number: string;
  printed_date: string;
  lokasi_pelanggaran: string;
  pelanggaran: string;
  status: string;
  aksi: string;
  pdf_dir: string;
  is_wa_surat_tilang: string;
  wilayah_satuan: string;
  alamat_regiden: string;
}

export interface Column {
  key: keyof Record;
  label: string;
  sortable?: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: keyof Record | null;
  direction: SortDirection;
}