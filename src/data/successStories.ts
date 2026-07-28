export type SuccessStoryStatus = 'draft' | 'published';

export interface SuccessStoryMedia {
  src: string;
  poster?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface SuccessStory {
  slug: string;
  fullName: string;
  shortTitle: string;
  shortStory: string;
  relatedProgram?: string;
  periodAtCenter?: string;
  confirmedAchievement?: string;
  photo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  localVideo?: SuccessStoryMedia;
  externalVideoUrl?: string;
  videoPoster?: string;
  alt?: string;
  consentConfirmed: boolean;
  contentStatus: SuccessStoryStatus;
}

/**
 * Истории намеренно не публикуются до получения готовых материалов,
 * подтверждения написания имён, связи с центром и согласия на публикацию.
 */
export const successStories: SuccessStory[] = [];

export const publishedSuccessStories = successStories.filter(
  (story) => story.contentStatus === 'published' && story.consentConfirmed,
);
