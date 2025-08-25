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