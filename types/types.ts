export interface NotificationI {
  id: string;
  subject: string;
  description: string;
  segmentId: string;
  imageUrl?: string;
}

export interface SegmentI {
  id: string;
  name: string;
  customers: string[];
}

export interface CreateNotificationI {
  subject: string;
  description: string;
  segmentId: string;
  imageUrl?: string;
}

export interface DeleteNotificationI{
  notificationId: string;
}
