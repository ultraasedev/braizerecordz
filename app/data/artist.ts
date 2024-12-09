import { Artist, StreamingPlatform, SocialMedia } from "../types/artist"

export const artists: Artist[] = [
  {
    id: 1,
    name: "LASHKA",
    slug: "lashka",
    genre: "Rap",
    images: {
        profile: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg",
        cover: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg",
        gallery: [
            "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg",
            "https://images.pexels.com/photos/2479313/pexels-photo-2479313.jpeg",
            "https://images.pexels.com/photos/2479314/pexels-photo-2479314.jpeg"
        ]
    },
    biography: {
        short: "LASHKA redéfinit les codes du rap français avec son style unique et ses textes percutants",
        full: "LASHKA, figure montante du rap français, s'est imposé comme l'une des voix les plus authentiques de sa génération. Originaire des quartiers nord de Marseille, il commence à rapper dès l'âge de 15 ans dans sa chambre, s'inspirant autant du rap conscient que de la nouvelle vague trap. Son premier EP 'Première Vague' en 2022 marque les esprits avec des textes incisifs et une production moderne. Son dernier album 'Burn Out' confirme son talent unique, mêlant des flows techniques à des textes introspectifs qui touchent au cœur. Artiste complet, il maîtrise aussi bien les morceaux énergiques que les titres plus posés, toujours avec une sincérité désarmante."
    },
    discography: [
        {
            id: 1,
            title: "Burn Out",
            releaseDate: "2024",
            type: "Album",
            coverArt: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg",
            tracks: [
                {
                    id: 1,
                    title: "Intro (Flammes)",
                    duration: "2:45",
                    streamingLinks: { spotify: "#", deezer: "#" }
                },
                {
                    id: 2,
                    title: "Nuit Rouge",
                    duration: "3:30",
                    featuring: ["MAES"],
                    streamingLinks: { spotify: "#", deezer: "#" }
                },
                {
                    id: 3,
                    title: "Plus Rien à Perdre",
                    duration: "3:15",
                    streamingLinks: { spotify: "#", deezer: "#" }
                }
            ],
            streamingLinks: { spotify: "#", deezer: "#", appleMusic: "#" }
        }
    ],
    stats: {
        monthlyListeners: "250000",
        followers: "80000",
        views: "2000000"
    },
    streaming: {
        spotify: "#",
        deezer: "#",
        appleMusic: "#",
        youtubeMusic: "#"
    },
    socials: {
        instagram: "https://instagram.com/lashka",
        tiktok: "https://tiktok.com/@lashka",
        facebook: "https://facebook.com/lashkaofficial"
    },
    pressKit: {
        bioFr: "path/to/bio-fr.pdf",
        bioEn: "path/to/bio-en.pdf",
        photos: [
            "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg",
            "https://images.pexels.com/photos/2479313/pexels-photo-2479313.jpeg"
        ],
        logos: {
            light: "path/to/logo-light.png",
            dark: "path/to/logo-dark.png"
        },
        technicalRider: "path/to/technical-rider.pdf",
        pressRelease: "path/to/press-release.pdf"
    },
    events: [
        {
            id: 1,
            title: "LASHKA en Concert",
            date: "2024-12-20",
            venue: "Le Bataclan",
            city: "Paris",
            country: "France",
            type: "Concert",
            ticketUrl: "#",
            price: "35€",
            status: "upcoming"
        }
    ],
    awards: [
        {
            year: 2023,
            title: "Révélation de l'année",
            category: "Rap"
        },
        {
            year: 2024,
            title: "Album Urban de l'année",
            category: "Burn Out"
        }
    ],
    features: [
        {
            date: "2024-02-15",
            title: "LASHKA : 'Je fais de la musique pour toucher les gens'",
            media: "Les Inrockuptibles",
            url: "#"
        }
    ],
    contract: "Label",
    latestRelease: {
        id: 1,
        title: "Burn Out",
        releaseDate: "2024",
        type: "Album",
        coverArt: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg",
        streamingLinks: { spotify: "#", deezer: "#", appleMusic: "#" }
    }
},
{
  id: 2,
  name: "MAES",
  slug: "maes",
  genre: "Rap",
  images: {
      profile: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
      cover: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
      gallery: [
          "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
          "https://images.pexels.com/photos/1699162/pexels-photo-1699162.jpeg"
      ]
  },
  biography: {
      short: "MAES, l'une des plus grandes figures du rap français actuel",
      full: "Véritable phénomène du rap français, MAES s'est imposé comme l'un des artistes majeurs de sa génération. Depuis ses débuts dans le 93, il a su créer un style unique, mêlant une plume affûtée à des productions modernes. Son dernier album 'Nuit Rouge' marque un tournant dans sa carrière, explorant des thématiques plus personnelles tout en conservant l'énergie qui a fait son succès. Avec plus de 500 millions de streams cumulés, il continue d'innover et de repousser les limites de son art."
  },
  discography: [
      {
          id: 3,
          title: "Nuit Rouge",
          releaseDate: "2024",
          type: "Album",
          coverArt: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
          tracks: [
              {
                  id: 4,
                  title: "Rouge Sang",
                  duration: "3:45",
                  streamingLinks: { spotify: "#", deezer: "#" }
              },
              {
                  id: 5,
                  title: "Dans la Nuit",
                  duration: "4:20",
                  featuring: ["LASHKA"],
                  streamingLinks: { spotify: "#", deezer: "#" }
              }
          ],
          streamingLinks: { spotify: "#", deezer: "#", appleMusic: "#" }
      }
  ],
  stats: {
      monthlyListeners: "1500000",
      followers: "2000000",
      views: "15000000"
  },
  streaming: {
      spotify: "#",
      deezer: "#",
      appleMusic: "#"
  },
  socials: {
      instagram: "https://instagram.com/maes",
      facebook: "https://facebook.com/maesofficial"
  },
  pressKit: {
      bioFr: "path/to/bio-fr.pdf",
      photos: [
          "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg"
      ],
      logos: {
          light: "path/to/logo-light.png",
          dark: "path/to/logo-dark.png"
      },
      technicalRider: "path/to/technical-rider.pdf"
  },
  events: [
      {
          id: 2,
          title: "MAES - Tournée Nuit Rouge",
          date: "2024-11-15",
          venue: "AccorHotels Arena",
          city: "Paris",
          country: "France",
          type: "Concert",
          ticketUrl: "#",
          price: "45€",
          status: "upcoming"
      }
  ],
  contract: "Distribution",
  awards: [
      {
          year: 2023,
          title: "Artiste masculin de l'année",
          category: "Victoires de la Musique"
      }
  ],
  latestRelease: {
      id: 3,
      title: "Nuit Rouge",
      releaseDate: "2024",
      type: "Album",
      coverArt: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
      streamingLinks: { spotify: "#", deezer: "#", appleMusic: "#" }
  }
},
{
  id: 3,
  name: "KEYZAH",
  slug: "keyzah",
  genre: "Pop Urbaine",
  images: {
      profile: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
      cover: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
      gallery: [
          "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
          "https://images.pexels.com/photos/1183267/pexels-photo-1183267.jpeg"
      ]
  },
  biography: {
      short: "KEYZAH, la nouvelle sensation de la pop urbaine française",
      full: "KEYZAH représente le nouveau visage de la pop urbaine française. Auteure-compositrice-interprète talentueuse, elle marie avec brio les sonorités R&B aux influences afro-pop. Son premier EP 'Faya' a marqué les esprits par sa fraîcheur et son originalité. Artiste complète, elle maîtrise aussi bien le chant que la danse, offrant des performances scéniques mémorables. Son parcours atypique, de la danse classique au conservatoire jusqu'à la scène urbaine, lui permet d'apporter une touche unique à ses créations."
  },
  discography: [
      {
          id: 4,
          title: "Faya",
          releaseDate: "2023",
          type: "EP",
          coverArt: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
          tracks: [
              {
                  id: 6,
                  title: "Faya",
                  duration: "3:15",
                  streamingLinks: { spotify: "#", deezer: "#" }
              },
              {
                  id: 7,
                  title: "Danse avec moi",
                  duration: "3:45",
                  streamingLinks: { spotify: "#", deezer: "#" }
              }
          ],
          streamingLinks: { spotify: "#", deezer: "#", youtubeMusic: "#" }
      }
  ],
  stats: {
      monthlyListeners: "100000",
      followers: "50000",
      views: "800000"
  },
  streaming: {
      spotify: "#",
      deezer: "#",
      youtubeMusic: "#"
  },
  socials: {
      instagram: "https://instagram.com/keyzah",
      tiktok: "https://tiktok.com/@keyzah"
  },
  pressKit: {
      bioFr: "path/to/bio-fr.pdf",
      photos: [
          "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg"
      ],
      logos: {
          light: "path/to/logo-light.png",
          dark: "path/to/logo-dark.png"
      },
      technicalRider: "path/to/technical-rider.pdf"
  },
  events: [],
  contract: "Label",
  latestRelease: {
      id: 4,
      title: "Faya",
      releaseDate: "2023",
      type: "EP",
      coverArt: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
      streamingLinks: { spotify: "#", deezer: "#", youtubeMusic: "#" }
  }
},
{
  id: 4,
  name: "DENZO",
  slug: "denzo",
  genre: "Shatta",
  images: {
      profile: "https://toutelaculture.com/wp-content/uploads/2021/07/1.jpg",
      cover: "https://toutelaculture.com/wp-content/uploads/2021/07/1.jpg",
      gallery: [
          "https://toutelaculture.com/wp-content/uploads/2021/07/1.jpg",
          "https://toutelaculture.com/wp-content/uploads/2021/07/2.jpg"
      ]
  },
  biography: {
      short: "DENZO, l'ambassadeur du Shatta moderne",
      full: "Pionnier du mouvement Shatta en France, DENZO a su créer un pont entre les Antilles et l'Hexagone. Ses productions énergiques et ses performances explosives ont rapidement fait de lui une référence du genre. Avec son album 'Contact', il réinvente les codes du Shatta en y incorporant des éléments de trap et d'afrobeat. Son parcours, de la Guadeloupe à Paris, inspire une nouvelle génération d'artistes. DENZO ne cesse de repousser les frontières musicales, créant un style unique qui fait danser toute la France."
  },
  discography: [
      {
          id: 5,
          title: "Contact",
          releaseDate: "2024",
          type: "Album",
          coverArt: "https://toutelaculture.com/wp-content/uploads/2021/07/1.jpg",
          tracks: [
              {
                  id: 8,
                  title: "Contact",
                  duration: "3:30",
                  streamingLinks: { spotify: "#", deezer: "#" }
                },
                {
                    id: 9,
                    title: "Dancehall Queen",
                    duration: "3:45",
                    featuring: ["KEYZAH"],
                    streamingLinks: { spotify: "#", deezer: "#" }
                }
            ],
            streamingLinks: { spotify: "#", deezer: "#" }
        }
    ],
    stats: {
        monthlyListeners: "80000",
        followers: "45000",
        views: "600000"
    },
    streaming: {
        spotify: "#",
        deezer: "#"
    },
    socials: {
        instagram: "https://instagram.com/denzo"
    },
    pressKit: {
        bioFr: "path/to/bio-fr.pdf",
        photos: [
            "https://toutelaculture.com/wp-content/uploads/2021/07/1.jpg"
        ],
        logos: {
            light: "path/to/logo-light.png",
            dark: "path/to/logo-dark.png"
        },
        technicalRider: "path/to/technical-rider.pdf"
    },
    events: [
        {
            id: 3,
            title: "Festival Tropical Heat",
            date: "2024-07-20",
            venue: "Zénith",
            city: "Paris",
            country: "France",
            type: "Festival",
            ticketUrl: "#",
            price: "40€",
            status: "upcoming"
        }
    ],
    contract: "Distribution",
    latestRelease: {
        id: 5,
        title: "Contact",
        releaseDate: "2024",
        type: "Single",
        coverArt: "https://toutelaculture.com/wp-content/uploads/2021/07/1.jpg",
        streamingLinks: { spotify: "#", deezer: "#" }
    }
},
{
    id: 5,
    name: "NORAJ",
    slug: "noraj",
    genre: "Rap",
    images: {
        profile: "https://images.pexels.com/photos/2885578/pexels-photo-2885578.jpeg",
        cover: "https://images.pexels.com/photos/2885578/pexels-photo-2885578.jpeg",
        gallery: [
            "https://images.pexels.com/photos/2885578/pexels-photo-2885578.jpeg",
            "https://images.pexels.com/photos/2885579/pexels-photo-2885579.jpeg"
        ]
    },
    biography: {
        short: "NORAJ, la nouvelle voix engagée du rap français",
        full: "NORAJ s'est imposé comme l'une des voix les plus engagées de sa génération. Issu de la scène underground lyonnaise, il a su construire un univers unique où les textes conscients côtoient une production moderne et travaillée. Son dernier EP 'Atmosphère' aborde des thématiques sociales fortes avec une plume affûtée et des flows techniques. Artiste indépendant convaincu, il prouve qu'il est possible de faire de la musique authentique tout en touchant un large public. Son parcours atypique, de professeur de français à rappeur, lui donne une perspective unique sur la société."
    },
    discography: [
        {
            id: 6,
            title: "Atmosphère",
            releaseDate: "2024",
            type: "EP",
            coverArt: "https://images.pexels.com/photos/2885578/pexels-photo-2885578.jpeg",
            tracks: [
                {
                    id: 10,
                    title: "Pression atmosphérique",
                    duration: "4:15",
                    streamingLinks: { spotify: "#", deezer: "#", appleMusic: "#" }
                },
                {
                    id: 11,
                    title: "Dans les nuages",
                    duration: "3:55",
                    streamingLinks: { spotify: "#", deezer: "#", appleMusic: "#" }
                }
            ],
            streamingLinks: { spotify: "#", deezer: "#", appleMusic: "#" }
        }
    ],
    stats: {
        monthlyListeners: "45000",
        followers: "25000",
        views: "300000"
    },
    streaming: {
        spotify: "#",
        deezer: "#",
        appleMusic: "#"
    },
    socials: {},
    pressKit: {
        bioFr: "path/to/bio-fr.pdf",
        bioEn: "path/to/bio-en.pdf",
        photos: [
            "https://images.pexels.com/photos/2885578/pexels-photo-2885578.jpeg"
        ],
        logos: {
            light: "path/to/logo-light.png",
            dark: "path/to/logo-dark.png"
        },
        technicalRider: "path/to/technical-rider.pdf"
    },
    events: [],
    contract: "Label",
    features: [
        {
            date: "2024-03-01",
            title: "NORAJ : 'Le rap doit porter un message'",
            media: "Konbini",
            url: "#"
        }
    ],
    latestRelease: {
        id: 6,
        title: "Atmosphère",
        releaseDate: "2024",
        type: "EP",
        coverArt: "https://images.pexels.com/photos/2885578/pexels-photo-2885578.jpeg",
        streamingLinks: { spotify: "#", deezer: "#", appleMusic: "#" }
    }
},
{
    id: 6,
    name: "LYNA",
    slug: "lyna",
    genre: "Pop Urbaine",
    images: {
        profile: "https://images.pexels.com/photos/2889943/pexels-photo-2889943.jpeg",
        cover: "https://images.pexels.com/photos/2889943/pexels-photo-2889943.jpeg",
        gallery: [
            "https://images.pexels.com/photos/2889943/pexels-photo-2889943.jpeg",
            "https://images.pexels.com/photos/2889944/pexels-photo-2889944.jpeg"
        ]
    },
    biography: {
        short: "LYNA, l'étoile montante de la pop urbaine française",
        full: "Révélation de l'année 2023, LYNA incarne le renouveau de la pop urbaine française. Son parcours musical, débuté sur les réseaux sociaux, l'a rapidement propulsée sur le devant de la scène. Son premier single 'Miroir' cumule déjà des millions de vues et établit sa signature sonore unique, mêlant pop moderne et R&B. Auteure-compositrice-interprète accomplie, elle participe à l'écriture et à la production de tous ses morceaux. Son style vocal distinctif et ses mélodies accrocheuses en font l'une des artistes les plus prometteuses de sa génération."
    },
    discography: [
        {
            id: 7,
            title: "Miroir",
            releaseDate: "2024",
            type: "Single",
            coverArt: "https://images.pexels.com/photos/2889943/pexels-photo-2889943.jpeg",
            tracks: [
                {
                    id: 12,
                    title: "Miroir",
                    duration: "3:30",
                    streamingLinks: { spotify: "#", deezer: "#" }
                },
                {
                    id: 13,
                    title: "Miroir (Acoustic)",
                    duration: "3:25",
                    streamingLinks: { spotify: "#", deezer: "#" }
                }
            ],
            streamingLinks: { spotify: "#", deezer: "#" }
        }
    ],
    stats: {
        monthlyListeners: "120000",
        followers: "85000",
        views: "1500000"
    },
    streaming: {
        spotify: "#",
        deezer: "#"
    },
    socials: {
        instagram: "#",
        tiktok: "#"
    },
    pressKit: {
        bioFr: "path/to/bio-fr.pdf",
        photos: [
            "https://images.pexels.com/photos/2889943/pexels-photo-2889943.jpeg"
        ],
        logos: {
            light: "path/to/logo-light.png",
            dark: "path/to/logo-dark.png"
        },
        technicalRider: "path/to/technical-rider.pdf"
    },
    events: [
        {
            id: 4,
            title: "LYNA en showcase",
            date: "2024-09-10",
            venue: "La Cigale",
            city: "Paris",
            country: "France",
            type: "Showcase",
            ticketUrl: "#",
            price: "25€",
            status: "upcoming"
        }
    ],
    contract: "Edition",
    awards: [
        {
            year: 2023,
            title: "Révélation Pop de l'année",
            category: "NRJ Music Awards"
        }
    ],
    latestRelease: {
        id: 7,
        title: "Miroir",
        releaseDate: "2024",
        type: "Single",
        coverArt: "https://images.pexels.com/photos/2889943/pexels-photo-2889943.jpeg",
        streamingLinks: { spotify: "#", deezer: "#" }
    }
},
{
  id: 7,
  name: "SKYZO",
  slug: "skyzo",
  genre: "Rap",
  images: {
      profile: "https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg",
      cover: "https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg",
      gallery: [
          "https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg",
          "https://images.pexels.com/photos/1687676/pexels-photo-1687676.jpeg"
      ]
  },
  biography: {
      short: "SKYZO, le prodige du rap nouvelle génération",
      full: "SKYZO représente l'avant-garde du rap français. Producteur et rappeur autodidacte, il s'est fait remarquer par ses productions innovantes et son flow unique. Son single 'Night Call' a explosé sur les plateformes de streaming, définissant un nouveau style qui mélange trap et électro. À seulement 22 ans, il produit déjà pour les plus grands noms du rap français. Son approche futuriste de la musique et sa maîtrise des nouvelles technologies en font un artiste particulièrement influent auprès de la jeune génération."
  },
  discography: [
      {
          id: 8,
          title: "Night Call",
          releaseDate: "2024",
          type: "Single",
          coverArt: "https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg",
          tracks: [
              {
                  id: 14,
                  title: "Night Call",
                  duration: "2:55",
                  streamingLinks: { spotify: "#", deezer: "#", youtubeMusic: "#" }
              }
          ],
          streamingLinks: { spotify: "#", deezer: "#", youtubeMusic: "#" }
      }
  ],
  stats: {
      monthlyListeners: "200000",
      followers: "150000",
      views: "2500000"
  },
  streaming: {
      spotify: "#",
      deezer: "#",
      youtubeMusic: "#"
  },
  socials: {
      instagram: "#",
      tiktok: "#"
  },
  pressKit: {
      bioFr: "path/to/bio-fr.pdf",
      photos: [
          "https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg"
      ],
      logos: {
          light: "path/to/logo-light.png",
          dark: "path/to/logo-dark.png"
      },
      technicalRider: "path/to/technical-rider.pdf"
  },
  events: [],
  contract: "Edition",
  features: [
      {
          date: "2024-01-20",
          title: "SKYZO : Le nouveau visage de la prod française",
          media: "Generator",
          url: "#"
      }
  ],
  latestRelease: {
      id: 8,
      title: "Night Call",
      releaseDate: "2024",
      type: "Single",
      coverArt: "https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg",
      streamingLinks: { spotify: "#", deezer: "#", youtubeMusic: "#" }
  }
},
{
  id: 8,
  name: "MILA",
  slug: "mila",
  genre: "Pop Urbaine",
  images: {
      profile: "https://images.pexels.com/photos/1870438/pexels-photo-1870438.jpeg",
      cover: "https://images.pexels.com/photos/1870438/pexels-photo-1870438.jpeg",
      gallery: [
          "https://images.pexels.com/photos/1870438/pexels-photo-1870438.jpeg",
          "https://images.pexels.com/photos/1870439/pexels-photo-1870439.jpeg"
      ]
  },
  biography: {
      short: "MILA, la voix soul de la nouvelle scène française",
      full: "MILA incarne la nouvelle génération d'artistes qui transcendent les genres. Formée au conservatoire en chant lyrique, elle a su créer un style unique qui mêle pop urbaine et influences soul. Son EP 'Horizon' marque un tournant dans sa carrière, révélant une artiste mature aux textes poétiques et aux mélodies envoûtantes. Ses performances live, où elle s'accompagne au piano, démontrent l'étendue de son talent. MILA représente l'élégance et la sophistication de la pop urbaine française."
  },
  discography: [
      {
          id: 9,
          title: "Horizon",
          releaseDate: "2024",
          type: "EP",
          coverArt: "https://images.pexels.com/photos/1870438/pexels-photo-1870438.jpeg",
          tracks: [
              {
                  id: 15,
                  title: "Horizon",
                  duration: "4:05",
                  streamingLinks: { spotify: "#" }
              },
              {
                  id: 16,
                  title: "Océan",
                  duration: "3:45",
                  streamingLinks: { spotify: "#" }
                }
            ],
            streamingLinks: { spotify: "#" }
        }
    ],
    stats: {
        monthlyListeners: "35000",
        followers: "20000",
        views: "250000"
    },
    streaming: {
        spotify: "#"
    },
    socials: {
        instagram: "#"
    },
    pressKit: {
        bioFr: "path/to/bio-fr.pdf",
        photos: [
            "https://images.pexels.com/photos/1870438/pexels-photo-1870438.jpeg"
        ],
        logos: {
            light: "path/to/logo-light.png",
            dark: "path/to/logo-dark.png"
        },
        technicalRider: "path/to/technical-rider.pdf"
    },
    events: [
        {
            id: 5,
            title: "MILA - Piano & Voix",
            date: "2024-10-05",
            venue: "Théâtre des Variétés",
            city: "Paris",
            country: "France",
            type: "Concert",
            ticketUrl: "#",
            price: "30€",
            status: "upcoming"
        }
    ],
    contract: "Management",
    latestRelease: {
        id: 9,
        title: "Horizon",
        releaseDate: "2024",
        type: "EP",
        coverArt: "https://images.pexels.com/photos/1870438/pexels-photo-1870438.jpeg",
        streamingLinks: { spotify: "#" }
    }
},
{
    id: 9,
    name: "RAYCE",
    slug: "rayce",
    genre: "Shatta",
    images: {
        profile: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg",
        cover: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg",
        gallery: [
            "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg",
            "https://images.pexels.com/photos/1644617/pexels-photo-1644617.jpeg"
        ]
    },
    biography: {
        short: "RAYCE, l'énergie pure du Shatta moderne",
        full: "Véritable phénomène du Shatta, RAYCE a su imposer son style unique en fusionnant les sonorités traditionnelles caribéennes avec les productions modernes. Son single 'Energy' est rapidement devenu un hymne dans les clubs, cumulant des millions de vues. Originaire de Martinique, il puise son inspiration dans ses racines tout en embrassant les influences contemporaines. Ses performances explosives et son charisme naturel en font l'une des têtes d'affiche des plus grands festivals. RAYCE représente le renouveau du genre, ouvrant la voie à une nouvelle génération d'artistes."
    },
    discography: [
        {
            id: 10,
            title: "Energy",
            releaseDate: "2024",
            type: "Single",
            coverArt: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg",
            tracks: [
                {
                    id: 17,
                    title: "Energy",
                    duration: "3:35",
                    streamingLinks: { spotify: "#", deezer: "#", youtubeMusic: "#" }
                },
                {
                    id: 18,
                    title: "Energy (Remix)",
                    duration: "4:15",
                    featuring: ["DENZO"],
                    streamingLinks: { spotify: "#", deezer: "#", youtubeMusic: "#" }
                }
            ],
            streamingLinks: { spotify: "#", deezer: "#", youtubeMusic: "#" }
        }
    ],
    stats: {
        monthlyListeners: "150000",
        followers: "100000",
        views: "3000000"
    },
    streaming: {
        spotify: "#",
        deezer: "#",
        youtubeMusic: "#"
    },
    socials: {},
    pressKit: {
        bioFr: "path/to/bio-fr.pdf",
        photos: [
            "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg"
        ],
        logos: {
            light: "path/to/logo-light.png",
            dark: "path/to/logo-dark.png"
        },
        technicalRider: "path/to/technical-rider.pdf"
    },
    events: [
        {
            id: 6,
            title: "Festival Caribbean Vibes",
            date: "2024-08-15",
            venue: "Stade de France",
            city: "Saint-Denis",
            country: "France",
            type: "Festival",
            ticketUrl: "#",
            price: "55€",
            status: "upcoming"
        }
    ],
    contract: "Label",
    latestRelease: {
        id: 10,
        title: "Energy",
        releaseDate: "2024",
        type: "Single",
        coverArt: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg",
        streamingLinks: { spotify: "#", deezer: "#", youtubeMusic: "#" }
    }
},
{
    id: 10,
    name: "ZYNA",
    slug: "zyna",
    genre: "Pop Urbaine",
    images: {
        profile: "https://images.pexels.com/photos/1870163/pexels-photo-1870163.jpeg",
        cover: "https://images.pexels.com/photos/1870163/pexels-photo-1870163.jpeg",
        gallery: [
            "https://images.pexels.com/photos/1870163/pexels-photo-1870163.jpeg",
            "https://images.pexels.com/photos/1870164/pexels-photo-1870164.jpeg"
        ]
    },
    biography: {
        short: "ZYNA, la nouvelle sensation pop qui bouscule les codes",
        full: "ZYNA s'est rapidement imposée comme l'une des artistes les plus innovantes de la pop urbaine française. Son style unique, mêlant pop alternative et R&B moderne, lui a permis de se démarquer dès ses premiers singles. 'Destiny', son dernier titre, révèle une artiste en pleine évolution artistique, n'hésitant pas à explorer de nouvelles sonorités. Autodidacte passionnée, elle compose et écrit tous ses morceaux, créant un univers musical personnel et touchant. Son parcours atypique, de la danse contemporaine à la musique, enrichit ses performances d'une dimension artistique unique."
    },
    discography: [
        {
            id: 11,
            title: "Destiny",
            releaseDate: "2024",
            type: "Single",
            coverArt: "https://images.pexels.com/photos/1870163/pexels-photo-1870163.jpeg",
            tracks: [
                {
                    id: 19,
                    title: "Destiny",
                    duration: "3:25",
                    streamingLinks: { spotify: "#", deezer: "#", appleMusic: "#" }
                }
            ],
            streamingLinks: { spotify: "#", deezer: "#", appleMusic: "#" }
        }
    ],
    stats: {
        monthlyListeners: "75000",
        followers: "45000",
        views: "900000"
    },
    streaming: {
        spotify: "#",
        deezer: "#",
        appleMusic: "#"
    },
    socials: {
        instagram: "#",
        tiktok: "#"
    },
    pressKit: {
        bioFr: "path/to/bio-fr.pdf",
        photos: [
            "https://images.pexels.com/photos/1870163/pexels-photo-1870163.jpeg"
        ],
        logos: {
            light: "path/to/logo-light.png",
            dark: "path/to/logo-dark.png"
        },
        technicalRider: "path/to/technical-rider.pdf"
    },
    events: [],
    contract: "Distribution",
    features: [
        {
            date: "2024-02-28",
            title: "ZYNA : 'Je veux créer une nouvelle forme de pop'",
            media: "Maze Magazine",
            url: "#"
        }
    ],
    latestRelease: {
        id: 11,
        title: "Destiny",
        releaseDate: "2024",
        type: "Single",
        coverArt: "https://images.pexels.com/photos/1870163/pexels-photo-1870163.jpeg",
        streamingLinks: { spotify: "#", deezer: "#", appleMusic: "#" }
    }
}
]