import { useParams, Link } from "react-router-dom"
import { CheckCircle, ArrowRight } from "lucide-react"
import { useEffect } from "react";
import Swiper from "swiper/bundle";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SEO from "../components/SEO";




const countryData = {
  malta: {
seo: {
    title: "Malta iGaming Marketing Agency | The Marketing King",
    description:
      "Support your Malta-based iGaming business with performance marketing, SEO, PPC, affiliate management, and scalable digital growth strategies.",
    canonical:
      "https://themarketingking.org/countries/malta",
  },

    label: "Malta",
    heroTitle: "Digital Growth for Malta Based",
    heroGold: "iGaming Operators",
    heroDesc: "Malta is home to many of the world's leading iGaming companies. We help operators strengthen their online presence, acquire new players across Europe, and expand into competitive international markets through performance focused digital marketing.",
    heroImg: "Social-Media-Management-Bg.webp",
    img: "malta.webp",
    BeforelistTitleParagraph:"Malta is a global center for the iGaming industry, attracting leading gaming businesses and technology providers. We help operators grow their digital presence, reach international players, and achieve sustainable success through data driven marketing.",
    listTitle: "Our Malta Marketing Services",
    industriesLabel: "Industries We Scale",
    industriesTitle: "Performance Marketing Services",
    industriesTitleGold: "for Malta iGaming Companies",
    industriesDesc: "Malta is a global center for the iGaming industry, attracting leading gaming businesses and technology providers. We help operators grow their digital presence, reach international players, and achieve sustainable success through data driven marketing.",
    items: ["International SEO", "Affiliate Marketing", "European Player Acquisition", "Content Marketing", "PPC Campaign Management", "Brand Visibility Strategies"],
    subTitle: "Why Partner With Us",
    subText: "From SEO to acquisition campaigns, we create scalable marketing solutions tailored for Malta based operators looking to grow across regulated European markets while maximizing ROI.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "Malta",
     industries: [
  {
    image: "/ICON 3D/casino-3d-icon-png-download-13883873.webp",
    title: "Online Casinos",
    description:
      "Largest iGaming vertical, with slots, live dealer games, and table games driving most activity and revenue.",
  }, 
  {
    image: "/ICON 3D/sports-3d-icon-png-download-10887497.webp",
    title: "Sportsbooks",
    description:
      "Major segment driven by football, tennis, basketball, horse racing, esports, and other domestic and international sporting events.",
  },           
    {
    image: "/ICON 3D/poker-playing-cards-3d-icon-png-download-11901378.png",
    title: "Poker Platforms",
    description: "Established vertical with cash games, tournaments, and poker communities, but smaller than online casinos.",
  },
  {
    image: "/ICON 3D/casino-game-3d-icon-png-download-11333776.webp",
    title: "Esports Betting",
    description: "Growing category offered by sportsbooks, attracting younger audiences through major competitive gaming tournaments.",
  },
  {
    image: "/ICON 3D/trophy-3d-icon-png-download-8115379.webp",
    title: "Fantasy Sports",
    description:
      "Niche segment focused mainly on football and other professional sports competitions with limited market size.",
  },
  {
    image: "/ICON 3D/gaming-online-course-3d-icon-png-download-9859833.png",
    title: "Skill Gaming",
    description: "Small but expanding category featuring skill based cash competitions and tournaments with increasing participation.",
  },
  {
    image: "/ICON 3D/bitcoin-3d-icon-png-download-8579726.webp",
    title: "Crypto Casinos",
    description: "Relatively small segment supported by cryptocurrency users, while traditional online casinos dominate the market.",
  },
],
caseStudyLabel: "Results That Speak",
  caseStudyTitle: "Proven",
  caseStudyTitleGold: "Case Studies",

  caseStudies: [
    {
      image: "/case study/malta-sportsbook.webp",
      tag: "B2B iGaming Software Provider",
      stats: [
        {
          value: "310+",
          text: "Qualified B2B Leads",
        },
        {
          value: "46",
          text: "Enterprise Meetings Booked",
        },
        {
          value: "4.9x",
          text: "ROAS",
        },
        {
          value: "39%",
          text: "Lower Cost per Lead",
        },
      ],
    },
    {
      image: "/case study/malta-casinobook.webp",
      tag: "International Casino Operator",
      stats: [
        {
          value: "Expanded",
          text: "into 6 New GEOs",
        },
        {
          value: "3.7M+",
          text: "Qualified Ad Impressions",
        },
        {
          value: "4.5x",
          text: "ROAS",
        },
        {
          value: "27%",
          text: "Increase in Player Acquisition",
        },
      ],
    },
  ],
  },
  latam: {

     seo: {
    title: "iGaming Marketing Services for LATAM | The Marketing King",
    description:
      "Reach players across Latin America with localized iGaming marketing, multilingual SEO, PPC, affiliate growth, and regional acquisition campaigns.  ",
    canonical:
      "https://themarketingking.org/countries/latam",
  },

    label: "Latam",
    heroTitle: "Global Marketing for Latam",
    heroGold: "Licensed Operators",
    heroDesc: "Latam has become a popular licensing destination for international gaming businesses. We help operators reach new audiences with multilingual campaigns, localized strategies, and performance marketing designed for global expansion.",
    heroImg: "TMK-About-Us.webp",
    img: "latam.webp",
    BeforelistTitleParagraph:"LATAM offers excellent opportunities for licensed gaming operators looking to expand internationally. We create multilingual marketing strategies that increase visibility, attract qualified players, and support sustainable growth across global markets.",
    industriesLabel: "Industries We Scale",
    industriesTitle: "Expand Your Reach Across",
    industriesTitleGold: "LATAM Markets",
    industriesDesc: "Latin America is one of the most dynamic and fast growing digital regions in the world, powered by mobile first audiences, strong social media engagement, and rapid eCommerce adoption. We help brands unlock new opportunities across LATAM with performance driven digital marketing strategies built for real business growth.",
    listTitle: "Our Latam Marketing Services",
    items: ["International SEO", "Multi language Content Marketing", "Paid Advertising Campaigns", "Affiliate Growth Programs", "Casino & Sportsbook Promotion", "Player Acquisition Strategies"],
    subTitle: "Expand Into New Markets",
    subText: "Whether targeting Europe, Asia, Latin America, or emerging markets, our marketing strategies help Curaçao licensed operators build brand awareness, generate qualified traffic, and increase player retention.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "latam",
     industries: [
  {
    image: "/ICON 3D/sports-3d-icon-png-download-10887497.webp",
    title: "Sportsbooks",
    description:
      "Largest iGaming vertical, driven by football, basketball, tennis, MMA, esports, and other major sporting events.",
  },      
  {
    image: "/ICON 3D/casino-3d-icon-png-download-13883873.webp",
    title: "Online Casinos",
    description:
      "Rapidly expanding segment, with online slots, live dealer games, and mobile casino experiences driving player engagement.",
  },      
    {
    image: "/ICON 3D/poker-playing-cards-3d-icon-png-download-11901378.png",
    title: "Poker Platforms",
    description: "Established vertical supported by cash games, tournaments, and regional poker communities, though smaller than casinos and sportsbooks.",
  },
  {
    image: "/ICON 3D/casino-game-3d-icon-png-download-11333776.webp",
    title: "Esports Betting",
    description: "Growing market fueled by competitive gaming events, attracting younger players and increasing operator investment.",
  },
  {
    image: "/ICON 3D/trophy-3d-icon-png-download-8115379.webp",
    title: "Fantasy Sports",
    description:
      "Relatively small but expanding segment, gaining popularity in Brazil, Mexico, and other fantasy sports markets.",
  },
  {
    image: "/ICON 3D/gaming-online-course-3d-icon-png-download-9859833.png",
    title: "Skill Gaming",
    description: "Emerging category featuring skill based cash competitions and tournaments, with modest adoption compared with mainstream gambling products.",
  },
  {
    image: "/ICON 3D/bitcoin-3d-icon-png-download-8579726.webp",
    title: "Crypto Casinos",
    description: "Niche but growing segment supported by cryptocurrency adoption and offshore gambling platforms in selected markets.",
  },
],
caseStudyLabel: "Results That Speak",
  caseStudyTitle: "Proven",
  caseStudyTitleGold: "Case Studies",

  caseStudies: [
    {
      image: "/case study/latam-sportsbook.webp",
      tag: "Regional Sportsbook",
      stats: [
        {
          value: "115K+",
          text: "Players Reached",
        },
        {
          value: "3.1x",
          text: "ROAS",
        },
        {
          value: "27K+",
          text: "Community Members Acquired",
        },
        {
          value: "34%",
          text: "Lower Acquisition Cost",
        },
      ],
    },
    {
      image: "/case study/latam-casinobook.webp",
      tag: "Crypto Casino",
      stats: [
        {
          value: "11K+",
          text: "New Registrations",
        },
        {
          value: "675+",
          text: "First Time Depositors",
        },
        {
          value: "52%",
          text: "Increase in Deposit Volume",
        },
      ],
    },
  ],
  },
  uk: {

     seo: {
    title: "Leading iGaming Marketing Agency in UK | The Marketing King",
    description:
      "Accelerate your UK iGaming brand with tailored digital marketing, SEO, paid advertising, affiliate management, and player retention strategies.",
    canonical:
      "https://themarketingking.org/countries/uk",
  },

    label: "United Kingdom",
    heroTitle: "Trusted iGaming Marketing for the",
    heroGold: "UK",
    heroDesc: "The United Kingdom remains one of the most mature and highly regulated iGaming markets. We help licensed operators build sustainable growth through compliant digital marketing strategies that increase visibility, attract qualified players, and strengthen long term brand credibility.",
    heroImg: "TMK-About-Us.webp",
    img: "uk.webp",
    BeforelistTitleParagraph:"The UK is a highly competitive digital market where businesses need strong online visibility. We deliver data driven marketing strategies that increase brand awareness, attract qualified customers, and support long term business growth.",
    industriesLabel: "Industries We Scale",
    industriesTitle: "Digital Marketing Solutions for",
    industriesTitleGold: "Businesses Across the United Kingdom",
    industriesDesc: "The United Kingdom is home to one of the world's most competitive digital markets. We help businesses strengthen their online presence through data driven marketing strategies, targeted campaigns, and performance focused solutions that drive measurable growth.",
    listTitle: "Our UK Marketing Services",
    items: ["Casino SEO & Organic Growth", "Sportsbook PPC Campaigns", "Responsible Gambling Marketing", "Compliance Focused Content", "Affiliate Marketing", "Brand Reputation Management"],
    subTitle: "Why Choose Us for the UK Market",
    subText: "Our team understands UKGC compliance, competitive search landscapes, and player behavior. We create data driven campaigns that deliver quality traffic, improve conversions, and support sustainable growth while meeting industry regulations.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "United Kingdom",
     industries: [
  {
    image: "/ICON 3D/casino-3d-icon-png-download-13883873.webp",
    title: "Online Casinos",
    description:
      "Largest revenue generator, with slots leading, followed by roulette, blackjack, live dealer games, and instan win titles.",
  },      
  {
    image: "/ICON 3D/sports-3d-icon-png-download-10887497.webp",
    title: "Sportsbooks",
    description:
      "One of the UK's most popular products, driven by football, horse racing, tennis, cricket, rugby, and major sporting events.",
  },
    {
    image: "/ICON 3D/poker-playing-cards-3d-icon-png-download-11901378.png",
    title: "Poker Platforms",
    description: "Smaller than casinos and sportsbooks but supported by loyal players through cash games, tournaments, and online poker networks.",
  },
  {
    image: "/ICON 3D/trophy-3d-icon-png-download-8115379.webp",
    title: "Fantasy Sports",
    description:
      "Smaller than the U.S. market, driven mainly by fantasy football contests and seasonal sports competitions.",
  },
  {
    image: "/ICON 3D/gaming-online-course-3d-icon-png-download-9859833.png",
    title: "Skill Gaming",
    description: "Niche segment offering skill based cash competitions and tournaments, with limited market share versus mainstream gambling products.",
  },
  {
    image: "/ICON 3D/bitcoin-3d-icon-png-download-8579726.webp",
    title: "Crypto Casinos",
    description: "Limited by strict UK regulation, with licensed operators rarely offering cryptocurrency gambling or crypto payment options.",
  },
  {
    image: "/ICON 3D/casino-game-3d-icon-png-download-11333776.webp",
    title: "Sweepstakes & Social Casinos",
    description: "Small niche because regulated real money gambling reduces demand for sweepstakes and social casino alternatives.",
  },
],
caseStudyLabel: "Results That Speak",
  caseStudyTitle: "Proven",
  caseStudyTitleGold: "Case Studies",

  caseStudies: [
    {
      image: "/case study/uk-sportsbook.webp",
      tag: "Licensed Sportsbook",
      stats: [
        {
          value: "4.5K+",
          text: "New Depositing Players",
        },
        {
          value: "2.6x",
          text: "ROAS",
        },
        {
          value: "19%",
          text: "Lower CPA",
        },
        {
          value: "3.4M+",
          text: "Campaign Reach",
        },
      ],
    },
    {
      image: "/case study/uk-casinobook.webp",
      tag: "Online Casino",
      stats: [
        {
          value: "210%",
          text: "Organic Traffic Growth",
        },
        {
          value: "80+",
          text: "Keywords on Page One",
        },
        {
          value: "58%",
          text: "Increase in Qualified Leads",
        },
        {
          value: "1.6x",
          text: "Increase in Monthly FTDs",
        },
      ],
    },
  ],
  },
  india: {

         seo: {
    title: "iGaming Marketing Experts in India | The Marketing King",
    description:
      "Expand your iGaming presence in India through strategic SEO, social media marketing, paid campaigns, influencer collaborations, and player growth.",
    canonical:
      "https://themarketingking.org/countries/india",
  },

    label: "India",
    heroTitle: "Accelerate Growth in India's Fastest Growing",
    heroGold: "Gaming Market",
    heroDesc: "India is one of the world's fastest growing online gaming markets, driven by mobile users, cricket enthusiasts, and regional audiences. Our localized marketing strategies help operators connect with players across multiple languages and platforms.",
    heroImg: "Social-Media-Management-Bg.webp",
    img: "india.webp",
    BeforelistTitleParagraph:"With millions of cricket fans and mobile first users, India has become a key market for online gaming operators. We specialize in Cricket Betting SEO, localized marketing, and digital campaigns that boost search rankings, drive qualified traffic, and increase player registrations.",
    industriesLabel: "Industries We Scale",
    industriesTitle: "High Impact",
    industriesTitleGold: "iGaming Marketing Services in India",
    industriesDesc: "We use India focused digital channels and sports driven engagement strategies to help gaming brands reach and convert high value users.",
    listTitle: "Our India Marketing Services",
    items: ["Cricket Betting SEO", "IPL Marketing Campaigns", "Sportsbook Promotions", "Online Casino Marketing", "Regional Language Content", "Performance Advertising"],
    subTitle: "Reach Millions of Indian Players",
    subText: "We combine local market expertise, SEO, paid media, and regional content strategies to help gaming brands attract high quality users and build long term engagement across India.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "India",
     industries: [
  {
    image: "/ICON 3D/gaming-online-course-3d-icon-png-download-9859833.png",
    title: "Skill Gaming",
    description: "Largest real money gaming segment, led by rummy, skill based card games, and other legally permitted formats.",
  },
   {
    image: "/ICON 3D/trophy-3d-icon-png-download-8115379.webp",
    title: "Fantasy Sports",
    description:
      "Fast growing segment driven by cricket, especially the IPL, alongside football, kabaddi, and other fantasy sports.",
  },
    {
    image: "/ICON 3D/sports-3d-icon-png-download-10887497.webp",
    title: "Sportsbooks",
    description:
      "Cricket drives betting interest, but regulated real money sports betting remains limited, with many players using offshore platforms.",
  },       
  {
    image: "/ICON 3D/casino-3d-icon-png-download-13883873.webp",
    title: "Online Casinos",
    description:
      "Growing segment featuring slots, live dealer games, and table games, largely served by offshore operators.",
  },      
    {
    image: "/ICON 3D/poker-playing-cards-3d-icon-png-download-11901378.png",
    title: "Poker Platforms",
    description: "Niche but established vertical with cash games and tournaments, while legality varies across Indian states.",
  },
  {
    image: "/ICON 3D/bitcoin-3d-icon-png-download-8579726.webp",
    title: "Crypto Casinos",
    description: "Small niche supported by offshore operators, with regulatory uncertainty limiting broader market adoption.",
  },
  {
    image: "/ICON 3D/casino-game-3d-icon-png-download-11333776.webp",
    title: "Sweepstakes & Social Casinos",
    description: "Very limited segment with low consumer awareness and minimal presence compared with larger international markets.",
  },
],
caseStudyLabel: "Results That Speak",
  caseStudyTitle: "Proven",
  caseStudyTitleGold: "Case Studies",

  caseStudies: [
    {
      image: "/case study/india-sportsbook.webp",
      tag: "Leading Sportsbook Site",
      stats: [
        {
          value: "82K+",
          text: "First Time Depositors",
        },
        {
          value: "₹3.8 Cr+",
          text: "Monthly Gaming Turnover Influenced",
        },
        {
          value: "4.9x",
          text: "ROAS",
        },
        {
          value: "33%",
          text: "Lower CPA",
        },
      ],
    },
    {
      image: "/case study/india-fantasy.webp",
      tag: "Fantasy Sports Platform",
      stats: [
        {
          value: "310K+",
          text: "User Registrations",
        },
        {
          value: "82K+",
          text: "Paying Users",
        },
        {
          value: "5.3M+",
          text: "Campaign Reach",
        },
        {
          value: "4.4x",
          text: "ROAS",
        },
      ],
    },
    {
      image: "/case study/india-online-casino.webp",
      tag: "Online Casino Site",
      stats: [
        {
          value: "265%",
          text: "Organic Traffic Growth",
        },
        {
          value: "520+",
          text: "Keywords Ranking in Top 10",
        },
        {
          value: "170K+",
          text: "Monthly Organic Visits",
        },
        {
          value: "4.1x",
          text: "Growth in Qualified Leads",
        },
      ],
    },
    {
      image: "/case study/india-poker.webp",
      tag: "Poker Platform",
      stats: [
        {
          value: "52K+",
          text: "First Time Depositors",
        },
        {
          value: "3.8x",
          text: "ROAS",
        },
        {
          value: "43%",
          text: "Lower CPA",
        },
        {
          value: "89%",
          text: "Increase in Player Retention",
        },
      ],
    },    
  ],

  },
  philippines: {

  seo: {
  title: "iGaming Marketing Agency in Philippines | The Marketing King",
  description:
    "Grow your iGaming business in the Philippines with data-driven SEO, PPC, affiliate marketing, influencer campaigns, and high-performance player acquisition strategies.",
  canonical:
    "https://themarketingking.org/countries/philippines",
},

    label: "Philippines",
    heroTitle: "Performance Marketing for the Philippine",
    heroGold: "Gaming Industry",
    heroDesc: "The Philippines continues to be a significant hub for online gaming. We help operators increase player acquisition through localized campaigns, targeted advertising, and high converting digital marketing strategies.",
    heroImg: "TMK-About-Us.webp",
    img: "philippines.webp",
    BeforelistTitleParagraph:"The Philippines remains a leading destination for online gaming, offering strong growth opportunities for sportsbooks and casino operators. We create tailored marketing strategies that increase brand visibility, attract qualified players, and drive long term business success.",
    industriesLabel: "Industries We Scale",
    industriesTitle: "Performance Marketing Services for",
    industriesTitleGold: "Philippines iGaming Brands",
    industriesDesc: "We use the most effective and widely used digital channels in the Philippines to drive player acquisition and brand growth.",
    listTitle: "Our Philippines Marketing Services",
    items: ["Sports Betting Marketing", "Online Casino Promotion", "Localized SEO", "Filipino Content Marketing", "PPC Campaigns", "Player Retention Strategies"],
    subTitle: "Grow Your Presence in the Philippines",
    subText: "Our campaigns are designed around local player preferences, search behavior, and market trends, helping gaming brands generate more traffic, higher conversions, and stronger customer loyalty.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "Philippines",
    industries: [
  {
    image: "/ICON 3D/casino-3d-icon-png-download-13883873.webp",
    title: "Online Casinos",
    description:
      "Largest iGaming vertical, with slots, live dealer games, baccarat, blackjack, and roulette generating the majority of player activity.",
  },
  {
    image: "/ICON 3D/sports-3d-icon-png-download-10887497.webp",
    title: "Sportsbooks",
    description:
      "A major segment driven by basketball, boxing, football, esports, and cockfighting related betting where legally permitted.",
  },
    {
    image: "/ICON 3D/poker-playing-cards-3d-icon-png-download-11901378.png",
    title: "Poker Platforms",
    description: "An established vertical supported by cash games and tournaments, though considerably smaller than the online casino market.",
  },
    {
    image: "/ICON 3D/casino-game-3d-icon-png-download-11333776.webp",
    title: "Esports Betting",
    description: "A fast growing category fueled by the country's large gaming community and increasing interest in competitive esports tournaments.",
  },
  {
    image: "/ICON 3D/trophy-3d-icon-png-download-8115379.webp",
    title: "Fantasy Sports",
    description:
      "A relatively small niche focused on fantasy contests, with adoption remaining well below that of Western markets.",
  },
  {
    image: "/ICON 3D/bitcoin-3d-icon-png-download-8579726.webp",
    title: "Crypto Casinos",
    description: "A niche but growing segment supported by cryptocurrency users, with development influenced by evolving regulatory considerations.",
  },
  {
    image: "/ICON 3D/gaming-online-course-3d-icon-png-download-9859833.png",
    title: "Skill Gaming",
    description: "A limited but emerging category featuring skill based cash competitions and tournaments with modest player participation.",
  },
],
caseStudyLabel: "Results That Speak",
  caseStudyTitle: "Proven",
  caseStudyTitleGold: "Case Studies",

  caseStudies: [
    {
      image: "/case study/philippines-casinobook.webp",
      tag: "Online Casino Site",
      stats: [
        {
          value: "34K+",
          text: "New Player Registrations",
        },
        {
          value: "14K+",
          text: "First Time Depositors",
        },
        {
          value: "4.7x",
          text: "ROAS",
        },
        {
          value: "38%",
          text: "Lower CPA",
        },
      ],
    },
    {
      image: "/case study/philippines-sportsbook.webp",
      tag: "Sportsbook Operator",
      stats: [
        {
          value: "96K+",
          text: "Users Reached ",
        },
        {
          value: "22K+",
          text: "New Betting Accounts",
        },
        {
          value: "4.3x",
          text: "ROAS",
        },
        {
          value: "46%",
          text: "Increase in Repeat Deposits",
        },
      ],
    },
  ],
  },
  us: {

    seo: {
    title: "iGaming Marketing Agency in USA | The Marketing King",
    description:
      "Scale your iGaming business in the USA with data-driven SEO, PPC, affiliate marketing, influencer campaigns, and high-performance player acquisition solutions.",
    canonical:
      "https://themarketingking.org/countries/us",
  },

    label: "United States",
    heroTitle: "Marketing Solutions for the Expanding US",
    heroGold: "iGaming Market",
    heroDesc: "The United States is one of the fastest growing regulated betting markets, with new states opening opportunities for sportsbooks and online casinos. We help brands compete through targeted digital marketing and state specific strategies.",
    heroImg: "Social-Media-Management-Bg.webp",
    img: "us.webp",
    BeforelistTitleParagraph:"The US iGaming market offers significant opportunities for sportsbooks and online casinos. We help brands increase visibility, attract qualified players, and achieve sustainable growth through data driven digital marketing strategies.",
    industriesLabel: "Industries We Scale",
    industriesTitle: "Growth Marketing for",
    industriesTitleGold: "US Sportsbooks & Online Casinos",
    industriesDesc: "As the US regulated gaming industry continues to grow, operators need marketing strategies that deliver measurable results. We help sportsbooks, casinos, fantasy sports, and betting platforms increase visibility, acquire qualified customers, and maximize long term revenue.",
    listTitle: "Our US Marketing Services",
    items: ["Sportsbook SEO", "Online Casino SEO", "Paid Media Campaigns", "State Level Marketing Strategies", "Affiliate Marketing", "Conversion Rate Optimization"],
    subTitle: "Drive Growth Across Regulated States",
    subText: "Our team develops scalable campaigns tailored to regulated US markets, helping operators attract qualified players, improve conversions, and build a strong digital presence in an increasingly competitive industry.",
    elevateTitle: "Expand Your iGaming Presence in",
    elevateGold: "United States",
    industries: [
  {
    image: "/ICON 3D/sports-3d-icon-png-download-10887497.webp",
    title: "Sportsbooks",
    description:
      "Largest segment by betting handle, driven by the NFL, NBA, MLB, NCAA sports, and major events like the Super Bowl and March Madness.",
  },
  {
    image: "/ICON 3D/casino-3d-icon-png-download-13883873.webp",
    title: "Online Casinos (iCasino)",
    description:
      "Highest revenue per player, but currently legal only in a limited number of states, including New Jersey, Michigan, and Pennsylvania.",
  },
  {
    image: "/ICON 3D/trophy-3d-icon-png-download-8115379.webp",
    title: "Fantasy Sports",
    description:
      "A well established market led by Daily Fantasy Sports (DFS), with NFL and NBA contests generating the highest player participation.",
  },
  {
    image: "/ICON 3D/casino-game-3d-icon-png-download-11333776.webp",
    title: "Sweepstakes & Social Casinos",
    description: "A fast growing segment, offering casino style games in states where traditional real money online casinos are not legally available.",
  },
  {
    image: "/ICON 3D/poker-playing-cards-3d-icon-png-download-11901378.png",
    title: "Poker Platforms",
    description: "A stable but smaller vertical, supported by cash games, tournaments, and shared player pools in regulated U.S. states.",
  },
  {
    image: "/ICON 3D/bitcoin-3d-icon-png-download-8579726.webp",
    title: "Crypto Casinos",
    description: "A niche market primarily consisting of offshore operators that accept cryptocurrency, with limited regulation across most U.S. jurisdictions.",
  },
  {
    image: "/ICON 3D/gaming-online-course-3d-icon-png-download-9859833.png",
    title: "Skill Gaming",
    description: "An emerging category featuring skill based cash competitions and tournaments, with gradual adoption in select regulated markets.",
  },
],
caseStudyLabel: "Results That Speak",
  caseStudyTitle: "Proven",
  caseStudyTitleGold: "Case Studies",

  caseStudies: [
    {
      image: "/case study/casinobook.webp",
      tag: "Online Casino Brand",
      stats: [
        {
          value: "8K+",
          text: "First Time Depositors",
        },
        {
          value: "1.3x",
          text: "ROAS",
        },
        {
          value: "32%",
          text: "Lower CPA",
        },
        {
          value: "2.1M+",
          text: "Qualified Ad Impressions",
        },
      ],
    },
    {
      image: "/case study/sportsbook.webp",
      tag: "Fantasy Sports Platform",
      stats: [
        {
          value: "5K+",
          text: "New User Registrations",
        },
        {
          value: "3.5K+",
          text: "App Downloads",
        },
        {
          value: "26%",
          text: "Increase in Returning Users",
        },
        {
          value: "1.85x",
          text: "ROAS",
        },
      ],
    },
  ],
  },
}



export default function CountryPage() {
  const { slug } = useParams()
  const data = countryData[slug]

useEffect(() => {
  if (!data || data.caseStudies.length <= 2) return;

  const swiper = new Swiper(".case-studies-slider", {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: ".case-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".case-next",
      prevEl: ".case-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
      },
    },
  });

  return () => swiper.destroy(true, true);
}, [data]);



useEffect(() => {
  const swiper = new Swiper(".industries-scroll", {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1.2,
    spaceBetween: 16,
    loop: true,

    pagination: {
      el: ".industry-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".industries-scroll .swiper-button-next",
      prevEl: ".industries-scroll .swiper-button-prev",
    },

    breakpoints: {
      480: { slidesPerView: 2, spaceBetween: 18 },
      640: { slidesPerView: 3, spaceBetween: 20 },
      968: { slidesPerView: 4, spaceBetween: 24 },
    },
  });

  return () => swiper.destroy(true, true);
}, []);

  if (!data) {
    return (
      <section className="page-hero" style={{ minHeight: "40vh" }}>
        <div className="container">
          <div className="hero-content">
            <h1>Country <span className="gold">Not Found</span></h1>
            <p>The country page you're looking for doesn't exist.</p>
            <Link to="/countries" className="btn btn-primary">View All Countries</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEO
      title={data.seo.title}
      description={data.seo.description}
      canonical={data.seo.canonical}
      ogTitle={data.seo.title}
      ogDescription={data.seo.description}
    />

      <section className="page-hero">
        <img src={`/internal pages hero image/${data.heroImg}`} alt="" className="hero-bg-img" />
        <div className="container">
          <div className="hero-content">
            <h1>{data.heroTitle} <span className="gold">{data.heroGold}</span></h1>
            <p>{data.heroDesc}</p>
            <Link to="/contact" className="btn btn-primary">Get in Touch <ArrowRight /></Link>
          </div>
        </div>
      </section>

            <section id="industries" className="bg-glow">
  <div className="container">
    <p className="section-label">{data.industriesLabel}</p>

    <h2 className="section-title">
       {data.industriesTitle}{" "}
      <span className="gold">{data.industriesTitleGold}</span>
    </h2>

    <p className="section-desc"> {data.industriesDesc} </p>

    <div className="industries-scroll swiper">
      <div className="swiper-wrapper">
        {data.industries.map((card, index) => (
          <div className="swiper-slide" key={index}>
            <div className="industry-card">
              <span className="ind-icon">
                <img src={card.image} alt={card.title} />
              </span>

              <h4>{card.title}</h4>

              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="industry-pagination swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  </div>
</section>

      <section className="content-section alt">
        <div className="container">
          <h2 className="section-title">{data.heroTitle} <span className="gold">{data.heroGold}</span></h2>
          <div className="content-row">
            <div className="text-content">
              <p>{data.BeforelistTitleParagraph}</p>
              <h4>{data.listTitle}</h4>
              <ul>
                {data.items.map((item, i) => (
                  <li key={i}><CheckCircle size={16} style={{ color: "var(--primary)", flexShrink: 0 }} /> {item}</li>
                ))}
              </ul>
              <h4>{data.subTitle}</h4>
              <p>{data.subText}</p>
            </div>
            <img src={`/stock/${data.img}`} alt={`${data.label} Market`} className="content-image" />
          </div>
        </div>
      </section>

      <section className="elevate-section">
        <div className="container">
          <div className="elevate-inner">
            <div className="elevate-content">
              <p className="elevate-tag">Why Choose TMK</p>
              <h2 className="elevate-title">{data.elevateTitle} <span className="gold">{data.elevateGold}</span></h2>
              <p className="elevate-desc">The Marketing King delivers targeted digital marketing solutions for iGaming operators in {data.label}. From player acquisition to brand building, our strategies are designed to help you dominate the local market and achieve sustainable growth.</p>
              <Link to="/contact" className="elevate-btn">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

<section id="case-studies">
  <div className="container">
    <p className="section-label" data-reveal>
      {data.caseStudyLabel}
    </p>

    <h2 className="section-title" data-reveal>
      {data.caseStudyTitle}{" "}
      <span className="gold">{data.caseStudyTitleGold}</span>
    </h2>

    {data.caseStudies.length <= 3 ? (
      // Normal Grid
      <div className="cases-grid">
        {data.caseStudies.map((study, index) => (
          <div className="case-card" data-reveal key={index}>
            <div className="case-img">
              <img
                src={study.image}
                alt={study.tag}
                className="case-img-image"
              />
              <div className="overlay"></div>
            </div>

            <div className="case-body">
              <div className="tag">{study.tag}</div>

              <ul className="case-list">
                {study.stats.map((stat, i) => (
                  <li key={i}>
                    <span className="num">{stat.value}</span>
                    {stat.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    ) : (
      // Swiper Slider
      <div className="case-studies-slider swiper">
        <div className="swiper-wrapper">
          {data.caseStudies.map((study, index) => (
            <div className="swiper-slide" key={index}>
              <div className="case-card">
                <div className="case-img">
                  <img
                    src={study.image}
                    alt={study.tag}
                    className="case-img-image"
                  />
                  <div className="overlay"></div>
                </div>

                <div className="case-body">
                  <div className="tag">{study.tag}</div>

                  <ul className="case-list">
                    {study.stats.map((stat, i) => (
                      <li key={i}>
                        <span className="num">{stat.value}</span>
                        {stat.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="case-pagination swiper-pagination"></div>

        <div className="case-prev swiper-button-prev"></div>
        <div className="case-next swiper-button-next"></div>
      </div>
    )}
  </div>
</section>

    </>
  )
}
