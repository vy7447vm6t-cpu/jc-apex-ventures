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
  'hotel-trident-oberoi-nariman-point': { src: '/images/licensed/hotel-trident-oberoi-nariman-point.jpg', width: 2000, height: 1500, subject: 'Trident and The Oberoi, Nariman Point, Mumbai', author: 'Udaykumar PR', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Marine_Drive_Pre-monson_2012_-_panoramio_(29).jpg' },
  'hotel-taj-wellington-mews': { src: '/images/licensed/hotel-taj-wellington-mews.jpg', width: 1867, height: 1400, subject: 'Taj Wellington Mews, Colaba, Mumbai', author: 'Udaykumar PR', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Taj_Wellington_Mews,_Mumbai.jpg' },
  'grid-distribution': { src: '/images/licensed/grid-distribution.jpg', width: 1800, height: 1013, subject: 'Circuit breakers in a distribution board', author: 'Retired electrician', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5_%D0%B1%D0%BB%D0%BE%D0%BA%D0%B8_%D0%B7%D0%B0%D1%89%D0%B8%D1%82%D1%8B_%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D1%85_%D0%B1%D1%80%D0%B5%D0%BD%D0%B4%D0%BE%D0%B2.jpg' },
  'tvasta-living-2': { src: '/images/licensed/tvasta-living-2.jpg', width: 1800, height: 1350, subject: 'Wood-panelled living room', author: 'Peter Alfred Hess from United States', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Living_Room_@_Horizon_Reach_(8733780516).jpg' },
  'tvasta-kitchen-2': { src: '/images/licensed/tvasta-kitchen-2.jpg', width: 1800, height: 1201, subject: 'Kitchen with wood-panelled wall', author: 'Shixart1985', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Modern_luxury_living_room_with_kitchen_interior.jpg' },
  'grid-transformer': { src: '/images/licensed/grid-transformer.jpg', width: 1800, height: 1350, subject: 'Power transformer', author: 'Novoklimov', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:High-voltage_transformer_750_kV_%D0%A2%D1%80%D0%B0%D0%BD%D1%81%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%BE%D1%80_750_%D0%BA%D0%92.jpg' },
  'hero-mumbai': { src: '/images/licensed/hero-mumbai-worli-sea-link.jpg', width: 2400, height: 1661, subject: 'Worli skyline and the Bandra–Worli Sea Link, Mumbai', author: 'Woodysworldtv', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Worli_skyline_with_BSWL_(cropped).jpg' },
  // Step photos (How we work): one per step, used nowhere else.
  'step-solis-install': { src: '/images/licensed/step-solis-install.jpg', width: 1800, height: 1200, subject: 'Installer fitting solar modules on a roof', author: 'Stephen Yang / The Solutions Project', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Technicians_working_on_a_solar_panel_installation_(9234).jpg' },
  'step-solis-canopy': { src: '/images/licensed/step-solis-canopy.jpg', width: 1800, height: 1197, subject: 'Solar canopy over a public plaza', author: 'Isofoton.es', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Isofoton_F%C3%B3rum_de_las_culturas_Barcelona.JPG' },
  'step-solis-rooftop-city': { src: '/images/licensed/step-solis-rooftop-city.jpg', width: 1800, height: 1199, subject: 'Rooftop solar on an apartment building', author: 'Photo by Bright Power, Inc. –  U.S. Department of Energy  fr', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Brocker_000308_173001_518483_4578_(36776424576).jpg' },
  'step-grid-multimeter': { src: '/images/licensed/step-grid-multimeter.jpg', width: 1800, height: 1200, subject: 'Digital multimeter and test leads', author: 'Retired electrician', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Aneng_AN870_multimeter_01.jpg' },
  'step-grid-diagram': { src: '/images/licensed/step-grid-diagram.jpg', width: 1800, height: 1135, subject: 'Electrical single-line diagram', author: 'Department of Homeland Security. U.S. Coast Guard. 3/1/2003', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Electrical_Single_Line_Diagram_Primary_%26_Secondary_Electrical_Distribution_System,_October_4,_1972_-_DPLA_-_0fed242ebf55778b72033f7eebbe132f.tiff' },
  'step-grid-inspection': { src: '/images/licensed/step-grid-inspection.jpg', width: 1800, height: 1285, subject: 'Engineer checking a control panel', author: 'Frank Carter', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Henry_Castro,_with_the_U.S._Air_Force%27s_361st_Training_Squadron,_checks_the_gas_turbine_generator_wiring_diagram_panel_to_troubleshoot_an_electrical_problem_June_8,_2011,_at_Sheppard_Air_Force_Base_in_Wichita_110608-F-NS900-023.jpg' },
  'step-grid-install': { src: '/images/licensed/step-grid-install.jpg', width: 1800, height: 1200, subject: 'Engineers wiring a control cabinet', author: 'Oak Ridge National Laboratory', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:ORNL_History_(45767378674).jpg' },
  'step-grid-maintenance': { src: '/images/licensed/step-grid-maintenance.jpg', width: 1800, height: 1200, subject: 'Technician testing a supply point', author: 'U.S. Navy photo by Seaman  Mark Bergado', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Sailor_Conducts_Maintenance_Aboard_USS_Wayne_E_Meyer_(DDG_108)_(9926354).jpg' },
  'step-sanyog-reading': { src: '/images/licensed/step-sanyog-reading.jpg', width: 1800, height: 1350, subject: 'Meter reader noting a reading', author: 'Judgefloro', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:0067Poblacion_Baliuag,_Bulacan_06.jpg' },
  'step-sanyog-contract': { src: '/images/licensed/step-sanyog-contract.jpg', width: 1800, height: 1350, subject: 'Application papers and a pen', author: 'Blogtrepreneur', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Legal_Contract_%26_Signature_-_Warm_Tones.jpg' },
  'step-sanyog-meter-check': { src: '/images/licensed/step-sanyog-meter-check.jpg', width: 1800, height: 1195, subject: 'Lineman beside a new electricity meter', author: 'USAID Pakistan', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:USAID_Installs_Automatic_Meter_Reading_(AMR)_for_MEPCO%27s_Domestic_Consumers_(15971859981).jpg' },
  'step-sanyog-stamp': { src: '/images/licensed/step-sanyog-stamp.jpg', width: 1800, height: 1200, subject: 'Office date stamp and ink pad', author: 'Jiří Sedláček (Frettie)', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Czech_office_time_stamp_with_inkpillow.jpg' },
  'step-sanyog-meter-fit': { src: '/images/licensed/step-sanyog-meter-fit.jpg', width: 1800, height: 1195, subject: 'Linemen fitting an electricity meter', author: 'USAID Pakistan', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:USAID_Installs_Automatic_Meter_Reading_(AMR)_for_MEPCO%27s_Domestic_Consumers_(15788124987).jpg' },
  'step-tvasta-plan': { src: '/images/licensed/step-tvasta-plan.jpg', width: 1800, height: 1210, subject: 'Floor plan drawing of a bungalow', author: 'Ernest Geldart', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Bungalow_drawing_--_Floor_Plan_MET_DP804276.jpg' },
  'step-tvasta-workshop': { src: '/images/licensed/step-tvasta-workshop.jpg', width: 1800, height: 1195, subject: 'Carpentry workshop, Kolkata', author: 'Biswarup Ganguly', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Shefali_Shah_Along_With_NCSM_Dignitaries_Visiting_CRTL_Carpentry_Shop_-_NCSM_HQ_-_Kolkata_2017-12-14_6525.JPG' },
  'step-tvasta-office': { src: '/images/licensed/step-tvasta-office.jpg', width: 1800, height: 1202, subject: 'Finished office interior', author: 'Shixart1985', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Modern_medical_office_interior_design.jpg' },
  'step-emudran-studio': { src: '/images/licensed/step-emudran-studio.jpg', width: 1800, height: 1200, subject: 'Design studio with poster wall', author: 'Dorottya Gajdos', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Graphasel_Design_Studio_01.jpg' },
  'step-emudran-screen': { src: '/images/licensed/step-emudran-screen.jpg', width: 1800, height: 1200, subject: 'Screen ready for printing', author: 'Manolis Angelakis', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:OSCAL_2017_silkscreen_printed_materials_26.jpg' },
  'step-emudran-print': { src: '/images/licensed/step-emudran-print.jpg', width: 1800, height: 1200, subject: 'Screen printing by hand', author: 'Ahmad Ali Karim', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Screen_printing_demonstration_at_TEDxUTM.jpg' },
  'step-emudran-sign': { src: '/images/licensed/step-emudran-sign.jpg', width: 1800, height: 1200, subject: 'Installed station sign', author: 'Metropolitan Transportation Authority of the State of New Yo', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Peekskill_E._Signage_front_(8682713117).jpg' },
  'step-agrim-bank': { src: '/images/licensed/step-agrim-bank.jpg', width: 1800, height: 1012, subject: 'State Bank of India branch, Nagpur', author: 'Ganesh Dhamodkar', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:State_Bank_of_India_Hudkeshwar_Nagpur.jpg' },
  'step-agrim-site': { src: '/images/licensed/step-agrim-site.jpg', width: 1800, height: 1350, subject: 'Bandra–Worli Sea Link under construction, Mumbai', author: 'Sadanand Warty', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Construction_site_of_Bandra-Worli_sea_link_with_sunset.JPG' },
  'step-agrim-accounts': { src: '/images/licensed/step-agrim-accounts.jpg', width: 1800, height: 945, subject: 'An old accounts book', author: 'RaphaelQS', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Ledger.png' },
  'step-agrim-bank2': { src: '/images/licensed/step-agrim-bank2.jpg', width: 1800, height: 1012, subject: 'State Bank of India branch, Pusad', author: 'Ganesh Dhamodkar', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:State_Bank_of_India_Pusad_459.jpg' },
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
