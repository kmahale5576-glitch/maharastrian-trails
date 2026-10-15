// Direct ESM image imports ensuring Vite bundles all trail photographs into production dist/assets
import heroSahyadri from '../assets/images/hero_sahyadri_mountains_1792084153006.jpg';

import kalsubaiPeak from '../assets/images/dest_kalsubai_peak_1792084153510.jpg';
import harishchandragad from '../assets/images/dest_harishchandragad_cliff_1792084153712.jpg';
import hariharFort from '../assets/images/dest_harihar_steps_1792084154843.jpg';
import devkundWaterfall from '../assets/images/dest_devkund_waterfall_1792084154902.jpg';
import rajmachiFort from '../assets/images/dest_rajmachi_fort_1792091551198.jpg';
import tornaFort from '../assets/images/dest_torna_fort_1792091573385.jpg';
import raigadFort from '../assets/images/dest_raigad_fort_1792091551828.jpg';
import sinhagadFort from '../assets/images/dest_sinhagad_fort_1792091552587.jpg';
import lohagadFort from '../assets/images/dest_lohagad_vinchukata_1792091552475.jpg';
import visapurFort from '../assets/images/dest_visapur_steps_1792091575314.jpg';
import ratangadFort from '../assets/images/dest_ratangad_nedhe_1792091574093.jpg';
import sandhanValley from '../assets/images/dest_sandhan_valley_1792091552676.jpg';
import rajgadFort from '../assets/images/dest_rajgad_balekilla_1792091593555.jpg';
import kalavantinDurg from '../assets/images/dest_kalavantin_pinnacle_1792091576359.jpg';
import alangMadanKulang from '../assets/images/dest_amk_trio_1792091575634.jpg';
import vasotaFort from '../assets/images/dest_vasota_jungle_1792091575364.jpg';

export const HERO_IMAGE = heroSahyadri;
export const HERO_FALLBACK = '/images/hero_sahyadri_mountains.jpg';

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
    fallback: '/images/dest_kalsubai_peak.jpg',
  },
  'harishchandragad': {
    image: harishchandragad,
    fallback: '/images/dest_harishchandragad.jpg',
  },
  'harihar-fort': {
    image: hariharFort,
    fallback: '/images/dest_harihar_fort.jpg',
  },
  'devkund-waterfall': {
    image: devkundWaterfall,
    fallback: '/images/dest_devkund_waterfall.jpg',
  },
  'rajmachi-fort': {
    image: rajmachiFort,
    fallback: '/images/dest_rajmachi_fort.jpg',
  },
  'torna-fort': {
    image: tornaFort,
    fallback: '/images/dest_torna_fort.jpg',
  },
  'raigad-fort': {
    image: raigadFort,
    fallback: '/images/dest_raigad_fort.jpg',
  },
  'sinhagad-fort': {
    image: sinhagadFort,
    fallback: '/images/dest_sinhagad_fort.jpg',
  },
  'lohagad-fort': {
    image: lohagadFort,
    fallback: '/images/dest_lohagad_fort.jpg',
  },
  'visapur-fort': {
    image: visapurFort,
    fallback: '/images/dest_visapur_fort.jpg',
  },
  'ratangad-fort': {
    image: ratangadFort,
    fallback: '/images/dest_ratangad_fort.jpg',
  },
  'sandhan-valley': {
    image: sandhanValley,
    fallback: '/images/dest_sandhan_valley.jpg',
  },
  'rajgad-fort': {
    image: rajgadFort,
    fallback: '/images/dest_rajgad_fort.jpg',
  },
  'kalavantin-durg': {
    image: kalavantinDurg,
    fallback: '/images/dest_kalavantin_durg.jpg',
  },
  'alang-madan-kulang': {
    image: alangMadanKulang,
    fallback: '/images/dest_alang_madan_kulang.jpg',
  },
  'vasota-fort': {
    image: vasotaFort,
    fallback: '/images/dest_vasota_fort.jpg',
  },
};

export const BLOG_IMAGE_MAP: Record<string, { image: string; fallback: string }> = {
  'best-trekking-places-maharashtra': {
    image: heroSahyadri,
    fallback: '/images/hero_sahyadri_mountains.jpg',
  },
  'kalsubai-trek-route-difficulty-prep': {
    image: kalsubaiPeak,
    fallback: '/images/dest_kalsubai_peak.jpg',
  },
  'monsoon-treks-maharashtra-safety': {
    image: visapurFort,
    fallback: '/images/dest_visapur_fort.jpg',
  },
  'best-fort-treks-maharashtra-heritage': {
    image: raigadFort,
    fallback: '/images/dest_raigad_fort.jpg',
  },
  'trekking-places-near-mumbai': {
    image: lohagadFort,
    fallback: '/images/dest_lohagad_fort.jpg',
  },
  'trekking-places-near-pune': {
    image: sinhagadFort,
    fallback: '/images/dest_sinhagad_fort.jpg',
  },
  'beginners-guide-sahyadri-trekking': {
    image: rajmachiFort,
    fallback: '/images/dest_rajmachi_fort.jpg',
  },
  'essential-trekking-gear-western-ghats': {
    image: hariharFort,
    fallback: '/images/dest_harihar_fort.jpg',
  },
  'waterfalls-nature-trails-maharashtra': {
    image: devkundWaterfall,
    fallback: '/images/dest_devkund_waterfall.jpg',
  },
  'responsible-trekking-leave-no-trace': {
    image: vasotaFort,
    fallback: '/images/dest_vasota_fort.jpg',
  },
};

