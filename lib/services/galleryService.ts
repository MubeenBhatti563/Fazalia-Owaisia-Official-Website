import { GalleryAlbum, GalleryCategory } from "@/types";
import { initialGalleryAlbums } from "@/lib/data/gallery";

/**
 * Service abstraction for Gallery Albums.
 * Currently serves static in-memory data.
 * When integrating Supabase later:
 *   const { data, error } = await supabase.from('gallery_albums').select('*, related_images(*)');
 *   return data as GalleryAlbum[];
 */
export async function getGalleryAlbums(
  category: GalleryCategory = "all"
): Promise<GalleryAlbum[]> {
  if (category === "all") {
    return initialGalleryAlbums;
  }
  return initialGalleryAlbums.filter((album) => album.albumId === category);
}

export async function getAlbumById(id: number): Promise<GalleryAlbum | null> {
  const album = initialGalleryAlbums.find((a) => a.id === id);
  return album || null;
}

export async function getAllAlbumIds(): Promise<number[]> {
  return initialGalleryAlbums.map((a) => a.id);
}

export async function getRelatedAlbums(currentId: number, limit = 4): Promise<GalleryAlbum[]> {
  return initialGalleryAlbums.filter((a) => a.id !== currentId).slice(0, limit);
}
