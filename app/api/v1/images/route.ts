import { NextRequest, NextResponse } from 'next/server';
import { searchPhotos, trackDownload } from '@/lib/unsplash';

// export const runtime = 'edge'

export async function GET(req: NextRequest) {
    try {
        console.log("req: ", req);
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query') ?? null;
        const download = searchParams.get('download') ? Boolean(searchParams.get('download')) : false;
        const downloadLocation = searchParams.get('download_location') ?? null;
        console.log(query, download, downloadLocation);

        // Handle Download Tracking
        if (download && downloadLocation) {
            await trackDownload(downloadLocation);
            return NextResponse.json({ success: true });
        }

        // Handle Search
        if (!query) {
            return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
        }

        const image = await searchPhotos(query);
        console.log("get image: ", image);

        if (!image) {
            return NextResponse.json({ error: 'No image found' }, { status: 404 });
        }

        if (image.downloadLink) {
            try {
                await trackDownload(image.downloadLink);
                return NextResponse.json(image);
            } catch (e) {
                return NextResponse.json({ error: 'Failed to track download', e }, { status: 500 });
            }
        }

        return NextResponse.json(image);

    } catch (error) {
        console.error("Error fetching image", error);
        return NextResponse.json({ message: 'Failed to fetch image', error }, { status: 500 });
    }
}

