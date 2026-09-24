import type { IconName } from '@/components/ui/icons'
import imgWebsite from '@/assets/img/svc-website.webp'
import imgGraphics from '@/assets/img/svc-graphics.webp'
import imgRepair from '@/assets/img/svc-repair.webp'
import imgLaptops from '@/assets/img/svc-laptops.webp'
import imgPhoto from '@/assets/img/svc-photo.webp'
import imgOnline from '@/assets/img/svc-online.png'
import imgSystems from '@/assets/img/biz-systems.webp'

export interface Faq {
  q: string
  a: string
}

export interface ServicePage {
  eyebrow: string
  heading: string
  lead: string
  problems: { title: string; text: string }[]
  solutionTitle: string
  solutionText: string
  deliverables: { title: string; text: string; icon: IconName }[]
  forWho: string[]
  process: { title: string; text: string }[]
  provide: string[]
  faqs: Faq[]
  relatedCategory?: 'websites' | 'branding' | 'technology'
  ctaHeading: string
  ctaText: string
  waMessage: string
  notice?: string
}

export interface Service {
  slug: string
  path: string
  title: string
  short: string
  icon: IconName
  image: string
  imageAlt: string
  items: string[]
  formValue: string
  seo: { title: string; description: string }
  page: ServicePage
}

export const services: Service[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'website-development',
    path: '/services/website-development',
    title: 'Website development',
    short: 'Fast, mobile-friendly websites that help customers understand, trust and contact your business.',
    icon: 'globe',
    image: imgWebsite,
    imageAlt: 'A laptop and phone showing a modern business website design',
    items: ['Business websites & landing pages', 'E-commerce stores', 'Maintenance & updates'],
    formValue: 'Website development',
    seo: {
      title: 'Website Design & Development in Tanzania | Millenium Tech',
      description:
        'Business website design and development in Dar es Salaam and across Tanzania. Mobile-friendly, search-friendly websites with WhatsApp and lead forms built in.'
    },
    page: {
      eyebrow: 'Website design & development in Tanzania',
      heading: 'A business website that makes the next step easy.',
      lead: 'We design and build fast, mobile-friendly websites for businesses in Tanzania — so customers can see what you do, trust you, and contact you in one tap.',
      problems: [
        { title: 'Customers can’t find you online', text: 'When people search for what you offer and you are not there, they find someone else.' },
        { title: 'Your site is hard to use on a phone', text: 'Many visitors browse on their phones. Slow or cramped pages send them away.' },
        { title: 'Visitors don’t know what to do next', text: 'Without a clear contact route, interested customers leave without asking.' },
        { title: 'It’s hard to keep up to date', text: 'Old prices and outdated photos cost trust. A website should be easy to update.' }
      ],
      solutionTitle: 'A website built to bring in enquiries',
      solutionText:
        'We start with your customers and your goal, then design a clear structure with contact and WhatsApp options built in — not an online brochure that nobody reads.',
      deliverables: [
        { title: 'Mobile-responsive design', text: 'Looks and works well on phones, tablets and computers.', icon: 'smartphone' },
        { title: 'WhatsApp & lead forms', text: 'Customers can message, call or send an enquiry in seconds.', icon: 'message' },
        { title: 'Search-friendly structure', text: 'Clean page structure and metadata so Google can understand your site.', icon: 'search' },
        { title: 'E-commerce', text: 'Product pages and ordering where your business needs to sell online.', icon: 'cart' },
        { title: 'Landing pages', text: 'Focused pages for a single service, offer or campaign.', icon: 'rocket' },
        { title: 'Maintenance & updates', text: 'Support after launch so your website stays current and working.', icon: 'lifebuoy' }
      ],
      forWho: [
        'Small businesses getting online for the first time',
        'Businesses with an outdated or slow website',
        'Shops that want to take orders online',
        'Organisations that need a professional online profile'
      ],
      process: [
        { title: 'Discovery', text: 'We learn about your services, customers, goals and content.' },
        { title: 'Structure & direction', text: 'We plan the pages and visual direction before building.' },
        { title: 'Design & build', text: 'We create responsive pages with clear calls to action.' },
        { title: 'Review & launch', text: 'You review, we refine, then we launch and stay available for support.' }
      ],
      provide: [
        'Your business name, services and contact details',
        'Your logo and photos, if you have them',
        'Examples of websites you like',
        'The main thing you want the website to achieve'
      ],
      faqs: [
        {
          q: 'How much does a website cost?',
          a: 'It depends on the number of pages, the features, the content and the support you need. Send us a short brief and we will give you a clear quotation before any work starts.'
        },
        {
          q: 'How long does a website take?',
          a: 'It depends on the scope and how quickly content and feedback arrive. After discovery we agree a realistic timeline with you, so you know what to expect.'
        },
        {
          q: 'Do I need a domain name and hosting?',
          a: 'A live website needs both. We can guide you on choosing them during discovery, so you know what you need and what it costs before you commit.'
        },
        {
          q: 'I don’t have text or photos yet. Can we still start?',
          a: 'Yes. We can start with the structure and help you decide what content is needed. Tell us what you have and we will plan around it.'
        },
        {
          q: 'Can you update my website after it is live?',
          a: 'Support after delivery is part of how we work. Updates, fixes and ongoing support can be agreed as part of your project.'
        }
      ],
      relatedCategory: 'websites',
      ctaHeading: 'Ready for an online home that works harder?',
      ctaText: 'Tell us about your business and what you want your website to do. We’ll reply with clear next steps.',
      waMessage: 'Hello Millenium Tech, I would like a quotation for a business website.'
    }
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'graphic-design',
    path: '/services/graphic-design',
    title: 'Graphic design & branding',
    short: 'Logos, posters, social-media graphics and print materials that give your business a consistent look.',
    icon: 'palette',
    image: imgGraphics,
    imageAlt: 'Colourful “Graphic Design” artwork on a tablet next to a keyboard',
    items: ['Logo design & brand identity', 'Posters, banners & flyers', 'Social-media graphics'],
    formValue: 'Graphic design & branding',
    seo: {
      title: 'Graphic Design & Branding in Tanzania | Millenium Tech',
      description:
        'Logo design, brand identity, posters, flyers, business cards and social-media graphics for businesses in Tanzania.'
    },
    page: {
      eyebrow: 'Graphic design & branding',
      heading: 'Design that makes your business look as good as it is.',
      lead: 'Logos, posters, social-media graphics, business cards and flyers — a consistent look everywhere your customers see you.',
      problems: [
        { title: 'Your logo looks dated or is hard to use', text: 'A logo should work on a shopfront, a phone screen and a business card.' },
        { title: 'Every post looks different', text: 'Inconsistent graphics make a business harder to recognise and remember.' },
        { title: 'Printed materials don’t match your brand', text: 'Flyers, banners and cards should look like they come from the same business.' },
        { title: 'You are relying on last-minute templates', text: 'Ready-made templates rarely say anything specific about your business.' }
      ],
      solutionTitle: 'One clear visual identity, used everywhere',
      solutionText:
        'We define a simple visual system — logo, colours, type and layout style — then apply it across the materials your business actually uses.',
      deliverables: [
        { title: 'Logo design & brand identity', text: 'A logo and the basics of how to use it.', icon: 'palette' },
        { title: 'Posters & banners', text: 'Eye-catching layouts for promotions, events and shopfronts.', icon: 'megaphone' },
        { title: 'Social-media graphics', text: 'Consistent post designs for Facebook, Instagram, TikTok and more.', icon: 'image' },
        { title: 'Business cards & flyers', text: 'Print-ready designs that carry your brand offline.', icon: 'file-text' }
      ],
      forWho: [
        'New businesses that need a first logo and brand look',
        'Established businesses refreshing an old identity',
        'Shops and services running promotions or events',
        'Anyone who wants consistent social-media posts'
      ],
      process: [
        { title: 'Brief', text: 'We learn about your business, audience and the look you have in mind.' },
        { title: 'Concepts', text: 'We prepare design directions for you to react to.' },
        { title: 'Refine', text: 'We improve the chosen direction with your feedback.' },
        { title: 'Deliver', text: 'You receive final files ready for print and online use.' }
      ],
      provide: [
        'Your business name and tagline',
        'Your current logo or colours, if any',
        'Where the design will be used (print, social, signage)',
        'Examples of designs you like'
      ],
      faqs: [
        {
          q: 'What files will I receive?',
          a: 'You receive final files suited to print and online use. We confirm the exact list of deliverables in your quotation.'
        },
        {
          q: 'Can you refresh my existing logo?',
          a: 'Yes. Tell us what you have and what you want to keep, and we will recommend a sensible level of change.'
        },
        {
          q: 'Can you design for both print and social media?',
          a: 'Yes. We can design for print materials and for social media, and keep the look consistent between them.'
        }
      ],
      relatedCategory: 'branding',
      ctaHeading: 'Let’s make your brand easier to recognise.',
      ctaText: 'Tell us what you need designed and where it will be used. We’ll suggest the best place to start.',
      waMessage: 'Hello Millenium Tech, I would like help with graphic design / branding.'
    }
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'computer-repair',
    path: '/services/computer-repair',
    title: 'Computer repair & IT support',
    short: 'Hardware repairs, software installation, virus removal and troubleshooting, explained in plain language.',
    icon: 'wrench',
    image: imgRepair,
    imageAlt: 'A technician repairing the inside of a laptop',
    items: ['Hardware repairs', 'Software & Windows installation', 'Virus removal & troubleshooting'],
    formValue: 'Computer repair & IT support',
    seo: {
      title: 'Computer Repair & IT Support in Dar es Salaam | Millenium Tech',
      description:
        'Laptop and computer repair, software and Windows installation, virus removal, data recovery and IT support for individuals and businesses in Tanzania.'
    },
    page: {
      eyebrow: 'Computer repair & IT support',
      heading: 'Straight-talking help when your computer stops working.',
      lead: 'Repairs, software installation, virus removal and troubleshooting — explained in plain language so you know what is wrong and what it will take to fix it.',
      problems: [
        { title: 'Your computer is slow or won’t start', text: 'Slow machines waste hours every week and put your work at risk.' },
        { title: 'Viruses or unwanted programs', text: 'Malware can slow your device down and put your files and accounts at risk.' },
        { title: 'You need software or Windows installed', text: 'A clean, correct installation saves problems later.' },
        { title: 'Important files may be lost', text: 'When a drive fails or files disappear, quick and careful action matters.' }
      ],
      solutionTitle: 'Diagnose first, then fix it properly',
      solutionText:
        'We check the problem, tell you what we found and what we recommend, and only then carry out the repair — no guessing and no surprises.',
      deliverables: [
        { title: 'Hardware repairs', text: 'Diagnosis and repair of laptops and desktop computers.', icon: 'wrench' },
        { title: 'Software & Windows installation', text: 'Clean installs, updates and the programs you need.', icon: 'cpu' },
        { title: 'Virus & malware removal', text: 'Cleaning infected devices and helping you stay protected.', icon: 'shield' },
        { title: 'Data recovery', text: 'We assess your device and tell you honestly what is possible.', icon: 'hard-drive' },
        { title: 'Troubleshooting & tune-ups', text: 'Fixes for slow performance and everyday technical issues.', icon: 'settings' },
        { title: 'IT support for businesses', text: 'Practical help for the computers your team depends on.', icon: 'building' }
      ],
      forWho: [
        'Individuals with a slow, damaged or infected laptop',
        'Small businesses that depend on a few key computers',
        'Offices that need software installed or devices set up',
        'Anyone worried about losing important files'
      ],
      process: [
        { title: 'Diagnose', text: 'We check the device and identify the problem.' },
        { title: 'Explain & agree', text: 'We explain the options and agree what to do before we start.' },
        { title: 'Repair', text: 'We carry out the repair or installation.' },
        { title: 'Test & hand over', text: 'We test the result with you before handing the device back.' }
      ],
      provide: [
        'The device model and a short description of the problem',
        'When the problem started and anything that happened before it',
        'Whether important files need to be kept',
        'Your charger and any accessories, if you bring the device in'
      ],
      faqs: [
        {
          q: 'Can you recover files I deleted or lost?',
          a: 'It depends on the device and what happened. We assess it first and tell you honestly what is possible, so you can decide before any work is done.'
        },
        {
          q: 'Do I have to bring my computer to you?',
          a: 'Message us first on WhatsApp with the problem and the device model. We will advise on the best way to help.'
        },
        {
          q: 'Do you support offices as well as individuals?',
          a: 'Yes. Tell us what devices and software your team uses and what is going wrong, and we will suggest a practical way forward.'
        }
      ],
      ctaHeading: 'Computer trouble? Tell us what’s happening.',
      ctaText: 'Send the device model and a short description of the problem. We’ll tell you what we recommend next.',
      waMessage: 'Hello Millenium Tech, I need help with a computer problem.'
    }
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'laptop-sales',
    path: '/services/laptop-sales',
    title: 'Laptop sales',
    short: 'New and refurbished laptops, tested by our team, with warranty and support after you buy.',
    icon: 'laptop',
    image: imgLaptops,
    imageAlt: 'Rows of business laptops on a workshop table',
    items: ['New & refurbished laptops', 'Tested by our team', 'Warranty & after-sale support'],
    formValue: 'Laptop sales',
    seo: {
      title: 'Laptops for Sale in Dar es Salaam | Millenium Tech',
      description:
        'New and refurbished laptops tested by the Millenium Tech team, with warranty, technical advice and after-sale support in Tanzania.'
    },
    page: {
      eyebrow: 'Laptop sales',
      heading: 'Reliable laptops, tested before they reach you.',
      lead: 'New and refurbished laptops for work, study and business — with an honest technical assessment and support after your purchase.',
      problems: [
        { title: 'Not sure which laptop fits your needs', text: 'The right laptop depends on what you will actually do with it.' },
        { title: 'Worried about buying a used laptop', text: 'You want to know it has been checked and who to ask if something goes wrong.' },
        { title: 'No support after the sale', text: 'A laptop is only useful if someone can help when you have a problem.' },
        { title: 'Buying for a whole office or team', text: 'Several devices need consistent specifications and clear advice.' }
      ],
      solutionTitle: 'Advice, testing and support in one place',
      solutionText:
        'We are also a repair team, so we know what goes wrong with laptops. That helps us test carefully, advise honestly and support you after you buy.',
      deliverables: [
        { title: 'New & refurbished laptops', text: 'Options for different needs and budgets.', icon: 'laptop' },
        { title: 'Tested by our team', text: 'Every laptop is checked before it is sold.', icon: 'badge-check' },
        { title: 'Warranty included', text: 'We explain exactly what the warranty covers when you buy.', icon: 'shield' },
        { title: 'Technical assessment', text: 'Honest advice on the specification that suits your work.', icon: 'search' },
        { title: 'After-sale support', text: 'Help when you need it, from the team that sold it to you.', icon: 'lifebuoy' }
      ],
      forWho: [
        'Students and professionals who need a dependable laptop',
        'Small businesses equipping staff',
        'Anyone comparing new and refurbished options',
        'Buyers who want support after the purchase'
      ],
      process: [
        { title: 'Share your needs', text: 'Tell us what you will use the laptop for and your budget.' },
        { title: 'We recommend options', text: 'We suggest suitable laptops from what is available.' },
        { title: 'Check & purchase', text: 'You see the laptop, we explain its condition and warranty.' },
        { title: 'After-sale support', text: 'We stay available if you need help later.' }
      ],
      provide: [
        'What you will use the laptop for (office, study, design, etc.)',
        'Your budget range',
        'How many laptops you need',
        'Any must-have features, such as screen size or storage'
      ],
      faqs: [
        {
          q: 'Do you have laptops in stock right now?',
          a: 'Stock changes, so the best way is to message us on WhatsApp with what you need. We will confirm what is available.'
        },
        {
          q: 'What does the warranty cover?',
          a: 'Warranty is included with laptop purchases. We explain exactly what it covers before you buy, so there are no surprises.'
        },
        {
          q: 'How much do laptops cost?',
          a: 'Prices depend on the model, specification and condition. Contact us with your needs and we will share current options.'
        }
      ],
      ctaHeading: 'Looking for a laptop? Tell us what you need.',
      ctaText: 'Share what you’ll use it for and your budget. We’ll recommend options that fit.',
      waMessage: 'Hello Millenium Tech, I am interested in buying a laptop.'
    }
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'photo-editing',
    path: '/services/photo-editing',
    title: 'Photo editing',
    short: 'Portrait retouching, background removal, colour correction and product image edits.',
    icon: 'image',
    image: imgPhoto,
    imageAlt: 'A photo-editing workspace with a design open on a large monitor',
    items: ['Portrait retouching', 'Background removal', 'Product image edits'],
    formValue: 'Photo editing',
    seo: {
      title: 'Photo Editing & Retouching in Tanzania | Millenium Tech',
      description:
        'Professional portrait retouching, background removal, colour correction and product photo editing for individuals and businesses in Tanzania.'
    },
    page: {
      eyebrow: 'Photo editing',
      heading: 'Clean, professional photos for people and products.',
      lead: 'Portrait retouching, background removal, colour correction and product image edits — ready for social media, print and online shops.',
      problems: [
        { title: 'Product photos look dull or inconsistent', text: 'Customers judge quality from the picture, so uneven photos cost sales.' },
        { title: 'The background is distracting', text: 'A clean background puts the focus on the person or product.' },
        { title: 'Portraits need careful retouching', text: 'Good retouching improves a photo without making it look fake.' },
        { title: 'Images are not ready for online use', text: 'Photos should be the right size and quality for the place they will appear.' }
      ],
      solutionTitle: 'Photos that look the way you intended',
      solutionText:
        'We agree the look with you first, then edit carefully so your photos stay natural, consistent and suited to where you will use them.',
      deliverables: [
        { title: 'Portrait retouching', text: 'Natural-looking improvements for profile and event photos.', icon: 'image' },
        { title: 'Background removal', text: 'Clean cut-outs and new backgrounds for people and products.', icon: 'layers' },
        { title: 'Colour correction', text: 'Balanced colour and lighting across your photos.', icon: 'palette' },
        { title: 'Product image edits', text: 'Consistent product photos for shops and catalogues.', icon: 'package' }
      ],
      forWho: [
        'Online sellers who need consistent product photos',
        'Professionals who need a polished portrait',
        'Businesses preparing images for social media or print',
        'Events and organisations with photos to tidy up'
      ],
      process: [
        { title: 'Send your photos', text: 'Share the original images and tell us what you need.' },
        { title: 'Agree the edits', text: 'We confirm the look and the number of images.' },
        { title: 'Edit & review', text: 'We edit the photos and you review the result.' },
        { title: 'Deliver', text: 'You receive final files suited to where they will be used.' }
      ],
      provide: [
        'The original photos in the best quality you have',
        'Examples of the look you want',
        'Where the photos will be used (social media, print, online shop)',
        'How many photos need editing'
      ],
      faqs: [
        {
          q: 'Can you edit photos taken on a phone?',
          a: 'Yes. Send the original files rather than screenshots for the best results.'
        },
        {
          q: 'How do I send my photos?',
          a: 'You can send them by WhatsApp or email. For large batches, we will confirm the easiest way to share them.'
        },
        {
          q: 'Can you edit a large batch of product photos?',
          a: 'Yes. Tell us how many photos you have and the look you want, and we will confirm the scope and quotation.'
        }
      ],
      ctaHeading: 'Have photos that need work?',
      ctaText: 'Send a few examples and tell us what you want. We’ll confirm what we can do.',
      waMessage: 'Hello Millenium Tech, I would like help with photo editing.'
    }
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'online-services',
    path: '/services/online-services',
    title: 'Online services',
    short: 'Help completing Tanzania online applications such as NIDA, birth certificates and job applications.',
    icon: 'file-text',
    image: imgOnline,
    imageAlt: 'Illustration of an application form, an ID card and an approval tick',
    items: ['NIDA registration support', 'Birth certificate applications', 'Job applications & more'],
    formValue: 'Online services',
    seo: {
      title: 'Online Application Help (NIDA, Birth Certificates, Jobs) | Millenium Tech',
      description:
        'Get help completing Tanzania online processes such as NIDA registration, birth certificate applications and job applications, with clear guidance on required documents.'
    },
    page: {
      eyebrow: 'Online services',
      heading: 'Get official online processes done — without the stress.',
      lead: 'We help you complete Tanzania online applications and submissions, such as NIDA registration, birth certificates and job applications.',
      notice:
        'Millenium Tech is a private business and is not a government office. Official fees, where they apply, are set by the relevant government office.',
      problems: [
        { title: 'Online forms are confusing', text: 'It is easy to make a mistake that delays your application.' },
        { title: 'Missing documents cause delays', text: 'Knowing exactly what to prepare saves repeat trips and repeat attempts.' },
        { title: 'No time to travel or queue', text: 'Some steps can be handled online with the right help.' },
        { title: 'You are not sure what to submit', text: 'Each process has its own requirements. We help you understand them first.' }
      ],
      solutionTitle: 'Clear guidance, then careful submission',
      solutionText:
        'We tell you what documents and details you need before we start, complete the online steps carefully with you, and explain the next steps.',
      deliverables: [
        { title: 'NIDA registration support', text: 'Guidance and help with the online registration steps.', icon: 'badge-check' },
        { title: 'Birth certificate applications', text: 'Help preparing and submitting the application.', icon: 'file-text' },
        { title: 'Job applications', text: 'Help completing and submitting online job applications.', icon: 'briefcase' },
        { title: 'Other official processes', text: 'Ask us about other online processes you need help with.', icon: 'landmark' },
        { title: 'Document checklist', text: 'A clear list of what you need before you begin.', icon: 'clipboard' }
      ],
      forWho: [
        'People who find online government forms confusing',
        'Job seekers applying online',
        'Parents and families preparing important documents',
        'Anyone short of time to handle it alone'
      ],
      process: [
        { title: 'Tell us what you need', text: 'Message us with the process you need help with.' },
        { title: 'Get your checklist', text: 'We list the documents and details required.' },
        { title: 'We complete it with you', text: 'We fill in and submit the online steps carefully.' },
        { title: 'Next steps', text: 'We explain what happens next and what to expect.' }
      ],
      provide: [
        'The documents we list for your process',
        'Accurate personal details, exactly as on your documents',
        'The phone number or email you want to use for the application'
      ],
      faqs: [
        {
          q: 'Are you a government office?',
          a: 'No. Millenium Tech is a private business that helps people complete online processes. Approvals and decisions are made by the relevant government office.'
        },
        {
          q: 'How much does it cost?',
          a: 'Official fees, if any, are set by the relevant government office. Our own service fee is agreed with you before we start.'
        },
        {
          q: 'How long does it take?',
          a: 'It depends on the process and on how quickly the relevant office responds. We explain what to expect when you contact us.'
        }
      ],
      ctaHeading: 'Need help with an online application?',
      ctaText: 'Tell us which process you need. We’ll tell you what you need to prepare.',
      waMessage: 'Hello Millenium Tech, I need help with an online application.'
    }
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'business-technology',
    path: '/solutions',
    title: 'Business systems & custom software',
    short: 'Custom business systems, web applications and automation for teams that have outgrown spreadsheets.',
    icon: 'workflow',
    image: imgSystems,
    imageAlt: 'A hand placing a puzzle piece next to a glowing light bulb, symbolising a solution taking shape',
    items: ['Custom business systems', 'Web applications', 'Automation & integrations'],
    formValue: 'Business systems / custom software',
    seo: {
      title: 'Business Systems & Custom Software in Tanzania | Millenium Tech',
      description:
        'Custom business systems, web applications and automation for organisations in Tanzania. Start with the workflow, then build the smallest useful solution.'
    },
    page: {
      eyebrow: 'Business solutions',
      heading: 'When a website isn’t enough, start with the workflow.',
      lead: 'Custom business systems, web applications and automation for organisations that need more than a standard website.',
      problems: [
        { title: 'Information is scattered', text: 'Records live in chats, notebooks and spreadsheets, and nobody has the full picture.' },
        { title: 'Manual work wastes time', text: 'Repeating the same tasks by hand invites mistakes and slows your team down.' },
        { title: 'Your tools don’t work together', text: 'Copying data between systems is slow and easy to get wrong.' },
        { title: 'You can’t see your business at a glance', text: 'Decisions are harder without clear, current information.' }
      ],
      solutionTitle: 'Build the right thing before the biggest thing',
      solutionText:
        'We map how the work really happens, agree the outcome that matters, and build the smallest useful version first — then improve it with the people who use it.',
      deliverables: [
        { title: 'Custom business systems', text: 'Tools shaped around how your organisation works.', icon: 'building' },
        { title: 'Web applications', text: 'Secure, browser-based apps your team can use anywhere.', icon: 'monitor-phone' },
        { title: 'Database-backed tools', text: 'Records, members, orders or stock kept in one reliable place.', icon: 'database' },
        { title: 'Integrations', text: 'Connect the tools you already use where it makes sense.', icon: 'layers' },
        { title: 'Automation', text: 'Remove repetitive manual steps from everyday processes.', icon: 'zap' },
        { title: 'Maintenance & support', text: 'Support so the system keeps working as your needs change.', icon: 'lifebuoy' }
      ],
      forWho: [
        'Organisations managing members, customers or stock in spreadsheets',
        'Teams repeating the same manual tasks every week',
        'Businesses that want simple reports on how they are doing',
        'Founders planning a web-based product or service'
      ],
      process: [
        { title: 'Understand the process', text: 'We identify people, steps, information and bottlenecks.' },
        { title: 'Define the outcome', text: 'We agree what should be simpler, faster or more reliable.' },
        { title: 'Build the smallest useful version', text: 'We prioritise only the features that support the outcome.' },
        { title: 'Test and improve', text: 'We review with the people who will use it and refine.' }
      ],
      provide: [
        'A description of the process that needs attention',
        'Who will use the system and what they need to do',
        'Any spreadsheets, forms or tools you use today',
        'The result that would make the biggest difference'
      ],
      faqs: [
        {
          q: 'I don’t know exactly what I need. Can we still talk?',
          a: 'Yes. Start with the problem, not the solution. A short discovery conversation is usually enough to define what is worth building.'
        },
        {
          q: 'How much does a custom system cost?',
          a: 'It depends on the scope, the number of users and the integrations involved. After discovery we give you a clear quotation for the first version.'
        },
        {
          q: 'What about hosting and support afterwards?',
          a: 'We discuss hosting, support and maintenance options while scoping, so you know what running the system involves.'
        }
      ],
      relatedCategory: 'technology',
      ctaHeading: 'Have a process that needs attention?',
      ctaText: 'Tell us where work gets stuck. We’ll help you identify a sensible next step.',
      waMessage: 'Hello Millenium Tech, I would like to discuss a business system.'
    }
  }
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)

/** Options for the enquiry form's "service needed" field. */
export const serviceOptions = [...services.map((s) => s.formValue), 'Not sure yet']
