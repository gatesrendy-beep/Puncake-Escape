import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// In-memory / file persistent store for added villas
const STORE_FILE = path.join(process.cwd(), 'villas-data-store.json');

function loadCustomVillas(): any[] {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const data = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading villas-data-store.json:', err);
  }
  return [];
}

function saveCustomVillas(villas: any[]) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(villas, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving villas-data-store.json:', err);
  }
}

// -------------------------------------------------------------
// 1. Health check
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// -------------------------------------------------------------
// 2. Development Admin Auth
// TODO: Replace development admin mode with Supabase Auth before production launch.
// -------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  // Simple development-only admin mode for workflow testing without requiring secrets
  return res.json({
    success: true,
    token: 'dev_admin_session_' + Date.now(),
    role: 'admin',
    name: 'Development Admin',
    devMode: true,
    notice: 'TODO: Replace development admin mode with Supabase Auth before production launch.',
  });
});

// -------------------------------------------------------------
// 3. Location / Google Maps URL Import (MockLocationProvider - Phase 1)
// Stores pasted URL as googleMapsUrl without calling Google Places API
// -------------------------------------------------------------
app.post('/api/places/import', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL Google Maps wajib diisi.' });
    }

    const trimmedUrl = url.trim();

    // 1. Extract place title from URL path or query parameter
    let nameFromPath = '';
    const placePathMatch = trimmedUrl.match(/\/place\/([^/@?]+)/);
    if (placePathMatch && placePathMatch[1]) {
      nameFromPath = decodeURIComponent(placePathMatch[1].replace(/\+/g, ' '));
    } else {
      const qMatch = trimmedUrl.match(/[?&]q=([^&]+)/);
      if (qMatch && qMatch[1]) {
        nameFromPath = decodeURIComponent(qMatch[1].replace(/\+/g, ' '));
      }
    }

    let cleanedName = nameFromPath || 'Villa di Puncak';
    cleanedName = cleanedName
      .replace(/(,?\s*Jawa Barat.*$)|(,?\s*Kabupaten Bogor.*$)|(,?\s*Kec\..*$)/i, '')
      .trim();

    if (!cleanedName || cleanedName.toLowerCase() === 'place' || cleanedName.toLowerCase().includes('maps.app')) {
      cleanedName = 'Villa Privat di Puncak';
    }

    // 2. Extract coordinates if present in URL
    let lat = -6.7023;
    let lng = 106.9532;
    const coordMatch = trimmedUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      lat = parseFloat(coordMatch[1]);
      lng = parseFloat(coordMatch[2]);
    }

    // 3. Extract Place ID or generate deterministic local identifier
    const chijMatch = trimmedUrl.match(/(ChIJ[a-zA-Z0-9_-]{20,})/);
    const placeIdMatch = trimmedUrl.match(/place_id=([a-zA-Z0-9_-]+)/i);
    const extractedPlaceId = chijMatch
      ? chijMatch[1]
      : placeIdMatch
      ? placeIdMatch[1]
      : `mock_puncak_${Math.abs(Math.round(lat * 10000))}_${Math.abs(Math.round(lng * 10000))}`;

    // 4. Resolve Puncak area
    let area = 'Tugu Selatan';
    const combined = (trimmedUrl + ' ' + cleanedName).toLowerCase();
    if (combined.includes('cisarua')) {
      area = 'Cisarua';
    } else if (combined.includes('megamendung')) {
      area = 'Megamendung';
    } else if (combined.includes('tugu') || combined.includes('gunung mas')) {
      area = 'Tugu Selatan';
    }

    const formattedAddress = `${cleanedName}, ${area}, Kec. Cisarua, Kabupaten Bogor, Jawa Barat 16750`;

    // 5. Store exact pasted URL as googleMapsUrl
    const googleMapsUrl = trimmedUrl.startsWith('http')
      ? trimmedUrl
      : `https://maps.google.com/?q=${encodeURIComponent(cleanedName)}`;

    return res.json({
      placeId: extractedPlaceId,
      name: cleanedName,
      formattedAddress,
      area,
      district: 'Cisarua',
      city: 'Kabupaten Bogor, Jawa Barat',
      postalCode: '16750',
      latitude: lat,
      longitude: lng,
      rating: 4.88,
      userRatingCount: 24,
      googleMapsUrl,
      googleMapsUri: googleMapsUrl,
      phoneNumber: '0813-4926-7683',
      websiteUri: '',
      photos: [],
    });
  } catch (error: any) {
    console.error('Error importing location from URL:', error);
    res.status(500).json({ error: error.message || 'Gagal memproses link Google Maps.' });
  }
});

// -------------------------------------------------------------
// 4. AI Description Assistant (Strictly Verified Facts)
// -------------------------------------------------------------
app.post('/api/ai/describe', async (req, res) => {
  try {
    const {
      name,
      area,
      district,
      priceWeekday,
      priceWeekend,
      guests,
      bedrooms,
      bathrooms,
      verifiedAmenities = [],
      googleRating,
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Graceful fallback description strictly using verified inputs
      const title = `${name} — Private Sanctuary in ${area}`;
      const shortDesc = `Villa privat berkapasitas hingga ${guests || 10} tamu dengan ${bedrooms || 3} kamar tidur di kawasan sejuk ${area}, Cisarua.`;
      const whyThis = `Kombinasi ideal privasi di ${area} untuk ${guests || 10} tamu dengan fasilitas terverifikasi dan akses reservasi concierge WhatsApp.`;
      const fullDesc = `Terletak di ketinggian asri ${area}, ${district || 'Cisarua'}, ${name} menghadirkan pengalaman menginap privat yang tenang dengan udara sejuk khas pegunungan.\n\nVilla ini dirancang untuk kenyamanan keluarga maupun grup dengan kapasitas hingga ${guests || 10} tamu, ${bedrooms || 3} kamar tidur, dan ${bathrooms || 2} kamar mandi. Fasilitas terkonfirmasi meliputi: ${verifiedAmenities.length > 0 ? verifiedAmenities.join(', ') : 'fasilitas esensial villa keluarga'}.\n\nNikmati kemudahan reservasi terpercaya tanpa perantara biaya tersembunyi bersama concierge resmi Puncake Escape.`;

      return res.json({
        title,
        shortDescription: shortDesc,
        whyThisVilla: whyThis,
        description: fullDesc,
        seoTitle: `${name} | Villa Privat di ${area} Puncak`,
        seoDescription: `Sewa ${name} di ${area}, Puncak. Kapasitas ${guests || 10} tamu, ${bedrooms || 3} kamar, harga mulai Rp ${(priceWeekday || 2500000).toLocaleString('id-ID')}/malam. Hubungi WhatsApp concierge Puncake Escape.`,
        tags: [area, 'Puncak', 'Cisarua', 'Private Villa', `${bedrooms || 3} Kamar`],
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `Anda adalah copywriter kurasi luxury villa untuk Puncake Escape (marketplace villa privat terpercaya di Puncak & Cisarua).
Tugas Anda: Buat copywriting villa yang elegan, hangat, dan presisi dalam Bahasa Indonesia.

ATURAN PALING PENTING (STRICT FACTUAL INTEGRITY):
- HANYA gunakan informasi yang telah terverifikasi berikut ini.
- JANGAN PERNAH mengarang fasilitas seperti kolam air hangat (heated pool), pemandangan kebun teh, billiard, karaoke, atau Wi-Fi KECUALI secara eksplisit tercantum dalam "Fasilitas Terverifikasi".
- Jika fasilitas tidak disebutkan, jangan sebutkan atau tulis "Sesuai konfirmasi caretaker".
- Nada tulisan: Tenang, mewah, santun, tidak hiperbolis atau terkesan murah/gimmick.

DATA VILLA TERVERIFIKASI:
- Nama Villa: ${name || 'Villa'}
- Area/Lokasi: ${area || 'Tugu Selatan'}, ${district || 'Cisarua'}, Bogor
- Kapasitas Tamu: Maksimal ${guests || 10} orang
- Kamar Tidur: ${bedrooms || 3} kamar
- Kamar Mandi: ${bathrooms || 2} kamar
- Harga Weekdays: Rp ${(priceWeekday || 0).toLocaleString('id-ID')}/malam
- Fasilitas Terverifikasi: ${verifiedAmenities.length > 0 ? verifiedAmenities.join(', ') : 'Fasilitas esensial penginapan privat'}
- Google Rating: ${googleRating ? googleRating + ' Bintang' : 'Rating terverifikasi'}

Format output HARUS JSON valid dengan struktur:
{
  "title": "Judul listing yang elegan (contoh: 'Villa Casablanca — Kolam Renang Privat di Sejuknya Tugu Selatan')",
  "shortDescription": "1-2 kalimat ringkasan padat tentang esensi villa",
  "whyThisVilla": "1 kalimat tajam untuk positioning 'Kenapa Memilih Villa Ini?'",
  "description": "2-3 paragraf narasi lengkap tentang kenyamanan menginap dan suasana istirahat",
  "seoTitle": "Judul SEO optimal (maks 60 karakter)",
  "seoDescription": "Meta deskripsi SEO menarik (maks 155 karakter)",
  "tags": ["array", "kata", "kunci"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '{}';
    const parsed = JSON.parse(text);

    return res.json(parsed);
  } catch (err: any) {
    console.error('Error generating description with Gemini:', err);
    return res.status(500).json({ error: err.message || 'Gagal menghasilkan deskripsi.' });
  }
});

// -------------------------------------------------------------
// 5. Villa CRUD Endpoints
// -------------------------------------------------------------
app.get('/api/villas', (req, res) => {
  const status = req.query.status as string;
  const customVillas = loadCustomVillas();

  if (status) {
    return res.json(customVillas.filter((v) => v.status === status));
  }
  return res.json(customVillas);
});

app.post('/api/villas', (req, res) => {
  const villaData = req.body;
  if (!villaData.name) {
    return res.status(400).json({ error: 'Nama villa wajib diisi.' });
  }

  const customVillas = loadCustomVillas();

  // Create unique id and slug
  const slug = (villaData.name || 'villa')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  const id = `villa-${slug}-${Date.now().toString(36)}`;

  const newVilla = {
    ...villaData,
    id: villaData.id || id,
    slug: villaData.slug || slug,
    status: villaData.status || 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  customVillas.push(newVilla);
  saveCustomVillas(customVillas);

  res.status(201).json(newVilla);
});

app.put('/api/villas/:id', (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const customVillas = loadCustomVillas();

  const index = customVillas.findIndex((v) => v.id === id);
  if (index === -1) {
    // If not found, create it with this id
    const newVilla = {
      ...updateData,
      id,
      updatedAt: new Date().toISOString(),
    };
    customVillas.push(newVilla);
    saveCustomVillas(customVillas);
    return res.json(newVilla);
  }

  // Update existing
  const existing = customVillas[index];
  const updatedVilla = {
    ...existing,
    ...updateData,
    id,
    updatedAt: new Date().toISOString(),
  };

  if (updateData.status === 'published' && existing.status !== 'published') {
    updatedVilla.publishedAt = new Date().toISOString();
    updatedVilla.approvedBy = updateData.approvedBy || 'Admin';
  }

  customVillas[index] = updatedVilla;
  saveCustomVillas(customVillas);

  res.json(updatedVilla);
});

app.delete('/api/villas/:id', (req, res) => {
  const { id } = req.params;
  const customVillas = loadCustomVillas();

  const index = customVillas.findIndex((v) => v.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Villa tidak ditemukan.' });
  }

  // Soft archive
  customVillas[index].status = 'archived';
  customVillas[index].updatedAt = new Date().toISOString();
  saveCustomVillas(customVillas);

  res.json({ success: true, message: 'Villa diarsipkan.', villa: customVillas[index] });
});

// -------------------------------------------------------------
// Vite Middleware / SPA fallback
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Puncake Escape server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
