/**
 * Licensed photographs used on the website (CC0, CC BY or public domain; no CC BY-SA).
 * Copied from profiles/assets/photos, where credits.json records the source of each.
 * Captions say "Representative image": none of these photos shows our own project.
 */

export interface Photo {
  src: string;
  width: number;
  height: number;
  subject: string;
  author: string;
  license: string;
  source: string;
}

export const PHOTOS = {
  'grid-switchgear': { src: '/images/licensed/grid-switchgear.jpg', width: 1800, height: 1350, subject: 'Indoor switchgear panels', author: 'Rsparks3', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:4.16kV_switchgear.jpg' },
  'grid-substation': { src: '/images/licensed/grid-substation.jpg', width: 1800, height: 1334, subject: 'Outdoor substation yard', author: 'PtiBzh', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Pont-l%27Abb%C3%A9_high-voltage_substation_04_-_Arrival_portal_and_switchgear.jpg' },
  'grid-electrician': { src: '/images/licensed/grid-electrician.jpg', width: 1800, height: 1350, subject: 'Electrical worker at a service box', author: 'Jeromi Mikhael', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Electricians_fixing_electricity_meter_5.jpg' },
  'hotel-taj-palace': { src: '/images/licensed/hotel-taj-palace.jpg', width: 1920, height: 1282, subject: 'The Taj Mahal Palace, Colaba, Mumbai', author: 'Mustang Joe', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:The_Taj_Mahal_Palace_Hotel,_Mumbai_(54345616700).jpg' },
  'hotel-taj-lands-end': { src: '/images/licensed/hotel-taj-lands-end.jpg', width: 1920, height: 1440, subject: 'Taj Lands End, Bandra, Mumbai', author: 'Swaminathan', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Taj_Lands_End_bandra.jpg' },
  'hotel-trident-bkc': { src: '/images/licensed/hotel-trident-bkc.jpg', width: 1920, height: 1440, subject: 'Trident, Bandra Kurla, Mumbai', author: 'Scott McLeod', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Trident_BKC_-_Front_entrance_02.jpg' },
  'sanyog-meters': { src: '/images/licensed/sanyog-meters.jpg', width: 1800, height: 1350, subject: 'Electricity meters on a service panel', author: 'Oto Zapletal', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Distribution_board_-_Slovakia_02.jpg' },
  'sanyog-meter-analog': { src: '/images/licensed/sanyog-meter-analog.jpg', width: 1800, height: 1350, subject: 'Electricity meter', author: 'Mike1024 at English Wikipedia', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Mechanical_electricity_meter_1965_(1).jpg' },
  'tvasta-living': { src: '/images/licensed/tvasta-living.jpg', width: 1800, height: 1348, subject: 'Living room interior', author: 'Estate Lookup Interiors', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Living_Room_with_Pooja_Niche_Interior_Design_in_Kolkata_by_Estate_Lookup_Interiors.png' },
  'tvasta-kitchen': { src: '/images/licensed/tvasta-kitchen.jpg', width: 1800, height: 1193, subject: 'Modern fitted kitchen', author: 'Shixart1985', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:White_modern_kitchen.jpg' },
  'tvasta-office': { src: '/images/licensed/tvasta-office.jpg', width: 1800, height: 1197, subject: 'Small office interior', author: 'Shixart1985', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Modern_office_space_with_green_plants_and_minimalist_furniture.jpg' },
  'emudran-print': { src: '/images/licensed/emudran-print.jpg', width: 1800, height: 1350, subject: 'Print production line', author: 'Harrison Keely', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:The_910_ton_printing_presses_at_the_Las_Vegas_Review-Journal_were_the_largest_in_the_world_when_installed_in_2000.jpg' },
  'emudran-packaging': { src: '/images/licensed/emudran-packaging.jpg', width: 1800, height: 1415, subject: 'Cardboard packaging boxes', author: 'Creativity103', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Cardboard_Boxes_and_their_History.jpg' },
  'agrim-plans': { src: '/images/licensed/agrim-plans.jpg', width: 1800, height: 1200, subject: 'Project drawings on a desk', author: 'Sergey Zolkin szolkin', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Architectural_drawings_(Unsplash).jpg' },
  'solis-rooftop': { src: '/images/licensed/solis-rooftop.jpg', width: 1800, height: 1200, subject: 'Rooftop solar array', author: 'Roy Bury', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Solar_Energy_Roof_Solar_Power_Generation_2666770_CC0.jpg' },
  'solis-carport': { src: '/images/licensed/solis-carport.jpg', width: 1800, height: 1350, subject: 'Solar canopy over a car park', author: 'Wikideas1', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Solar_canopy_parking_lot_WTC_02.jpg' },
  'solis-bipv': { src: '/images/licensed/solis-bipv.jpg', width: 1800, height: 1350, subject: 'Solar glass canopy', author: 'Littleha', license: 'CC BY 2.5', source: 'https://commons.wikimedia.org/wiki/File:Taipei_Public_Library_Solar_LEO_House_BIPV_20110207.jpg' },
  'solis-ev': { src: '/images/licensed/solis-ev.jpg', width: 1800, height: 1200, subject: 'Public EV charging post', author: 'Retired electrician', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Moscow,_Bersenevskaya_Embankment,_EV_charger_Nov_2025_02.jpg' },
  'solis-install': { src: '/images/licensed/solis-install.jpg', width: 1800, height: 1012, subject: 'Installers fitting solar modules on a roof', author: 'National Institute of Standards and Technology', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:NZERTF_Roof_(8621832515).jpg' },
  'grid-transformer': { src: '/images/licensed/grid-transformer.jpg', width: 1800, height: 1350, subject: 'Power transformer', author: 'Novoklimov', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:High-voltage_transformer_750_kV_%D0%A2%D1%80%D0%B0%D0%BD%D1%81%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%BE%D1%80_750_%D0%BA%D0%92.jpg' },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

/** Author credit, required by CC BY licences and given for the others as a courtesy. */
export function photoCredit(key: PhotoKey): string {
  const p: Photo = PHOTOS[key];
  return `Photo: ${p.author}, ${p.license}.`;
}

/** Caption under a representative photograph (brand guidelines 2.7, 2.8.3). */
export function photoCaption(key: PhotoKey, note = 'Representative image.'): string {
  const p: Photo = PHOTOS[key];
  return `${p.subject}. ${note} ${photoCredit(key)}`;
}
