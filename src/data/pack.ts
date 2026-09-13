import { packSchema } from '../lib/schemas.ts';
import { validateOrigin } from '../lib/paths.ts';

// Public brochure facts approved through the Pack 862 leadership questionnaire.
const origin = validateOrigin(process.env.SITE_URL);
const brandProvenance = 'Approved Pack artwork supplied by Pack 862 leadership';
const rankProvenance = 'Official rank insignia from the Scouting America Brand Assets library';
const approval = 'Selected in the completed Pack 862 questionnaire for pre-publication review, 2026-09-06';
export const pack = packSchema.parse({
  identity: { name: 'Cub Scout Pack 862', number: 862, city: 'Torrance, California', grades: 'Kindergarten–5th grade', district: 'Pacifica District', council: 'Greater Los Angeles Area Council' },
  season: '2026–2027',
  location: {
    name: 'Faith United Methodist Church',
    address: '2115 W 182nd Street, Torrance, CA 90504',
    relationship: 'Pack 862 charter organization and primary meeting location',
    arrival: 'Enter through the main entrance.',
  },
  contacts: {
    shared: { status: 'verified', value: 'cubscoutpack862@gmail.com' },
    certificateEmail: { status: 'verified', value: 'cubscoutpack862@gmail.com' },
    payment: { status: 'member-only' },
    responseTime: 'Pack leaders usually reply within one week.',
  },
  schedules: {
    pack: { status: 'verified', value: 'Pack meetings are held two or three times per month on Fridays from 7:00 to 8:30 PM.' },
    committee: { status: 'verified', value: 'The Parent Committee virtually meets on the first Wednesday of each month at 7:00 PM.' },
    den: { status: 'verified', value: 'Den schedules are available after registration.' },
  },
  fees: { youth: 170, dues: 175, adult: 103, dueDate: '2027-01-31' },
  links: {
    maps: 'https://www.google.com/maps/search/?api=1&query=2115%20W%20182nd%20Street%2C%20Torrance%2C%20CA%2090504',
    youth: 'https://my.scouting.org/online-registration/v2/CA524C2D-3DCE-425F-8142-28F0A72A02E7/new/youth/youth-info',
    adult: 'https://my.scouting.org/online-registration/v2/ca524c2d-3dce-425f-8142-28f0a72a02e7/new/volunteer/basic-info',
    assistance: 'https://greaterlascouting.org/financial-assistance/',
    medical: 'https://tinyurl.com/53u3s9dj',
    safeguarding: 'https://www.scouting.org/training/youth-protection/',
    uniform: 'https://www.scouting.org/programs/cub-scouts/cub-scout-uniform/',
    california: 'https://californiascouting.org/glaac/',
    scouting: 'https://www.scouting.org/',
    training: 'https://my.scouting.org',
  },
  calendar: { status: 'missing', publicNote: 'A public Google Calendar is planned but is not available yet. The dates below remain tentative.' },
  assistance: { status: 'verified', value: 'Financial assistance information is available from the Greater Los Angeles Scouting council.' },
  band: { status: 'member-only' },
  scoutbook: { status: 'member-only' },
  trailsEnd: { status: 'member-only' },
  packingList: { status: 'member-only' },
  packForms: { status: 'member-only' },
  leaders: [
    { role: 'Committee Chair', name: { status: 'verified', value: 'Karen Garcia' }, email: { status: 'verified', value: 'cubscoutpack862@gmail.com' }, phone: { status: 'private' } },
    { role: 'Cubmaster', name: { status: 'verified', value: 'Michael Huffman' }, email: { status: 'verified', value: 'activitiescubscoutpack862@gmail.com' }, phone: { status: 'private' } },
  ],
  fundraising: { status: 'member-only' },
  donations: { status: 'member-only' },
  volunteering: { status: 'member-only' },
  shop: { name: 'LA Scout Shop · Cushman-Watt Scout Center', address: '2333 Scout Way, Los Angeles, CA 90026', hours: { status: 'verified', value: 'Monday–Friday, 9:00 AM–4:00 PM; closed for lunch 1:00–2:00 PM.' } },
  assets: {
    logo: { src: '/images/brand/pack-862-logo.jpg', width: 128, height: 101, alt: 'Cub Scout Pack 862 logo', provenance: brandProvenance, approval },
    ranks: {
      Lion: { src: '/images/ranks/lion.jpg', width: 360, height: 340, alt: 'Official Lion rank insignia', provenance: rankProvenance, approval },
      Tiger: { src: '/images/ranks/tiger.jpg', width: 360, height: 360, alt: 'Official Tiger rank insignia', provenance: rankProvenance, approval },
      Wolf: { src: '/images/ranks/wolf.jpg', width: 360, height: 360, alt: 'Official Wolf rank insignia', provenance: rankProvenance, approval },
      Bear: { src: '/images/ranks/bear.jpg', width: 360, height: 360, alt: 'Official Bear rank insignia', provenance: rankProvenance, approval },
      Webelos: { src: '/images/ranks/webelos.jpg', width: 295, height: 360, alt: 'Official Webelos rank insignia', provenance: rankProvenance, approval },
      'Arrow of Light': { src: '/images/ranks/arrow-of-light.jpg', width: 720, height: 286, alt: 'Official Arrow of Light rank insignia', provenance: rankProvenance, approval },
    },
  },
  origin: origin ? { status: 'verified', value: origin } : { status: 'missing', publicNote: 'Production origin has not been configured.' },
});
