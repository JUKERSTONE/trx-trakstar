type UserId = string;
type CommentId = string;

export interface TRX_211 {
  id: string;
  headline: string;
  caption: string;
  author: string;
  postedAt: string;
  thumbnailUrl: string;
  magazineIds?: string[];
  likesId: UserId[];
  commentIds: CommentId[];
  articleBody: any[];
}
