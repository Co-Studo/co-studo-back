import { Announcement } from '@entities/announcement.entity';

export type CreateAnnouncementInput = Pick<
  Announcement,
  'title' | 'content' | 'isFixed'
>;

export type UpdateAnnouncementInput = Partial<CreateAnnouncementInput>;
