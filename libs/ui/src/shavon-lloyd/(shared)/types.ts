export type Work = {
  id: string;
  title: string;
  role?: string;
  ensemble?: string;
  details?: string;
  year?: string | number;
  youtubeId: string;
  category: 'Choral' | 'Instrumental';
};

export type CalEvent = {
  id: string;
  title: string;
  start: string; // ISO
  end?: string;
  location?: string;
  notes?: string;
  href?: string; // optional permalink
};