// app/api/gallery/route.ts
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const all: any[] = [];
    let next_cursor: string | undefined = undefined;

    do {
      const res = await cloudinary.api.resources({
        type: 'upload',
        resource_type: 'image',
        max_results: 500,        // up to 500 per page
        next_cursor,             // pagination
        // prefix: 'optional-folder/', // uncomment if you want a folder
      });
      all.push(...(res.resources ?? []));
      next_cursor = res.next_cursor;
    } while (next_cursor);

    const images = all
      .filter((f) => typeof f.width === 'number' && typeof f.height === 'number')
      .map((f) => ({
        id: f.public_id,
        name: f.public_id,
        url: f.secure_url,
        width: f.width,
        height: f.height,
      }));

    return NextResponse.json({
      folderName: process.env.CLOUDINARY_COLLECTION || 'Gallery',
      images,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}