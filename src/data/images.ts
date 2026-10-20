// Direct ESM image imports ensuring Vite bundles all trail photographs into production dist/assets as lightweight WebP (<100KB)
import heroSahyadri from '../assets/images/hero_sahyadri_mountains_1792084153006.webp';

import kalsubaiPeak from '../assets/images/dest_kalsubai_peak_1792084153510.webp';
import harishchandragad from '../assets/images/dest_harishchandragad_cliff_1792084153712.webp';
import hariharFort from '../assets/images/dest_harihar_steps_1792084154843.webp';
import devkundWaterfall from '../assets/images/dest_devkund_waterfall_1792084154902.webp';
import rajmachiFort from '../assets/images/dest_rajmachi_fort_1792091551198.webp';
import tornaFort from '../assets/images/dest_torna_fort_1792091573385.webp';
import raigadFort from '../assets/images/dest_raigad_fort_1792091551828.webp';
import sinhagadFort from '../assets/images/dest_sinhagad_fort_1792091552587.webp';
import lohagadFort from '../assets/images/dest_lohagad_vinchukata_1792091552475.webp';
import visapurFort from '../assets/images/dest_visapur_steps_1792091575314.webp';
import ratangadFort from '../assets/images/dest_ratangad_nedhe_1792091574093.webp';
import sandhanValley from '../assets/images/dest_sandhan_valley_1792091552676.webp';
import rajgadFort from '../assets/images/dest_rajgad_balekilla_1792091593555.webp';
import kalavantinDurg from '../assets/images/dest_kalavantin_pinnacle_1792091576359.webp';
import alangMadanKulang from '../assets/images/dest_amk_trio_1792091575634.webp';
import vasotaFort from '../assets/images/dest_vasota_jungle_1792091575364.webp';

export const HERO_IMAGE = heroSahyadri;
export const HERO_FALLBACK = '/images/hero_sahyadri_mountains.webp';

export const TRAIL_IMAGES = {
  hero: heroSahyadri,
  kalsubaiPeak,
  harishchandragad,
  hariharFort,
  devkundWaterfall,
  rajmachiFort,
  tornaFort,
  raigadFort,
  sinhagadFort,
  lohagadFort,
  visapurFort,
  ratangadFort,
  sandhanValley,
  rajgadFort,
  kalavantinDurg,
  alangMadanKulang,
  vasotaFort,
} as const;

export const DESTINATION_IMAGE_MAP: Record<string, { image: string; fallback: string }> = {
  'kalsubai-peak': {
    image: kalsubaiPeak,
    fallback: '/images/dest_kalsubai_peak.webp',
  },
  'harishchandragad': {
    image: harishchandragad,
    fallback: '/images/dest_harishchandragad.webp',
  },
  'harihar-fort': {
    image: hariharFort,
    fallback: '/images/dest_harihar_fort.webp',
  },
  'devkund-waterfall': {
    image: devkundWaterfall,
    fallback: '/images/dest_devkund_waterfall.webp',
  },
  'rajmachi-fort': {
    image: rajmachiFort,
    fallback: '/images/dest_rajmachi_fort.webp',
  },
  'torna-fort': {
    image: tornaFort,
    fallback: '/images/dest_torna_fort.webp',
  },
  'raigad-fort': {
    image: raigadFort,
    fallback: '/images/dest_raigad_fort.webp',
  },
  'sinhagad-fort': {
    image: sinhagadFort,
    fallback: '/images/dest_sinhagad_fort.webp',
  },
  'lohagad-fort': {
    image: lohagadFort,
    fallback: '/images/dest_lohagad_fort.webp',
  },
  'visapur-fort': {
    image: visapurFort,
    fallback: '/images/dest_visapur_fort.webp',
  },
  'ratangad-fort': {
    image: ratangadFort,
    fallback: '/images/dest_ratangad_fort.webp',
  },
  'sandhan-valley': {
    image: sandhanValley,
    fallback: '/images/dest_sandhan_valley.webp',
  },
  'rajgad-fort': {
    image: rajgadFort,
    fallback: '/images/dest_rajgad_fort.webp',
  },
  'kalavantin-durg': {
    image: kalavantinDurg,
    fallback: '/images/dest_kalavantin_durg.webp',
  },
  'alang-madan-kulang': {
    image: alangMadanKulang,
    fallback: '/images/dest_alang_madan_kulang.webp',
  },
  'vasota-fort': {
    image: vasotaFort,
    fallback: '/images/dest_vasota_fort.webp',
  },
};

export const BLOG_IMAGE_MAP: Record<string, { image: string; fallback: string }> = {
  'best-trekking-places-maharashtra': {
    image: heroSahyadri,
    fallback: '/images/hero_sahyadri_mountains.webp',
  },
  'kalsubai-trek-route-difficulty-prep': {
    image: kalsubaiPeak,
    fallback: '/images/dest_kalsubai_peak.webp',
  },
  'monsoon-treks-maharashtra-safety': {
    image: visapurFort,
    fallback: '/images/dest_visapur_fort.webp',
  },
  'best-fort-treks-maharashtra-heritage': {
    image: raigadFort,
    fallback: '/images/dest_raigad_fort.webp',
  },
  'trekking-places-near-mumbai': {
    image: lohagadFort,
    fallback: '/images/dest_lohagad_fort.webp',
  },
  'trekking-places-near-pune': {
    image: sinhagadFort,
    fallback: '/images/dest_sinhagad_fort.webp',
  },
  'beginners-guide-sahyadri-trekking': {
    image: rajmachiFort,
    fallback: '/images/dest_rajmachi_fort.webp',
  },
  'essential-trekking-gear-western-ghats': {
    image: hariharFort,
    fallback: '/images/dest_harihar_fort.webp',
  },
  'waterfalls-nature-trails-maharashtra': {
    image: devkundWaterfall,
    fallback: '/images/dest_devkund_waterfall.webp',
  },
  'responsible-trekking-leave-no-trace': {
    image: vasotaFort,
    fallback: '/images/dest_vasota_fort.webp',
  },
};
