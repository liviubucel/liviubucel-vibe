/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: abonatinewsletter
 * Interface for AbonaiNewsletter
 */
export interface AbonaiNewsletter {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType text */
  firstName?: string;
  /** @wixFieldType text */
  lastName?: string;
  /** @wixFieldType boolean */
  privacyPolicyAgreement?: boolean;
  /** @wixFieldType datetime */
  subscriptionDate?: Date | string;
}


/**
 * Collection ID: acreditari
 * Interface for Accreditations
 */
export interface Accreditations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  certificationName?: string;
  /** @wixFieldType text */
  issuingOrganization?: string;
  /** @wixFieldType date */
  dateObtained?: Date | string;
  /** @wixFieldType url */
  verificationLink?: string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: articoleblog
 * Interface for BlogArticles
 */
export interface BlogArticles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  articleTitle?: string;
  /** @wixFieldType text */
  fullContent?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  featuredImage?: string;
  /** @wixFieldType text */
  excerpt?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  tags?: string;
}


/**
 * Collection ID: experienta
 * Interface for Experien
 */
export interface Experien {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  company?: string;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType date */
  endDate?: Date | string;
  /** @wixFieldType text */
  responsibilitiesAchievements?: string;
}


/**
 * Collection ID: proiecte
 * Interface for Proiecte
 */
export interface Proiecte {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  technologiesUsed?: string;
  /** @wixFieldType url */
  projectLink?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  projectImage?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
}
