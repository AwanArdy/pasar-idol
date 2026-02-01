export interface IdolItem {
  id: number;
  name: string;
  group: 'Nogizaka46' | 'Hinatazaka46' | 'Sakurazaka46';
  category: 'PhotoPack' | 'Single' | 'Lightstick' | 'Blu-ray' | 'Towel' | 'T-Shirt' | 'Acrylic' | 'Keychain';
  price: number;
  image: string;
  condition: 'Sealed' | 'Unsealed';
  description: string;
}
