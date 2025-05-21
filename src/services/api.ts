import { Record } from '../types';

interface ApiResponse {
  data: {
    id?: string;
    display_date?: string;
    jenis_kendaraan?: string;
    wilayah_id?: string;
    plat_number?: string;
    lokasi_cam?: string;
    validasi?: string;
    report_type?: string;
    inserted_date?: string;
    ref_number?: string;
    printed_date?: string;
    lokasi_pelanggaran?: string;
    pelanggaran?: string;
    status?: string;
    aksi?: string;
    pdf_dir?: string;
    is_wa_surat_tilang?: string;
    wilayah_satuan?: string;
    alamat_regiden?: string;
  }[];
}

const API_URL = '/etle/admin-etle/penindakan_printed_list.php';

function buildApiParams(date: string, date1: string) {
  return `date=${date}&date1=${date1}&draw=1&columns%5B0%5D%5Bdata%5D=display_date&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=ref_number&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=jenis_kendaraan&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=plat_number&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=alamat_regiden&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=wilayah_satuan&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=pelanggaran&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=status&columns%5B8%5D%5Bname%5D=&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=true&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=is_wa_surat_tilang&columns%5B9%5D%5Bname%5D=&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=true&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B10%5D%5Bdata%5D=aksi&columns%5B10%5D%5Bname%5D=&columns%5B10%5D%5Bsearchable%5D=true&columns%5B10%5D%5Borderable%5D=true&columns%5B10%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B10%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=100&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1747838549651`;
}

/**
 * Fetches data from the API and transforms it to match our Record type
 */
export const fetchData = async (date: string, date1: string, apiUser: string, apiPass: string): Promise<Record[]> => {
  try {
    const response = await fetch(`${API_URL}?${buildApiParams(date, date1)}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(`${apiUser}:${apiPass}`),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${response.statusText}\nDetails: ${errorText}`);
    }
    
    const data = await response.json() as ApiResponse;
    
    // Transform the API data to match our Record structure
    return data.data.map((item) => ({
      id: item.id || String(Math.random()),
      display_date: item.display_date || new Date().toISOString(),
      jenis_kendaraan: item.jenis_kendaraan || '-',
      wilayah_id: item.wilayah_id || '-',
      plat_number: item.plat_number || '-',
      lokasi_cam: item.lokasi_cam || '-',
      validasi: item.validasi || 'Pending',
      report_type: item.report_type || 'Automatic',
      inserted_date: item.inserted_date || new Date().toISOString(),
      ref_number: item.ref_number || '-',
      printed_date: item.printed_date || new Date().toISOString(),
      lokasi_pelanggaran: item.lokasi_pelanggaran || '-',
      pelanggaran: item.pelanggaran || '-',
      status: item.status || 'Belum Diproses',
      aksi: item.aksi || '-',
      pdf_dir: item.pdf_dir || '',
      is_wa_surat_tilang: item.is_wa_surat_tilang || 'Tidak',
      wilayah_satuan: item.wilayah_satuan || '-',
      alamat_regiden: item.alamat_regiden || '-',
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection and try again.');
    }
    throw error;
  }
};