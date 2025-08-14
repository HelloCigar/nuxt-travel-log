import type { FetchError } from 'ofetch'

export default function (error: FetchError) {
  return error.data?.statusMessage ||
      error.statusMessage ||
      "An unknown error occured.";
}