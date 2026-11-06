export type Category = 'plushie' | 'flowers' | 'accessories'

export interface Make {
  id: string
  name: string
  category: Category
  src: string
  width: number
  height: number
  alt: string
  description: string
}

const img = (file: string) => `${import.meta.env.BASE_URL}makes/${file}`

export const makes: Make[] = [
  {
    id: 'gigi', name: 'Gigi the giraffe', category: 'plushie', src: img('gigi.webp'), width: 904, height: 1022,
    alt: 'Gigi, a yellow chenille crochet giraffe with cocoa spots and a cream muzzle',
    description: 'Yellow chenille giraffe with cocoa spots and a cream muzzle.',
  },
  {
    id: 'rapunzel', name: 'Rapunzel', category: 'plushie', src: img('rapunzel.webp'), width: 636, height: 1034,
    alt: 'Rapunzel, a crochet doll with long yellow braids, tiny flowers, a pink bodice and a purple skirt',
    description: 'Doll with long yellow braids, tiny flowers, a pink bodice and a purple skirt.',
  },
  {
    id: 'uni', name: 'Uni the unicorn', category: 'plushie', src: img('uni.webp'), width: 720, height: 1132,
    alt: 'Uni, a cream crochet unicorn with a curly blue mane, mint hooves and an orange horn',
    description: 'Cream unicorn with a curly blue mane, mint hooves and an orange horn.',
  },
  {
    id: 'tortoise', name: 'Your tiny bestie', category: 'plushie', src: img('tortoise.webp'), width: 712, height: 986,
    alt: 'A palm-sized green crochet tortoise with a yellow-stitched shell',
    description: 'Palm-sized green tortoise with a yellow-stitched shell.',
  },
  {
    id: 'sunny', name: 'Sunny the bouquet', category: 'flowers', src: img('sunny.webp'), width: 712, height: 1074,
    alt: 'Crochet bouquet of two sunflowers with lilac and blue tulips, wrapped in black with a yellow ribbon',
    description: 'Two sunflowers with lilac and blue tulips, wrapped in black with a yellow ribbon.',
  },
  {
    id: 'keychain', name: 'Sunflower keychain', category: 'accessories', src: img('keychain.webp'), width: 712, height: 1272,
    alt: 'A crochet sunflower and leaf hanging from a keyring',
    description: 'Single sunflower and leaf on a keyring.',
  },
  {
    id: 'bloom', name: 'Bloom the clips', category: 'accessories', src: img('bloom.webp'), width: 712, height: 1062,
    alt: 'Crochet hair clips topped with flowers, hearts and stars',
    description: 'Hair clips topped with flowers, hearts and stars.',
  },
]

export const getMake = (id: string): Make => {
  const m = makes.find((x) => x.id === id)
  if (!m) throw new Error(`Unknown make: ${id}`)
  return m
}

export const rapunzelBack = {
  src: img('rapunzel-back.webp'), width: 712, height: 1128,
  alt: 'The back of Rapunzel, showing her long braids and neatly stitched skirt',
}

export const yarn = {
  src: img('yarn.webp'), width: 714, height: 944,
  alt: 'Balls of colourful yarn and crochet work in progress',
}
