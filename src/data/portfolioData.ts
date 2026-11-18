export type ProjectCategory = 'Editorial' | 'Portrait' | 'Campaign';

export interface NavItem {
  label: string;
  href: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  year?: string;
  category: ProjectCategory;
  summary: string;
  detailDescription: string;
  placeholderNotice: string;
  image: string;
  alt: string;
  gridSpanClass: string;
  aspectClass: string;
  offsetClass?: string;
  /** Place PDF files inside public/pdfs/ and set e.g. '/pdfs/collection-01.pdf' */
  pdfUrl?: string;
}

export interface OptionalLink {
  label: string;
  url: string;
  isExternal?: boolean;
}

export const portfolioData = {
  siteMeta: {
    name: 'PRATHEEK PANDEY',
    role: 'Fashion Designer',
    approachSentence:
      'Exploring the fusion of contemporary style, traditional artisanal techniques, and the timeless allure of Indian artistry.',
    location: 'Hyderabad, India',
    email: 'passionatepratheek9@gmail.com',
  },

  navigation: [
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavItem[],

  hero: {
    image: '/src/assets/images/hero_pratheek_pandey.png',
    alt: 'Portrait of fashion designer Pratheek Pandey seated in an atelier surrounded by draped muslin dress forms in warm directional daylight',
    scrollCueLabel: 'Scroll to manifesto',
  },

  about: {
    sectionLabel: '01 · Manifesto',
    statement:
      'A design ethos grounded in elegant shapes, meticulous craftsmanship, and the enduring charm of subtle sophistication.',
    approachParagraph:
      'In my work, I focus on the importance of proportion, texture, and careful craftsmanship. Each design I create strikes a balance between imaginative exploration and precise technique. I find inspiration in modern aesthetics, diverse cultural backgrounds, and the artistic possibilities of fabrics. Each collection emphasizes detail, blending silhouette, material, and skillful construction to produce pieces that are full of character, meaningful, and timeless.',
  },

  projects: {
    sectionLabel: '02 · Selected Projects',
    heading: 'Selected Projects',
    note: 'A thoughtfully assembled mix of creative projects, portfolio work, and professional experiences gained from both academic study and real-world industry involvement.',
    categories: ['All', 'Editorial', 'Portrait', 'Campaign'] as const,
    items: [
      {
        id: 'project-01',
        title: 'THE UNTOLD',
        category: 'Editorial',
        summary:
          'Crafted with precision yet softened by graceful draping, this collection represents a conversation between structured tailoring and flowing designs, embodying a sense of quiet strength in fashion.',
        detailDescription:
          'This concept is a journey of self-confrontation and quiet resilience. Drawing inspiration from abstract newspaper folds and origami, it pairs deep maroon, cherry red, noir black, and cotton tones across corset fitting, muslin trials, spiral structure experimentation, and the final couture garment.',
        placeholderNotice: 'Couture presentation board attached as inline PDF.',
        image: '/src/assets/images/project_tv_film_director_cover.png',
        alt: 'Fashion illustration lineup of five structured couture silhouettes in deep maroon, crimson, and charcoal set against a dark backdrop with a vertical red band',
        gridSpanClass: 'md:col-span-7',
        aspectClass: 'aspect-[4/3]',
        pdfUrl: '/assets/aistudio/Prateek_TV_and_Film_Director_7f777e3b.pdf',
      },
      {
        id: 'project-02',
        title: 'DRAPING & TEST FITS',
        category: 'Portrait',
        summary:
          'A candid collection showcasing the ups and downs of experimentation, highlighting the prototypes and versions that led to the finished product.',
        detailDescription:
          'Hands-on muslin draping and structural test fits spanning corset variations, sculptural sleeves, draped off-shoulder dresses, twist bodices, crush-paper explorations, dart manipulation, geometric pattern work, and draped evening gowns.',
        placeholderNotice: 'Draping and test-fit process board attached as inline PDF.',
        image: '/src/assets/images/project_draping_test_fits_cover.png',
        alt: 'Corsets variations board showing muslin pattern panels alongside four dress forms with pinned and fitted structured corset muslin test fits',
        gridSpanClass: 'md:col-span-5',
        aspectClass: 'aspect-[23/10]',
        offsetClass: 'md:mt-16',
        pdfUrl: '/assets/aistudio/Copy_of_Copy_of_Copy_of_TV_and_Film_Director_Portfolio_Website_i_1650a025.pdf',
      },
      {
        id: 'project-03',
        title: 'WOMEN',
        category: 'Campaign',
        summary:
          'Moving from Restriction to Freedom — a sensory exploration of limitation, transformation, and liberation, casting off societal constraints to embrace the essence of femininity.',
        detailDescription:
          '“Encapsulation → Emergence” explores the transformation of the female body from restriction to liberation. Through contrasting materials including willow wicker, denim, latex, and cement, the collection traces a progression from structured confinement through distortion and self-awareness toward fluidity and freedom.',
        placeholderNotice: 'Collection presentation board attached as inline PDF.',
        image: '/src/assets/images/project_women_cover.png',
        alt: 'Three-panel lookbook triptych for WOMEN Look 1 featuring a sculptural woven willow wicker bodice, dark structured skirt with contour detailing, and metal chains',
        gridSpanClass: 'md:col-span-8',
        aspectClass: 'aspect-[22/10]',
        pdfUrl: '/assets/aistudio/Copy_of_Copy_of_TV_and_Film_Director_Portfolio_Website_in_Yellow__3__fc405c77.pdf',
      },
      {
        id: 'project-04',
        title: 'SHABD',
        category: 'Editorial',
        summary:
          "From Spoken Word to Digital Glitch — Here are five pieces of clothing that weave India's rich heritage into contemporary designs, blending ancient texts and symbolic patterns with modern typography.",
        detailDescription:
          'SHABD — “The Evolving Script” chronicles the journey of knowledge transmission in Indian history across five stages: spoken, written, inscribed, printed, and digital. Combining Thanjavur-inspired surface paintings, wax imprints, antique coin accents, soft Russell silk, crochet details, and pixelated glitch prints, the collection bridges palm-leaf manuscripts and temple carvings with contemporary digital language.',
        placeholderNotice: 'Collection presentation board attached as inline PDF.',
        image: '/src/assets/images/project_shabd_cover.png',
        alt: 'SHABD material and concept board set on deep maroon featuring Thanjavur-inspired painting, crimson wax seal, antique coin, gold tassels, pixelated eye motif, and handwritten manuscript fragment',
        gridSpanClass: 'md:col-span-4',
        aspectClass: 'aspect-[16/9]',
        offsetClass: 'md:mt-8',
        pdfUrl: '/assets/aistudio/Copy_of_TV_and_Film_Director_Portfolio_Website_in_Yellow_Red_Bol_9eb2cc6a.pdf',
      },
      {
        id: 'project-05',
        title: 'SHATTERD REFLECTION',
        category: 'Portrait',
        summary:
          'An Unveiling of Inner Light — A personal journey through hope, tranquility, and instinct where authentic beauty springs from within and gradually reveals itself to the world.',
        detailDescription:
          'Anchored in India’s handloom heritage, Shatterd Reflection pairs Kanjivaram silk and Mangalagiri cotton with translucent tulle, gathers, pleats, and sculpted draping. Exploring “Heritage Reconstructed,” the collection combines regal luster and raw breathable texture in a structured Indian blouse-cum-dupatta silhouette.',
        placeholderNotice: 'Collection presentation board attached as inline PDF.',
        image: '/src/assets/images/project_shatterd_reflection_cover.png',
        alt: 'Editorial lookbook spread for SHATTERD REFLECTION showing three close-up portraits and a full-length woodland frame of a draped blush-pink translucent blouse-cum-dupatta and embellished skirt',
        gridSpanClass: 'md:col-span-6',
        aspectClass: 'aspect-[2/1]',
        pdfUrl: '/assets/aistudio/Add_a_little_bit_of_body_text_7b2a0b03.pdf',
      },
      {
        id: 'project-06',
        title: 'MORPHE',
        category: 'Campaign',
        summary:
          'From its cellular beginnings to its final sculptural form, this process explores how raw materials transform into distinct structures, proportions, and identities.',
        detailDescription:
          'Inspired by morphogenesis — Formation → Differentiation → Adaptation → Emergence — Morphē examines how rigid structures open, soften, and evolve into organic, biomorphic garments. Drawing from porous coral skeletons, honeycombs, and origami folds, the range combines upcycled denim, metallic foil textures, crochet, sculptural pleated skirts, and tulle corsetry.',
        placeholderNotice: 'Collection presentation board attached as inline PDF.',
        image: '/src/assets/images/project_morphe_cover.png',
        alt: 'Fashion illustration lineup for MORPHE showing three sculptural couture silhouettes in upcycled denim with silver foil, honeycomb-pleated sand tones, and white structured tulle against black wave lines',
        gridSpanClass: 'md:col-span-5 md:col-start-8',
        aspectClass: 'aspect-[19/10]',
        offsetClass: 'md:mt-12',
        pdfUrl: '/assets/aistudio/Copy_of_Copy_of_TV_and_Film_Director_Portfolio_Website_in_Yellow__2__618988b9.pdf',
      },
      {
        id: 'project-07',
        title: 'INTERSHIP',
        category: 'Editorial',
        summary:
          'An insightful exploration of how modern heritage is transforming traditional craftsmanship for today’s fashion.',
        detailDescription:
          'Industry internship documentation as Assistant Design Intern at Tanva by Deepika in Hyderabad. Covering Heritage Edit-1 (GAATHA) and Heritage Edit-2 (Motif & Print), the project spans collection development, zardozi embroidery, test fits, motif generation, swatch analysis, kali explorations, and final couture finishing.',
        placeholderNotice: 'Industry internship presentation board attached as inline PDF.',
        image: '/src/assets/images/project_internship_cover.png',
        alt: 'Multi-panel atelier craft collage documenting khaka making, corset test fits, zardozi embroidery, motif sketching, swatch analysis, and final garment finishes',
        gridSpanClass: 'md:col-span-7',
        aspectClass: 'aspect-[25/10]',
        pdfUrl: '/assets/aistudio/Copy_of_Copy_of_TV_and_Film_Director_Portfolio_Website_in_Yellow_b9ba9b2b.pdf',
      },
    ] satisfies ProjectItem[],
  },

  services: {
    sectionLabel: '03 · Expertise',
    heading: 'Expertise & Services',
    collaborationNote:
      "I take a thoughtful approach to fashion design, blending creative direction with garment development and textile exploration, all while paying close attention to detail. I'm eager to collaborate with fashion houses, independent brands, and fellow creatives to turn ideas into meticulously crafted designs.",
  },

  contact: {
    sectionLabel: '04 · Contact',
    heading: 'Inquiries & Commissions',
    invitation:
      "If you want to discuss job opportunities, design projects, or creative collaborations, feel free to email me! I'm open to conversations that inspire new ideas.",
    email: 'passionatepratheek9@gmail.com',
    phone: '9550415500',
    // Place your main portfolio PDF in public/pdfs/ and set url (e.g. '/pdfs/pratheek-pandey-portfolio.pdf')
    // When url is empty, the Preview Portfolio PDF control stays hidden.
    portfolioPdf: {
      label: 'Portfolio PDF',
      url: '',
    },
    // Leave `url` empty ("") to hide an optional link automatically.
    optionalLinks: [
      { label: 'Instagram', url: '', isExternal: true },
      { label: 'Archive', url: '', isExternal: true },
    ] satisfies OptionalLink[],
  },

  footer: {
    backToTopLabel: 'Back to top',
  },
};
