import { createApi } from 'unsplash-js'

export interface SearchPhotoResponse {
  url: string
  thumbnail: string
  alt: string
  author: {
    name: string
    username: string
    link: string
  }
  downloadLink: string
}

export const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY ?? '',
})

export const searchPhotos = async <
  Result extends SearchPhotoResponse = SearchPhotoResponse,
>(
  query: string,
): Promise<Result | null> => {
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    console.warn('UNSPLASH_ACCESS_KEY is missing')
    return null
  }

  const result = await unsplash.search.getPhotos({
    query,
    perPage: 1,
    orientation: 'landscape',
  })

  if (result.errors) {
    console.error(result.errors)
    return null
  }

  const photo = result.response?.results?.[0] ?? null
  if (!photo) {
    return null
  }

  return {
    url: photo.urls.regular,
    thumbnail: photo.urls.small,
    alt: photo.alt_description ?? query,
    author: {
      name: photo.user.name,
      username: photo.user.username,
      link: `https://unsplash.com/@${photo.user.username}?utm_source=meal_planner_app&utm_medium=referral`,
    },
    downloadLink: photo.links.download_location,
  } as Result
}

export const trackDownload = async (downloadLocation: string) => {
  if (!process.env.UNSPLASH_ACCESS_KEY) return

  const result = await unsplash.photos.trackDownload({
    downloadLocation,
  })

  if (result.type === 'error') {
    throw result.errors
  }

  return result
}
