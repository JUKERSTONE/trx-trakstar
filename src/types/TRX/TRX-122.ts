type UserId = string;
type CommentId = string;

export interface TRX_122 {
  id: string;
  title: string;
  creatorId: string;
  clipUrl: string;
  thumbnailUrl: string;
  notes?: string;
  collectionIds?: string[];
  likesId: UserId[];
  commentIds: CommentId[];
}
